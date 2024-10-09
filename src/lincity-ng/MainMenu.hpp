#ifndef __MAINMENU_HPP__
#define __MAINMENU_HPP__

#include <SDL.h>
#include <map>
#include <memory>
#include <set>
#include <string>

#include "main.hpp"

class Button;
class CheckButton;
class Component;
class Desktop;
class Paragraph;

class MainMenu
{
public:
    MainMenu(SDL_Window *window);
    ~MainMenu();

    MainState run();
    void gotoMainMenu();
    void resize();

private:
    void switchMenu(Component *component);

    void loadMainMenu();
    void loadNewGameMenu();
    void loadCreditsMenu();
    void loadOptionsMenu();

    void fillNewGameMenu();

    void creditsBackButtonClicked(Button *);
    void optionsBackButtonClicked(Button *);

    void continueButtonClicked(Button *);
    void creditsButtonClicked(Button *);
    void newGameButtonClicked(Button *);
    void loadGameButtonClicked(Button *);
    void saveGameButtonClicked(Button *);
    void optionsButtonClicked(Button *);

    void newGameBackButtonClicked(Button *);
    void newGameStartButtonClicked(Button *);

    void selectLoadGameButtonClicked(CheckButton *, int i);
    void optionsMenuButtonClicked(CheckButton *button, int);

    std::unique_ptr<Component> mainMenu;
    std::unique_ptr<Component> newGameMenu;
    std::unique_ptr<Component> creditsMenu;
    std::unique_ptr<Component> optionsMenu;
    Desktop *currentMenu;

    bool running;
    MainState quitState;
    int slotNr;

    std::string mFilename;
    std::string baseName;
    static const Uint32 doubleClickTime = 1000;
    Uint32 lastClickTick;
    std::string doubleClickButtonName;

    Paragraph *musicParagraph;
    void changeTrack(bool next);
    void changeWorldLen(bool next);

    Paragraph *languageParagraph;
    void changeLanguage(bool next);
    std::string currentLanguage;
    std::set<std::string> languages;

    std::map<std::string, std::string> fileMap;

    SDL_Window *window;

    Uint32 fpsTicks = SDL_GetTicks();
    Uint32 lastTicks = fpsTicks;
    Uint32 lastRedrawTicks = fpsTicks;
    int frame = 0;
};

#endif