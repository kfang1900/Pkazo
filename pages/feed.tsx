import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';

import { Container } from './profile/[username]/index';

const Feed: NextPage = () => {
  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      <Header />
      <div></div>
    </>
  );
};

export default Feed;
