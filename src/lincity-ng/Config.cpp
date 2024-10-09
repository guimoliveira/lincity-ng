#include "Config.hpp"

#include <assert.h>
#include <stdio.h>
#include <string.h>
#include <exception>
#include <iostream>
#include <fstream>

#include "gui/XmlReader.hpp"
#include "lincity/engglobs.h"
#include "lincity/world.h"

Config *configPtr = 0;

Config *getConfig()
{
    if (configPtr == 0)
    {
        configPtr = new Config();
    }

    return configPtr;
}

Config::Config()
{
    assert(configPtr == 0);

    // Default Values
    videoX = 1336;
    videoY = 768;

    soundVolume = 100;
    musicVolume = 50;
    soundEnabled = true;
    musicEnabled = true;
    carsEnabled = true;

    monthgraphW = 190;
    monthgraphH = 64;
    skipMonthsFast = 1;
    quickness = 10;

    musicTheme = "default";

    language = "autodetect";

    world.len(WORLD_SIDE_LEN);
    binary_mode = true;
    seed_compression = true;
    carsEnabled = true;

    load();
}

Config::~Config()
{
    if (configPtr == this)
    {
        configPtr = 0;
    }
}

/*
 * Read Integer Value from char-Array.
 * use defaultValue on Errors or if Value is not in given Interval.
 */
int Config::parseInt(std::string value, int defaultValue, int minValue, int maxValue)
{
    int tmp;
    if (sscanf(value.c_str(), "%i", &tmp) != 1)
    {
        std::cerr << "Config::parseInt# Error parsing integer value '" << value << "'.\n";
        tmp = defaultValue;
    }
    if ((tmp >= minValue) && (tmp <= maxValue))
    {
        return tmp;
    }
    else
    {
        std::cerr << "Config::parseInt# Value '" << value << "' not in ";
        std::cerr << minValue << ".." << maxValue << "\n";
        return defaultValue;
    }
}

/*
 * Load configuration from File.
 */
void Config::load()
{
    std::string filename = "/offline/userconfig.xml";
    std::ifstream file(filename);
    if (!file.good()) {
        return;
    }
    file.close();

    XmlReader reader(filename);
    while (reader.read())
    {
        if (reader.getNodeType() == XML_READER_TYPE_ELEMENT)
        {
            std::string element = reader.getName();
            if (element == "video")
            {
                XmlReader::AttributeIterator iter(reader);
                while (iter.next())
                {
                    std::string name = iter.getName();
                    std::string value = iter.getValue();
                    if (name == "x")
                    {
                        videoX = parseInt(value, 800, 640);
                    }
                    else if (name == "y")
                    {
                        videoY = parseInt(value, 600, 480);
                    }
                    else if (name == "WorldSideLen")
                    {
                        world.len(parseInt(value, WORLD_SIDE_LEN, 50, 10000));
                    }
                    else
                    {
                        std::cerr << "Config::load# Unknown attribute '" << name;
                        std::cerr << "' in element '" << element << "' from " << filename << ".\n";
                    }
                }
            }
            else if (element == "audio")
            {
                XmlReader::AttributeIterator iter(reader);
                while (iter.next())
                {
                    std::string name = iter.getName();
                    std::string value = iter.getValue();
                    if (name == "soundVolume")
                    {
                        soundVolume = parseInt(value, 100, 0, 100);
                    }
                    else if (name == "musicVolume")
                    {
                        musicVolume = parseInt(value, 100, 0, 100);
                    }
                    else if (name == "soundEnabled")
                    {
                        soundEnabled = parseBool(value, true);
                    }
                    else if (name == "musicEnabled")
                    {
                        musicEnabled = parseBool(value, true);
                    }
                    else if (name == "musicTheme")
                    {
                        musicTheme = value;
                    }
                    else
                    {
                        std::cerr << "Config::load# Unknown attribute '" << name;
                        std::cerr << "' in element '" << element << "' from " << filename << ".\n";
                    }
                }
            }
            else if (element == "game")
            {
                XmlReader::AttributeIterator iter(reader);
                while (iter.next())
                {
                    std::string name = iter.getName();
                    std::string value = iter.getValue();
                    if (name == "monthgraphW")
                    {
                        monthgraphW = parseInt(value, 120, 0);
                    }
                    else if (name == "monthgraphH")
                    {
                        monthgraphH = parseInt(value, 64, 0);
                    }
                    else if (name == "quickness")
                    {
                        quickness = parseInt(value, 2, 1, 100);
                    }
                    else if (name == "language")
                    {
                        language = value;
                    }
                    else if (name == "WorldSideLen")
                    {
                        world.len(parseInt(value, WORLD_SIDE_LEN, 50, 10000));
                    }
                    else
                    {
                        std::cerr << "Config::load# Unknown attribute '" << name;
                        std::cerr << "' in element '" << element << "' from " << filename << ".\n";
                    }
                }
            }
            else
            {
                std::cerr << "Config::load# Unknown element '" << element << "' in " << filename << ".\n";
            }
        }
    }
}

bool Config::parseBool(std::string value, bool defaultValue)
{
    if (value == "no" || value == "off" || value == "false" || value == "NO" || value == "OFF" || value == "FALSE")
    {
        return false;
    }
    if (value == "yes" || value == "on" || value == "true" || value == "YES" || value == "ON" || value == "TRUE")
    {
        return true;
    }

    std::cerr << "Couldn't parse boolean value '" << value << "'.\n";
    return defaultValue;
}

/*
 * Save configuration to File.
 */
void Config::save()
{
    std::ofstream userconfig("/offline/userconfig.xml");
    userconfig << "<?xml version=\"1.0\"?>\n";
    userconfig << "<configuration>\n";
    userconfig << "    <video x=\"" << videoX << "\" y=\"" << videoY << "\" />\n";
    userconfig << "    <audio soundEnabled=\"" << (soundEnabled ? "yes" : "no")
               << "\" soundVolume=\"" << soundVolume << "\" \n";
    userconfig << "           musicEnabled=\"" << (musicEnabled ? "yes" : "no")
               << "\" musicVolume=\"" << musicVolume << "\"\n";
    userconfig << "           musicTheme=\"" << musicTheme << "\" />\n";
    userconfig << "    <game quickness=\"" << quickness << "\" "
               << "language=\"" << language //
               << "\" WorldSideLen=\"" << ((world.len() < 50) ? 50 : world.len())
               << "\" />\n";
    userconfig << "</configuration>\n";
}
