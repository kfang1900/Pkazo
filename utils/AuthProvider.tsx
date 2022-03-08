import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';

import './FirebaseClient';

export default function FirebaseProvider({
  children,
}: {
  children?: ReactNode;
}) {
  const router = useRouter();
  const [email, setEmail] = useState<string | undefined>(undefined);

  useEffect(() => {
    getRedirectResult(getAuth())
      .then(async (result) => {
        if (!result) return;

        const res = await fetch('/api/auth/sessionLogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idToken: await result.user.getIdToken(),
          }),
        });

        if (res.ok) {
          setEmail(result.user.email!);
          router.push(router.query.to ? router.query.to.toString() : '/');
        } else alert(`Error logging in ${res.status} ${res.statusText}`);
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

  return (
    <AuthContext.Provider
      value={{
        signIn: () => {
          signInWithRedirect(getAuth(), new GoogleAuthProvider());
        },
        email,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
