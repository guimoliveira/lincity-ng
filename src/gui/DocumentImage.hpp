#ifndef __DOCUMENTIMAGE_HPP__
#define __DOCUMENTIMAGE_HPP__

#include <string>

#include "Component.hpp"
#include "DocumentElement.hpp"
#include "Style.hpp"

class Painter;
class Texture;
class XmlReader;

/**
 * @class DocumentImage
 */
class DocumentImage : public Component, public DocumentElement
{
public:
    DocumentImage();
    virtual ~DocumentImage();

    void parse(XmlReader &reader, const Style &style);

    void resize(float width, float height);
    void draw(Painter &painter);
    const Style &getStyle() const
    {
        return style;
    }

private:
    Texture *texture;
    Style style;
    std::string filename;
};

#endif