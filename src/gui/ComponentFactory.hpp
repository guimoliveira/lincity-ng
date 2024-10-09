#ifndef __COMPONENT_FACTORY_HPP__
#define __COMPONENT_FACTORY_HPP__

#include <map>
#include <memory>
#include <string>
#include <utility>

const char *GUI_TRANSLATE(const char *msgid);
std::string GUI_TRANSLATE(const std::string &msgid);

class Component;
class XmlReader;

/**
 * @class Factory
 */
class Factory
{
public:
    virtual ~Factory()
    {
    }

    virtual Component *createComponent(XmlReader &reader) = 0;
};

typedef std::map<std::string, Factory *> ComponentFactories;
extern ComponentFactories *component_factories;

/**
 * @note From Matze:
 * Yes I know macros are evil, but in this specific case they save
 * A LOT of typing and evil code duplication.
 * I'll happily accept alternatives if someone can present me one that does
 * not involve typing 4 or more lines for each object class
 */
#define DECLARE_COMPONENT_FACTORY(CLASS)                               \
    class INTERN_##CLASS##Factory : public Factory                     \
    {                                                                  \
    public:                                                            \
        INTERN_##CLASS##Factory()                                      \
        {                                                              \
            if (component_factories == 0)                              \
                component_factories = new ComponentFactories;          \
                                                                       \
            component_factories->insert(std::make_pair(#CLASS, this)); \
        }                                                              \
                                                                       \
        virtual Component *createComponent(XmlReader &reader)          \
        {                                                              \
            std::unique_ptr<CLASS> component(new CLASS());             \
            component->parse(reader);                                  \
            return component.release();                                \
        }                                                              \
    };
#define IMPLEMENT_COMPONENT_FACTORY(CLASS) \
    DECLARE_COMPONENT_FACTORY(CLASS)       \
    INTERN_##CLASS##Factory factory_##CLASS;

#endif