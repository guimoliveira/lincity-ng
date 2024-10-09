em++ ^
    bin\tinygettext.o ^
    bin\gui.a ^
    bin\modules.a ^
    bin\lincity.a ^
    bin\ng.a ^
    -o out/game.html ^
    --shell-file game.html ^
    --preload-file data ^
    -sEXPORTED_FUNCTIONS="['_malloc', '_main']" ^
    -sEXPORTED_RUNTIME_METHODS="['FS']" ^
    -sUSE_SDL=2 ^
    -sUSE_SDL_GFX=2 ^
    -sUSE_SDL_IMAGE=2 ^
    -sUSE_SDL_TTF=2 ^
    -sSDL2_MIXER_FORMATS=[ogg,wav] ^
	-sUSE_SDL_MIXER=2 ^
	-sUSE_OGG=1 ^
    -sUSE_ZLIB=1 ^
    -sFULL_ES2 ^
    -sALLOW_MEMORY_GROWTH ^
    -sERROR_ON_UNDEFINED_SYMBOLS=0 ^
    -sNO_DISABLE_EXCEPTION_CATCHING ^
    --use-preload-plugins ^
    -lidbfs.js ^
    -ferror-limit=0