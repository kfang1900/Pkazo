import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from 'utils/auth/useAuth';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import 'twin.macro';
import axios from 'axios';
const Home: NextPage = () => {
  const auth = useAuth();
  // React.useEffect(() => {
  //   axios
  //     .post('/api/search/update-indexes', {
  //       workIds: [
  //         'F89U4jyntpBZSqSWoa71',
  //         'Lr3QcK0OR0kGj7P6OyPW',
  //         'g0gEFjF70u8trtj5ckRx',
  //         'CheYuwimIVPvjpSl0pPR',
  //         'hrxfkg75Tpfg1Ev1uJxU',
  //         'kb3xO6GtpYEEqGOwGdZC',
  //         'J545DYPuXWfVPLajXhI',
  //         'ukeirs9cQsYOVC0bxcXK',
  //       ],
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // }, []);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Pkazo</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div tw={'w-full'}>
          <h1 tw={'text-3xl mx-auto mt-8 mx-20 font-bold text-center'}>
            Check Console
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
