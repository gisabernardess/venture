import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react';
import { setCookie, parseCookies } from 'nookies';

import { useNotification } from '../hooks/useNotification';

import { api } from '../services/api';
import { User } from '../models/types';

export type ProviderType = 'GOOGLE' | 'GITHUB' | 'DISCORD';

type AuthenticateProps = Pick<Partial<User>, 'name' | 'email' | 'password'> & {
  password_confirmation?: string;
};

type AuthContextData = {
  signIn: (credentials: AuthenticateProps) => void;
  signUp: (credentials: AuthenticateProps) => void;
  socialAuth: (type: ProviderType) => Promise<void>;
  logout: () => Promise<void>;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const notification = useNotification();

  const [user, setUser] = useState<User | null>(null);
  const isAuthenticated = !!user;

  useEffect(() => {
    const { ['venture.token']: token } = parseCookies();

    if (token) {
      api.get('/me').then(({ data: { user } }) => setUser(user));
    }
  }, []);

  function signIn(credentials: Pick<AuthenticateProps, 'email' | 'password'>) {
    authenticate('/login', credentials, { title: 'Successfully logged in!' });
  }

  function signUp(credentials: AuthenticateProps) {
    authenticate('/register', credentials, {
      title: 'Registration successful!',
    });
  }

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

  async function logout() {
    try {
      await api
        .post('/logout')
        .then(() => {
          setUser(null);
          notification.success({
            title: 'Successfully logged out!',
            to: '/',
          });
        })
        .catch(({ response }) => notification.error(response.data.error));
    } catch (error) {
      notification.error(error.message);
    }
  }

  async function authenticate(
    url: string,
    credentials: AuthenticateProps,
    toast?: {
      title: string;
    },
  ) {
    try {
      await api
        .post(url, {
          ...credentials,
        })
        .then(({ data: { user, token } }) => {
          setCookie(undefined, 'venture.token', token, {
            maxAge: 60 * 60 * 24, // 24 hours
          });

          setUser(user);

          api.defaults.headers['Authorization'] = `Bearer ${token}`;

          notification.success({
            title: toast.title,
            to: `dashboard/${user.id}`,
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
      value={{ socialAuth, signIn, signUp, logout, user, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
