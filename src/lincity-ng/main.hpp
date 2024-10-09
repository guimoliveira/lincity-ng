#ifndef __MAIN_HPP__
#define __MAIN_HPP__

class Painter;

enum MainState
{
    UNDEFINED,
    MAINMENU,
    INGAME,
    QUIT,
    RESTART
};

/** global instance of currently used painter object.
 * Note: Don't use this in your components, but the one passed in the draw
 *       function!
 */
extern Painter *painter;

#endif
