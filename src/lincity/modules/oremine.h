#define GROUP_OREMINE_COLOUR (red(18))
#define GROUP_OREMINE_COST 500
#define GROUP_OREMINE_COST_MUL 10
#define GROUP_OREMINE_BUL_COST 500000
#define GROUP_OREMINE_TECH 0
#define GROUP_OREMINE_FIREC 0
#define GROUP_OREMINE_RANGE 0
#define GROUP_OREMINE_SIZE 4

// Some ore related stuff has to be in all_buildings.h
#define ORE_PER_RESERVE 5000
#define MAX_ORE_AT_MINE (20 * ORE_PER_RESERVE)
#define MIN_ORE_RESERVE_FOR_MINE (ORE_RESERVE)
#define LABOR_DIG_ORE 200
#define OREMINE_LABOR (LABOR_DIG_ORE + LABOR_LOAD_ORE)
#define MAX_LABOR_AT_OREMINE (20 * OREMINE_LABOR)

#define ORE_LEVEL_TARGET 80 // mine will only supply so much
#define OREMINE_ANIMATION_SPEED 200

#include <array>
#include <string>

#include "modules.h"

class OremineConstructionGroup : public ConstructionGroup
{
public:
    OremineConstructionGroup(
        const char *name,
        unsigned short no_credit,
        unsigned short group,
        unsigned short size, int colour,
        int cost_mul, int bul_cost, int fire_chance, int cost, int tech, int range) : ConstructionGroup(name, no_credit, group, size, colour, cost_mul, bul_cost, fire_chance,
                                                                                                        cost, tech, range, 2 /*mps_pages*/
                                                                                      )
    {
        commodityRuleCount[STUFF_LABOR].maxload = MAX_LABOR_AT_OREMINE;
        commodityRuleCount[STUFF_LABOR].take = true;
        commodityRuleCount[STUFF_LABOR].give = false;
        commodityRuleCount[STUFF_ORE].maxload = MAX_ORE_AT_MINE;
        commodityRuleCount[STUFF_ORE].take = true;
        commodityRuleCount[STUFF_ORE].give = true;
    }
    // overriding method that creates an Oremine
    virtual Construction *createConstruction(int x, int y);
};

extern OremineConstructionGroup oremineConstructionGroup;

class Oremine : public RegisteredConstruction<Oremine>
{ // Oremine inherits from its own RegisteredConstruction
public:
    Oremine(int x, int y, ConstructionGroup *cstgrp) : RegisteredConstruction<Oremine>(x, y)
    {
        this->constructionGroup = cstgrp;
        init_resources();
        // this->anim = 0;
        this->animate_enable = false;
        this->working_days = 0;
        this->busy = 0;
        this->anim_count = 0;
        // this->days_offset = 0;
        initialize_commodities();

        int ore = 0;
        for (int yy = y; (yy < y + constructionGroup->size); yy++)
        {
            for (int xx = x; (xx < x + constructionGroup->size); xx++)
            {
                ore += world(xx, yy)->ore_reserve;
            }
        }
        if (ore < 1)
        {
            ore = 1;
        }
        this->total_ore_reserve = ore;
        setMemberSaved(&this->total_ore_reserve, "total_ore_reserve");

        commodityMaxProd[STUFF_ORE] = 100 * ORE_PER_RESERVE;
        commodityMaxCons[STUFF_ORE] = 100 * ORE_PER_RESERVE;
        commodityMaxCons[STUFF_LABOR] = 100 * OREMINE_LABOR;
    }
    virtual ~Oremine() {}
    virtual void update() override;
    virtual void report() override;
    virtual void animate() override;

    int total_ore_reserve;
    int anim;
    bool animate_enable;
    int working_days, busy;
    unsigned int anim_count;
    // int days_offset;
};
