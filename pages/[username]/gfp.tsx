import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Header from 'components/Header';
import { Container } from 'pages/[username]/index';

const EditPortfolio: NextPage = () => {
  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <Header isBuyer />
      <Container>
        <div tw="mt-6 font-semibold text-[32px]">Portfolio and Works</div>
      </Container>
    </>
  );
};

export default EditPortfolio;
