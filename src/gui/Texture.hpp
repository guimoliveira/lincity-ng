#ifndef __TEXTURE_HPP__
#define __TEXTURE_HPP__

#include <SDL.h>

/**
 * @class Texture
 * @brief Texture have to be created by the TextureManager class.
 */
class Texture
{
public:
    virtual ~Texture()
    {
    }

    virtual float getWidth() const = 0;
    virtual float getHeight() const = 0;
};

#endif
