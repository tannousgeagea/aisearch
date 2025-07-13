import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Lock, Eye, EyeOff, Sparkles, Brain, ImageIcon } from 'lucide-react'
import { mockAuth } from '@/components/auth/mockAuth'
import { useToast } from '@/hooks/use-toast'
import { AIIconHeader } from './AIIconHeader'

export function SignInForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      const { user, error } = await mockAuth.signIn(email, password)

      if (error) {
        setError(error.message)
      } else {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        })
        navigate('/')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email address first')
      return
    }

    try {
      const { error } = await mockAuth.resetPassword(email)

      if (error) {
        setError(error.message)
      } else {
        toast({
          title: "Password reset email sent",
          description: "Check your email for password reset instructions.",
        })
      }
    } catch (error) {
      setError('Failed to send password reset email')
    }
  }

  return (
    <Card className="w-full max-w-md shadow-elegant hover:shadow-glow transition-all duration-500 animate-scale-in relative backdrop-blur-sm bg-card/95 border-primary/10">
      <CardHeader className="text-center space-y-6">
        <AIIconHeader />
        
        <div className="space-y-2">
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base">
            Continue your AI-powered image analysis journey
          </CardDescription>
        </div>
        
        <div className="text-xs text-muted-foreground mt-4 p-3 bg-gradient-card border border-primary/10 rounded-lg">
          <div className="flex items-center gap-2 justify-center">
            <Sparkles className="h-3 w-3 text-accent animate-glow" />
            <span>Demo: demo@example.com / any password</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSignIn} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <Button 
            type="submit" 
            className="w-full transition-all duration-300" 
            variant="hero"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Accessing AI Platform...</span>
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                <span>Enter AI Studio</span>
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-4">
          <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
            <ImageIcon className="h-3 w-3" />
            <span>Unlock advanced image understanding</span>
            <Sparkles className="h-3 w-3 animate-glow" />
          </div>
          
          <p className="text-sm text-muted-foreground">
            New to AI Image Analysis?{' '}
            <Link 
              to="/sign-up" 
              className="text-primary hover:text-primary-glow font-medium transition-all duration-300 hover:underline underline-offset-4"
            >
              Create Account
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}