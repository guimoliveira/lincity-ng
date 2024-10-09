#ifndef __PANEL_HPP__
#define __PANEL_HPP__

#include "Component.hpp"

class Painter;
class Texture;
class Vector2;
class XmlReader;

/**
 * @class Panel.
 * @brief Code for the panel implementation.
 * @todo Describe more precisely what is the panel.
 */
class Panel : public Component
{
public:
    Panel();
    virtual ~Panel();

    void parse(XmlReader &reader);
    void draw(Painter &painter);
    bool opaque(const Vector2 &pos) const;

private:
    Texture *background;
};

#endif