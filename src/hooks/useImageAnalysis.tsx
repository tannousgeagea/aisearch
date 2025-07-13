import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { baseURL } from "@/components/api/base";

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

export const useImageAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const analyzeImage = async (params: AnalysisParams): Promise<AnalysisResult | null> => {
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', params.file);
      formData.append('provider', params.provider);
      formData.append('model_name', params.modelName);
      formData.append('analysis_type', params.analysisType);
      formData.append('prompt', params.prompt || '');
      formData.append('detail_level', params.detailLevel || '');

      const response = await fetch(`${baseURL}/api/v1/analyze-image`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      const result: AnalysisResult = {
        id: Date.now().toString(),
        text: data.response_text || data.result || data.caption || 'Analysis completed',
        provider: params.provider,
        model: params.modelName,
        analysisType: params.analysisType,
        confidence: data.confidence,
        timestamp: new Date()
      };

      toast({
        title: "Analysis complete!",
        description: "Your image has been successfully analyzed",
      });

      return result;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image';
      setError(errorMessage);
      
      toast({
        title: "Analysis failed",
        description: errorMessage,
        variant: "destructive",
      });
      
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    analyzeImage,
    loading,
    error,
  };
};