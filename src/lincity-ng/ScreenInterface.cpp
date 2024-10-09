#include "ScreenInterface.hpp"

#include <errno.h>
#include <stdio.h>
#include <stdlib.h>
#include <exception>
#include <iomanip>
#include <iostream>
#include <sstream>
#include <string>

#include "ButtonPanel.hpp"
#include "Config.hpp"
#include "Dialog.hpp"
#include "EconomyGraph.hpp"
#include "GameView.hpp"
#include "Util.hpp"
#include "gui/Component.hpp"
#include "gui/Paragraph.hpp"
#include "gui_interface/mps.h"
#include "gui_interface/screen_interface.h"
#include "gui_interface/shared_globals.h"
#include "lc_error.hpp"
#include "lincity/engglobs.h"
#include "lincity/lclib.h"
#include "lincity/lintypes.h"
#include "tinygettext/gettext.hpp"

int selected_module_cost; // this must be changed, when module (or celltype-button) is changed

int prevDate = 0;
int lastMoney = -123456789;

/* This is on in screen_full_refresh, used in *_refresh() */

const char *current_month(int current_time);
void draw_cb_box(int row, int col, int checked);
/*
int ask_launch_rocket_now (int x, int y)
{
    new Dialog( ASK_LAUNCH_ROCKET, x, y );
    return 0;
}
*/
// void screen_full_refresh (void);
void initialize_monthgraph(void)
{
    int i;
    monthgraph_size = getConfig()->monthgraphW;

    monthgraph_pop = (int *)malloc(sizeof(int) * monthgraph_size);
    if (monthgraph_pop == 0)
    {
        std::cerr << "malloc ScreenInterface monthgraph_pop";
    }
    monthgraph_starve = (int *)malloc(sizeof(int) * monthgraph_size);
    if (monthgraph_starve == 0)
    {
        std::cerr << "malloc ScreenInterface monthgraph_starve";
    }
    monthgraph_nojobs = (int *)malloc(sizeof(int) * monthgraph_size);
    if (monthgraph_nojobs == 0)
    {
        std::cerr << "malloc ScreenInterface monthgraph_nojobs";
    }
    monthgraph_ppool = (int *)malloc(sizeof(int) * monthgraph_size);
    if (monthgraph_ppool == 0)
    {
        std::cerr << "malloc ScreenInterface monthgraph_ppool";
    }
    for (i = 0; i < monthgraph_size; i++)
    {
        monthgraph_pop[i] = 0;
        monthgraph_starve[i] = 0;
        monthgraph_nojobs[i] = 0;
        monthgraph_ppool[i] = 0;
    }
}

/*
 * Display some Text in a Dialog Box with an OK Button.
 *
 * see oldgui/screen.cpp: ok_dial_box (char *fn, int good_bad, char *xs)
 *
 * in oldgui good_bad influences the color:
 *                                GOOD, RESULTS in green
 *                                BAD in red
 *                                default white
 * in NG good_bad is reseted to void !!!
 *
 * fn is the FileName of the message
 *   if good_bad is RESULTS the fn is an absolute filename else
 *   it is a File in message_path.
 *
 * xs is some additional Text, that is shown after the Message
 *    from the File. ( XtraString )
 */
void ok_dial_box(const char *fn, int good_bad, const char *xs)
{
    (void)good_bad;
    try
    {
        new Dialog(MSG_DIALOG, std::string(fn), std::string(xs ? xs : ""));
    }
    catch (std::exception &e)
    {
        std::cerr << "Problem with ok_dial_box: " << e.what() << "\n";
        // std::ostringstream text;
        // text << "Problem with ok_dial_box: '" << fn << "' + \"" << (xs ? xs : "") << "\"\n";
        // updateMessageText( text.str() );
    }
}

void updateDate()
{
    if (total_time == prevDate)
        return;
    prevDate = total_time;

    char dateText[20];
    snprintf(dateText, 20, "%02d. %.3s %d",
             total_time % NUMOF_DAYS_IN_MONTH * 30 / NUMOF_DAYS_IN_MONTH + 1,
             current_month(total_time),
             current_year(total_time));

    Component *root = getGameView();
    while (root->getParent())
        root = root->getParent();
    Paragraph *dateParagraph = dynamic_cast<Paragraph *>(
        root->findComponent("dateParagraph"));
    if (!dateParagraph)
    {
        std::cerr << "error: could not find dateParagraph" << '\n';
        return;
    }

    dateParagraph->setText(dateText);
}

void string_begadd_number(std::string &str, int number, bool fill)
{
    std::ostringstream result;
    if (fill)
        result << std::setw(3) << std::setfill('0');
    result << number;
    str = result.str() + std::string(" ") + str;
};

void updateMoney()
{
    if (lastMoney == total_money)
    {
        return;
    }
    // Prevent overflow
    if (total_money > 2000000000)
        total_money = 2000000000;
    else if (total_money < -2000000000)
        total_money = -2000000000;

    std::ostringstream moneyText;
    std::string postfix = "";
    std::string moneystr = "";
    int money = total_money;

    /*   */ if (abs(money) > 100000000)
    {
        money /= 1000000;
        postfix = _("M") + std::string(" ");
    }
    else if (abs(money) > 100000)
    {
        money /= 1000;
        postfix = _("k") + std::string(" ");
    }

    do
    {
        int tmpmoney;
        if (abs(money) < 1000)
        {
            string_begadd_number(moneystr, money, false);
            money = 0;
        }
        else
        {
            tmpmoney = abs(money) % 1000;
            money /= 1000;
            string_begadd_number(moneystr, tmpmoney, true);
        }
    } while (abs(money) > 0);

    moneyText << moneystr << postfix << _("$");

    Component *root = getGameView();
    if (!root)
        return;
    while (root->getParent())
        root = root->getParent();
    Component *moneyParagraphComponent = 0;
    moneyParagraphComponent = root->findComponent("moneyParagraph");
    if (moneyParagraphComponent == 0)
    {
        return;
    }
    Paragraph *moneyParagraph = getParagraph(*root, "moneyParagraph");
    if (!moneyParagraph)
        return;

    moneyParagraph->setText(moneyText.str());
    lastMoney = total_money;
}

/*
 *  A DialogBox with a Progressbar.
 *  see oldgui/screen.cpp: prog_box (char *title, int percent)
 *  is used to open a Dialog with given Title an a Progressbar,
 *  showing percent completed, but is also used to update
 *  the current Progressbar.
 */

void prog_box(const char *title, int percent)
{
    (void)title;
    (void)percent;
#ifdef DEBUG
    std::ostringstream text;
    text << "prog_box:'" << title << "' " << percent << "%\n";
    std::cout << text.str();
#endif
}

void print_total_money(void)
{
    updateMoney();
}

void update_avail_modules(int popup)
{
    // tell ButtonPanel to check for tech change.
    ButtonPanel *bp = getButtonPanel();
    if (bp)
    {
        bp->checkTech(popup);
    }
}

void print_stats()
{
    // this show update the financy window or mps
    if (total_time % NUMOF_DAYS_IN_MONTH == (NUMOF_DAYS_IN_MONTH - 1))
    {
        mps_refresh();
        getEconomyGraph()->updateData();
    }

    if (total_time % (NUMOF_DAYS_IN_MONTH / 5) == NUMOF_DAYS_IN_MONTH / 5 - 1)
    {
        mps_refresh();
    }

    // check for new tech
    update_avail_modules(1);
}
