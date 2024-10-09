#ifndef __GAME_HPP__
#define __GAME_HPP__

#include <SDL.h>
#include <memory>
#include <string>

#include "main.hpp"

class Button;
class Component;
class HelpWindow;

class Game
{
public:
    Game(SDL_Window *window);
    ~Game();

    MainState run();
    void gameButtonClicked(Button *button);
    void showHelpWindow(std::string topic);

    void resize();

private:
    std::unique_ptr<Component> gui;

    MainState quitState;
    void backToMainMenu();
    void testAllHelpFiles();
    void quickLoad();
    void quickSave();
    std::unique_ptr<HelpWindow> helpWindow;
    SDL_Window *window;

    int frame = 0;
    Uint32 tick = 0;
    Uint32 next_execute = 0, next_animate = 0, next_gui = 0, next_fps = 0;
    Uint32 prev_execute = 0, prev_animate = 0, prev_gui = 0, prev_fps = 0;

    Uint32 tick_button_down = 0;
};

Game *getGame();

#endif