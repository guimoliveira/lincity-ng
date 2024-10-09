#ifndef __WINDOW_HPP__
#define __WINDOW_HPP__

#include <vector>

#include "Child.hpp"
#include "Component.hpp"
#include "Event.hpp"

class Button;
class Painter;
class XmlReader;

/**
 * @class Window
 * @brief Implement the main game window.
 */
class Window : public Component
{
public:
    Window();
    virtual ~Window();

    void parse(XmlReader &reader);

    void draw(Painter &painter) override;
    void event(const Event &event) override;
    void resize(float width, float height) override;

private:
    void closeButtonClicked(Button *button);

    float border;
    float titlesize;

    Child &background()
    {
        return childs[0];
    }
    Child &title_background()
    {
        return childs[1];
    }
    Child &title()
    {
        return childs[2];
    }
    Child &closeButton()
    {
        return childs[3];
    }
    Child &contents()
    {
        return childs[4];
    }

    friend class WindowManager;
};

#endif
