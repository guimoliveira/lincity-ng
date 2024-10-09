#ifndef __lc_pbar_h__
#define __lc_pbar_h__

#include "gui/Component.hpp"

class LCPBar;
class Painter;
class XmlReader;

// extern LCPBar *LCPBarInstance;
extern LCPBar *LCPBarPage1;
extern LCPBar *LCPBarPage2;
extern int pbarGlobalStyle;
#define PBAR_GLOBAL_STYLES 2

class LCPBar : public Component
{
public:
    LCPBar();
    ~LCPBar();

    void parse(XmlReader &reader);
    void setValue(int num, int value, int diff);
};

class BarView : public Component
{
public:
    BarView();
    ~BarView();

    void parse(XmlReader &reader);

    void setValue(float v);
    virtual void draw(Painter &painter);

private:
    float value;
    bool dir;
    bool bad;
};

#endif
