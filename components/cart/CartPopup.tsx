import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import tw, { styled } from 'twin.macro';
import buttons from 'styles/Button';
import Dropdown from 'styles/Dropdown';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import Cart from './CartPage';

const CartPopup = ({ onClose }: { onClose: () => void }) => {
    const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
    const router = useRouter();
    if (isMobile) router.push('/cart')
    return <div tw="fixed top-0 left-0 w-full h-full z-50 flex items-center justify-center overflow-auto">
        <style>{`body {overflow: hidden}`}</style>
        <div tw='flex-1 h-full bg-black/60 relative' onClick={onClose}>
            <button
                onClick={onClose}
                tw="absolute top-5 right-5 w-11 h-11 border-0 outline-none bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] rounded-full"
            >
                <img
                    src="/assets/svgs/close.svg"
                    tw="w-4 h-4 m-auto"
                    alt="close button"
                />
            </button>
        </div>
        <div tw='bg-white w-[400px] h-[100vh] overflow-auto'>
            <Cart />
        </div>
    </div >
};
export default CartPopup;
