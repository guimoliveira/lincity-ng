#include <stddef.h>
#include <array>
#include <iterator>
#include <list>
#include <map>
#include <string>

#include "modules.h"

#define GROUP_INDUSTRY_L_COLOUR (cyan(18))
#define GROUP_INDUSTRY_L_COST 20000
#define GROUP_INDUSTRY_L_COST_MUL 25
#define GROUP_INDUSTRY_L_BUL_COST 20000
#define GROUP_INDUSTRY_L_TECH 160
#define GROUP_INDUSTRY_L_FIREC 70
#define GROUP_INDUSTRY_L_RANGE 0
#define GROUP_INDUSTRY_L_SIZE 3

#define INDUSTRY_L_ORE_USED 125
#define INDUSTRY_L_STEEL_USED 12
#define INDUSTRY_L_LABOR_USED 30
#define INDUSTRY_L_LABOR_LOAD_ORE 1
#define INDUSTRY_L_LABOR_LOAD_STEEL 4
#define MIN_LABOR_AT_INDUSTRY_L (INDUSTRY_L_LABOR_LOAD_ORE + INDUSTRY_L_LABOR_LOAD_STEEL + INDUSTRY_L_LABOR_USED)
#define INDUSTRY_L_MAKE_GOODS 225
#define INDUSTRY_L_POWER_PER_GOOD 10

#define MAX_ORE_AT_INDUSTRY_L (20 * INDUSTRY_L_ORE_USED)
#define MAX_LABOR_AT_INDUSTRY_L (20 * MIN_LABOR_AT_INDUSTRY_L)
#define MAX_GOODS_AT_INDUSTRY_L (20 * 2 * 4 * INDUSTRY_L_MAKE_GOODS)
#define MAX_WASTE_AT_INDUSTRY_L (MAX_GOODS_AT_INDUSTRY_L / 20)
#define MAX_LOVOLT_AT_INDUSTY_L (INDUSTRY_L_POWER_PER_GOOD * MAX_GOODS_AT_INDUSTRY_L)
#define MAX_HIVOLT_AT_INDUSTY_L (INDUSTRY_L_POWER_PER_GOOD * MAX_GOODS_AT_INDUSTRY_L / 2)
#define MAX_STEEL_AT_INDUSTRY_L (20 * INDUSTRY_L_STEEL_USED)

#define INDUSTRY_L_ANIM_SPEED 290
#define INDUSTRY_L_POL_PER_GOOD 0.05

class IndustryLightConstructionGroup : public ConstructionGroup
{
public:
    IndustryLightConstructionGroup(
        const char *name,
        unsigned short no_credit,
        unsigned short group,
        unsigned short size, int colour,
        int cost_mul, int bul_cost, int fire_chance,
        int cost, int tech, int range) : ConstructionGroup(name, no_credit, group, size, colour, cost_mul, bul_cost, fire_chance,
                                                           cost, tech, range, 2 /*mps_pages*/
                                         )
    {
        commodityRuleCount[STUFF_LABOR].maxload = MAX_LABOR_AT_INDUSTRY_L;
        commodityRuleCount[STUFF_LABOR].take = true;
        commodityRuleCount[STUFF_LABOR].give = false;
        commodityRuleCount[STUFF_GOODS].maxload = MAX_GOODS_AT_INDUSTRY_L;
        commodityRuleCount[STUFF_GOODS].take = false;
        commodityRuleCount[STUFF_GOODS].give = true;
        commodityRuleCount[STUFF_ORE].maxload = MAX_ORE_AT_INDUSTRY_L;
        commodityRuleCount[STUFF_ORE].take = true;
        commodityRuleCount[STUFF_ORE].give = false;
        commodityRuleCount[STUFF_STEEL].maxload = MAX_STEEL_AT_INDUSTRY_L;
        commodityRuleCount[STUFF_STEEL].take = true;
        commodityRuleCount[STUFF_STEEL].give = false;
        commodityRuleCount[STUFF_WASTE].maxload = MAX_WASTE_AT_INDUSTRY_L;
        commodityRuleCount[STUFF_WASTE].take = false;
        commodityRuleCount[STUFF_WASTE].give = true;
        commodityRuleCount[STUFF_LOVOLT].maxload = MAX_LOVOLT_AT_INDUSTY_L;
        commodityRuleCount[STUFF_LOVOLT].take = true;
        commodityRuleCount[STUFF_LOVOLT].give = false;
        commodityRuleCount[STUFF_HIVOLT].maxload = MAX_HIVOLT_AT_INDUSTY_L;
        commodityRuleCount[STUFF_HIVOLT].take = true;
        commodityRuleCount[STUFF_HIVOLT].give = false;
    };
    // overriding method that creates a LightIndustry
    virtual Construction *createConstruction(int x, int y);
};

extern IndustryLightConstructionGroup industryLightConstructionGroup;

class IndustryLight : public RegisteredConstruction<IndustryLight>
{ // IndustryLight inherits from RegisteredConstruction
public:
    IndustryLight(int x, int y, ConstructionGroup *cstgrp) : RegisteredConstruction<IndustryLight>(x, y)
    {
        this->constructionGroup = cstgrp;
        init_resources();
        world(x, y)->framesptr->resize(world(x, y)->framesptr->size() + 2);
        std::list<ExtraFrame>::iterator frit = frameIt;
        std::advance(frit, 1);
        fr_begin = frit;

        frit = frameIt;
        std::advance(frit, 1);
        frit->move_x = -113;
        frit->move_y = -210;
        std::advance(frit, 1);
        frit->move_x = -84;
        frit->move_y = -198;
        std::advance(frit, 1);
        fr_end = frit;
        for (frit = fr_begin; frit != world(x, y)->framesptr->end() && frit != fr_end; std::advance(frit, 1))
        {
            frit->resourceGroup = ResourceGroup::resMap["GraySmoke"];
            frit->frame = -1; // hide smoke
        }

        this->tech = tech_level;
        setMemberSaved(&this->tech, "tech");
        this->working_days = 0;
        this->busy = 0;
        this->goods_this_month = 0;
        this->anim = 0;
        initialize_commodities();
        this->bonus = 0;
        setMemberSaved(&this->bonus, "bonus"); // compatibility
        this->extra_bonus = 0;
        setMemberSaved(&this->extra_bonus, "extra_bonus"); // compatibility

        commodityMaxCons[STUFF_LABOR] = 100 * (INDUSTRY_L_LABOR_USED +
                                               INDUSTRY_L_LABOR_LOAD_ORE + LABOR_LOAD_ORE +
                                               INDUSTRY_L_LABOR_LOAD_STEEL + LABOR_LOAD_STEEL);
        commodityMaxCons[STUFF_ORE] = 100 * INDUSTRY_L_ORE_USED * 2;
        commodityMaxCons[STUFF_STEEL] = 100 * INDUSTRY_L_STEEL_USED;
        commodityMaxCons[STUFF_LOVOLT] = 100 *
                                         INDUSTRY_L_POWER_PER_GOOD * INDUSTRY_L_MAKE_GOODS * 8;
        commodityMaxCons[STUFF_HIVOLT] = 100 *
                                         INDUSTRY_L_POWER_PER_GOOD * INDUSTRY_L_MAKE_GOODS * 4;
        commodityMaxProd[STUFF_GOODS] = 100 * INDUSTRY_L_MAKE_GOODS * 8;
    }

    virtual void initialize() override
    {
        RegisteredConstruction::initialize();

        if (tech > MAX_TECH_LEVEL)
        {
            bonus = (tech - MAX_TECH_LEVEL);
            if (bonus > MAX_TECH_LEVEL)
                bonus = MAX_TECH_LEVEL;
            bonus /= MAX_TECH_LEVEL;
            // check for filter technology bonus
            if (tech > 2 * MAX_TECH_LEVEL)
            {
                extra_bonus = tech - 2 * MAX_TECH_LEVEL;
                if (extra_bonus > MAX_TECH_LEVEL)
                    extra_bonus = MAX_TECH_LEVEL;
                extra_bonus /= MAX_TECH_LEVEL;
            }
        }

        commodityMaxProd[STUFF_WASTE] = 100 * (int)(INDUSTRY_L_POL_PER_GOOD *
                                                    INDUSTRY_L_MAKE_GOODS * bonus * (1 - extra_bonus));
    }

    virtual ~IndustryLight() // remove 2 or more extraframes
    {
        if (world(x, y)->framesptr)
        {
            world(x, y)->framesptr->erase(fr_begin, fr_end);
            if (world(x, y)->framesptr->empty())
            {
                delete world(x, y)->framesptr;
                world(x, y)->framesptr = NULL;
            }
        }
    }

    virtual void update() override;
    virtual void report() override;
    virtual void animate() override;

    std::list<ExtraFrame>::iterator fr_begin, fr_end;
    int tech;
    double bonus, extra_bonus;
    int working_days;
    int busy;
    int anim;
    int goods_this_month;
    int goods_today;
};
