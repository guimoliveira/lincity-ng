#include "MainMenu.hpp"

#include <SDL.h>
#include <SDL_mixer.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <algorithm>
#include <iomanip>
#include <iostream>
#include <sstream>
#include <stdexcept>
#include <utility>
#include <vector>
#include <filesystem>
#include <emscripten.h>

#include "CheckButton.hpp"
#include "Config.hpp"
#include "Game.hpp"
#include "MainLincity.hpp"
#include "Sound.hpp"
#include "Util.hpp"
#include "gui/Button.hpp"
#include "gui/Component.hpp"
#include "gui/ComponentLoader.hpp"
#include "gui/Desktop.hpp"
#include "gui/Event.hpp"
#include "gui/Painter.hpp"
#include "gui/Paragraph.hpp"
#include "gui/callback/Callback.hpp"
#include "gui/callback/Signal.hpp"
#include "gui_interface/shared_globals.h"
#include "lincity/engglobs.h"
#include "lincity/init_game.h"
#include "lincity/loadsave.h"
#include "lincity/world.h"
#include "tinygettext/gettext.hpp"
#include "tinygettext/tinygettext.hpp"

extern std::string autoLanguage;

std::unique_ptr<Sound> sound;
bool gameLoaded = false;

void musicHalted()
{
    getSound()->changeTrack(NEXT_OR_FIRST_TRACK);
    // FIXME: options menu song entry doesn't update while song changes.
}

extern "C" EMSCRIPTEN_KEEPALIVE void handleGameFileLoaded()
{
    gameLoaded = true;
}

MainMenu::MainMenu(SDL_Window *_window)
    : window(_window)
{
    loadMainMenu();
    switchMenu(mainMenu.get());
    baseName = "";
    lastClickTick = 0;
    doubleClickButtonName = "";
    mFilename = "";
    baseName = "";
}

MainMenu::~MainMenu()
{
}

void MainMenu::loadMainMenu()
{
    if (mainMenu.get() == 0)
    {
        mainMenu.reset(loadGUIFile("/data/gui/mainmenu.xml"));
        // connect signals
        Button *continueButton = getButton(*mainMenu, "ContinueButton");
        continueButton->clicked.connect(
            makeCallback(*this, &MainMenu::continueButtonClicked));
        Button *newGameButton = getButton(*mainMenu, "NewGameButton");
        newGameButton->clicked.connect(
            makeCallback(*this, &MainMenu::newGameButtonClicked));
        Button *loadGameButton = getButton(*mainMenu, "LoadButton");
        loadGameButton->clicked.connect(
            makeCallback(*this, &MainMenu::loadGameButtonClicked));
        Button *saveGameButton = getButton(*mainMenu, "SaveButton");
        saveGameButton->clicked.connect(
            makeCallback(*this, &MainMenu::saveGameButtonClicked));
        Button *creditsButton = getButton(*mainMenu, "CreditsButton");
        creditsButton->clicked.connect(
            makeCallback(*this, &MainMenu::creditsButtonClicked));
        Button *optionsButton = getButton(*mainMenu, "OptionsButton");
        optionsButton->clicked.connect(
            makeCallback(*this, &MainMenu::optionsButtonClicked));
    }
}

void MainMenu::fillNewGameMenu()
{
#if 1
    // Do not remove it!
    // It is need for localization
    //
    //  If you going to remove this, you must
    //  get names from data/opening/*scn files,
    //  and update messages.pot from script.
    (void)N_("Rocket_98");
    (void)N_("Beach");
    (void)N_("bad_times");
    (void)N_("extreme_arid");
    (void)N_("extreme_wetland");
    (void)N_("good_times");
#endif
    const std::string buttonNames[] = {"File0", "File1", "File2", "File3", "File4", "File5"};

    CheckButton *button;

    fileMap.clear();

    auto it = std::filesystem::directory_iterator("/data/opening/");

    for (int i = 0; i < 6; i++)
    {
        button = getCheckButton(*newGameMenu.get(), buttonNames[i]);

        button->clicked.connect(makeCallback(*this, &MainMenu::selectLoadGameButtonClicked));
        while (it != std::filesystem::directory_iterator())
        {
            if (it->path().filename().string().find(".scn") != std::string::npos)
                break;
            it++;
        }
        if (it != std::filesystem::directory_iterator())
        {
            std::string f = it->path().filename().string();
            if (f.length() > 5)
            {
                f = f.substr(0, f.length() - 4); // truncate .scn
            }
            // save real name
            fileMap.insert(std::pair<std::string, std::string>(buttonNames[i], f));
            // use translated name for caption
            button->setCaptionText(_(f.c_str()));
            it++;
        }
        else
            button->setCaptionText("");
    }

    button = getCheckButton(*newGameMenu.get(), "WithVillage");
    button->check();
    // button->setCaptionText(_("random empty board"));
    // button->clicked.connect(makeCallback(*this,&MainMenu::selectLoadGameButtonClicked));

    button = getCheckButton(*newGameMenu.get(), "RiverDelta");
    button->setCaptionText(_("river delta"));
    button->clicked.connect(makeCallback(*this, &MainMenu::selectLoadGameButtonClicked));

    button = getCheckButton(*newGameMenu.get(), "DesertArea");
    button->setCaptionText(_("semi desert"));
    button->clicked.connect(makeCallback(*this, &MainMenu::selectLoadGameButtonClicked));

    button = getCheckButton(*newGameMenu.get(), "TemperateArea");
    button->setCaptionText(_("temperate"));
    button->clicked.connect(makeCallback(*this, &MainMenu::selectLoadGameButtonClicked));

    button = getCheckButton(*newGameMenu.get(), "SwampArea");
    button->setCaptionText(_("swamp"));
    button->clicked.connect(makeCallback(*this, &MainMenu::selectLoadGameButtonClicked));

    return;
}

void MainMenu::loadNewGameMenu()
{
    if (newGameMenu.get() == 0)
    {
        newGameMenu.reset(loadGUIFile("/data/gui/newgame.xml"));

        // connect signals
        Button *startButton = getButton(*newGameMenu, "StartButton");
        startButton->clicked.connect(makeCallback(*this, &MainMenu::newGameStartButtonClicked));

        Button *backButton = getButton(*newGameMenu, "BackButton");
        backButton->clicked.connect(makeCallback(*this, &MainMenu::newGameBackButtonClicked));

        fillNewGameMenu();
    }
    int width = 0, height = 0;
    SDL_GetWindowSize(window, &width, &height);
    newGameMenu->resize(width, height);
}

void MainMenu::loadCreditsMenu()
{
    if (creditsMenu.get() == 0)
    {
        creditsMenu.reset(loadGUIFile("/data/gui/credits.xml"));
        Button *backButton = getButton(*creditsMenu, "BackButton");
        backButton->clicked.connect(
            makeCallback(*this, &MainMenu::creditsBackButtonClicked));
    }
    int width = 0, height = 0;
    SDL_GetWindowSize(window, &width, &height);
    creditsMenu->resize(width, height);
}

void MainMenu::loadOptionsMenu()
{
    if (optionsMenu.get() == 0)
    {
        optionsMenu.reset(loadGUIFile("/data/gui/options.xml"));
        CheckButton *currentCheckButton = getCheckButton(*optionsMenu, "BackgroundMusic");
        currentCheckButton->clicked.connect(makeCallback(*this, &MainMenu::optionsMenuButtonClicked));
        currentCheckButton = getCheckButton(*optionsMenu, "SoundFX");
        currentCheckButton->clicked.connect(makeCallback(*this, &MainMenu::optionsMenuButtonClicked));
        currentCheckButton = getCheckButton(*optionsMenu, "MusicVolumePlus");
        currentCheckButton->clicked.connect(makeCallback(*this, &MainMenu::optionsMenuButtonClicked));
        currentCheckButton = getCheckButton(*optionsMenu, "MusicVolumeMinus");
        currentCheckButton->clicked.connect(makeCallback(*this, &MainMenu::optionsMenuButtonClicked));
        currentCheckButton = getCheckButton(*optionsMenu, "FXVolumePlus");
        currentCheckButton->clicked.connect(makeCallback(*this, &MainMenu::optionsMenuButtonClicked));
        currentCheckButton = getCheckButton(*optionsMenu, "FXVolumeMinus");
        currentCheckButton->clicked.connect(makeCallback(*this, &MainMenu::optionsMenuButtonClicked));
        currentCheckButton = getCheckButton(*optionsMenu, "TrackPrev");
        currentCheckButton->clicked.connect(makeCallback(*this, &MainMenu::optionsMenuButtonClicked));
        currentCheckButton = getCheckButton(*optionsMenu, "TrackNext");
        currentCheckButton->clicked.connect(makeCallback(*this, &MainMenu::optionsMenuButtonClicked));
        currentCheckButton = getCheckButton(*optionsMenu, "WorldLenPrev");
        currentCheckButton->clicked.connect(makeCallback(*this, &MainMenu::optionsMenuButtonClicked));
        currentCheckButton = getCheckButton(*optionsMenu, "WorldLenNext");
        currentCheckButton->clicked.connect(makeCallback(*this, &MainMenu::optionsMenuButtonClicked));
        currentCheckButton = getCheckButton(*optionsMenu, "LanguagePrev");
        currentCheckButton->clicked.connect(makeCallback(*this, &MainMenu::optionsMenuButtonClicked));
        currentCheckButton = getCheckButton(*optionsMenu, "LanguageNext");
        currentCheckButton->clicked.connect(makeCallback(*this, &MainMenu::optionsMenuButtonClicked));

        Button *currentButton = getButton(*optionsMenu, "BackButton");
        currentButton->clicked.connect(makeCallback(*this, &MainMenu::optionsBackButtonClicked));
    }
    // adjust checkbutton-states
    if (getConfig()->musicEnabled)
    {
        getCheckButton(*optionsMenu, "BackgroundMusic")->check();
    }
    else
    {
        getCheckButton(*optionsMenu, "BackgroundMusic")->uncheck();
    }
    if (getConfig()->soundEnabled)
    {
        getCheckButton(*optionsMenu, "SoundFX")->check();
    }
    else
    {
        getCheckButton(*optionsMenu, "SoundFX")->uncheck();
    }

    // current background track
    musicParagraph = getParagraph(*optionsMenu, "musicParagraph");
    musicParagraph->setText(getSound()->currentTrack.title);

    std::stringstream mode;
    mode.str("");
    mode << world.len();
    getParagraph(*optionsMenu, "WorldLenParagraph")->setText(mode.str());

    languageParagraph = getParagraph(*optionsMenu, "languageParagraph");
    currentLanguage = getConfig()->language;
    languageParagraph->setText(getConfig()->language);
    languages = dictionaryManager->get_languages();
    languages.insert("autodetect");
    languages.insert("en"); // English is the default when no translation is used

    int width = 0, height = 0;
    SDL_GetWindowSize(window, &width, &height);

    optionsMenu->resize(width, height);
    optionsMenu->findComponent("MenuBackground")->resize(height, height);
}

void MainMenu::selectLoadGameButtonClicked(CheckButton *button, int i)
{
    std::string fc = button->getCaptionText();
    std::map<std::string, std::string>::iterator iter;
    iter = fileMap.find(button->getName());
    if (iter != fileMap.end())
    {
        fc = iter->second;
    }

    /* I guess this should be the proper way of selecting in the menu.
       Everytime we check a new button the last one gets unchecked.
       If the button checked is an empty one, nothing should be opened
       Could be done the other way around: the first time an existing item
       is selected in the menu, an empty one could never be checked again.
       Anyway I don't think both should be checked, when an empty is checked
       after an existing one.
    */

    const std::string bs[] = {"File0", "File1", "File2", "File3", "File4", "File5", ""};
    for (int i = 0; std::string(bs[i]).length(); i++)
    {
        CheckButton *b = getCheckButton(*currentMenu, bs[i]);
        if (b->getName() != button->getName())
        {
            b->uncheck();
        }
        else
        {
            b->check();
        }
    }

    const std::string rnd[] = {"RiverDelta", "DesertArea", "TemperateArea", "SwampArea", ""};
    for (int i = 0; std::string(rnd[i]).length(); i++)
    {
        CheckButton *b = getCheckButton(*currentMenu, rnd[i]);
        if (b->getName() != button->getName())
        {
            b->uncheck();
        }
        else
        {
            b->check();
            fc = rnd[i];
        }
    }

    if (!fc.length())
    {
        mFilename = "";
        return;
    }

    baseName = fc;
    mFilename = std::string("/data/opening/") + fc + ".scn";
    Uint32 now = SDL_GetTicks();

    // doubleclick on Filename loads File
    if ((fc == doubleClickButtonName) &&
        (now - lastClickTick < doubleClickTime))
    {
        lastClickTick = 0;
        doubleClickButtonName = "";
        
        newGameStartButtonClicked(0);
    }
    else
    {
        lastClickTick = now;
        doubleClickButtonName = fc;
    }
}

void MainMenu::optionsMenuButtonClicked(CheckButton *button, int)
{
    std::string buttonName = button->getName();
    if (buttonName == "BackgroundMusic")
    {
        getSound()->playSound("Click");
        getSound()->enableMusic(!getConfig()->musicEnabled);
    }
    else if (buttonName == "MusicVolumePlus")
    {
        int newVolume = getConfig()->musicVolume + 5;
        if (newVolume > 100)
        {
            newVolume = 100;
        }
        if (getConfig()->musicVolume != newVolume)
        {
            getSound()->setMusicVolume(newVolume);
            getSound()->playSound("Click");
        }
    }
    else if (buttonName == "MusicVolumeMinus")
    {
        int newVolume = getConfig()->musicVolume - 5;
        if (newVolume < 0)
        {
            newVolume = 0;
        }
        if (getConfig()->musicVolume != newVolume)
        {
            getSound()->setMusicVolume(newVolume);
            getSound()->playSound("Click");
        }
    }
    else if (buttonName == "SoundFX")
    {
        getConfig()->soundEnabled = !getConfig()->soundEnabled;
        getSound()->playSound("Click");
    }
    else if (buttonName == "FXVolumePlus")
    {
        int newVolume = getConfig()->soundVolume + 5;
        if (newVolume > 100)
        {
            newVolume = 100;
        }
        if (getConfig()->soundVolume != newVolume)
        {
            getSound()->setSoundVolume(newVolume);
            getSound()->playSound("Click");
        }
    }
    else if (buttonName == "FXVolumeMinus")
    {
        int newVolume = getConfig()->soundVolume - 5;
        if (newVolume < 0)
        {
            newVolume = 0;
        }
        if (getConfig()->soundVolume != newVolume)
        {
            getSound()->setSoundVolume(newVolume);
            getSound()->playSound("Click");
        }
    }
    else if (buttonName == "WorldLenPrev")
    {
        changeWorldLen(false);
    }
    else if (buttonName == "WorldLenNext")
    {
        changeWorldLen(true);
    }
    else if (buttonName == "LanguagePrev")
    {
        changeLanguage(false);
    }
    else if (buttonName == "LanguageNext")
    {
        changeLanguage(true);
    }
    else if (buttonName == "TrackPrev")
    {
        changeTrack(false);
    }
    else if (buttonName == "TrackNext")
    {
        changeTrack(true);
    }
    else
    {
        std::cerr << "MainMenu::optionsMenuButtonClicked " << buttonName << " unknown Button!\n";
    }
}

void MainMenu::changeWorldLen(bool next)
{
    std::ostringstream os;
    int new_len;
    new_len = world.len() + (next ? 25 : -25);
    world.len(new_len);
    os << world.len();
    getParagraph(*optionsMenu, "WorldLenParagraph")->setText(os.str());
}

void MainMenu::changeTrack(bool next)
{
    if (next)
    {
        getSound()->playSound("Click");
        getSound()->changeTrack(NEXT_TRACK);
    }
    else
    {
        getSound()->playSound("Click");
        getSound()->changeTrack(PREV_TRACK);
    }
    musicParagraph->setText(getSound()->currentTrack.title);
}

void MainMenu::changeLanguage(bool next)
{
    std::set<std::string>::iterator i = languages.find(getConfig()->language);
    if (next)
    { // next language in set
        i++;
        if (i == languages.end())
        {
            i = languages.begin();
        }
    }
    else
    { // previous
        if (i == languages.begin())
        {
            i = languages.end();
        }
        i--;
    }

    std::string newLang = *i;
    languageParagraph->setText(newLang);
    getConfig()->language = newLang;
    getSound()->playSound("Click");
}

void MainMenu::switchMenu(Component *newMenu)
{
    currentMenu = dynamic_cast<Desktop *>(newMenu);
    if (!currentMenu)
    {
        throw std::runtime_error("Menu Component is not a Desktop");
    }
    int width = 0, height = 0;
    SDL_GetWindowSize(window, &width, &height);
    currentMenu->resize(width, height);
}

void MainMenu::creditsButtonClicked(Button *)
{
    getSound()->playSound("Click");
    loadCreditsMenu();
    switchMenu(creditsMenu.get());
}

void MainMenu::optionsButtonClicked(Button *)
{
    getSound()->playSound("Click");
    loadOptionsMenu();
    switchMenu(optionsMenu.get());
}

void MainMenu::continueButtonClicked(Button *)
{
    quitState = INGAME;
    running = false;
    // only act if world is still clean
    if (!world.dirty)
    {
        // load current game if it exists
        if (!loadCityNG(std::string("/offline/9_currentGameNG.scn.gz")) &&
            !loadCityNG(std::string("/offline/9_currentGameNG.scn")))
        {
            city_settings city;
            city.with_village = true;
            city.without_trees = false;
            
            // by default create a new City
            new_city(&main_screen_originx, &main_screen_originy, &city);
        }
    }
}

void MainMenu::newGameButtonClicked(Button *)
{
    getSound()->playSound("Click");
    loadNewGameMenu();
    switchMenu(newGameMenu.get());
}

void MainMenu::loadGameButtonClicked(Button *)
{
    getSound()->playSound("Click");
    EM_ASM({
        document.getElementById("fileInput").click();
    });
}

void MainMenu::saveGameButtonClicked(Button *)
{
    if (getGame())
    {
        /* Build filename */
        std::stringstream filename;
        filename << 0 << "_Y";
        filename << std::setfill('0') << std::setw(5);
        filename << total_time / 1200;
        filename << "_Tech";
        filename << std::setfill('0') << std::setw(3);
        filename << tech_level / 10000;
        filename << "_Cash";
        if (total_money >= 0)
        {
            filename << "+";
        }
        else
        {
            filename << "-";
        }
        filename << std::setfill('0') << std::setw(3);
        int money = abs(total_money);
        if (money > 1000000000)
        {
            filename << money / 1000000000 << "G";
        }
        else if (money > 1000000)
        {
            filename << money / 1000000 << "M";
        }
        else if (money > 1000)
        {
            filename << money / 1000 << "K";
        }
        else
        {
            filename << money << "_";
        }
        filename << "_P";
        filename << std::setfill('0') << std::setw(5);
        filename << housed_population + people_pool;
        filename << ".gz";

        std::string filenameStr = filename.str();
        saveCityNG(filenameStr);

        EM_ASM({
            const filename = UTF8ToString($0);
            const data = Module.FS.readFile("/" + filename);
            const blob = new Blob([data], { type: "application/octet-stream" });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
            URL.revokeObjectURL(url); }, filenameStr.c_str());

    }
}

void MainMenu::creditsBackButtonClicked(Button *)
{
    getSound()->playSound("Click");
    loadMainMenu();
    switchMenu(mainMenu.get());
}

void MainMenu::optionsBackButtonClicked(Button *)
{
    getConfig()->save();
    if (currentLanguage != getConfig()->language)
    {
        quitState = RESTART;
    }
    else
    {
        gotoMainMenu();
    }
}

/**
 * Either create selected random terrain or load a scenario.
 **/
void MainMenu::newGameStartButtonClicked(Button *)
{
    if (mFilename.empty())
    {
        // std::cout << "nothing selected\n";
        return;
    }

    city_settings city_obj;
    city_settings *city = &city_obj;

    city->with_village = (getCheckButton(*currentMenu, "WithVillage")->state == CheckButton::STATE_CHECKED);
    city->without_trees = (getCheckButton(*currentMenu, "WithoutTrees")->state == CheckButton::STATE_CHECKED);

    if (baseName == "RiverDelta")
    {
        new_city(&main_screen_originx, &main_screen_originy, city);
        quitState = INGAME;
        running = false;
    }
    else if (baseName == "DesertArea")
    {
        new_desert_city(&main_screen_originx, &main_screen_originy, city);
        quitState = INGAME;
        running = false;
    }
    else if (baseName == "TemperateArea")
    {
        new_temperate_city(&main_screen_originx, &main_screen_originy, city);
        quitState = INGAME;
        running = false;
    }
    else if (baseName == "SwampArea")
    {
        new_swamp_city(&main_screen_originx, &main_screen_originy, city);
        quitState = INGAME;
        running = false;
    }
    else
    {
        if (loadCityNG(mFilename))
        {
            strcpy(given_scene, baseName.c_str());
            quitState = INGAME;
            running = false;
        }
    }
    mFilename = "empty"; // don't erase scenarios later
}

void MainMenu::newGameBackButtonClicked(Button *)
{
    getSound()->playSound("Click");
    loadMainMenu();
    switchMenu(mainMenu.get());
}

void MainMenu::gotoMainMenu()
{
    getSound()->playSound("Click");
    loadMainMenu();
    switchMenu(mainMenu.get());
}

void MainMenu::resize()
{
    int width, height;
    SDL_GetWindowSize(window, &width, &height);

    currentMenu->resize(width, height);
    mainMenu.get()->findComponent("MenuBackground")->resize(height, height);
    if (optionsMenu.get() != 0)
    {
        optionsMenu.get()->findComponent("MenuBackground")->resize(height, height);
    }
}

MainState
MainMenu::run()
{
    SDL_Event event;
    running = true;
    quitState = MAINMENU;
    try
    {
        // Handle events
        while (SDL_PollEvent(&event))
        {
            switch (event.type)
            {
            case SDL_MOUSEMOTION:
            case SDL_MOUSEBUTTONUP:
            case SDL_MOUSEBUTTONDOWN:
            case SDL_MOUSEWHEEL:
            case SDL_KEYDOWN:
            {
                if (sound.get() == 0 && event.type == SDL_MOUSEBUTTONDOWN)
                {
                    std::cout << "Init sound" << std::endl;
                    Mix_Init(MIX_INIT_OGG | MIX_INIT_WAVPACK);
                    sound.reset(new Sound());
                    // set a function to call when music stops
                    Mix_HookMusicFinished(musicHalted);
                }

                Event gui_event(event);
                currentMenu->event(gui_event);
                break;
            }
            case SDL_KEYUP:
            {
                Event gui_event(event);
                if ((gui_event.keysym.sym == SDLK_ESCAPE) ||
                    (gui_event.keysym.sym == SDLK_c && (gui_event.keysym.mod & KMOD_CTRL)))
                {
                    running = false;
                    quitState = QUIT;
                    break;
                }
                currentMenu->event(gui_event);
                break;
            }
            case SDL_QUIT:
                running = false;
                quitState = QUIT;
                break;
            default:
                break;
            }
        }

        // Update state
        Uint32 ticks = SDL_GetTicks();
        float elapsedTime = static_cast<float>(ticks - lastTicks) / 1000.0f;
        currentMenu->event(Event(elapsedTime));
        lastTicks = ticks;

        // Redraw if necessary
        if (ticks - lastRedrawTicks > 250)
        {
            currentMenu->reLayout();
        }

        if (currentMenu->needsRedraw())
        {
            currentMenu->draw(*painter);
            painter->updateScreen();
            lastRedrawTicks = ticks;
        }

        // FPS Calculation
        frame++;
        if (ticks - fpsTicks > 1000)
        {
            printf("MainMenu FPS: %d.\n", (frame * 1000) / (ticks - fpsTicks));

            frame = 0;
            fpsTicks = ticks;
        }

        if (gameLoaded) {
            if (loadCityNG("gamefile.gz"))
            {
                quitState = INGAME;
                running = false;
            }
            gameLoaded = false;
        }
    }
    catch (std::exception &e)
    {
        std::cerr << "Unexpected exception: " << e.what() << "\n";
    }
    catch (...)
    {
        std::cerr << "Unexpected exception.\n";
    }
    return quitState;
}