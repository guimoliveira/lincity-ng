#define GROUP_SCHOOL_COLOUR (white(15))
#define GROUP_SCHOOL_COST 10000
#define GROUP_SCHOOL_COST_MUL 25
#define GROUP_SCHOOL_BUL_COST 10000
#define GROUP_SCHOOL_TECH 1
#define GROUP_SCHOOL_FIREC 40
#define GROUP_SCHOOL_RANGE 0
#define GROUP_SCHOOL_SIZE 2

#define LABOR_MAKE_TECH_SCHOOL 200
#define GOODS_MAKE_TECH_SCHOOL 75
#define TECH_MADE_BY_SCHOOL 2
#define MAX_LABOR_AT_SCHOOL (20 * LABOR_MAKE_TECH_SCHOOL)
#define MAX_GOODS_AT_SCHOOL (20 * GOODS_MAKE_TECH_SCHOOL)
#define MAX_WASTE_AT_SCHOOL (20 * GOODS_MAKE_TECH_SCHOOL / 3)
#define SCHOOL_RUNNING_COST 2

#define SCHOOL_ANIMATION_SPEED 80
#define SCHOOL_ANIMATION_BREAK 9500

#include <stddef.h>
#include <array>
#include <iterator>
#include <list>
#include <map>
#include <string>

#include "modules.h"

class SchoolConstructionGroup : public ConstructionGroup
{
public:
    SchoolConstructionGroup(
        const char *name,
        unsigned short no_credit,
        unsigned short group,
        unsigned short size, int colour,
        int cost_mul, int bul_cost, int fire_chance,
        int cost, int tech, int range) : ConstructionGroup(name, no_credit, group, size, colour, cost_mul, bul_cost, fire_chance,
                                                           cost, tech, range, 2 /*mps_pages*/
                                         )
    {
        commodityRuleCount[STUFF_LABOR].maxload = MAX_LABOR_AT_SCHOOL;
        commodityRuleCount[STUFF_LABOR].take = true;
        commodityRuleCount[STUFF_LABOR].give = false;
        commodityRuleCount[STUFF_GOODS].maxload = MAX_GOODS_AT_SCHOOL;
        commodityRuleCount[STUFF_GOODS].take = true;
        commodityRuleCount[STUFF_GOODS].give = false;
        commodityRuleCount[STUFF_WASTE].maxload = MAX_WASTE_AT_SCHOOL;
        commodityRuleCount[STUFF_WASTE].take = false;
        commodityRuleCount[STUFF_WASTE].give = true;
    }
    // overriding method that creates a School
    virtual Construction *createConstruction(int x, int y);
};

extern SchoolConstructionGroup schoolConstructionGroup;

class School : public RegisteredConstruction<School>
{ // School inherits from its own RegisteredConstruction
public:
    School(int x, int y, ConstructionGroup *cstgrp) : RegisteredConstruction<School>(x, y)
    {
        this->constructionGroup = cstgrp;
        init_resources();
        // std::list<ExtraFrame>::iterator frit = world(x,y)->createframe();
        // CK ?? Why the hell is the variant above unsafe?
        world(x, y)->framesptr->resize(world(x, y)->framesptr->size() + 1);
        frit = frameIt;
        std::advance(frit, 1);
        frit->resourceGroup = ResourceGroup::resMap["ChildOnSwing"]; // host of the swing
        frit->frame = -1;                                            // hide the swing
        // this->animate_enable = false;
        this->anim = 0;
        this->anim2 = 0;
        this->working_days = 0;
        this->busy = 0;
        this->total_tech_made = 0;
        setMemberSaved(&this->total_tech_made, "total_tech_made");
        initialize_commodities();

        commodityMaxCons[STUFF_LABOR] = 100 * LABOR_MAKE_TECH_SCHOOL;
        commodityMaxCons[STUFF_GOODS] = 100 * GOODS_MAKE_TECH_SCHOOL;
        commodityMaxProd[STUFF_WASTE] = 100 * (GOODS_MAKE_TECH_SCHOOL / 3);
    }

    virtual ~School() // remove the one extraframe
    {
        if (world(x, y)->framesptr)
        {
            world(x, y)->framesptr->erase(frit);
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

    std::list<ExtraFrame>::iterator frit;
    int anim;
    int anim2;
    // bool animate_enable;
    int total_tech_made;
    int working_days, busy;
};