import { createContext } from 'react';
import { User, UserCredential } from '@firebase/auth';
import { ArtistData, UserData } from '../../types/dbTypes';

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
  loading: boolean;
  user: User | null;
  artistData: ArtistData | null;
  artistId: string | null;
  userData: UserData | null;
};

const AuthContext = createContext<Auth>({
  signInWithEmailAndPassword: async (email: string, password: string) => null,
  createUserWithEmailAndPassword: async (
    displayName: string,
    email: string,
    password: string
  ) => null,
  apiLogin: async (user: User) => null,
  signInWithGoogle: async () => {
    /* noop */
  },
  signInWithFacebook: async () => {
    /* noop */
  },
  setRememberSession: async (staySignedIn: boolean) => {
    /* noop */
  },
  signOut: async () => {
    /* noop */
  },
  email: '',
  loading: true,
  user: null,
  artistData: null,
  artistId: null,
  userData: null,
});

export default AuthContext;
