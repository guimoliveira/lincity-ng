#include "Document.hpp"

#include <assert.h>
#include <string.h>
#include <iostream>
#include <memory>
#include <vector>

#include "Child.hpp"
#include "Color.hpp"
#include "ComponentFactory.hpp"
#include "DocumentElement.hpp"
#include "DocumentImage.hpp"
#include "Painter.hpp"
#include "Paragraph.hpp"
#include "Rect2D.hpp"
#include "Vector2.hpp"
#include "XmlReader.hpp"
#include "callback/Callback.hpp"

Document::Document()
{
    setFlags(FLAG_RESIZABLE);
}

Document::~Document()
{
}

void Document::parse(XmlReader &reader)
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
        else if (style.parseAttribute(attribute, value))
        {
            continue;
        }
        else if (attribute == "src")
        {
            XmlReader fileReader("/data/" + value);
            parse(fileReader);
            return;
        }
        else
        {
            std::cerr << "Skipping unknown attribute '"
                      << attribute << "'.\n";
        }
    }

    int depth = reader.getDepth();
    while (reader.read() && reader.getDepth() > depth)
    {
        if (reader.getNodeType() == XML_READER_TYPE_ELEMENT)
        {
            std::string node = reader.getName();
            if (node == "p" || node == "Paragraph" || node == "li")
            {
                std::unique_ptr<Paragraph> paragraph(new Paragraph());
                if (node != "li")
                {
                    paragraph->parse(reader, style);
                }
                else
                {
                    paragraph->parseList(reader, style);
                }
                paragraph->linkClicked.connect(
                    makeCallback(*this, &Document::paragraphLinkClicked));
                addChild(paragraph.release());
            }
            else if (node == "img")
            {
                std::unique_ptr<DocumentImage> image(new DocumentImage());
                image->parse(reader, style);
                addChild(image.release());
            }
            else
            {
                std::cerr << "Skipping unknown node type '" << node << "'.\n";
                reader.nextNode();
            }
        }
        else if (reader.getNodeType() == XML_READER_TYPE_TEXT)
        {
            // TODO create anonymous paragraph...
            std::cerr << "Warning: text outside paragraph not allowed (yet).\n";
        }
    }
}

void Document::resize(float newwidth, float newheight)
{
    height = 0;
    for (Childs::iterator i = childs.begin(); i != childs.end(); ++i)
    {
        Child &child = *i;
        Component *component = child.getComponent();
        DocumentElement *element = dynamic_cast<DocumentElement *>(component);
        if (!element)
        {
            std::cerr << "Component not a DocumentElement in Document::resize!\n";
            continue;
        }

        float compwidth = newwidth - element->getStyle().margin_left - element->getStyle().margin_right;
        if (compwidth < 0)
            compwidth = 0;

        component->resize(compwidth, -1);
        float posx = element->getStyle().margin_left;
        switch (element->getStyle().alignment)
        {
        case Style::ALIGN_LEFT:
            posx += 0;
            break;
        case Style::ALIGN_RIGHT:
            posx += compwidth - component->getWidth();
            break;
        case Style::ALIGN_CENTER:
            posx += (compwidth - component->getWidth()) / 2;
            break;
        default:
            assert(false);
            break;
        }
        height += element->getStyle().margin_top;
        child.setPos(Vector2(posx, height));
        height += component->getHeight() + element->getStyle().margin_bottom;
    }
    width = newwidth;
    if (width < 0)
        width = 0;

    if (height < newheight)
        height = newheight;
}

void Document::addParagraph(Paragraph *paragraph)
{
    paragraph->linkClicked.connect(
        makeCallback(*this, &Document::paragraphLinkClicked));
    addChild(paragraph);
    resize(width, height);
}

void Document::draw(Painter &painter)
{
    if (style.background.a != 0)
    {
        painter.setFillColor(style.background);
        painter.fillRectangle(Rect2D(0, 0, width, height));
    }

    Component::draw(painter);
}

void Document::paragraphLinkClicked(Paragraph *paragraph, const std::string &href)
{
    linkClicked(paragraph, href);
}

IMPLEMENT_COMPONENT_FACTORY(Document)