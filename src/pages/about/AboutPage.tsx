import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Info, Brain, Zap, Target, Users, Code, ExternalLink } from 'lucide-react';

const AboutPage = () => {
  const models = [
    {
      name: 'Gemini Vision',
      description: 'Google\'s advanced multimodal AI model with exceptional understanding of visual content and context.',
      strengths: ['Detailed descriptions', 'Context awareness', 'Multi-language support'],
      accuracy: 95,
    },
    {
      name: 'BLIP-2',
      description: 'Salesforce\'s bootstrapped vision-language pre-training model for comprehensive image understanding.',
      strengths: ['Fast processing', 'Reliable performance', 'Good generalization'],
      accuracy: 88,
    },
    {
      name: 'LLaVA',
      description: 'Large Language and Vision Assistant that combines visual perception with language understanding.',
      strengths: ['Conversational', 'Detailed analysis', 'Multi-turn dialogue'],
      accuracy: 91,
    },
    {
      name: 'CLIP',
      description: 'OpenAI\'s model that understands images in the context of natural language descriptions.',
      strengths: ['Fast inference', 'Zero-shot learning', 'Semantic understanding'],
      accuracy: 85,
    },
  ];

  const features = [
    {
      icon: Brain,
      title: 'Multiple AI Models',
      description: 'Choose from 4 state-of-the-art vision-language models, each with unique strengths.',
    },
    {
      icon: Zap,
      title: 'Real-time Processing',
      description: 'Get accurate image captions in seconds with optimized inference pipelines.',
    },
    {
      icon: Target,
      title: 'High Accuracy',
      description: 'Benefit from models trained on millions of image-text pairs for precise results.',
    },
    {
      icon: Users,
      title: 'User-Friendly',
      description: 'Simple interface designed for both technical and non-technical users.',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <Info className="h-8 w-8 text-primary" />
            About VisionLens
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Learn about our AI-powered vision technology and the models that make 
            intelligent image understanding possible.
          </p>
        </div>

        {/* Mission Statement */}
        <Card className="p-8 mb-12 bg-gradient-card border-primary/20">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              VisionLens democratizes access to cutting-edge AI vision technology, making it easy 
              for anyone to generate detailed, accurate descriptions of images using multiple 
              state-of-the-art models. We're building the future of visual understanding, 
              one caption at a time.
            </p>
          </div>
        </Card>

        {/* Key Features */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="p-6 text-center">
                <div className="space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* AI Models */}
        <section className="mb-12">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold">AI Models</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform integrates multiple state-of-the-art vision-language models, 
              each offering unique capabilities and strengths.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {models.map((model, index) => (
              <Card key={index} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold">{model.name}</h3>
                    <Badge variant="outline">
                      {model.accuracy}% accuracy
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {model.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Key Strengths:</div>
                    <div className="flex flex-wrap gap-2">
                      {model.strengths.map((strength, idx) => (
                        <Badge key={idx} variant="secondary">
                          {strength}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  {/* Accuracy Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Accuracy</span>
                      <span>{model.accuracy}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-500"
                        style={{ width: `${model.accuracy}%` }}
                      />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-12">
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold">Technology Stack</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Built with modern web technologies and AI frameworks for optimal performance and user experience.
            </p>
          </div>
          
          <Card className="p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Code className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Frontend</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• React 18 with TypeScript</div>
                  <div>• Tailwind CSS for styling</div>
                  <div>• Shadcn/ui components</div>
                  <div>• Vite for fast development</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">AI Integration</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• Vision-Language Models</div>
                  <div>• REST API integration</div>
                  <div>• Real-time inference</div>
                  <div>• Model comparison tools</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Performance</h3>
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div>• Optimized image processing</div>
                  <div>• Responsive design</div>
                  <div>• Fast loading times</div>
                  <div>• Efficient state management</div>
                </div>
              </div>
            </div>
          </Card>
        </section>

        {/* Future Roadmap */}
        <section>
          <div className="text-center space-y-4 mb-8">
            <h2 className="text-2xl font-bold">What's Next?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're continuously improving VisionLens with new features and capabilities.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-primary rounded-full"></div>
                  <h3 className="font-semibold">Phase 2: Image Search</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Advanced image search capabilities using vector embeddings and 
                  natural language queries.
                </p>
              </div>
            </Card>
            
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-muted rounded-full"></div>
                  <h3 className="font-semibold">Future Enhancements</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Batch processing, API access, custom model fine-tuning, 
                  and enterprise features.
                </p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;