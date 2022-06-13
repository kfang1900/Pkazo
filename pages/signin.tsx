import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from 'components/Header';
import tw from 'twin.macro';
import { Container } from 'styles/Container'
import { useMediaQuery } from 'react-responsive';
import { Login } from 'components/popups/LoginForm';

const LoginPage: NextPage = () => {
    const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
    return <div>
        <Head>
            <title>Login</title>
        </Head>
        <Header />
        <div tw='flex justify-center w-full'>
            <Login onClose={() => 0} />
        </div>
    </div>
}
export default LoginPage;
