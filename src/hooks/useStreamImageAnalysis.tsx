import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { baseURL } from '@/components/api/base';

export interface AnalysisParams {
  file: File;
  provider: string;
  modelName: string;
  analysisType: string;
  prompt?: string;
  detailLevel?: string;
}

export interface AnalysisResult {
  id: string;
  text: string;
  provider: string;
  model: string;
  analysisType: string;
  confidence?: number;
  timestamp: Date;
}

export interface StreamingChunk {
  chunk: string;
  is_complete: boolean;
  chunk_index: number;
  total_chunks?: number;
  metadata?: Record<string, any>;
}

export const useStreamImageAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeImageStream = async (
    params: AnalysisParams,
    onChunk?: (chunk: StreamingChunk) => void
  ): Promise<AnalysisResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', params.file);
      formData.append('model_name', params.modelName);
      formData.append('provider', params.provider);
      formData.append('prompt', params.prompt || '');

      const response = await fetch(`${baseURL}/api/v1/analyze-image/stream`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok || !response.body) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let partial = '';
      let fullText = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        partial += decoder.decode(value, { stream: true });
        const lines = partial.split('\n');
        partial = lines.pop()!; // keep last incomplete line

        for (const line of lines) {
          if (!line.trim()) continue;
          const chunk: StreamingChunk = JSON.parse(line);
          fullText += chunk.chunk;

          if (onChunk) {
            onChunk(chunk); // notify the UI about each piece
          }
        }
      }
      const result: AnalysisResult = {
        id: Date.now().toString(),
        text: fullText,
        provider: params.provider,
        model: params.modelName,
        analysisType: params.analysisType,
        confidence: undefined,
        timestamp: new Date(),
      };

      toast({
        title: "Analysis complete!",
        description: "Streaming analysis completed successfully",
      });

      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Streaming failed';
      setError(errorMessage);

      toast({
        title: "Streaming failed",
        description: errorMessage,
        variant: "destructive",
      });

      return null;
    } finally {
      setLoading(false);
    }
  };
  
  return {
    analyzeImageStream,
    loading,
    error,
  };
};