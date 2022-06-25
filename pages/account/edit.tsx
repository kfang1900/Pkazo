import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import tw, { styled } from 'twin.macro';

import useRequireOnboarding from '../../utils/hooks/useRequireOnboarding';
import EditProfilePage from '../../components/account/EditProfilePage';
import ShopSettingsPage from '../../components/account/ShopSettingsPage';
import { useMediaQuery } from 'react-responsive';

const EditAccount: NextPage = () => {
  const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
  }, [mediaQuery, isMobile]);
  const [page, setPage] = useState(0);
  useRequireOnboarding();

  const pages = [
    'Edit Profile',
    'Shop Settings',
    // 'Apps and Websites',
    // 'Email and SMS',
  ];
  return (
    <>
      <Head>
        <title>Edit profile</title>
      </Head>
      {!isMobile && <Header isBuyer />}
      <div tw="flex h-full w-full">
        <div tw="sticky top-0 px-[60px] pt-2 flex-shrink-0 h-full hidden md:block">
          {pages.map((p, i) => (
            <div
              key={i}
              css={[
                tw`my-5 py-2 cursor-pointer`,
                page === i && tw`font-bold`,
              ]}
              onClick={() => setPage(i)}
            >
              {p}
            </div>
          ))}
        </div>
        <div tw='border-l border-l-[#D8D8D8] w-full'>
          {page === 0 && <EditProfilePage />}
          {page === 1 && <ShopSettingsPage />}
        </div>
      </div>
    </>
  );
};

export default EditAccount;
