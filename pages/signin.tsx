import React, { useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from 'components/Header';
import tw from 'twin.macro';
import { Container } from 'styles/Container';
import { useMediaQuery } from 'react-responsive';
import queryString from 'query-string';
import { Login } from 'components/popups/LoginForm';
import { useRouter } from 'next/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const LoginPage: NextPage = () => {
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
  const router = useRouter();
  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        // TODO: why is queryString.exclude used? the query string in the redirect should be URL encoded so there shouldn't
        // be a need to pass through any query parameters
        router.push(
          ((queryString.parse(window.location.search).redirect as string) ||
            '/') + queryString.exclude(window.location.search, ['redirect'])
        );
      }
    });
  }, []);
  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <Header logoOnly />
      <div tw="flex justify-center w-full">
        <Login
          onClose={() => 0}
          redirect={() =>
            router.push(
              ((queryString.parse(window.location.search).redirect as string) ||
                '/') + queryString.exclude(window.location.search, ['redirect'])
            )
          }
          defaultSignUp={
            typeof window !== 'undefined' &&
            typeof queryString.parse(window.location.search).register !==
              'undefined'
          }
        />
      </div>
    </div>
  );
};
export default LoginPage;
