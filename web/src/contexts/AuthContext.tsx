import { useRouter } from 'next/router';
import { createContext, ReactNode, useState } from 'react';
import Router from 'next/router';

import { api } from '../services/api';
import { User } from '../models/types';

type SignUpCredentials = Pick<User, 'name' | 'email' | 'password'> & {
  password_confirmation: string;
};

type SignInCredentials = Pick<User, 'email' | 'password'>;

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
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
      console.log(error.message);
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
    <AuthContext.Provider value={{ signIn, signUp, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
