#include "oremine.h"

#include <list>

#include "lincity/ConstructionManager.h"
#include "lincity/ConstructionRequest.h"
#include "modules.h"

// Oremine:
OremineConstructionGroup oremineConstructionGroup(
    N_("Ore Mine"),
    FALSE, /* need credit? */
    GROUP_OREMINE,
    GROUP_OREMINE_SIZE,
    GROUP_OREMINE_COLOUR,
    GROUP_OREMINE_COST_MUL,
    GROUP_OREMINE_BUL_COST,
    GROUP_OREMINE_FIREC,
    GROUP_OREMINE_COST,
    GROUP_OREMINE_TECH,
    GROUP_OREMINE_RANGE);

Construction *OremineConstructionGroup::createConstruction(int x, int y)
{
    return new Oremine(x, y, this);
}

void Oremine::update()
{
    int xx, yy;
    animate_enable = false;

    // see if we can/need to extract some underground ore
    if ((total_ore_reserve) && (commodityCount[STUFF_ORE] <= ORE_LEVEL_TARGET * (MAX_ORE_AT_MINE - ORE_PER_RESERVE) / 100) && (commodityCount[STUFF_LABOR] >= OREMINE_LABOR))
    {
        for (yy = y; (yy < y + constructionGroup->size); yy++)
        {
            for (xx = x; (xx < x + constructionGroup->size); xx++)
            {
                if (world(xx, yy)->ore_reserve > 0)
                {
                    world(xx, yy)->ore_reserve--;
                    world(xx, yy)->flags |= FLAG_ALTERED;
                    total_ore_reserve--;
                    produceStuff(STUFF_ORE, ORE_PER_RESERVE);
                    consumeStuff(STUFF_LABOR, OREMINE_LABOR);
                    // FIXME ore_tax should be handled upon delivery
                    // ore_made += ORE_PER_RESERVE;
                    if (total_ore_reserve < (constructionGroup->size * constructionGroup->size * ORE_RESERVE))
                    {
                        sust_dig_ore_coal_tip_flag = 0;
                    }
                    animate_enable = true;
                    working_days++;
                    goto end_mining;
                }
            }
        }
    }
    // return the ore to ore_reserve if there is enough sustainable ore available
    else if ((commodityCount[STUFF_ORE] - ORE_PER_RESERVE > ORE_LEVEL_TARGET * (MAX_ORE_AT_MINE) / 100) && (commodityCount[STUFF_LABOR] >= LABOR_DIG_ORE))
    {
        for (yy = y; (yy < y + constructionGroup->size); yy++)
        {
            for (xx = x; (xx < x + constructionGroup->size); xx++)
            {
                if (world(xx, yy)->ore_reserve < (3 * ORE_RESERVE / 2))
                {
                    world(xx, yy)->ore_reserve++;
                    world(xx, yy)->flags |= FLAG_ALTERED;
                    total_ore_reserve++;
                    consumeStuff(STUFF_ORE, ORE_PER_RESERVE);
                    consumeStuff(STUFF_LABOR, OREMINE_LABOR);
                    animate_enable = true;
                    working_days++;
                    goto end_mining;
                }
            }
        }
    }
end_mining:

    // Monthly update of activity
    if (total_time % 100 == 99)
    {
        reset_prod_counters();
        busy = working_days;
        working_days = 0;
    }

    // Evacuate Mine if no more deposits
    if (total_ore_reserve == 0)
    {
        flags |= FLAG_EVACUATE;
    }

    // Abandon the Oremine if it is really empty
    if ((total_ore_reserve == 0) && (commodityCount[STUFF_LABOR] == 0) && (commodityCount[STUFF_ORE] == 0))
    {
        ConstructionManager::submitRequest(new OreMineDeletionRequest(this));
    }
}

void Oremine::animate()
{
    int &frame = frameIt->frame;

    if (animate_enable && real_time >= anim)
    {
        // faster animation for more active mines
        anim = real_time + ANIM_THRESHOLD((14 - busy / 11) * OREMINE_ANIMATION_SPEED);
        if (anim_count < 8)
            frame = anim_count;
        else if (anim_count < 12)
            frame = 14 - anim_count;
        else
            frame = 16 - anim_count;
        if (++anim_count == 16)
            anim_count = 0;
    }
}

void Oremine::report()
{
    int i = 0;
    mps_store_sd(i++, constructionGroup->name, ID);
    mps_store_sfp(i++, N_("busy"), busy);
    mps_store_sddp(i++, N_("Deposits"), total_ore_reserve, (constructionGroup->size * constructionGroup->size * ORE_RESERVE));
    // i++;
    list_commodities(&i);
}