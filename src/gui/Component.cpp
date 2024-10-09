#include <assert.h>
#include <string.h>
#include <stdexcept>
#include <vector>
#include <iostream>

#include "Component.hpp"
#include "Event.hpp"
#include "Painter.hpp"

Component::Component() : parent(0), desktop(NULL), flags(0)
{
}

Component::~Component()
{
}

bool Component::parseAttribute(const char *attribute, const char *value)
{
    if (strcmp(attribute, "name") == 0)
    {
        name = value;
        return true;
    }
    else if (strncmp(attribute, "xmlns", 5) == 0)
    { // can be ignored for now
        return true;
    }

    return false;
}

void Component::drawChild(Child &child, Painter &painter)
{
    assert(child.getComponent() != 0);

    if (child.useClipRect)
    {
        painter.setClipRectangle(child.clipRect);
    }
    if (child.position != Vector2(0, 0))
    {
        painter.pushTransform();
        painter.translate(child.position);
    }
    child.component->draw(painter);
    if (child.position != Vector2(0, 0))
    {
        painter.popTransform();
    }
    if (child.useClipRect)
    {
        painter.clearClipRectangle();
    }
}

void Component::draw(Painter &painter)
{
    for (Childs::iterator i = childs.begin(); i != childs.end(); ++i)
    {
        Child &child = *i;
        if (child.enabled)
            drawChild(child, painter);
    }
}

bool Component::eventChild(Child &child, const Event &event, bool visible)
{
    assert(child.getComponent() != 0);

    Event ev = event;
    if (event.type == Event::MOUSEMOTION || event.type == Event::MOUSEBUTTONDOWN || event.type == Event::MOUSEBUTTONUP || event.type == Event::MOUSEWHEEL)
    {
        ev.mousepos -= child.position;
        if (visible && child.component->opaque(ev.mousepos))
            ev.inside = true;
        else
            ev.inside = false;
    }

    child.component->event(ev);
    return ev.inside;
}

void Component::event(const Event &event)
{
    bool visible = event.inside;
    for (Childs::reverse_iterator i = childs.rbegin(); i != childs.rend(); ++i)
    {
        Child &child = *i;
        if (!child.enabled)
            continue;

        if (eventChild(child, event, visible))
            visible = false;
    }
}

void Component::reLayout()
{
    if (getFlags() & FLAG_RESIZABLE)
    {
        resize(getWidth(), getHeight());
    }
}

Component *
Component::findComponent(const std::string &name)
{
    if (getName() == name)
        return this;

    for (Childs::const_iterator i = childs.begin(); i != childs.end(); ++i)
    {
        const Child &child = *i;
        if (child.getComponent())
        {
            Component *component = child.component->findComponent(name);
            if (component)
                return component;
        }
    }

    return 0;
}

Vector2
Component::relative2Global(const Vector2 &pos)
{
    if (!parent)
        return pos;

    Child &me = parent->findChild(this);
    return parent->relative2Global(me.getPos() + pos);
}

Child &
Component::addChild(Component *component)
{
    assert(component->parent == 0);

    childs.push_back(Child(component));
    component->parent = this;
    component->desktop = this->desktop;
    component->setDirty();
    return childs.back();
}

void Component::resetChild(Child &child, Component *component)
{
    assert(child.component != component);

    delete child.component;
    child.component = component;
    if (component != 0)
    {
        component->parent = this;
        component->desktop = this->desktop;
        component->setDirty();
        child.enabled = true;
    }
}

void Component::resize(float, float)
{
}

void Component::setDirty(const Rect2D &rect)
{
    if (parent)
        parent->setChildDirty(this, rect);
}

Child &
Component::findChild(Component *component)
{
    for (Childs::iterator i = childs.begin(); i != childs.end(); ++i)
    {
        Child &child = *i;
        if (child.getComponent() == component)
            return child;
    }
    throw std::runtime_error("Child not found");
}

void Component::setChildDirty(Component *childComponent, const Rect2D &area)
{
    for (Childs::const_iterator i = childs.begin(); i != childs.end(); ++i)
    {
        const Child &child = *i;
        if (child.getComponent() != childComponent)
            continue;
        if (!child.enabled)
            return;
        Rect2D rect = area;
        rect.move(child.position);
        setDirty(rect);
        return;
    }

    assert(false);
}