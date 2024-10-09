#include "Desktop.hpp"

#include <SDL.h>
#include <stddef.h>
#include <iostream>
#include <stdexcept>
#include <string>

#include "Child.hpp"
#include "ComponentLoader.hpp"
#include "Style.hpp"
#include "XmlReader.hpp"

class Event;
class Painter;

Desktop::Desktop()
{
    setFlags(FLAG_RESIZABLE);
    desktop = this;
    cursor = SDL_GetDefaultCursor();
    cursorOwner = NULL;
}

Desktop::~Desktop()
{
    freeAllSystemCursors();
}

void Desktop::parse(XmlReader &reader)
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
    while (reader.read() && reader.getDepth() > depth)
    {
        if (reader.getNodeType() == XML_READER_TYPE_ELEMENT)
        {
            std::string element = reader.getName();

            if (element == "DefineStyle")
            {
                parseStyleDef(reader);
            }
            else
            {
                Component *component = createComponent(element, reader);
                addChild(component);
            }
        }
    }
}

void Desktop::event(const Event &event)
{
    Component::event(event);
}

bool Desktop::needsRedraw() const
{
    return dirtyRectangles.size() > 0;
}

void Desktop::draw(Painter &painter)
{
    if (dirtyRectangles.size() > 0)
    {
        Component::draw(painter);
        if (cursor != SDL_GetCursor())
            SDL_SetCursor(cursor);
    }
    dirtyRectangles.clear();
}

bool Desktop::opaque(const Vector2 &pos) const
{
    for (Childs::const_iterator i = childs.begin(); i != childs.end(); ++i)
    {
        const Child &child = *i;
        if (!child.getComponent() || !child.isEnabled())
            continue;

        if (child.getComponent()->opaque(pos - child.getPos()))
        {
            return true;
        }
    }

    return false;
}

void Desktop::resize(float width, float height)
{
    for (Childs::iterator i = childs.begin(); i != childs.end(); ++i)
    {
        Component *component = i->getComponent();
        if (component->getFlags() & FLAG_RESIZABLE)
            component->resize(width, height);
#ifdef DEBUG
        if (!(component->getFlags() & FLAG_RESIZABLE) && (component->getWidth() <= 0 || component->getHeight() <= 0))
            std::cerr << "Warning: component with name '"
                      << component->getName()
                      << "' has invalid width/height but is not resizable.\n";
#endif
    }
    this->width = width;
    this->height = height;
    Component::setDirty();
}

Vector2
Desktop::getPos(Component *component)
{
    // find child
    Child *child = 0;
    for (Childs::iterator i = childs.begin(); i != childs.end(); ++i)
    {
        if (i->getComponent() == component)
        {
            child = &(*i);
            break;
        }
    }
    if (child == 0)
        throw std::runtime_error(
            "Trying to getPos a component that is not a direct child");

    return child->getPos();
}

void Desktop::setCursor(Component *owner, SDL_Cursor *cursor)
{
    if (cursor != this->cursor)
        setDirty(Rect2D());
    this->cursor = cursor;
    cursorOwner = owner;
}

void Desktop::setSystemCursor(Component *owner, SDL_SystemCursor id)
{
    setCursor(owner, getSystemCursor(id));
}

void Desktop::tryClearCursor(Component *owner)
{
    if (owner == cursorOwner)
    {
        setCursor(NULL, SDL_GetDefaultCursor());
    }
}

SDL_Cursor *
Desktop::getSystemCursor(SDL_SystemCursor id)
{
    SDL_Cursor *&cursor = systemCursors[id];
    if (!cursor)
        cursor = SDL_CreateSystemCursor(id);
    return cursor;
}

void Desktop::freeSystemCursor(SDL_SystemCursor id)
{
    SDL_FreeCursor(systemCursors[id]);
    systemCursors[id] = NULL;
}

void Desktop::freeAllSystemCursors()
{
    for (int id = 0; id < SDL_NUM_SYSTEM_CURSORS; id++)
        freeSystemCursor((SDL_SystemCursor)id);
}

void Desktop::setDirty(const Rect2D &rect)
{
    // check if rectangle overlaps with 1 of the existing rectangles
    for (DirtyRectangles::iterator i = dirtyRectangles.begin();
         i != dirtyRectangles.end(); ++i)
    {
        if (i->overlap(rect))
        {
            i->join(rect);
            return;
        }
    }

    // add a new dirty rectangle if no overlap occured
    /*std::cout << "Adding new rectangle: "
        << rect.p1.x << "," << rect.p1.y << ","
        << rect.p2.x << "," << rect.p2.y << "\n"; */
    dirtyRectangles.push_back(rect);

    Component::setDirty(rect);
}