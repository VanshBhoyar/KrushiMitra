import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Cloud, 
  Sun, 
  CloudRain, 
  Wind, 
  Droplets, 
  Thermometer,
  Eye,
  Gauge,
  MapPin,
  RefreshCw
} from "lucide-react";
import weatherImage from "@/assets/weather-farming.jpg";

interface WeatherData {
  location: string;
  current: {
    temp: number;
    condition: string;
    humidity: number;
    windSpeed: number;
    pressure: number;
    visibility: number;
    uvIndex: number;
    feelsLike: number;
  };
  forecast: Array<{
    date: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
  }>;
  alerts: Array<{
    type: string;
    message: string;
    severity: "low" | "medium" | "high";
  }>;
}

const mockWeatherData: WeatherData = {
  location: "Punjab, India",
  current: {
    temp: 28,
    condition: "Partly Cloudy",
    humidity: 65,
    windSpeed: 12,
    pressure: 1013,
    visibility: 10,
    uvIndex: 6,
    feelsLike: 31
  },
  forecast: [
    { date: "Today", high: 32, low: 22, condition: "Sunny", icon: "sun", precipitation: 0 },
    { date: "Tomorrow", high: 29, low: 20, condition: "Cloudy", icon: "cloud", precipitation: 10 },
    { date: "Wed", high: 26, low: 18, condition: "Rain", icon: "rain", precipitation: 80 },
    { date: "Thu", high: 31, low: 21, condition: "Partly Cloudy", icon: "partlycloudy", precipitation: 20 },
    { date: "Fri", high: 33, low: 23, condition: "Sunny", icon: "sun", precipitation: 0 }
  ],
  alerts: [
    {
      type: "Heat Warning",
      message: "High temperatures expected. Ensure adequate irrigation for crops.",
      severity: "medium"
    },
    {
      type: "Wind Advisory",
      message: "Strong winds may affect spraying operations.",
      severity: "low"
    }
  ]
};

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case "sunny":
    case "sun":
      return Sun;
    case "cloudy":
    case "cloud":
      return Cloud;
    case "rain":
    case "rainy":
      return CloudRain;
    default:
      return Sun;
  }
};

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "high": return "destructive";
    case "medium": return "secondary";
    case "low": return "outline";
    default: return "secondary";
  }
};

export const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData>(mockWeatherData);
  const [isLoading, setIsLoading] = useState(false);

  const refreshWeather = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setWeather({ ...mockWeatherData });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Weather Updates</h1>
          <p className="text-muted-foreground">Real-time weather information for your farming needs</p>
        </div>
        <Button
          onClick={refreshWeather}
          disabled={isLoading}
          variant="outline"
          className="transition-smooth hover-lift"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Weather Alerts */}
      {weather.alerts.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-foreground">Weather Alerts</h2>
          {weather.alerts.map((alert, index) => (
            <Card key={index} className="card-gradient border-l-4 border-l-warning">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{alert.type}</h3>
                    <p className="text-muted-foreground">{alert.message}</p>
                  </div>
                  <Badge variant={getSeverityColor(alert.severity)}>
                    {alert.severity.toUpperCase()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Current Weather */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <span>{weather.location}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Main Weather Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="text-6xl font-bold text-foreground">
                  {weather.current.temp}°C
                </div>
                <div>
                  <p className="text-xl text-foreground">{weather.current.condition}</p>
                  <p className="text-muted-foreground">Feels like {weather.current.feelsLike}°C</p>
                </div>
              </div>
              
              {/* Weather Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Humidity: {weather.current.humidity}%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Wind: {weather.current.windSpeed} km/h</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gauge className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Pressure: {weather.current.pressure} hPa</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Visibility: {weather.current.visibility} km</span>
                </div>
              </div>
            </div>

            {/* Weather Image */}
            <div className="relative rounded-lg overflow-hidden">
              <img 
                src={weatherImage} 
                alt="Weather and farming" 
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 5-Day Forecast */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {weather.forecast.map((day, index) => {
              const Icon = getWeatherIcon(day.icon);
              return (
                <div 
                  key={index} 
                  className="text-center p-4 rounded-lg bg-gradient-subtle hover-lift transition-smooth"
                >
                  <p className="font-semibold text-foreground mb-2">{day.date}</p>
                  <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-sm text-muted-foreground mb-1">{day.condition}</p>
                  <div className="text-sm">
                    <span className="font-semibold text-foreground">{day.high}°</span>
                    <span className="text-muted-foreground"> / {day.low}°</span>
                  </div>
                  {day.precipitation > 0 && (
                    <div className="flex items-center justify-center mt-2">
                      <Droplets className="h-3 w-3 text-blue-500 mr-1" />
                      <span className="text-xs text-blue-500">{day.precipitation}%</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Farming Recommendations */}
      <Card className="card-nature">
        <CardHeader>
          <CardTitle className="text-white">Weather-Based Farming Recommendations</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3 text-white">
            <Sun className="h-5 w-5 mt-1 text-yellow-300" />
            <div>
              <p className="font-medium">Irrigation Timing</p>
              <p className="text-sm opacity-90">Best irrigation time: Early morning (5-7 AM) to minimize evaporation</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 text-white">
            <Wind className="h-5 w-5 mt-1 text-blue-300" />
            <div>
              <p className="font-medium">Spraying Conditions</p>
              <p className="text-sm opacity-90">Wind speed suitable for pesticide application (below 15 km/h)</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 text-white">
            <CloudRain className="h-5 w-5 mt-1 text-blue-400" />
            <div>
              <p className="font-medium">Rain Forecast</p>
              <p className="text-sm opacity-90">Rain expected Wednesday - postpone fertilizer application</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};