#include "SwitchComponent.hpp"

#include <iostream>
#include <vector>

#include "Child.hpp"
#include "ComponentFactory.hpp"
#include "ComponentLoader.hpp"
#include "Vector2.hpp"
#include "XmlReader.hpp"

/**
 * Class constructor.
 */
SwitchComponent::SwitchComponent()
{
    setFlags(FLAG_RESIZABLE);
}

SwitchComponent::~SwitchComponent()
{
}

/**
 * Function for XML parsing.
 *
 * @param reader XmlReader object that represents a XML file.
 */
void SwitchComponent::parse(XmlReader &reader)
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
        else
        {
            std::cerr << "Skipping unknown attribute '" << attribute << "'.\n";
        }
    }

    int depth = reader.getDepth();
    bool first = true;
    while (reader.read() && reader.getDepth() > depth)
    {
        if (reader.getNodeType() == XML_READER_TYPE_ELEMENT)
        {
            std::string element = reader.getName();

            Component *component = createComponent(element, reader);
            Child &child = addChild(component);
            if (first)
            {
                child.enable(true);
                first = false;
            }
            else
            {
                child.enable(false);
            }
        }
    }
}

/**
 * Function to resize all resizable components.
 *
 * @param width New width to resize to.
 * @param height New height to resize to.
 */
void SwitchComponent::resize(float width, float height)
{
    if (width < 0)
        width = 0;
    if (height < 0)
        height = 0;
    for (Childs::iterator i = childs.begin(); i != childs.end(); ++i)
    {
        Child &child = *i;
        if (child.getComponent() == 0)
        {
#ifdef DEBUG
            std::cerr << "Child in SwitchComponent==0 ?!?\n";
#endif
            continue;
        }
        if (!(child.getComponent()->getFlags() & FLAG_RESIZABLE))
            continue;

        child.getComponent()->resize(width, height);
        // TODO: honor minimum size of children
    }
    this->width = width;
    this->height = height;
}

/**
 * Function to switch to a given component.
 *
 * @param name Name of the component to switch to.
 */
void SwitchComponent::switchComponent(const std::string &name)
{
    bool found = false;
    for (Childs::iterator i = childs.begin(); i != childs.end(); ++i)
    {
        Child &child = *i;
        if (child.getComponent()->getName() == name)
        {
            child.enable(true);
            found = true;
        }
        else
        {
            child.enable(false);
        }
    }

    if (!found)
    {
#ifdef DEBUG
        std::cerr << "No component named '" << name << "' found "
                  << "while switching components.\n";
#endif
        if (!childs.empty())
        {
            childs[0].enable(true);
        }
    }
    setDirty();
}

/**
 * Function to get the current active component.
 *
 * @return Returns a pointer to the active component.
 */
Component *
SwitchComponent::getActiveComponent()
{
    for (Childs::iterator i = childs.begin(); i != childs.end(); ++i)
    {
        Child &child = *i;
        if (child.isEnabled())
            return child.getComponent();
    }

    return 0;
}

/**
 * Check if a given component, identified by its position, is opaque or not.
 *
 * @param pos Constant vector representing the component's position.
 * @return True if the component is opaque at this place.
 * @todo Remove code duplication with TableLayout::opaque (pos) and
 *       Panel::opaque(pos).
 */
bool SwitchComponent::opaque(const Vector2 &pos) const
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

IMPLEMENT_COMPONENT_FACTORY(SwitchComponent)