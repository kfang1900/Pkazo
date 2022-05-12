import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from 'utils/useAuth';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import 'twin.macro';
import Chat from '../components/chat/Chat';
const Home: NextPage = () => {
  const { user } = useAuth();

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Head>
          <title>Pkazo</title>
          <meta name="description" content="" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div tw={'w-full flex pt-5'}>
          <div tw={'flex-initial px-20'}>
            <h1 tw={'w-20 text-3xl mt-8 font-bold'}>Chats</h1>
            <p><b>Jeffrey Meng</b></p>
            <a tw={'text-blue-500 hover:underline'}>Start a new chat (WIP)</a>
          </div>
          <Chat
            partnerId={
              user?.uid === 'uoPjOr8hleewFlLs2MThuGnftKW2'
                ? 'dLgRTuFYW7SYh6P7j0y1D3B8MK33'
                : 'uoPjOr8hleewFlLs2MThuGnftKW2'
            }
          />
        </div>
      </div>
    </>
  );
};

export default Home;
