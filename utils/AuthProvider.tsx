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
import { browserLocalPersistence } from '@firebase/auth';

export default function FirebaseProvider({
  children,
}: {
  children?: ReactNode;
}) {
  const router = useRouter();
  const [email, setEmail] = useState<string | undefined>(undefined);
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
      router.push(router.query.to ? router.query.to.toString() : '/');
    } else alert(`Error logging in ${res.status} ${res.statusText}`);
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
      // If user is not signed in, set user to null
      if (user === null) {
        // setLoading(false)
        // setUserInfo(null)
        setEmail(undefined);
        return;
      }
      setEmail(user.email!);
      /*
      // Otherwise fetch account details
      const res = await fetch('/api/account/me?_vercel_no_cache=1')
      if (!res.ok) {
        // setLoading(false)
        // setUserInfo(null)
        setEmail(undefined)
        return
      }

      try {
        // Set user info
        // const userInfo: UserInfo = await res.json()
        // setUserInfo(userInfo)

        // Set loading to false since we have user info
        // setLoading(false)
      } catch (err) {
        if (err instanceof SyntaxError) {
          // Could parse JSON
        //   setLoading(false)
        } else {
          // Other error
          console.error(err)
        }
      }*/
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
        signOut: () => {
          return signOut(getAuth());
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
