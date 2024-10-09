#ifndef __Vehicles_h__
#define __Vehicles_h__

#include <list>

#include "resources.hpp"

enum Commodity : int;

#define CAR_SPEED 25
#define TRUCK_SPEED 35
#define TRACK_BRIDGE_HEIGHT 22
#define ROAD_BRIDGE_HEIGHT 44

#define FOOD_TRAFFIC_RATE 32768
#define LABOR_TRAFFIC_RATE 4096
#define COAL_TRAFFIC_RATE 49152
#define GOODS_TRAFFIC_RATE 32768
#define ORE_TRAFFIC_RATE 49152
#define STEEL_TRAFFIC_RATE 32768

enum VehicleModel
{
    VEHICLE_BLUECAR,
    VEHICLE_REDCAR,
    VEHICLE_YELLOWCAR,
    VEHICLE_GREENCAR,
    VEHICLE_GRAYCAR,
    VEHICLE_REDTRUCK,
    VEHICLE_GREENTRUCK,
    VEHICLE_WHITETRUCK,
    VEHICLE_YELLOWTRUCK,
    VEHICLE_BLUETRUCK,
    VEHICLE_DEFAULT
};

enum VehicleStrategy
{
    VEHICLE_STRATEGY_MAXIMIZE, // go towards more stuff eg. morning commute for STUFF_LABOR
    VEHICLE_STRATEGY_MINIMIZE, // go towards less stuff eg. evening commute for STUFF_LABOR
    VEHICLE_STRATEGY_RANDOM    // just do a random walk
};

class Vehicle
{
public:
    Vehicle(int x0, int y0, Commodity stuffID, VehicleStrategy vehicleStrategy = VEHICLE_STRATEGY_RANDOM);

    ~Vehicle(void);

    // location, heading and comming from
    int x, xnext, xprev, xold1, xold2;
    int y, ynext, yprev, yold1, yold2;
    float xr, yr;
    int death_counter;
    bool alive, turn_left;
    unsigned int headings;
    int direction;

    VehicleModel model; // different vehicles
    Commodity stuff_id; // cargo
    int initial_cargo;
    VehicleStrategy strategy;                // delivery, pickup, random
    std::list<ExtraFrame>::iterator frameIt; // the particular extraframe at the host
    int map_idx;                             // index of the maptile with the frame, NOT necessarily the current position

    int speed0, speed, anim;
    void update();

    static std::list<Vehicle *> vehicleList;

    static void clearVehicleList(); // kill all vehicles
    static void cleanVehicleList(); // kill vehicles with deathcounter < 0
private:
    void getNewHeadings();            // plan ahead for 2 tiles
    bool acceptable_heading(int idx); // checks if a move would comply with the strategy
    void drive();                     // advance position by 1 tile
    void walk();                      // change the offset of the sprite and evetually choose a tile to attach it to
    void move_frame(int idx);         // place the frame on the map aka *world(idx)
};

#endif
