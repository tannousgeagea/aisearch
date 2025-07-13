import { Brain, Sparkles, Scan } from 'lucide-react'

export function FeatureShowcase() {
  return (
    <div className="hidden lg:flex flex-1 flex-col justify-center p-12 space-y-8">
      <div className="space-y-6">
        <h1 className="text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
          AI-Powered Image Understanding
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Transform how you analyze and understand visual content with cutting-edge computer vision technology.
        </p>
      </div>

      <div className="grid gap-6">
        <div className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-card border border-primary/10">
          <div className="p-2 rounded-full bg-primary/10">
            <Brain className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Advanced AI Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Extract insights, identify objects, and understand context in any image with state-of-the-art AI models.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-card border border-accent/10">
          <div className="p-2 rounded-full bg-accent/10">
            <Sparkles className="h-6 w-6 text-accent animate-glow" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Instant Recognition</h3>
            <p className="text-sm text-muted-foreground">
              Get real-time results and detailed descriptions of visual content within seconds.
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-4 p-4 rounded-lg bg-gradient-card border border-primary/10">
          <div className="p-2 rounded-full bg-primary-glow/10">
            <Scan className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">Smart Captioning</h3>
            <p className="text-sm text-muted-foreground">
              Generate accurate, contextual captions and descriptions for accessibility and content management.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-8 pt-4 border-t border-primary/10">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">99.9%</div>
          <div className="text-xs text-muted-foreground">Accuracy</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent">2.3s</div>
          <div className="text-xs text-muted-foreground">Avg Speed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary-glow">50M+</div>
          <div className="text-xs text-muted-foreground">Images Analyzed</div>
        </div>
      </div>
    </div>
  )
}