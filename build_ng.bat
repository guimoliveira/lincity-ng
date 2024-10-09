cmd /c em++ ^
    -O2 ^
    -I src\ ^
    src\lincity-ng\ButtonPanel.cpp ^
    src\lincity-ng\CheckButton.cpp ^
    src\lincity-ng\Config.cpp ^
    src\lincity-ng\Dialog.cpp ^
    src\lincity-ng\EconomyGraph.cpp ^
    src\lincity-ng\ErrorInterface.cpp ^
    src\lincity-ng\Game.cpp ^
    src\lincity-ng\GameView.cpp ^
    src\lincity-ng\HelpWindow.cpp ^
    src\lincity-ng\lc_error.cpp ^
    src\lincity-ng\main.cpp ^
    src\lincity-ng\MainLincity.cpp ^
    src\lincity-ng\MainMenu.cpp ^
    src\lincity-ng\MapEdit.cpp ^
    src\lincity-ng\MiniMap.cpp ^
    src\lincity-ng\Mps.cpp ^
    src\lincity-ng\MpsInterface.cpp ^
    src\lincity-ng\PBar.cpp ^
    src\lincity-ng\PbarInterface.cpp ^
    src\lincity-ng\Permutator.cpp ^
    src\lincity-ng\ScreenInterface.cpp ^
    src\lincity-ng\Sound.cpp ^
    src\lincity-ng\TimerInterface.cpp ^
    src\lincity-ng\Util.cpp ^
    -sUSE_SDL=2 ^
    -c

cmd /c emar rcs bin/ng.a *.o

del /Q *.o