#ifndef CONSTRUCTION_MANAGER_H__
#define CONSTRUCTION_MANAGER_H__

#include <map> // for map

class Construction;
class ConstructionRequest;

class ConstructionManager
{
public:
    // NOTE: no synchronization is performed
    static void submitRequest(ConstructionRequest *request);
    static void executeRequest(ConstructionRequest *request);
    static void executePendingRequests();
    static void clearRequests();

private:
    static std::map<Construction *, ConstructionRequest *> pendingRequests;
};

/* Usage:
    // suicide within a construction:
    ConstructionManager::submitRequest(new ConstructionDeletionRequest(this));
*/

#endif
