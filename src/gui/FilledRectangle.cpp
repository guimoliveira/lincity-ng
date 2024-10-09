#include <string.h>
#include <iostream>

#include "ComponentFactory.hpp"
#include "FilledRectangle.hpp"
#include "Painter.hpp"
#include "Rect2D.hpp"
#include "XmlReader.hpp"

FilledRectangle::FilledRectangle()
{
}

FilledRectangle::~FilledRectangle()
{
}

void FilledRectangle::parse(XmlReader &reader)
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
        else if (attribute == "color")
        {
            color.parse(value.c_str());
        }
        else
        {
            std::cerr << "Unknown attribute '" << attribute
                      << "' in FilledRectangle.\n";
        }
    }

    flags |= FLAG_RESIZABLE;
}

void FilledRectangle::resize(float width, float height)
{
    if (width < 0)
        width = 0;
    if (height < 0)
        height = 0;
    this->width = width;
    this->height = height;
}

void FilledRectangle::draw(Painter &painter)
{
    painter.setFillColor(color);
    painter.fillRectangle(Rect2D(0, 0, width, height));
}

IMPLEMENT_COMPONENT_FACTORY(FilledRectangle)