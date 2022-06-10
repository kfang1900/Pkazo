import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';

import { Container } from 'styles/Container';
import UploadWork from 'components/uploading/UploadWork';

const Upload: NextPage = () => {
  return (
    <>
      <Header isBuyer />
      <Container>
        <UploadWork onClose={() => 0} />
      </Container>
    </>
  );
};

export default Upload;
