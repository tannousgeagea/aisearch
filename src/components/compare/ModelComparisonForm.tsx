import React, { useState } from 'react';
import { ImageUpload } from '@/components/caption/ImageUpload';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Zap, Upload, Bot, Settings, Users } from 'lucide-react';
import { useMultiModelAnalysis, ModelSelection, ComparisonResult } from '@/hooks/useMultiModelAnalysis';

interface ModelComparisonFormProps {
  onComparisonComplete: (results: ComparisonResult[]) => void;
}

const providers = [
  { value: 'gemini', label: 'Google Gemini', color: 'bg-blue-500' },
  { value: 'openai', label: 'OpenAI GPT-4 Vision', color: 'bg-green-500' },
  { value: 'anthropic', label: 'Anthropic Claude', color: 'bg-orange-500' },
  { value: 'huggingface', label: 'Hugging Face', color: 'bg-purple-500' },
];

const models = {
  gemini: [
    { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
    { value: 'gemini-1.5-pro', label: 'Gemini 1.5 Pro' },
    { value: 'gemini-vision-pro', label: 'Gemini Vision Pro' },
  ],
  openai: [
    { value: 'gpt-4-vision-preview', label: 'GPT-4 Vision Preview' },
    { value: 'gpt-4o', label: 'GPT-4o' },
  ],
  anthropic: [
    { value: 'claude-3-opus', label: 'Claude 3 Opus' },
    { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
  ],
  huggingface: [
    { value: 'blip2', label: 'BLIP-2' },
    { value: 'llava', label: 'LLaVA' },
  ],
};

const analysisTypes = [
  { value: 'scene_understanding', label: 'Scene Understanding' },
  { value: 'object_detection', label: 'Object Detection' },
  { value: 'text_extraction', label: 'Text Extraction' },
  { value: 'caption_generation', label: 'Caption Generation' },
  { value: 'detailed_description', label: 'Detailed Description' },
];

const detailLevels = [
  { value: 'low', label: 'Low Detail' },
  { value: 'medium', label: 'Medium Detail' },
  { value: 'high', label: 'High Detail' },
  { value: 'very_high', label: 'Very High Detail' },
];

export const ModelComparisonForm: React.FC<ModelComparisonFormProps> = ({ onComparisonComplete }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedModels, setSelectedModels] = useState<ModelSelection[]>([]);
  const [analysisType, setAnalysisType] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [detailLevel, setDetailLevel] = useState<string>('');

  const { analyzeWithMultipleModels, loading, results } = useMultiModelAnalysis();

  const addModel = (provider: string, modelName: string) => {
    const exists = selectedModels.some(m => m.provider === provider && m.modelName === modelName);
    if (!exists) {
      setSelectedModels(prev => [...prev, { provider, modelName, enabled: true }]);
    }
  };

  const removeModel = (provider: string, modelName: string) => {
    setSelectedModels(prev => prev.filter(m => !(m.provider === provider && m.modelName === modelName)));
  };

  const toggleModel = (provider: string, modelName: string) => {
    setSelectedModels(prev => prev.map(m => 
      m.provider === provider && m.modelName === modelName 
        ? { ...m, enabled: !m.enabled }
        : m
    ));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage || !analysisType || selectedModels.filter(m => m.enabled).length === 0) {
      return;
    }

    const results = await analyzeWithMultipleModels({
      file: selectedImage,
      models: selectedModels,
      analysisType,
      prompt,
      detailLevel,
    });

    onComparisonComplete(results);
  };

  const canAnalyze = selectedImage && analysisType && selectedModels.filter(m => m.enabled).length > 0 && !loading;
  const enabledCount = selectedModels.filter(m => m.enabled).length;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-semibold">2. Select Models to Compare</h3>
            </div>
            {enabledCount > 0 && (
              <Badge variant="secondary" className="gap-1">
                <Bot className="h-3 w-3" />
                {enabledCount} model{enabledCount > 1 ? 's' : ''} selected
              </Badge>
            )}
          </div>
          
          {/* Quick Add Models */}
          <div className="space-y-4">
            {providers.map((provider) => {
              const availableModels = models[provider.value as keyof typeof models] || [];
              return (
                <div key={provider.value} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${provider.color}`} />
                    <h4 className="font-medium">{provider.label}</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ml-5">
                    {availableModels.map((model) => {
                      const isSelected = selectedModels.some(m => m.provider === provider.value && m.modelName === model.value);
                      return (
                        <Button
                          key={model.value}
                          type="button"
                          variant={isSelected ? "default" : "outline"}
                          size="sm"
                          onClick={() => {
                            if (isSelected) {
                              removeModel(provider.value, model.value);
                            } else {
                              addModel(provider.value, model.value);
                            }
                          }}
                          className="justify-start h-auto py-2 px-3"
                        >
                          {model.label}
                        </Button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Models List */}
          {selectedModels.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-medium">Selected Models:</h4>
              <div className="space-y-2">
                {selectedModels.map((model) => {
                  const provider = providers.find(p => p.value === model.provider);
                  const modelInfo = models[model.provider as keyof typeof models]?.find(m => m.value === model.modelName);
                  
                  return (
                    <div key={`${model.provider}-${model.modelName}`} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={model.enabled}
                          onCheckedChange={() => toggleModel(model.provider, model.modelName)}
                        />
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${provider?.color}`} />
                          <span className="text-sm font-medium">{provider?.label}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm">{modelInfo?.label}</span>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeModel(model.provider, model.modelName)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        Remove
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Analysis Configuration */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">3. Analysis Configuration</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="analysisType">Analysis Type</Label>
              <Select value={analysisType} onValueChange={setAnalysisType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select analysis type" />
                </SelectTrigger>
                <SelectContent>
                  {analysisTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="detailLevel">Detail Level (Optional)</Label>
              <Select value={detailLevel} onValueChange={setDetailLevel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select detail level" />
                </SelectTrigger>
                <SelectContent>
                  {detailLevels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prompt">Custom Prompt (Optional)</Label>
            <Textarea
              id="prompt"
              placeholder="Enter a custom prompt to guide the analysis..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
            />
          </div>
        </div>
      </Card>

      {/* Submit Button */}
      <div className="text-center">
        <Button
          type="submit"
          variant="hero"
          size="lg"
          disabled={!canAnalyze}
          className="gap-2 group"
        >
          {loading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
              Comparing Models...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Compare {enabledCount} Model{enabledCount > 1 ? 's' : ''}
              <Zap className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
};