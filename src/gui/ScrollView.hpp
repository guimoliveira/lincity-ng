#ifndef __SCROLLVIEW_HPP__
#define __SCROLLVIEW_HPP__

#include <vector>

#include "Child.hpp"
#include "Component.hpp"
#include "Event.hpp"

class ScrollBar;
class XmlReader;

/**
 * @class ScrollView
 */
class ScrollView : public Component
{
public:
    ScrollView();
    virtual ~ScrollView();

    void parse(XmlReader &reader);

    void resize(float width, float height);
    void event(const Event &event);
    void replaceContents(Component *component);

private:
    void scrollBarChanged(ScrollBar *bar, float newvalue);

    Child &contents()
    {
        return childs[0];
    }
    Child &scrollBar()
    {
        return childs[1];
    }
};

#endif
