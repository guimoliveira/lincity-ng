#include "Image.hpp"

#include <stdio.h>
#include <string.h>
#include <iostream>
#include <sstream>
#include <stdexcept>

#include "ComponentFactory.hpp"
#include "Painter.hpp"
#include "Rect2D.hpp"
#include "Texture.hpp"
#include "TextureManager.hpp"
#include "Vector2.hpp"
#include "XmlReader.hpp"

Image::Image()
    : texture(0)
{
}

Image::~Image()
{
}

void Image::parse(XmlReader &reader)
{
    bool resizable = false;

    bool grey = false;

    XmlReader::AttributeIterator iter(reader);
    while (iter.next())
    {
        std::string attribute = iter.getName();
        std::string value = iter.getValue();

        if (parseAttribute(attribute, value))
        {
            continue;
        }
        else if (attribute == "width")
        {
            if (sscanf(value.c_str(), "%f", &width) != 1)
            {
                std::stringstream msg;
                msg << "Couldn't parse width '" << value << "'.";
                throw std::runtime_error(msg.str());
            }
        }
        else if (attribute == "height")
        {
            if (sscanf(value.c_str(), "%f", &height) != 1)
            {
                std::stringstream msg;
                msg << "Couldn't parse height '" << value << "'.";
                throw std::runtime_error(msg.str());
            }
        }
        else if (attribute == "src")
        {
            filename = "/data/" + value;
        }
        else if (attribute == "filter")
        {
            if (value ==  "grey")
            {
                grey = true;
            }
            else if (value == "no")
            {
                grey = false;
            }
            else
            {
                std::cerr << "Unknown filter value '" << value << "'.\n";
                std::cerr << "Should be 'grey' or 'no'.\n";
            }
        }
        else if (attribute == "resizable")
        {
            if (value == "yes")
                resizable = true;
            else if (value == "no")
                resizable = false;
            else
                std::cerr
                    << "You should specify 'yes' or 'no' for the resizable"
                    << "attribute\n";
        }
        else
        {
            std::cerr << "Skipping unknown attribute '"
                      << attribute << "'.\n";
        }
    }

    if (filename == "")
        throw std::runtime_error("No filename specified for image");

    texture = 0;
    texture = texture_manager->load(filename,
                                    grey ? TextureManager::FILTER_GREY : TextureManager::NO_FILTER);

    if (width <= 0 || height <= 0)
    {
        width = texture->getWidth();
        height = texture->getHeight();
    }

    if (resizable)
        flags |= FLAG_RESIZABLE;
}

void Image::resize(float width, float height)
{
    if (width < 0)
        width = 0;
    if (height < 0)
        height = 0;
    this->width = width;
    this->height = height;
}

void Image::draw(Painter &painter)
{
    if (width != texture->getWidth() || height != texture->getHeight())
        painter.drawStretchTexture(texture, Rect2D(0, 0, width, height));
    else
        painter.drawTexture(texture, Vector2(0, 0));
}

std::string Image::getFilename() const
{
    return filename;
}

void Image::setFile(const std::string &pfilename)
{
    filename = pfilename;
    texture = 0;
    texture = texture_manager->load(pfilename);
}

IMPLEMENT_COMPONENT_FACTORY(Image)