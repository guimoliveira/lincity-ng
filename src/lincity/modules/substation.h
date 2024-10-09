#define GROUP_SUBSTATION_COLOUR (yellow(18))
#define GROUP_SUBSTATION_COST 500
#define GROUP_SUBSTATION_COST_MUL 2
#define GROUP_SUBSTATION_BUL_COST 100
#define GROUP_SUBSTATION_TECH 200
#define GROUP_SUBSTATION_FIREC 50
#define GROUP_SUBSTATION_RANGE 0
#define GROUP_SUBSTATION_SIZE 2

#define SUBSTATION_HIVOLT (1500)
#define MAX_HIVOLT_AT_SUBSTATION (20 * SUBSTATION_HIVOLT)
#define SUBSTATION_LOVOLT (2 * SUBSTATION_HIVOLT)
#define MAX_LOVOLT_AT_SUBSTATION (20 * SUBSTATION_LOVOLT)

#include <array>

#include "modules.h"

class SubstationConstructionGroup : public ConstructionGroup
{
public:
    SubstationConstructionGroup(
        const char *name,
        unsigned short no_credit,
        unsigned short group,
        unsigned short size, int colour,
        int cost_mul, int bul_cost, int fire_chance,
        int cost, int tech, int range) : ConstructionGroup(name, no_credit, group, size, colour, cost_mul, bul_cost, fire_chance,
                                                           cost, tech, range, 2 /*mps_pages*/
                                         )
    {

        commodityRuleCount[STUFF_HIVOLT].maxload = MAX_HIVOLT_AT_SUBSTATION;
        commodityRuleCount[STUFF_HIVOLT].take = true;
        commodityRuleCount[STUFF_HIVOLT].give = false;
        commodityRuleCount[STUFF_LOVOLT].maxload = MAX_LOVOLT_AT_SUBSTATION;
        commodityRuleCount[STUFF_LOVOLT].take = false;
        commodityRuleCount[STUFF_LOVOLT].give = true;
    }
    // overriding method that creates a Substation
    virtual Construction *createConstruction(int x, int y);
};

extern SubstationConstructionGroup substationConstructionGroup;
// extern SubstationConstructionGroup substation_RG_ConstructionGroup;
// extern SubstationConstructionGroup substation_G_ConstructionGroup;

class Substation : public RegisteredConstruction<Substation>
{ // Substation inherits from Construction
public:
    Substation(int x, int y, ConstructionGroup *cstgrp) : RegisteredConstruction<Substation>(x, y)
    {
        this->constructionGroup = cstgrp;
        init_resources();
        this->working_days = 0;
        this->busy = 0;
        initialize_commodities();

        commodityMaxCons[STUFF_HIVOLT] = 100 * SUBSTATION_HIVOLT;
        commodityMaxProd[STUFF_LOVOLT] = 100 * 2 * SUBSTATION_HIVOLT;
    }
    virtual ~Substation() {}
    virtual void update() override;
    virtual void report() override;
    virtual void animate() override;

    int working_days, busy;
};
