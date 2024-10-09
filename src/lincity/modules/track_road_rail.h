#include <assert.h>
#include <array>
#include <iostream>
#include <list>
#include <map>
#include <string>

#include "lincity/transport.h"
#include "modules.h"

#ifdef DEBUG
#include <SDL.h>
#include <stddef.h>
#endif

class TransportConstructionGroup : public ConstructionGroup
{
public:
    TransportConstructionGroup(
        const char *name,
        unsigned short no_credit,
        unsigned short group,
        unsigned short size, int colour,
        int cost_mul, int bul_cost, int fire_chance,
        int cost, int tech, int range) : ConstructionGroup(name, no_credit, group, size, colour, cost_mul, bul_cost, fire_chance,
                                                           cost, tech, range, 2 /*mps_pages*/
                                         )
    {
        switch (group)
        {
        case GROUP_TRACK:
        case GROUP_TRACK_BRIDGE:
            commodityRuleCount[STUFF_FOOD].maxload = MAX_FOOD_ON_TRACK;
            commodityRuleCount[STUFF_LABOR].maxload = MAX_LABOR_ON_TRACK;
            commodityRuleCount[STUFF_COAL].maxload = MAX_COAL_ON_TRACK;
            commodityRuleCount[STUFF_GOODS].maxload = MAX_GOODS_ON_TRACK;
            commodityRuleCount[STUFF_ORE].maxload = MAX_ORE_ON_TRACK;
            commodityRuleCount[STUFF_STEEL].maxload = MAX_STEEL_ON_TRACK;
            commodityRuleCount[STUFF_WASTE].maxload = MAX_WASTE_ON_TRACK;
            commodityRuleCount[STUFF_LOVOLT].maxload = MAX_LOVOLT_ON_TRACK;
            commodityRuleCount[STUFF_WATER].maxload = MAX_WATER_ON_TRACK;
            break;
        case GROUP_ROAD:
        case GROUP_ROAD_BRIDGE:
            commodityRuleCount[STUFF_FOOD].maxload = MAX_FOOD_ON_ROAD;
            commodityRuleCount[STUFF_LABOR].maxload = MAX_LABOR_ON_ROAD;
            commodityRuleCount[STUFF_COAL].maxload = MAX_COAL_ON_ROAD;
            commodityRuleCount[STUFF_GOODS].maxload = MAX_GOODS_ON_ROAD;
            commodityRuleCount[STUFF_ORE].maxload = MAX_ORE_ON_ROAD;
            commodityRuleCount[STUFF_STEEL].maxload = MAX_STEEL_ON_ROAD;
            commodityRuleCount[STUFF_WASTE].maxload = MAX_WASTE_ON_ROAD;
            commodityRuleCount[STUFF_LOVOLT].maxload = MAX_LOVOLT_ON_ROAD;
            commodityRuleCount[STUFF_WATER].maxload = MAX_WATER_ON_ROAD;
            break;
        case GROUP_RAIL:
        case GROUP_RAIL_BRIDGE:
            commodityRuleCount[STUFF_FOOD].maxload = MAX_FOOD_ON_RAIL;
            commodityRuleCount[STUFF_LABOR].maxload = MAX_LABOR_ON_RAIL;
            commodityRuleCount[STUFF_COAL].maxload = MAX_COAL_ON_RAIL;
            commodityRuleCount[STUFF_GOODS].maxload = MAX_GOODS_ON_RAIL;
            commodityRuleCount[STUFF_ORE].maxload = MAX_ORE_ON_RAIL;
            commodityRuleCount[STUFF_STEEL].maxload = MAX_STEEL_ON_RAIL;
            commodityRuleCount[STUFF_WASTE].maxload = MAX_WASTE_ON_RAIL;
            commodityRuleCount[STUFF_LOVOLT].maxload = MAX_LOVOLT_ON_RAIL;
            commodityRuleCount[STUFF_WATER].maxload = MAX_WATER_ON_RAIL;
            break;
        } // end switch group
        commodityRuleCount[STUFF_FOOD].take = true;
        commodityRuleCount[STUFF_FOOD].give = true;
        commodityRuleCount[STUFF_LABOR].take = true;
        commodityRuleCount[STUFF_LABOR].give = true;
        commodityRuleCount[STUFF_COAL].take = true;
        commodityRuleCount[STUFF_COAL].give = true;
        commodityRuleCount[STUFF_GOODS].take = true;
        commodityRuleCount[STUFF_GOODS].give = true;
        commodityRuleCount[STUFF_ORE].take = true;
        commodityRuleCount[STUFF_ORE].give = true;
        commodityRuleCount[STUFF_STEEL].take = true;
        commodityRuleCount[STUFF_STEEL].give = true;
        commodityRuleCount[STUFF_WASTE].take = true;
        commodityRuleCount[STUFF_WASTE].give = true;
        commodityRuleCount[STUFF_LOVOLT].take = true;
        commodityRuleCount[STUFF_LOVOLT].give = true;
        commodityRuleCount[STUFF_WATER].take = true;
        commodityRuleCount[STUFF_WATER].give = true;
    }
    // overriding method that creates a transport tile
    virtual Construction *createConstruction(int x, int y);
};

extern TransportConstructionGroup trackConstructionGroup, roadConstructionGroup, railConstructionGroup;
extern TransportConstructionGroup trackbridgeConstructionGroup, roadbridgeConstructionGroup, railbridgeConstructionGroup;

// Dummies for counting SubTypes of Transport
class Track
{
};
class Road
{
};
class Rail
{
};
class TrackBridge
{
};
class RoadBridge
{
};
class RailBridge
{
};

class Transport : public RegisteredConstruction<Transport>
{ // Transport inherits from countedConstruction
public:
    Transport(int x, int y, ConstructionGroup *cstgrp) : RegisteredConstruction<Transport>(x, y)
    {
        unsigned short group = cstgrp->group;
        this->anim = 0;
        this->start_burning_waste = false;
        this->waste_fire_anim = 0;
        // register the construction as transport tile
        // disable evacuation
        // transparency is set and updated in connect_transport
        this->flags |= (FLAG_IS_TRANSPORT | FLAG_NEVER_EVACUATE);
#ifdef DEBUG
        const Uint8 *keystate = SDL_GetKeyboardState(NULL);
        if (world(x, y)->is_water() || keystate[SDL_SCANCODE_LSHIFT] || keystate[SDL_SCANCODE_RSHIFT]) // we build bridges on water
#else
        if (world(x, y)->is_water())
#endif
        {
            switch (group)
            {
            case GROUP_TRACK:
                group = GROUP_TRACK_BRIDGE;
                break;
            case GROUP_ROAD:
                group = GROUP_ROAD_BRIDGE;
                break;
            case GROUP_RAIL:
                group = GROUP_RAIL_BRIDGE;
                break;
            }
        }
        else // we dont build bridges anywhere else
        {
            switch (group)
            {
            case GROUP_TRACK_BRIDGE:
                group = GROUP_TRACK;
                break;
            case GROUP_ROAD_BRIDGE:
                group = GROUP_ROAD;
                break;
            case GROUP_RAIL_BRIDGE:
                group = GROUP_RAIL;
                break;
            }
        }

        switch (group) // here we build according to terrain
        {
        case GROUP_TRACK:
            constructionGroup = &trackConstructionGroup;
            countedTrack = new Counted<Track>();
            this->subgroupID = countedTrack->getNextId();
            break;
        case GROUP_TRACK_BRIDGE:
            constructionGroup = &trackbridgeConstructionGroup;
            countedTrackBridge = new Counted<TrackBridge>();
            this->subgroupID = countedTrackBridge->getNextId();
            break;
        case GROUP_ROAD:
            constructionGroup = &roadConstructionGroup;
            countedRoad = new Counted<Road>();
            this->subgroupID = countedRoad->getNextId();
            break;
        case GROUP_ROAD_BRIDGE:
            constructionGroup = &roadbridgeConstructionGroup;
            countedRoadBridge = new Counted<RoadBridge>();
            this->subgroupID = countedRoadBridge->getNextId();
            break;
        case GROUP_RAIL:
            constructionGroup = &railConstructionGroup;
            countedRail = new Counted<Rail>();
            this->subgroupID = countedRail->getNextId();
            break;
        case GROUP_RAIL_BRIDGE:
            constructionGroup = &railbridgeConstructionGroup;
            countedRailBridge = new Counted<RailBridge>();
            this->subgroupID = countedRailBridge->getNextId();
            break;
        default:
            std::cout << "invalid transport group,x,y "
                      << ", " << group << ", "
                      << x << ", " << y << ", " << std::endl;
            assert(false);
        }
        init_resources();
        waste_fire_frit = world(x, y)->createframe();
        waste_fire_frit->resourceGroup = ResourceGroup::resMap["Fire"];
        waste_fire_frit->move_x = 0;
        waste_fire_frit->move_y = 0;
        waste_fire_frit->frame = -1;

        initialize_commodities();
        this->trafficCount = this->commodityCount;

        switch (constructionGroup->group)
        {
        case GROUP_ROAD:
        case GROUP_ROAD_BRIDGE:
            commodityMaxCons[STUFF_GOODS] =
                (100 - 1) / (ROAD_GOODS_USED_MASK + 1) + 1;
            commodityMaxProd[STUFF_WASTE] =
                (100 - 1) / (ROAD_GOODS_USED_MASK + 1) + 1;
            break;
        case GROUP_RAIL:
        case GROUP_RAIL_BRIDGE:
            commodityMaxCons[STUFF_GOODS] =
                (100 - 1) / (RAIL_GOODS_USED_MASK + 1) + 1;
            commodityMaxCons[STUFF_STEEL] =
                (100 - 1) / (RAIL_STEEL_USED_MASK + 1) + 1;
            commodityMaxProd[STUFF_WASTE] =
                (100 - 1) / (RAIL_GOODS_USED_MASK + 1) + 1 +
                (100 - 1) / (RAIL_STEEL_USED_MASK + 1) + 1;
            break;
        }
        commodityMaxCons[STUFF_LOVOLT] = 100 * LOVOLT_LOSS_ON_TRANSPORT;
        commodityMaxCons[STUFF_WASTE] = 100 * WASTE_BURN_ON_TRANSPORT;
    }
    ~Transport()
    {
        switch (constructionGroup->group)
        {
        case GROUP_TRACK:
            delete countedTrack;
            break;
        case GROUP_TRACK_BRIDGE:
            delete countedTrackBridge;
            break;
        case GROUP_ROAD:
            delete countedRoad;
            break;
        case GROUP_ROAD_BRIDGE:
            delete countedRoadBridge;
            break;
        case GROUP_RAIL:
            delete countedRail;
            break;
        case GROUP_RAIL_BRIDGE:
            delete countedRailBridge;
            break;
        default:
            std::cout << "counting error in Transport IDs" << std::endl;
            break;
        }

        world(x, y)->killframe(waste_fire_frit);
    }
    Counted<Track> *countedTrack;
    Counted<Road> *countedRoad;
    Counted<Rail> *countedRail;
    Counted<TrackBridge> *countedTrackBridge;
    Counted<RoadBridge> *countedRoadBridge;
    Counted<RailBridge> *countedRailBridge;
    virtual void update() override;
    virtual void report() override;
    virtual void animate() override;
    virtual void playSound(); // override random sound
    virtual bool canPlaceVehicle();
    std::array<int, STUFF_COUNT> trafficCount;
    void list_traffic(int *i);
    int subgroupID;
    int anim;
    bool start_burning_waste;
    std::list<ExtraFrame>::iterator waste_fire_frit;
    int waste_fire_anim;
};
