import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';
import CheckoutForm from 'components/cart/CheckoutForm';
import 'twin.macro';

const Checkout: NextPage = () => {
    const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
    }, [mediaQuery, isMobile]);

    const largeQuery = useMediaQuery({ query: `(min-width: 1280px)` });
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    useEffect(() => {
        if (isLargeScreen !== largeQuery) setIsLargeScreen(largeQuery);
    }, [largeQuery, isLargeScreen]);

    return (
        <div tw='min-h-[100vh] flex flex-col'>
            <Head>
                <title>Checkout</title>
            </Head>
            <div tw='flex justify-center mt-[64px]'>
                <CheckoutForm />
            </div>
        </div>
    );
};
export default Checkout;
