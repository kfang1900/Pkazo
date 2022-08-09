import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from 'utils/auth/useAuth';
import Header from '../components/Header';
import tw from 'twin.macro';
import { Container } from 'styles/Container';
import Chat from '../components/chat/Chat';
import React, { useEffect, useState, useRef, useMemo } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { timeElapsed } from 'components/popups/ShowComment';
import { number } from 'yup/lib/locale';
import ChatSidebarItem from '../components/chat/ChatSidebarItem';
import {
  loadStorageImage,
  loadStorageImageSafe,
} from '../helpers/FirebaseFunctions';
import { ArtistData } from '../types/dbTypes';
import { getDatabase, onChildAdded, ref } from '@firebase/database';

export const parseDate = (timestamp: number) => {
  const diff = (Date.now() - timestamp) / 1000; // seconds elapsed
  const d = new Date(timestamp);
  const curdate = new Date();
  let dayString = '';
  if (diff <= 60 * 60 * 24 && d.getDate() === curdate.getDate()) {
    dayString = '';
  } else if (diff <= 60 * 60 * 24 * 7 && d.getDay() !== curdate.getDay()) {
    dayString = d.toLocaleDateString('en-US', { weekday: 'short' }) + ', ';
  } else {
    dayString = d.toLocaleDateString('en-US') + ', ';
  }
  return `${dayString}${d.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })}`;
};
export type ChatMessage = {
  author: string;
  text: string;
  timestamp: number;
  version: 1;
  id: string;
};
const ChatPage: NextPage = () => {
  const { userData, artistData, loading: authLoading, user } = useAuth();
  const [selectedChat, setSelectedChat] = useState('');

  const [selected, setSelected] = useState(0);
  // to reset scroll on different user click
  const scrollRef = useRef<HTMLDivElement>(null);
  // to reset message on different user click
  const msgRef = useRef<HTMLTextAreaElement>(null);

  const getLatestChat = (msgs: ChatMessage[]) => {
    return msgs[msgs.length - 1] ?? { content: '', time: 0, me: false };
  };
  const [chats, setChats] = useState<
    {
      id: string;
      name: string;
      pfp: string;
      messages: ChatMessage[];
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (authLoading) return;
    if (!userData || !userData.chats || userData.chats.length === 0) {
      setLoading(false);
      return;
    }

    const unsubFunctions: (() => void)[] = [];

    const app = getApp();
    const db = getFirestore(app);
    const rtdb = getDatabase(app);
    console.log(userData.chats);
    Promise.all(
      userData.chats.map(async (id) => {
        const snapshot = await getDoc(doc(db, 'artists', id));
        if (!snapshot.data()) {
          throw new Error('Unable to load artist data.');
        }
        const data = {
          id,
          name: (snapshot.data() as ArtistData).name || id,
          pfp:
            (await loadStorageImage(
              (snapshot.data() as ArtistData).profilePicture
            )) + '',
          messages: [],
        };
        setChats((oldChats) => [...oldChats, data]);
        const unsub = onChildAdded(
          ref(rtdb, 'chats/' + [user?.uid, id].sort().join('--') + '/messages'),
          (snapshot) => {
            const data = snapshot.val();
            setChats((oldChats) => {
              const oldThisChat = oldChats.find((c) => c.id === id) || {
                id: id,
                name: 'ERROR',
                pfp: '/doesnotexist',
                messages: [],
              };
              return [
                ...oldChats.filter((c) => c.id !== id),
                {
                  id: oldThisChat.id,
                  name: oldThisChat.name,
                  pfp: oldThisChat.pfp,
                  messages: [...oldThisChat.messages, data],
                },
              ];
            });
          }
        );
        unsubFunctions.push(unsub);
        return data;
      })
    ).then((data) => {
      if (
        !selectedChat &&
        (!window.location.hash || window.location.hash === '#') &&
        data.length > 0
      ) {
        window.location.hash = data[0].id;
        setSelectedChat(data[0].id);
      }
    });

    return () => {
      unsubFunctions.forEach((unsub) => unsub());
    };
  }, [authLoading, userData, setChats, setSelectedChat, user]);
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
    if (selectedChat && selectedChat !== window.location.hash.substring(1)) {
      window.location.hash = selectedChat;
    }
  }, [selectedChat]);
  const selectedChatData = useMemo(
    () => chats.find((c) => c.id === selectedChat),
    [selectedChat, chats]
  );
  return (
    <>
      <Head>
        <title>Pkazo</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div tw="absolute top-0 bottom-0 left-0 right-0 flex flex-col">
        <Header />
        <Container tw="w-full max-h-full flex overflow-hidden">
          <div tw="w-full flex border-[1px] border-[#D8D8D8] mb-2 mt-3 rounded-[6px]">
            <div tw="flex-shrink-['1'] max-w-[360px] pt-4 overflow-auto">
              <div tw="pt-1 pb-3 sticky top-0 bg-white text-[28px] text-black font-bold z-30">
                <div tw="pl-6 pr-5 rounded-[48px] h-10 focus-within:border-[#838383] outline-none flex items-center">
                  <img
                    src="/assets/svgs/search.svg"
                    tw="ml-3 w-[13px] h-[13px] opacity-25"
                  />
                  <input
                    tw="w-full bg-white outline-none text-[19px] ml-3 focus:outline-none"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div tw="mt-2">
                {chats
                  .sort(
                    (a, b) =>
                      (getLatestChat(b.messages).timestamp || -1) -
                      (getLatestChat(a.messages).timestamp || -1)
                  )
                  .map((chat, i) => (
                    <ChatSidebarItem
                      key={chat.id}
                      onSelect={() => setSelectedChat(chat.id)}
                      selected={selectedChat === chat.id}
                      pfp={chat.pfp}
                      name={chat.name}
                      latestMessage={
                        chat.messages.length > 0
                          ? getLatestChat(chat.messages)
                          : null
                      }
                    />
                  ))}
              </div>
            </div>
            <div tw="w-[1px] h-full bg-[#D8D8D8] flex-shrink-['1']" />
            {chats.length > 0 && (
              <Chat
                partnerId={selectedChatData?.id || chats[0].id}
                pfp={selectedChatData?.pfp || '/doesnotexist'}
                name={selectedChatData?.name || ''}
                scrollRef={scrollRef}
                messageRef={msgRef}
                messages={selectedChatData?.messages || []}
              />
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default ChatPage;
