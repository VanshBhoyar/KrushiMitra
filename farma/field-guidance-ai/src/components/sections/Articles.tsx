import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { 
  BookOpen, 
  Clock, 
  Eye,
  Search,
  Calendar,
  User,
  TrendingUp,
  Lightbulb,
  FileText,
  Video,
  Download
} from "lucide-react";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: Date;
  readTime: string;
  views: number;
  category: string;
  tags: string[];
  featured: boolean;
  type: "article" | "video" | "guide";
  downloadUrl?: string;
}

const articlesData: Article[] = [
  {
    id: "1",
    title: "Complete Guide to Precision Agriculture: Technology That's Revolutionizing Farming",
    excerpt: "Discover how GPS, sensors, and data analytics are helping farmers increase yields while reducing costs and environmental impact.",
    content: "Precision agriculture represents a fundamental shift in how we approach farming. By leveraging GPS technology, IoT sensors, and data analytics, farmers can now make informed decisions about every aspect of their operations...",
    author: "Dr. Amit Sharma",
    publishDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    readTime: "8 min read",
    views: 1250,
    category: "Technology",
    tags: ["precision agriculture", "GPS", "sensors", "data analytics"],
    featured: true,
    type: "article"
  },
  {
    id: "2",
    title: "Sustainable Soil Management: Building Healthy Soils for Future Generations",
    excerpt: "Learn evidence-based practices for maintaining soil health, including cover cropping, composting, and minimal tillage techniques.",
    content: "Soil health is the foundation of sustainable agriculture. This comprehensive guide covers practical strategies for building and maintaining healthy soils...",
    author: "Prof. Meera Reddy",
    publishDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    readTime: "12 min read",
    views: 890,
    category: "Soil Health",
    tags: ["soil management", "composting", "cover crops", "sustainability"],
    featured: true,
    type: "article"
  },
  {
    id: "3",
    title: "Integrated Pest Management: Eco-Friendly Solutions for Crop Protection",
    excerpt: "Master IPM strategies that combine biological, cultural, and chemical controls for effective and sustainable pest management.",
    content: "Integrated Pest Management (IPM) offers a holistic approach to pest control that minimizes environmental impact while maintaining crop productivity...",
    author: "Dr. Rajesh Kumar",
    publishDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    readTime: "10 min read",
    views: 1450,
    category: "Pest Control",
    tags: ["IPM", "biological control", "pest management", "sustainable"],
    featured: false,
    type: "guide",
    downloadUrl: "/guides/ipm-guide.pdf"
  },
  {
    id: "4",
    title: "Climate-Smart Agriculture: Adapting to Changing Weather Patterns",
    excerpt: "Explore strategies for building resilience against climate change, including drought-resistant varieties and water conservation.",
    content: "As climate patterns become increasingly unpredictable, farmers must adapt their practices to maintain productivity and sustainability...",
    author: "Dr. Priya Singh",
    publishDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    readTime: "15 min read",
    views: 2100,
    category: "Climate",
    tags: ["climate change", "adaptation", "resilience", "drought resistance"],
    featured: true,
    type: "article"
  },
  {
    id: "5",
    title: "Modern Irrigation Techniques: Maximizing Water Efficiency",
    excerpt: "Compare drip, sprinkler, and micro-irrigation systems to choose the best water management solution for your crops.",
    content: "Water scarcity is a growing concern for farmers worldwide. This guide examines modern irrigation technologies and their applications...",
    author: "Eng. Suresh Patel",
    publishDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    readTime: "9 min read",
    views: 1680,
    category: "Irrigation",
    tags: ["irrigation", "water management", "drip irrigation", "efficiency"],
    featured: false,
    type: "video"
  },
  {
    id: "6",
    title: "Crop Diversification Strategies for Risk Management",
    excerpt: "Learn how diversifying your crop portfolio can reduce financial risk and improve long-term sustainability.",
    content: "Crop diversification is a proven strategy for reducing agricultural risk while improving soil health and economic stability...",
    author: "Dr. Sunita Gupta",
    publishDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    readTime: "11 min read",
    views: 950,
    category: "Farm Management",
    tags: ["diversification", "risk management", "sustainability", "economics"],
    featured: false,
    type: "article"
  }
];

const categories = ["All", "Technology", "Soil Health", "Pest Control", "Climate", "Irrigation", "Farm Management"];

const getTypeIcon = (type: string) => {
  switch (type) {
    case "video": return Video;
    case "guide": return FileText;
    default: return BookOpen;
  }
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "video": return "bg-red-500 text-white";
    case "guide": return "bg-blue-500 text-white";
    default: return "bg-green-500 text-white";
  }
};

export const Articles = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredArticles = articlesData.filter(article => {
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = filteredArticles.filter(article => article.featured);
  const regularArticles = filteredArticles.filter(article => !article.featured);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Articles & Resources</h1>
        <p className="text-muted-foreground">
          Stay updated with the latest farming techniques, research, and best practices
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">{articlesData.length}</p>
            <p className="text-sm text-muted-foreground">Articles Published</p>
          </CardContent>
        </Card>
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <Video className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">
              {articlesData.filter(a => a.type === 'video').length}
            </p>
            <p className="text-sm text-muted-foreground">Video Tutorials</p>
          </CardContent>
        </Card>
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <FileText className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">
              {articlesData.filter(a => a.type === 'guide').length}
            </p>
            <p className="text-sm text-muted-foreground">Downloadable Guides</p>
          </CardContent>
        </Card>
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <Eye className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">
              {articlesData.reduce((sum, article) => sum + article.views, 0).toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">Total Views</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search articles, guides, topics..."
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
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
            <TrendingUp className="h-6 w-6 mr-2 text-primary" />
            Featured Articles
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {featuredArticles.map((article) => {
              const TypeIcon = getTypeIcon(article.type);
              return (
                <Card key={article.id} className="card-gradient hover-lift cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <Badge className="bg-primary text-primary-foreground mb-2">
                        Featured
                      </Badge>
                      <Badge className={getTypeColor(article.type)}>
                        <TypeIcon className="h-3 w-3 mr-1" />
                        {article.type.toUpperCase()}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl leading-tight hover:text-primary transition-smooth">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{article.excerpt}</p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(article.publishDate)}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="h-3 w-3" />
                          <span>{article.views}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 3).map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-2">
                      <Button variant="outline" size="sm" className="hover-lift">
                        Read More
                      </Button>
                      {article.downloadUrl && (
                        <Button variant="ghost" size="sm" className="hover-lift">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Regular Articles */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center">
          <BookOpen className="h-6 w-6 mr-2 text-primary" />
          Latest Articles
        </h2>
        <div className="space-y-4">
          {regularArticles.map((article) => {
            const TypeIcon = getTypeIcon(article.type);
            return (
              <Card key={article.id} className="card-gradient hover-lift cursor-pointer">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-3 space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge className={getTypeColor(article.type)}>
                          <TypeIcon className="h-3 w-3 mr-1" />
                          {article.type.toUpperCase()}
                        </Badge>
                        <Badge variant="outline">{article.category}</Badge>
                      </div>
                      
                      <h3 className="text-xl font-semibold text-foreground hover:text-primary transition-smooth">
                        {article.title}
                      </h3>
                      
                      <p className="text-muted-foreground">{article.excerpt}</p>
                      
                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 4).map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="text-sm text-muted-foreground space-y-2">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4" />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(article.publishDate)}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Clock className="h-4 w-4" />
                          <span>{article.readTime}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Eye className="h-4 w-4" />
                          <span>{article.views} views</span>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Button variant="outline" size="sm" className="w-full hover-lift">
                          Read Article
                        </Button>
                        {article.downloadUrl && (
                          <Button variant="ghost" size="sm" className="w-full hover-lift">
                            <Download className="h-4 w-4 mr-1" />
                            Download Guide
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {filteredArticles.length === 0 && (
        <Card className="card-gradient">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No articles found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or browse different categories
            </p>
          </CardContent>
        </Card>
      )}

      {/* Newsletter Signup */}
      <Card className="card-nature">
        <CardContent className="p-6 text-center text-white">
          <Lightbulb className="h-12 w-12 mx-auto mb-4 text-yellow-300" />
          <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
          <p className="mb-4 opacity-90">
            Get the latest farming tips, research updates, and expert advice delivered to your inbox
          </p>
          <div className="flex max-w-md mx-auto space-x-2">
            <Input 
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
            />
            <Button className="bg-white text-green-600 hover:bg-white/90">
              Subscribe
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};