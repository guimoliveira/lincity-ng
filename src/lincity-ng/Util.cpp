#include "Util.hpp"

#include "CheckButton.hpp"
#include "gui/Button.hpp"
#include "gui/Component.hpp"
#include "gui/Paragraph.hpp"
#include "gui/SwitchComponent.hpp"

#ifdef DEBUG
#include <stdexcept>
#include <sstream>
#include <typeinfo>
#endif

template <typename T>
void findComponent(T **result, Component &tree, const std::string &name)
{
    Component *component = tree.findComponent(name);
#ifdef DEBUG
    if (!component)
    {
        std::stringstream msg;
        msg << "GUI file didn't define '" << name << "' (type "
            << typeid(T).name() << ")";
        throw std::runtime_error(msg.str());
    }
#endif
    T *casted_component = dynamic_cast<T *>(component);
#ifdef DEBUG
    if (!casted_component)
    {
        std::stringstream msg;
        msg << "Component '" << name << "' is of type "
            << typeid(*component).name() << " but "
            << typeid(T).name() << " is expected.";
        throw std::runtime_error(msg.str());
    }
#endif
    *result = casted_component;
}

Button *getButton(Component &tree, const std::string &name)
{
    Button *result;
    findComponent(&result, tree, name);
    return result;
}
CheckButton *getCheckButton(Component &tree, const std::string &name)
{
    CheckButton *result;
    findComponent(&result, tree, name);
    return result;
}

Paragraph *getParagraph(Component &tree, const std::string &name)
{
    Paragraph *result;
    findComponent(&result, tree, name);
    return result;
}

SwitchComponent *getSwitchComponent(Component &tree, const std::string &name)
{
    SwitchComponent *result;
    findComponent(&result, tree, name);
    return result;
}
