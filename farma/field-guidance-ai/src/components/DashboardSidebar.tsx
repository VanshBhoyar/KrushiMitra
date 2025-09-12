import { useState } from "react";
import { 
  Home, 
  Cloud, 
  FileText, 
  MessageCircle, 
  Sprout, 
  Wheat, 
  Calendar,
  Users,
  BookOpen,
  Menu,
  X
} from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import type { DashboardSection } from "./Dashboard";

interface DashboardSidebarProps {
  activeSection: DashboardSection;
  onSectionChange: (section: DashboardSection) => void;
}

const sidebarItems = [
  { id: "overview" as const, label: "Overview", icon: Home },
  { id: "weather" as const, label: "Weather", icon: Cloud },
  { id: "schemes" as const, label: "Gov Schemes", icon: FileText },
  { id: "expert" as const, label: "AI Expert", icon: MessageCircle },
  { id: "fertilizer" as const, label: "Fertilizers", icon: Sprout },
  
  { id: "seasonal" as const, label: "Seasonal", icon: Calendar },
  { id: "community" as const, label: "Community", icon: Users },
  { id: "articles" as const, label: "Articles", icon: BookOpen },
];

export const DashboardSidebar = ({ activeSection, onSectionChange }: DashboardSidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      {!isCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed left-0 top-0 z-50 h-full bg-card border-r border-border shadow-medium transition-all duration-300 lg:relative lg:translate-x-0",
        isCollapsed ? "-translate-x-full lg:w-20" : "w-64 translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sprout className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-bold text-lg text-foreground">KrushiMitra</h1>
                <p className="text-xs text-muted-foreground">Advisory System</p>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="lg:hidden"
          >
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "w-full justify-start transition-smooth hover-lift",
                  isCollapsed ? "px-3" : "px-4",
                  isActive && "bg-gradient-primary text-primary-foreground shadow-glow"
                )}
              >
                <Icon className={cn("h-5 w-5", !isCollapsed && "mr-3")} />
                {!isCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
              </Button>
            );
          })}
        </nav>

        
      </aside>

      {/* Mobile toggle button */}
      {isCollapsed && (
        <Button
          variant="default"
          size="icon"
          onClick={() => setIsCollapsed(false)}
          className="fixed top-4 left-4 z-50 lg:hidden bg-gradient-primary shadow-medium"
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
    </>
  );
};