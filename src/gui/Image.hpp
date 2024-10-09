#ifndef __IMAGE_HPP__
#define __IMAGE_HPP__

#include <string>

#include "Component.hpp"

class Painter;
class Texture;
class XmlReader;

/**
 * @class Image
 */
class Image : public Component
{
public:
    Image();
    virtual ~Image();

    void parse(XmlReader &reader);

    void resize(float width, float height);
    void draw(Painter &painter);

    std::string getFilename() const;
    void setFile(const std::string &filename);

private:
    Texture *texture;
    bool tiling;
    std::string filename;
};

#endif