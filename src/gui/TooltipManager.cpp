#include "TooltipManager.hpp"

#include <iostream>
#include <map>
#include <memory>
#include <utility>

#include "ComponentFactory.hpp"
#include "Document.hpp"
#include "Event.hpp"
#include "Paragraph.hpp"
#include "Style.hpp"
#include "Vector2.hpp"
#include "XmlReader.hpp"

TooltipManager *tooltipManager = 0;

TooltipManager::TooltipManager()
{
    childs.assign(1, Child());
    if (tooltipManager == 0)
        tooltipManager = this;

    setFlags(FLAG_RESIZABLE);
}

TooltipManager::~TooltipManager()
{
    if (tooltipManager == this)
        tooltipManager = 0;
}

void TooltipManager::parse(XmlReader &reader)
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
            std::cerr << "Skipping unknown attribute '" << attribute
                      << "' in TooltipManager.\n";
        }
    }

    int depth = reader.getDepth();
    while (reader.read() && reader.getDepth() > depth)
    {
        if (reader.getNodeType() == XML_READER_TYPE_ELEMENT)
        {
            std::string element = reader.getName();
            std::cerr << "Skipping unknown child '" << element
                      << "in TooltipManager.\n";
        }
    }
}

void TooltipManager::resize(float width, float height)
{
    if (width < 0)
        width = 0;
    if (height < 0)
        height = 0;
    this->width = width;
    this->height = height;
}

bool TooltipManager::opaque(const Vector2 &) const
{
    return false;
}

void TooltipManager::event(const Event &event)
{
    if (event.type == Event::MOUSEMOTION)
    {
        if (comp_tooltip().getComponent() != 0)
        {
            comp_tooltip().setComponent(0);
        }
    }
}

void TooltipManager::showTooltip(const std::string &text, const Vector2 &pos)
{
    std::unique_ptr<Document> d(new Document());
    std::unique_ptr<Paragraph> p(new Paragraph());

    std::map<std::string, Style>::iterator s = styleRegistry.find("tooltip");
    if (s == styleRegistry.end())
    {
        std::cerr << "Warning: No tooltip style defined.\n";
        p->setText(text);
    }
    else
    {
        p->setText(text, s->second);
        d->style = s->second;
    }
    d->addParagraph(p.release());
    d->resize(250, -1);
    Vector2 dest = pos + Vector2(-100, 26);
    if (dest.x < 20)
        dest.x = 20;
    if (dest.y < 20)
        dest.y = 20;
    if (dest.x + d->getWidth() > getWidth() - 20)
        dest.x = getWidth() - 20 - d->getWidth();
    if (dest.y + d->getHeight() > getHeight() - 20)
        dest.y = pos.y - 20 - d->getHeight();
    /* Show minimap tooltip above. Hardcoded size corresponding to .xml  */
    if (dest.x > getWidth() - 310)
        dest.y = pos.y - 20 - d->getHeight();
    comp_tooltip().setComponent(d.release());
    comp_tooltip().setPos(dest);
    setDirty();
}

IMPLEMENT_COMPONENT_FACTORY(TooltipManager)