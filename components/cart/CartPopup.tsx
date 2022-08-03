import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import tw, { styled } from 'twin.macro';
import buttons from 'styles/Button';
import Dropdown from 'styles/Dropdown';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import { CartComponent } from './CartPage';

const CartPopup = ({
  onClose,
  toShow,
}: {
  onClose: () => void;
  toShow: boolean;
}) => {
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
  const router = useRouter();
  if (isMobile && toShow) router.push('/cart');
  return (
    <div
      tw="fixed top-0 left-0 w-full z-50 overflow-auto"
      css={[toShow && tw`h-full`]}
    >
      {toShow && <style>{`body {overflow: hidden}`}</style>}
      {toShow && (
        <div tw="w-full h-full bg-black/60 relative" onClick={onClose} />
      )}
      <div
        tw="fixed top-0 right-0 flex duration-300"
        css={[!toShow && tw`-right-full`]}
      >
        <button
          onClick={onClose}
          tw="absolute top-5 right-[420px] w-11 h-11 border-0 flex items-center justify-center rounded-full"
          className="group"
        >
          <div tw="w-0 transition-all duration-200 group-hover:w-full group-hover:h-full h-0 absolute bg-white/20 rounded-full z-[-1]" />
          <img
            src="/assets/svgs/close.svg"
            tw="w-4 h-4 m-auto"
            alt="close button"
          />
        </button>
        <div tw="bg-white w-[400px] h-[100vh] overflow-auto">
          <CartComponent />
        </div>
      </div>
    </div>
  );
};
export default CartPopup;
