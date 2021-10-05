import {
  createContext,
  ReactNode,
  useState,
  useContext,
  useEffect,
} from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { useNotification } from '../hooks/useNotification';

import { api } from '../services/api';
import { User } from '../models/types';

export type ProviderType = 'GOOGLE' | 'GITHUB' | 'DISCORD';

export type SocialAuthParams = {
  provider: ProviderType;
  code: string;
};

type AuthenticateProps = Pick<Partial<User>, 'name' | 'email' | 'password'> & {
  password_confirmation?: string;
};

type AuthContextData = {
  signIn: (credentials: AuthenticateProps) => void;
  signUp: (credentials: AuthenticateProps) => void;
  socialAuthRedirect: (provider: ProviderType) => Promise<void>;
  socialAuthCallback: (params: SocialAuthParams) => Promise<void>;
  resetPassword: (credentials: AuthenticateProps) => Promise<void>;
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
      const userStore = localStorage.getItem('venture.user');
      if (userStore) {
        setUser(JSON.parse(userStore));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('venture.user', JSON.stringify(user));
  }, [user]);

  function signIn(credentials: Pick<AuthenticateProps, 'email' | 'password'>) {
    authenticate('/login', credentials, { title: 'Successfully logged in!' });
  }

  function signUp(credentials: AuthenticateProps) {
    authenticate('/register', credentials, {
      title: 'Registration successful!',
    });
  }

  async function socialAuthRedirect(provider: ProviderType) {
    // TODO: create a config for the API URL
    window.location.assign(
      `https://venture-server.herokuapp.com/${provider.toLowerCase()}/redirect`,
    );
  }

  async function socialAuthCallback({ provider, code }: SocialAuthParams) {
    try {
      switch (provider) {
        case 'GITHUB':
          authenticateSocial('/github/callback', code);
          break;
        case 'DISCORD':
          authenticateSocial('/discord/callback', code);
          break;
        case 'GOOGLE':
          authenticateSocial('/google/callback', code);
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
          destroyCookie(undefined, 'venture.token');
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

  async function resetPassword(credentials: Pick<AuthenticateProps, 'email'>) {
    try {
      await api
        .post('/reset', { ...credentials })
        .then(({ data: { newPassword } }) => {
          notification.password({
            message: `Your new password: ${newPassword}`,
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
        .then(({ data: { user, access } }) => {
          setCookie(undefined, 'venture.token', access.token, {
            maxAge: access.expiresAt ?? 60 * 60 * 24, // 24 hours
          });

          setUser(user);

          api.defaults.headers['Authorization'] = `Bearer ${access.token}`;

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

  async function authenticateSocial(url: string, code: string) {
    try {
      await api
        .get(url, { params: { code } })
        .then(({ data: { user, access } }) => {
          if (user) {
            setCookie(undefined, 'venture.token', access.token, {
              maxAge: access.expiresAt ?? 60 * 60 * 24, // 24 hours
            });

            setUser(user);

            api.defaults.headers['Authorization'] = `Bearer ${access.token}`;

            notification.success({
              title: 'Successfully logged in!',
              to: `/dashboard/${user.id}`,
            });
          }
        })
        .catch(({ response }) => console.log(response));
    } catch (error) {
      notification.error(error.message);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        socialAuthRedirect,
        socialAuthCallback,
        signIn,
        signUp,
        logout,
        resetPassword,
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
