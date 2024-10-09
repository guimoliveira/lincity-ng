#include "waterwell.h"

#include <string>

#include "modules.h"

WaterwellConstructionGroup waterwellConstructionGroup(
    N_("Water tower"),
    FALSE, /* need credit? */
    GROUP_WATERWELL,
    GROUP_WATERWELL_SIZE,
    GROUP_WATERWELL_COLOUR,
    GROUP_WATERWELL_COST_MUL,
    GROUP_WATERWELL_BUL_COST,
    GROUP_WATERWELL_FIREC,
    GROUP_WATERWELL_COST,
    GROUP_WATERWELL_TECH,
    GROUP_WATERWELL_RANGE);

Construction *WaterwellConstructionGroup::createConstruction(int x, int y)
{
    return new Waterwell(x, y, this);
}

void Waterwell::update()
{
    if (commodityCount[STUFF_WATER] + water_output <= MAX_WATER_AT_WATERWELL)
    {
        working_days++;
        produceStuff(STUFF_WATER, water_output);
    }
    // monthly update
    if ((total_time % 100) == 99)
    {
        reset_prod_counters();
        busy = working_days;
        working_days = 0;
    }
}

void Waterwell::report()
{
    int i = 0;

    const char *p;

    mps_store_sd(i++, constructionGroup->name, ID);
    i++;
    mps_store_sddp(i++, N_("Fertility"), ugwCount, constructionGroup->size * constructionGroup->size);
    mps_store_sfp(i++, N_("busy"), busy);
    mps_store_sddp(i++, N_("Air Pollution"), world(x, y)->pollution, MAX_POLLUTION_AT_WATERWELL);
    p = world(x, y)->pollution > MAX_POLLUTION_AT_WATERWELL ? N_("No") : N_("Yes");
    mps_store_ss(i++, N_("Drinkable"), p);
    list_commodities(&i);
}
