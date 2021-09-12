import { createContext, ReactNode, useEffect, useState } from 'react';
import Router from 'next/router';

import { api } from '../services/api';
import { User } from '../models/types';

type SignInCredentials = Pick<User, 'email' | 'password'>;

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      //console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  }

  async function signUp({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/register', {
        email,
        password,
      });
      console.log(response.data);
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
