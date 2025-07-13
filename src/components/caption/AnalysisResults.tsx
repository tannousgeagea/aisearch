import React, {useEffect, useRef} from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Copy, Download, Clock, Bot, Zap } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AnalysisResult } from '@/hooks/useImageAnalysis';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

interface AnalysisResultsProps {
  results: AnalysisResult[];
  loading: boolean;
  error?: string | null;
  liveText?:string;
  isStreaming?:boolean;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({
  results,
  loading,
  error,
  liveText,
  isStreaming
}) => {
  const { toast } = useToast();
  const liveScrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (liveScrollRef.current) {
      liveScrollRef.current.scrollTo({
        top: liveScrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [liveText]);

  const copyToClipboard = async (result: AnalysisResult) => {
    try {
      await navigator.clipboard.writeText(result.text);
      toast({
        title: "Copied!",
        description: "Analysis result copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadResult = (result: AnalysisResult) => {
    const content = `Image Analysis Result
            Provider: ${result.provider}
            Model: ${result.model}
            Analysis Type: ${result.analysisType}
            Timestamp: ${result.timestamp.toLocaleString()}
            ${result.confidence ? `Confidence: ${(result.confidence * 100).toFixed(1)}%` : ''}

            Analysis:
            ${result.text}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `analysis-${result.id}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Card className="p-8">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto transition-all duration-300" />
          <h3 className="text-lg font-semibold">Analyzing Image...</h3>
          <p className="text-muted-foreground">
            This may take a few moments depending on the model and image complexity.
          </p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-8 border-destructive">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mx-auto">
            <Zap className="h-6 w-6 text-destructive" />
          </div>
          <h3 className="text-lg font-semibold text-destructive">Analysis Failed</h3>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </Card>
    );
  }

  if (results.length === 0 && liveText.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto">
            <Bot className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">Ready to Analyze</h3>
          <p className="text-muted-foreground">
            Upload an image and configure your analysis settings to get started.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-semibold">Analysis Results</h3>
        <p className="text-muted-foreground">
          {results.length} {results.length === 1 ? 'result' : 'results'} generated
        </p>
      </div>

      {liveText && isStreaming && (
        <Card className="p-6 bg-muted">
          <CardHeader>
            <CardTitle className="text-md font-semibold">Live Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              ref={liveScrollRef}
              className="prose prose-sm max-w-none whitespace-pre-wrap max-h-96 overflow-y-auto pr-2"
            >
              <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                {liveText}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {results.map((result) => (
          <Card key={result.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{result.analysisType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{result.provider}</Badge>
                  <Badge variant="outline">{result.model}</Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {result.timestamp.toLocaleString()}
                </div>
                {result.confidence && (
                  <div className="flex items-center gap-1">
                    <Zap className="h-4 w-4" />
                    {(result.confidence * 100).toFixed(1)}% confidence
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">              
              <div className="prose prose-sm max-w-none whitespace-pre-wrap max-h-96 overflow-y-auto pr-2">
                <ReactMarkdown
                  components={{
                    strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
                    ul: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                    li: ({ children }) => <li className="text-sm">{children}</li>,
                  }}
                >{result.text.replace(/\n/g, '  \n')}</ReactMarkdown>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(result)}
                  className="gap-1"
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadResult(result)}
                  className="gap-1"
                >
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};