#include "FontManager.hpp"

#include <SDL.h>
#include <SDL_ttf.h>
#include <exception>
#include <sstream>
#include <stdexcept>
#include <utility>

#include "Style.hpp"
#include "tinygettext/gettext.hpp"
#include "tinygettext/tinygettext.hpp"

FontManager *fontManager = 0;

FontManager::FontManager()
{
}

FontManager::~FontManager()
{
    for (Fonts::iterator i = fonts.begin(); i != fonts.end(); ++i)
        TTF_CloseFont(i->second);
}

TTF_Font *
FontManager::getFont(Style style)
{
    FontInfo info;
    info.name = style.font_family;
    info.fontsize = (int)style.font_size;
    info.fontstyle = 0;
    if (style.italic)
        info.fontstyle |= TTF_STYLE_ITALIC;
    if (style.bold)
        info.fontstyle |= TTF_STYLE_BOLD;

    Fonts::iterator i = fonts.find(info);
    if (i != fonts.end())
        return i->second;

    TTF_Font *font = 0;

    // If there a special font for the current language use it.
    std::string language = dictionaryManager->get_language();
    std::string fontfile = "/data/fonts/" + info.name + "-" + language + ".ttf";
    try
    {
        font = TTF_OpenFont(fontfile.c_str(), info.fontsize);
    }
    catch (std::exception &)
    {
        font = 0;
    }
    if (!font)
    {
        // try short language, eg. "de" instead of "de_CH"
        std::string::size_type pos = language.find("_");
        if (pos != std::string::npos)
        {
            language = std::string(language, 0, pos);
            fontfile = "/data/fonts/" + info.name + "-" + language + ".ttf";
            try
            {
                font = TTF_OpenFont(fontfile.c_str(), info.fontsize);
            }
            catch (std::exception &)
            {
                font = 0;
            }
        }
    }
    if (!font)
    {
        // No special font found? Use default font then.
        fontfile = "/data/fonts/" + info.name + ".ttf";
        try
        {
            font = TTF_OpenFont(fontfile.c_str(), info.fontsize);
        }
        catch (std::exception &)
        {
            font = 0;
        }
    }
    if (!font)
    {
        // give up.
        std::stringstream msg;
        msg << "Error opening font '" << fontfile
            << "': " << SDL_GetError();
        throw std::runtime_error(msg.str());
    }
    if (info.fontstyle != 0)
        TTF_SetFontStyle(font, info.fontstyle);

    fonts.insert(std::make_pair(info, font));
    return font;
}