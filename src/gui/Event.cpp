
#include "Event.hpp"

#include <SDL.h>    
#include <assert.h> 

Event::Event(SDL_Event& event)
    : inside(true)
{
    switch(event.type) {
        case SDL_KEYUP:
            type = KEYUP;
            keysym = event.key.keysym;
            break;
        case SDL_KEYDOWN:
            type = KEYDOWN;
            keysym = event.key.keysym;
            break;
        case SDL_MOUSEMOTION:
            type = MOUSEMOTION;
            mousepos = Vector2(event.motion.x, event.motion.y);
            mousemove = Vector2(event.motion.xrel, event.motion.yrel);
            mousebuttonstate = event.motion.state;
            break;
        case SDL_MOUSEBUTTONUP:
            type = MOUSEBUTTONUP;
            mousepos = Vector2(event.button.x, event.button.y);
            mousebutton = event.button.button;
            break;
        case SDL_MOUSEBUTTONDOWN:
            type = MOUSEBUTTONDOWN;
            mousepos = Vector2(event.button.x, event.button.y);
            mousebutton = event.button.button;
            break;
        case SDL_MOUSEWHEEL:
            type = MOUSEWHEEL;
            scrolly = event.wheel.y;
            #if SDL_VERSION_ATLEAST(2,26,0)
            mousepos = Vector2(event.wheel.mouseX, event.wheel.mouseY);
            #else
            int x, y;
            SDL_GetMouseState(&x, &y);
            mousepos = Vector2(x, y);
            #endif
            break;
        case SDL_WINDOWEVENT:
            switch(event.window.event) {
            case SDL_WINDOWEVENT_ENTER:
                type = WINDOWENTER;
                break;
            case SDL_WINDOWEVENT_LEAVE:
                type = WINDOWLEAVE;
                break;
            default:
                assert(false);
            }
            break;
        default:
            assert(false);
    }
}

Event::Event(float _elapsedTime)
    : type(UPDATE), inside(false), elapsedTime(_elapsedTime)
{
}