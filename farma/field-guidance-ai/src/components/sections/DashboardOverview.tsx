import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Cloud, 
  FileText, 
  MessageCircle, 
  Sprout, 
  Wheat, 
  Users,
  TrendingUp,
  Thermometer,
  Droplets,
  Sun
} from "lucide-react";
import type { DashboardSection } from "../Dashboard";
import heroImage from "@/assets/hero-farming.jpg";

interface DashboardOverviewProps {
  onNavigate: (section: DashboardSection) => void;
}

const quickActions = [
  { id: "weather" as const, label: "Check Weather", icon: Cloud, color: "bg-gradient-sky" },
  { id: "expert" as const, label: "Ask AI Expert", icon: MessageCircle, color: "bg-gradient-primary" },
  { id: "fertilizer" as const, label: "Get Fertilizer Tips", icon: Sprout, color: "bg-gradient-nature" },
  { id: "crops" as const, label: "High Demand Crops", icon: Wheat, color: "bg-gradient-earth" },
];

const statsCards = [
  { title: "Active Farmers", value: "12,450", change: "+8.2%", icon: Users },
  { title: "Weather Alerts", value: "3", change: "Today", icon: Cloud },
  { title: "New Schemes", value: "5", change: "This month", icon: FileText },
  { title: "Crop Prices", value: "↑ 12%", change: "This week", icon: TrendingUp },
];

const todayWeather = {
  temp: "28°C",
  humidity: "65%",
  condition: "Partly Cloudy",
  icon: Sun
};

export const DashboardOverview = ({ onNavigate }: DashboardOverviewProps) => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative h-64 rounded-2xl overflow-hidden shadow-strong">
        <img 
          src={heroImage} 
          alt="Agricultural landscape" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center">
          <div className="text-white p-8">
            <h1 className="text-4xl font-bold mb-2">Welcome to KrushiMitra</h1>
            <p className="text-xl opacity-90 mb-4">Your intelligent farming companion</p>
            <Button 
              onClick={() => onNavigate("expert")}
              className="btn-hero"
            >
              Get Started with AI Expert
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="card-gradient hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                  <Icon className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold mb-6 text-foreground">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card 
                key={action.id} 
                className="cursor-pointer transition-smooth hover-lift hover-glow group"
                onClick={() => onNavigate(action.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`${action.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-bounce`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-smooth">
                    {action.label}
                  </h3>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Today's Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Summary */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Cloud className="h-5 w-5 text-primary" />
              <span>Today's Weather</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold text-foreground">{todayWeather.temp}</p>
                <p className="text-muted-foreground">{todayWeather.condition}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center space-x-1">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{todayWeather.humidity}</span>
                  </div>
                </div>
              </div>
              <todayWeather.icon className="h-16 w-16 text-yellow-500" />
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4"
              onClick={() => onNavigate("weather")}
            >
              View Full Forecast
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-nature rounded-full flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">New crop disease identified</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-earth rounded-full flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">Government subsidy update</p>
                <p className="text-sm text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-white" />
              </div>
              <div>
                <p className="font-medium">Community discussion started</p>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};