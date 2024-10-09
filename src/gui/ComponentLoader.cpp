#include "ComponentLoader.hpp"

#include <string.h>
#include <exception>
#include <iostream>
#include <map>
#include <memory>
#include <sstream>
#include <stdexcept>
#include <utility>

#include "Component.hpp"
#include "ComponentFactory.hpp"
#include "Desktop.hpp"
#include "Style.hpp"
#include "XmlReader.hpp"

Component *createComponent(const std::string &type, XmlReader &reader)
{
    if (component_factories == 0)
        throw std::runtime_error("No component factories registered");

    ComponentFactories::iterator i = component_factories->find(type);
    if (i == component_factories->end())
    {
        std::stringstream msg;
        msg << "Couldn't find a component factory for '" << type << "'";
        throw std::runtime_error(msg.str());
    }
    try
    {
        return i->second->createComponent(reader);
    }
    catch (std::exception &e)
    {
        std::stringstream msg;
        msg << "Error while parsing component '" << type << "': " << e.what();
        throw std::runtime_error(msg.str());
    }
    catch (...)
    {
        throw;
    }
}

Component *loadGUIFile(const std::string &filename)
{
    XmlReader reader(filename);

    std::string componentName = reader.getName();
    if (componentName == "gui")
    {
        std::unique_ptr<Desktop> desktop(new Desktop());
        desktop->parse(reader);
        return desktop.release();
    }

    std::unique_ptr<Component> component(createComponent(componentName, reader));
    return component.release();
}

Component *parseEmbeddedComponent(XmlReader &reader)
{
    Component *component = 0;
    try
    {
        int depth = reader.getDepth();
        while (reader.read() && reader.getDepth() > depth)
        {
            if (reader.getNodeType() == XML_READER_TYPE_ELEMENT)
            {
                std::string name = reader.getName();
                if (name == "DefineStyle")
                {
                    parseStyleDef(reader);
                }
                else if (component == 0)
                {
                    component = createComponent(name, reader);
                }
                else
                {
                    std::cerr << "Multiple components specified."
                              << " Skipping '" << name << "'.\n";
                    continue;
                }
            }
        }
    }
    catch (...)
    {
        delete component;
        throw;
    }

    return component;
}