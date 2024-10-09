#include "all_buildings.h"

#include "groups.h"
#include "tinygettext/gettext.hpp"

TileConstructionGroup waterConstructionGroup(
    N_("Water"),
    false, // need credit
    GROUP_WATER,
    1, // tilesize is always 1
    GROUP_WATER_COLOUR,
    GROUP_WATER_COST_MUL,
    GROUP_WATER_BUL_COST,
    GROUP_WATER_FIREC,
    GROUP_WATER_COST,
    GROUP_WATER_TECH,
    0 // range tiles is 0
);

TileConstructionGroup bareConstructionGroup(
    N_("Empty"),
    false, // need credit
    GROUP_BARE,
    1, // tilesize is always 1
    GROUP_BARE_COLOUR,
    GROUP_BARE_COST_MUL,
    GROUP_BARE_BUL_COST,
    GROUP_BARE_FIREC,
    GROUP_BARE_COST,
    GROUP_BARE_TECH,
    0 // range tiles is 0
);

TileConstructionGroup desertConstructionGroup(
    N_("Desert"),
    false, // need credit
    GROUP_DESERT,
    1, // tilesize is always 1
    GROUP_DESERT_COLOUR,
    GROUP_DESERT_COST_MUL,
    GROUP_DESERT_BUL_COST,
    GROUP_DESERT_FIREC,
    GROUP_DESERT_COST,
    GROUP_DESERT_TECH,
    0 // range tiles is 0
);

TileConstructionGroup treeConstructionGroup(
    N_("Tree"),
    false, // need credit
    GROUP_TREE,
    1, // tilesize is always 1
    GROUP_TREE_COLOUR,
    GROUP_TREE_COST_MUL,
    GROUP_TREE_BUL_COST,
    GROUP_TREE_FIREC,
    GROUP_TREE_COST,
    GROUP_TREE_TECH,
    0 // range tiles is 0
);

TileConstructionGroup tree2ConstructionGroup(
    N_("Trees"),
    false, // need credit
    GROUP_TREE2,
    1, // tilesize is always 1
    GROUP_TREE2_COLOUR,
    GROUP_TREE2_COST_MUL,
    GROUP_TREE2_BUL_COST,
    GROUP_TREE2_FIREC,
    GROUP_TREE2_COST,
    GROUP_TREE2_TECH,
    0 // range tiles is 0
);

TileConstructionGroup tree3ConstructionGroup(
    N_("Forest"),
    false, // need credit
    GROUP_TREE3,
    1, // tilesize is always 1
    GROUP_TREE3_COLOUR,
    GROUP_TREE3_COST_MUL,
    GROUP_TREE3_BUL_COST,
    GROUP_TREE3_FIREC,
    GROUP_TREE3_COST,
    GROUP_TREE3_TECH,
    0 // range tiles is 0
);

// Dont use this one after all maptiles are no constructions
Construction *TileConstructionGroup::createConstruction(int, int)
{
    return 0;
}
