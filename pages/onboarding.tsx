import React, { ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import tw, { styled } from 'twin.macro';

import LoginForm from '../components/popups/LoginForm';
import useAuth from '../utils/useAuth';
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
import SocialPostUploadForm from '../components/uploading/SocialPostUploadForm';
import Modal from '../components/popups/Modal';

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
  const [artistId, setArtistId] = useState('');
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

        const artistsRef = collection(db, 'Artists');
        const q = query(artistsRef, where('AssociatedUser', '==', user.uid));

        const ref = await getDocs(q);

        const result: QueryDocumentSnapshot<DocumentData>[] = [];
        ref.forEach((snapshot) => {
          setArtistId(snapshot.id); // assumes that there will only be one result
          result.push(snapshot);
        });
        if (result.length > 0) {
          setStage(1);
        }
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

      <div>
        <div tw="mx-10 my-5">
          <img src="assets/images/Pkazo.svg" alt="Pkazo" />
        </div>
        {stage === 0 && (
          <ProfileDetailsSection user={user} onComplete={() => setStage(1)} />
        )}
        {stage === 1 && (
          <CreatePortfoliosSection user={user} onComplete={() => setStage(2)} artistId={artistId}  />
        )}
      </div>
    </>
  );
}

export default Onboarding;
