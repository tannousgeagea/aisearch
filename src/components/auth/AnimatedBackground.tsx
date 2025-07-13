export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent/5 rounded-full blur-3xl animate-glow"></div>
      <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-primary-glow/10 rounded-full blur-2xl animate-pulse"></div>
    </div>
  )
}