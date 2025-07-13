import { Brain, ImageIcon, Scan } from 'lucide-react'

export function AIIconHeader() {
  return (
    <div className="flex justify-center space-x-2 mb-4">
      <div className="p-3 rounded-full bg-gradient-primary shadow-glow animate-glow">
        <Brain className="h-6 w-6 text-primary-foreground" />
      </div>
      <div className="p-3 rounded-full bg-accent/20 border border-accent/30">
        <ImageIcon className="h-6 w-6 text-accent" />
      </div>
      <div className="p-3 rounded-full bg-primary/10 border border-primary/20">
        <Scan className="h-6 w-6 text-primary" />
      </div>
    </div>
  )
}