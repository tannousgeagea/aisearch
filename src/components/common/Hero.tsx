import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Sparkles, ArrowRight } from 'lucide-react';
import heroImage from '@/assets/hero-bg.jpg';

export const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-hero">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="AI Vision Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/20 to-background/80" />
      </div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="animate-fade-in">
            <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-primary/20 text-primary">
              <Sparkles className="h-3 w-3 mr-1" />
              Powered by Advanced Vision AI
            </Badge>
          </div>
          
          {/* Main Heading */}
          <div className="animate-fade-in space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              <span className="block">Understand</span>
              <span className="block bg-gradient-primary bg-clip-text text-transparent">
                Every Image
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Upload any image and let our advanced Vision-Language Models 
              generate detailed, intelligent captions that capture every detail.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="animate-fade-in flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              variant="hero" 
              size="lg"
              className="gap-2 group"
              onClick={() => {
                document.getElementById('upload-section')?.scrollIntoView({ 
                  behavior: 'smooth' 
                });
              }}
            >
              <Eye className="h-5 w-5" />
              Start Analyzing
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="glass" 
              size="lg"
              className="gap-2"
            >
              <Sparkles className="h-4 w-4" />
              View Examples
            </Button>
          </div>
          
          {/* Features Grid */}
          <div className="animate-fade-in pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  title: "Multiple AI Models",
                  description: "Choose from Gemini, BLIP, LLaVA, and more",
                  icon: "🧠"
                },
                {
                  title: "Instant Results",
                  description: "Get detailed captions in seconds",
                  icon: "⚡"
                },
                {
                  title: "High Accuracy",
                  description: "State-of-the-art vision understanding",
                  icon: "🎯"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="bg-background/60 backdrop-blur-sm rounded-xl p-6 border border-border/50 hover:shadow-elegant transition-all duration-300"
                >
                  <div className="text-2xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};