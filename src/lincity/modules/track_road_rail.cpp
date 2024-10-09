#include "track_road_rail.h"

#include <stdlib.h>
#include <vector>

#include "fire.h"
#include "lincity-ng/Sound.hpp"
#include "modules.h"

// Track:
TransportConstructionGroup trackConstructionGroup(
    N_("Track"),
    FALSE, /* need credit? */
    GROUP_TRACK,
    GROUP_TRANSPORT_SIZE,
    GROUP_TRACK_COLOUR,
    GROUP_TRACK_COST_MUL,
    GROUP_TRACK_BUL_COST,
    GROUP_TRACK_FIREC,
    GROUP_TRACK_COST,
    GROUP_TRACK_TECH,
    GROUP_TRANSPORT_RANGE);

// TrackBridge:
TransportConstructionGroup trackbridgeConstructionGroup(
    N_("Track Bridge"),
    FALSE, /* need credit? */
    GROUP_TRACK_BRIDGE,
    GROUP_TRANSPORT_SIZE,
    GROUP_TRACK_BRIDGE_COLOUR,
    GROUP_TRACK_BRIDGE_COST_MUL,
    GROUP_TRACK_BRIDGE_BUL_COST,
    GROUP_TRACK_BRIDGE_FIREC,
    GROUP_TRACK_BRIDGE_COST,
    GROUP_TRACK_BRIDGE_TECH,
    GROUP_TRANSPORT_RANGE);

// Road:
TransportConstructionGroup roadConstructionGroup(
    N_("Road"),
    FALSE, /* need credit? */
    GROUP_ROAD,
    GROUP_TRANSPORT_SIZE,
    GROUP_ROAD_COLOUR,
    GROUP_ROAD_COST_MUL,
    GROUP_ROAD_BUL_COST,
    GROUP_ROAD_FIREC,
    GROUP_ROAD_COST,
    GROUP_ROAD_TECH,
    GROUP_TRANSPORT_RANGE);
// RoadBridge:
TransportConstructionGroup roadbridgeConstructionGroup(
    N_("Road Bridge"),
    FALSE, /* need credit? */
    GROUP_ROAD_BRIDGE,
    GROUP_TRANSPORT_SIZE,
    GROUP_ROAD_BRIDGE_COLOUR,
    GROUP_ROAD_BRIDGE_COST_MUL,
    GROUP_ROAD_BRIDGE_BUL_COST,
    GROUP_ROAD_BRIDGE_FIREC,
    GROUP_ROAD_BRIDGE_COST,
    GROUP_ROAD_BRIDGE_TECH,
    GROUP_TRANSPORT_RANGE);

// Rail:
TransportConstructionGroup railConstructionGroup(
    N_("Rail"),
    FALSE, /* need credit? */
    GROUP_RAIL,
    GROUP_TRANSPORT_SIZE,
    GROUP_RAIL_COLOUR,
    GROUP_RAIL_COST_MUL,
    GROUP_RAIL_BUL_COST,
    GROUP_RAIL_FIREC,
    GROUP_RAIL_COST,
    GROUP_RAIL_TECH,
    GROUP_TRANSPORT_RANGE);
// RailBridge:
TransportConstructionGroup railbridgeConstructionGroup(
    N_("Rail Bridge"),
    FALSE, /* need credit? */
    GROUP_RAIL_BRIDGE,
    GROUP_TRANSPORT_SIZE,
    GROUP_RAIL_BRIDGE_COLOUR,
    GROUP_RAIL_BRIDGE_COST_MUL,
    GROUP_RAIL_BRIDGE_BUL_COST,
    GROUP_RAIL_BRIDGE_FIREC,
    GROUP_RAIL_BRIDGE_COST,
    GROUP_RAIL_BRIDGE_TECH,
    GROUP_TRANSPORT_RANGE);

Construction *TransportConstructionGroup::createConstruction(int x, int y)
{
    return new Transport(x, y, this);
}

void Transport::update()
{
    switch (constructionGroup->group)
    {
    case GROUP_TRACK:
    case GROUP_TRACK_BRIDGE:
        // tracks have no side effects
        break;
    case GROUP_ROAD:
    case GROUP_ROAD_BRIDGE:
        ++transport_cost;
        if (total_time % DAYS_PER_ROAD_POLLUTION == 0)
            world(x, y)->pollution += ROAD_POLLUTION;
        if ((total_time & ROAD_GOODS_USED_MASK) == 0 && commodityCount[STUFF_GOODS] > 0)
        {
            consumeStuff(STUFF_GOODS, 1);
            produceStuff(STUFF_WASTE, 1);
        }
        break;
    case GROUP_RAIL:
    case GROUP_RAIL_BRIDGE:
        transport_cost += 3;
        if (total_time % DAYS_PER_RAIL_POLLUTION == 0)
            world(x, y)->pollution += RAIL_POLLUTION;
        if ((total_time & RAIL_GOODS_USED_MASK) == 0 && commodityCount[STUFF_GOODS] > 0)
        {
            consumeStuff(STUFF_GOODS, 1);
            produceStuff(STUFF_WASTE, 1);
        }
        if ((total_time & RAIL_STEEL_USED_MASK) == 0 && commodityCount[STUFF_STEEL] > 0)
        {
            consumeStuff(STUFF_STEEL, 1);
            produceStuff(STUFF_WASTE, 1);
        }
        break;
    }
    if (commodityCount[STUFF_LOVOLT] >= LOVOLT_LOSS_ON_TRANSPORT)
    {
        consumeStuff(STUFF_LOVOLT, LOVOLT_LOSS_ON_TRANSPORT);
    }
    else if (commodityCount[STUFF_LOVOLT] > 0)
    {
        consumeStuff(STUFF_LOVOLT, 1);
    }

    if (commodityCount[STUFF_WASTE] > 9 * constructionGroup->commodityRuleCount[STUFF_WASTE].maxload / 10)
    {
        consumeStuff(STUFF_WASTE, WASTE_BURN_ON_TRANSPORT);
        world(x, y)->pollution += WASTE_BURN_ON_TRANSPORT_POLLUTE;
        start_burning_waste = true;
    }

    if (total_time % 100 == 99)
    {
        reset_prod_counters();
    }
}

void Transport::animate()
{
    if (start_burning_waste)
    { // start fire
        start_burning_waste = false;
        anim = real_time + ANIM_THRESHOLD(WASTE_BURN_TIME);
    }
    if (real_time >= anim)
    { // stop fire
        waste_fire_frit->frame = -1;
    }
    else if (real_time >= waste_fire_anim)
    { // continue fire
        waste_fire_anim = real_time + ANIM_THRESHOLD(FIRE_ANIMATION_SPEED);
        int num_frames = waste_fire_frit->resourceGroup->graphicsInfoVector.size();
        if (++waste_fire_frit->frame >= num_frames)
            waste_fire_frit->frame = 0;
    }
}

void Transport::list_traffic(int *i)
{
    for (Commodity stuff = STUFF_INIT; stuff < STUFF_COUNT; stuff++)
    {
        if (*i < 14 && constructionGroup->commodityRuleCount[stuff].maxload)
        {
            mps_store_sfp((*i)++, commodityNames[stuff], (float)trafficCount[stuff] * 107.77 * TRANSPORT_RATE / TRANSPORT_QUANTA);
        }
    }
}

void Transport::report()
{
    int i = 0;

    mps_store_sd(i++, constructionGroup->name, subgroupID);
    i++;
    if (mps_map_page == 1)
    {
        mps_store_title(i++, _("Traffic"));
        list_traffic(&i);
    }
    else
    {
        mps_store_title(i++, _("Commodities"));
        list_inventory(&i);
    }
}

void Transport::playSound()
{
    if (soundGroup->sounds_loaded)
    {
        unsigned short g = constructionGroup->group;
        if ((g == GROUP_ROAD) || (g == GROUP_ROAD_BRIDGE))
        {
            int avg = 0;
            int size = 0;
            for (Commodity stuff = STUFF_INIT; stuff < STUFF_COUNT; stuff++)
            {
                if (!constructionGroup->commodityRuleCount[stuff].maxload)
                    continue;
                avg += (trafficCount[stuff] * 107 * TRANSPORT_RATE / TRANSPORT_QUANTA);
                size++;
            }
            if (avg > 0) // equiv to size > 0
            {
                avg /= size;
            }
            int num_sounds = soundGroup->chunks.size() / 2;
            if (avg > 5)
            {
                getSound()->playASound(soundGroup->chunks[rand() % num_sounds]);
            }
            else
            {
                getSound()->playASound(soundGroup->chunks[num_sounds + rand() % num_sounds]);
            }
        }
        else
        {
            int s = soundGroup->chunks.size();
            getSound()->playASound(soundGroup->chunks[rand() % s]);
        }
    }
}

bool Transport::canPlaceVehicle()
{
    if (!world(x, y)->framesptr)
        return false;
    for (ExtraFrame &exfr : *world(x, y)->framesptr)
        if (exfr.resourceGroup->is_vehicle)
            return false;
    return true;
}
