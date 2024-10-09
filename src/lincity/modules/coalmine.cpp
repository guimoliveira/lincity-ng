#include "coalmine.h"

#include <list>
#include <map>

#include "lincity/ConstructionManager.h"
#include "lincity/ConstructionRequest.h"
#include "modules.h"

// Coalmine:
CoalmineConstructionGroup coalmineConstructionGroup(
    N_("Coal Mine"),
    FALSE, /* need credit? */
    GROUP_COALMINE,
    GROUP_COALMINE_SIZE,
    GROUP_COALMINE_COLOUR,
    GROUP_COALMINE_COST_MUL,
    GROUP_COALMINE_BUL_COST,
    GROUP_COALMINE_FIREC,
    GROUP_COALMINE_COST,
    GROUP_COALMINE_TECH,
    GROUP_COALMINE_RANGE);

Construction *CoalmineConstructionGroup::createConstruction(int x, int y)
{
    return new Coalmine(x, y, this);
}

void Coalmine::update()
{
    bool coal_found = false;
    // scan available coal_reserve in range
    current_coal_reserve = 0;
    for (int yy = ys; yy < ye; yy++)
    {
        for (int xx = xs; xx < xe; xx++)
        {
            current_coal_reserve += world(xx, yy)->coal_reserve;
        }
    }
    // mine some coal
    if ((current_coal_reserve > 0) && (commodityCount[STUFF_COAL] <= TARGET_COAL_LEVEL * (MAX_COAL_AT_MINE - COAL_PER_RESERVE) / 100) && (commodityCount[STUFF_LABOR] >= COALMINE_LABOR))
    {
        for (int yy = ys; (yy < ye) && !coal_found; yy++)
        {
            for (int xx = xs; (xx < xe) && !coal_found; xx++)
            {
                if (world(xx, yy)->coal_reserve > 0)
                {
                    world(xx, yy)->coal_reserve--;
                    world(xx, yy)->pollution += COALMINE_POLLUTION;
                    world(xx, yy)->flags |= FLAG_ALTERED;
                    produceStuff(STUFF_COAL, COAL_PER_RESERVE);
                    consumeStuff(STUFF_LABOR, COALMINE_LABOR);
                    if (current_coal_reserve < initial_coal_reserve)
                    {
                        sust_dig_ore_coal_tip_flag = 0;
                    }
                    coal_found = true;
                    working_days++;
                }
            }
        }
    }
    else if ((commodityCount[STUFF_COAL] - COAL_PER_RESERVE > TARGET_COAL_LEVEL * (MAX_COAL_AT_MINE) / 100) && (commodityCount[STUFF_LABOR] >= COALMINE_LABOR))
    {
        for (int yy = ys; (yy < ye) && !coal_found; yy++)
        {
            for (int xx = xs; (xx < xe) && !coal_found; xx++)
            {
                if (world(xx, yy)->coal_reserve < COAL_RESERVE_SIZE)
                {
                    world(xx, yy)->coal_reserve++;
                    world(xx, yy)->flags |= FLAG_ALTERED;
                    consumeStuff(STUFF_COAL, COAL_PER_RESERVE);
                    consumeStuff(STUFF_LABOR, COALMINE_LABOR);
                    coal_found = true;
                    working_days++;
                }
            }
        }
    }
    // Monthly update of activity
    if (total_time % 100 == 99)
    {
        reset_prod_counters();
        busy = working_days;
        working_days = 0;
    }

    // TODO: This may prevent unmining when reserve gets to 0.
    // Evacuate Mine if no more deposits
    if (current_coal_reserve == 0)
    {
        flags |= FLAG_EVACUATE;
    }

    // Abandon the Coalmine if it is really empty
    if ((current_coal_reserve == 0) && (commodityCount[STUFF_LABOR] == 0) && (commodityCount[STUFF_COAL] == 0))
    {
        ConstructionManager::submitRequest(new ConstructionDeletionRequest(this));
    }
}

void Coalmine::animate()
{
    // choose type depending on availabe coal
    //  TODO: make sure case 'nothing' can actually happen
    if (commodityCount[STUFF_COAL] > MAX_COAL_AT_MINE - (MAX_COAL_AT_MINE / 4)) // 75%
    {
        frameIt->resourceGroup = ResourceGroup::resMap["CoalMineFull"];
    }
    else if (commodityCount[STUFF_COAL] > MAX_COAL_AT_MINE / 2) // 50%
    {
        frameIt->resourceGroup = ResourceGroup::resMap["CoalMineMed"];
    }
    else if (commodityCount[STUFF_COAL] > 0) // something
    {
        frameIt->resourceGroup = ResourceGroup::resMap["CoalMineLow"];
    }
    else // nothing
    {
        frameIt->resourceGroup = ResourceGroup::resMap["CoalMine"];
    }
    soundGroup = frameIt->resourceGroup;
}

void Coalmine::report()
{
    int i = 0;
    mps_store_sd(i++, constructionGroup->name, ID);
    mps_store_sfp(i++, N_("busy"), busy);
    mps_store_sddp(i++, N_("Deposits"), current_coal_reserve, initial_coal_reserve);
    // i++;
    list_commodities(&i);
}