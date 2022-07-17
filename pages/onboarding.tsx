import React, { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import Header from 'components/Header';
import tw, { styled } from 'twin.macro';
import { ErrorMessage, Formik, FormikErrors, useFormikContext } from 'formik';
import {
  getStorage,
  ref,
  StorageError,
  uploadBytesResumable,
} from 'firebase/storage';
import LoginForm from '../components/popups/LoginForm';
import useAuth from '../utils/auth/useAuth';
import { getApp } from 'firebase/app';
import {
  DocumentReference,
  addDoc,
  collection,
  doc,
  DocumentData,
  Firestore,
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
import uploadImageBlob from '../utils/firebase/uploadImageBlob';

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

  const sections = ['Profile Details', 'Create Portfolios'];
  const subtitles = [
    "Let's get started! Tell us a little about you.",
    'How would you like to categorize your work?',
  ];
  const defaultCountry = 'United States';

  const [signupFormActive, setSignupFormActive] = useState(false);
  const [artistId, setArtistId] = useState('');
  const [formValues, setFormValues] = useState({});
  const { user, loading } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  const uploadNewWork = async (workImageBlob: string, artistref: string) => {
    const app = getApp();
    const db = getFirestore(app);
    const storage = getStorage(app);
    const ref = await addDoc(collection(db, 'works'), {
      title: '',
    });
    const workId = ref.id;
    const workImageRef = await uploadImageBlob(
      storage,
      workImageBlob,
      `/Works/${workId}/`,
      'image1'
    );
    //console.log("storage work-reference", workImageRef)
    const finalref = await updateDoc(doc(db, 'works', workId), {
      images: [workImageRef],
      artist: artistref,
      description: 'No description provided yet',
    });

    return workId;
  };

  const uploadPortfolio = async (
    artistref: string,
    portfolio: PortfolioData
  ) => {
    //Step 2.1: Upload the images to storage bucket
    const app = getApp();
    const db = getFirestore(app);
    const storage = getStorage(app);

    const workPromises: Promise<string>[] = []; //Promises of storage reference strings
    portfolio.works.forEach((work) => {
      workPromises.push(uploadNewWork(work, artistref)); //upload work images to storage bucket
    });
    const workRefs = await Promise.all(workPromises);
    //console.log('finished uploading works', workRefs);

    //Step 2.2 Upload main image:
    const portPicture = await uploadImageBlob(
      storage,
      portfolio.picture,
      `/Artists/${artistref}/Portfolio/${portfolio.name}`,
      'image1'
    );

    const portObject = {
      name: portfolio.name,
      description: portfolio.description,
      picture: portPicture,
      works: workRefs,
    };
    //console.log('adding portfolio Object', portObject);

    const portref = await addDoc(
      collection(db, 'artists', artistref, 'portfolios'),
      portObject
    );
    //console.log('uploaded Portfolio', portref);
    return portref;
  };

  const submitForm = async (values: OnboardingFormValues) => {
    //console.log('submitting values', values);
    if (artistId !== '') {
      throw new Error(
        'User already has artist profile, no onboarding necessary'
      );
    }
    if (!user) {
      throw new Error('User is not defined');
    }
    //console.log(values);
    const app = getApp();
    const db = getFirestore(app);
    const username = values.name
      .split(' ')
      .map((n) => n.toLowerCase())
      .join('-');
    //Step 1: add the artist document
    const artistref = await addDoc(collection(db, 'artists'), {
      associatedUser: user.uid,
      artistName: values.name,
      acceptingCommissions: values.acceptCommissions === 'yes' ? true : false,
      bio: "This user hasn't completed their bio yet.",
      coverImage: '',
      discipline: values.discipline,
      education: [],
      exhibitions: [],
      experience: [],
      faqs: [],
      followers: 0,
      following: 0,
      gender: '',
      approved: true,
      location: values.city + ' ' + values.country,
      name: values.name,
      profilePicture: '',
      numWorks: '',
      username: username,
    });
    console.log('successfully uploaded artist reference ', artistref.id);

    //Step 2: Upload work images into storage, upload works, and return the references

    //Go through and upload works in each portfolio
    const portPromises: Promise<DocumentReference>[] = [];
    values.portfolios.forEach(async (portfolio) => {
      portPromises.push(uploadPortfolio(artistref.id, portfolio));
    });
    const portPromiseFinished = await Promise.all(portPromises);
    console.log('profile creation complete');
    setSubmitting(false);
    router.push('/' + username);
    return 0;
  };

  useEffect(() => {
    console.log(loading, user);
    if (loading) {
      return;
    }
    if (!user) {
      if (isMobile)
        router.push(`/signin?redirect=${window.location.pathname}`)
      else
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
        if (_artistId !== '') {
          //Reroute if onboarding already has been completed
          router.push('/' + username);
        }
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
    <div tw='min-h-[100vh] flex flex-col'>
      {submitting && (
        <img
          tw={'w-full h-screen bg-center bg-no-repeat'}
          src={'/assets/svgs/Loading.svg'}
        />
      )}
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

      <div tw="mt-5 h-full flex-grow flex flex-col">
        <div tw="flex flex-col items-center text-center px-6">
          <div tw="font-semibold text-[#333333] text-[24px]">
            {sections[stage]}
          </div>
          <div tw="mt-[6px] text-[#333333] text-[16px]">{subtitles[stage]}</div>
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
            portfolios: [],
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
            } else {
              setFormValues(values);
            }
            return errors;
          }}
          onSubmit={() => {
            console.log('Submitting', formValues);
          }}
        >
          {({ values, setFieldValue }) => (
            <>
              <div tw="pt-5 md:pt-12 px-6 flex-grow">
                {stage === 0 && (
                  <ProfileDetailsSection
                    country={defaultCountry}
                    values={values}
                  />
                )}
                {stage === 1 && <PortfolioSection values={values} />}
              </div>
              <div
                tw="mt-10 md:mt-[60px] md:w-[700px] md:mx-auto md:pb-[30px]"
                css={[isMobile && tw`sticky w-full bottom-0 bg-white pb-4`]}
              >
                {isMobile && <div tw="h-[0.5px] bg-[#E3E3E3]" />}
                <div
                  css={[
                    isMobile
                      ? tw`mt-[14px] grid grid-cols-2 gap-x-6 px-6`
                      : tw`w-full grid grid-cols-[repeat(2, 160px)] justify-between`,
                  ]}
                >
                  <button
                    css={[buttons.white, tw`h-12`]}
                    onClick={() => setStage(stage ? stage - 1 : 0)}
                  >
                    {stage ? 'Back' : 'Cancel'}
                  </button>
                  <button
                    css={[buttons.red, tw`h-12`]}
                    onClick={() => {
                      if (stage < 1) {
                        setStage(stage + 1);
                      } else {
                        setSubmitting(true);
                        submitForm(values);
                      }
                    }}
                  >
                    {stage < 1 ? 'Next' : 'Submit'}
                  </button>
                </div>
              </div>
            </>
          )}
        </Formik>
      </div>

      <div tw="bg-red-500 hidden">
        {stage === 1 && (
          <CreatePortfoliosSection
            user={user}
            onComplete={() => setStage(2)}
            artistId={artistId}
          />
        )}
      </div>
    </div>
  );
}

export default Onboarding;
