#ifndef __DESKTOP_HPP__
#define __DESKTOP_HPP__

#include <SDL.h>
#include <vector>

#include "Component.hpp"
#include "Rect2D.hpp"
#include "Vector2.hpp"

class Event;
class Painter;
class XmlReader;

/**
 * @class Desktop
 */
class Desktop : public Component
{
public:
    Desktop();
    virtual ~Desktop();

    void parse(XmlReader &reader);

    void resize(float width, float height);
    void event(const Event &event);
    bool needsRedraw() const;
    void draw(Painter &painter);
    bool opaque(const Vector2 &pos) const;

    Vector2 getPos(Component *component);

    void setCursor(Component *owner, SDL_Cursor *cursor);
    void setSystemCursor(Component *owner, SDL_SystemCursor id);
    void tryClearCursor(Component *owner);
    SDL_Cursor *getSystemCursor(SDL_SystemCursor id);
    void freeSystemCursor(SDL_SystemCursor id);
    void freeAllSystemCursors();

protected:
    void setDirty(const Rect2D &rect);

private:
    typedef std::vector<Rect2D> DirtyRectangles;
    DirtyRectangles dirtyRectangles;

    SDL_Cursor *cursor;
    Component *cursorOwner;
    SDL_Cursor *systemCursors[SDL_NUM_SYSTEM_CURSORS] = {0};
};

#endif