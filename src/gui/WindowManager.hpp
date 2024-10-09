#ifndef __WINDOW_MANAGER_HPP__
#define __WINDOW_MANAGER_HPP__

#include <stddef.h>
#include <vector>

#include "Child.hpp"
#include "Component.hpp"
#include "Vector2.hpp"

class Event;
class Window;
class XmlReader;

class WindowManager : public Component
{
public:
    WindowManager();
    virtual ~WindowManager();

    void parse(XmlReader &reader);

    void resize(float width, float height) override;
    void event(const Event &event) override;
    bool opaque(const Vector2 &pos) const override;

    void addWindow(Window *window);
    void removeWindow(Window *window);

private:
    enum Edge : int
    {
        NONE = 0,
        N = 1 << 0,
        S = 1 << 1,
        W = 1 << 2,
        E = 1 << 3,
        NW = N | W,
        NE = N | E,
        SW = S | W,
        SE = S | E,
        NS = N | S,
        WE = W | E,
        NSW = N | S | W,
        NSE = N | S | E,
        NWE = N | W | E,
        SWE = S | W | E,
        NSWE = N | S | W | E,
    };
    Edge edgeAt(const Child &child, Vector2 pos) const;
    bool dragging = false;
    Window *dragWindow = NULL;
    Edge dragEdge = Edge::NONE;
    Vector2 dragOffset;
    bool hasMoved = false;
    static const int grabDist = 1;

    void addWindowInternal(Window *window);
    void removeWindowInternal(Window *window);
    std::vector<Window *> removeQueue;
    std::vector<Window *> addQueue;
    bool childLock = false;
    void lockChilds();
    void unlockChilds();
};

#endif
