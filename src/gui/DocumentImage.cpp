#include "DocumentImage.hpp"

#include <stdio.h>
#include <string.h>
#include <iostream>
#include <sstream>
#include <stdexcept>

#include "Painter.hpp"
#include "Texture.hpp"
#include "TextureManager.hpp"
#include "Vector2.hpp"
#include "XmlReader.hpp"

DocumentImage::DocumentImage()
    : texture(0)
{
}

DocumentImage::~DocumentImage()
{
}

void DocumentImage::parse(XmlReader &reader, const Style &parentstyle)
{
    style = parentstyle;

    XmlReader::AttributeIterator iter(reader);
    while (iter.next())
    {
        std::string attribute = iter.getName();
        std::string value = iter.getValue();

        if (parseAttribute(attribute, value))
        {
            continue;
        }
        else if (style.parseAttribute(attribute, value))
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
            filename = value;
            texture = 0;
            texture = texture_manager->load("/data/" + value);
        }
        else
        {
            std::cerr << "Skipping unknown attribute '"
                      << attribute << "'.\n";
        }
    }

    width = texture->getWidth();
    height = texture->getHeight();
}

void DocumentImage::resize(float, float)
{
}

void DocumentImage::draw(Painter &painter)
{
    painter.drawTexture(texture, Vector2(0, 0));
}
