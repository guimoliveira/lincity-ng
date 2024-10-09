#include "MainLincity.hpp"

#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <iostream>
#include <fstream>
#include <emscripten.h>

#include "Game.hpp"
#include "GameView.hpp"
#include "TimerInterface.hpp"
#include "gui_interface/screen_interface.h"
#include "gui_interface/shared_globals.h"
#include "lincity/lin-city.h"
#include "lincity/loadsave.h"
#include "lincity/modules/all_modules.h"

int lincitySpeed = MED_TIME_FOR_YEAR;
/******************************************/

void setLincitySpeed(int speed)
{
    lincitySpeed = speed;
}

/*
 * get Data form Lincity NG and Save City
 */
void saveCityNG(std::string filename)
{
    if (getGame())
    {
        GameView *gv = getGameView();
        if (gv)
        {
            gv->writeOrigin();
        }
        save_city(const_cast<char *>(filename.c_str()));
    }
}

/*
 * Load City and do setup for Lincity NG.
 */
bool loadCityNG(std::string filename)
{
    try
    {
        std::ifstream file(filename);
        if (!file.good()) {
            std::cout << "could not locate: " << filename << std::endl;
            return false;
        }
        file.close();

        load_city_2(const_cast<char *>(filename.c_str()));
        update_avail_modules(0);
        return true;        
    }
    catch (...)
    {
        return false;
    }
}

void initLincity()
{
    /*initialize Desktop Componenet Factories*/
    initFactories();

    /* Initialize random number generator */
    srand(time(0));

    initialize_monthgraph();
    // mps_init(); //CK no implemented

    // initialize constructions
    initializeModules();

    // animation time
    reset_start_time();
}
