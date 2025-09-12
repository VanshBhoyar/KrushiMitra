import { Search, Bell, User } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import type { DashboardSection } from "./Dashboard";

const sectionTitles: Record<DashboardSection, string> = {
  overview: "Dashboard Overview",
  weather: "Weather Updates",
  schemes: "Government Schemes",
  expert: "Agricultural Expert",
  fertilizer: "Fertilizer Suggestions",
  crops: "High Demand Crops",
  seasonal: "Seasonal Crops",
  community: "Community",
  articles: "Articles & Tips"
};

interface DashboardHeaderProps {
  activeSection: DashboardSection;
}

export const DashboardHeader = ({ activeSection }: DashboardHeaderProps) => {
  return (
    <header className="bg-card border-b border-border px-6 py-4 shadow-soft">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex-1 max-w-xl">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {sectionTitles[activeSection]}
          </h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search crops, schemes, articles..."
              className="pl-10 bg-background border-border focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              3
            </Badge>
          </Button>
          
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};