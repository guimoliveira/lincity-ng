#include "main.hpp"

#include <SDL.h>
#include <SDL_mixer.h>
#include <SDL_ttf.h>
#include <assert.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <iostream>
#include <fstream>
#include <memory>
#include <sstream>
#include <stdexcept>
#include <string>
#include <emscripten.h>
#include <emscripten/html5.h>

#include "Config.hpp"
#include "Game.hpp"
#include "MainLincity.hpp"
#include "MainMenu.hpp"
#include "PBar.hpp"
#include "Sound.hpp"
#include "gui/FontManager.hpp"
#include "gui/Painter.hpp"
#include "gui/PainterSDL/PainterSDL.hpp"
#include "gui/PainterSDL/TextureManagerSDL.hpp"
#include "gui/TextureManager.hpp"
#include "lc_error.hpp"
#include "lincity/engglobs.h"
#include "lincity/init_game.h"
#include "lincity/lin-city.h"
#include "lincity/loadsave.h"
#include "tinygettext/tinygettext.hpp"

#ifndef DEBUG
#include <exception>
#endif

#define PACKAGE_NAME "Lincity"
#define PACKAGE_VERSION "Web"

SDL_Window *window = NULL;
SDL_GLContext window_context = NULL;
SDL_Renderer *window_renderer = NULL;
Painter *painter = 0;
tinygettext::DictionaryManager *dictionaryManager = 0;
bool restart = false;
const char *appdatadir;

std::unique_ptr<MainMenu> menu;
std::unique_ptr<Game> game;
MainState state = UNDEFINED;
MainState nextstate = MAINMENU;

EM_BOOL emscripten_window_resized_callback(int eventType, const void *reserved, void *userData)
{
    double width, height;
    emscripten_get_element_css_size("canvas", &width, &height);

    if (height < 500)
    {
        width *= (500 / height);
        height = 500;
    }

    SDL_SetWindowSize(window, (int)width, (int)height);

    switch (state)
    {
    case MAINMENU:
        menu->resize();
        break;
    case INGAME:
        game->resize();
        break;
    default:
        break;
    }
    return true;
}

void initVideo()
{
    window = SDL_CreateWindow("Lincity Web",
                              SDL_WINDOWPOS_UNDEFINED,
                              SDL_WINDOWPOS_UNDEFINED, 0, 0,
                              SDL_WINDOW_SHOWN | SDL_WINDOW_RESIZABLE);

    window_renderer = SDL_CreateRenderer(window, -1, 0);

    EmscriptenFullscreenStrategy strategy;
    strategy.scaleMode = EMSCRIPTEN_FULLSCREEN_CANVAS_SCALE_STDDEF;
    strategy.filteringMode = EMSCRIPTEN_FULLSCREEN_FILTERING_DEFAULT;
    strategy.canvasResizedCallback = emscripten_window_resized_callback;
    emscripten_enter_soft_fullscreen("canvas", &strategy);

    painter = new PainterSDL(window_renderer);
    texture_manager = new TextureManagerSDL(window_renderer);
    fontManager = new FontManager();
}

EM_BOOL mainLoop(double time, void *userData)
{
    if (state != nextstate)
    {
        switch (nextstate)
        {
        case RESTART:
            nextstate = QUIT;
            EM_ASM({
                window.setTimeout(function() {location.reload();}, 1000);
            });
            break;
        case MAINMENU:
            menu.reset(new MainMenu(window));
            menu->resize();
            break;
        case INGAME:
            if (game.get() == 0)
            {
                game.reset(new Game(window));
            }
            game->resize();
            break;
        default:
            assert(false);
        }
        state = nextstate;
    }

    switch (state)
    {
    case QUIT:
        break;
    case MAINMENU:
        nextstate = menu->run();
        break;
    case INGAME:
        if (LCPBarPage1 && LCPBarPage2)
        {
            nextstate = game->run();
        }
        else
        {
            nextstate = state;
        }
        break;
    default:
        assert(false);
    }

    return state != QUIT;
}

int main()
{
    int result = 0;
    try
    {
#ifndef DEBUG // in debug mode we wanna have a backtrace
        std::cout << "Starting " << PACKAGE_NAME << " (version " << PACKAGE_VERSION << ")...\n";
#else
        std::cout << "Starting " << PACKAGE_NAME << " (version " << PACKAGE_VERSION << ") in Debug Mode...\n";
#endif

        if (getConfig()->language != "autodetect") 
        {
            setenv("LANG", getConfig()->language.c_str(), true);
        }

        dictionaryManager = new tinygettext::DictionaryManager();
        dictionaryManager->set_charset("UTF-8");
        dictionaryManager->add_directory("locale");

        std::cout << "Language is \"" << dictionaryManager->get_language() << "\".\n";

        fast_time_for_year = getConfig()->quickness;
        std::cout << " fast = " << fast_time_for_year << std::endl;

        if (SDL_Init(SDL_INIT_TIMER | SDL_INIT_AUDIO | SDL_INIT_VIDEO | SDL_INIT_EVENTS) < 0)
        {
            std::stringstream msg;
            msg << "Couldn't initialize SDL: " << SDL_GetError();
            throw std::runtime_error(msg.str());
        }
        if (TTF_Init() < 0)
        {
            std::stringstream msg;
            msg << "Couldn't initialize SDL_ttf: " << SDL_GetError();
            throw std::runtime_error(msg.str());
        }

        std::cout << "Init Lincity" << std::endl;
        initLincity();
        initVideo();

        emscripten_request_animation_frame_loop(mainLoop, 0);
    }
    catch (std::exception &e)
    {
        std::cerr << "Unexpected exception: " << e.what() << "\n";
        result = 1;
    }
    catch (...)
    {
        std::cerr << "Unexpected exception.\n";
        result = 1;
    }
    return 0;
}
