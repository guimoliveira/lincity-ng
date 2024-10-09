#include "PBar.hpp"

#include <stdio.h>
#include <string.h>
#include <iomanip>
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <string>

#include "../lincity/lclib.h"
#include "Util.hpp"
#include "gui/Color.hpp"
#include "gui/ComponentFactory.hpp"
#include "gui/ComponentLoader.hpp"
#include "gui/Painter.hpp"
#include "gui/Paragraph.hpp"
#include "gui/Rect2D.hpp"
#include "gui/XmlReader.hpp"
#include "gui_interface/pbar_interface.h"

// LCPBar* LCPBarInstance = 0;
LCPBar *LCPBarPage1 = 0;
LCPBar *LCPBarPage2 = 0;
int pbarGlobalStyle = PBAR_GLOBAL_STYLES - 1;
extern const char *commodityNames[];

LCPBar::LCPBar()
{
    // LCPBarInstance = this;
}

LCPBar::~LCPBar()
{
    /*    if(LCPBarInstance == this)
            LCPBarInstance = 0;*/
}

void LCPBar::parse(XmlReader &reader)
{
    XmlReader::AttributeIterator iter(reader);
    while (iter.next())
    {
        std::string name = iter.getName();
        std::string value = iter.getValue();

        if (parseAttribute(name, value))
        {
            continue;
        }
        else
        {
            std::cerr << "Unknown attribute '" << name
                      << "' skipped in PBar.\n";
        }
    }

    if (getName() == "PBar")
    {
        LCPBarPage1 = this;
    }
    else if (getName() == "PBar2nd")
    {
        LCPBarPage2 = this;
    }
    else
    {
        std::cerr << "Unknown LCBar component '" << getName() << "' found.\n";
    }

    Component *component = parseEmbeddedComponent(reader);
    addChild(component);

    width = component->getWidth();
    height = component->getHeight();
}

#define pbar_adjust_tech(diff) diff > 0 ? diff / 40 + 1 : -((-diff + 1) / 20)
#define pbar_adjust_money(diff) diff > 0 ? diff / 800 + 1 : diff / 400

void LCPBar::setValue(int num, int value, int diff)
{
    if ((num > 8) && (pbarGlobalStyle == 0))
    {
        return;
    }
    if ((pbarGlobalStyle == 1) && (num > 2) && (num < 9))
    {
        return;
    }

    std::ostringstream os;
    int line_number = num + 1;
    if ((pbarGlobalStyle == 1) && (num > 8))
    {
        line_number -= PBAR_PAGE_SHIFT;
    }

    os << "pbar_text" << line_number;
    Paragraph *p = getParagraph(*this, os.str());
    os.str("");
    // compname << "pbar_title" << line_number;
    // Paragraph* pt = getParagraph(*this, compname.str());

    if (num == PTECH)
    {
        os << std::fixed;
        os << std::setprecision(1);
        os << value / 10000.0;
    }
    else if (num == PMONEY || num == PPOP || num == PPOL)
    {
        char s[12];
        num_to_ansi(s, sizeof(s), value);
        os << s;
    }
    else if ((num >= PFOOD) && (num <= PHOUSE)) // millis displayed as %
    {
        os << std::fixed;
        os << std::setprecision(1);
        os << value / 10.0 << "%";
    }
    else
    {
        os << "default";
    }
    if (p)
    {
        p->setText(os.str());
    }

    float sv = 0;
    switch (num)
    {
    case PPOP:
        sv = 2 * diff;
        break;
    case PTECH:
        sv = (diff > 0) ? (diff / 40 + 1) : -((-diff) / 20);
    case PPOL:
        sv = value < 5000 ? 100 * diff / (1 + value) : value < 25000 ? 500 * diff / value
                                                                     : 5000 * diff / value;
        break;
    case PMONEY:
        sv = pbar_adjust_money(diff);
        break;
    default:
        sv = diff;
        break;
    };

    sv /= 10.0;

    if (sv > 1.0)
        sv = 1.0;
    if (sv < -1.0)
        sv = -1.0;

    os.str("");
    os << "pbar_barview" << line_number;
    Component *c = findComponent(os.str() + "a");
    if (c)
    {
        BarView *bv = dynamic_cast<BarView *>(c);
        if (bv)
        {
            bv->setValue(sv);
        }
    }
    c = findComponent(os.str() + "b");
    if (c)
    {
        BarView *bv = dynamic_cast<BarView *>(c);
        if (bv)
        {
            bv->setValue(sv);
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////
// BarView
///////////////////////////////////////////////////////////////////////////////////////

BarView::BarView()
{
}

BarView::~BarView()
{
}

void BarView::parse(XmlReader &reader)
{
    dir = true;
    bad = false;
    // parse attributes...
    XmlReader::AttributeIterator iter(reader);
    while (iter.next())
    {
        std::string name = iter.getName();
        std::string value = iter.getValue();

        if (parseAttribute(name, value))
        {
            continue;
        }
        else if (name == "width")
        {
            if (sscanf(value.c_str(), "%f", &width) != 1)
            {
                std::stringstream msg;
                msg << "Couldn't parse width attribute (" << value << ").";
                throw std::runtime_error(msg.str());
            }
        }
        else if (name == "height")
        {
            if (sscanf(value.c_str(), "%f", &height) != 1)
            {
                std::stringstream msg;
                msg << "Couldn't parse height attribute (" << value << ").";
                throw std::runtime_error(msg.str());
            }
        }
        else if (name == "dir")
        {
            if (value == "1")
            {
                dir = true;
            }
            else
            {
                dir = false;
            }
        }
        else if (name == "bad")
        {
            if (value == "1")
            {
                bad = true;
            }
            else
            {
                bad = false;
            }
        }
        else
        {
            std::cerr << "Unknown attribute '" << name
                      << "' skipped in BarView.\n";
        }
    }
    if (width <= 0 || height <= 0)
        throw std::runtime_error("Width or Height invalid");
    value = 0.7;
}

void BarView::setValue(float v)
{
    if (v >= -1.0 && v <= 1.0)
        value = v;
}

void BarView::draw(Painter &painter)
{
    if (((int)(width * value) > 0 && dir))
    {
        painter.setFillColor(bad ? Color(0xFF, 0, 0, 255) : Color(0, 0xAA, 0, 255));
        painter.fillRectangle(Rect2D(0, 0, width * value, height));
    }
    else if (((int)(width * value) < 0 && !dir))
    {
        painter.setFillColor(bad ? Color(0, 0xAA, 0, 255) : Color(0xFF, 0, 0, 255));
        painter.fillRectangle(Rect2D(width - 1 + width * value, 0, width - 1, height));
    }
}

IMPLEMENT_COMPONENT_FACTORY(LCPBar)
IMPLEMENT_COMPONENT_FACTORY(BarView)