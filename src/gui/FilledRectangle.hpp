#ifndef __FILLEDRECTANGLE_HPP__
#define __FILLEDRECTANGLE_HPP__

#include "Color.hpp"
#include "Component.hpp"

class Painter;
class XmlReader;

/**
 * @class FilledRectangle
 */
class FilledRectangle : public Component
{
public:
    FilledRectangle();
    virtual ~FilledRectangle();

    void parse(XmlReader &reader);
    void resize(float width, float height);
    void draw(Painter &painter);

private:
    Color color;
};

#endif
