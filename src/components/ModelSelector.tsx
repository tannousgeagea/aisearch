import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bot, Zap, Eye, Brain } from 'lucide-react';

export interface VLMModel {
  id: string;
  name: string;
  description: string;
  capabilities: string[];
  speed: 'fast' | 'medium' | 'slow';
  accuracy: 'high' | 'medium' | 'low';
  icon: React.ComponentType<any>;
}

const models: VLMModel[] = [
  {
    id: 'gemini-vision',
    name: 'Gemini Vision',
    description: 'Google\'s powerful multimodal AI with excellent reasoning capabilities',
    capabilities: ['Object Detection', 'Scene Understanding', 'Text Recognition', 'Complex Reasoning'],
    speed: 'medium',
    accuracy: 'high',
    icon: Brain
  },
  {
    id: 'blip2',
    name: 'BLIP-2',
    description: 'Bootstrapped vision-language pre-training for unified understanding',
    capabilities: ['Image Captioning', 'Visual QA', 'Object Recognition'],
    speed: 'fast',
    accuracy: 'high',
    icon: Eye
  },
  {
    id: 'llava',
    name: 'LLaVA',
    description: 'Large Language and Vision Assistant for detailed image analysis',
    capabilities: ['Detailed Descriptions', 'Conversation', 'Visual Reasoning'],
    speed: 'medium',
    accuracy: 'high',
    icon: Bot
  },
  {
    id: 'clip',
    name: 'CLIP',
    description: 'Contrastive Language-Image Pre-training for versatile understanding',
    capabilities: ['Image Classification', 'Similarity Search', 'Zero-shot Recognition'],
    speed: 'fast',
    accuracy: 'medium',
    icon: Zap
  }
];

interface ModelSelectorProps {
  selectedModel: string | null;
  onModelSelect: (modelId: string) => void;
  disabled?: boolean;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({
  selectedModel,
  onModelSelect,
  disabled = false
}) => {
  const getSpeedColor = (speed: string) => {
    switch (speed) {
      case 'fast': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'slow': return 'text-red-600 bg-red-100';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getAccuracyColor = (accuracy: string) => {
    switch (accuracy) {
      case 'high': return 'text-blue-600 bg-blue-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Select Vision Model</h2>
        <p className="text-muted-foreground">Choose the AI model to analyze your image</p>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        {models.map((model) => {
          const IconComponent = model.icon;
          const isSelected = selectedModel === model.id;
          
          return (
            <Card
              key={model.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-elegant ${
                isSelected 
                  ? 'ring-2 ring-primary shadow-glow bg-gradient-card' 
                  : 'hover:shadow-elegant'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => !disabled && onModelSelect(model.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{model.name}</CardTitle>
                    </div>
                  </div>
                  {isSelected && (
                    <Badge variant="default" className="bg-gradient-primary">
                      Selected
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm">
                  {model.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex gap-2 flex-wrap">
                  <Badge className={getSpeedColor(model.speed)} variant="outline">
                    {model.speed} speed
                  </Badge>
                  <Badge className={getAccuracyColor(model.accuracy)} variant="outline">
                    {model.accuracy} accuracy
                  </Badge>
                </div>
                
                <div>
                  <p className="text-sm font-medium mb-2">Capabilities:</p>
                  <div className="flex flex-wrap gap-1">
                    {model.capabilities.map((capability) => (
                      <Badge key={capability} variant="secondary" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};