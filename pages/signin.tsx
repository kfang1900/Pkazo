import React, { useEffect, useMemo } from 'react';
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
  const redirect = useMemo(() => {
    if (typeof window === 'undefined') {
      return '/';
    }
    const queryParam =
      queryString.parse(window.location.search).redirect + '' || '/';
    return queryParam.indexOf('/signin') !== 0 ? queryParam : '/';
  }, []);
  console.log(
    'LOADED',
    typeof window !== 'undefined' ? window.location.href : 'undef'
  );
  useEffect(() => {
    return onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        router.push(redirect);
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
          redirect={() => {
            router.push(redirect);
          }}
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
