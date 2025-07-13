import React, { useState } from 'react';
import { ImageUpload } from '@/components/caption/ImageUpload';
import { ModelSelector } from '@/components/caption/ModelSelector';
import { CaptionResults } from '@/components/caption/CaptionResults';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Zap, Upload, Bot } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Caption {
  id: string;
  text: string;
  model: string;
  confidence?: number;
  timestamp: Date;
}

const CaptionPage = () => {
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
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            AI Caption Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your images and let our advanced AI models generate detailed, 
            accurate captions using state-of-the-art vision-language technology.
          </p>
        </div>

        {/* Main Interface */}
        <div className="space-y-12">
          {/* Upload and Model Selection */}
          <div className="grid lg:grid-cols-2 gap-8 mx-auto">
            {/* Image Upload */}
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">1. Upload Image</h3>
                </div>
                <ImageUpload
                  onImageSelect={setSelectedImage}
                  selectedImage={selectedImage}
                  className="h-auto"
                />
              </div>
            </Card>
            
            {/* Model Selection */}
            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">2. Choose AI Model</h3>
                </div>
                <ModelSelector
                  selectedModel={selectedModel}
                  onModelSelect={setSelectedModel}
                />
              </div>
            </Card>
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
          
          {/* Results Section */}
          <CaptionResults
            captions={captions}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default CaptionPage;