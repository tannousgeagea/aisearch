import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export interface ModelSelection {
  provider: string;
  modelName: string;
  enabled: boolean;
}

export interface ComparisonParams {
  file: File;
  models: ModelSelection[];
  analysisType: string;
  prompt?: string;
  detailLevel?: string;
}

export interface ComparisonResult {
  id: string;
  text: string;
  provider: string;
  model: string;
  analysisType: string;
  confidence?: number;
  timestamp: Date;
  status: 'pending' | 'completed' | 'error';
  error?: string;
}

export const useMultiModelAnalysis = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<ComparisonResult[]>([]);
  const { toast } = useToast();

  const analyzeWithMultipleModels = async (params: ComparisonParams): Promise<ComparisonResult[]> => {
    setLoading(true);
    setResults([]);
    
    const enabledModels = params.models.filter(model => model.enabled);
    
    // Initialize results with pending status
    const initialResults: ComparisonResult[] = enabledModels.map((model, index) => ({
      id: `${Date.now()}-${index}`,
      text: '',
      provider: model.provider,
      model: model.modelName,
      analysisType: params.analysisType,
      timestamp: new Date(),
      status: 'pending'
    }));
    
    setResults(initialResults);

    // Run all analyses in parallel
    const analysisPromises = enabledModels.map(async (model, index) => {
      try {
        const formData = new FormData();
        formData.append('file', params.file);
        formData.append('provider', model.provider);
        formData.append('model_name', model.modelName);
        formData.append('analysis_type', params.analysisType);
        formData.append('prompt', params.prompt || '');
        formData.append('detail_level', params.detailLevel || '');

        const response = await fetch('http://localhost:9005/api/v1/analyze-image', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        const result: ComparisonResult = {
          ...initialResults[index],
          text: data.response_text || data.analysis || data.result || data.caption || 'Analysis completed',
          confidence: data.confidence,
          status: 'completed'
        };

        // Update the specific result
        setResults(prev => prev.map(r => r.id === result.id ? result : r));
        
        return result;

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to analyze image';
        const errorResult: ComparisonResult = {
          ...initialResults[index],
          status: 'error',
          error: errorMessage
        };

        setResults(prev => prev.map(r => r.id === errorResult.id ? errorResult : r));
        
        return errorResult;
      }
    });

    try {
      const completedResults = await Promise.all(analysisPromises);
      
      const successCount = completedResults.filter(r => r.status === 'completed').length;
      const errorCount = completedResults.filter(r => r.status === 'error').length;
      
      if (successCount > 0) {
        toast({
          title: "Comparison complete!",
          description: `${successCount} model${successCount > 1 ? 's' : ''} analyzed successfully${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
        });
      } else {
        toast({
          title: "All analyses failed",
          description: "Please check your configuration and try again",
          variant: "destructive",
        });
      }

      return completedResults;
      
    } catch (err) {
      toast({
        title: "Comparison failed",
        description: "An unexpected error occurred during analysis",
        variant: "destructive",
      });
      
      return [];
    } finally {
      setLoading(false);
    }
  };

  const resetResults = () => {
    setResults([]);
  };

  return {
    analyzeWithMultipleModels,
    resetResults,
    loading,
    results,
  };
};