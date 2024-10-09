#ifndef __FONTSTYLE_HPP__
#define __FONTSTYLE_HPP__

#include <map>
#include <string>

#include "Color.hpp"

class XmlReader;

/**
 * @class Style
 */
// TODO make distinct styles for paragraphs and spans

class Style
{
public:
    Style();
    ~Style();

    void parseAttributes(XmlReader &reader);
    bool parseAttribute(const char *name, const char *value);

    bool parseAttribute(const char *attribute, const std::string& value) 
    {
        return parseAttribute(attribute, value.c_str());
    }
    bool parseAttribute(const std::string& attribute, const char * value)
    {
        return parseAttribute(attribute.c_str(), value);
    }
    bool parseAttribute(const std::string& attribute, const std::string& value)
    {
        return parseAttribute(attribute.c_str(), value.c_str());
    }

    std::string href;

    std::string font_family;
    bool italic;
    bool bold;
    float font_size;
    Color text_color;
    Color background;

    // for boxes...
    enum Alignment
    {
        ALIGN_LEFT,
        ALIGN_CENTER,
        ALIGN_RIGHT
    };
    Alignment alignment;
    float margin_left, margin_right, margin_top, margin_bottom;
    float width, height, min_width, min_height;

    void toSpan(void); // restricts paragraph style to span style
private:
    Color parseColor(const char *value);
};

extern std::map<std::string, Style> styleRegistry;
void parseStyleDef(XmlReader &reader);

#endif