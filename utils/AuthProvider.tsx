import { useRouter } from 'next/router';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import {
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  FacebookAuthProvider,
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  setPersistence,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
} from 'firebase/auth';

import './FirebaseClient';
import { browserLocalPersistence, User } from '@firebase/auth';
import { getApp } from 'firebase/app';
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  where,
} from 'firebase/firestore';
import { ArtistData } from '../types/dbTypes';

export default function FirebaseProvider({
  children,
}: {
  children?: ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>('');
  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [artistId, setArtistId] = useState<string | null>(null);
  const apiLogin = useCallback(async (user) => {
    const res = await fetch('/api/auth/sessionLogin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idToken: await user.getIdToken(),
      }),
    });

    if (res.ok) {
      setEmail(user.email!);
      await router.push(router.query.to ? router.query.to.toString() : '/');
    } else {
      // TODO fix error here, display to user
      console.warn(`Error logging in ${res.status} ${res.statusText}`);
    }
  }, []);

  useEffect(() => {
    getRedirectResult(getAuth())
      .then(async (result) => {
        if (!result) return;
        return apiLogin(result.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + ' ' + errorMessage);
      });
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setUser(null);
        setEmail('');
      } else {
        setUser(user);
        setEmail(user.email || '');
      }
      // If user is not signed in, set user to null
      if (user === null) {
        // setLoading(false)
        // setUserInfo(null)
        setEmail('');
        return;
      }
      await (async () => {
        const app = getApp();
        const db = getFirestore(app);

        const artistsRef = collection(db, 'artists');
        const q = query(artistsRef, where('associatedUser', '==', user.uid));

        const ref = await getDocs(q);

        ref.forEach((snapshot) => {
          // this assumes that there will only be one result
          setArtistId(snapshot.id);
          setArtistData(snapshot.data() as ArtistData);
          setLoading(false);
        });
      })();
    });

    return unsubscribe;
  }, []);
  const auth = getAuth();
  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle: () => {
          return signInWithRedirect(auth, new GoogleAuthProvider());
        },
        signInWithFacebook: () => {
          return signInWithRedirect(auth, new FacebookAuthProvider());
        },
        signInWithEmailAndPassword: (email: string, password: string) => {
          return signInWithEmailAndPassword(auth, email, password);
        },
        createUserWithEmailAndPassword: (displayName, email, password) => {
          return createUserWithEmailAndPassword(auth, email, password).then(
            async (userCred) => {
              await updateProfile(userCred.user, {
                displayName,
              });
              return userCred;
            }
          );
        },
        setRememberSession: (staySignedIn = true) => {
          return setPersistence(
            auth,
            staySignedIn ? browserSessionPersistence : browserLocalPersistence
          );
        },
        apiLogin,
        email,
        user,
        loading,
        artistData,
        artistId,
        signOut: () => {
          return signOut(getAuth());
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
