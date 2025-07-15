import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Download, Clock, Bot, Zap, CheckCircle, XCircle, Loader, BarChart3, Grid, List } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ComparisonResult } from '@/hooks/useMultiModelAnalysis';

interface ModelComparisonResultsProps {
  results: ComparisonResult[];
  loading: boolean;
}

export const ModelComparisonResults: React.FC<ModelComparisonResultsProps> = ({
  results,
  loading
}) => {
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'table'>('grid');

  const copyAllResults = async () => {
    const content = results.map(result => {
      if (result.status === 'completed') {
        return `${result.provider} (${result.model}):
${result.text}

---`;
      } else if (result.status === 'error') {
        return `${result.provider} (${result.model}): ERROR - ${result.error}

---`;
      }
      return `${result.provider} (${result.model}): PENDING

---`;
    }).join('\n');

    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "All comparison results copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadComparison = () => {
    const content = `Model Comparison Results
Generated: ${new Date().toLocaleString()}

${results.map(result => {
  let section = `Provider: ${result.provider}
Model: ${result.model}
Analysis Type: ${result.analysisType}
Status: ${result.status}
Timestamp: ${result.timestamp.toLocaleString()}`;

  if (result.confidence) {
    section += `\nConfidence: ${(result.confidence * 100).toFixed(1)}%`;
  }

  if (result.status === 'completed') {
    section += `\n\nAnalysis:\n${result.text}`;
  } else if (result.status === 'error') {
    section += `\n\nError: ${result.error}`;
  }

  return section;
}).join('\n\n' + '='.repeat(80) + '\n\n')}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `model-comparison-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getStatusIcon = (status: ComparisonResult['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'pending':
        return <Loader className="h-4 w-4 animate-spin text-blue-500" />;
    }
  };

  const getProviderColor = (provider: string) => {
    switch (provider) {
      case 'gemini': return 'bg-blue-500';
      case 'openai': return 'bg-green-500';
      case 'anthropic': return 'bg-orange-500';
      case 'huggingface': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  if (results.length === 0 && !loading) {
    return (
      <Card className="p-8">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mx-auto">
            <BarChart3 className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">Ready to Compare</h3>
          <p className="text-muted-foreground">
            Select multiple models and run your analysis to see a detailed comparison.
          </p>
        </div>
      </Card>
    );
  }

  const completedResults = results.filter(r => r.status === 'completed');
  const errorResults = results.filter(r => r.status === 'error');
  const pendingResults = results.filter(r => r.status === 'pending');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-semibold">Model Comparison Results</h3>
          <p className="text-muted-foreground">
            {completedResults.length} completed • {errorResults.length} failed • {pendingResults.length} pending
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="rounded-l-none"
            >
              <BarChart3 className="h-4 w-4" />
            </Button>
          </div>
          
          {completedResults.length > 0 && (
            <>
              <Button variant="outline" size="sm" onClick={copyAllResults}>
                <Copy className="h-4 w-4 mr-1" />
                Copy All
              </Button>
              <Button variant="outline" size="sm" onClick={downloadComparison}>
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Results Display */}
      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)} className="w-full">
        <TabsContent value="grid" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {results.map((result) => (
              <Card key={result.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getProviderColor(result.provider)}`} />
                      <CardTitle className="text-base">{result.provider}</CardTitle>
                    </div>
                    {getStatusIcon(result.status)}
                  </div>
                  <Badge variant="outline" className="w-fit">{result.model}</Badge>
                </CardHeader>
                
                <CardContent className="space-y-3">
                  {result.status === 'completed' && (
                    <div className="prose prose-sm max-w-none">
                      <p className="text-foreground text-sm line-clamp-4">{result.text}</p>
                    </div>
                  )}
                  
                  {result.status === 'error' && (
                    <div className="text-sm text-red-500 bg-red-50 p-2 rounded">
                      Error: {result.error}
                    </div>
                  )}
                  
                  {result.status === 'pending' && (
                    <div className="text-sm text-blue-500 bg-blue-50 p-2 rounded flex items-center gap-2">
                      <Loader className="h-3 w-3 animate-spin" />
                      Analyzing...
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {result.timestamp.toLocaleString()}
                    {result.confidence && (
                      <>
                        <span>•</span>
                        <span>{(result.confidence * 100).toFixed(1)}%</span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          {results.map((result) => (
            <Card key={result.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${getProviderColor(result.provider)}`} />
                    <CardTitle className="text-lg">{result.provider}</CardTitle>
                    <Badge variant="outline">{result.model}</Badge>
                    {getStatusIcon(result.status)}
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {result.timestamp.toLocaleString()}
                    {result.confidence && (
                      <>
                        <span>•</span>
                        <span>{(result.confidence * 100).toFixed(1)}% confidence</span>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                {result.status === 'completed' && (
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground whitespace-pre-wrap">{result.text}</p>
                  </div>
                )}
                
                {result.status === 'error' && (
                  <div className="text-sm text-red-500 bg-red-50 p-3 rounded">
                    <strong>Error:</strong> {result.error}
                  </div>
                )}
                
                {result.status === 'pending' && (
                  <div className="text-sm text-blue-500 bg-blue-50 p-3 rounded flex items-center gap-2">
                    <Loader className="h-4 w-4 animate-spin" />
                    Analysis in progress...
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Comparison Table</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Provider</th>
                      <th className="text-left p-3 font-medium">Model</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Confidence</th>
                      <th className="text-left p-3 font-medium">Response Preview</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((result) => (
                      <tr key={result.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${getProviderColor(result.provider)}`} />
                            {result.provider}
                          </div>
                        </td>
                        <td className="p-3">{result.model}</td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(result.status)}
                            <span className="capitalize">{result.status}</span>
                          </div>
                        </td>
                        <td className="p-3">
                          {result.confidence ? `${(result.confidence * 100).toFixed(1)}%` : '-'}
                        </td>
                        <td className="p-3 max-w-md">
                          {result.status === 'completed' && (
                            <span className="text-sm line-clamp-2">{result.text}</span>
                          )}
                          {result.status === 'error' && (
                            <span className="text-sm text-red-500">Error: {result.error}</span>
                          )}
                          {result.status === 'pending' && (
                            <span className="text-sm text-blue-500">Analyzing...</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};