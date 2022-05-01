import { createContext } from 'react';
import { User, UserCredential } from '@firebase/auth';

export type Auth = {
  signInWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<UserCredential | null>;
  createUserWithEmailAndPassword: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<UserCredential | null>;
  apiLogin: (user: User) => void;
  signInWithGoogle: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  setRememberSession: (staySignedIn: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  email: string;
};

const AuthContext = createContext<Auth>({
  signInWithEmailAndPassword: async (email: string, password: string) => null,
  createUserWithEmailAndPassword: async (
    displayName: string,
    email: string,
    password: string
  ) => null,
  apiLogin: async (user: User) => null,
  signInWithGoogle: async () => {},
  signInWithFacebook: async () => {},
  setRememberSession: async (staySignedIn: boolean) => {},
  signOut: async () => {},
  email: '',
});

export default AuthContext;
