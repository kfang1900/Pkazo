import React, { useState } from 'react';
import type { NextPage } from 'next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';

import { sample_artist } from 'utils/Sample_Posts_Imports';
import { showEdu, showExp, showExh } from 'obj/Artist';
import buttons from 'styles/Button';
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
