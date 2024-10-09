/* This file is for loading old games (before NG 1.91)
 * and convert them to new format + data structure
 */

#include <stdio.h>

#include "engglobs.h"
#include "groups.h"
#include "gui_interface/shared_globals.h"
#include "init_game.h"
#include "lintypes.h"
#include "modules/all_modules.h"
#include "stats.h"
#include "tinygettext/gettext.hpp"
#include "world.h"

#include <string.h>
#include <cstdlib>

#if defined(HAVE_DIRENT_H)
#include <dirent.h>

#define NAMLEN(dirent) strlen((dirent)->d_name)
#else
#define dirent direct
#define NAMLEN(dirent) (dirent)->d_namlen
#if defined(HAVE_SYS_NDIR_H)
#include <sys/ndir.h>
#endif
#if defined(HAVE_SYS_DIR_H)
#include <sys/dir.h>
#endif
#if defined(HAVE_NDIR_H)
#include <ndir.h>
#endif
#endif

#include "../lincity-ng/Config.hpp"

#include "gui_interface/pbar_interface.h"
#include "lin-city.h"
#include "lincity-ng/ErrorInterface.hpp"
#include "loadsave.h"
#include "old_ldsvguts.h"

#define SI_BLACK 252
#define SI_RED 253
#define SI_GREEN 254
#define SI_YELLOW 255

/* Extern resources */
extern void ok_dial_box(const char *, int, const char *);
extern void prog_box(const char *, int);

extern void print_total_money(void);
// extern int count_groups(int);
extern void reset_animation_times(void);

/* ---------------------------------------------------------------------- *
 * Private Fn Prototypes
 * ---------------------------------------------------------------------- */
void upgrade_to_v2(void);
void check_endian(void);
void eswap32(int *);
void eswap16(unsigned short *);

/* ---------------------------------------------------------------------- *
 * Public functions
 * ---------------------------------------------------------------------- */

void load_city_old(char *cname)
{
    // No support for the old format.
}

void check_endian(void)
{
    static int flag = 0;
    char *cs;
    int t, x, y;
    t = 0;
    cs = (char *)&t;
    *cs = 1;
    if (t == 1) /* little endian */
        return;
    if (flag == 0)
    {
        flag = 1;
    }
    for (y = 0; y < world.len(); y++)
    {
        for (x = 0; x < world.len(); x++)
        {
            // eswap32(&(map.info[x][y].population));
            eswap32(&(world(x, y)->flags));
            if (sizeof(short) == 2)
            {
                eswap16(&(world(x, y)->coal_reserve));
                eswap16(&(world(x, y)->ore_reserve));
            }
            else if (sizeof(short) == 4)
            {
                eswap32((int *)&(world(x, y)->coal_reserve));
                eswap32((int *)&(world(x, y)->ore_reserve));
            }
            else
            {
                /* prevent gcc warning on amd64: argument 2 has type 'long unsigned int' !!! */
                printf("Strange size (%d) for short, please mail me.\n", (int)sizeof(short));
            }
            /*
                        eswap32(&(MP_INFO(x, y).int_1));
                        eswap32(&(MP_INFO(x, y).int_2));
                        eswap32(&(MP_INFO(x, y).int_3));
                        eswap32(&(MP_INFO(x, y).int_4));
                        eswap32(&(MP_INFO(x, y).int_5));
                        eswap32(&(MP_INFO(x, y).int_6));
                        eswap32(&(MP_INFO(x, y).int_7));
            */
        }
    }
}

void eswap32(int *i)
{
    char *cs, c1, c2, c3, c4;
    cs = (char *)i;
    c1 = *cs;
    c2 = *(cs + 1);
    c3 = *(cs + 2);
    c4 = *(cs + 3);
    *(cs++) = c4;
    *(cs++) = c3;
    *(cs++) = c2;
    *cs = c1;
}

void eswap16(unsigned short *i)
{
    char *cs, c1, c2;
    cs = (char *)i;
    c1 = *cs;
    c2 = *(cs + 1);
    *(cs++) = c2;
    *cs = c1;
}

void upgrade_to_v2(void)
{
    // Follow order and logic of new_city
    int x, y;

    global_mountainity = 10 + rand() % 300;

    // Grey border (not visible on the map, x = 0 , x = 99, y = 0, y = 99)
    for (x = 0; x < world.len(); x++)
        for (y = 0; y < world.len(); y++)
        {
            world(x, y)->ground.altitude = 0;
            if (!world(x, y)->is_bare())
            {
                /* be nice, put water under all existing builings / farms / parks ... */
                /* This may change according to global_aridity and distance_to_river */
                world(x, y)->flags |= FLAG_HAS_UNDERGROUND_WATER;
            }
        }

    /* Let 10 years in game time to put waterwells where needed, then starvation will occur */
    deadline = total_time + 1200 * 10;
    flag_warning = true; // warn player.

    setup_land();
}
