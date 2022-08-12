import { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useMediaQuery } from 'react-responsive';
import tw from 'twin.macro';

import Header from 'components/Header';
import CheckoutForm from 'components/cart/CheckoutForm';
import CheckoutCart from 'components/cart/CheckoutCart';
import createShippingRates from '../utils/shipping/createShippingRates';

const Checkout: NextPage = () => {
  const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
  }, [mediaQuery, isMobile]);

  const largeQuery = useMediaQuery({ query: `(min-width: 1024px)` });
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    if (isLargeScreen !== largeQuery) setIsLargeScreen(largeQuery);
  }, [largeQuery, isLargeScreen]);

  const [page, setPage] = useState(0);
  const [shippingCost, setShippingCost] = useState<number | null>(null);

  useEffect(() => {
    createShippingRates().then((r) => console.log(r));
  }, []);
  return (
    <div tw="min-h-[100vh] flex flex-col">
      <Head>
        <title>Checkout</title>
      </Head>
      {!isLargeScreen && <Header logoOnly />}
      <div
        tw="flex justify-center"
        css={[!isLargeScreen && tw`flex-col-reverse items-center`]}
      >
        <div tw="min-w-[36px] xl:min-w-[60px] flex-grow" />
        <CheckoutForm
          country="United States"
          page={page}
          setPage={setPage}
          isMobile={isMobile}
          isLargeScreen={isLargeScreen}
          shippingCost={shippingCost}
          setShippingCost={setShippingCost}
        />
        <div tw="w-[1px] bg-[#DCDCDC] ml-16 flex-none" />
        <CheckoutCart page={page} shippingCost={shippingCost} />
        <div tw="min-w-[36px] xl:min-w-[60px] flex-grow bg-[#FAFAFA]" />
      </div>
    </div>
  );
};
export default Checkout;
