#ifndef __DOCUMENT_HPP__
#define __DOCUMENT_HPP__

#include <string>             

#include "Component.hpp"      
#include "Style.hpp"          
#include "callback/Signal.hpp"

class Painter;
class Paragraph;
class XmlReader;

/**
 * @class Document
 */
class Document : public Component
{
public:
    Document();
    virtual ~Document();

    void parse(XmlReader& reader);

    void draw(Painter& painter);
    void resize(float width, float height);
    void addParagraph(Paragraph* p);

    Style style;
    Signal<Paragraph*, const std::string& > linkClicked;

private:
    void paragraphLinkClicked(Paragraph* paragraph, const std::string& href);
};

#endif