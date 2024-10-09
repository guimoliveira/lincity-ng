
#include "monument.h"

#include <list>
#include <map>

#include "modules.h"

extern int mps_x, mps_y;

MonumentConstructionGroup monumentConstructionGroup(
    N_("Monument"),
    FALSE, /* need credit? */
    GROUP_MONUMENT,
    GROUP_MONUMENT_SIZE,
    GROUP_MONUMENT_COLOUR,
    GROUP_MONUMENT_COST_MUL,
    GROUP_MONUMENT_BUL_COST,
    GROUP_MONUMENT_FIREC,
    GROUP_MONUMENT_COST,
    GROUP_MONUMENT_TECH,
    GROUP_MONUMENT_RANGE);

// MonumentConstructionGroup monumentFinishedConstructionGroup = monumentConstructionGroup;

Construction *MonumentConstructionGroup::createConstruction(int x, int y)
{
    return new Monument(x, y, this);
}

void Monument::update()
{
    if ((commodityCount[STUFF_LABOR] > MONUMENT_GET_LABOR) && (completion < 100))
    {
        consumeStuff(STUFF_LABOR, MONUMENT_GET_LABOR);
        labor_consumed += MONUMENT_GET_LABOR;
        completion = labor_consumed * 100 / BUILD_MONUMENT_LABOR;
        ++working_days;
    }
    else if (completion >= 100)
    {
        if (!completed)
        {
            completed = true;
            flags |= (FLAG_EVACUATE | FLAG_NEVER_EVACUATE);
            if (mps_x == x && mps_y == y)
            {
                mps_set(x, y, MPS_MAP);
            }
            // don't clear commodiyCount for savegame compatability
        }
        /* inc tech level only if fully built and tech less
           than MONUMENT_TECH_EXPIRE */
        if (tech_level < (MONUMENT_TECH_EXPIRE * 1000) && (total_time % MONUMENT_DAYS_PER_TECH) == 1)
        {
            tail_off++;
            if (tail_off > (tech_level / 10000) - 2)
            {
                tech_level++;
                tech_made++;
                tail_off = 0;
            }
        }
    }
    // monthly update
    if (total_time % 100 == 99)
    {
        reset_prod_counters();
        busy = working_days;
        working_days = 0;
        if (commodityCount[STUFF_LABOR] == 0 && completed)
        {
            deneighborize();
        }
    }
}

void Monument::animate()
{
    int &frame = frameIt->frame;
    if (completed)
    {
        frame = 0;
        frameIt->resourceGroup = ResourceGroup::resMap["Monument"];
        soundGroup = frameIt->resourceGroup;
    }
    else
        frame = completion / 20;
}

void Monument::report()
{
    int i = 0;

    mps_store_sd(i++, constructionGroup->name, ID);
    i++;
    /* Display tech contribution only after monument is complete */
    if (completion >= 100)
    {
        i++;
        mps_store_sfp(i++, N_("Wisdom bestowed"), tech_made * 100.0 / MAX_TECH_LEVEL);
    }
    else
    {
        mps_store_sfp(i++, N_("busy"), (float)busy);
        // i++;
        list_commodities(&i);
        i++;
        mps_store_sfp(i++, N_("Completion"), completion);
    }
}
