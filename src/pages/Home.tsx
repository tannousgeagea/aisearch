import React from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '@/components/Hero';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Search, Zap, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />
      
      {/* Features Section */}
      <div className="container mx-auto px-4 py-16 space-y-12">
        <section className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Powerful AI Vision Tools</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transform your images with state-of-the-art AI models for captioning and search.
              Experience the future of visual understanding.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Caption Generator Feature */}
            <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-colors">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">AI Caption Generation</h3>
                <p className="text-muted-foreground">
                  Generate detailed, accurate captions for your images using multiple 
                  state-of-the-art vision-language models.
                </p>
                <Button asChild className="w-full gap-2">
                  <Link to="/caption">
                    Start Captioning
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
            
            {/* Image Search Feature */}
            <Card className="p-6 bg-gradient-card border-primary/20 hover:border-primary/40 transition-colors">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Intelligent Image Search</h3>
                <p className="text-muted-foreground">
                  Search your image collection using natural language or visual similarity 
                  with advanced embedding technology.
                </p>
                <Button asChild variant="outline" className="w-full gap-2">
                  <Link to="/search">
                    Coming Soon
                    <Zap className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </section>
        
        {/* Getting Started Section */}
        <section className="text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Get Started in 3 Steps</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              It's simple to start generating captions for your images
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">1</span>
              </div>
              <h3 className="text-lg font-semibold">Upload Image</h3>
              <p className="text-muted-foreground text-sm">
                Choose any image from your device to analyze
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">2</span>
              </div>
              <h3 className="text-lg font-semibold">Select AI Model</h3>
              <p className="text-muted-foreground text-sm">
                Pick from our collection of specialized vision models
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <span className="text-primary font-bold">3</span>
              </div>
              <h3 className="text-lg font-semibold">Get Results</h3>
              <p className="text-muted-foreground text-sm">
                Receive detailed, AI-generated captions instantly
              </p>
            </div>
          </div>
          
          <Button asChild size="lg" className="gap-2">
            <Link to="/caption">
              Try Caption Generator
              <Sparkles className="h-5 w-5" />
            </Link>
          </Button>
        </section>
      </div>
    </div>
  );
};

export default Home;