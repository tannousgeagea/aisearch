import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { ImageAnalysisForm } from '@/components/caption/ImageAnalysisForm';
import { AnalysisResults } from '@/components/caption/AnalysisResults';
import { AnalysisResult } from '@/hooks/useImageAnalysis';
import { ComparisonResult } from '@/hooks/useMultiModelAnalysis';
import { StreamingChunk } from '@/hooks/useStreamImageAnalysis';
import { ModelComparisonForm } from '@/components/compare/ModelComparisonForm'
import { ModelComparisonResults } from '@/components/compare/ModelComparisonResults';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sparkles, Users, Bot } from 'lucide-react';
import { useStreamingTypingEffect } from '@/hooks/useTypingEffect';


interface Caption {
  id: string;
  text: string;
  model: string;
  confidence?: number;
  timestamp: Date;
}

const CaptionPage = () => {
  const [streamingText, setLiveText] = useState('');
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [comparisonResults, setComparisonResults] = useState<ComparisonResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const displayText = useStreamingTypingEffect(streamingText, isStreaming, 15);

  const handleAnalysisComplete = (result: AnalysisResult) => {
    setResults(prev => [result, ...prev]);
    setIsStreaming(false);
    setLiveText('');
  };

  const handleComparisonComplete = (results: ComparisonResult[]) => {
    setComparisonResults(results);
  };

  const handleChunk = (chunk: StreamingChunk) => {
    setIsStreaming(true);
    setLiveText((prev) => prev + chunk.chunk);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            AI Image Analysis
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your images and analyze them using multiple AI providers and models.
            Get detailed insights, captions, and understanding from your images.
          </p>
        </div>

        {/* Main Interface */}
        <div className="space-y-12">
          <Tabs defaultValue="single" className="space-y-8">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
              <TabsTrigger value="single" className="gap-2">
                <Bot className="h-4 w-4" />
                Single Model
              </TabsTrigger>
              <TabsTrigger value="compare" className="gap-2">
                <Users className="h-4 w-4" />
                Compare Models
              </TabsTrigger>
            </TabsList>

            {/* Analysis Form */}
            <TabsContent value="single" className="space-y-12">
              <div className="max-w-4xl mx-auto">
                <ImageAnalysisForm onAnalysisComplete={handleAnalysisComplete} onChunk={handleChunk} />
              </div>
              
              {/* Results Section */}
              <div className="max-w-4xl mx-auto">
                <AnalysisResults
                  results={results}
                  liveText={displayText}
                  loading={loading}
                  isStreaming={isStreaming}
                />
              </div>
            </TabsContent>

            <TabsContent value="compare" className="space-y-12">
              {/* Comparison Form */}
              <div className="max-w-4xl mx-auto">
                <ModelComparisonForm onComparisonComplete={handleComparisonComplete} />
              </div>
              
              {/* Comparison Results Section */}
              <div className="w-full">
                <ModelComparisonResults
                  results={comparisonResults}
                  loading={false}
                />
              </div>
            </TabsContent>
          </Tabs>

        </div>
      </div>
    </div>
  );
};
export default CaptionPage;