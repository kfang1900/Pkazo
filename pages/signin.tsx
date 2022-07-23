import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from 'components/Header';
import tw from 'twin.macro';
import { Container } from 'styles/Container'
import { useMediaQuery } from 'react-responsive';
import queryString from 'query-string';
import { Login } from 'components/popups/LoginForm';
import { useRouter } from 'next/router';

const LoginPage: NextPage = () => {
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
  const router = useRouter();
  console.log('router setup done');
  return <div>
    <Head>
      <title>Login</title>
    </Head>
    <Header logoOnly />
    <div tw='flex justify-center w-full'>
      <Login
        onClose={() => 0}
        redirect={() => router.push(
          (queryString.parse(window.location.search).redirect as string || '/') + (queryString.exclude(window.location.search, ['redirect']))
        )}
      />
    </div>
  </div>
}
export default LoginPage;