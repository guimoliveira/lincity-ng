#ifndef __residence_h__
#define __residence_h__

#define POWER_USE_PER_PERSON 3
#define POWER_RES_OVERHEAD 30
#define WORKING_POP_PERCENT 58
#define JOB_SWING 2
#define HC_WORKING_POP 8
#define HC_JOB_SWING 2
#define CRICKET_WORKING_POP 3
#define CRICKET_JOB_SWING 1
#define DAYS_PER_STARVE 20

/* RESIDENCE?_BRM is the birth rate modifier */
#define RESIDENCE_BASE_BR 100
#define RESIDENCE_BASE_DR (68 * 12)
#define RESIDENCE_BRM_HEALTH 300
#define RESIDENCE_LL_BRM (RESIDENCE_BASE_BR * 12)
#define RESIDENCE_ML_BRM 0
#define RESIDENCE_HL_BRM (RESIDENCE_BASE_BR + RESIDENCE_BASE_BR / 4)
#define RESIDENCE_LH_BRM (RESIDENCE_BASE_BR * 18)
#define RESIDENCE_MH_BRM (RESIDENCE_BASE_BR / 2)
#define RESIDENCE_HH_BRM 0

/* RESIDENCE_PPM is the people_pool mobitily. Higher number=less mobile. */
#define RESIDENCE_PPM 20

#define GROUP_RESIDENCE_LL_COLOUR (cyan(24))
#define GROUP_RESIDENCE_LL_COST 1000
#define GROUP_RESIDENCE_LL_COST_MUL 25
#define GROUP_RESIDENCE_LL_BUL_COST 1000
#define GROUP_RESIDENCE_LL_TECH 0
#define GROUP_RESIDENCE_LL_FIREC 75
#define GROUP_RESIDENCE_LL_MAX_POP 50

#define GROUP_RESIDENCE_ML_COLOUR (cyan(24))
#define GROUP_RESIDENCE_ML_COST 2000
#define GROUP_RESIDENCE_ML_COST_MUL 25
#define GROUP_RESIDENCE_ML_BUL_COST 1000
#define GROUP_RESIDENCE_ML_TECH 0
#define GROUP_RESIDENCE_ML_FIREC 75
#define GROUP_RESIDENCE_ML_MAX_POP 100

#define GROUP_RESIDENCE_HL_COLOUR (cyan(24))
#define GROUP_RESIDENCE_HL_COST 4000
#define GROUP_RESIDENCE_HL_COST_MUL 25
#define GROUP_RESIDENCE_HL_BUL_COST 1000
#define GROUP_RESIDENCE_HL_TECH 0
#define GROUP_RESIDENCE_HL_FIREC 75
#define GROUP_RESIDENCE_HL_MAX_POP 200

#define GROUP_RESIDENCE_LH_COLOUR (cyan(24))
#define GROUP_RESIDENCE_LH_COST 800
#define GROUP_RESIDENCE_LH_COST_MUL 25
#define GROUP_RESIDENCE_LH_BUL_COST 1000
#define GROUP_RESIDENCE_LH_TECH 300
#define GROUP_RESIDENCE_LH_FIREC 75
#define GROUP_RESIDENCE_LH_MAX_POP 100

#define GROUP_RESIDENCE_MH_COLOUR (cyan(24))
#define GROUP_RESIDENCE_MH_COST 1600
#define GROUP_RESIDENCE_MH_COST_MUL 25
#define GROUP_RESIDENCE_MH_BUL_COST 1000
#define GROUP_RESIDENCE_MH_TECH 300
#define GROUP_RESIDENCE_MH_FIREC 75
#define GROUP_RESIDENCE_MH_MAX_POP 200

#define GROUP_RESIDENCE_HH_COLOUR (cyan(24))
#define GROUP_RESIDENCE_HH_COST 3200
#define GROUP_RESIDENCE_HH_COST_MUL 25
#define GROUP_RESIDENCE_HH_BUL_COST 1000
#define GROUP_RESIDENCE_HH_TECH 300
#define GROUP_RESIDENCE_HH_FIREC 75
#define GROUP_RESIDENCE_HH_MAX_POP 400

#define GROUP_RESIDENCE_RANGE 0
#define GROUP_RESIDENCE_SIZE 3

#endif /* __residence_h__ */

#include <array>
#include <iostream>
#include <string>

#include "modules.h"

class ResidenceConstructionGroup : public ConstructionGroup
{
public:
    ResidenceConstructionGroup(
        const char *name,
        unsigned short no_credit,
        unsigned short group,
        unsigned short size, int colour,
        int cost_mul, int bul_cost, int fire_chance,
        int cost, int tech, int range) : ConstructionGroup(name, no_credit, group, size, colour, cost_mul, bul_cost, fire_chance,
                                                           cost, tech, range, 2 /*mps_pages*/
                                         )
    {
        switch (group)
        {
        case GROUP_RESIDENCE_LL:
            commodityRuleCount[STUFF_LOVOLT].maxload = 20 * (POWER_RES_OVERHEAD + (GROUP_RESIDENCE_LL_MAX_POP * POWER_USE_PER_PERSON));
            commodityRuleCount[STUFF_WASTE].maxload = 6 * GROUP_RESIDENCE_LL_MAX_POP;
            commodityRuleCount[STUFF_GOODS].maxload = 10 * GROUP_RESIDENCE_LL_MAX_POP;
            commodityRuleCount[STUFF_LABOR].maxload = 20 * GROUP_RESIDENCE_LL_MAX_POP;
            commodityRuleCount[STUFF_FOOD].maxload = 20 * GROUP_RESIDENCE_LL_MAX_POP;
            commodityRuleCount[STUFF_WATER].maxload = 20 * GROUP_RESIDENCE_LL_MAX_POP;
            break;
        case GROUP_RESIDENCE_ML:
            commodityRuleCount[STUFF_LOVOLT].maxload = 20 * (POWER_RES_OVERHEAD + (GROUP_RESIDENCE_ML_MAX_POP * POWER_USE_PER_PERSON));
            commodityRuleCount[STUFF_WASTE].maxload = 6 * GROUP_RESIDENCE_ML_MAX_POP;
            commodityRuleCount[STUFF_GOODS].maxload = 10 * GROUP_RESIDENCE_ML_MAX_POP;
            commodityRuleCount[STUFF_LABOR].maxload = 20 * GROUP_RESIDENCE_ML_MAX_POP;
            commodityRuleCount[STUFF_FOOD].maxload = 20 * GROUP_RESIDENCE_ML_MAX_POP;
            commodityRuleCount[STUFF_WATER].maxload = 20 * GROUP_RESIDENCE_ML_MAX_POP;
            break;
        case GROUP_RESIDENCE_HL:
            commodityRuleCount[STUFF_LOVOLT].maxload = 20 * (POWER_RES_OVERHEAD + (GROUP_RESIDENCE_HL_MAX_POP * POWER_USE_PER_PERSON));
            commodityRuleCount[STUFF_WASTE].maxload = 6 * GROUP_RESIDENCE_HL_MAX_POP;
            commodityRuleCount[STUFF_GOODS].maxload = 10 * GROUP_RESIDENCE_HL_MAX_POP;
            commodityRuleCount[STUFF_LABOR].maxload = 20 * GROUP_RESIDENCE_HL_MAX_POP;
            commodityRuleCount[STUFF_FOOD].maxload = 20 * GROUP_RESIDENCE_HL_MAX_POP;
            commodityRuleCount[STUFF_WATER].maxload = 20 * GROUP_RESIDENCE_HL_MAX_POP;
            break;
        case GROUP_RESIDENCE_LH:
            commodityRuleCount[STUFF_LOVOLT].maxload = 20 * (POWER_RES_OVERHEAD + (GROUP_RESIDENCE_LH_MAX_POP * POWER_USE_PER_PERSON));
            commodityRuleCount[STUFF_WASTE].maxload = 6 * GROUP_RESIDENCE_LH_MAX_POP;
            commodityRuleCount[STUFF_GOODS].maxload = 10 * GROUP_RESIDENCE_LH_MAX_POP;
            commodityRuleCount[STUFF_LABOR].maxload = 20 * GROUP_RESIDENCE_LH_MAX_POP;
            commodityRuleCount[STUFF_FOOD].maxload = 20 * GROUP_RESIDENCE_LH_MAX_POP;
            commodityRuleCount[STUFF_WATER].maxload = 20 * GROUP_RESIDENCE_LH_MAX_POP;
            break;
        case GROUP_RESIDENCE_MH:
            commodityRuleCount[STUFF_LOVOLT].maxload = 20 * (POWER_RES_OVERHEAD + (GROUP_RESIDENCE_MH_MAX_POP * POWER_USE_PER_PERSON));
            commodityRuleCount[STUFF_WASTE].maxload = 6 * GROUP_RESIDENCE_MH_MAX_POP;
            commodityRuleCount[STUFF_GOODS].maxload = 10 * GROUP_RESIDENCE_MH_MAX_POP;
            commodityRuleCount[STUFF_LABOR].maxload = 20 * GROUP_RESIDENCE_MH_MAX_POP;
            commodityRuleCount[STUFF_FOOD].maxload = 20 * GROUP_RESIDENCE_MH_MAX_POP;
            commodityRuleCount[STUFF_WATER].maxload = 20 * GROUP_RESIDENCE_MH_MAX_POP;
            break;
        case GROUP_RESIDENCE_HH:
            commodityRuleCount[STUFF_LOVOLT].maxload = 20 * (POWER_RES_OVERHEAD + (GROUP_RESIDENCE_HH_MAX_POP * POWER_USE_PER_PERSON));
            commodityRuleCount[STUFF_WASTE].maxload = 6 * GROUP_RESIDENCE_HH_MAX_POP;
            commodityRuleCount[STUFF_GOODS].maxload = 10 * GROUP_RESIDENCE_HH_MAX_POP;
            commodityRuleCount[STUFF_LABOR].maxload = 20 * GROUP_RESIDENCE_HH_MAX_POP;
            commodityRuleCount[STUFF_FOOD].maxload = 20 * GROUP_RESIDENCE_HH_MAX_POP;
            commodityRuleCount[STUFF_WATER].maxload = 20 * GROUP_RESIDENCE_HH_MAX_POP;
            break;
        }
        commodityRuleCount[STUFF_FOOD].take = true;
        commodityRuleCount[STUFF_FOOD].give = false;
        commodityRuleCount[STUFF_LABOR].take = false;
        commodityRuleCount[STUFF_LABOR].give = true;
        commodityRuleCount[STUFF_GOODS].take = true;
        commodityRuleCount[STUFF_GOODS].give = false;
        commodityRuleCount[STUFF_WASTE].take = false;
        commodityRuleCount[STUFF_WASTE].give = true;
        commodityRuleCount[STUFF_LOVOLT].take = true;
        commodityRuleCount[STUFF_LOVOLT].give = false;
        commodityRuleCount[STUFF_WATER].take = true;
        commodityRuleCount[STUFF_WATER].give = false;
    }
    // overriding method that creates a residence
    virtual Construction *createConstruction(int x, int y);
};

extern ResidenceConstructionGroup residenceLLConstructionGroup, residenceMLConstructionGroup, residenceHLConstructionGroup;
extern ResidenceConstructionGroup residenceLHConstructionGroup, residenceMHConstructionGroup, residenceHHConstructionGroup;

class Residence : public RegisteredConstruction<Residence>
{ // Residence inherits from its own RegisteredConstruction
public:
    Residence(int x, int y, ConstructionGroup *cstgrp) : RegisteredConstruction<Residence>(x, y)
    {
        this->constructionGroup = cstgrp;
        init_resources();
        this->local_population = 0;
        setMemberSaved(&(this->local_population), "local_population");
        this->desireability = 0;
        this->births = 120000;
        this->deaths = 120000;
        this->pol_deaths = 0;
        if (cstgrp == &residenceLLConstructionGroup)
        {
            this->max_population = GROUP_RESIDENCE_LL_MAX_POP;
        }
        else if (cstgrp == &residenceMLConstructionGroup)
        {
            this->max_population = GROUP_RESIDENCE_ML_MAX_POP;
        }
        else if (cstgrp == &residenceHLConstructionGroup)
        {
            this->max_population = GROUP_RESIDENCE_HL_MAX_POP;
        }
        else if (cstgrp == &residenceLHConstructionGroup)
        {
            this->max_population = GROUP_RESIDENCE_LH_MAX_POP;
        }
        else if (cstgrp == &residenceMHConstructionGroup)
        {
            this->max_population = GROUP_RESIDENCE_MH_MAX_POP;
        }
        else if (cstgrp == &residenceHHConstructionGroup)
        {
            this->max_population = GROUP_RESIDENCE_HH_MAX_POP;
        }
        else
        {
            this->max_population = 50;
            std::cout << "unknown ConstructionGroup in new Residence at (" << x << "," << y << ")" << std::endl;
        }

        initialize_commodities();
        commodityMaxCons[STUFF_FOOD] = 100 * max_population;
        commodityMaxCons[STUFF_WATER] = 100 * max_population;
        commodityMaxCons[STUFF_LOVOLT] = 100 * (POWER_RES_OVERHEAD +
                                                (POWER_USE_PER_PERSON * max_population) + max_population / 2);
        commodityMaxProd[STUFF_LABOR] = 100 * (max_population * (WORKING_POP_PERCENT + JOB_SWING + HC_WORKING_POP + HC_JOB_SWING + CRICKET_WORKING_POP + CRICKET_JOB_SWING) / 100);
        commodityMaxCons[STUFF_GOODS] = 100 * (max_population / 4) * 2;
        commodityMaxProd[STUFF_WASTE] = 100 * (max_population / 12) * 2;
    }
    virtual ~Residence()
    {
        // everyone survives demolition
        people_pool += local_population;
    }
    virtual void update();
    virtual void report();

    int local_population;
    int max_population;
    int desireability;
    int births, deaths, pol_deaths;
};
