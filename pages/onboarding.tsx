import { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import tw, { styled } from 'twin.macro';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikErrors,
  FormikTouched,
  FieldProps,
} from 'formik';

import { Container } from './[username]/index';
import LoginForm from '../components/popups/LoginForm';
import useAuth from '../utils/useAuth';
import { getApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc, DocumentData, getDocs,
  getFirestore, query, QueryDocumentSnapshot,
  updateDoc, where
} from 'firebase/firestore';
import ProfileDetailsSection from '../components/onboarding/ProfileDetailsSection';



function Onboarding() {
  const [stage, setStage] = useState(0);
  // let artistName = '';
  // let discipline = '';

  const sections = [
    'Profile details',
    'Upload works',
    'Upload portfolios',
    "How you'll get paid",
  ];
  const [signupFormActive, setSignupFormActive] = useState(false);
  const { user, loading } = useAuth();
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

        const artistsRef = collection(db, "Artists");
        const q = query(artistsRef, where("AssociatedUser", "==", user.uid));

        const ref = await getDocs(q)

        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        ref.forEach((snapshot) => {
          result.push(snapshot);
        });
        if (result.length > 0) {
          setStage(1);
        }
      })()
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

      <div>
        <div tw="mx-10 my-5">
          <img src="assets/images/Pkazo.svg" alt="Pkazo" />
        </div>
        {stage === 0 &&  <ProfileDetailsSection user={user} onComplete={() => setStage(1)}/>}
      </div>
    </>
  );
}

export default Onboarding;
