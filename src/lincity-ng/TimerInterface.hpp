#ifndef __lc_timer_h__
#define __lc_timer_h__

#include <SDL.h> // for Uint32

void reset_start_time();
void get_real_time(void);
void get_real_time_with(Uint32 sdl_tick);

#endif
