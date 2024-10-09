#include "rocket_pad.h"

#include <stdlib.h>
#include <list>
#include <vector>

#include "modules.h"
#include "gui_interface/pbar_interface.h"
#include "lincity-ng/Dialog.hpp"
#include "lincity-ng/Sound.hpp"
#include "lincity/ConstructionCount.h"
#include "residence.h"

RocketPadConstructionGroup rocketPadConstructionGroup(
    N_("Rocket Pad"),
    TRUE, /* need credit? */
    GROUP_ROCKET,
    GROUP_ROCKET_SIZE,
    GROUP_ROCKET_COLOUR,
    GROUP_ROCKET_COST_MUL,
    GROUP_ROCKET_BUL_COST,
    GROUP_ROCKET_FIREC,
    GROUP_ROCKET_COST,
    GROUP_ROCKET_TECH,
    GROUP_ROCKET_RANGE);

Construction *RocketPadConstructionGroup::createConstruction(int x, int y)
{
    return new RocketPad(x, y, this);
}

extern void ok_dial_box(const char *, int, const char *);

void RocketPad::update()
{
    int last_frame = (int)frameIt->resourceGroup->graphicsInfoVector.size() - 1;
    // ok the party is over
    if (frameIt->frame == last_frame)
    {
        return;
    }
    rocket_pad_cost += ROCKET_PAD_RUNNING_COST;
    // store as much as possible or needed
    while (
        (frameIt->frame < 4) && (commodityCount[STUFF_LABOR] >= ROCKET_PAD_LABOR) && (commodityCount[STUFF_GOODS] >= ROCKET_PAD_GOODS) && (commodityCount[STUFF_STEEL] >= ROCKET_PAD_STEEL) && (commodityCount[STUFF_WASTE] + (ROCKET_PAD_GOODS / 3) <= MAX_WASTE_AT_ROCKET_PAD) && (labor_stored < ROCKET_PAD_LABOR_STORE) && (goods_stored < ROCKET_PAD_GOODS_STORE) && (steel_stored < ROCKET_PAD_STEEL_STORE) && (completion < 100))
    {
        consumeStuff(STUFF_LABOR, ROCKET_PAD_LABOR);
        labor_stored += ROCKET_PAD_LABOR;
        consumeStuff(STUFF_GOODS, ROCKET_PAD_GOODS);
        goods_stored += ROCKET_PAD_GOODS;
        consumeStuff(STUFF_STEEL, ROCKET_PAD_STEEL);
        steel_stored += ROCKET_PAD_STEEL;
        produceStuff(STUFF_WASTE, ROCKET_PAD_GOODS / 3);
        step += 2;
        working_days++;
    }

    // see if we can build another % of Rocket
    if ((completion < 100) && (labor_stored >= ROCKET_PAD_LABOR_STORE) && (goods_stored >= ROCKET_PAD_GOODS_STORE) && (steel_stored >= ROCKET_PAD_STEEL_STORE))
    {
        labor_stored -= ROCKET_PAD_LABOR_STORE;
        goods_stored -= ROCKET_PAD_GOODS_STORE;
        steel_stored -= ROCKET_PAD_STEEL_STORE;
        completion++;
        step = 0;
    }
    // monthly update
    if (total_time % 100 == 99)
    {
        reset_prod_counters();
        busy = working_days;
        working_days = 0;
    }

    /* animate and return */
    if (frameIt->frame >= 5 && completion >= (100 * ROCKET_PAD_LAUNCH) / 100)
    {
        if (real_time >= anim)
        {
            anim = real_time + ROCKET_ANIMATION_SPEED;
            frameIt->frame++;
            if (frameIt->frame > last_frame)
            {
                frameIt->frame = 5;
            }
            else if (frameIt->frame == last_frame)
            {
                compute_launch_result();
            }
        }
        return;
    }

    // Choose a Graphic and invoke Lauch Dialogue depening on completion
    if (completion < (25 * ROCKET_PAD_LAUNCH) / 100)
    {
        frameIt->frame = 0;
    }
    else if (completion < (60 * ROCKET_PAD_LAUNCH) / 100)
    {
        frameIt->frame = 1;
    }
    else if (completion < (90 * ROCKET_PAD_LAUNCH) / 100)
    {
        frameIt->frame = 2;
    }
    else if (completion < (100 * ROCKET_PAD_LAUNCH) / 100)
    {
        frameIt->frame = 3;
    }
    else if (completion >= (100 * ROCKET_PAD_LAUNCH) / 100)
    {
        frameIt->frame = 4;
        // OK Button will launch rocket remotely
        if (!(flags & FLAG_ROCKET_READY))
        {
            new Dialog(ASK_LAUNCH_ROCKET, x, y);
        }
        flags |= FLAG_ROCKET_READY;
    }
}

void RocketPad::launch_rocket()
{
    frameIt->frame = 5;
    busy = 0;
}

void RocketPad::compute_launch_result()
{
    int i, r, xx, yy, xxx, yyy;
    rockets_launched++;
    /* The first five failures gives 49.419 % chances of 5 success
     * TODO: some stress could be added by 3,2,1,0 and animation of rocket with sound...
     */
    r = rand() % MAX_TECH_LEVEL;
    if (r > tech_level || rand() % 100 > (rockets_launched * 15 + 25))
    {
        /* the launch failed */
        // display_rocket_result_dialog(ROCKET_LAUNCH_BAD);
        getSound()->playSound("RocketExplosion");
        ok_dial_box("launch-fail.mes", BAD, 0L);
        rockets_launched_success = 0;
        xx = ((rand() % 40) - 20) + x;
        yy = ((rand() % 40) - 20) + y;
        for (i = 0; i < 20; i++)
        {
            xxx = ((rand() % 20) - 10) + xx;
            yyy = ((rand() % 20) - 10) + yy;
            if (xxx > 0 && xxx < (world.len() - 1) && yyy > 0 && yyy < (world.len() - 1))
            {
                /* don't crash on it's own area */
                if (xxx >= x && xxx < (x + constructionGroup->size) && yyy >= y && yyy < (y + constructionGroup->size))
                {
                    continue;
                }
                fire_area(xxx, yyy);
                /* make a sound perhaps */
            }
        }
    }
    else
    {
        getSound()->playSound("RocketTakeoff");
        rockets_launched_success++;
        /* TODO: Maybe should generate some pollution ? */
        if (rockets_launched_success > 5)
        {
            remove_people(1000);
            if (people_pool || housed_population)
            {
                // display_rocket_result_dialog(ROCKET_LAUNCH_EVAC);
                ok_dial_box("launch-evac.mes", GOOD, 0L);
            }
        }
        else
        {
            // display_rocket_result_dialog(ROCKET_LAUNCH_GOOD);
            ok_dial_box("launch-good.mes", GOOD, 0L);
        }
    }
}

void RocketPad::remove_people(int num)
{
    {
        int ppl = (num < people_pool) ? num : people_pool;
        num -= ppl;
        people_pool -= ppl;
        total_evacuated += ppl;
    }
    /* reset housed population so that we can display it correctly */
    housed_population = 1;
    while (housed_population && (num > 0))
    {
        housed_population = 0;
        for (int i = 0; i < constructionCount.size(); i++)
        {
            if (constructionCount[i])
            {
                unsigned short grp = constructionCount[i]->constructionGroup->group;
                if ((grp == GROUP_RESIDENCE_LL) || (grp == GROUP_RESIDENCE_ML) || (grp == GROUP_RESIDENCE_HL) || (grp == GROUP_RESIDENCE_LH) || (grp == GROUP_RESIDENCE_MH) || (grp == GROUP_RESIDENCE_HH))
                {
                    Residence *residence = static_cast<Residence *>(constructionCount[i]);
                    if (residence->local_population)
                    {
                        residence->local_population--;
                        housed_population += residence->local_population;
                        num--;
                        total_evacuated++;
                    }
                }
            }
        }
    }
    update_pbar(PPOP, housed_population + people_pool, 0);
    if (!housed_population && !people_pool)
    {
        ok_dial_box("launch-gone.mes", GOOD, 0L);
    }
}

void RocketPad::report()
{
    int i = 0;
    mps_store_sd(i++, constructionGroup->getName(), ID);
    mps_store_sfp(i++, N_("busy"), (busy));
    mps_store_sfp(i++, N_("Tech"), (tech * 100.0) / MAX_TECH_LEVEL);
    mps_store_sfp(i++, N_("Overall Progress"), completion);
    mps_store_sfp(i++, N_("Next Step"), step);
    // i++;
    list_commodities(&i);
}
