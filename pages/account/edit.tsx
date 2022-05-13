import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';
import { getApp } from 'firebase/app';
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { sample_artist } from 'utils/Sample_Posts_Imports';
import {
  showEdu,
  showExp,
  showExh,
  Artist,
  Experience,
  Exhibition,
  Education,
} from 'obj/Artist';
import buttons from 'styles/Button';
import {
  fetchArtistByID,
  loadStorageImage,
} from '../../helpers/FirebaseFunctions';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import ImageUploadButton from '../../components/account/ImageUploadButton';
import useAuth from '../../utils/useAuth';
import useRequireOnboarding from '../../utils/useRequireOnboarding';
import EditProfilePage from '../../components/account/EditProfilePage';
import ShopSettingsPage from '../../components/account/ShopSettingsPage';
type ArtistData = {
  name: string;
  location: string;
  discipline: string;
  bio: string;
  pfp: string;
  cover: string;
  education: Education[];
  exhibitions: Exhibition[];
  experience: Experience[];
};
const EditAccount: NextPage = () => {  const [page, setPage] = useState(0);
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
