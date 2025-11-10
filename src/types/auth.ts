export interface User {
  id: string;
  email: string;
  name: string;
}

export interface LoginResponse {
  message: string;
  requiresOtp: boolean;
  email: string;
}

export interface VerifyOtpResponse {
  message: string;
  user: User;
  tokens?: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ProfileResponse {
  user: User;
  message: string;
}

export interface ResendOtpResponse {
  message: string;
  requiresOtp: boolean;
  email: string;
}

export interface LogoutResponse {
  message: string;
}

export interface RefreshTokenResponse {
  message: string;
  tokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
}
