#include "power_line.h"

#include <list>
#include <string>

#include "modules.h"

// Power line
PowerlineConstructionGroup powerlineConstructionGroup(
    N_("Power line"),
    FALSE, /* need credit? */
    GROUP_POWER_LINE,
    GROUP_POWER_LINE_SIZE,
    GROUP_POWER_LINE_COLOUR,
    GROUP_POWER_LINE_COST_MUL,
    GROUP_POWER_LINE_BUL_COST,
    GROUP_POWER_LINE_FIREC,
    GROUP_POWER_LINE_COST,
    GROUP_POWER_LINE_TECH,
    GROUP_POWER_LINE_RANGE);

Construction *PowerlineConstructionGroup::createConstruction(int x, int y)
{
    return new Powerline(x, y, this);
}

void Powerline::update()
{
    if (commodityCount[STUFF_HIVOLT] > 0)
    {
        consumeStuff(STUFF_HIVOLT, 1); // loss on powerline
    }

    if (total_time % 100 == 99)
    {
        reset_prod_counters();
    }
}

void Powerline::animate()
{
    switch (anim_counter)
    {
    case POWER_MODULUS - 2:
        if (!(frameIt->frame >= 11))
            break;
        flashing = false;
        frameIt->frame -= 11;
        break;
    case POWER_MODULUS:
        if (!(frameIt->frame < 11))
            break;
        flashing = true;
        frameIt->frame += 11;
        break;
    }
    if (anim_counter > 0 && real_time >= anim)
    {
        anim = real_time + ANIM_THRESHOLD(POWER_LINE_FLASH_SPEED);
        --anim_counter;
    }
}

void Powerline::report()
{
    int i = 0;

    mps_store_sd(i++, constructionGroup->name, ID);
    mps_store_sfp(i++, N_("usage"), trafficCount[STUFF_HIVOLT] * 107.77 * TRANSPORT_RATE / TRANSPORT_QUANTA);
    // i++;
    list_commodities(&i);
}
