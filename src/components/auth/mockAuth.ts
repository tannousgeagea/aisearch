// Mock authentication service that simulates future API structure
interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

interface AuthResponse {
  user: User | null;
  error: { message: string } | null;
}

interface Session {
  user: User;
  access_token: string;
  expires_at: number;
}

class MockAuthService {
  private users: User[] = [
    {
      id: '1',
      email: 'demo@example.com',
      full_name: 'Demo User',
      created_at: new Date().toISOString(),
    }
  ];

  private currentSession: Session | null = null;

  async signUp(email: string, password: string, fullName: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    const existingUser = this.users.find(u => u.email === email);
    if (existingUser) {
      return {
        user: null,
        error: { message: 'User already registered' }
      };
    }

    // Simulate password validation
    if (password.length < 6) {
      return {
        user: null,
        error: { message: 'Password must be at least 6 characters' }
      };
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email,
      full_name: fullName,
      created_at: new Date().toISOString(),
    };

    this.users.push(newUser);

    return {
      user: newUser,
      error: null
    };
  }

  async signIn(email: string, password: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Find user
    const user = this.users.find(u => u.email === email);
    if (!user) {
      return {
        user: null,
        error: { message: 'Invalid email or password' }
      };
    }

    // Simulate password check (in real implementation, this would be secure)
    if (password === 'wrongpassword') {
      return {
        user: null,
        error: { message: 'Invalid email or password' }
      };
    }

    // Create session
    this.currentSession = {
      user,
      access_token: 'mock-jwt-token-' + Date.now(),
      expires_at: Date.now() + (24 * 60 * 60 * 1000), // 24 hours
    };

    // Store session in localStorage for persistence
    localStorage.setItem('mock_session', JSON.stringify(this.currentSession));

    return {
      user,
      error: null
    };
  }

  async resetPassword(email: string): Promise<{ error: { message: string } | null }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = this.users.find(u => u.email === email);
    if (!user) {
      return {
        error: { message: 'No user found with this email address' }
      };
    }

    // In real implementation, this would send an email
    console.log(`Password reset email would be sent to: ${email}`);
    
    return {
      error: null
    };
  }

  getCurrentSession(): Session | null {
    if (this.currentSession) {
      return this.currentSession;
    }

    // Try to restore session from localStorage
    const storedSession = localStorage.getItem('mock_session');
    if (storedSession) {
      const session = JSON.parse(storedSession);
      if (session.expires_at > Date.now()) {
        this.currentSession = session;
        return session;
      } else {
        localStorage.removeItem('mock_session');
      }
    }

    return null;
  }

  async signOut(): Promise<void> {
    this.currentSession = null;
    localStorage.removeItem('mock_session');
  }
}

export const mockAuth = new MockAuthService();