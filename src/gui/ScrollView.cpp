#include "ScrollView.hpp"

#include <iostream>
#include <memory>
#include <stdexcept>
#include <string>

#include "ComponentFactory.hpp"
#include "ComponentLoader.hpp"
#include "Event.hpp"
#include "Rect2D.hpp"
#include "ScrollBar.hpp"
#include "Vector2.hpp"
#include "XmlReader.hpp"
#include "callback/Callback.hpp"
#include "callback/Signal.hpp"

#ifdef DEBUG
#include <assert.h>
#endif

static const float MOUSEWHEELSCROLL = 90;

ScrollView::ScrollView()
{
}

ScrollView::~ScrollView()
{
}

void ScrollView::parse(XmlReader &reader)
{
    // parse xml attributes
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
            std::cerr << "Skipping unknown attribute '"
                      << attribute << "'.\n";
        }
    }

    // we need 2 child components
    childs.assign(2, Child());

    // parse xml contents
    int depth = reader.getDepth();
    while (reader.read() && reader.getDepth() > depth)
    {
        if (reader.getNodeType() == XML_READER_TYPE_ELEMENT)
        {
            std::string element = reader.getName();

            if (element == "scrollbar")
            {
                std::unique_ptr<ScrollBar> scrollbar(new ScrollBar());
                scrollbar->parse(reader);
                resetChild(scrollBar(), scrollbar.release());
            }
            else if (element == "contents")
            {
                resetChild(contents(), parseEmbeddedComponent(reader));
            }
            else
            {
                std::cerr << "Skipping unknown element '" << element << "'.\n";
            }
        }
    }

    if (scrollBar().getComponent() == 0)
    {
        throw std::runtime_error("No ScrollBar specified in ScrollView");
    }
    ScrollBar *scrollBarComponent = (ScrollBar *)scrollBar().getComponent();
    scrollBarComponent->valueChanged.connect(
        makeCallback(*this, &ScrollView::scrollBarChanged));

    setFlags(FLAG_RESIZABLE);
}

void ScrollView::resize(float newwidth, float newheight)
{
    if (newwidth < 1)
        newwidth = 1;
    if (newheight < 1)
        newheight = 1;
    float scrollBarWidth = scrollBar().getComponent()->getWidth();
    scrollBar().getComponent()->resize(scrollBarWidth, newheight);
    scrollBar().setPos(Vector2(newwidth - scrollBarWidth, 0));
    if (newwidth < scrollBar().getComponent()->getWidth() + 1)
        newwidth = scrollBar().getComponent()->getWidth() + 1;
    if (newheight != scrollBar().getComponent()->getHeight())
        newheight = scrollBar().getComponent()->getHeight();

    float scrollarea = 0;
    if (contents().getComponent() != 0)
    {
        Component *component = contents().getComponent();
        if (component->getFlags() & FLAG_RESIZABLE)
            component->resize(newwidth - scrollBarWidth, newheight);
        contents().setClipRect(
            Rect2D(0, 0, newwidth - scrollBarWidth, newheight));
        scrollarea = component->getHeight() - newheight;
        if (scrollarea < 0)
            scrollarea = 0;
    }

    ScrollBar *scrollBarComponent = (ScrollBar *)scrollBar().getComponent();
    scrollBarComponent->setRange(0, scrollarea);
    scrollBarComponent->setValue(0);

    width = newwidth;
    height = newheight;

    setDirty();
}

void ScrollView::scrollBarChanged(ScrollBar *, float newvalue)
{
    contents().setPos(Vector2(0, -newvalue));
    setDirty();
}

void ScrollView::event(const Event &event)
{
    if (event.type == Event::MOUSEWHEEL)
    {
        if (!event.inside)
            return;

        ScrollBar *scrollBarComp = dynamic_cast<ScrollBar *>(scrollBar().getComponent());
        if (scrollBarComp == 0)
        {
#ifdef DEBUG
            assert(false);
#endif
            return;
        }
        float val = -contents().getPos().y;
        val -= event.scrolly * 20;
        if (val < scrollBarComp->getRangeMin())
            val = scrollBarComp->getRangeMin();
        if (val > scrollBarComp->getRangeMax())
            val = scrollBarComp->getRangeMax();
        contents().setPos(Vector2(0, -val));
        scrollBarComp->setValue(val);
        setDirty();
    }

    Component::event(event);
}

void ScrollView::replaceContents(Component *component)
{
    resetChild(contents(), component);
    contents().setPos(Vector2(0, 0));
    resize(width, height);
}

IMPLEMENT_COMPONENT_FACTORY(ScrollView)
