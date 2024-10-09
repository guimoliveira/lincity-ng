#ifndef __TOOLTIPMANAGER_HPP__
#define __TOOLTIPMANAGER_HPP__

#include <SDL.h>   
#include <string>        
#include <vector>        

#include "Child.hpp"     
#include "Component.hpp" 
#include "Event.hpp"     

class Vector2;
class XmlReader;

static const Uint32 TOOLTIP_TIME = 500;

/**
 * @class TooltipManager
 */
class TooltipManager : public Component
{
public:
    TooltipManager();
    ~TooltipManager();

    void parse(XmlReader& reader);

    void resize(float width, float height);
    void event(const Event& event);
    bool opaque(const Vector2& pos) const;

    void showTooltip(const std::string& text, const Vector2& pos);

private:
    Child& comp_tooltip()
    {
        return childs[0];
    }
};

/// global TooltipManager instance
extern TooltipManager* tooltipManager;

#endif