#ifndef __lc_minimap_h__
#define __lc_minimap_h__

#include <memory>
#include <string>
#include <vector>

#include "MapPoint.hpp"
#include "gui/Color.hpp"
#include "gui/Component.hpp"
#include "gui/Event.hpp"
#include "gui/Vector2.hpp"
#include "lincity/commodities.hpp"

class Button;
class CheckButton;
class Painter;
class Texture;
class XmlReader;

class MiniMap : public Component
{
public:
    enum DisplayMode
    {
        NORMAL,
        POLLUTION,
        UB40,
        STARVE,
        POWER,
        FIRE,
        CRICKET,
        HEALTH,
        COAL,
        TRAFFIC,
        COMMODITIES,
        MAX
    };

    MiniMap();
    ~MiniMap();

    void parse(XmlReader &reader);

    virtual void draw(Painter &painter);
    virtual void event(const Event &event);

    void setGameViewCorners(
        const MapPoint &upperLeft, const MapPoint &lowerRight);

    Color getColor(int x, int y) const;
    Color getColorNormal(int x, int y) const;
    void showMpsEnv(MapPoint tile);
    void hideMpsEnv();

    void switchView(const std::string &viewname);
    void scrollPageDown(bool down);

    Commodity getStuffID();
    void toggleStuffID(int step);

    void mapViewChangeDisplayMode(DisplayMode mode);

private:
    void mapViewButtonClicked(CheckButton *button, int);
    void speedButtonClicked(CheckButton *button, int);
    void zoomInButtonClicked(Button *button);
    void zoomOutButtonClicked(Button *button);
    void scrollPageDownButtonClicked(Button *button);
    void scrollPageUpButtonClicked(Button *button);

    void switchButton(CheckButton *button, int);
    void switchMapViewButton(const std::string &pName);

    void attachButtons();
    Component *findRoot(Component *c);
    // FIXME
    Vector2 mapPointToVector(MapPoint p);

    void constrainPosition();

    MapPoint upperLeft, lowerRight;

    DisplayMode mMode;
    Commodity stuff_ID;
    int tilesize;
    int border;
    int left, top; // Positioning of minimap

    std::vector<CheckButton *> switchButtons;
    std::unique_ptr<Texture> mTexture;

    int mpsXOld, mpsYOld, mpsStyleOld;

    bool mFullRefresh;
    bool alreadyAttached;
    bool inside;
    // used for the middle mouse button popup to remember last visible tab
    std::string lastTabName;
};

MiniMap *getMiniMap();

#endif
