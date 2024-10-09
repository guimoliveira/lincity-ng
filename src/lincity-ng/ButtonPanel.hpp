#ifndef __BUTTON_PANEL_HPP__
#define __BUTTON_PANEL_HPP__

#include <map>
#include <string>
#include <vector>

#include "gui/Component.hpp"
#include "lincity/UserOperation.h"

class CheckButton;
class Painter;
class Vector2;
class XmlReader;

class ButtonPanel : public Component
{
public:
    ButtonPanel();

    void parse(XmlReader &reader);

    virtual void draw(Painter &painter);
    void chooseButtonClicked(CheckButton *button, int);
    void menuButtonClicked(CheckButton *button, int);
    virtual bool opaque(const Vector2 &pos) const;
    void checkTech(int showInfo);
    void selectQueryTool();
    bool selectedQueryTool();
    void toggleBulldozeTool();

private:
    void attachButtons();
    std::string getAttribute(XmlReader &reader, const std::string &pName) const;
    void doButton(const std::string &button);
    void toggleMenu(std::string pName, bool enable);
    void updateToolInfo();

    bool alreadyAttached;
    void examineButton(const std::string &name, int showInfo);
    void examineMenuButtons();
    void newTechMessage(unsigned short group, int showInfo);
    void updateSelectedCost();
    std::string previousName;
    int lastShownTechGroup;

    std::vector<std::string> mMenuButtons;
    std::vector<std::string> mMenus;
    std::vector<std::string> mButtons;
    std::vector<std::string> activeButtons;

    std::map<std::string, UserOperation> ButtonOperations;
};

ButtonPanel *getButtonPanel();

#endif
