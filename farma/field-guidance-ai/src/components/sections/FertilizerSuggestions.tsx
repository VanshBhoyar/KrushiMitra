import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { 
  Sprout, 
  Leaf, 
  FlaskConical,
  Calculator,
  MapPin,
  Calendar,
  Beaker,
  Lightbulb,
  CheckCircle
} from "lucide-react";
import fertilizerImage from "@/assets/fertilizer-tools.jpg";

interface FertilizerRecommendation {
  id: string;
  crop: string;
  soilType: string;
  stage: string;
  npkRatio: string;
  quantity: string;
  application: string;
  timing: string;
  benefits: string[];
  precautions: string[];
  cost: string;
}

const fertilizerData: FertilizerRecommendation[] = [
  {
    id: "1",
    crop: "Wheat",
    soilType: "Loamy",
    stage: "Tillering",
    npkRatio: "18:46:0",
    quantity: "100-120 kg/ha",
    application: "Broadcast and incorporate",
    timing: "21-25 days after sowing",
    benefits: ["Enhanced tillering", "Strong root development", "Better grain formation"],
    precautions: ["Apply in moist soil", "Avoid over-application", "Mix with organic matter"],
    cost: "₹2,800-3,200"
  },
  {
    id: "2",
    crop: "Rice",
    soilType: "Clay",
    stage: "Transplanting",
    npkRatio: "20:20:0",
    quantity: "80-100 kg/ha",
    application: "Deep placement",
    timing: "7-10 days after transplanting",
    benefits: ["Quick establishment", "Reduced lodging", "Higher yield"],
    precautions: ["Maintain water level", "Apply in standing water", "Uniform distribution"],
    cost: "₹2,400-2,800"
  },
  {
    id: "3",
    crop: "Cotton",
    soilType: "Black",
    stage: "Flowering",
    npkRatio: "10:26:26",
    quantity: "50-75 kg/ha",
    application: "Side dressing",
    timing: "45-50 days after sowing",
    benefits: ["Improved flowering", "Better boll formation", "Quality fiber"],
    precautions: ["Avoid late application", "Monitor soil moisture", "Split application recommended"],
    cost: "₹3,000-3,500"
  },
  {
    id: "4",
    crop: "Tomato",
    soilType: "Sandy Loam",
    stage: "Vegetative",
    npkRatio: "19:19:19",
    quantity: "150-200 kg/ha",
    application: "Fertigation",
    timing: "15-20 days after transplanting",
    benefits: ["Vigorous growth", "Dark green foliage", "Strong stems"],
    precautions: ["Regular irrigation", "pH monitoring", "Avoid waterlogging"],
    cost: "₹4,200-5,000"
  }
];

const soilTypes = ["All", "Loamy", "Clay", "Sandy", "Black", "Red", "Alluvial"];
const crops = ["All", "Wheat", "Rice", "Cotton", "Tomato", "Maize", "Sugarcane", "Soybean"];
const stages = ["All", "Sowing", "Vegetative", "Tillering", "Flowering", "Fruiting", "Maturity"];

export const FertilizerSuggestions = () => {
  const [selectedCrop, setSelectedCrop] = useState<string>("All");
  const [selectedSoil, setSelectedSoil] = useState<string>("All");
  const [selectedStage, setSelectedStage] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecommendations = fertilizerData.filter(item => {
    const matchesCrop = selectedCrop === "All" || item.crop === selectedCrop;
    const matchesSoil = selectedSoil === "All" || item.soilType === selectedSoil;
    const matchesStage = selectedStage === "All" || item.stage === selectedStage;
    const matchesSearch = item.crop.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCrop && matchesSoil && matchesStage && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Fertilizer Suggestions</h1>
          <p className="text-muted-foreground">
            Get personalized fertilizer recommendations based on your crop, soil type, and growth stage
          </p>
        </div>
        <div className="relative rounded-lg overflow-hidden">
          <img 
            src={fertilizerImage} 
            alt="Fertilizer and farming tools" 
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent" />
        </div>
      </div>

      {/* Calculator Card */}
      <Card className="card-nature">
        <CardHeader>
          <CardTitle className="text-white flex items-center space-x-2">
            <Calculator className="h-5 w-5" />
            <span>Fertilizer Calculator</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Input
                placeholder="Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
              />
            </div>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Select Crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map(crop => (
                  <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedSoil} onValueChange={setSelectedSoil}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Soil Type" />
              </SelectTrigger>
              <SelectContent>
                {soilTypes.map(soil => (
                  <SelectItem key={soil} value={soil}>{soil}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedStage} onValueChange={setSelectedStage}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue placeholder="Growth Stage" />
              </SelectTrigger>
              <SelectContent>
                {stages.map(stage => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-gradient hover-lift">
          <CardContent className="p-4 text-center">
            <FlaskConical className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Soil Testing</h3>
            <p className="text-sm text-muted-foreground">
              Test soil every 2-3 years for accurate nutrient recommendations
            </p>
          </CardContent>
        </Card>
        <Card className="card-gradient hover-lift">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Timing Matters</h3>
            <p className="text-sm text-muted-foreground">
              Apply fertilizers at the right growth stage for maximum efficiency
            </p>
          </CardContent>
        </Card>
        <Card className="card-gradient hover-lift">
          <CardContent className="p-4 text-center">
            <Beaker className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h3 className="font-semibold mb-2">Balanced Nutrition</h3>
            <p className="text-sm text-muted-foreground">
              Use organic matter alongside chemical fertilizers for soil health
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Fertilizer Recommendations</h2>
        
        {filteredRecommendations.map((recommendation) => (
          <Card key={recommendation.id} className="card-gradient hover-lift">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Sprout className="h-5 w-5 text-primary" />
                  <span>{recommendation.crop} - {recommendation.stage} Stage</span>
                </CardTitle>
                <div className="flex space-x-2">
                  <Badge variant="outline">{recommendation.soilType} Soil</Badge>
                  <Badge className="bg-success text-success-foreground">
                    {recommendation.cost}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* NPK Info */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gradient-subtle rounded-lg">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">NPK Ratio</p>
                  <p className="font-bold text-lg text-foreground">{recommendation.npkRatio}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Quantity</p>
                  <p className="font-bold text-lg text-foreground">{recommendation.quantity}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Application</p>
                  <p className="font-bold text-lg text-foreground">{recommendation.application}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Timing</p>
                  <p className="font-bold text-lg text-foreground">{recommendation.timing}</p>
                </div>
              </div>

              {/* Benefits and Precautions */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2 text-success" />
                    Benefits
                  </h4>
                  <ul className="space-y-2">
                    {recommendation.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-success rounded-full" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-3 flex items-center">
                    <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
                    Precautions
                  </h4>
                  <ul className="space-y-2">
                    {recommendation.precautions.map((precaution, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full" />
                        <span className="text-muted-foreground">{precaution}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRecommendations.length === 0 && (
        <Card className="card-gradient">
          <CardContent className="p-8 text-center">
            <Sprout className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No recommendations found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};