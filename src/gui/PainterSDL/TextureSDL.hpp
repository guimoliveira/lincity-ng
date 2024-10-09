#ifndef __TEXTURESDL_HPP__
#define __TEXTURESDL_HPP__

#include <SDL.h>
#include <stddef.h>

#include "gui/Texture.hpp"

/**
 * Texture have to be created by the TextureManager class
 */
class TextureSDL : public Texture
{
public:
    virtual ~TextureSDL();

    float getWidth() const
    {
        return width;
    }
    float getHeight() const
    {
        return height;
    }

private:
    friend class PainterSDL;
    friend class TextureManagerSDL;

    TextureSDL(SDL_Renderer *renderer, SDL_Surface *surface);

    SDL_Texture *texture;
    const int width, height;
};

#endif