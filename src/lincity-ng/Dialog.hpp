#ifndef __DIALOG_HPP__
#define __DIALOG_HPP__

#include <string>

class Button;
class Window;
class WindowManager;

#define BULLDOZE_MONUMENT 1
#define BULLDOZE_RIVER 2
#define BULLDOZE_SHANTY 3
#define EDIT_MARKET 4
#define EDIT_PORT 5
#define ASK_COAL_SURVEY 6
#define ASK_LAUNCH_ROCKET 7
#define GAME_STATS 8
#define MSG_DIALOG 9

extern bool blockingDialogIsOpen;

void closeAllDialogs();

class Dialog
{
public:
    Dialog(int type, std::string message, std::string extraString);
    Dialog(int type, int x, int y);
    Dialog(int type);
    ~Dialog();
    void closeDialog();

private:
    void askBulldozeMonument();
    void askBulldozeRiver();
    void askBulldozeShanty();

    void editMarket();
    void editPort();

    void coalSurvey();
    void askRocket();
    void gameStats();
    void saveGameStats();

    void msgDialog(std::string message, std::string extraString);

    void initDialog(int x = -1, int y = -1);
    WindowManager *windowManager;
    Window *myDialogComponent;
    int pointX;
    int pointY;

    template <typename T>
    void setTableRC(const std::string basename, const int row, const int column, const std::string text, const T value);

    void setParagraphN(const std::string basename, const int number, const std::string text);
    void setParagraph(const std::string paragraphName, const std::string text);
    void okayBulldozeRiverButtonClicked(Button *);
    void okayBulldozeShantyButtonClicked(Button *);
    void okayBulldozeMonumentButtonClicked(Button *);
    void okayCoalSurveyButtonClicked(Button *);
    void okayLaunchRocketButtonClicked(Button *);
    void closeDialogButtonClicked(Button *);
    void gotoButtonClicked(Button *);
    void applyMarketButtonClicked(Button *);
    void applyPortButtonClicked(Button *);
    bool iAmBlocking;
    void registerDialog();
    void unRegisterDialog();
};

#endif
