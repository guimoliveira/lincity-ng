#include "all_modules.h"

#include <map>
#include <string>

#include "lincity/all_buildings.h"
#include "lincity/lintypes.h"
#include "lincity/resources.hpp"

void initializeModules()
{
    ConstructionGroup::clearGroupMap();
    ConstructionGroup::addConstructionGroup(&fireStationConstructionGroup);
    ConstructionGroup::addConstructionGroup(&healthCentreConstructionGroup);
    ConstructionGroup::addConstructionGroup(&cricketConstructionGroup);
    ConstructionGroup::addConstructionGroup(&potteryConstructionGroup);
    ConstructionGroup::addConstructionGroup(&monumentConstructionGroup);
    ConstructionGroup::addConstructionGroup(&blacksmithConstructionGroup);
    ConstructionGroup::addConstructionGroup(&waterwellConstructionGroup);
    ConstructionGroup::addConstructionGroup(&communeConstructionGroup);
    ConstructionGroup::addConstructionGroup(&windmillConstructionGroup);
    ConstructionGroup::addConstructionGroup(&windpowerConstructionGroup);
    ConstructionGroup::addConstructionGroup(&coal_powerConstructionGroup);
    ConstructionGroup::addConstructionGroup(&solarPowerConstructionGroup);
    ConstructionGroup::addConstructionGroup(&substationConstructionGroup);
    ConstructionGroup::addConstructionGroup(&millConstructionGroup);
    ConstructionGroup::addConstructionGroup(&organic_farmConstructionGroup);
    ConstructionGroup::addConstructionGroup(&residenceLLConstructionGroup);
    ConstructionGroup::addConstructionGroup(&residenceMLConstructionGroup);
    ConstructionGroup::addConstructionGroup(&residenceHLConstructionGroup);
    ConstructionGroup::addConstructionGroup(&residenceLHConstructionGroup);
    ConstructionGroup::addConstructionGroup(&residenceMHConstructionGroup);
    ConstructionGroup::addConstructionGroup(&residenceHHConstructionGroup);
    ConstructionGroup::addConstructionGroup(&schoolConstructionGroup);
    ConstructionGroup::addConstructionGroup(&universityConstructionGroup);
    ConstructionGroup::addConstructionGroup(&trackConstructionGroup);
    ConstructionGroup::addConstructionGroup(&roadConstructionGroup);
    ConstructionGroup::addConstructionGroup(&railConstructionGroup);
    ConstructionGroup::addConstructionGroup(&trackbridgeConstructionGroup);
    ConstructionGroup::addConstructionGroup(&roadbridgeConstructionGroup);
    ConstructionGroup::addConstructionGroup(&railbridgeConstructionGroup);
    ConstructionGroup::addConstructionGroup(&powerlineConstructionGroup);
    ConstructionGroup::addConstructionGroup(&parklandConstructionGroup);
    ConstructionGroup::addConstructionGroup(&parkpondConstructionGroup);
    ConstructionGroup::addConstructionGroup(&oremineConstructionGroup);
    ConstructionGroup::addConstructionGroup(&coalmineConstructionGroup);
    ConstructionGroup::addConstructionGroup(&tipConstructionGroup);
    ConstructionGroup::addConstructionGroup(&recycleConstructionGroup);
    ConstructionGroup::addConstructionGroup(&portConstructionGroup);
    ConstructionGroup::addConstructionGroup(&fireConstructionGroup);
    ConstructionGroup::addConstructionGroup(&industryLightConstructionGroup);
    ConstructionGroup::addConstructionGroup(&industryHeavyConstructionGroup);
    ConstructionGroup::addConstructionGroup(&marketConstructionGroup);
    ConstructionGroup::addConstructionGroup(&rocketPadConstructionGroup);
    ConstructionGroup::addConstructionGroup(&shantyConstructionGroup);

    ConstructionGroup::clearResourcepMap();
    ConstructionGroup::addResourceID("Water", &waterConstructionGroup);
    ConstructionGroup::addResourceID("Green", &bareConstructionGroup);
    ConstructionGroup::addResourceID("Tree", &treeConstructionGroup);
    ConstructionGroup::addResourceID("Tree2", &tree2ConstructionGroup);
    ConstructionGroup::addResourceID("Tree3", &tree3ConstructionGroup);
    ConstructionGroup::addResourceID("Desert", &desertConstructionGroup);

    ConstructionGroup::addResourceID("Blacksmith", &blacksmithConstructionGroup);
    ConstructionGroup::addResourceID("FireStation", &fireStationConstructionGroup);
    ConstructionGroup::addResourceID("Health", &healthCentreConstructionGroup);
    ConstructionGroup::addResourceID("SportsCroud", &cricketConstructionGroup);
    ConstructionGroup::addResourceID("Pottery", &potteryConstructionGroup);
    ConstructionGroup::addResourceID("MonumentConstruction", &monumentConstructionGroup);
    new ResourceGroup("Monument");
    ConstructionGroup::addResourceID("Waterwell", &waterwellConstructionGroup);
    ConstructionGroup::addResourceID("Commune", &communeConstructionGroup);
    ConstructionGroup::addResourceID("WindMill", &windmillConstructionGroup);
    ConstructionGroup::addResourceID("WindMillHTech", &windpowerConstructionGroup);
    new ResourceGroup("WindMillHTechRG");
    new ResourceGroup("WindMillHTechG");
    ConstructionGroup::addResourceID("PowerCoalEmpty", &coal_powerConstructionGroup);
    new ResourceGroup("PowerCoalLow");
    new ResourceGroup("PowerCoalMed");
    new ResourceGroup("PowerCoalFull");
    ConstructionGroup::addResourceID("PowerSolar", &solarPowerConstructionGroup);
    new ResourceGroup("Substation");
    ConstructionGroup::addResourceID("SubstationOff", &substationConstructionGroup);
    new ResourceGroup("SubstationOn");
    ConstructionGroup::addResourceID("Mill", &millConstructionGroup);
    ConstructionGroup::addResourceID("Farm", &organic_farmConstructionGroup);
    ConstructionGroup::addResourceID("ResidentialLowLow", &residenceLLConstructionGroup);
    ConstructionGroup::addResourceID("ResidentialMedLow", &residenceMLConstructionGroup);
    ConstructionGroup::addResourceID("ResidentialHighLow", &residenceHLConstructionGroup);
    ConstructionGroup::addResourceID("ResidentialLow", &residenceLHConstructionGroup);
    ConstructionGroup::addResourceID("ResidentialMedHigh", &residenceMHConstructionGroup);
    ConstructionGroup::addResourceID("ResidentialHighHigh", &residenceHHConstructionGroup);
    ConstructionGroup::addResourceID("School", &schoolConstructionGroup);
    ConstructionGroup::addResourceID("University", &universityConstructionGroup);
    ConstructionGroup::addResourceID("Track", &trackConstructionGroup);
    ConstructionGroup::addResourceID("Road", &roadConstructionGroup);
    ConstructionGroup::addResourceID("Rail", &railConstructionGroup);
    ConstructionGroup::addResourceID("TrackBridge", &trackbridgeConstructionGroup);
    ConstructionGroup::addResourceID("RoadBridge", &roadbridgeConstructionGroup);
    ConstructionGroup::addResourceID("RailBridge", &railbridgeConstructionGroup);
    ConstructionGroup::addResourceID("PowerLine", &powerlineConstructionGroup);
    ConstructionGroup::addResourceID("ParklandPlane", &parklandConstructionGroup);
    ConstructionGroup::addResourceID("ParklandLake", &parkpondConstructionGroup);
    ConstructionGroup::addResourceID("OreMine", &oremineConstructionGroup);
    ConstructionGroup::addResourceID("CoalMine", &coalmineConstructionGroup);
    new ResourceGroup("CoalMineLow");
    new ResourceGroup("CoalMineMed");
    new ResourceGroup("CoalMineFull");
    ConstructionGroup::addResourceID("Tip", &tipConstructionGroup);
    ConstructionGroup::addResourceID("Recycle", &recycleConstructionGroup);
    ConstructionGroup::addResourceID("Harbor", &portConstructionGroup);
    ConstructionGroup::addResourceID("Fire", &fireConstructionGroup);
    new ResourceGroup("FireWasteLand");
    ConstructionGroup::addResourceID("IndustryLight", &industryLightConstructionGroup);
    new ResourceGroup("IndustryLightQ");
    new ResourceGroup("IndustryLightL");
    new ResourceGroup("IndustryLightM");
    new ResourceGroup("IndustryLightH");
    ConstructionGroup::addResourceID("IndustryHigh", &industryHeavyConstructionGroup);
    new ResourceGroup("IndustryHighL");
    new ResourceGroup("IndustryHighM");
    new ResourceGroup("IndustryHighH");
    ConstructionGroup::addResourceID("MarketEmpty", &marketConstructionGroup);
    new ResourceGroup("MarketLow");
    new ResourceGroup("MarketMed");
    new ResourceGroup("MarketFull");
    ConstructionGroup::addResourceID("Rocket", &rocketPadConstructionGroup);
    ConstructionGroup::addResourceID("Shanty", &shantyConstructionGroup);

    // resources for extra sprites
    new ResourceGroup("ChildOnSwing"); // used at School
    new ResourceGroup("BlackSmoke");   // used at Coalpower Station
    new ResourceGroup("GraySmoke");    // used at light Industry

    // resources for vehicles
    new ResourceGroup("BlueCar");
    new ResourceGroup("RedCar");
    new ResourceGroup("YellowCar");
    new ResourceGroup("GreenCar");
    new ResourceGroup("GrayCar");
    new ResourceGroup("RedTruck");
    new ResourceGroup("GreenTruck");
    new ResourceGroup("WhiteTruck");
    new ResourceGroup("YellowTruck");
    new ResourceGroup("BlueTruck");
    ResourceGroup::resMap["BlueCar"]->is_vehicle = true;
    ResourceGroup::resMap["RedCar"]->is_vehicle = true;
    ResourceGroup::resMap["YellowCar"]->is_vehicle = true;
    ResourceGroup::resMap["GreenCar"]->is_vehicle = true;
    ResourceGroup::resMap["GrayCar"]->is_vehicle = true;
    ResourceGroup::resMap["RedTruck"]->is_vehicle = true;
    ResourceGroup::resMap["GreenTruck"]->is_vehicle = true;
    ResourceGroup::resMap["WhiteTruck"]->is_vehicle = true;
    ResourceGroup::resMap["YellowTruck"]->is_vehicle = true;
    ResourceGroup::resMap["BlueTruck"]->is_vehicle = true;
}
