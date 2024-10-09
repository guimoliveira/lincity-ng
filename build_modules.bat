cmd /c em++ ^
    -O2 ^
    -I src\ ^
    src\lincity\modules\all_modules.cpp ^
    src\lincity\modules\blacksmith.cpp ^
    src\lincity\modules\coal_power.cpp ^
    src\lincity\modules\coalmine.cpp ^
    src\lincity\modules\commune.cpp ^
    src\lincity\modules\cricket.cpp ^
    src\lincity\modules\fire.cpp ^
    src\lincity\modules\firestation.cpp ^
    src\lincity\modules\health_centre.cpp ^
    src\lincity\modules\heavy_industry.cpp ^
    src\lincity\modules\light_industry.cpp ^
    src\lincity\modules\market.cpp ^
    src\lincity\modules\mill.cpp ^
    src\lincity\modules\monument.cpp ^
    src\lincity\modules\oremine.cpp ^
    src\lincity\modules\organic_farm.cpp ^
    src\lincity\modules\parkland.cpp ^
    src\lincity\modules\port.cpp ^
    src\lincity\modules\pottery.cpp ^
    src\lincity\modules\power_line.cpp ^
    src\lincity\modules\recycle.cpp ^
    src\lincity\modules\residence.cpp ^
    src\lincity\modules\rocket_pad.cpp ^
    src\lincity\modules\school.cpp ^
    src\lincity\modules\shanty.cpp ^
    src\lincity\modules\solar_power.cpp ^
    src\lincity\modules\substation.cpp ^
    src\lincity\modules\tip.cpp ^
    src\lincity\modules\track_road_rail.cpp ^
    src\lincity\modules\university.cpp ^
    src\lincity\modules\water.cpp ^
    src\lincity\modules\waterwell.cpp ^
    src\lincity\modules\windmill.cpp ^
    src\lincity\modules\windpower.cpp ^
    -sUSE_SDL=2 ^
    -c

cmd /c emar rcs bin/modules.a *.o

del /Q *.o