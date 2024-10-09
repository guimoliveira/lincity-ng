#ifndef __MAP_EDIT_HPP__
#define __MAP_EDIT_HPP__

class MapPoint;

void editMap(MapPoint point, int button);
void check_bulldoze_area(int x, int y);
void resetLastMessage();

extern int monument_bul_flag;
extern int river_bul_flag;
extern int shanty_bul_flag;
extern int build_bridge_flag;

#endif
