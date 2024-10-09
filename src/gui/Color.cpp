#include "Color.hpp"

#include <stdio.h>
#include <string.h>
#include <sstream>
#include <stdexcept>
#include <string>

void Color::parse(const char *value)
{
    if (value[0] == 0)
    {
        throw std::runtime_error("Can't parse empty string to color.");
    }

    if (value[0] == '#')
    {
        unsigned int red, green, blue, alpha;
        int res = sscanf(value, "#%2x%2x%2x%2x", &red, &green, &blue, &alpha);
        if (res < 3)
        {
            std::stringstream msg;
            msg << "Failed to parse color value '" << value << "'.";
            throw std::runtime_error(msg.str());
        }
        else
        {
            r = red;
            g = green;
            b = blue;
            if (res == 4)
                a = alpha;
            else
                a = 0xff;
        }
    }
    else if (strcmp(value, "black") == 0)
    {
        r = 0;
        g = 0;
        b = 0;
        a = 0xff;
    }
    else if (strcmp(value, "green") == 0)
    {
        r = 0;
        g = 0x80;
        b = 0;
        a = 0xff;
    }
    else if (strcmp(value, "white") == 0)
    {
        r = 0xff;
        g = 0xff;
        b = 0xff;
        a = 0xff;
    }
    else if (strcmp(value, "blue") == 0)
    {
        r = 0x00;
        g = 0x00;
        b = 0xff;
        a = 0xff;
    }
    else if (strcmp(value, "yellow") == 0)
    {
        r = 0xff;
        g = 0xff;
        b = 0;
        a = 0xff;
    }
    else if (strcmp(value, "red") == 0)
    {
        r = 0xff;
        g = 0;
        b = 0;
        a = 0xff;
    }
    else if (strcmp(value, "brown") == 0)
    {
        r = 165;
        g = 42;
        b = 42;
        a = 0xff;
    }
    else if (strcmp(value, "orange") == 0)
    {
        r = 255;
        g = 165;
        b = 0;
    }
    else if (strcmp(value, "gray") == 0)
    {
        r = 127;
        g = 127;
        b = 127;
    }
    else
    {
        std::stringstream msg;
        msg << "Unknown color name '" << value << "'.";
        throw std::runtime_error(msg.str());
    }
}