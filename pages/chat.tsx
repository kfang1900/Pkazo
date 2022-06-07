import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from 'utils/auth/useAuth';
import styles from '../styles/Home.module.css';
import Header from '../components/Header';
import 'twin.macro';
import Chat from '../components/chat/Chat';
import { useEffect, useState } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getApp } from 'firebase/app';
const Home: NextPage = () => {
  const { userData, loading: authLoading } = useAuth();
  const [selectedChat, setSelectedChat] = useState('');
  const [chats, setChats] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (authLoading) return;
    if (!userData || !userData.chats || userData.chats.length === 0) {
      setLoading(false);
      return;
    }
    const app = getApp();
    const db = getFirestore(app);
    Promise.all(
      userData.chats.map(async (id) => {
        const snapshot = await getDoc(doc(db, 'artists', id));
        return {
          id,
          name: snapshot.data()?.name || id,
        };
      })
    ).then((data) => {
      setChats(data);
      if (!selectedChat && data.length > 0) {
        window.location.hash = data[0].id;
        setSelectedChat(data[0].id);
      }
    });
  }, [authLoading, userData]);
  useEffect(() => {
    const handler = () => {
      if (window.location.hash && window.location.hash.length > 1) {
        console.log(window.location.hash.substring(1));
        setSelectedChat(window.location.hash.substring(1));
      }
    };
    handler();
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, [setSelectedChat]);
  useEffect(() => {
    if (selectedChat !== window.location.hash.substring(1)) {
      window.location.hash = selectedChat;
    }
  }, [selectedChat]);
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
            {chats.map((chat) =>
              chat.id === selectedChat ? (
                <p key={chat.id}>
                  <b>{chat.name}</b>
                </p>
              ) : (
                <p key={chat.id}>
                  <a
                    onClick={() => setSelectedChat(chat.id)}
                    tw={'cursor-pointer underline text-blue-500'}
                  >
                    {chat.name}
                  </a>
                </p>
              )
            )}

            {/*<a tw={'text-blue-500 hover:underline'}>Start a new chat (WIP)</a>*/}
          </div>
          <Chat partnerId={selectedChat} />
        </div>
      </div>
    </>
  );
};

export default Home;
