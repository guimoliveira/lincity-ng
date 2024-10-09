#include "coal_power.h"

#include <vector>

#include "modules.h"

Coal_powerConstructionGroup coal_powerConstructionGroup(
    N_("Coal Power Station"),
    FALSE, /* need credit? */
    GROUP_COAL_POWER,
    GROUP_COAL_POWER_SIZE,
    GROUP_COAL_POWER_COLOUR,
    GROUP_COAL_POWER_COST_MUL,
    GROUP_COAL_POWER_BUL_COST,
    GROUP_COAL_POWER_FIREC,
    GROUP_COAL_POWER_COST,
    GROUP_COAL_POWER_TECH,
    GROUP_COAL_POWER_RANGE);

Construction *Coal_powerConstructionGroup::createConstruction(int x, int y)
{
    return new Coal_power(x, y, this);
}

void Coal_power::update()
{
    int hivolt_made = (commodityCount[STUFF_HIVOLT] + hivolt_output <= MAX_HIVOLT_AT_COALPS) ? hivolt_output : MAX_HIVOLT_AT_COALPS - commodityCount[STUFF_HIVOLT];
    int labor_used = LABOR_COALPS_GENERATE * (hivolt_made / 100) / (hivolt_output / 100);
    int coal_used = POWERS_COAL_OUTPUT / POWER_PER_COAL * (hivolt_made / 100) / (hivolt_output / 100);
    if ((commodityCount[STUFF_LABOR] >= labor_used) && (commodityCount[STUFF_COAL] >= coal_used) && (hivolt_made >= POWERS_COAL_OUTPUT))
    {
        consumeStuff(STUFF_LABOR, labor_used);
        consumeStuff(STUFF_COAL, coal_used);
        produceStuff(STUFF_HIVOLT, hivolt_made);
        world(x, y)->pollution += POWERS_COAL_POLLUTION * (hivolt_made / 100) / (hivolt_output / 100);
        working_days += (hivolt_made / 100);
    }
    // monthly update
    if (total_time % 100 == 99)
    {
        reset_prod_counters();
        busy = working_days / (hivolt_output / 100);
        working_days = 0;
    }
}

void Coal_power::animate()
{

    if (real_time >= anim)
    {
        anim = real_time + ANIM_THRESHOLD(SMOKE_ANIM_SPEED);
        int active = 9 * busy / 100;
        std::list<ExtraFrame>::iterator frit = fr_begin;
        for (int i = 0; frit != fr_end; std::advance(frit, 1), ++i)
        {
            const int s = frit->resourceGroup->graphicsInfoVector.size();
            if (i >= active || !s)
            {
                frit->frame = -1;
            }
            else if (frit->frame < 0 || rand() % 1600 != 0)
            {
                // always randomize new plumes and sometimes existing ones
                frit->frame = rand() % s;
            }
            else if (++frit->frame >= s)
            {
                frit->frame = 0;
            }
        }
    }

    if (commodityCount[STUFF_COAL] > (MAX_COAL_AT_COALPS * 4 / 5))
    {
        frameIt->resourceGroup = ResourceGroup::resMap["PowerCoalFull"];
    }
    else if (commodityCount[STUFF_COAL] > (MAX_COAL_AT_COALPS / 2))
    {
        frameIt->resourceGroup = ResourceGroup::resMap["PowerCoalMed"];
    }
    else if (commodityCount[STUFF_COAL] > (MAX_COAL_AT_COALPS / 10))
    {
        frameIt->resourceGroup = ResourceGroup::resMap["PowerCoalLow"];
    }
    else
    {
        frameIt->resourceGroup = ResourceGroup::resMap["PowerCoalEmpty"];
    }
    soundGroup = frameIt->resourceGroup;
}

void Coal_power::report()
{
    int i = 0;
    mps_store_sd(i++, constructionGroup->name, ID);
    mps_store_sfp(i++, N_("busy"), busy);
    mps_store_sfp(i++, N_("Tech"), (float)(tech * 100.0) / MAX_TECH_LEVEL);
    mps_store_sd(i++, N_("Output"), hivolt_output);
    // i++;
    list_commodities(&i);
}
