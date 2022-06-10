import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';

import { Container } from 'styles/Container';
import LoginForm from 'components/popups/LoginForm';

const Login: NextPage = () => {
  return (
    <>
      <Header isBuyer />
      <Container>
        <LoginForm onClose={() => 0} />
      </Container>
    </>
  );
};

export default Login;
