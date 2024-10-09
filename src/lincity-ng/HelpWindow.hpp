#ifndef __HELPWINDOW_HPP__
#define __HELPWINDOW_HPP__

#include <stack>
#include <string>

class Button;
class Desktop;
class Paragraph;
class WindowManager;

class HelpWindow
{
public:
    HelpWindow(Desktop *desktop);
    ~HelpWindow();

    void showTopic(const std::string &topic);
    void update();

private:
    void linkClicked(Paragraph *paragraph, const std::string &href);
    void historyBackClicked(Button *);
    std::string getHelpFile(const std::string &topic);

    WindowManager *windowManager;
    std::string nextTopic;
    std::stack<std::string> topicHistory;
    Button *historyBackButton;
};

#endif