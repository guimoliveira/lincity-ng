#include "cricket.h"

#include <list>     
#include <vector>   

#include "modules.h"

// cricket place:
CricketConstructionGroup cricketConstructionGroup(
    N_("Basketball court"),
     FALSE,                     /* need credit? */
     GROUP_CRICKET,
     GROUP_CRICKET_SIZE,
     GROUP_CRICKET_COLOUR,
     GROUP_CRICKET_COST_MUL,
     GROUP_CRICKET_BUL_COST,
     GROUP_CRICKET_FIREC,
     GROUP_CRICKET_COST,
     GROUP_CRICKET_TECH,
     GROUP_CRICKET_RANGE
);

Construction *CricketConstructionGroup::createConstruction(int x, int y) {
    return new Cricket(x, y, this);
}

void Cricket::update()
{
    ++daycount;
    if (commodityCount[STUFF_LABOR] >= CRICKET_LABOR
    &&  commodityCount[STUFF_GOODS] >= CRICKET_GOODS
    &&  commodityCount[STUFF_WASTE] + (CRICKET_GOODS / 3) <= MAX_WASTE_AT_CRICKET)
    {
        consumeStuff(STUFF_LABOR, CRICKET_LABOR);
        consumeStuff(STUFF_GOODS, CRICKET_GOODS);
        produceStuff(STUFF_WASTE, CRICKET_GOODS / 3);
        ++covercount;
        ++working_days;
    }
    //monthly update
    if (total_time % 100 == 99) {
        reset_prod_counters();
        busy = working_days;
        working_days = 0;
    }
    /* That's all. Cover is done by different functions every 3 months or so. */
    cricket_cost += CRICKET_RUNNING_COST;
    if(refresh_cover)
    {   cover();}
}

void Cricket::cover()
{
    if(covercount + COVER_TOLERANCE_DAYS < daycount)
    {
        daycount = 0;
        active = false;
        return;
    }
    active = true;
    covercount -= daycount;
    daycount = 0;
    animate_enable = true;
    for(int yy = ys; yy < ye; ++yy)
    {
        for(int xx = xs; xx < xe; ++xx)
        {   world(xx,yy)->flags |= FLAG_CRICKET_COVER;}
    }
}

void Cricket::animate() {
  int& frame = frameIt->frame;
  if(animate_enable && real_time >= anim) {
    anim = real_time + ANIM_THRESHOLD(CRICKET_ANIMATION_SPEED);
    if(++frame >= (int)frameIt->resourceGroup->graphicsInfoVector.size())
    {
      frame = 0;
      animate_enable = false;
    }
  }
}

void Cricket::report()
{
    int i = 0;
    const char* p;

    mps_store_sd(i++,constructionGroup->name, ID);
    mps_store_sfp(i++, N_("busy"), busy);
    // i++;
    list_commodities(&i);
    p = active?N_("Yes"):N_("No");
    mps_store_ss(i++, N_("Public sports"), p);
}
