#ifndef __shared_globals_h__
#define __shared_globals_h__

extern int selected_module_cost;

// main screen
extern int main_screen_originx, main_screen_originy;

extern int monthgraph_size;
extern int *monthgraph_pop;
extern int *monthgraph_starve;
extern int *monthgraph_nojobs;
extern int *monthgraph_ppool;

extern int modern_windmill_flag;

extern int cheat_flag;

// modules
#define NUMOF_MODULES 32

void update_avail_modules(int popup);

#endif
