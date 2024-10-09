#include "Game.hpp"

#include <SDL.h>
#include <stddef.h>
#include <algorithm>
#include <iostream>
#include <stdexcept>
#include <emscripten.h>

#include "ButtonPanel.hpp"
#include "Config.hpp"
#include "Dialog.hpp"
#include "EconomyGraph.hpp"
#include "GameView.hpp"
#include "HelpWindow.hpp"
#include "MainLincity.hpp"
#include "MiniMap.hpp"
#include "ScreenInterface.hpp"
#include "TimerInterface.hpp"
#include "Util.hpp"
#include "gui/Button.hpp"
#include "gui/Component.hpp"
#include "gui/ComponentLoader.hpp"
#include "gui/Desktop.hpp"
#include "gui/Event.hpp"
#include "gui/Painter.hpp"
#include "gui/callback/Callback.hpp"
#include "gui/callback/Signal.hpp"
#include "gui_interface/mps.h"
#include "gui_interface/shared_globals.h"
#include "lincity/ConstructionCount.h"
#include "lincity/engglobs.h"
#include "lincity/lin-city.h"
#include "lincity/lintypes.h"
#include "lincity/simulate.h"

Game *gameptr = 0;

Game *getGame()
{
    return gameptr;
}

Game::Game(SDL_Window *_window)
    : window(_window)
{
    gui.reset(loadGUIFile("/data/gui/app.xml"));
    int width = 0, height = 0;
    SDL_GetWindowSize(window, &width, &height);
    gui->resize(width, height);

    Button *gameMenu = getButton(*gui, "GameMenuButton");
    gameMenu->clicked.connect(makeCallback(*this, &Game::gameButtonClicked));

    Button *helpButton = getButton(*gui, "HelpButton");
    helpButton->clicked.connect(makeCallback(*this, &Game::gameButtonClicked));

    Button *statButton = getButton(*gui, "StatButton");
    statButton->clicked.connect(makeCallback(*this, &Game::gameButtonClicked));

    Desktop *desktop = dynamic_cast<Desktop *>(gui.get());
    if (desktop == 0)
        throw std::runtime_error("Game UI is not a Desktop Component");
    helpWindow.reset(new HelpWindow(desktop));
    gameptr = this;
}

Game::~Game()
{
    if (gameptr == this)
    {
        gameptr = 0;
    }
}

void Game::showHelpWindow(std::string topic)
{
    helpWindow->showTopic(topic);
}

void Game::resize()
{
    int width, height;
    SDL_GetWindowSize(window, &width, &height);

    gui->resize(width, height);
}

void Game::backToMainMenu()
{
    closeAllDialogs();
    getButtonPanel()->selectQueryTool();
    quitState = MAINMENU;
    saveCityNG("/offline/9_currentGameNG.scn");
}

void Game::gameButtonClicked(Button *button)
{
    std::string name = button->getName();
    if (name == "GameMenuButton")
    {
        backToMainMenu();
    }
    else if (name == "HelpButton")
    {
        helpWindow->showTopic("help");
    }
    else if (name == "StatButton")
    {
        if (!blockingDialogIsOpen)
        {
            new Dialog(GAME_STATS);
        }
    }
    else
    {
        std::cerr << " Game::gameButtonClicked unknown button '" << name << "'.\n";
    }
}

void Game::quickLoad()
{
    closeAllDialogs();

    // load file
    getGameView()->printStatusMessage("quick load...");
    std::string filename;
    filename.append("quicksave.scn");
    if (loadCityNG(filename))
    {
        getGameView()->printStatusMessage("quick load successful.");
    }
    else
    {
        getGameView()->printStatusMessage("quick load failed!");
    }
}

void Game::quickSave()
{
    // save file
    getGameView()->printStatusMessage("quick save...");
    saveCityNG("quicksave.scn");
}

void Game::testAllHelpFiles()
{
    getGameView()->printStatusMessage("Testing Help Files...");
    /*
    std::string filename;
    std::string directory = "help/en";
    std::string fullname;
    char **rc = PHYSFS_enumerateFiles( directory.c_str() );
    char **i;
    size_t pos;
    for (i = rc; *i != NULL; i++) {
        fullname = directory;
        fullname.append( *i );
        filename.assign( *i );

        // FIXME: Follow symlinks if able. symlink target may be directory
        // NOTE: Do we really need to check if it's a directory? Unlikely that
        //       a directory will have a '.xml' suffix anyway.
        // FIXME: What to do with PHYSFS_FILETYPE_OTHER? Should we instead make
        //        sure the filetype is PHYSFS_FILETYPE_REGULAR?
        PHYSFS_Stat stat;
        int errorCode = PHYSFS_stat(fullname.c_str(), &stat);
        if(errorCode == 0) {
            std::cerr << "could not stat file: " << filename << std::endl;
        }
        else if(stat.filetype == PHYSFS_FILETYPE_DIRECTORY) {
            continue;
        }

        pos = filename.rfind( ".xml" );
        if( pos != std::string::npos ){
            filename.replace( pos, 4 ,"");
            std::cerr << "--- Examining " << filename << "\n";
            helpWindow->showTopic( filename );
            std::cerr << "\n";
        }
    }
    PHYSFS_freeList(rc);*/
}

MainState
Game::run()
{
    SDL_Event event;
    quitState = INGAME;

    Desktop *desktop = dynamic_cast<Desktop *>(gui.get());
    if (!desktop)
    {
        throw std::runtime_error("Toplevel component is not a Desktop");
    }

    while (SDL_PollEvent(&event))
    {
        switch (event.type)
        {
        case SDL_KEYUP:
        {
            Event gui_event(event);
            if (gui_event.keysym.sym == SDLK_ESCAPE)
            {
                getButtonPanel()->selectQueryTool();
                break;
            }
            if (gui_event.keysym.sym == SDLK_b)
            {
                getButtonPanel()->toggleBulldozeTool();
                break;
            }
            if (gui_event.keysym.sym == SDLK_p)
            {
                static int i = 0;
                while (i < constructionCount.size() && !constructionCount[i])
                {
                    i++;
                }
                if (i < constructionCount.size())
                {
                    main_screen_originx = constructionCount[i]->x;
                    main_screen_originy = constructionCount[i]->y;
                    getGameView()->readOrigin(true);
                    mps_set(main_screen_originx, main_screen_originy, MPS_MAP);
                    mps_update();
                    mps_refresh();
                    i++;
                }
                else
                {
                    i = 0;
                }
                break;
            }
            if (gui_event.keysym.sym == SDLK_F1)
            {
                helpWindow->showTopic("help");
                break;
            }
            if (gui_event.keysym.sym == SDLK_F12)
            {
                quickSave();
                break;
            }
            if (gui_event.keysym.sym == SDLK_F9)
            {
                quickLoad();
                break;
            }
#ifdef DEBUG
            if (gui_event.keysym.sym == SDLK_F5)
            {
                testAllHelpFiles();
                break;
            }
#endif
            int need_break = true;
            switch (gui_event.keysym.sym)
            {
            case SDLK_BACKQUOTE:
                getMiniMap()->mapViewChangeDisplayMode(MiniMap::NORMAL);
                break;
            case SDLK_1:
                getMiniMap()->mapViewChangeDisplayMode(MiniMap::STARVE);
                break;
            case SDLK_2:
                getMiniMap()->mapViewChangeDisplayMode(MiniMap::UB40);
                break;
            case SDLK_3:
                getMiniMap()->mapViewChangeDisplayMode(MiniMap::POWER);
                break;
            case SDLK_4:
                getMiniMap()->mapViewChangeDisplayMode(MiniMap::FIRE);
                break;
            case SDLK_5:
                getMiniMap()->mapViewChangeDisplayMode(MiniMap::CRICKET);
                break;
            case SDLK_6:
                getMiniMap()->mapViewChangeDisplayMode(MiniMap::HEALTH);
                break;
            case SDLK_7:
                getMiniMap()->mapViewChangeDisplayMode(MiniMap::TRAFFIC);
                break;
            case SDLK_8:
                getMiniMap()->mapViewChangeDisplayMode(MiniMap::POLLUTION);
                break;
            case SDLK_9:
                getMiniMap()->mapViewChangeDisplayMode(MiniMap::COAL);
                break;
            case SDLK_0:
                getMiniMap()->mapViewChangeDisplayMode(MiniMap::COMMODITIES);
                break;
            default:
                need_break = false;
            }
            if (need_break)
                break;

            gui->event(gui_event);
            break;
        }
        case SDL_MOUSEMOTION:
        case SDL_MOUSEBUTTONUP:
        case SDL_MOUSEBUTTONDOWN:
        case SDL_MOUSEWHEEL:
        case SDL_KEYDOWN:
        {
            if (event.type == SDL_MOUSEBUTTONDOWN)
            {
                tick_button_down = SDL_GetTicks();
            }
            else if (event.type == SDL_MOUSEBUTTONUP)
            {
                tick_button_down = 0;
            }

            Event gui_event(event);
            gui->event(gui_event);
            break;
        }
        case SDL_QUIT:
            saveCityNG("/offline/9_currentGameNG.scn");
            quitState = QUIT;
            break;
        default:
            break;
        }
    }

    tick = SDL_GetTicks();
    get_real_time_with(tick);
    frame++;

    if (tick_button_down != 0 && tick - tick_button_down > 1000)
    {
        int x, y;
        SDL_GetMouseState(&x, &y);

        SDL_Event rightClickEvent;
        // Simulate right mouse button down
        rightClickEvent.type = SDL_MOUSEBUTTONDOWN;
        rightClickEvent.button.button = SDL_BUTTON_RIGHT;
        rightClickEvent.button.x = x; 
        rightClickEvent.button.y = y; 
        SDL_PushEvent(&rightClickEvent);
        // Simulate right mouse button up
        rightClickEvent.type = SDL_MOUSEBUTTONUP;
        SDL_PushEvent(&rightClickEvent);

        tick_button_down = 0;
    }

    if (tick >= next_gui)
    { // gui update
        // fire update event
        gui->event(Event((tick - prev_gui) / 1000.0f));

        // update the help window
        // TODO: Why is this not triggered by the gui update?
        helpWindow->update();

        // other updates
        print_stats();
        updateDate();
        updateMoney();

        // reschedule
        next_gui = tick + 1000 / 30; // 30 FPS
        prev_gui = tick;
    }
    if (tick >= next_execute)
    { // execute
        // simulation timestep
        do_time_step();

        // reschedule
        if (lincitySpeed == fast_time_for_year)
            next_execute = tick;
        else
            next_execute = tick + lincitySpeed;
        prev_execute = tick;
    }
    if (tick >= next_animate)
    { // game animation
        // animate
        do_animate();

        // reschedule
        next_animate = tick + lincitySpeed * 3;
        prev_animate = tick;
    }
    if (tick >= next_fps)
    { // fps
        printf("FPS: %d\n", (frame * 1000) / (tick - prev_fps));

        getEconomyGraph()->newFPS(frame);
        frame = 0;

        // reschedule
        next_fps = tick + 1000;
        prev_fps = tick;
    }

    if (desktop->needsRedraw())
    { // redraw
        desktop->draw(*painter);
        painter->updateScreen();
    }

    // this is kind of janky, but it works for now
    if (lincitySpeed == 0 || blockingDialogIsOpen)
    {
        // deschedule execute and animate
        next_execute = ~0;
        next_animate = ~0;
    }
    else if (next_execute == (Uint32)~0 || next_animate == (Uint32)~0)
    {
        // reschedule execute and animate
        next_execute = tick;
        next_animate = tick;
    }
    return quitState;
}
