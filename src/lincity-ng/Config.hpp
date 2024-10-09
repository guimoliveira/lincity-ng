#ifndef __CONFIG_HPP__
#define __CONFIG_HPP__

#include <limits.h>
#include <string>

class Config
{
public:
    Config();
    ~Config();

    int videoX, videoY;
    int monthgraphW, monthgraphH;

    // sound volume 0..100 (0=silent)
    int soundVolume;
    // music volume 0..100
    int musicVolume;
    bool soundEnabled;
    bool musicEnabled;
    bool carsEnabled;
    int skipMonthsFast;
    // how fast is fast_time_for_year
    int quickness;

    std::string language;
    std::string musicTheme;

    void save();
    void load();

private:
    int parseInt(std::string value, int defaultValue, int minValue = INT_MIN,
                 int maxValue = INT_MAX);
    bool parseBool(std::string value, bool defaultvalue);
};

Config *getConfig();

#endif
