#include "TextureManager.hpp"

#include <SDL.h>
#include <SDL_image.h>
#include <iostream>
#include <sstream>
#include <fstream>
#include <string>
#include <stdexcept>
#include <utility>

#include "Filter.hpp"
#ifdef DEBUG
#include <cassert>
#endif

TextureManager *texture_manager = 0;

TextureManager::~TextureManager()
{
    for (Textures::iterator i = textures.begin(); i != textures.end(); ++i)
        delete i->second;
}

Texture *
TextureManager::load(const std::string &filename, Filter filter)
{
    TextureInfo info;
    info.filename = filename;
    info.filter = filter;

    Textures::iterator i = textures.find(info);
    if (i != textures.end())
    {
        return i->second;
    }

    SDL_Surface *image;

    try
    {
        image = IMG_Load(filename.c_str());
        if (!image)
        {
            std::stringstream msg;
            msg << "Couldn't load image '" << filename
                << "' :" << SDL_GetError();
            throw std::runtime_error(msg.str());
        }
    }
    catch (std::exception &e)
    {
        std::cerr << "Unexpected exception: " << e.what() << "\n";
    }
    catch (...)
    {
        std::cerr << "Unexpected exception.\n";
    }

    switch (filter)
    {
    case FILTER_GREY:
        color2Grey(image);
        break;
    case NO_FILTER:
        break;
    default:
#ifdef DEBUG
        assert(false);
#endif
        std::cerr << "Unknown filter specified for image.\n";
        break;
    }

    Texture *result = create(image);
    textures.insert(std::make_pair(info, result));

    return result;
}