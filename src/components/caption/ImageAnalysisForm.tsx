import React, { useState } from 'react';
import { ImageUpload } from '@/components/caption/ImageUpload';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Zap, Upload, Bot, Settings } from 'lucide-react';
import { useImageAnalysis, AnalysisResult } from '@/hooks/useImageAnalysis';
import { useStreamImageAnalysis, StreamingChunk } from '@/hooks/useStreamImageAnalysis';

interface ImageAnalysisFormProps {
  onAnalysisComplete: (result: AnalysisResult) => void;
  onChunk?: (chunk: StreamingChunk) => void;
}

const providers = [
  { value: 'gemini', label: 'Google Gemini' },
  { value: 'openai', label: 'OpenAI GPT-4 Vision' },
  { value: 'anthropic', label: 'Anthropic Claude' },
  { value: 'huggingface', label: 'Hugging Face' },
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
  { value: 'general_description', label: 'Caption Generation' },
  { value: 'style_analysis', label: 'Style Analysis' },
];

const detailLevels = [
  { value: 'low', label: 'Low Detail' },
  { value: 'medium', label: 'Medium Detail' },
  { value: 'high', label: 'High Detail' },
  { value: 'very_high', label: 'Very High Detail' },
];

export const ImageAnalysisForm: React.FC<ImageAnalysisFormProps> = ({ onAnalysisComplete, onChunk }) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [provider, setProvider] = useState<string>('');
  const [modelName, setModelName] = useState<string>('');
  const [analysisType, setAnalysisType] = useState<string>('');
  const [prompt, setPrompt] = useState<string>('');
  const [detailLevel, setDetailLevel] = useState<string>('');

  const { analyzeImageStream, loading, error } = useStreamImageAnalysis();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedImage || !provider || !modelName || !analysisType) {
      return;
    }

    const result = await analyzeImageStream({
      file: selectedImage,
      provider,
      modelName,
      analysisType,
      prompt,
      detailLevel,
    }, onChunk);

    if (result) {
      onAnalysisComplete(result);
    }
  };

  const canAnalyze = selectedImage && provider && modelName && analysisType && !loading;
  const availableModels = provider ? models[provider as keyof typeof models] || [] : [];

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

      {/* Provider and Model Selection */}
      <Card className="p-6">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            <h3 className="text-xl font-semibold">2. Choose Provider & Model</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Select value={provider} onValueChange={(value) => {
                setProvider(value);
                setModelName(''); // Reset model when provider changes
              }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((p) => (
                    <SelectItem key={p.value} value={p.value}>
                      {p.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="model">Model</Label>
              <Select value={modelName} onValueChange={setModelName} disabled={!provider}>
                <SelectTrigger>
                  <SelectValue placeholder="Select model" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model.value} value={model.value}>
                      {model.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
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
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Analyze Image
              <Zap className="h-4 w-4 group-hover:scale-110 transition-transform" />
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="text-center">
          <p className="text-destructive text-sm">{error}</p>
        </div>
      )}
    </form>
  );
};