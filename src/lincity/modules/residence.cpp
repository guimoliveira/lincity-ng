#include "residence.h"

#include <stdlib.h>

#include "modules.h"

ResidenceConstructionGroup residenceLLConstructionGroup(
    N_("Residence"),
    FALSE, /* need credit? */
    GROUP_RESIDENCE_LL,
    GROUP_RESIDENCE_SIZE,
    GROUP_RESIDENCE_LL_COLOUR,
    GROUP_RESIDENCE_LL_COST_MUL,
    GROUP_RESIDENCE_LL_BUL_COST,
    GROUP_RESIDENCE_LL_FIREC,
    GROUP_RESIDENCE_LL_COST,
    GROUP_RESIDENCE_LL_TECH,
    GROUP_RESIDENCE_RANGE);

ResidenceConstructionGroup residenceMLConstructionGroup(
    N_("Residence"),
    FALSE, /* need credit? */
    GROUP_RESIDENCE_ML,
    GROUP_RESIDENCE_SIZE,
    GROUP_RESIDENCE_ML_COLOUR,
    GROUP_RESIDENCE_ML_COST_MUL,
    GROUP_RESIDENCE_ML_BUL_COST,
    GROUP_RESIDENCE_ML_FIREC,
    GROUP_RESIDENCE_ML_COST,
    GROUP_RESIDENCE_ML_TECH,
    GROUP_RESIDENCE_RANGE);

ResidenceConstructionGroup residenceHLConstructionGroup(
    N_("Residence"),
    FALSE, /* need credit? */
    GROUP_RESIDENCE_HL,
    GROUP_RESIDENCE_SIZE,
    GROUP_RESIDENCE_HL_COLOUR,
    GROUP_RESIDENCE_HL_COST_MUL,
    GROUP_RESIDENCE_HL_BUL_COST,
    GROUP_RESIDENCE_HL_FIREC,
    GROUP_RESIDENCE_HL_COST,
    GROUP_RESIDENCE_HL_TECH,
    GROUP_RESIDENCE_RANGE);

ResidenceConstructionGroup residenceLHConstructionGroup(
    N_("Residence"),
    FALSE, /* need credit? */
    GROUP_RESIDENCE_LH,
    GROUP_RESIDENCE_SIZE,
    GROUP_RESIDENCE_LH_COLOUR,
    GROUP_RESIDENCE_LH_COST_MUL,
    GROUP_RESIDENCE_LH_BUL_COST,
    GROUP_RESIDENCE_LH_FIREC,
    GROUP_RESIDENCE_LH_COST,
    GROUP_RESIDENCE_LH_TECH,
    GROUP_RESIDENCE_RANGE);

ResidenceConstructionGroup residenceMHConstructionGroup(
    N_("Residence"),
    FALSE, /* need credit? */
    GROUP_RESIDENCE_MH,
    GROUP_RESIDENCE_SIZE,
    GROUP_RESIDENCE_MH_COLOUR,
    GROUP_RESIDENCE_MH_COST_MUL,
    GROUP_RESIDENCE_MH_BUL_COST,
    GROUP_RESIDENCE_MH_FIREC,
    GROUP_RESIDENCE_MH_COST,
    GROUP_RESIDENCE_MH_TECH,
    GROUP_RESIDENCE_RANGE);

ResidenceConstructionGroup residenceHHConstructionGroup(
    N_("Residence"),
    FALSE, /* need credit? */
    GROUP_RESIDENCE_HH,
    GROUP_RESIDENCE_SIZE,
    GROUP_RESIDENCE_HH_COLOUR,
    GROUP_RESIDENCE_HH_COST_MUL,
    GROUP_RESIDENCE_HH_BUL_COST,
    GROUP_RESIDENCE_HH_FIREC,
    GROUP_RESIDENCE_HH_COST,
    GROUP_RESIDENCE_HH_TECH,
    GROUP_RESIDENCE_RANGE);

Construction *ResidenceConstructionGroup::createConstruction(int x, int y)
{
    return new Residence(x, y, this);
}

void Residence::update()
{
    int bad = 35, good = 30; /* (un)desirability of living here */
    int r, po, swing;
    int brm = 0, drm = 0; /* birth/death rate modifier */
    /* birts = 1/(BASE_BR + brm) deaths = 1/(BASE_DR - drm)
    the different signs are intentional higher brm less a little less babys, higher drm much more deaths*/
    bool cc = false;                             /* extra labor from sports activity*/
    int birth_flag = (FLAG_FED | FLAG_EMPLOYED); /* can we have babies*/
    bool extra_births = false;                   /* full houses are more fertile*/
    bool hc = false;                             /* have health cover ? */
    // int pol_death = 0;             //sometimes pollution kills

    /*Determine Health,Fire,Cricket cover*/
    if ((hc = world(x, y)->flags & FLAG_HEALTH_COVER))
    {
        brm = RESIDENCE_BRM_HEALTH;
        good += 15;
    }
    if (world(x, y)->flags & FLAG_FIRE_COVER)
    {
        good += 15;
    }
    else
    {
        bad += 5;
    }
    if ((cc = world(x, y)->flags & FLAG_CRICKET_COVER))
    {
        good += 20;
    }

    /* now get fed */
    if ((commodityCount[STUFF_FOOD] >= local_population) && (commodityCount[STUFF_WATER] >= local_population)
        //&& (world(x,y)->flags & FLAG_WATERWELL_COVER)
        && local_population)
    {
        consumeStuff(STUFF_FOOD, local_population);
        consumeStuff(STUFF_WATER, local_population);
        flags |= (FLAG_FED); // enable births
        good += 10;
    }
    else
    {
        flags &= ~(FLAG_FED); // disable births
        if (local_population)
        {
            if (rand() % DAYS_PER_STARVE == 1)
            {
                local_population--; // starving maybe deadly
                ++ddeaths;
                ++tunnat_deaths;
                ++total_starve_deaths;
                starve_deaths_history += 1.0;
            }
            starving_population += local_population; // only the survivors are starving
            bad += 250;                              // This place really sucks
            drm = 100;                               // starving is also unhealty
        }
    }

    /* now get power for nothing */
    if (commodityCount[STUFF_LOVOLT] >= POWER_RES_OVERHEAD + (POWER_USE_PER_PERSON * local_population))
    {
        consumeStuff(STUFF_LOVOLT, POWER_RES_OVERHEAD + (POWER_USE_PER_PERSON * local_population));
        flags |= FLAG_POWERED;
        flags |= FLAG_HAD_POWER;
        good += 10;
    }
    else
    {
        flags &= ~(FLAG_POWERED);
        bad += 15;
        if ((flags & FLAG_HAD_POWER))
        {
            bad += 50;
        }
    }

    /* now supply labor and buy goods if employed */
    const int &labor_cap =
        constructionGroup->commodityRuleCount[STUFF_LABOR].maxload;
    swing = JOB_SWING + (hc ? HC_JOB_SWING : 0) + (cc ? CRICKET_JOB_SWING : 0);
    int working_pop = WORKING_POP_PERCENT + (hc ? HC_WORKING_POP : 0) +
                      (cc ? CRICKET_WORKING_POP : 0);
    int swing_amt = swing * (labor_cap - commodityCount[STUFF_LABOR]) / labor_cap;
    int job_prod = local_population * (working_pop + swing_amt) / 100;
    if (labor_cap - commodityCount[STUFF_LABOR] >= job_prod)
    {
        produceStuff(STUFF_LABOR, job_prod);
        flags |= FLAG_EMPLOYED; // enable births
        good += 20;
        if ((commodityCount[STUFF_GOODS] >= local_population / 4) && (constructionGroup->commodityRuleCount[STUFF_WASTE].maxload - commodityCount[STUFF_WASTE] >= local_population / 12))
        {
            consumeStuff(STUFF_GOODS, local_population / 4);
            produceStuff(STUFF_WASTE, local_population / 12);
            good += 10;
            if (commodityCount[STUFF_LOVOLT] >= local_population / 2)
            {
                consumeStuff(STUFF_LOVOLT, local_population / 2);
                good += 5;
                brm += 10;
                /*     buy more goods if got power for them */
                if ((commodityCount[STUFF_GOODS] >= local_population / 4) && (constructionGroup->commodityRuleCount[STUFF_WASTE].maxload - commodityCount[STUFF_WASTE] >= local_population / 12))
                {
                    consumeStuff(STUFF_GOODS, local_population / 4);
                    produceStuff(STUFF_WASTE, local_population / 12);
                    good += 5;
                }
            }
            else
            {
                bad += 5;
            }
        }
    }
    else
    {
        flags &= ~(FLAG_EMPLOYED); // disable births
        unemployed_population += local_population;
        total_unemployed_days += local_population;
        if (total_unemployed_days >= NUMOF_DAYS_IN_YEAR)
        {
            total_unemployed_years += total_unemployed_days / NUMOF_DAYS_IN_YEAR;
            total_unemployed_days -= total_unemployed_days % NUMOF_DAYS_IN_YEAR;
            unemployed_history += (double)(total_unemployed_days / NUMOF_DAYS_IN_YEAR);
        }
        unemployment_cost += local_population; /* nobody went to work*/
        bad += 70;
    }

    switch (constructionGroup->group)
    {
    case GROUP_RESIDENCE_LL:
        drm += local_population * 7 * 50 / 24;              // more people more deaths
        brm += RESIDENCE_LL_BRM + (extra_births ? 100 : 0); // slow down baby production
        break;
    case GROUP_RESIDENCE_ML:
        drm += local_population * 3 * 5 / 3;               // more people more deaths
        brm += RESIDENCE_ML_BRM + (extra_births ? 50 : 0); // slow down baby production
        break;
    case GROUP_RESIDENCE_HL:
        drm += local_population * 1 * 6 / 3;               // more people more deaths
        brm += RESIDENCE_HL_BRM + (extra_births ? 50 : 0); // slow down baby production
        good += 40;
        break;
    case GROUP_RESIDENCE_LH:
        drm += local_population * 3 * 7 / 3;                // more people more deaths
        brm += RESIDENCE_LH_BRM + (extra_births ? 100 : 0); // slow down baby production
        break;
    case GROUP_RESIDENCE_MH:
        drm += local_population / 2 * 4 / 3;               // more people more deaths
        brm += RESIDENCE_MH_BRM + (extra_births ? 50 : 0); // slow down baby production
        break;
    case GROUP_RESIDENCE_HH:
        drm += local_population * 4 / 3;                   // more people more deaths
        brm += RESIDENCE_HH_BRM + (extra_births ? 50 : 0); // slow down baby production
        good += 100;
        break;
    }
    drm += local_population / 4;
    brm += local_population / 4;
    if (drm > RESIDENCE_BASE_DR - 1)
    {
        drm = RESIDENCE_BASE_DR - 1;
    }
    /* normal deaths + pollution deaths */
    po = ((world(x, y)->pollution / 16) + 1);
    pol_deaths = po > 100 ? 95 : po - 5 > 0 ? po - 5
                                            : 1;
    deaths = (RESIDENCE_BASE_DR - drm - 3 * po);
    if (deaths < 1)
        deaths = 1;
    if (hc)
        deaths *= 4;
    r = rand() % deaths;
    if (local_population > 0) // somebody might die
    {
        if (r == 0) // one guy had bad luck
        {
            --local_population;
            ++ddeaths;
            if (rand() % 100 < pol_deaths) // deadly pollution
            {
                tunnat_deaths++;
                total_pollution_deaths++;
                pollution_deaths_history += 1.0;
                bad += 100;
            }
        }
    }
    else // no death in hundred years
    {
        deaths = 120000;
    }

    /* normal births FED and EMPLOYED */
    births = RESIDENCE_BASE_BR + brm;
    if (((flags & birth_flag) == birth_flag) && (local_population > 0))
    {
        if (rand() % births == 0)
        {
            ++local_population;
            ++total_births;
            ++dbirths;
            good += 50;
        }
    }
    else // no baby in hundred years
    {
        births = 120000;
    }

    /* people_pool stuff */
    // bad += local_population / 2;
    bad += world(x, y)->pollution / 20;
    good += people_pool / 27; // 27
    desireability = good - bad;
    r = rand() % ((good + bad) * RESIDENCE_PPM);
    if (r < bad || local_population > max_population)
    {
        if (local_population > MIN_RES_POPULATION)
        {
            --local_population;
            ++people_pool;
        }
    }
    else if (people_pool > 0 && local_population < max_population && r > ((good + bad) * (RESIDENCE_PPM - 1) + bad)) /* r > (rmax - good) */
    {
        ++local_population;
        --people_pool;
    }
    /* XXX AL1: this is daily accumulator used stats.cpp, and maybe pop graph */
    population += local_population;
    housing += max_population;

    if (total_time % 100 == 99)
    {
        reset_prod_counters();
    }
}

void Residence::report()
{
    int i = 0;

    mps_store_sd(i++, constructionGroup->name, ID);
    mps_store_sddp(i++, N_("Tenants"), local_population, max_population);
    mps_store_sd(i++, N_("Desireability"), desireability);
    mps_store_sf(i++, N_("Births p.a."), (float)1200 / births);
    mps_store_sf(i++, N_("Death p.a."), (float)1200 / deaths);
    mps_store_sfp(i++, N_("Unnat. mortality"), (float)pol_deaths);
    // i++;
    list_commodities(&i);
}
