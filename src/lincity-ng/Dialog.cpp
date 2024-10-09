#include "Dialog.hpp"

#include <assert.h>
#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <algorithm>
#include <array>
#include <exception>
#include <fstream>
#include <iostream>
#include <memory>
#include <sstream>
#include <stdexcept>
#include <vector>

#include "CheckButton.hpp"
#include "GameView.hpp"
#include "MapEdit.hpp"
#include "MapPoint.hpp"
#include "Util.hpp"
#include "gui/Button.hpp"
#include "gui/Component.hpp"
#include "gui/ComponentLoader.hpp"
#include "gui/Paragraph.hpp"
#include "gui/SwitchComponent.hpp"
#include "gui/Window.hpp"
#include "gui/WindowManager.hpp"
#include "gui/callback/Callback.hpp"
#include "gui/callback/Signal.hpp"
#include "gui_interface/mps.h"
#include "gui_interface/shared_globals.h"
#include "lc_error.hpp"
#include "lincity/commodities.hpp"
#include "lincity/engglobs.h"
#include "lincity/engine.h"
#include "lincity/lclib.h"
#include "lincity/lin-city.h"
#include "lincity/lintypes.h"
#include "lincity/loadsave.h"
#include "lincity/modules/all_modules.h"
#include "lincity/world.h"
#include "tinygettext/gettext.hpp"

bool blockingDialogIsOpen = false;

std::vector<Dialog *> dialogVector;

void closeAllDialogs()
{
    std::vector<Dialog *>::iterator iter;
    while (!dialogVector.empty())
    {
        iter = dialogVector.begin();
        (*iter)->closeDialog();
    }
}

Dialog::Dialog(int type)
{
    initDialog();
    switch (type)
    {
    case ASK_COAL_SURVEY:
        coalSurvey();
        break;
    case GAME_STATS:
        gameStats();
        break;
    default:
        std::stringstream msg;
        msg << "Can't open Dialog type " << type << " without additional parameters.";
        throw std::runtime_error(msg.str());
    }
}

Dialog::Dialog(int type, std::string message, std::string extraString)
{
    initDialog();
    switch (type)
    {
    case MSG_DIALOG:
        msgDialog(message, extraString);
        break;
    default:
        std::stringstream msg;
        msg << "Can't open Dialog type " << type << " with String parameters.";
        throw std::runtime_error(msg.str());
    }
}

Dialog::Dialog(int type, int x, int y)
{
    initDialog(x, y);
    switch (type)
    {
    case BULLDOZE_MONUMENT:
        askBulldozeMonument();
        break;
    case BULLDOZE_RIVER:
        askBulldozeRiver();
        break;
    case BULLDOZE_SHANTY:
        askBulldozeShanty();
        break;
    case EDIT_MARKET:
        editMarket();
        break;
    case EDIT_PORT:
        editPort();
        break;
    case ASK_LAUNCH_ROCKET:
        askRocket();
        break;
    default:
        std::stringstream msg;
        msg << "Can't open Dialog type " << type << " with coordinates.";
        throw std::runtime_error(msg.str());
    }
}

void Dialog::initDialog(int x /*= -1*/, int y /*= -1*/)
{
    Component *root = getGameView();
    windowManager = 0;
    myDialogComponent = 0;
    pointX = x;
    pointY = y;
    iAmBlocking = false;
    if (root)
    {
        while (root->getParent())
            root = root->getParent();
        windowManager = dynamic_cast<WindowManager *>(
            root->findComponent("windowManager"));
        if (!windowManager)
            std::cerr << "Root not a window manager!?!\n";
    }
    else
    {
        std::cerr << "Dialog: Root not found.\n";
    }
}

Dialog::~Dialog()
{
}

void Dialog::registerDialog()
{
    dialogVector.push_back(this);
    windowManager->addWindow(static_cast<Window *>(myDialogComponent));
}

void Dialog::unRegisterDialog()
{
    std::vector<Dialog *>::iterator iter = dialogVector.begin();
    while (iter != dialogVector.end())
    {
        if (*iter == this)
        {
            iter = dialogVector.erase(iter);
        }
        else
        {
            iter++;
        }
    }

    delete (this);
}

void Dialog::askRocket()
{
    if (!windowManager)
    {
        std::cerr << "No window manager found.\n";
        return;
    }
    try
    {
        myDialogComponent = dynamic_cast<Window *>(
            loadGUIFile("/data/gui/dialogs/launch_rocket_yn.xml"));
        assert(myDialogComponent != 0);
        registerDialog();
        blockingDialogIsOpen = true;
        iAmBlocking = true;
    }
    catch (std::exception &e)
    {
        std::cerr << "Couldn't display message 'launch_rocket_yn': "
                  << e.what() << "\n";
        return;
    }
    Paragraph *p = getParagraph(*myDialogComponent, "DialogTitle");
    std::stringstream title;
    title << _("Launchsite") << " ( " << pointX << " , " << pointY << " )";
    p->setText(title.str());
    // connect signals
    Button *yesButton = getButton(*myDialogComponent, "Yes");
    yesButton->clicked.connect(makeCallback(*this, &Dialog::okayLaunchRocketButtonClicked));
    Button *noButton = getButton(*myDialogComponent, "No");
    noButton->clicked.connect(makeCallback(*this, &Dialog::closeDialogButtonClicked));
    Button *gotoButton = getButton(*myDialogComponent, "goto");
    gotoButton->clicked.connect(makeCallback(*this, &Dialog::gotoButtonClicked));
}

// no Signals caught here, so ScreenInterface has to catch them.
void Dialog::msgDialog(std::string message, std::string extraString)
{
    if (!windowManager)
    {
        std::cerr << "No window manager found.\n";
        return;
    }
    // generate filename. foo.mes => gui/dialogs/foo.xml
    std::string filename = "/data/gui/dialogs/";
    filename += message;
    std::string::size_type pos = filename.rfind(".mes");
    if (pos != std::string::npos)
    {
        filename.replace(pos, 4, ".xml");
    }
    std::unique_ptr<Window> myDialogComponent(dynamic_cast<Window *>(
        loadGUIFile(filename)));

    // set Extra-String
    getParagraph(*myDialogComponent, "ExtraText")->setText(extraString);

    // connect signals
    Button *noButton = getButton(*myDialogComponent, "Ok");
    noButton->clicked.connect(makeCallback(*this, &Dialog::closeDialogButtonClicked));

    this->myDialogComponent = myDialogComponent.release();
    registerDialog();
}

void Dialog::askBulldozeMonument()
{
    if (!windowManager)
    {
        std::cerr << "No window manager found.\n";
        return;
    }
    try
    {
        myDialogComponent = dynamic_cast<Window *>(
            loadGUIFile("/data/gui/dialogs/bulldoze_monument_yn.xml"));
        assert(myDialogComponent != 0);
        registerDialog();
        blockingDialogIsOpen = true;
        iAmBlocking = true;
    }
    catch (std::exception &e)
    {
        std::cerr << "Couldn't display message 'bulldoze_monument_yn': "
                  << e.what() << "\n";
        return;
    }
    // connect signals
    Button *yesButton = getButton(*myDialogComponent, "Yes");
    yesButton->clicked.connect(makeCallback(*this, &Dialog::okayBulldozeMonumentButtonClicked));
    Button *noButton = getButton(*myDialogComponent, "No");
    noButton->clicked.connect(makeCallback(*this, &Dialog::closeDialogButtonClicked));
}

void Dialog::askBulldozeRiver()
{
    if (!windowManager)
    {
        std::cerr << "No window manager found.\n";
        return;
    }
    try
    {
        myDialogComponent = dynamic_cast<Window *>(
            loadGUIFile("/data/gui/dialogs/bulldoze_river_yn.xml"));
        assert(myDialogComponent != 0);
        registerDialog();
        blockingDialogIsOpen = true;
        iAmBlocking = true;
    }
    catch (std::exception &e)
    {
        std::cerr << "Couldn't display message 'bulldoze_river_yn.xml': "
                  << e.what() << "\n";
        return;
    }
    // connect signals
    Button *yesButton = getButton(*myDialogComponent, "Yes");
    yesButton->clicked.connect(makeCallback(*this, &Dialog::okayBulldozeRiverButtonClicked));
    Button *noButton = getButton(*myDialogComponent, "No");
    noButton->clicked.connect(makeCallback(*this, &Dialog::closeDialogButtonClicked));
}

void Dialog::askBulldozeShanty()
{
    if (!windowManager)
    {
        std::cerr << "No window manager found.\n";
        return;
    }
    try
    {
        myDialogComponent = dynamic_cast<Window *>(
            loadGUIFile("/data/gui/dialogs/bulldoze_shanty_yn.xml"));
        assert(myDialogComponent != 0);
        registerDialog();
        blockingDialogIsOpen = true;
        iAmBlocking = true;
    }
    catch (std::exception &e)
    {
        std::cerr << "Couldn't display message 'bulldoze_shanty_yn': "
                  << e.what() << "\n";
        return;
    }
    // connect signals
    Button *yesButton = getButton(*myDialogComponent, "Yes");
    yesButton->clicked.connect(makeCallback(*this, &Dialog::okayBulldozeShantyButtonClicked));
    Button *noButton = getButton(*myDialogComponent, "No");
    noButton->clicked.connect(makeCallback(*this, &Dialog::closeDialogButtonClicked));
}

void Dialog::coalSurvey()
{
    if (!windowManager)
    {
        std::cerr << "No window manager found.\n";
        return;
    }
    try
    {
        myDialogComponent = dynamic_cast<Window *>(
            loadGUIFile("/data/gui/dialogs/coal_survey_yn.xml"));
        assert(myDialogComponent != 0);
        registerDialog();
        blockingDialogIsOpen = true;
        iAmBlocking = true;
    }
    catch (std::exception &e)
    {
        std::cerr << "Couldn't display message 'coal_survey_yn': "
                  << e.what() << "\n";
        return;
    }
    // connect signals
    Button *yesButton = getButton(*myDialogComponent, "Yes");
    yesButton->clicked.connect(makeCallback(*this, &Dialog::okayCoalSurveyButtonClicked));
    Button *noButton = getButton(*myDialogComponent, "No");
    noButton->clicked.connect(makeCallback(*this, &Dialog::closeDialogButtonClicked));
}

void Dialog::setParagraphN(const std::string basename, const int number, const std::string text)
{
    std::stringstream paragraphName;
    paragraphName << basename << number;
    setParagraph(paragraphName.str(), text);
}

template <typename T>
void Dialog::setTableRC(const std::string basename, const int row, const int column, const std::string text, T value)
{
    std::stringstream paragraphName;
    paragraphName << basename << "_text_" << row << "_" << column;
    setParagraph(paragraphName.str(), text);
    paragraphName.str("");
    paragraphName << basename << "_value_" << row << "_" << column;
    std::stringstream stringvalue;
    stringvalue << value;
    setParagraph(paragraphName.str(), stringvalue.str());
}

void Dialog::setParagraph(const std::string paragraphName, const std::string text)
{
    Paragraph *p;
    try
    {
        p = getParagraph(*myDialogComponent, paragraphName);
        p->setText(text);
    }
    catch (std::exception &e)
    {
        std::cerr << "Couldn't set " << paragraphName << " to '" << text << "': "
                  << e.what() << "\n";
    }
}

/*
 * Show game statistics in dialog and write them to RESULTS_FILENAME.
 *
 * gamestats.xml has 11 lines
 * statistic_text1
 * [...]
 * statistic_text11
 * and 15 lines in a Table with 6 columns
 * statistic_text_1_1  statistic_number_1_1  statistic_text_1_2  statistic_number_1_2  statistic_text_1_3  statistic_number_1_3
 * [...]
//  * statistic_text_15_1 statistic_number_15_1 statistic_text_15_2 statistic_number_15_2 statistic_text_15_3 statistic_number_15_3
 */
void Dialog::gameStats()
{
    saveGameStats();
    if (!windowManager)
    {
        std::cerr << "No window manager found.\n";
        return;
    }
    bool useExisting = false;
    myDialogComponent = dynamic_cast<Window *>(
        windowManager->findComponent("GameStats"));
    if (myDialogComponent == 0)
    {
        try
        {
            myDialogComponent = dynamic_cast<Window *>(
                loadGUIFile("/data/gui/dialogs/gamestats.xml"));
            assert(myDialogComponent != 0);
            registerDialog();
        }
        catch (std::exception &e)
        {
            std::cerr << "Couldn't display message 'gamestats': "
                      << e.what() << "\n";
            return;
        }
    }
    else
    {
        useExisting = true;
    }

    // Fill in Fields.
    int line = 1;
    int maxlength = 567;
    char *outf = (char *)malloc(maxlength);
    if (cheat_flag)
    {
        setParagraphN("statistic_text", line++, _("----- IN TEST MODE -------"));
    }
    snprintf(outf, maxlength, "%s", _("Game statistics from LinCity-NG"));
    setParagraphN("statistic_text", line++, outf);
    if (strlen(given_scene) > 3)
    {
        snprintf(outf, maxlength, "%s - %s", _("Initial loaded scene"), given_scene);
        setParagraphN("statistic_text", line++, outf);
    }
    if (sustain_flag)
    {
        snprintf(outf, maxlength, "%s", _("Economy is sustainable"));
        setParagraphN("statistic_text", line++, outf);
    }
    snprintf(outf, maxlength, "%s %d %s %d %s.",
             _("Population"), population + people_pool, _("of which"), people_pool, _("are not housed"));
    setParagraphN("statistic_text", line++, outf);
    snprintf(outf, maxlength, "%s %d %s %d %s %d",
             _("Max population"), max_pop_ever, _("Number evacuated"), total_evacuated, _("Total births"), total_births);
    setParagraphN("statistic_text", line++, outf);
    snprintf(outf, maxlength, "%s %s %04d %s %8d %s %5.1f (%5.1f)",
             _("Date"), current_month(total_time), current_year(total_time),
             _("Money"), total_money, _("Tech-level"),
             (float)tech_level * 100.0 / MAX_TECH_LEVEL,
             (float)highest_tech_level * 100.0 / MAX_TECH_LEVEL);
    setParagraphN("statistic_text", line++, outf);
    snprintf(outf, maxlength, "%s %7d %s %8.3f",
             _("Deaths by starvation"), total_starve_deaths,
             _("History"), starve_deaths_history);
    setParagraphN("statistic_text", line++, outf);
    snprintf(outf, maxlength, "%s %7d   %s %8.3f",
             _("Deaths from pollution"), total_pollution_deaths,
             _("History"), pollution_deaths_history);
    setParagraphN("statistic_text", line++, outf);
    snprintf(outf, maxlength, "%s %7d   %s %8.3f",
             _("Years of unemployment"), total_unemployed_years,
             _("History"), unemployed_history);
    setParagraphN("statistic_text", line++, outf);
    snprintf(outf, maxlength, "%s %2d  %s %2d",
             _("Rockets launched"), rockets_launched,
             _("Successful launches"), rockets_launched_success);
    setParagraphN("statistic_text", line++, outf);

    while (line <= 11)
    { // clear remaining lines
        setParagraphN("statistic_text", line++, "");
    }
    free(outf);

    setTableRC("statistic", 1, 1, _("Residences"),
               Counted<Residence>::getInstanceCount());
    setTableRC("statistic", 1, 2, _("Markets"), Counted<Market>::getInstanceCount());
    setTableRC("statistic", 1, 3, _("Farms"), Counted<Organic_farm>::getInstanceCount());

    setTableRC("statistic", 2, 1, _("Water wells"), Counted<Waterwell>::getInstanceCount());
    setTableRC("statistic", 2, 2, _("Wind powers"), Counted<Windpower>::getInstanceCount());
    setTableRC("statistic", 2, 3, "", "");

    setTableRC("statistic", 3, 1, "", "");
    setTableRC("statistic", 3, 2, "", "");
    setTableRC("statistic", 3, 3, "", "");

    setTableRC("statistic", 4, 1, _("Monuments"), Counted<Monument>::getInstanceCount());
    setTableRC("statistic", 4, 2, _("Schools"), Counted<School>::getInstanceCount());
    setTableRC("statistic", 4, 3, _("Universities"), Counted<University>::getInstanceCount());

    setTableRC("statistic", 5, 1, _("Fire stations"), Counted<FireStation>::getInstanceCount());
    setTableRC("statistic", 5, 2, _("Parks"), Counted<Parkland>::getInstanceCount());
    setTableRC("statistic", 5, 3, _("Sports fields"), Counted<Cricket>::getInstanceCount());

    setTableRC("statistic", 6, 1, _("Health centres"), Counted<HealthCentre>::getInstanceCount());
    setTableRC("statistic", 6, 2, _("Tips"), Counted<Tip>::getInstanceCount());
    setTableRC("statistic", 6, 3, _("Shanties"), Counted<Shanty>::getInstanceCount());

    setTableRC("statistic", 7, 1, "", "");
    setTableRC("statistic", 7, 2, "", "");
    setTableRC("statistic", 7, 3, "", "");

    setTableRC("statistic", 8, 1, _("Windmills"), Counted<Windmill>::getInstanceCount());
    setTableRC("statistic", 8, 2, _("Coal powers"), Counted<Coal_power>::getInstanceCount());
    setTableRC("statistic", 8, 3, _("Solar powers"), Counted<SolarPower>::getInstanceCount());

    setTableRC("statistic", 9, 1, _("Substations"), Counted<Substation>::getInstanceCount());
    setTableRC("statistic", 9, 2, _("Power lines"), Counted<Powerline>::getInstanceCount());
    setTableRC("statistic", 9, 3, _("Ports"), Counted<Port>::getInstanceCount());

    setTableRC("statistic", 10, 1, _("Tracks"), Counted<Track>::getInstanceCount());
    setTableRC("statistic", 10, 2, _("Roads"), Counted<Road>::getInstanceCount());
    setTableRC("statistic", 10, 3, _("Rail"), Counted<Rail>::getInstanceCount());

    setTableRC("statistic", 11, 1, "", "");
    setTableRC("statistic", 11, 2, "", "");
    setTableRC("statistic", 11, 3, "", "");

    setTableRC("statistic", 12, 1, _("Potteries"), Counted<Pottery>::getInstanceCount());
    setTableRC("statistic", 12, 2, _("Blacksmiths"), Counted<Blacksmith>::getInstanceCount());
    setTableRC("statistic", 12, 3, _("Mills"), Counted<Mill>::getInstanceCount());

    setTableRC("statistic", 13, 1, _("Light inds"), Counted<IndustryLight>::getInstanceCount());
    setTableRC("statistic", 13, 2, _("Heavy inds"), Counted<IndustryHeavy>::getInstanceCount());
    setTableRC("statistic", 13, 3, _("Recyclers"), Counted<Recycle>::getInstanceCount());

    setTableRC("statistic", 14, 1, _("Coal mines"), Counted<Coalmine>::getInstanceCount());
    setTableRC("statistic", 14, 2, _("Ore mines"), Counted<Oremine>::getInstanceCount());
    setTableRC("statistic", 14, 3, _("Forests"), Counted<Commune>::getInstanceCount());

    setTableRC("statistic", 15, 1, "", "");
    setTableRC("statistic", 15, 2, "", "");
    setTableRC("statistic", 15, 3, "", "");

    if (!useExisting)
    {
        // connect signals
        Button *noButton = getButton(*myDialogComponent, "Okay");
        noButton->clicked.connect(makeCallback(*this, &Dialog::closeDialogButtonClicked));
    }
}

/*
 * Save game statistics to RESULTS_FILENAME. Do NOT translate text here!
 * That way the files can be used for highscores.
 */
void Dialog::saveGameStats()
{
    // open File
    /*   const char *lc_save_dir = PHYSFS_getWriteDir();
       char *s = (char *)malloc(
           strlen(lc_save_dir) + strlen(RESULTS_FILENAME) + 2);
       if(!s)
           lc_error(-1, errno, "malloc");
       sprintf(s, "%s%s%s",
           lc_save_dir, PHYSFS_getDirSeparator(), RESULTS_FILENAME);

       std::ofstream results( s );
       free( s );

       // Fill in Fields.
       int maxlength = 567;
       char* outf = (char *) malloc ( maxlength );
       //int group_count[NUM_OF_GROUPS];
       //count_all_groups (group_count);
       if (cheat_flag){
           results << "----- IN TEST MODE -------"  << std::endl;
       }
       snprintf (outf, maxlength, "Game statistics from LinCity-NG Version %s", PACKAGE_VERSION);
       results << outf << std::endl;
       if (strlen (given_scene) > 3){
           #pragma GCC diagnostic push
           #pragma GCC diagnostic ignored "-Wformat-truncation"
           snprintf (outf, maxlength, "Initial loaded scene - %s", given_scene);
           #pragma GCC diagnostic pop
           results << outf << std::endl;
       }
       if (sustain_flag){
           snprintf (outf, maxlength, "%s", "Economy is sustainable");
           results << outf << std::endl;
       }
       snprintf (outf, maxlength, "Population  %d  of which  %d  are not housed."
            ,population + people_pool, people_pool);
       results << outf << std::endl;
       snprintf (outf, maxlength,
            "Max population %d  Number evacuated %d Total births %d"
            ,max_pop_ever, total_evacuated, total_births);
       results << outf << std::endl;
       snprintf (outf, maxlength,
            "Date %02d/%04d  Money %8d   Tech-level %5.1f (%5.1f)",
            1 + ((total_time % NUMOF_DAYS_IN_YEAR) / NUMOF_DAYS_IN_MONTH), current_year(total_time), total_money,
            (float) tech_level * 100.0 / MAX_TECH_LEVEL,
            (float) highest_tech_level * 100.0 / MAX_TECH_LEVEL);
       results << outf << std::endl;
       snprintf (outf, maxlength,
            " Deaths by starvation %7d   History %8.3f",
            total_starve_deaths, starve_deaths_history);
       results << outf << std::endl;
       snprintf (outf, maxlength,
            "Deaths from pollution %7d   History %8.3f",
            total_pollution_deaths, pollution_deaths_history);
       results << outf << std::endl;
       snprintf (outf, maxlength, "Years of unemployment %7d   History %8.3f",
            total_unemployed_years, unemployed_history);
       results << outf << std::endl;
       snprintf (outf, maxlength, "Rockets launched %2d  Successful launches %2d",
            rockets_launched, rockets_launched_success);
       results << outf << std::endl;
       results << "" << std::endl;

       snprintf (outf, maxlength, "    Residences %4d         Markets %4d            Farms %4d",
            Counted<Residence>::getInstanceCount(),
            Counted<Market>::getInstanceCount(),
            Counted<Organic_farm>::getInstanceCount());
       results << outf << std::endl;
       snprintf (outf, maxlength, "   Water wells %4d     Wind powers %4d",
       Counted<Waterwell>::getInstanceCount(),Counted<Windpower>::getInstanceCount());
       results << outf << std::endl;
       snprintf (outf, maxlength, "     Monuments %4d         Schools %4d     Universities %4d"
            ,Counted<Monument>::getInstanceCount(), Counted<School>::getInstanceCount()
            ,Counted<University>::getInstanceCount());
       results << outf << std::endl;
       snprintf (outf, maxlength, " Fire stations %4d           Parks %4d    Sports fields %4d"
            ,Counted<FireStation>::getInstanceCount(), Counted<Parkland>::getInstanceCount()
            ,Counted<Cricket>::getInstanceCount());
       results << outf << std::endl;
       snprintf (outf, maxlength, "Health centres %4d            Tips %4d         Shanties %4d",
            Counted<HealthCentre>::getInstanceCount(), Counted<Tip>::getInstanceCount(),
            Counted<Shanty>::getInstanceCount());
       results << outf << std::endl;
       results << "" << std::endl;

       snprintf (outf, maxlength, "     Windmills %4d     Coal powers %4d     Solar powers %4d",
            Counted<Windmill>::getInstanceCount(),
            Counted<Coal_power>::getInstanceCount(),
            Counted<SolarPower>::getInstanceCount());
       results << outf << std::endl;
       snprintf (outf, maxlength, "   Substations %4d     Power lines %4d            Ports %4d"
            ,Counted<Substation>::getInstanceCount(), Counted<Powerline>::getInstanceCount()
            ,Counted<Port>::getInstanceCount());
       results << outf << std::endl;
       snprintf (outf, maxlength, "        Tracks %4d           Roads %4d             Rail %4d"
            ,Counted<Track>::getInstanceCount(), Counted<Road>::getInstanceCount()
            ,Counted<Road>::getInstanceCount());
       results << outf << std::endl;
       results << "" << std::endl;

       snprintf (outf, maxlength, "     Potteries %4d     Blacksmiths %4d            Mills %4d"
            ,Counted<Pottery>::getInstanceCount(), Counted<Blacksmith>::getInstanceCount()
            ,Counted<Mill>::getInstanceCount());
       results << outf << std::endl;
       snprintf (outf, maxlength, "    Light inds %4d      Heavy inds %4d        Recyclers %4d"
            ,Counted<IndustryLight>::getInstanceCount(), Counted<IndustryHeavy>::getInstanceCount()
            ,Counted<Recycle>::getInstanceCount());
       results << outf << std::endl;
       snprintf (outf, maxlength, "    Coal mines %4d       Ore mines %4d         Communes %4d"
            ,Counted<Coalmine>::getInstanceCount(), Counted<Oremine>::getInstanceCount()
            ,Counted<Commune>::getInstanceCount());
       results << outf << std::endl;
       results << "" << std::endl;

       //close File
       results.close();

       free( outf );*/
}

void Dialog::editMarket()
{
    if (!windowManager)
    {
        std::cerr << "No window manager found.\n";
        return;
    }
    try
    {
        myDialogComponent = dynamic_cast<Window *>(
            loadGUIFile("/data/gui/dialogs/tradedialog.xml"));
        assert(myDialogComponent != 0);
        registerDialog();
        blockingDialogIsOpen = true;
        iAmBlocking = true;
    }
    catch (std::exception &e)
    {
        std::cerr << "Couldn't display dialog 'tradedialog.xml': "
                  << e.what() << "\n";
        return;
    }
    // set Dialog to Market-Data
    Paragraph *p = getParagraph(*myDialogComponent, "DialogTitle");
    std::stringstream title;
    title << _("Market") << " ( " << pointX << " , " << pointY << " )";
    p->setText(title.str());
    Market *market = static_cast<Market *>(world(pointX, pointY)->reportingConstruction);
    CheckButton *cb;
    cb = getCheckButton(*myDialogComponent, "BuyLabor");
    if (market->commodityRuleCount[STUFF_LABOR].take)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "SellLabor");
    if (market->commodityRuleCount[STUFF_LABOR].give)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "BuyFood");
    if (market->commodityRuleCount[STUFF_FOOD].take)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "SellFood");
    if (market->commodityRuleCount[STUFF_FOOD].give)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "BuyCoal");
    if (market->commodityRuleCount[STUFF_COAL].take)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "SellCoal");
    if (market->commodityRuleCount[STUFF_COAL].give)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "BuyOre");
    if (market->commodityRuleCount[STUFF_ORE].take)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "SellOre");
    if (market->commodityRuleCount[STUFF_ORE].give)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "BuyGoods");
    if (market->commodityRuleCount[STUFF_GOODS].take)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "SellGoods");
    if (market->commodityRuleCount[STUFF_GOODS].give)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "BuySteel");
    if (market->commodityRuleCount[STUFF_STEEL].take)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "SellSteel");
    if (market->commodityRuleCount[STUFF_STEEL].give)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "BuyWaste");
    if (market->commodityRuleCount[STUFF_WASTE].take)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "SellWaste");
    if (market->commodityRuleCount[STUFF_WASTE].give)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "BuyWater");
    if (market->commodityRuleCount[STUFF_WATER].take)
        cb->check();
    else
        cb->uncheck();
    cb = getCheckButton(*myDialogComponent, "SellWater");
    if (market->commodityRuleCount[STUFF_WATER].give)
        cb->check();
    else
        cb->uncheck();
    // connect signals
    Button *applyButton = getButton(*myDialogComponent, "Apply");
    applyButton->clicked.connect(makeCallback(*this, &Dialog::applyMarketButtonClicked));
    Button *gotoButton = getButton(*myDialogComponent, "goto");
    gotoButton->clicked.connect(makeCallback(*this, &Dialog::gotoButtonClicked));
}

void Dialog::editPort()
{
    if (!windowManager)
    {
        std::cerr << "No window manager found.\n";
        return;
    }
    try
    {
        myDialogComponent = dynamic_cast<Window *>(
            loadGUIFile("/data/gui/dialogs/portdialog.xml"));
        assert(myDialogComponent != 0);
        registerDialog();
        blockingDialogIsOpen = true;
        iAmBlocking = true;
    }
    catch (std::exception &e)
    {
        std::cerr << "Couldn't display dialog 'tradedialog.xml': "
                  << e.what() << "\n";
        return;
    }
    // set Dialog to Port-Data
    // int port_flags = world(pointX, pointY)->reportingConstruction->flags;
    Port *port = dynamic_cast<Port *>(world(pointX, pointY)->reportingConstruction);
    Paragraph *p = getParagraph(*myDialogComponent, "DialogTitle");
    std::stringstream title;
    title << _("Port") << " ( " << pointX << " , " << pointY << " )";
    p->setText(title.str());

    for (Commodity c = STUFF_INIT; c != STUFF_COUNT; c++)
    {
        if (!port->commodityRuleCount[c].maxload)
            continue;

        for (int isGive = 0; isGive < 2; isGive++)
        {
            SwitchComponent *sc = dynamic_cast<SwitchComponent *>(
                myDialogComponent->findComponent(
                    std::string(isGive ? "Sell" : "Buy") + commodityNames[c]));
            if (!sc)
            {
                std::cerr << "error: could not get "
                          << (std::string(isGive ? "Sell" : "Buy") + commodityNames[c])
                          << " SwitchComponent" << std::endl;
                continue;
            }
            const CommodityRule &rule = portConstructionGroup.tradeRule[c];
            sc->switchComponent((isGive ? rule.give : rule.take) ? "green" : "red");
            CheckButton *cb = dynamic_cast<CheckButton *>(sc->getActiveComponent());
            if (!cb)
            {
                std::cerr << "error: could not get "
                          << ((isGive ? rule.give : rule.take) ? "green" : "red")
                          << " CheckButton for "
                          << (std::string(isGive ? "Sell" : "Buy") + commodityNames[c])
                          << std::endl;
                continue;
            }

            CommodityRule &crc = port->commodityRuleCount[c];
            if (isGive ? crc.give : crc.take)
                cb->check();
            else
                cb->uncheck();
        }
    }

    // connect signals
    Button *applyButton = getButton(*myDialogComponent, "Apply");
    applyButton->clicked.connect(makeCallback(*this, &Dialog::applyPortButtonClicked));
    Button *gotoButton = getButton(*myDialogComponent, "goto");
    gotoButton->clicked.connect(makeCallback(*this, &Dialog::gotoButtonClicked));
}

void Dialog::applyMarketButtonClicked(Button *)
{
    CheckButton *cb;
    Market *market = static_cast<Market *>(world(pointX, pointY)->construction);
    cb = getCheckButton(*myDialogComponent, "BuyLabor");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_LABOR].take = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_LABOR].take = false;
    }
    cb = getCheckButton(*myDialogComponent, "SellLabor");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_LABOR].give = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_LABOR].give = false;
    }
    cb = getCheckButton(*myDialogComponent, "BuyFood");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_FOOD].take = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_FOOD].take = false;
    }
    cb = getCheckButton(*myDialogComponent, "SellFood");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_FOOD].give = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_FOOD].give = false;
    }
    cb = getCheckButton(*myDialogComponent, "BuyCoal");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_COAL].take = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_COAL].take = false;
    }
    cb = getCheckButton(*myDialogComponent, "SellCoal");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_COAL].give = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_COAL].give = false;
    }
    cb = getCheckButton(*myDialogComponent, "BuyOre");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_ORE].take = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_ORE].take = false;
    }
    cb = getCheckButton(*myDialogComponent, "SellOre");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_ORE].give = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_ORE].give = false;
    }
    cb = getCheckButton(*myDialogComponent, "BuyGoods");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_GOODS].take = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_GOODS].take = false;
    }
    cb = getCheckButton(*myDialogComponent, "SellGoods");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_GOODS].give = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_GOODS].give = false;
    }
    cb = getCheckButton(*myDialogComponent, "BuySteel");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_STEEL].take = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_STEEL].take = false;
    }
    cb = getCheckButton(*myDialogComponent, "SellSteel");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_STEEL].give = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_STEEL].give = false;
    }
    cb = getCheckButton(*myDialogComponent, "BuyWaste");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_WASTE].take = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_WASTE].take = false;
    }
    cb = getCheckButton(*myDialogComponent, "SellWaste");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_WASTE].give = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_WASTE].give = false;
    }
    cb = getCheckButton(*myDialogComponent, "BuyWater");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_WATER].take = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_WATER].take = false;
    }
    cb = getCheckButton(*myDialogComponent, "SellWater");
    if (cb->state == CheckButton::STATE_CHECKED)
    {
        market->commodityRuleCount[STUFF_WATER].give = true;
    }
    else
    {
        market->commodityRuleCount[STUFF_WATER].give = false;
    }
    mps_refresh();
    windowManager->removeWindow(myDialogComponent);
    blockingDialogIsOpen = false;
    unRegisterDialog();
}

void Dialog::applyPortButtonClicked(Button *)
{
    Port *port = dynamic_cast<Port *>(world(pointX, pointY)->reportingConstruction);

    for (Commodity c = STUFF_INIT; c != STUFF_COUNT; c++)
    {
        if (!port->commodityRuleCount[c].maxload)
            continue;

        for (int isGive = 0; isGive < 2; isGive++)
        {
            SwitchComponent *sc = dynamic_cast<SwitchComponent *>(
                myDialogComponent->findComponent(
                    std::string(isGive ? "Sell" : "Buy") + commodityNames[c]));
            if (!sc)
            {
                std::cerr << "error: could not find "
                          << (std::string(isGive ? "Sell" : "Buy") + commodityNames[c])
                          << " SwitchComponent" << std::endl;
                continue;
            }
            CheckButton *cb = dynamic_cast<CheckButton *>(sc->getActiveComponent());
            if (!cb)
            {
                std::cerr << "error: could not find CheckButton for "
                          << (std::string(isGive ? "Sell" : "Buy") + commodityNames[c])
                          << std::endl;
                continue;
            }

            CommodityRule &crc = port->commodityRuleCount[c];
            (isGive ? crc.give : crc.take) =
                cb->state == CheckButton::STATE_CHECKED;
        }

        if (port->commodityRuleCount[c].take && port->commodityRuleCount[c].give)
        {
            port->commodityRuleCount[c].take = false;
            port->commodityRuleCount[c].give = false;
        }
    }

    windowManager->removeWindow(myDialogComponent);
    blockingDialogIsOpen = false;
    unRegisterDialog();
}

void Dialog::okayLaunchRocketButtonClicked(Button *)
{
    static_cast<RocketPad *>(world(pointX, pointY)->reportingConstruction)->launch_rocket();
    windowManager->removeWindow(myDialogComponent);
    blockingDialogIsOpen = false;
    unRegisterDialog();
}

void Dialog::okayCoalSurveyButtonClicked(Button *)
{
    do_coal_survey();
    windowManager->removeWindow(myDialogComponent);
    blockingDialogIsOpen = false;
    unRegisterDialog();
}

void Dialog::okayBulldozeRiverButtonClicked(Button *)
{
    river_bul_flag = 1;
    windowManager->removeWindow(myDialogComponent);
    check_bulldoze_area(pointX, pointY);
    blockingDialogIsOpen = false;
    unRegisterDialog();
}

void Dialog::okayBulldozeShantyButtonClicked(Button *)
{
    shanty_bul_flag = 1;
    windowManager->removeWindow(myDialogComponent);
    check_bulldoze_area(pointX, pointY);
    blockingDialogIsOpen = false;
    unRegisterDialog();
}

void Dialog::okayBulldozeMonumentButtonClicked(Button *)
{
    monument_bul_flag = 1;
    windowManager->removeWindow(myDialogComponent);
    check_bulldoze_area(pointX, pointY);
    blockingDialogIsOpen = false;
    unRegisterDialog();
}

void Dialog::gotoButtonClicked(Button *)
{
    getGameView()->show(MapPoint(pointX, pointY));
}

void Dialog::closeDialogButtonClicked(Button *)
{
    closeDialog();
}

void Dialog::closeDialog()
{
    windowManager->removeWindow(myDialogComponent);
    if (iAmBlocking)
    {
        blockingDialogIsOpen = false;
    }
    unRegisterDialog();
}