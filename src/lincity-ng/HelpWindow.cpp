#include "HelpWindow.hpp"

#include <exception>
#include <iostream>
#include <memory>
#include <sstream>
#include <stdexcept>
#include <fstream>

#include "Util.hpp"
#include "gui/Button.hpp"
#include "gui/Component.hpp"
#include "gui/ComponentLoader.hpp"
#include "gui/Desktop.hpp"
#include "gui/Document.hpp"
#include "gui/ScrollView.hpp"
#include "gui/Window.hpp"
#include "gui/WindowManager.hpp"
#include "gui/callback/Callback.hpp"
#include "gui/callback/Signal.hpp"
#include "tinygettext/gettext.hpp"
#include "tinygettext/tinygettext.hpp"

HelpWindow::HelpWindow(Desktop *desktop)
{
    this->windowManager = dynamic_cast<WindowManager *>(
        desktop->findComponent("windowManager"));
}

HelpWindow::~HelpWindow()
{
}

void HelpWindow::update()
{
    if (nextTopic != "")
    {
        showTopic(nextTopic);
    }
}

void HelpWindow::showTopic(const std::string &topic)
{
    try
    {
        // make sure HelpWindow is open
        Window *helpWindow = dynamic_cast<Window *>(
            windowManager->findComponent("HelpWindow"));
        if (helpWindow == 0)
        {
            helpWindow = dynamic_cast<Window *>(
                loadGUIFile("/data/gui/helpwindow.xml"));
            windowManager->addWindow(helpWindow);
            // connect history back button
            historyBackButton = getButton(*helpWindow, "HistoryBack");
            historyBackButton->clicked.connect(
                makeCallback(*this, &HelpWindow::historyBackClicked));
        }
        // load new contents
        std::string filename = getHelpFile(topic);
        std::unique_ptr<Component> contents(loadGUIFile(filename));
        Document *document = dynamic_cast<Document *>(contents.get());
        if (document == 0)
            throw std::runtime_error("Help Contents is not a Document");
        document->linkClicked.connect(
            makeCallback(*this, &HelpWindow::linkClicked));

        // attach to help window
        Component *helpScrollView = helpWindow->findComponent("HelpScrollView");
        if (helpScrollView == 0)
            throw std::runtime_error("HelpScrollView not found in HelpWindow");
        ScrollView *scrollView = dynamic_cast<ScrollView *>(helpScrollView);
        if (scrollView == 0)
            throw std::runtime_error("HelpScrollView is not a ScrollView");
        scrollView->replaceContents(contents.release());
        topicHistory.push(topic);
    }
    catch (std::exception &e)
    {
        std::cerr << "Couldn't open HelpWindow: "
                  << e.what() << "\n";
    }
    nextTopic = "";
}

std::string
HelpWindow::getHelpFile(const std::string &topic)
{
    // try in user language
    std::string filename = "/data/help/";
    filename += dictionaryManager->get_language() + "/";
    filename += topic;
    filename += ".xml";
    if (std::fstream(filename).good())
    {
        return filename;
    }

    // try short language, eg. "de" instead of "de_CH"
    std::string language = dictionaryManager->get_language();
    std::string::size_type pos = language.find("_");
    if (pos != std::string::npos)
    {
        language = std::string(language, 0, pos);
        filename = "/data/help/";
        filename += language + "/";
        filename += topic;
        filename += ".xml";
        if (std::fstream(filename).good())
        {
            return filename;
        }
    }

    // try english
    filename = "/data/help/en/";
    filename += topic;
    filename += ".xml";
    if (!std::fstream(filename).good())
    {
        std::ostringstream msg;
        msg << "There exists no help file for topic '" << topic << "'";
        throw std::runtime_error(msg.str());
    }
    return filename;
}

void HelpWindow::linkClicked(Paragraph *, const std::string &href)
{
    nextTopic = href;
}

void HelpWindow::historyBackClicked(Button *)
{
    if (topicHistory.size() > 1)
    {
        topicHistory.pop(); // the current page is on the top, remove it.
        nextTopic = topicHistory.top();
        topicHistory.pop();
    }
}