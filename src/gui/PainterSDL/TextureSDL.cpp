#include "TextureSDL.hpp"

TextureSDL::TextureSDL(SDL_Renderer *renderer, SDL_Surface *surface) : width(surface->w), height(surface->h)
{
    texture = SDL_CreateTextureFromSurface(renderer, surface);
}

TextureSDL::~TextureSDL()
{
    SDL_DestroyTexture(texture);
}
