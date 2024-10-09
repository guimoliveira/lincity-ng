#include "health_centre.h"

#include "modules.h"

// Health Centre:
HealthCentreConstructionGroup healthCentreConstructionGroup(
    N_("Health Centre"),
    FALSE, /* need credit? */
    GROUP_HEALTH,
    GROUP_HEALTH_SIZE,
    GROUP_HEALTH_COLOUR,
    GROUP_HEALTH_COST_MUL,
    GROUP_HEALTH_BUL_COST,
    GROUP_HEALTH_FIREC,
    GROUP_HEALTH_COST,
    GROUP_HEALTH_TECH,
    GROUP_HEALTH_RANGE);

Construction *HealthCentreConstructionGroup::createConstruction(int x, int y)
{
    return new HealthCentre(x, y, this);
}

void HealthCentre::update()
{
    ++daycount;
    if (commodityCount[STUFF_LABOR] >= HEALTH_CENTRE_LABOR && commodityCount[STUFF_GOODS] >= HEALTH_CENTRE_GOODS && commodityCount[STUFF_WASTE] + (HEALTH_CENTRE_GOODS / 3) <= MAX_WASTE_AT_HEALTH_CENTRE)
    {
        consumeStuff(STUFF_LABOR, HEALTH_CENTRE_LABOR);
        consumeStuff(STUFF_GOODS, HEALTH_CENTRE_GOODS);
        produceStuff(STUFF_WASTE, HEALTH_CENTRE_GOODS / 3);
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
    // TODO implement animation once graphics exist
    /* That's all. Cover is done by different functions every 3 months or so. */
    health_cost += HEALTH_RUNNING_COST;
    if (refresh_cover)
    {
        cover();
    }
}

void HealthCentre::cover()
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
    for (int yy = ys; yy < ye; ++yy)
    {
        for (int xx = xs; xx < xe; ++xx)
        {
            world(xx, yy)->flags |= FLAG_HEALTH_COVER;
        }
    }
}

void HealthCentre::report()
{
    int i = 0;
    const char *p;

    mps_store_sd(i++, constructionGroup->name, ID);
    mps_store_sfp(i++, N_("busy"), (float)busy);
    // i++;
    list_commodities(&i);
    p = active ? _("Yes") : _("No");
    mps_store_ss(i++, N_("Health Care"), p);
}