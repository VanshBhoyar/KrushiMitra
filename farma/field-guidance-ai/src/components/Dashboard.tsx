import { useState } from "react";
import { Sidebar } from "./ui/sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardSidebar } from "./DashboardSidebar";
import { WeatherWidget } from "./sections/WeatherWidget";
import { GovernmentSchemes } from "./sections/GovernmentSchemes";
import { AgriculturalExpert } from "./sections/AgriculturalExpert";
import { FertilizerSuggestions } from "./sections/FertilizerSuggestions";
import { HighDemandCrops } from "./sections/HighDemandCrops";
import { SeasonalCrops } from "./sections/SeasonalCrops";
import { Community } from "./sections/Community";
import { Articles } from "./sections/Articles";
import { DashboardOverview } from "./sections/DashboardOverview";

export type DashboardSection = 
  | "overview"
  | "weather" 
  | "schemes" 
  | "expert" 
  | "fertilizer" 
  | "crops" 
  | "seasonal"
  | "community" 
  | "articles";

export const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<DashboardSection>("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview onNavigate={setActiveSection} />;
      case "weather":
        return <WeatherWidget />;
      case "schemes":
        return <GovernmentSchemes />;
      case "expert":
        return <AgriculturalExpert />;
      case "fertilizer":
        return <FertilizerSuggestions />;
      case "crops":
        return <HighDemandCrops />;
      case "seasonal":
        return <SeasonalCrops />;
      case "community":
        return <Community />;
      case "articles":
        return <Articles />;
      default:
        return <DashboardOverview onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gradient-subtle">
      <DashboardSidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection} 
      />
      
      <div className="flex-1 flex flex-col">
        <DashboardHeader activeSection={activeSection} />
        
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
};