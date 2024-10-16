#include "Panel.hpp"

#include <stdio.h>
#include <string.h>
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>
#include <vector>

#include "Child.hpp"
#include "ComponentFactory.hpp"
#include "ComponentLoader.hpp"
#include "Painter.hpp"
#include "TextureManager.hpp"
#include "Vector2.hpp"
#include "XmlReader.hpp"

/**
 * Class constructor.
 */
Panel::Panel()
    : background(0)
{
}

/**
 * Class destructor.
 */
Panel::~Panel()
{
}

/**
 * Function for XML parsing.
 *
 * @param reader XmlReader object that represents a XML file.
 */
void Panel::parse(XmlReader &reader)
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
        else if (attribute == "background")
        {
            background = 0;
            background = texture_manager->load("/data/" + value);
        }
        else if (attribute == "width")
        {
            if (sscanf(value.c_str(), "%f", &width) != 1)
            {
                std::stringstream msg;
                msg << "Parse error when parsing width (" << value << ")";
                throw std::runtime_error(msg.str());
            }
        }
        else if (attribute == "height")
        {
            if (sscanf(value.c_str(), "%f", &height) != 1)
            {
                std::stringstream msg;
                msg << "Parse error when parsing height (" << value << ")";
                throw std::runtime_error(msg.str());
            }
        }
        else
        {
            std::cerr << "Skipping unknown attribute '" << attribute << "'.\n";
        }
    }

    if (width <= 0 || height <= 0)
    {
        throw std::runtime_error("invalid width/height");
    }

    Component *component = parseEmbeddedComponent(reader);
    addChild(component);
    if (component->getFlags() & FLAG_RESIZABLE)
    {
        component->resize(width, height);
    }
}

/**
 * @param Painter Painter object that represent the widget that needs to be
 *                drawn.
 */
void Panel::draw(Painter &painter)
{
    if (background)
        painter.drawTexture(background, Vector2(0, 0));

    Component::draw(painter);
}

/**
 * Check if a given component, identified by its position, is opaque or not.
 *
 * @param pos Constant vector representing the component's position.
 * @return True if the component is opaque at this place.
 * @todo Remove code duplication with SwitchComponent::opaque (pos) and
 *       TableLayout::opaque(pos).
 */
bool Panel::opaque(const Vector2 &pos) const
{
    for (Childs::const_iterator i = childs.begin(); i != childs.end(); ++i)
    {
        const Child &child = *i;
        if (child.getComponent() == 0 || !child.isEnabled())
            continue;

        if (child.getComponent()->opaque(pos - child.getPos()))
            return true;
    }

    return false;
}

IMPLEMENT_COMPONENT_FACTORY(Panel)