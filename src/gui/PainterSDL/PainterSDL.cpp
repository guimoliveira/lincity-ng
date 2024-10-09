#include "PainterSDL.hpp"

#include <assert.h>
#include <iostream>
#include <cmath>
#include <SDL.h>
#include <SDL2_gfxPrimitives.h>
#include <SDL2_rotozoom.h>
#include <stdlib.h>

#include "gui/Vector2.hpp"
#include "gui/Color.hpp"
#include "gui/Rect2D.hpp"
#include "gui/Texture.hpp"
#include "TextureSDL.hpp"

class Painter;

PainterSDL::PainterSDL(SDL_Renderer *_renderer)
    : renderer(_renderer)
{
}

PainterSDL::~PainterSDL()
{
}

void PainterSDL::drawTexture(const Texture *texture, const Vector2 &pos)
{
    assert(typeid(*texture) == typeid(TextureSDL));
    const TextureSDL *textureSDL = static_cast<const TextureSDL *>(texture);

#ifdef DEBUG_ALL
    if (texture == 0)
    {
        std::cerr << "Trying to render 0 texture.";
        assert(false);
        return;
    }
#endif

    Vector2 screenpos = transform.apply(pos);

    SDL_Rect drect;
    drect.x = lrint(screenpos.x);
    drect.y = lrint(screenpos.y);
    drect.w = texture->getWidth();
    drect.h = texture->getHeight();   

    SDL_RenderCopy(renderer, textureSDL->texture, NULL, &drect);
}

void PainterSDL::drawStretchTexture(Texture *texture, const Rect2D &rect)
{
    assert(typeid(*texture) == typeid(TextureSDL));
    TextureSDL *textureSDL = static_cast<TextureSDL *>(texture);

#ifdef DEBUG_ALL
    if (texture == 0 || texture->getWidth() == 0 || texture->getHeight() == 0)
    {
        std::cerr << "Trying to render 0 texture.";
        assert(false);
        return;
    }
#endif

    Vector2 screenpos = transform.apply(rect.p1);

    SDL_Rect drect;
    drect.x = lroundf(screenpos.x);
    drect.y = lroundf(screenpos.y);
    drect.w = lroundf(rect.getWidth());
    drect.h = lroundf(rect.getHeight());

    SDL_RenderCopy(renderer, textureSDL->texture, NULL, &drect);
}

void PainterSDL::fillPolygon(int numberPoints, const Vector2 *points)
{
    Vector2 screenpos;
    Sint16 *vx = new Sint16[numberPoints];
    Sint16 *vy = new Sint16[numberPoints];
    for (int i = 0; i < numberPoints; i++)
    {
        screenpos = transform.apply(points[i]);
        vx[i] = (int)screenpos.x;
        vy[i] = (int)screenpos.y;
    }
    filledPolygonRGBA(renderer, vx, vy, numberPoints,
                      fillColor.r, fillColor.g, fillColor.b, fillColor.a);
    delete[] vx;
    delete[] vy;
}

void PainterSDL::drawPolygon(int numberPoints, const Vector2 *points)
{
    Vector2 screenpos;
    Sint16 *vx = new Sint16[numberPoints];
    Sint16 *vy = new Sint16[numberPoints];
    for (int i = 0; i < numberPoints; i++)
    {
        screenpos = transform.apply(points[i]);
        vx[i] = (int)screenpos.x;
        vy[i] = (int)screenpos.y;
    }
    aapolygonRGBA(renderer, vx, vy, numberPoints,
                  lineColor.r, lineColor.g, lineColor.b, lineColor.a);
    delete[] vx;
    delete[] vy;
}

void PainterSDL::drawLine(const Vector2 pointA, const Vector2 pointB)
{
    Vector2 screenpos = transform.apply(pointA);
    Vector2 screenpos2 = transform.apply(pointB);
    aalineRGBA(renderer, (int)screenpos.x, (int)screenpos.y,
               (int)screenpos2.x, (int)screenpos2.y,
               lineColor.r, lineColor.g, lineColor.b, lineColor.a);
}

void PainterSDL::fillRectangle(const Rect2D &rect)
{
    Vector2 screenpos = transform.apply(rect.p1);
    Vector2 screenpos2 = transform.apply(rect.p2);
    boxRGBA(renderer, (int)screenpos.x, (int)screenpos.y,
            (int)screenpos2.x, (int)screenpos2.y,
            fillColor.r, fillColor.g, fillColor.b, fillColor.a);
}

void PainterSDL::drawRectangle(const Rect2D &rect)
{
    Vector2 screenpos = transform.apply(rect.p1);
    Vector2 screenpos2 = transform.apply(rect.p2);
    rectangleRGBA(renderer, (int)screenpos.x, (int)screenpos.y,
                  (int)screenpos2.x, (int)screenpos2.y,
                  lineColor.r, lineColor.g, lineColor.b, lineColor.a);
}

void PainterSDL::setFillColor(Color color)
{
    fillColor = color;
}

void PainterSDL::setLineColor(Color color)
{
    lineColor = color;
}

void PainterSDL::translate(const Vector2 &vec)
{
    transform.translation -= vec;
}

void PainterSDL::pushTransform()
{
    transformStack.push_back(transform);
}

void PainterSDL::popTransform()
{
    transform = transformStack.back();
    transformStack.pop_back();
}

void PainterSDL::setClipRectangle(const Rect2D &rect)
{
    Vector2 screenpos = transform.apply(rect.p1);
    SDL_Rect cliprect;
    cliprect.x = (int)screenpos.x;
    cliprect.y = (int)screenpos.y;
    cliprect.w = (int)rect.getWidth();
    cliprect.h = (int)rect.getHeight();
    SDL_RenderSetClipRect(renderer, &cliprect);
}

void PainterSDL::clearClipRectangle()
{
    SDL_RenderSetClipRect(renderer, NULL);
}

void PainterSDL::updateScreen()
{
    SDL_RenderPresent(renderer);
}