import { createContext, ReactNode, useState } from 'react';

import { useNotification } from '../hooks/useNotification';

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
  const notification = useNotification();

  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  async function socialAuth(type: ProviderType) {
    try {
      switch (type) {
        case 'GITHUB':
          await api
            .get('/github/redirect')
            .then(({ data: github }) => {
              console.log(github);
            })
            .catch(({ response }) => console.log(response));
          break;
        case 'DISCORD':
          await api
            .get('/discord/redirect')
            .then(({ data: discord }) => {
              console.log(discord);
            })
            .catch(({ response }) => console.log(response));
          break;
        case 'GOOGLE':
          await api
            .get('/google/redirect')
            .then(({ data: google }) => {
              console.log(google);
            })
            .catch(({ response }) => console.log(response));
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
      await api
        .post('/login', {
          email,
          password,
        })
        .then(({ data }) => {
          if (data) setUser(data.user);
          notification.success({
            title: 'Successfully logged in!',
            to: `dashboard/${data.user.id}`,
          });
        })
        .catch(({ response }) => {
          notification.error(response.data.error);
        });
    } catch (error) {
      notification.error(error.message);
    }
  }

  async function signUp({
    name,
    email,
    password,
    password_confirmation,
  }: SignUpCredentials) {
    try {
      await api
        .post('/register', {
          name,
          email,
          password,
          password_confirmation,
        })
        .then(({ data }) => {
          if (data) setUser(data.user);
          notification.success({
            title: 'Registration successful!',
            to: `dashboard/${data.user.id}`,
          });
        })
        .catch(({ response }) => {
          notification.error(response.data.error);
        });
    } catch (error) {
      notification.error(error.message);
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
