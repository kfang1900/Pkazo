import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from 'utils/useAuth';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import 'twin.macro';
const Home: NextPage = () => {
  const auth = useAuth();

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
            Pkazo
          </h1>
        </div>
      </div>
    </>
  );
};

export default Home;
