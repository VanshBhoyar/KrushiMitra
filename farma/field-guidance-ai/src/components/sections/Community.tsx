import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { 
  Users, 
  MessageCircle, 
  Heart, 
  Share2, 
  Plus,
  Search,
  Filter,
  Clock,
  ThumbsUp,
  Eye
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface CommunityPost {
  id: string;
  author: {
    name: string;
    avatar?: string;
    location: string;
    verified: boolean;
  };
  title: string;
  content: string;
  category: string;
  tags: string[];
  timestamp: Date;
  likes: number;
  comments: number;
  views: number;
  hasLiked: boolean;
  images?: string[];
}

const communityPosts: CommunityPost[] = [
  {
    id: "1",
    author: {
      name: "Rajesh Kumar",
      location: "Punjab",
      verified: true
    },
    title: "Organic farming techniques that increased my wheat yield by 30%",
    content: "After switching to organic farming methods last season, I've seen remarkable improvements in both soil health and crop yield. Here are the key practices that made the difference: 1) Composting kitchen waste and farm residue, 2) Crop rotation with legumes, 3) Natural pest control using neem and companion planting. The initial investment was higher, but the long-term benefits are worth it.",
    category: "Organic Farming",
    tags: ["wheat", "organic", "yield", "composting"],
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    likes: 24,
    comments: 8,
    views: 156,
    hasLiked: false
  },
  {
    id: "2",
    author: {
      name: "Priya Sharma",
      location: "Karnataka",
      verified: true
    },
    title: "Drip irrigation setup for small farmers - Complete guide",
    content: "I recently installed a drip irrigation system on my 2-acre plot and wanted to share my experience. Total cost was ₹45,000 with government subsidy. Water usage reduced by 40% and crop quality improved significantly. Happy to answer any questions about the setup process, maintenance, and ROI calculations.",
    category: "Irrigation",
    tags: ["drip irrigation", "water conservation", "technology"],
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    likes: 31,
    comments: 12,
    views: 203,
    hasLiked: true
  },
  {
    id: "3",
    author: {
      name: "Suresh Patel",
      location: "Gujarat",
      verified: false
    },
    title: "Cotton bollworm infestation - Need urgent advice",
    content: "I'm facing severe bollworm attack on my cotton crop. The damage is spreading rapidly and I'm worried about the entire season. I've tried neem oil spray but it's not very effective. Has anyone dealt with this issue recently? What chemical/biological control measures worked for you? Also concerned about resistance development.",
    category: "Pest Control",
    tags: ["cotton", "bollworm", "pest control", "help needed"],
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
    likes: 7,
    comments: 15,
    views: 89,
    hasLiked: false
  },
  {
    id: "4",
    author: {
      name: "Meera Devi",
      location: "Rajasthan",
      verified: true
    },
    title: "Women farmers collective - Success story from our village",
    content: "Our women's farming group started 3 years ago with just 8 members. Today we are 45 strong! We've collectively purchased equipment, negotiated better prices for seeds and fertilizers, and started value addition activities. Last year we earned 40% more compared to individual farming. Unity is strength! 💪",
    category: "Success Stories",
    tags: ["women farmers", "collective farming", "success story"],
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    likes: 89,
    comments: 23,
    views: 445,
    hasLiked: true
  }
];

const categories = ["All", "Organic Farming", "Irrigation", "Pest Control", "Success Stories", "Technology", "Marketing"];

export const Community = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(communityPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: ""
  });

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => 
        post.id === postId 
          ? { 
              ...post, 
              likes: post.hasLiked ? post.likes - 1 : post.likes + 1,
              hasLiked: !post.hasLiked 
            }
          : post
      )
    );
  };

  const handleNewPost = () => {
    if (newPost.title && newPost.content) {
      const post: CommunityPost = {
        id: Date.now().toString(),
        author: {
          name: "You",
          location: "Your Location",
          verified: false
        },
        title: newPost.title,
        content: newPost.content,
        category: newPost.category || "General",
        tags: newPost.tags.split(",").map(tag => tag.trim()).filter(Boolean),
        timestamp: new Date(),
        likes: 0,
        comments: 0,
        views: 1,
        hasLiked: false
      };
      
      setPosts([post, ...posts]);
      setNewPost({ title: "", content: "", category: "", tags: "" });
      setShowNewPostForm(false);
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "1 day ago";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Community</h1>
          <p className="text-muted-foreground">
            Connect with fellow farmers, share experiences, and learn together
          </p>
        </div>
        <Button 
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="btn-hero"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">12,450</p>
            <p className="text-sm text-muted-foreground">Active Members</p>
          </CardContent>
        </Card>
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <MessageCircle className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">2,340</p>
            <p className="text-sm text-muted-foreground">Discussions</p>
          </CardContent>
        </Card>
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <ThumbsUp className="h-8 w-8 text-success mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">18,560</p>
            <p className="text-sm text-muted-foreground">Helpful Solutions</p>
          </CardContent>
        </Card>
        <Card className="card-gradient">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
            <p className="text-2xl font-bold text-foreground">45,230</p>
            <p className="text-sm text-muted-foreground">Likes Given</p>
          </CardContent>
        </Card>
      </div>

      {/* New Post Form */}
      {showNewPostForm && (
        <Card className="card-gradient">
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Post title..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
            <Textarea
              placeholder="Share your farming experience, ask questions, or provide advice..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              rows={4}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                placeholder="Category (e.g., Organic Farming)"
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
              />
              <Input
                placeholder="Tags (comma separated)"
                value={newPost.tags}
                onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleNewPost} className="btn-hero">
                Post
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowNewPostForm(false)}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search posts, topics, tags..."
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

      {/* Posts */}
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="card-gradient hover-lift">
            <CardHeader>
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-semibold text-foreground">{post.author.name}</h3>
                    {post.author.verified && (
                      <Badge variant="secondary" className="text-xs">Verified</Badge>
                    )}
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{post.author.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatTimestamp(post.timestamp)}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h2 className="text-lg font-semibold text-foreground mb-2">{post.title}</h2>
                <p className="text-muted-foreground">{post.content}</p>
              </div>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center space-x-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`hover-lift ${post.hasLiked ? 'text-red-500' : ''}`}
                  >
                    <Heart className={`h-4 w-4 mr-1 ${post.hasLiked ? 'fill-current' : ''}`} />
                    {post.likes}
                  </Button>
                  <Button variant="ghost" size="sm" className="hover-lift">
                    <MessageCircle className="h-4 w-4 mr-1" />
                    {post.comments}
                  </Button>
                  <Button variant="ghost" size="sm" className="hover-lift">
                    <Share2 className="h-4 w-4 mr-1" />
                    Share
                  </Button>
                </div>
                <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                  <Eye className="h-3 w-3" />
                  <span>{post.views}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card className="card-gradient">
          <CardContent className="p-8 text-center">
            <MessageCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No posts found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or be the first to start a discussion!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};