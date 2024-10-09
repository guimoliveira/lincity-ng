#ifndef __EconomyGraph_HPP
#define __EconomyGraph_HPP

#include <string>

#include "gui/Component.hpp"
#include "gui/Style.hpp"

class CheckButton;
class Painter;
class Paragraph;
class Rect2D;
class Texture;
class XmlReader;

class EconomyGraph : public Component
{
public:
    EconomyGraph();
    ~EconomyGraph();

    void parse(XmlReader &reader);
    void draw(Painter &painter);
    void updateData();
    void newFPS(int frame);

private:
    static const int border = 5;
    void drawHistoryLineGraph(Painter &painter, Rect2D mg);
    void drawSustBarGraph(Painter &painter, Rect2D mg);
    void drawFPSGraph(Painter &painter, Rect2D fpsRect);

    int *fps;
    Texture *labelTextureMIN;
    Texture *labelTexturePRT;
    Texture *labelTextureMNY;
    Texture *labelTexturePOP;
    Texture *labelTextureTEC;
    Texture *labelTextureFIR;

    Texture *labelTextureEconomy;
    Texture *labelTextureSustainability;
    Texture *labelTextureFPS;

    bool nobodyHomeDialogShown;

    CheckButton *switchEconomyGraphButton;
    std::string switchEconomyGraphText;
    Paragraph *switchEconomyGraphParagraph;

    Style normalStyle;
    Style redStyle;
    Style yellowStyle;
};

EconomyGraph *getEconomyGraph();

#endif
