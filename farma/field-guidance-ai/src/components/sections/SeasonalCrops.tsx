import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Calendar, 
  Thermometer, 
  Droplets,
  Sun,
  Cloud,
  Snowflake,
  Leaf,
  Sprout,
  Clock
} from "lucide-react";

interface SeasonalCrop {
  id: string;
  name: string;
  season: "kharif" | "rabi" | "zaid";
  sowingPeriod: string;
  harvestPeriod: string;
  duration: string;
  temperature: string;
  rainfall: string;
  yield: string;
  marketPrice: string;
  profitability: "high" | "medium" | "low";
  regions: string[];
  keyTips: string[];
}

const seasonalCropsData: SeasonalCrop[] = [
  // Kharif Crops (Monsoon - June to October)
  {
    id: "1",
    name: "Rice",
    season: "kharif",
    sowingPeriod: "June - July",
    harvestPeriod: "November - December",
    duration: "120-150 days",
    temperature: "20-35°C",
    rainfall: "1000-2000mm",
    yield: "4-6 tons/ha",
    marketPrice: "₹25-30/kg",
    profitability: "medium",
    regions: ["Punjab", "Haryana", "West Bengal", "Andhra Pradesh"],
    keyTips: [
      "Ensure proper field leveling",
      "Maintain 2-3 cm water level",
      "Apply organic matter before transplanting",
      "Monitor for brown plant hopper"
    ]
  },
  {
    id: "2",
    name: "Cotton",
    season: "kharif",
    sowingPeriod: "May - June",
    harvestPeriod: "October - December",
    duration: "150-180 days",
    temperature: "25-35°C",
    rainfall: "500-1000mm",
    yield: "2-3 tons/ha",
    marketPrice: "₹60-80/kg",
    profitability: "high",
    regions: ["Gujarat", "Maharashtra", "Telangana", "Punjab"],
    keyTips: [
      "Use certified BT cotton seeds",
      "Deep plowing before sowing",
      "Install pheromone traps for bollworm",
      "Adequate spacing between plants"
    ]
  },
  {
    id: "3",
    name: "Sugarcane",
    season: "kharif",
    sowingPeriod: "March - July",
    harvestPeriod: "December - March",
    duration: "300-365 days",
    temperature: "20-35°C",
    rainfall: "1000-1500mm",
    yield: "70-100 tons/ha",
    marketPrice: "₹3-4/kg",
    profitability: "high",
    regions: ["Uttar Pradesh", "Maharashtra", "Karnataka", "Tamil Nadu"],
    keyTips: [
      "Use disease-free setts",
      "Maintain proper row spacing",
      "Earthing up at 4-5 months",
      "Harvest at proper maturity"
    ]
  },
  // Rabi Crops (Winter - November to April)
  {
    id: "4",
    name: "Wheat",
    season: "rabi",
    sowingPeriod: "November - December",
    harvestPeriod: "April - May",
    duration: "120-140 days",
    temperature: "10-25°C",
    rainfall: "300-400mm",
    yield: "4-5 tons/ha",
    marketPrice: "₹20-25/kg",
    profitability: "medium",
    regions: ["Punjab", "Haryana", "Uttar Pradesh", "Madhya Pradesh"],
    keyTips: [
      "Timely sowing is crucial",
      "Use certified seeds",
      "Apply nitrogen in split doses",
      "Monitor for rust diseases"
    ]
  },
  {
    id: "5",
    name: "Mustard",
    season: "rabi",
    sowingPeriod: "October - November",
    harvestPeriod: "February - March",
    duration: "100-120 days",
    temperature: "15-25°C",
    rainfall: "200-400mm",
    yield: "1.5-2.5 tons/ha",
    marketPrice: "₹50-70/kg",
    profitability: "high",
    regions: ["Rajasthan", "Haryana", "Uttar Pradesh", "Madhya Pradesh"],
    keyTips: [
      "Ensure proper drainage",
      "Use recommended seed rate",
      "Control aphids during flowering",
      "Harvest when pods turn brown"
    ]
  },
  {
    id: "6",
    name: "Chickpea",
    season: "rabi",
    sowingPeriod: "October - November",
    harvestPeriod: "March - April",
    duration: "90-120 days",
    temperature: "15-25°C",
    rainfall: "200-400mm",
    yield: "2-3 tons/ha",
    marketPrice: "₹80-120/kg",
    profitability: "high",
    regions: ["Madhya Pradesh", "Rajasthan", "Uttar Pradesh", "Maharashtra"],
    keyTips: [
      "Rhizobium inoculation of seeds",
      "Avoid waterlogging",
      "Control pod borer during pod formation",
      "Harvest when pods rattle"
    ]
  },
  // Zaid Crops (Summer - March to June)
  {
    id: "7",
    name: "Watermelon",
    season: "zaid",
    sowingPeriod: "February - March",
    harvestPeriod: "May - June",
    duration: "90-100 days",
    temperature: "25-35°C",
    rainfall: "Irrigation required",
    yield: "25-40 tons/ha",
    marketPrice: "₹8-15/kg",
    profitability: "high",
    regions: ["Uttar Pradesh", "Rajasthan", "Karnataka", "Andhra Pradesh"],
    keyTips: [
      "Provide adequate irrigation",
      "Use mulching to conserve moisture",
      "Control fruit fly and aphids",
      "Harvest when fruit sounds hollow"
    ]
  },
  {
    id: "8",
    name: "Fodder Maize",
    season: "zaid",
    sowingPeriod: "March - April",
    harvestPeriod: "June - July",
    duration: "75-90 days",
    temperature: "25-35°C",
    rainfall: "Irrigation required",
    yield: "40-60 tons/ha",
    marketPrice: "₹2-3/kg",
    profitability: "medium",
    regions: ["Punjab", "Haryana", "Uttar Pradesh", "Bihar"],
    keyTips: [
      "Frequent irrigation required",
      "Apply nitrogen in split doses",
      "Cut at milk stage for quality fodder",
      "Multiple cuts possible"
    ]
  }
];

const seasonIcons = {
  kharif: Cloud,
  rabi: Snowflake,
  zaid: Sun
};

const seasonColors = {
  kharif: "bg-blue-500 text-white",
  rabi: "bg-purple-500 text-white", 
  zaid: "bg-orange-500 text-white"
};

const profitabilityColors = {
  high: "bg-success text-success-foreground",
  medium: "bg-warning text-warning-foreground",
  low: "bg-secondary text-secondary-foreground"
};

export const SeasonalCrops = () => {
  const [selectedSeason, setSelectedSeason] = useState<string>("all");

  const seasons = [
    { id: "all", name: "All Seasons", icon: Calendar },
    { id: "kharif", name: "Kharif (Monsoon)", icon: Cloud },
    { id: "rabi", name: "Rabi (Winter)", icon: Snowflake },
    { id: "zaid", name: "Zaid (Summer)", icon: Sun }
  ];

  const filteredCrops = selectedSeason === "all" 
    ? seasonalCropsData 
    : seasonalCropsData.filter(crop => crop.season === selectedSeason);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Seasonal Crops</h1>
        <p className="text-muted-foreground">
          Choose the right crops for each season to maximize your farming success
        </p>
      </div>

      {/* Season Filter */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {seasons.map((season) => {
          const Icon = season.icon;
          return (
            <Button
              key={season.id}
              variant={selectedSeason === season.id ? "default" : "outline"}
              onClick={() => setSelectedSeason(season.id)}
              className="h-auto p-4 text-left justify-start hover-lift"
            >
              <Icon className="h-5 w-5 mr-3" />
              <span>{season.name}</span>
            </Button>
          );
        })}
      </div>

      {/* Season Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <Cloud className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="font-semibold text-foreground">Kharif Season</p>
            <p className="text-sm text-muted-foreground">Monsoon crops (June-Oct)</p>
            <p className="text-xs text-blue-500 mt-1">
              {seasonalCropsData.filter(c => c.season === 'kharif').length} crops available
            </p>
          </CardContent>
        </Card>
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <Snowflake className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="font-semibold text-foreground">Rabi Season</p>
            <p className="text-sm text-muted-foreground">Winter crops (Nov-Apr)</p>
            <p className="text-xs text-purple-500 mt-1">
              {seasonalCropsData.filter(c => c.season === 'rabi').length} crops available
            </p>
          </CardContent>
        </Card>
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <Sun className="h-8 w-8 text-orange-500 mx-auto mb-2" />
            <p className="font-semibold text-foreground">Zaid Season</p>
            <p className="text-sm text-muted-foreground">Summer crops (Mar-Jun)</p>
            <p className="text-xs text-orange-500 mt-1">
              {seasonalCropsData.filter(c => c.season === 'zaid').length} crops available
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Crops List */}
      <div className="space-y-6">
        {filteredCrops.map((crop) => {
          const SeasonIcon = seasonIcons[crop.season];
          return (
            <Card key={crop.id} className="card-gradient hover-lift">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <SeasonIcon className="h-6 w-6 text-primary" />
                    <CardTitle className="text-xl">{crop.name}</CardTitle>
                    <Badge className={seasonColors[crop.season]}>
                      {crop.season.toUpperCase()}
                    </Badge>
                    <Badge className={profitabilityColors[crop.profitability]}>
                      {crop.profitability.toUpperCase()} PROFIT
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-success">{crop.marketPrice}</p>
                    <p className="text-sm text-muted-foreground">Market Price</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Timing and Duration */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-subtle rounded-lg">
                    <Sprout className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Sowing Period</p>
                      <p className="font-semibold text-foreground">{crop.sowingPeriod}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gradient-subtle rounded-lg">
                    <Leaf className="h-5 w-5 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Harvest Period</p>
                      <p className="font-semibold text-foreground">{crop.harvestPeriod}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gradient-subtle rounded-lg">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Duration</p>
                      <p className="font-semibold text-foreground">{crop.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Climate Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-gradient-subtle rounded-lg">
                    <Thermometer className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="font-semibold text-foreground">{crop.temperature}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gradient-subtle rounded-lg">
                    <Droplets className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">Rainfall</p>
                      <p className="font-semibold text-foreground">{crop.rainfall}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gradient-subtle rounded-lg">
                    <Sprout className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Expected Yield</p>
                      <p className="font-semibold text-foreground">{crop.yield}</p>
                    </div>
                  </div>
                </div>

                {/* Regions and Tips */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Best Growing Regions</h4>
                    <div className="flex flex-wrap gap-2">
                      {crop.regions.map((region, index) => (
                        <Badge key={index} variant="outline">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Growing Tips</h4>
                    <ul className="space-y-1">
                      {crop.keyTips.slice(0, 3).map((tip, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                          <span className="text-muted-foreground">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredCrops.length === 0 && (
        <Card className="card-gradient">
          <CardContent className="p-8 text-center">
            <Calendar className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No crops found</h3>
            <p className="text-muted-foreground">
              Select a different season to view available crops
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};