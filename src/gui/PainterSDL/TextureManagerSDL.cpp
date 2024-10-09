#include <SDL.h>

#include "TextureManagerSDL.hpp"
#include "TextureSDL.hpp"

class Texture;

static const Uint8 ALPHA_BARRIER = 100;

TextureManagerSDL::TextureManagerSDL(SDL_Renderer *_renderer) : renderer(_renderer)
{
}

TextureManagerSDL::~TextureManagerSDL()
{
}

Texture *
TextureManagerSDL::create(SDL_Surface *image)
{
    SDL_Surface *surface = SDL_ConvertSurfaceFormat(image, SDL_PIXELFORMAT_RGBA8888, 0);
    SDL_FreeSurface(image);

    return new TextureSDL(renderer, surface);
}
