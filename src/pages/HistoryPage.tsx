import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, Calendar, Bot, Image, Download, Trash2 } from 'lucide-react';

const HistoryPage = () => {
  // Mock history data - replace with actual data from storage/API
  const mockHistory = [
    {
      id: '1',
      image: '/placeholder.svg',
      caption: 'A modern office workspace featuring dual monitors on a clean desk, with a person engaged in computer work. The setting includes decorative plants and appears to be well-lit with natural light.',
      model: 'gemini-vision',
      confidence: 0.92,
      timestamp: new Date('2024-01-15T10:30:00'),
    },
    {
      id: '2',
      image: '/placeholder.svg',
      caption: 'A person sitting at a desk with computer equipment in a bright room.',
      model: 'blip2',
      confidence: 0.85,
      timestamp: new Date('2024-01-15T09:15:00'),
    },
    {
      id: '3',
      image: '/placeholder.svg',
      caption: 'Office workspace with person using computer',
      model: 'clip',
      confidence: 0.78,
      timestamp: new Date('2024-01-14T16:45:00'),
    },
  ];

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getModelColor = (model: string) => {
    const colors = {
      'gemini-vision': 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
      'blip2': 'bg-green-500/10 text-green-700 dark:text-green-300',
      'llava': 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
      'clip': 'bg-orange-500/10 text-orange-700 dark:text-orange-300',
    };
    return colors[model as keyof typeof colors] || 'bg-gray-500/10 text-gray-700 dark:text-gray-300';
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold flex items-center gap-3">
              <History className="h-8 w-8 text-primary" />
              Caption History
            </h1>
            <p className="text-muted-foreground">
              View and manage your previously generated image captions
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export All
            </Button>
            <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
              <Trash2 className="h-4 w-4" />
              Clear History
            </Button>
          </div>
        </div>

        {/* History List */}
        <div className="space-y-6">
          {mockHistory.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="space-y-4">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto">
                  <History className="h-8 w-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">No captions yet</h3>
                  <p className="text-muted-foreground">
                    Start generating captions to see your history here
                  </p>
                </div>
                <Button asChild>
                  <a href="/caption">Generate Your First Caption</a>
                </Button>
              </div>
            </Card>
          ) : (
            mockHistory.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="grid md:grid-cols-4 gap-6">
                  {/* Image */}
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <Image className="h-8 w-8 text-muted-foreground" />
                  </div>
                  
                  {/* Caption Content */}
                  <div className="md:col-span-2 space-y-3">
                    <p className="text-sm leading-relaxed">{item.caption}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getModelColor(item.model)}>
                        <Bot className="h-3 w-3 mr-1" />
                        {item.model}
                      </Badge>
                      <Badge variant="outline">
                        {Math.round(item.confidence * 100)}% confidence
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Actions and Metadata */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {formatDate(item.timestamp)}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-3 w-3" />
                        Export
                      </Button>
                      <Button variant="ghost" size="sm" className="gap-2 text-destructive hover:text-destructive">
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Statistics */}
        {mockHistory.length > 0 && (
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">{mockHistory.length}</div>
                <div className="text-sm text-muted-foreground">Total Captions</div>
              </div>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {new Set(mockHistory.map(h => h.model)).size}
                </div>
                <div className="text-sm text-muted-foreground">Models Used</div>
              </div>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="space-y-2">
                <div className="text-2xl font-bold text-primary">
                  {Math.round(mockHistory.reduce((acc, h) => acc + h.confidence, 0) / mockHistory.length * 100)}%
                </div>
                <div className="text-sm text-muted-foreground">Avg. Confidence</div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;