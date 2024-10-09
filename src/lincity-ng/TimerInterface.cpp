#include "TimerInterface.hpp"

#include <SDL.h>

long real_time = 0;
long start_time = 0;

void reset_start_time()
{
    start_time = SDL_GetTicks();
}

void get_real_time()
{
    real_time = SDL_GetTicks() - start_time;
}

void get_real_time_with(Uint32 sdl_tick)
{
    real_time = sdl_tick - start_time;
}
