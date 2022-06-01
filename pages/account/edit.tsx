import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import tw, { styled } from 'twin.macro';

import useRequireOnboarding from '../../utils/useRequireOnboarding';
import EditProfilePage from '../../components/account/EditProfilePage';
import ShopSettingsPage from '../../components/account/ShopSettingsPage';

const EditAccount: NextPage = () => {
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
      <Header isBuyer />
      <div tw="flex h-full">
        <div tw="sticky top-0 w-[289px] border-r border-r-[#D8D8D8] pt-2">
          {pages.map((p, i) => (
            <div
              key={i}
              css={[
                tw`my-5 py-2 ml-[60px] cursor-pointer`,
                page === i && tw`font-bold`,
              ]}
              onClick={() => setPage(i)}
            >
              {p}
            </div>
          ))}
        </div>
        {page === 0 && <EditProfilePage />}
        {page === 1 && <ShopSettingsPage />}
      </div>
    </>
  );
};

export default EditAccount;
