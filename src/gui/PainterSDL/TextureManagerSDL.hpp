#ifndef __TEXTUREMANAGERSDL_HPP__
#define __TEXTUREMANAGERSDL_HPP__

#include <SDL.h>

#include "gui/TextureManager.hpp"

class Texture;

/**
 * This handles the creation and sharing of textures.
 */
class TextureManagerSDL : public TextureManager
{
public:
    TextureManagerSDL(SDL_Renderer *_renderer);
    virtual ~TextureManagerSDL();

    Texture *create(SDL_Surface *surface);

private:
    SDL_Renderer *renderer;
};

#endif
