
#ifndef __cricket_h__
#define __cricket_h__

#define GROUP_CRICKET_COLOUR (white(20))
#define GROUP_CRICKET_COST 2000
#define GROUP_CRICKET_COST_MUL 3
#define GROUP_CRICKET_BUL_COST 1000
#define GROUP_CRICKET_TECH 12
#define GROUP_CRICKET_FIREC 20
#define GROUP_CRICKET_RANGE 9
#define GROUP_CRICKET_SIZE 2

#define CRICKET_LABOR 8
#define MAX_LABOR_AT_CRICKET (20 * CRICKET_LABOR)
#define CRICKET_GOODS 3
#define MAX_GOODS_AT_CRICKET (20 * CRICKET_GOODS)
#define MAX_WASTE_AT_CRICKET (20 * CRICKET_GOODS / 3)
#define CRICKET_RUNNING_COST 1
#define CRICKET_ANIMATION_SPEED 750

#include <array>
#include <string>

#include "modules.h"

class CricketConstructionGroup : public ConstructionGroup
{
public:
    CricketConstructionGroup(
        const char *name,
        unsigned short no_credit,
        unsigned short group,
        unsigned short size, int colour,
        int cost_mul, int bul_cost, int fire_chance,
        int cost, int tech, int range) : ConstructionGroup(name, no_credit, group, size, colour, cost_mul, bul_cost, fire_chance,
                                                           cost, tech, range, 2 /*mps_pages*/
                                         )
    {
        commodityRuleCount[STUFF_LABOR].maxload = MAX_LABOR_AT_CRICKET;
        commodityRuleCount[STUFF_LABOR].take = true;
        commodityRuleCount[STUFF_LABOR].give = false;
        commodityRuleCount[STUFF_GOODS].maxload = MAX_GOODS_AT_CRICKET;
        commodityRuleCount[STUFF_GOODS].take = true;
        commodityRuleCount[STUFF_GOODS].give = false;
        commodityRuleCount[STUFF_WASTE].maxload = MAX_WASTE_AT_CRICKET;
        commodityRuleCount[STUFF_WASTE].take = false;
        commodityRuleCount[STUFF_WASTE].give = true;
    }
    // overriding method that creates a Cricket
    virtual Construction *createConstruction(int x, int y);
};

extern CricketConstructionGroup cricketConstructionGroup;

class Cricket : public RegisteredConstruction<Cricket>
{ // cricket inherits from Construction
public:
    Cricket(int x, int y, ConstructionGroup *cstgrp) : RegisteredConstruction<Cricket>(x, y)
    {
        this->constructionGroup = cstgrp;
        init_resources();
        // this->anim = 0;
        this->animate_enable = false;
        this->active = false;
        setMemberSaved(&(this->active), "active");
        this->busy = 0;
        this->daycount = 0;
        this->working_days = 0;
        setMemberSaved(&(this->daycount), "daycount");
        this->covercount = 0;
        setMemberSaved(&(this->covercount), "covercount");
        initialize_commodities();

        int tmp;
        int lenm1 = world.len() - 1;
        tmp = x - constructionGroup->range;
        this->xs = (tmp < 1) ? 1 : tmp;
        tmp = y - constructionGroup->range;
        this->ys = (tmp < 1) ? 1 : tmp;
        tmp = x + constructionGroup->range + constructionGroup->size;
        this->xe = (tmp > lenm1) ? lenm1 : tmp;
        tmp = y + constructionGroup->range + constructionGroup->size;
        this->ye = (tmp > lenm1) ? lenm1 : tmp;

        commodityMaxCons[STUFF_LABOR] = 100 * CRICKET_LABOR;
        commodityMaxCons[STUFF_GOODS] = 100 * CRICKET_GOODS;
        commodityMaxProd[STUFF_WASTE] = 100 * (CRICKET_GOODS / 3);
    }

    virtual ~Cricket() {}
    virtual void update() override;
    virtual void report() override;
    virtual void animate() override;
    void cover();

    int xs, ys, xe, ye;
    int daycount, covercount;
    int anim;
    bool animate_enable, active;
    int working_days, busy;
};

#endif /* __cricket_h__ */