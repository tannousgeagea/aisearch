import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, Sparkles, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Caption {
  id: string;
  text: string;
  model: string;
  confidence?: number;
  timestamp: Date;
}

interface CaptionResultsProps {
  captions: Caption[];
  loading: boolean;
  error?: string | null;
}

export const CaptionResults: React.FC<CaptionResultsProps> = ({
  captions,
  loading,
  error
}) => {
  const { toast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = async (caption: Caption) => {
    try {
      await navigator.clipboard.writeText(caption.text);
      setCopiedId(caption.id);
      toast({
        title: "Copied to clipboard",
        description: "Caption has been copied to your clipboard",
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy caption to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadCaption = (caption: Caption) => {
    const blob = new Blob([caption.text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `caption-${caption.model}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Caption downloaded",
      description: "Caption has been saved to your downloads",
    });
  };

  if (loading) {
    return (
      <Card className="animate-fade-in">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
            <div>
              <h3 className="font-semibold">Analyzing image...</h3>
              <p className="text-sm text-muted-foreground">
                The AI model is processing your image
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="animate-fade-in border-destructive">
        <CardContent className="p-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-destructive">Analysis Failed</h3>
            <p className="text-sm text-muted-foreground">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (captions.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <div className="p-4 rounded-full bg-muted/50 w-fit mx-auto">
              <Sparkles className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold">Ready to analyze</h3>
              <p className="text-sm text-muted-foreground">
                Upload an image and select a model to generate captions
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold mb-2">Generated Captions</h2>
        <p className="text-muted-foreground">AI-generated descriptions of your image</p>
      </div>

      <div className="space-y-4">
        {captions.map((caption) => (
          <Card key={caption.id} className="hover:shadow-elegant transition-all duration-300">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  {caption.model}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {caption.confidence && (
                    <Badge variant="outline" className="text-xs">
                      {Math.round(caption.confidence * 100)}% confidence
                    </Badge>
                  )}
                  <Badge variant="secondary" className="text-xs">
                    {caption.timestamp.toLocaleTimeString()}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="bg-gradient-card p-4 rounded-lg border">
                <p className="text-foreground leading-relaxed">
                  {caption.text}
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="ai"
                  size="sm"
                  onClick={() => copyToClipboard(caption)}
                  className="gap-1"
                >
                  <Copy className="h-4 w-4" />
                  {copiedId === caption.id ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => downloadCaption(caption)}
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