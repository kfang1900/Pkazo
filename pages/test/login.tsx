import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';

import { Container } from '../profile/[username]/index';
import LoginForm from '../../components/popups/LoginForm';

const Feed: NextPage = () => {
  return (
    <>
      <Header tw="border-b border-[#D8D8D8]" isBuyer />
      <Container>
        <LoginForm onClose={() => 0} />
      </Container>
    </>
  );
};

export default Feed;
