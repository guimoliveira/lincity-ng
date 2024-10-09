#ifndef __TEXTBOX_HPP__
#define __TEXTBOX_HPP__

#include <string>
#include <vector>

#include "Component.hpp"
#include "DocumentElement.hpp"
#include "Event.hpp"
#include "Rect2D.hpp"
#include "Style.hpp"
#include "callback/Signal.hpp"

class Painter;
class Texture;
class XmlReader;

/**
 * @class TextSpan
 * @brief Contains a part of text in normalized form.
 *
 * All spaces are collapsed to ' '.
 */
class TextSpan
{
public:
    Style style;
    std::string text;
};

/**
 * @class Paragraph
 * @brief A paragraph of (formatted) text.
 *
 * The text is constructed from a list of TextSpans. A TextSpan combines a list
 * of words with a Style so that it can have different font attributes and
 * color.
 */
class Paragraph : public Component, public DocumentElement
{
public:
    Paragraph();
    virtual ~Paragraph();

    void parse(XmlReader &reader);
    // hack to parse <li> elements for now...
    void parseList(XmlReader &reader, const Style &parentstyle);
    void parse(XmlReader &reader, const Style &parentstyle);

    void resize(float width, float height);
    void draw(Painter &painter);
    void event(const Event &event);

    /**
     * Sets a new text in the Paragraph. The style of the paragraph is used.
     * @param text Text to set.
     */
    void setText(const std::string &text);

    /**
     * Sets a new text in the Paragraph.
     * @param text Text to set.
     * @param style Style to apply to the text.
     */
    void setText(const std::string &text, const Style &style);

    std::string getText() const;

    const Style &getStyle() const
    {
        return style;
    }

    Signal<Paragraph *, const std::string &> linkClicked;

private:
    void commit_changes(TextSpan *&currentspan, bool translatable);

    class LinkRectangle
    {
    public:
        Rect2D rect;
        const TextSpan *span;
    };

    typedef std::vector<TextSpan *> TextSpans;
    TextSpans textspans;
    Style style; // CK: every span has its own style anyways
    // TODO distinct Styles for paragraphs and styles

    Texture *texture;

    typedef std::vector<LinkRectangle> LinkRectangles;
    LinkRectangles linkrectangles;
};

#endif