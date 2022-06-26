import React, { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import Header from 'components/Header';
import tw, { styled } from 'twin.macro';
import {
  ErrorMessage,
  Formik,
  FormikErrors,
} from 'formik';

import LoginForm from '../components/popups/LoginForm';
import useAuth from '../utils/auth/useAuth';
import { getApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  updateDoc,
  where,
} from 'firebase/firestore';
import ProfileDetailsSection from '../components/onboarding/ProfileDetailsSection';
import CreatePortfoliosSection from '../components/onboarding/CreatePortfoliosSection';
import PortfolioSection from '../components/onboarding/PortfolioSection';
import SocialPostUploadForm from '../components/uploading/SocialPostUploadForm';
import Modal from '../components/popups/Modal';
import { Router, useRouter } from 'next/router';
import { Container } from 'styles/Container';
import buttons from 'styles/Button';
import { useMediaQuery } from 'react-responsive';
import { PortfolioData } from 'types/dbTypes';

export interface OnboardingFormValues {
  name: string;
  discipline: string;
  country: string;
  city: string;
  acceptCommissions: 'yes' | 'no' | null;
  onlySale: 'yes' | 'no' | null;
  uniqueCollections: 'yes' | 'no' | null;
  portfolios: PortfolioData[];
}

function Onboarding() {
  const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
  }, [mediaQuery, isMobile]);

  const [stage, setStage] = useState(0);
  // let artistName = '';
  // let discipline = '';

  const sections = [
    'Profile Details',
    'Create Portfolios'
  ];
  const subtitles = [
    'Let\'s get started! Tell us a little about you.',
    'How would you like to categorize your work?'
  ];
  const defaultCountry = 'United States';

  const [signupFormActive, setSignupFormActive] = useState(false);
  const [artistId, setArtistId] = useState('');
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log(loading, user);
    if (loading) {
      return;
    }
    if (!user) {
      setSignupFormActive(true);
    } else {
      setSignupFormActive(false);

      // determine the stage of the user
      (async () => {
        // check if a profile already exists
        const app = getApp();
        const db = getFirestore(app);

        const artistsRef = collection(db, 'artists');
        const q = query(artistsRef, where('associatedUser', '==', user.uid));

        const ref = await getDocs(q);

        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        let _artistId = '';
        let username = '';
        ref.forEach((snapshot) => {
          _artistId = snapshot.id;
          setArtistId(snapshot.id); // assumes that there will only be one result
          result.push(snapshot);
          username = snapshot.data().username;
        });
        // if (result.length > 0) {
        //   setStage(1);
        // }
        // if (!_artistId) return;
        // const querySnapshot = await getDocs(
        //   collection(db, 'artists', _artistId, 'portfolios')
        // );

        // querySnapshot.forEach(() => {
        //   router.push('/' + username);
        // });
      })();
    }
  }, [loading, user]);
  return (
    <>
      <Head>
        <title>Onboarding</title>
      </Head>

      {signupFormActive && (
        <LoginForm
          defaultSignUp
          notCloseable
          onClose={() => setSignupFormActive(false)}
        />
      )}

      <Header logoOnly />

      <Container tw='mt-5'>
        <div tw='flex flex-col items-center text-center px-6'>
          <div tw='font-semibold text-[#333333] text-[24px]'>
            {sections[stage]}
          </div>
          <div tw='mt-[6px] text-[#333333] text-[16px]'>
            {subtitles[stage]}
          </div>
        </div>
        <Formik<OnboardingFormValues>
          initialValues={{
            name: '',
            discipline: '',
            country: defaultCountry,
            city: '',
            acceptCommissions: null,
            onlySale: null,
            uniqueCollections: null,
            portfolios: []
          }}
          validateOnChange={false}
          validate={(values) => {
            const errors: FormikErrors<OnboardingFormValues> = {};

            // TODO: more rigorous validation, probably using Yup (integrates well with Formik)
            if (!values.name) {
              errors.name = 'Please enter your full name.';
            }

            if (!values.discipline) {
              errors.discipline = 'Please enter your art discipline.';
            }

            return errors;
          }}
          onSubmit={() => { 0 }}
        >
          {({ values, setFieldValue }) =>
            <>
              <div tw='pt-5 md:pt-12 px-6'>
                {stage === 0 && (
                  <ProfileDetailsSection
                    country={defaultCountry}
                    values={values}
                  />
                )}
                {stage === 1 && (
                  <PortfolioSection values={values} />
                )}
              </div>
              <div
                tw='mt-10 md:mt-[60px] md:w-[700px] md:mx-auto md:pb-[30px]'
                css={[isMobile && tw`sticky w-full bottom-0 bg-white pb-4`]}
              >
                {isMobile && <div tw='h-[0.5px] bg-[#E3E3E3]' />}
                <div
                  css={[isMobile ?
                    tw`mt-[14px] grid grid-cols-2 gap-x-6 px-6` :
                    tw`w-full grid grid-cols-[repeat(2, 160px)] justify-between`
                  ]}
                >
                  <button
                    css={[
                      buttons.white,
                      tw`h-12`
                    ]}
                    onClick={() => setStage(stage ? stage - 1 : 0)}
                  >
                    {stage ? 'Back' : 'Cancel'}
                  </button>
                  <button
                    css={[
                      buttons.red,
                      tw`h-12`
                    ]}
                    onClick={() => setStage(stage < 1 ? stage + 1 : 1)}
                  >
                    {stage < 1 ? 'Next' : 'Submit'}
                  </button>
                </div>
              </div>
            </>
          }
        </Formik>
      </Container>

      <div tw='bg-red-500 hidden'>
        {stage === 1 && (
          <CreatePortfoliosSection
            user={user}
            onComplete={() => setStage(2)}
            artistId={artistId}
          />
        )}
      </div>
    </>
  );
}

export default Onboarding;
