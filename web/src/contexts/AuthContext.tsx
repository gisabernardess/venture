import { useRouter } from 'next/router';
import { createContext, ReactNode, useState } from 'react';

import { api } from '../services/api';
import { User } from '../models/types';

export type ProviderType = 'GOOGLE' | 'GITHUB' | 'DISCORD';

type SignInCredentials = Pick<User, 'email' | 'password'>;

type SignUpCredentials = Pick<User, 'name' | 'email' | 'password'> & {
  password_confirmation: string;
};

type AuthContextData = {
  socialAuth: (type: ProviderType) => Promise<void>;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  async function socialAuth(type: ProviderType) {
    try {
      switch (type) {
        case 'GITHUB':
          const { data: github } = await api.get('/github/redirect');
          console.log(github);
          break;
        case 'DISCORD':
          const { data: discord } = await api.get('/discord/redirect');
          console.log(discord);
          break;
        case 'GOOGLE':
          const { data: google } = await api.get('/google/redirect');
          console.log(google);
          break;
        default:
          break;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const { data } = await api.post('/login', {
        email,
        password,
      });

      if (data) setUser(data);

      alert('Successfully logged in!');
      router.push(`dashboard/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async function signUp({
    name,
    email,
    password,
    password_confirmation,
  }: SignUpCredentials) {
    try {
      const { data } = await api.post('/register', {
        name,
        email,
        password,
        password_confirmation,
      });

      if (data) setUser(data);

      alert('Registration successful!');
      router.push(`dashboard/${data.id}`);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider
      value={{ socialAuth, signIn, signUp, user, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}
