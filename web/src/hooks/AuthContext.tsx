import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface AuthState {
  token: string;
  user: object;
}

interface LogInData {
  email: string;
  password: string;
}

interface AuthContextI {
  user: object;
  logIn(data: LogInData): Promise<void>;
  logOut(): void;
}

const AuthContext = createContext<AuthContextI>({} as AuthContextI);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@Stocker:token');
    const user = localStorage.getItem('@Stocker:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const logIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@Stocker:token', token);
    localStorage.setItem('@Stocker:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('@Stocker:token');
    localStorage.removeItem('@Stocker:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextI {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }

  return context;
}
