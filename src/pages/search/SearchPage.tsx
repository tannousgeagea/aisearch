import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Image, Type, Zap, ArrowRight } from 'lucide-react';

const SearchPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Search className="h-8 w-8 text-primary" />
            Image Search
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Search through your image collection using natural language descriptions 
            or visual similarity matching with advanced AI embeddings.
          </p>
        </div>

        {/* Coming Soon Section */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-gradient-card border-primary/20 text-center">
            <div className="space-y-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              
              <div className="space-y-4">
                <h2 className="text-2xl font-bold">Coming Soon in Phase 2</h2>
                <p className="text-muted-foreground">
                  We're working on advanced image search capabilities that will revolutionize 
                  how you find and organize your visual content.
                </p>
              </div>

              {/* Planned Features */}
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="text-left space-y-4">
                  <div className="flex items-center gap-3">
                    <Type className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Text-Based Search</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Describe what you're looking for in natural language: 
                    "sunset over mountains" or "people in business attire"
                  </p>
                </div>
                
                <div className="text-left space-y-4">
                  <div className="flex items-center gap-3">
                    <Image className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Visual Similarity</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Upload a reference image and find visually similar content 
                    using advanced embedding similarity algorithms
                  </p>
                </div>
              </div>

              <div className="pt-6">
                <Button className="gap-2" disabled>
                  <Search className="h-4 w-4" />
                  Search Feature Coming Soon
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
          
          {/* Technology Preview */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <span className="text-primary font-bold">AI</span>
                </div>
                <h3 className="font-semibold">Vector Embeddings</h3>
                <p className="text-sm text-muted-foreground">
                  Advanced neural networks convert images into searchable vector representations
                </p>
              </div>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Optimized search algorithms provide instant results across large image collections
                </p>
              </div>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">Smart Matching</h3>
                <p className="text-sm text-muted-foreground">
                  Understands context, objects, scenes, and emotions in your search queries
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;