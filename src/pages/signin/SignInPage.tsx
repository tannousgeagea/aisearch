import { AnimatedBackground } from '@/components/auth/AnimatedBackground'
import { FeatureShowcase } from '@/components/auth/FeatureShowcase'
import { SignInForm } from '@/components/auth/SignInForm'

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-hero relative overflow-hidden">
      <AnimatedBackground />

      <div className="flex min-h-screen">
        <FeatureShowcase />
        
        <div className="flex items-center justify-center p-4 lg:p-12 flex-1">
          <SignInForm />
        </div>
      </div>
    </div>
  )
}