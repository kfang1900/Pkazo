import { createContext } from 'react';
import { User, UserCredential } from '@firebase/auth';

export type Auth = {
  signInWithEmailAndPassword?: (
    email: string,
    password: string
  ) => Promise<UserCredential>;
  createUserWithEmailAndPassword?: (
    displayName: string,
    email: string,
    password: string
  ) => Promise<UserCredential>;
  apiLogin?: (user: User) => void;
  signInWithGoogle?: () => Promise<void>;
  signInWithFacebook?: () => Promise<void>;
  setRememberSession?: (staySignedIn: boolean) => Promise<void>;
  signOut?: () => Promise<void>;
  email?: string;
};

const AuthContext = createContext<Auth>({});

export default AuthContext;
