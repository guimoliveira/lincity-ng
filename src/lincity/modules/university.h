#define GROUP_UNIVERSITY_COLOUR (blue(22))
#define GROUP_UNIVERSITY_COST 20000
#define GROUP_UNIVERSITY_COST_MUL 25
#define GROUP_UNIVERSITY_BUL_COST 20000
#define GROUP_UNIVERSITY_TECH 150
#define GROUP_UNIVERSITY_FIREC 40
#define GROUP_UNIVERSITY_RANGE 0
#define GROUP_UNIVERSITY_SIZE 3

#define UNIVERSITY_LABOR 250
#define UNIVERSITY_GOODS 750
#define UNIVERSITY_RUNNING_COST 23
#define UNIVERSITY_TECH_MADE 4

#define MAX_LABOR_AT_UNIVERSITY (20 * UNIVERSITY_LABOR)
#define MAX_GOODS_AT_UNIVERSITY (20 * UNIVERSITY_GOODS)
#define MAX_WASTE_AT_UNIVERSITY (20 * UNIVERSITY_GOODS / 3)

#include <array>
#include <string>

#include "modules.h"

class UniversityConstructionGroup : public ConstructionGroup
{
public:
    UniversityConstructionGroup(
        const char *name,
        unsigned short no_credit,
        unsigned short group,
        unsigned short size, int colour,
        int cost_mul, int bul_cost, int fire_chance,
        int cost, int tech, int range) : ConstructionGroup(name, no_credit, group, size, colour, cost_mul, bul_cost, fire_chance,
                                                           cost, tech, range, 2 /*mps_pages*/
                                         )
    {
        commodityRuleCount[STUFF_LABOR].maxload = MAX_LABOR_AT_UNIVERSITY;
        commodityRuleCount[STUFF_LABOR].take = true;
        commodityRuleCount[STUFF_LABOR].give = false;
        commodityRuleCount[STUFF_GOODS].maxload = MAX_GOODS_AT_UNIVERSITY;
        commodityRuleCount[STUFF_GOODS].take = true;
        commodityRuleCount[STUFF_GOODS].give = false;
        commodityRuleCount[STUFF_WASTE].maxload = MAX_WASTE_AT_UNIVERSITY;
        commodityRuleCount[STUFF_WASTE].take = false;
        commodityRuleCount[STUFF_WASTE].give = true;
    }
    // overriding method that creates a University
    virtual Construction *createConstruction(int x, int y);
};

extern UniversityConstructionGroup universityConstructionGroup;

class University : public RegisteredConstruction<University>
{ // university inherits from its own RegisteredConstruction
public:
    University(int x, int y, ConstructionGroup *cstgrp) : RegisteredConstruction<University>(x, y)
    {
        this->constructionGroup = cstgrp;
        init_resources();
        this->working_days = 0;
        this->busy = 0;
        this->total_tech_made = 0;
        setMemberSaved(&this->total_tech_made, "total_tech_made");
        initialize_commodities();

        commodityMaxCons[STUFF_LABOR] = 100 * UNIVERSITY_LABOR;
        commodityMaxCons[STUFF_GOODS] = 100 * UNIVERSITY_GOODS;
        commodityMaxProd[STUFF_WASTE] = 100 * (UNIVERSITY_GOODS / 3);
    }
    virtual ~University() {}
    virtual void update();
    virtual void report();

    int total_tech_made;
    int working_days, busy;
};
