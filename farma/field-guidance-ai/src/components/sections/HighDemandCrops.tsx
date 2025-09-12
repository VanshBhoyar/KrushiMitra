import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  TrendingUp, 
  IndianRupee, 
  Calendar,
  MapPin,
  Thermometer,
  Droplets,
  Clock,
  Sprout
} from "lucide-react";
import highDemandImage from "@/assets/high-demand-crops.jpg";

interface Crop {
  id: string;
  name: string;
  scientificName: string;
  marketPrice: string;
  demand: "high" | "very_high" | "medium";
  season: string;
  duration: string;
  climateRequirement: string;
  waterRequirement: string;
  profitMargin: string;
  marketTrend: "increasing" | "stable" | "decreasing";
  keyBenefits: string[];
  challenges: string[];
  bestRegions: string[];
  investmentRequired: string;
  expectedYield: string;
}

const highDemandCrops: Crop[] = [
  {
    id: "1",
    name: "Quinoa",
    scientificName: "Chenopodium quinoa",
    marketPrice: "₹180-220/kg",
    demand: "very_high",
    season: "Rabi (Winter)",
    duration: "110-120 days",
    climateRequirement: "Cool, dry climate (15-20°C)",
    waterRequirement: "Low (300-400mm)",
    profitMargin: "200-300%",
    marketTrend: "increasing",
    keyBenefits: [
      "High protein content (14-18%)",
      "Gluten-free superfood",
      "Growing export demand",
      "Drought resistant"
    ],
    challenges: [
      "Limited seed availability",
      "Processing requirements",
      "Market awareness needed"
    ],
    bestRegions: ["Rajasthan", "Gujarat", "Haryana", "Punjab"],
    investmentRequired: "₹25,000-30,000/ha",
    expectedYield: "1.5-2.5 tons/ha"
  },
  {
    id: "2",
    name: "Dragon Fruit",
    scientificName: "Hylocereus undatus",
    marketPrice: "₹200-400/kg",
    demand: "very_high",
    season: "Year-round",
    duration: "18-24 months (fruiting starts)",
    climateRequirement: "Tropical/subtropical (20-30°C)",
    waterRequirement: "Medium (500-600mm)",
    profitMargin: "300-500%",
    marketTrend: "increasing",
    keyBenefits: [
      "High market value",
      "Low maintenance after establishment",
      "Year-round production",
      "Rich in antioxidants"
    ],
    challenges: [
      "High initial investment",
      "Climbing support needed",
      "Pest management"
    ],
    bestRegions: ["Karnataka", "Tamil Nadu", "Andhra Pradesh", "Gujarat"],
    investmentRequired: "₹1,50,000-2,00,000/ha",
    expectedYield: "10-15 tons/ha"
  },
  {
    id: "3",
    name: "Saffron",
    scientificName: "Crocus sativus",
    marketPrice: "₹2,50,000-3,00,000/kg",
    demand: "very_high",
    season: "October-November",
    duration: "3-4 years (first harvest)",
    climateRequirement: "Cold, dry summers, mild winters",
    waterRequirement: "Low (rainfall 1000-1500mm)",
    profitMargin: "400-600%",
    marketTrend: "increasing",
    keyBenefits: [
      "World's most expensive spice",
      "High export potential",
      "Medicinal properties",
      "Small land requirement"
    ],
    challenges: [
      "Specific climate requirements",
      "Labor-intensive harvesting",
      "Pest and disease management"
    ],
    bestRegions: ["Kashmir", "Himachal Pradesh", "Uttarakhand"],
    investmentRequired: "₹3,00,000-4,00,000/ha",
    expectedYield: "8-12 kg/ha"
  },
  {
    id: "4",
    name: "Avocado",
    scientificName: "Persea americana",
    marketPrice: "₹300-500/kg",
    demand: "high",
    season: "Year-round (peak: June-September)",
    duration: "3-4 years (fruiting starts)",
    climateRequirement: "Subtropical (20-30°C)",
    waterRequirement: "High (1000-1200mm)",
    profitMargin: "250-400%",
    marketTrend: "increasing",
    keyBenefits: [
      "Superfood with health benefits",
      "Growing urban demand",
      "High nutritional value",
      "Good shelf life"
    ],
    challenges: [
      "Water-intensive crop",
      "Sensitive to temperature",
      "Post-harvest handling"
    ],
    bestRegions: ["Tamil Nadu", "Karnataka", "Kerala", "Maharashtra"],
    investmentRequired: "₹80,000-1,20,000/ha",
    expectedYield: "15-25 tons/ha"
  },
  {
    id: "5",
    name: "Blueberry",
    scientificName: "Vaccinium corymbosum",
    marketPrice: "₹800-1200/kg",
    demand: "high",
    season: "December-March",
    duration: "2-3 years (fruiting starts)",
    climateRequirement: "Cool climate (7-24°C)",
    waterRequirement: "Medium (600-800mm)",
    profitMargin: "300-450%",
    marketTrend: "increasing",
    keyBenefits: [
      "High antioxidant content",
      "Premium market pricing",
      "Long fruiting season",
      "Export potential"
    ],
    challenges: [
      "Acidic soil requirement",
      "Cold storage needs",
      "Skilled labor required"
    ],
    bestRegions: ["Himachal Pradesh", "Uttarakhand", "Kashmir", "Nilgiris"],
    investmentRequired: "₹2,00,000-3,00,000/ha",
    expectedYield: "8-12 tons/ha"
  }
];

const getDemandColor = (demand: string) => {
  switch (demand) {
    case "very_high": return "bg-destructive text-destructive-foreground";
    case "high": return "bg-warning text-warning-foreground";
    case "medium": return "bg-secondary text-secondary-foreground";
    default: return "bg-secondary text-secondary-foreground";
  }
};

const getTrendIcon = (trend: string) => {
  return trend === "increasing" ? "↗️" : trend === "stable" ? "➡️" : "↘️";
};

export const HighDemandCrops = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">High Demand Crops</h1>
          <p className="text-muted-foreground">
            Discover profitable crops with growing market demand and high-profit potential
          </p>
        </div>
        <div className="relative rounded-lg overflow-hidden">
          <img 
            src={highDemandImage} 
            alt="High demand crops" 
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-gradient text-center">
          <CardContent className="p-4">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{highDemandCrops.length}</p>
            <p className="text-sm text-muted-foreground">High Demand Crops</p>
          </CardContent>
        </Card>
        <Card className="card-gradient text-center">
          <CardContent className="p-4">
            <IndianRupee className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">300%+</p>
            <p className="text-sm text-muted-foreground">Avg Profit Margin</p>
          </CardContent>
        </Card>
        <Card className="card-gradient text-center">
          <CardContent className="p-4">
            <MapPin className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">Pan-India</p>
            <p className="text-sm text-muted-foreground">Cultivation Scope</p>
          </CardContent>
        </Card>
        <Card className="card-gradient text-center">
          <CardContent className="p-4">
            <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">2-4 Yrs</p>
            <p className="text-sm text-muted-foreground">ROI Timeline</p>
          </CardContent>
        </Card>
      </div>

      {/* Crops Grid */}
      <div className="space-y-6">
        {highDemandCrops.map((crop) => (
          <Card key={crop.id} className="card-gradient hover-lift">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl text-foreground mb-1">{crop.name}</CardTitle>
                  <p className="text-muted-foreground italic">{crop.scientificName}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getDemandColor(crop.demand)}>
                      {crop.demand.replace("_", " ").toUpperCase()} DEMAND
                    </Badge>
                    <Badge variant="outline">
                      {getTrendIcon(crop.marketTrend)} {crop.marketTrend.toUpperCase()}
                    </Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-success">{crop.marketPrice}</p>
                  <p className="text-sm text-muted-foreground">Market Price</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gradient-subtle rounded-lg">
                  <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">Season</p>
                  <p className="font-semibold text-foreground">{crop.season}</p>
                </div>
                <div className="text-center p-3 bg-gradient-subtle rounded-lg">
                  <Clock className="h-5 w-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-semibold text-foreground">{crop.duration}</p>
                </div>
                <div className="text-center p-3 bg-gradient-subtle rounded-lg">
                  <TrendingUp className="h-5 w-5 text-success mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">Profit Margin</p>
                  <p className="font-semibold text-foreground">{crop.profitMargin}</p>
                </div>
                <div className="text-center p-3 bg-gradient-subtle rounded-lg">
                  <Sprout className="h-5 w-5 text-green-500 mx-auto mb-1" />
                  <p className="text-sm text-muted-foreground">Expected Yield</p>
                  <p className="font-semibold text-foreground">{crop.expectedYield}</p>
                </div>
              </div>

              {/* Climate & Water Requirements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gradient-subtle rounded-lg">
                  <Thermometer className="h-5 w-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Climate Requirement</p>
                    <p className="font-semibold text-foreground">{crop.climateRequirement}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-gradient-subtle rounded-lg">
                  <Droplets className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Water Requirement</p>
                    <p className="font-semibold text-foreground">{crop.waterRequirement}</p>
                  </div>
                </div>
              </div>

              {/* Investment & Regions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3 bg-gradient-subtle rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <IndianRupee className="h-4 w-4 text-success" />
                    <p className="font-semibold text-foreground">Investment Required</p>
                  </div>
                  <p className="text-muted-foreground">{crop.investmentRequired}</p>
                </div>
                <div className="p-3 bg-gradient-subtle rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <p className="font-semibold text-foreground">Best Regions</p>
                  </div>
                  <p className="text-muted-foreground">{crop.bestRegions.join(", ")}</p>
                </div>
              </div>

              {/* Benefits and Challenges */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-success">Key Benefits</h4>
                  <ul className="space-y-2">
                    {crop.keyBenefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3 text-orange-500">Challenges</h4>
                  <ul className="space-y-2">
                    {crop.challenges.map((challenge, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                        <span className="text-muted-foreground">{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <Button className="btn-hero">
                  Get Detailed Cultivation Guide
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};