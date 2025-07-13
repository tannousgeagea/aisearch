import React, { useState } from 'react';
import { Hero } from '@/components/common/Hero';
import { ImageUpload } from '@/components/caption/ImageUpload';
import { ModelSelector } from '@/components/caption/ModelSelector';
import { CaptionResults } from '@/components/caption/CaptionResults';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Caption {
  id: string;
  text: string;
  model: string;
  confidence?: number;
  timestamp: Date;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [captions, setCaptions] = useState<Caption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock caption generation - replace with actual API calls
  const generateCaption = async () => {
    if (!selectedImage || !selectedModel) {
      toast({
        title: "Missing requirements",
        description: "Please select both an image and a model",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock responses based on model
      const mockCaptions = {
        'gemini-vision': "A detailed view showing a person working at a modern workspace with multiple monitors, surrounded by plants and natural lighting. The scene captures a professional yet comfortable environment with careful attention to ergonomic setup and aesthetic design elements.",
        'blip2': "A person sitting at a desk with computer equipment in a bright room.",
        'llava': "The image shows a modern office workspace featuring dual monitors on a clean desk, with a person engaged in computer work. The setting includes decorative plants and appears to be well-lit with natural light, creating a productive and pleasant work environment.",
        'clip': "Office workspace with person using computer"
      };

      const newCaption: Caption = {
        id: Date.now().toString(),
        text: mockCaptions[selectedModel as keyof typeof mockCaptions] || "Generated caption for the selected image.",
        model: selectedModel,
        confidence: Math.random() * 0.3 + 0.7, // 70-100%
        timestamp: new Date()
      };

      setCaptions(prev => [newCaption, ...prev]);
      
      toast({
        title: "Caption generated!",
        description: "Your image has been successfully analyzed",
      });
    } catch (err) {
      setError("Failed to generate caption. Please try again.");
      toast({
        title: "Generation failed",
        description: "There was an error analyzing your image",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const canGenerate = selectedImage && selectedModel && !loading;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <Hero />
      
      {/* Main Interface */}
      <div className="container mx-auto px-4 py-16 space-y-12">
        {/* Upload Section */}
        <section id="upload-section" className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Upload & Analyze</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Start by uploading an image and selecting your preferred AI model 
              for intelligent caption generation.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Image Upload */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">1. Upload Image</h3>
              <ImageUpload
                onImageSelect={setSelectedImage}
                selectedImage={selectedImage}
                className="h-auto"
              />
            </div>
            
            {/* Model Selection */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">2. Choose AI Model</h3>
              <Card className="p-4">
                <ModelSelector
                  selectedModel={selectedModel}
                  onModelSelect={setSelectedModel}
                />
              </Card>
            </div>
          </div>
          
          {/* Generate Button */}
          <div className="text-center">
            <Button
              variant="hero"
              size="lg"
              onClick={generateCaption}
              disabled={!canGenerate}
              className="gap-2 group"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Caption
                  <Zap className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </>
              )}
            </Button>
          </div>
        </section>
        
        {/* Results Section */}
        <section className="space-y-8">
          <CaptionResults
            captions={captions}
            loading={loading}
            error={error}
          />
        </section>
        
        {/* Future Features Preview */}
        <section className="py-16">
          <div className="text-center space-y-8">
            <h2 className="text-3xl font-bold">Coming Soon</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced image search capabilities powered by vector embeddings and 
              natural language understanding.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <Card className="p-6 bg-gradient-card border-primary/20">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Search by Text</h3>
                  <p className="text-muted-foreground">
                    Describe what you're looking for in natural language and find 
                    matching images from your collection.
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-card border-primary/20">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Search by Image</h3>
                  <p className="text-muted-foreground">
                    Upload an image and discover visually similar content using 
                    advanced embedding similarity.
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;