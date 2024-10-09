#define GROUP_HEALTH_COLOUR (green(24))
#define GROUP_HEALTH_COST 100000
#define GROUP_HEALTH_COST_MUL 2
#define GROUP_HEALTH_BUL_COST 1000
#define GROUP_HEALTH_TECH 110
#define GROUP_HEALTH_FIREC 2
#define GROUP_HEALTH_RANGE 14
#define GROUP_HEALTH_SIZE 2

#define HEALTH_CENTRE_LABOR 6
#define MAX_LABOR_AT_HEALTH_CENTRE (20 * HEALTH_CENTRE_LABOR)
#define HEALTH_CENTRE_GOODS 40
#define MAX_GOODS_AT_HEALTH_CENTRE (20 * HEALTH_CENTRE_GOODS)
#define MAX_WASTE_AT_HEALTH_CENTRE (20 * HEALTH_CENTRE_GOODS / 3)
#define HEALTH_RUNNING_COST 2
#define HEALTH_RUNNING_COST_MUL 9

#include <array>
#include <string>

#include "modules.h"

class HealthCentreConstructionGroup : public ConstructionGroup
{
public:
    HealthCentreConstructionGroup(
        const char *name,
        unsigned short no_credit,
        unsigned short group,
        unsigned short size, int colour,
        int cost_mul, int bul_cost, int fire_chance,
        int cost, int tech, int range) : ConstructionGroup(name, no_credit, group, size, colour, cost_mul, bul_cost, fire_chance,
                                                           cost, tech, range, 2 /*mps_pages*/
                                         )
    {
        commodityRuleCount[STUFF_LABOR].maxload = MAX_LABOR_AT_HEALTH_CENTRE;
        commodityRuleCount[STUFF_LABOR].take = true;
        commodityRuleCount[STUFF_LABOR].give = false;
        commodityRuleCount[STUFF_GOODS].maxload = MAX_GOODS_AT_HEALTH_CENTRE;
        commodityRuleCount[STUFF_GOODS].take = true;
        commodityRuleCount[STUFF_GOODS].give = false;
        commodityRuleCount[STUFF_WASTE].maxload = MAX_WASTE_AT_HEALTH_CENTRE;
        commodityRuleCount[STUFF_WASTE].take = false;
        commodityRuleCount[STUFF_WASTE].give = true;
    }
    // overriding method that creates a HealthCentre
    virtual Construction *createConstruction(int x, int y);
};

extern HealthCentreConstructionGroup healthCentreConstructionGroup;

class HealthCentre : public RegisteredConstruction<HealthCentre>
{ // HealthCentre inherits from its own RegisteredConstruction
public:
    HealthCentre(int x, int y, ConstructionGroup *cstgrp) : RegisteredConstruction<HealthCentre>(x, y)
    {
        this->constructionGroup = cstgrp;
        init_resources();
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

        commodityMaxCons[STUFF_LABOR] = 100 * HEALTH_CENTRE_LABOR;
        commodityMaxCons[STUFF_GOODS] = 100 * HEALTH_CENTRE_GOODS;
        commodityMaxProd[STUFF_WASTE] = 100 * (HEALTH_CENTRE_GOODS / 3);
    }
    virtual ~HealthCentre() {}
    virtual void update();
    virtual void report();
    void cover();

    int xs, ys, xe, ye;
    int daycount, covercount;
    bool active;
    int working_days, busy;
};
