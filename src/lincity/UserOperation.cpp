#include "UserOperation.h"

#include <stddef.h>
#include <iostream>
#include <sstream>

#include "engglobs.h"
#include "groups.h"
#include "lin-city.h"
#include "lintypes.h"
#include "tinygettext/gettext.hpp"
#include "world.h"

static int last_warning_message_group = 0;

UserOperation::UserOperation()
{
    constructionGroup = NULL;
    action = ACTION_QUERY;
    helpName = _("query");
}

UserOperation::~UserOperation() {}

extern void ok_dial_box(const char *, int, const char *);

bool UserOperation::is_allowed_here(int x, int y, bool warning)
{
    switch (action)
    {
    case ACTION_QUERY:
        return world.is_visible(x, y);
    case ACTION_BUILD:
    {
        if (!(world.is_visible(x, y) &&
              world.is_visible(x + constructionGroup->size - 1, y + constructionGroup->size - 1)) ||
            (constructionGroup->tech > tech_level))
        {
            return false;
        }

        bool msg = (warning && (last_warning_message_group != constructionGroup->group));

        msg = constructionGroup->is_allowed_here(x, y, msg);
        if (warning)
        {
            if (!msg)
            {
                last_warning_message_group = constructionGroup->group;
            }
            else
            {
                last_warning_message_group = 0;
            }
        }
        return msg;
    }
    case ACTION_BULLDOZE:
        // The cursor never tells about problems with bulldozer
        // check_bulldoze_area in MapEdit is careful anyways
        return false;
    case ACTION_EVACUATE:
        return (world.is_visible(x, y) && world(x, y)->reportingConstruction &&
                !(world(x, y)->reportingConstruction->flags & FLAG_NEVER_EVACUATE));
    case ACTION_FLOOD:
        return (world.is_visible(x, y) && world(x, y)->is_bare());
    default:
        std::cout << "default in UserOperation.action" << std::endl;
        return false;
    }
    return false;
}

bool UserOperation::enoughTech(void)
{
    return ((action != ACTION_BUILD) || (
                                            //(action == ACTION_BUILD) &&
                                            (tech_level >= constructionGroup->tech * MAX_TECH_LEVEL / 1000)));
}

float UserOperation::requiredTech()
{
    return 0.1 * ((constructionGroup ? constructionGroup->tech : 0));
}

/* replacement of ButtonPanel::createTooltip*/
std::string UserOperation::createTooltip(bool root /* = true */)
{
    std::stringstream tooltip;
    switch (action)
    {
    case ACTION_QUERY:
        tooltip << _("Query Tool");
        break;
    case ACTION_BUILD:
        tooltip << constructionGroup->getName();
        switch (constructionGroup->group)
        {
        case GROUP_RESIDENCE_LL:
            tooltip << _(": 50 tenants, low birthrate, high deathrate");
            break;
        case GROUP_RESIDENCE_ML:
            tooltip << _(": 100 tenants, high birthrate, low deathrate");
            break;
        case GROUP_RESIDENCE_HL:
            tooltip << _(": 200 tenants, high birthrate, high deathrate");
            break;
        case GROUP_RESIDENCE_LH:
            tooltip << _(": 100 tenants, low birthrate, high deathrate");
            break;
        case GROUP_RESIDENCE_MH:
            tooltip << _(": 200 tenants, high birthrate, low deathrate");
            break;
        case GROUP_RESIDENCE_HH:
            tooltip << _(": 400 tenants, high birthrate, high deathrate");
        }
        break;
    case ACTION_BULLDOZE:
        tooltip << _("Bulldozer");
        break;
    case ACTION_EVACUATE:
        tooltip << _("Evacuate");
        break;
    case ACTION_FLOOD:
        tooltip << _("Water");
        break;
    default:
        tooltip << "unknown useroperation";
    }
    if (!root)
    {
        tooltip << " [" << _("Click right for help.") << "]";
    }
    return tooltip.str();
}

unsigned short UserOperation::cursorSize(void)
{
    if (action == ACTION_QUERY)
    {
        return 0;
    }
    else if (action == ACTION_BUILD)
    {
        return userOperation->constructionGroup->size;
    }
    else
    {
        return 1;
    }
}
