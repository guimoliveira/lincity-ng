cmd /c em++ ^
    -O2 ^
    -I src\ ^
    src\lincity\xmlloadsave.cpp ^
    src\lincity\all_buildings.cpp ^
    src\lincity\commodities.cpp ^
    src\lincity\ConstructionCount.cpp ^
    src\lincity\ConstructionManager.cpp ^
    src\lincity\ConstructionRequest.cpp ^
    src\lincity\engglobs.cpp ^
    src\lincity\engine.cpp ^
    src\lincity\init_game.cpp ^
    src\lincity\lclib.cpp ^
    src\lincity\lintypes.cpp ^
    src\lincity\loadsave.cpp ^
    src\lincity\old_ldsvguts.cpp ^
    src\lincity\resources.cpp ^
    src\lincity\simulate.cpp ^
    src\lincity\stats.cpp ^
    src\lincity\transport.cpp ^
    src\lincity\UserOperation.cpp ^
    src\lincity\Vehicles.cpp ^
    src\lincity\world.cpp ^
    -sUSE_SDL=2 ^
    -c

cmd /c emar rcs bin/lincity.a *.o

del /Q *.o