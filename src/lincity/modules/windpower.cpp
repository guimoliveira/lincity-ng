#include "windpower.h"

#include <list>
#include <map>

#include "modules.h"

WindpowerConstructionGroup windpowerConstructionGroup(
    N_("Wind Power"),
    TRUE, /* need credit? */
    GROUP_WIND_POWER,
    GROUP_WIND_POWER_SIZE,
    GROUP_WIND_POWER_COLOUR,
    GROUP_WIND_POWER_COST_MUL,
    GROUP_WIND_POWER_BUL_COST,
    GROUP_WIND_POWER_FIREC,
    GROUP_WIND_POWER_COST,
    GROUP_WIND_POWER_TECH,
    GROUP_WIND_POWER_RANGE);

// WindpowerConstructionGroup windpower_RG_ConstructionGroup = windpowerConstructionGroup;
// WindpowerConstructionGroup windpower_G_ConstructionGroup = windpowerConstructionGroup;

Construction *WindpowerConstructionGroup::createConstruction(int x, int y)
{
    return new Windpower(x, y, this);
}

void Windpower::update()
{
    if (!(total_time % (WIND_POWER_RCOST)))
    {
        windmill_cost++;
    }
    int hivolt_made = (commodityCount[STUFF_HIVOLT] + hivolt_output <= MAX_HIVOLT_AT_WIND_POWER) ? hivolt_output : MAX_HIVOLT_AT_WIND_POWER - commodityCount[STUFF_HIVOLT];
    int labor_used = WIND_POWER_LABOR * hivolt_made / hivolt_output;

    if ((commodityCount[STUFF_LABOR] >= labor_used) && hivolt_made > WIND_POWER_HIVOLT)
    {
        consumeStuff(STUFF_LABOR, labor_used);
        produceStuff(STUFF_HIVOLT, hivolt_made);
        animate_enable = true;
        working_days += hivolt_made;
    }
    else
    {
        animate_enable = false;
    }
    // monthly update
    if (total_time % 100 == 99)
    {
        reset_prod_counters();
        busy = working_days;
        working_days = 0;
    }
}

void Windpower::animate()
{
    if (animate_enable && real_time >= anim)
    {
        anim = real_time + ANIM_THRESHOLD(WIND_POWER_ANIM_SPEED);
        ++frameIt->frame %= 3;
    }

    if (commodityCount[STUFF_HIVOLT] > MAX_HIVOLT_AT_WIND_POWER / 2)
        frameIt->resourceGroup = ResourceGroup::resMap["WindMillHTechG"];
    else if (commodityCount[STUFF_HIVOLT] > MAX_HIVOLT_AT_WIND_POWER / 10)
        frameIt->resourceGroup = ResourceGroup::resMap["WindMillHTechRG"];
    else
        frameIt->resourceGroup = ResourceGroup::resMap["WindMillHTech"];
    soundGroup = frameIt->resourceGroup;
}

void Windpower::report()
{
    int i = 0;
    mps_store_sd(i++, constructionGroup->name, ID);
    mps_store_sfp(i++, N_("busy"), float(busy) / hivolt_output);
    mps_store_sfp(i++, N_("Tech"), (tech * 100.0) / MAX_TECH_LEVEL);
    mps_store_sd(i++, N_("Output"), hivolt_output);
    // i++;
    list_commodities(&i);
}