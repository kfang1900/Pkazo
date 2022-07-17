import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import tw, { styled } from 'twin.macro';
import buttons from 'styles/Button';
import Dropdown from 'styles/Dropdown';
import { useMediaQuery } from 'react-responsive';
import Cart from 'components/cart/CartPage';

const CartPage: NextPage = () => {
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
  return (
    <div tw='min-h-[100vh] flex flex-col'>
      <Head>
        <title>Cart</title>
      </Head>
      <Header />
      <div tw='flex-1 flex flex-col'>
        <Cart />
      </div>
    </div>
  );
};
export default CartPage;
