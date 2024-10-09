#include "water.h"

#include <string>

#include "modules.h"
#include "modules_interfaces.h"

void mps_water(int x, int y)
{
    int i;
    const char *p;

    i = 0;
    mps_store_sdd(i++, waterConstructionGroup.name, x, y);
    i++;

    if (world(x, y)->flags & FLAG_IS_LAKE)
    {
        p = N_("Lake");
    }
    else if (world(x, y)->flags & FLAG_IS_RIVER)
    {
        p = N_("River");
    }
    else
    {
        p = N_("Pond");
    }
    mps_store_title(i++, p);
}
