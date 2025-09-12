import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { 
  FileText, 
  ExternalLink, 
  Search, 
  Calendar,
  IndianRupee,
  Users,
  Target,
  CheckCircle
} from "lucide-react";

interface Scheme {
  id: string;
  title: string;
  description: string;
  eligibility: string[];
  benefits: string;
  deadline: string;
  status: "active" | "closing_soon" | "upcoming";
  category: string;
  budget: string;
  applicationLink: string;
}

const governmentSchemes: Scheme[] = [
  {
    id: "1",
    title: "PM-KISAN Samman Nidhi",
    description: "Direct income support to farmers providing ₹6,000 per year in three installments of ₹2,000 each.",
    eligibility: ["Small and marginal farmers", "Landholding up to 2 hectares", "Valid Aadhaar card"],
    benefits: "₹6,000 per year",
    deadline: "Ongoing",
    status: "active",
    category: "Financial Support",
    budget: "₹75,000 crores",
    applicationLink: "https://pmkisan.gov.in"
  },
  {
    id: "2",
    title: "Pradhan Mantri Fasal Bima Yojana",
    description: "Crop insurance scheme providing financial support to farmers in case of crop failure.",
    eligibility: ["All farmers", "Growing notified crops", "Having insurable interest"],
    benefits: "Up to ₹2 lakh coverage",
    deadline: "15 days before sowing",
    status: "closing_soon",
    category: "Insurance",
    budget: "₹15,695 crores",
    applicationLink: "https://pmfby.gov.in"
  },
  {
    id: "3",
    title: "Kisan Credit Card",
    description: "Credit facility for farmers to meet their agricultural needs and related activities.",
    eligibility: ["All farmers", "Tenant farmers", "Oral lessees"],
    benefits: "Credit limit up to ₹3 lakh",
    deadline: "Ongoing",
    status: "active",
    category: "Credit",
    budget: "₹2 lakh crores",
    applicationLink: "https://www.india.gov.in/kcc"
  },
  {
    id: "4",
    title: "Soil Health Card Scheme",
    description: "Soil testing program to provide soil health cards to farmers with nutrient recommendations.",
    eligibility: ["All farmers", "Land ownership documents", "Village records"],
    benefits: "Free soil testing",
    deadline: "31st March 2024",
    status: "upcoming",
    category: "Soil Health",
    budget: "₹568 crores",
    applicationLink: "https://soilhealth.dac.gov.in"
  },
  {
    id: "5",
    title: "National Mission for Sustainable Agriculture",
    description: "Promoting sustainable agriculture practices through climate resilient technologies.",
    eligibility: ["Progressive farmers", "Farmer groups", "NGOs"],
    benefits: "50-75% subsidy",
    deadline: "Ongoing",
    status: "active",
    category: "Sustainability",
    budget: "₹3,000 crores",
    applicationLink: "https://nmsa.dac.gov.in"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "active": return "bg-success text-success-foreground";
    case "closing_soon": return "bg-destructive text-destructive-foreground";
    case "upcoming": return "bg-warning text-warning-foreground";
    default: return "bg-secondary text-secondary-foreground";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "active": return "Active";
    case "closing_soon": return "Closing Soon";
    case "upcoming": return "Upcoming";
    default: return "Unknown";
  }
};

export const GovernmentSchemes = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = ["all", ...new Set(governmentSchemes.map(scheme => scheme.category))];

  const filteredSchemes = governmentSchemes.filter(scheme => {
    const matchesSearch = scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Government Schemes</h1>
        <p className="text-muted-foreground">
          Discover and apply for government schemes designed to support farmers
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search schemes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex space-x-2 overflow-x-auto">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="whitespace-nowrap"
            >
              {category === "all" ? "All Categories" : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{governmentSchemes.length}</p>
            <p className="text-sm text-muted-foreground">Available Schemes</p>
          </CardContent>
        </Card>
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <IndianRupee className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">₹95K+</p>
            <p className="text-sm text-muted-foreground">Crores Budget</p>
          </CardContent>
        </Card>
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">10M+</p>
            <p className="text-sm text-muted-foreground">Farmers Benefited</p>
          </CardContent>
        </Card>
      </div>

      {/* Schemes List */}
      <div className="space-y-6">
        {filteredSchemes.map((scheme) => (
          <Card key={scheme.id} className="card-gradient hover-lift">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <CardTitle className="text-xl">{scheme.title}</CardTitle>
                    <Badge className={getStatusColor(scheme.status)}>
                      {getStatusText(scheme.status)}
                    </Badge>
                    <Badge variant="outline">{scheme.category}</Badge>
                  </div>
                  <p className="text-muted-foreground">{scheme.description}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Benefits and Budget */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <IndianRupee className="h-4 w-4 text-success" />
                  <div>
                    <p className="text-sm text-muted-foreground">Benefits</p>
                    <p className="font-semibold text-foreground">{scheme.benefits}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="h-4 w-4 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Budget</p>
                    <p className="font-semibold text-foreground">{scheme.budget}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-muted-foreground">Deadline</p>
                    <p className="font-semibold text-foreground">{scheme.deadline}</p>
                  </div>
                </div>
              </div>

              {/* Eligibility */}
              <div>
                <h4 className="font-semibold text-foreground mb-2 flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2 text-success" />
                  Eligibility Criteria
                </h4>
                <ul className="space-y-1">
                  {scheme.eligibility.map((criteria, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-muted-foreground">{criteria}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              <div className="flex justify-end">
                <Button 
                  className="btn-hero"
                  onClick={() => window.open(scheme.applicationLink, '_blank')}
                >
                  Apply Now
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredSchemes.length === 0 && (
        <Card className="card-gradient">
          <CardContent className="p-8 text-center">
            <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No schemes found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or category filter
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};