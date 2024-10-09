#include <SDL.h>
#include <assert.h>
#include <math.h>
#include <string.h>
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>

#include "ComponentFactory.hpp"
#include "Gradient.hpp"
#include "Painter.hpp"
#include "Texture.hpp"
#include "TextureManager.hpp"
#include "Vector2.hpp"
#include "XmlReader.hpp"

#ifdef _MSC_VER
#define lrintf(x) (long int)x
#endif

Gradient::Gradient()
    : direction(LEFT_RIGHT)
{
}

Gradient::~Gradient()
{
}

void Gradient::parse(XmlReader &reader)
{
    XmlReader::AttributeIterator iter(reader);
    while (iter.next())
    {
        std::string attribute = iter.getName();
        std::string value = iter.getValue();

        if (parseAttribute(attribute, value))
        {
            continue;
        }
        else if (attribute == "from")
        {
            from.parse(value.c_str());
        }
        else if (attribute == "to")
        {
            to.parse(value.c_str());
        }
        else if (attribute == "direction")
        {
            if (value == "left-right")
            {
                direction = LEFT_RIGHT;
            }
            else if (value == "top-bottom")
            {
                direction = TOP_BOTTOM;
            }
            else
            {
                std::stringstream msg;
                msg << "Invalid gradient direction '" << value << "'.";
                throw std::runtime_error(msg.str());
            }
        }
        else
        {
            std::cerr << "Skipping unknown attribute '"
                      << attribute << "'.\n";
        }
    }

    flags |= FLAG_RESIZABLE;
}

void Gradient::resize(float width, float height)
{
    assert(direction == LEFT_RIGHT || direction == TOP_BOTTOM);
    if (width < 0)
        width = 0;
    if (height < 0)
        height = 0;
    float w = direction == LEFT_RIGHT ? width : height;
    float dr = ((float)to.r - (float)from.r) / w;
    float dg = ((float)to.g - (float)from.g) / w;
    float db = ((float)to.b - (float)from.b) / w;
    float da = ((float)to.a - (float)from.a) / w;

#if SDL_BYTEORDER == SDL_BIG_ENDIAN
    SDL_Surface *surface = SDL_CreateRGBSurface(SDL_SWSURFACE,
                                                (int)width, (int)height,
                                                32, 0xff000000,
                                                0x00ff0000,
                                                0x0000ff00,
                                                0x000000ff);
#else
    SDL_Surface *surface = SDL_CreateRGBSurface(SDL_SWSURFACE,
                                                (int)width, (int)height,
                                                32, 0x000000ff,
                                                0x0000ff00,
                                                0x00ff0000,
                                                0xff000000);
#endif
    if (surface == 0)
        throw std::runtime_error("Couldn't create SDL_Surface for gradient. "
                                 "(Out of memory?");

    float r = from.r;
    float g = from.g;
    float b = from.b;
    float a = from.a;
    if (direction == LEFT_RIGHT)
    {
        for (int x = 0; x < (int)width; ++x)
        {
            draw_vertical_line(surface, x, 0, (int)height,
                               lrintf(r), lrintf(g),
                               lrintf(b), lrintf(a));
            r += dr;
            g += dg;
            b += db;
            a += da;
        }
    }
    else
    {
        for (int y = 0; y < (int)height; ++y)
        {
            draw_horizontal_line(surface, 0, y, (int)width,
                                 lrintf(r), lrintf(g),
                                 lrintf(b), lrintf(a));
            r += dr;
            g += dg;
            b += db;
            a += da;
        }
    }

    texture.reset(texture_manager->create(surface));
    this->width = width;
    this->height = height;
}

void Gradient::draw(Painter &painter)
{
    painter.drawTexture(texture.get(), Vector2(0, 0));
}

inline void
Gradient::draw_horizontal_line(SDL_Surface *surface, int x1, int y1, int x2,
                               uint8_t r, uint8_t g, uint8_t b, uint8_t a)
{
    uint32_t col = (uint32_t)r << surface->format->Rshift | (uint32_t)g << surface->format->Gshift | (uint32_t)b << surface->format->Bshift | (uint32_t)a << surface->format->Ashift;

    uint8_t *pix = (uint8_t *)surface->pixels + (y1 * surface->pitch) + x1 * 4;
    for (int x = x1; x < x2; ++x)
    {
        uint32_t *p = (uint32_t *)pix;
        *p = col;
        pix += 4;
    }
}

inline void
Gradient::draw_vertical_line(SDL_Surface *surface, int x1, int y1, int y2,
                             uint8_t r, uint8_t g, uint8_t b, uint8_t a)
{
    uint32_t col = (uint32_t)r << surface->format->Rshift | (uint32_t)g << surface->format->Gshift | (uint32_t)b << surface->format->Bshift | (uint32_t)a << surface->format->Ashift;
    int pitch = surface->pitch;

    uint8_t *pix = (uint8_t *)surface->pixels + (y1 * pitch) + x1 * 4;
    for (int y = y1; y < y2; ++y)
    {
        uint32_t *p = (uint32_t *)pix;
        *p = col;
        pix += pitch;
    }
}

IMPLEMENT_COMPONENT_FACTORY(Gradient)