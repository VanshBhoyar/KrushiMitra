import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { MessageCircle, Send, Bot, User, Lightbulb, Leaf, Bug, Droplets, Sun } from "lucide-react";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
  timestamp: Date;
  category?: string;
}

interface QuickQuestion {
  id: string;
  question: string;
  category: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const quickQuestions: QuickQuestion[] = [
  { id: "1", question: "Signs of nitrogen deficiency in wheat?", category: "Plant Health", icon: Leaf },
  { id: "2", question: "Best time to irrigate cotton?", category: "Irrigation", icon: Droplets },
  { id: "3", question: "Control aphids in mustard?", category: "Pest Control", icon: Bug },
  { id: "4", question: "Optimal temperature for rice germination?", category: "Climate", icon: Sun },
];

// 🔹 Set backend API URL here
// During development, use your local server
// In production, replace with your deployed backend URL
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-backend-domain.com/api/chat"
    : "http://localhost:5000/api/chat";

export const AgriculturalExpert = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "👋 Hello! I'm your AI Agricultural Expert. Ask me anything about farming.",
      timestamp: new Date(),
      category: "greeting",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      const data = await res.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content: data.reply || "⚠️ No response from AI",
        timestamp: new Date(),
        category: "advice",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("❌ API Error:", err);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: "bot",
        content: "⚠️ Could not connect to server. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = () => sendMessage(inputMessage);
  const handleQuickQuestion = (question: string) => sendMessage(question);
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Agricultural Expert</h1>
        <p className="text-muted-foreground">Get instant expert advice for all your farming questions</p>
      </div>

      {/* Quick Questions Section */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="h-5 w-5 text-yellow-500" /> <span>Quick Questions</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickQuestions.map((q) => {
              const Icon = q.icon;
              return (
                <Button
                  key={q.id}
                  variant="outline"
                  className="justify-start h-auto p-4 text-left hover-lift"
                  onClick={() => handleQuickQuestion(q.question)}
                >
                  <Icon className="h-4 w-4 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">{q.question}</p>
                    <Badge variant="secondary" className="mt-1 text-xs">
                      {q.category}
                    </Badge>
                  </div>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Chat Section */}
      <Card className="card-gradient">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5 text-primary" /> <span>Chat with AI Expert</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96 overflow-y-auto space-y-4 mb-4 p-4 bg-gradient-subtle rounded-lg">
            {messages.map((m) => (
              <div key={m.id} className={`flex items-start space-x-3 ${m.type === "user" ? "justify-end" : "justify-start"}`}>
                {m.type === "bot" && (
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    m.type === "user" ? "bg-gradient-primary text-primary-foreground" : "bg-card text-card-foreground border"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{m.content}</p>
                  <p className={`text-xs mt-1 ${m.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                    {m.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {m.type === "user" && (
                  <div className="w-8 h-8 bg-gradient-earth rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-card text-card-foreground border px-4 py-2 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="flex space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about crops, pests, irrigation..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping} className="btn-hero">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
