#include "university.h"

#include "modules.h"

// university place:
UniversityConstructionGroup universityConstructionGroup(
    N_("University"),
    TRUE, /* need credit? */
    GROUP_UNIVERSITY,
    GROUP_UNIVERSITY_SIZE,
    GROUP_UNIVERSITY_COLOUR,
    GROUP_UNIVERSITY_COST_MUL,
    GROUP_UNIVERSITY_BUL_COST,
    GROUP_UNIVERSITY_FIREC,
    GROUP_UNIVERSITY_COST,
    GROUP_UNIVERSITY_TECH,
    GROUP_UNIVERSITY_RANGE);

Construction *UniversityConstructionGroup::createConstruction(int x, int y)
{
    return new University(x, y, this);
}

void University::update()
{
    university_cost += UNIVERSITY_RUNNING_COST;
    // do the teaching
    if (commodityCount[STUFF_LABOR] >= UNIVERSITY_LABOR && commodityCount[STUFF_GOODS] >= UNIVERSITY_GOODS && commodityCount[STUFF_WASTE] + UNIVERSITY_GOODS / 3 <= MAX_WASTE_AT_UNIVERSITY)
    {
        consumeStuff(STUFF_LABOR, UNIVERSITY_LABOR);
        consumeStuff(STUFF_GOODS, UNIVERSITY_GOODS);
        produceStuff(STUFF_WASTE, UNIVERSITY_GOODS / 3);
        ++working_days;
        tech_level += UNIVERSITY_TECH_MADE;
        total_tech_made += UNIVERSITY_TECH_MADE;
    }
    // monthly update
    if ((total_time % 100) == 99)
    {
        reset_prod_counters();
        busy = working_days;
        working_days = 0;
    }
}

void University::report()
{
    int i = 0;
    mps_store_sd(i++, constructionGroup->name, ID);
    i++;
    mps_store_sfp(i++, N_("busy"), busy);
    mps_store_sfp(i++, N_("Tech researched"), total_tech_made * 100.0 / MAX_TECH_LEVEL);
    // i++;
    list_commodities(&i);
}
