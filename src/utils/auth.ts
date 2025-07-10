import { Session } from 'inspector/promises';
import { AuthTokens, LoginCredentials, LoginResponse } from '../types/auth';
import { json } from 'stream/consumers';

const TOKEN_KEY = 'tokens';
const USER_KEY = 'user';

export const authService = {
  // Simulate API login call
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate authentication logic
    if (credentials.email === 'admin@cvapp.com' && credentials.password === 'admin123') {
      const response: LoginResponse = {
        user: {
          id: '1',
          email: credentials.email,
          username: 'John Doe',
          role: 'Administrator',
          avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1'
        },
        tokens: {
          accessToken: 'mock-access-token-' + Date.now(),
          refreshToken: 'mock-refresh-token-' + Date.now(),
          expiresIn: 3600
        },
        success: true
      };
      
      // Store tokens and user data
      this.storeTokens(response.tokens);
      this.storeUser(response.user);
      
      return response;
    } else {
      return {
        user: null as any,
        tokens: null as any,
        success: false,
        message: 'Invalid email or password'
      };
    }
  },

  // Store tokens securely
  storeTokens(tokens: AuthTokens): void {
    localStorage.setItem(TOKEN_KEY, JSON.stringify(tokens));
  },

  // Store user data
  storeUser(user: any): void {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // Get stored tokens
  getTokens(): AuthTokens | null {
    const tokens = localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);
    console.log(tokens)
    return tokens ? JSON.parse(tokens) : null;
  },

  // Get stored user
  getUser(): any {
    const user = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const tokens = this.getTokens();
    return !!tokens?.accessToken;
  },

  // Refresh token
  async refreshToken(): Promise<AuthTokens | null> {
    const currentTokens = this.getTokens();
    if (!currentTokens?.refreshToken) return null;

    // Simulate refresh token API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTokens: AuthTokens = {
      accessToken: 'refreshed-access-token-' + Date.now(),
      refreshToken: currentTokens.refreshToken,
      expiresIn: 3600
    };
    
    this.storeTokens(newTokens);
    return newTokens;
  },

  // Logout
  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }
};