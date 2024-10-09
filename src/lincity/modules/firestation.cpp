#include "firestation.h"

#include <list>
#include <vector>

#include "modules.h"

// FireStation:
FireStationConstructionGroup fireStationConstructionGroup(
    N_("Fire Station"),
    FALSE, /* need credit? */
    GROUP_FIRESTATION,
    GROUP_FIRESTATION_SIZE,
    GROUP_FIRESTATION_COLOUR,
    GROUP_FIRESTATION_COST_MUL,
    GROUP_FIRESTATION_BUL_COST,
    GROUP_FIRESTATION_FIREC,
    GROUP_FIRESTATION_COST,
    GROUP_FIRESTATION_TECH,
    GROUP_FIRESTATION_RANGE);

Construction *FireStationConstructionGroup::createConstruction(int x, int y)
{
    return new FireStation(x, y, this);
}

void FireStation::update()
{
    ++daycount;
    if (commodityCount[STUFF_LABOR] >= FIRESTATION_LABOR && commodityCount[STUFF_GOODS] >= FIRESTATION_GOODS && commodityCount[STUFF_WASTE] + (FIRESTATION_GOODS / 3) <= MAX_WASTE_AT_FIRESTATION)
    {
        consumeStuff(STUFF_LABOR, FIRESTATION_LABOR);
        consumeStuff(STUFF_GOODS, FIRESTATION_GOODS);
        produceStuff(STUFF_WASTE, FIRESTATION_GOODS / 3);
        ++covercount;
        ++working_days;
    }
    // monthly update
    if (total_time % 100 == 99)
    {
        reset_prod_counters();
        busy = working_days;
        working_days = 0;
    }
    /* That's all. Cover is done by different functions every 3 months or so. */
    fire_cost += FIRESTATION_RUNNING_COST;
    if (refresh_cover)
    {
        cover();
    }
}

void FireStation::cover()
{
    if (covercount + COVER_TOLERANCE_DAYS < daycount)
    {
        daycount = 0;
        active = false;
        return;
    }
    active = true;
    covercount -= daycount;
    daycount = 0;
    animate_enable = true;
    for (int yy = ys; yy < ye; ++yy)
    {
        for (int xx = xs; xx < xe; ++xx)
        {
            world(xx, yy)->flags |= FLAG_FIRE_COVER;
        }
    }
}

void FireStation::animate()
{
    int &frame = frameIt->frame;
    if (animate_enable && real_time >= anim)
    {
        anim = real_time + ANIM_THRESHOLD(FIRESTATION_ANIMATION_SPEED);
        if (++frame == 6)
            anim = real_time + ANIM_THRESHOLD(11 * FIRESTATION_ANIMATION_SPEED);
        if (frame >= (int)frameIt->resourceGroup->graphicsInfoVector.size())
        {
            frameIt->frame = 0;
            animate_enable = false;
        }
    }
}

void FireStation::report()
{
    int i = 0;
    const char *p;
    mps_store_sd(i++, constructionGroup->name, ID);
    mps_store_sfp(i++, N_("busy"), (float)busy);
    // i++;
    list_commodities(&i);
    p = active ? N_("Yes") : N_("No");
    mps_store_ss(i++, N_("Fire Protection"), p);
}
