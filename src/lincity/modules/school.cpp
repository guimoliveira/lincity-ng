#include "school.h"

#include "modules.h"

// school place:
SchoolConstructionGroup schoolConstructionGroup(
    N_("Elementary School"),
    FALSE, /* need credit? */
    GROUP_SCHOOL,
    GROUP_SCHOOL_SIZE,
    GROUP_SCHOOL_COLOUR,
    GROUP_SCHOOL_COST_MUL,
    GROUP_SCHOOL_BUL_COST,
    GROUP_SCHOOL_FIREC,
    GROUP_SCHOOL_COST,
    GROUP_SCHOOL_TECH,
    GROUP_SCHOOL_RANGE);

Construction *SchoolConstructionGroup::createConstruction(int x, int y)
{
    return new School(x, y, this);
}

void School::update()
{
    if (commodityCount[STUFF_LABOR] >= LABOR_MAKE_TECH_SCHOOL && commodityCount[STUFF_GOODS] >= GOODS_MAKE_TECH_SCHOOL && commodityCount[STUFF_WASTE] + GOODS_MAKE_TECH_SCHOOL / 3 <= MAX_WASTE_AT_SCHOOL)
    {
        consumeStuff(STUFF_LABOR, LABOR_MAKE_TECH_SCHOOL);
        consumeStuff(STUFF_GOODS, GOODS_MAKE_TECH_SCHOOL);
        produceStuff(STUFF_WASTE, GOODS_MAKE_TECH_SCHOOL / 3);
        ++working_days;
        tech_level += TECH_MADE_BY_SCHOOL;
        total_tech_made += TECH_MADE_BY_SCHOOL;
    }
    if ((total_time % 100) == 0)
    {
        reset_prod_counters();
        busy = working_days;
        working_days = 0;
    }
    school_cost += SCHOOL_RUNNING_COST;
}

void School::animate()
{
    if (real_time >= anim)
    {
        anim = real_time + SCHOOL_ANIMATION_SPEED;
        int &frame = frameIt->frame;
        int &swing = frit->frame;
        if (frame)
        {
            if (++swing >= 10)
            {
                // Do not include last swing frame because it is same as first.
                // anim = real_time + SCHOOL_ANIMATION_BREAK - 100 * busy;
                swing = 0;
            }

            // stop the swing in position 0, 5, or 10
            if ((swing == 0 || swing == 5) && (real_time >= anim2 || busy == 0))
            {
                anim = real_time + SCHOOL_ANIMATION_BREAK - 100 * busy;
                frame = 0;
                swing = -1;
            }
        }
        else if (busy >= 20)
        {
            frame = 1;
            swing = 0;
            anim2 = real_time + 100 * busy;
        }
    }
}

void School::report()
{
    int i = 0;
    mps_store_sd(i++, constructionGroup->name, ID);
    i++;
    mps_store_sfp(i++, N_("busy"), (float)busy);
    mps_store_sfp(i++, N_("Lessons learned"), total_tech_made * 100.0 / MAX_TECH_LEVEL);
    // i++;
    list_commodities(&i);
}
