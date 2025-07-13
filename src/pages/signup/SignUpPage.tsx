import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Mail, Lock, User, Eye, EyeOff, Scan, Sparkles, Brain, ImageIcon, Zap, Camera } from 'lucide-react'
import { mockAuth } from '@/components/auth/mockAuth'
import { useToast } from '@/hooks/use-toast'

export default function SignUpPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      const { user, error } = await mockAuth.signUp(email, password, fullName)

      if (error) {
        setError(error.message)
      } else {
        toast({
          title: "Account created successfully!",
          description: "You can now sign in with your new account.",
        })
        navigate('/signin')
      }
    } catch (error) {
      setError('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-hero p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/5 w-40 h-40 bg-primary/5 rounded-full blur-3xl animate-glow"></div>
        <div className="absolute bottom-1/4 right-1/5 w-56 h-56 bg-accent/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-primary-glow/10 rounded-full blur-2xl animate-glow"></div>
        <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-accent/8 rounded-full blur-2xl animate-pulse"></div>
      </div>

      <Card className="w-full max-w-md shadow-elegant hover:shadow-glow transition-all duration-500 animate-scale-in relative backdrop-blur-sm bg-card/95 border-primary/10">
        <CardHeader className="text-center space-y-6">
          {/* AI-themed feature showcase */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-gradient-card border border-primary/10">
              <Camera className="h-5 w-5 text-primary animate-pulse" />
              <span className="text-xs text-muted-foreground">Capture</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-gradient-primary shadow-glow">
              <Brain className="h-5 w-5 text-primary-foreground animate-glow" />
              <span className="text-xs text-primary-foreground font-medium">Analyze</span>
            </div>
            <div className="flex flex-col items-center space-y-2 p-3 rounded-lg bg-gradient-card border border-accent/20">
              <Sparkles className="h-5 w-5 text-accent animate-glow" />
              <span className="text-xs text-muted-foreground">Understand</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Join AI Vision
            </CardTitle>
            <CardDescription className="text-base">
              Start understanding images like never before
            </CardDescription>
          </div>
          
          <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Zap className="h-3 w-3 text-accent animate-glow" />
              <span>Instant Analysis</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
            <div className="flex items-center gap-1">
              <Scan className="h-3 w-3 text-primary" />
              <span>AI Powered</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignUp} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

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
                  placeholder="Create a password"
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

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
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
                  <span>Building AI Profile...</span>
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4 animate-glow" />
                  <span>Start AI Journey</span>
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-4">
            <div className="flex items-center gap-2 justify-center text-xs text-muted-foreground">
              <ImageIcon className="h-3 w-3" />
              <span>Powered by advanced computer vision</span>
              <Brain className="h-3 w-3 animate-pulse" />
            </div>
            
            <p className="text-sm text-muted-foreground">
              Already exploring AI imagery?{' '}
              <Link 
                to="/signin" 
                className="text-primary hover:text-primary-glow font-medium transition-all duration-300 hover:underline underline-offset-4"
              >
                Sign In
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
