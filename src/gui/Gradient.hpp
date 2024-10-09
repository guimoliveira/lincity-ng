#ifndef __GRADIENT_HPP__
#define __GRADIENT_HPP__

#include <SDL.h>
#include <stdint.h>
#include <memory>

#include "Color.hpp"
#include "Component.hpp"

class Painter;
class Texture;
class XmlReader;

/**
 * @class Gradient
 */
class Gradient : public Component
{
public:
    Gradient();
    virtual ~Gradient();

    void parse(XmlReader &reader);
    void resize(float width, float height);
    void draw(Painter &painter);

private:
    void draw_horizontal_line(SDL_Surface *surface, int x1, int y1, int x2,
                              uint8_t r, uint8_t g, uint8_t b, uint8_t a);
    void draw_vertical_line(SDL_Surface *surface, int x1, int y1, int y2,
                            uint8_t r, uint8_t g, uint8_t b, uint8_t a);

    std::unique_ptr<Texture> texture;
    Color from, to;
    enum Direction
    {
        LEFT_RIGHT,
        TOP_BOTTOM
    };
    Direction direction;
};

#endif