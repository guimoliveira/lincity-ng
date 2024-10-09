#define GROUP_MARKET_COLOUR (blue(28))
#define GROUP_MARKET_COST 100
#define GROUP_MARKET_COST_MUL 25
#define GROUP_MARKET_BUL_COST 100
#define GROUP_MARKET_TECH 0
#define GROUP_MARKET_FIREC 80
#define GROUP_MARKET_RANGE 9
#define GROUP_MARKET_SIZE 2

#define LABOR_MARKET_EMPTY 1
#define LABOR_MARKET_LOW 5
#define LABOR_MARKET_MED 12
#define LABOR_MARKET_FULL 28

#include <array>
#include <list>
#include <map>
#include <string>

#include "lincity/transport.h"
#include "modules.h"

class MarketConstructionGroup : public ConstructionGroup
{
public:
    MarketConstructionGroup(
        const char *name,
        unsigned short no_credit,
        unsigned short group,
        unsigned short size, int colour,
        int cost_mul, int bul_cost, int market_chance,
        int cost, int tech, int range) : ConstructionGroup(name, no_credit, group, size, colour, cost_mul, bul_cost, market_chance,
                                                           cost, tech, range, 2 /*mps_pages*/
                                         )
    {
        commodityRuleCount[STUFF_FOOD].maxload = MAX_FOOD_IN_MARKET;
        commodityRuleCount[STUFF_FOOD].take = true;
        commodityRuleCount[STUFF_FOOD].give = true;
        commodityRuleCount[STUFF_LABOR].maxload = MAX_LABOR_IN_MARKET;
        commodityRuleCount[STUFF_LABOR].take = true;
        commodityRuleCount[STUFF_LABOR].give = true;
        commodityRuleCount[STUFF_COAL].maxload = MAX_COAL_IN_MARKET;
        commodityRuleCount[STUFF_COAL].take = true;
        commodityRuleCount[STUFF_COAL].give = true;
        commodityRuleCount[STUFF_GOODS].maxload = MAX_GOODS_IN_MARKET;
        commodityRuleCount[STUFF_GOODS].take = true;
        commodityRuleCount[STUFF_GOODS].give = true;
        commodityRuleCount[STUFF_ORE].maxload = MAX_ORE_IN_MARKET;
        commodityRuleCount[STUFF_ORE].take = true;
        commodityRuleCount[STUFF_ORE].give = true;
        commodityRuleCount[STUFF_STEEL].maxload = MAX_STEEL_IN_MARKET;
        commodityRuleCount[STUFF_STEEL].take = true;
        commodityRuleCount[STUFF_STEEL].give = true;
        commodityRuleCount[STUFF_WASTE].maxload = MAX_WASTE_IN_MARKET;
        commodityRuleCount[STUFF_WASTE].take = true;
        commodityRuleCount[STUFF_WASTE].give = true;
        commodityRuleCount[STUFF_WATER].maxload = MAX_WATER_IN_MARKET;
        commodityRuleCount[STUFF_WATER].take = true;
        commodityRuleCount[STUFF_WATER].give = true;
    };
    // overriding method that creates a Market
    virtual Construction *createConstruction(int x, int y);
};

extern MarketConstructionGroup marketConstructionGroup;

class Market : public RegisteredConstruction<Market>
{ // Market inherits from Construction
public:
    Market(int x, int y, ConstructionGroup *cstgrp) : RegisteredConstruction<Market>(x, y)
    {
        this->constructionGroup = cstgrp;
        init_resources();
        waste_fire_frit = world(x, y)->createframe();
        waste_fire_frit->resourceGroup = ResourceGroup::resMap["Fire"];
        waste_fire_frit->move_x = 0;
        waste_fire_frit->move_y = 0;
        waste_fire_frit->frame = -1;
        // local copy of commodityRuCount
        commodityRuleCount = constructionGroup->commodityRuleCount;
        setCommodityRulesSaved(&commodityRuleCount);
        initialize_commodities();
        this->labor = LABOR_MARKET_EMPTY;
        this->anim = 0;
        this->busy = 0;
        this->working_days = 0;
        this->market_ratio = 0;
        this->start_burning_waste = false;
        this->waste_fire_anim = 0;
        // set the Searchrange of this Market
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
        this->cover();

        commodityMaxCons[STUFF_LABOR] = 100 * LABOR_MARKET_FULL;
        commodityMaxCons[STUFF_WASTE] = 100 * ((7 * MAX_WASTE_IN_MARKET) / 10);
    }
    virtual ~Market()
    {
        world(x, y)->killframe(waste_fire_frit);
    }

    virtual void update() override;
    virtual void report() override;
    virtual void animate() override;
    void cover();
    void toggleEvacuation();

    int xs, ys, xe, ye;
    int working_days, busy;
    int labor;
    std::array<CommodityRule, STUFF_COUNT> commodityRuleCount;
    int anim;
    int market_ratio;
    bool start_burning_waste;
    std::list<ExtraFrame>::iterator waste_fire_frit;
    int waste_fire_anim;
};
