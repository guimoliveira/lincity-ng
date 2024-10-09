#ifndef __BUTTON_HPP__
#define __BUTTON_HPP__

#include <SDL.h>
#include <string>
#include <vector>

#include "Child.hpp"
#include "Component.hpp"
#include "Event.hpp"
#include "Vector2.hpp"
#include "callback/Signal.hpp"

class Painter;
class XmlReader;

/**
 * @class Button
 * @brief This Component is a clickable button.
 *
 * You can assign images for the 3 differen states of the button: normal, hover
 * (when the mouse is inside the button area) and clicked (when the mouse button
 * is pressed on the button).
 *
 * signalClicked is fired each time the button is pressed.
 */
class Button : public Component
{
public:
    Button();
    virtual ~Button();

    void parse(XmlReader &reader);

    void draw(Painter &painter);
    void event(const Event &event);
    void reLayout();

    void setCaptionText(const std::string &pText);
    std::string getCaptionText();

    Signal<Button *> pressed;
    Signal<Button *> released;
    Signal<Button *> clicked;

    enum State
    {
        STATE_NORMAL,
        STATE_HOVER,
        STATE_CLICKED
    };

    State state;

private:
    void setChildImage(Child &child, XmlReader &reader);
    void setChildText(Child &child, XmlReader &reader);

    Child &comp_normal()
    {
        return childs[0];
    }
    Child &comp_hover()
    {
        return childs[1];
    }
    Child &comp_clicked()
    {
        return childs[2];
    }
    Child &comp_caption()
    {
        return childs[3];
    }

    bool lowerOnClick;
    std::string tooltip;
    uint32_t mouseholdTicks;
    Vector2 mouseholdPos;
    float fixWidth, fixHeight;
};

#endif