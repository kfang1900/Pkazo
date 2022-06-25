import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import useAuth from 'utils/auth/useAuth';
import Header from '../components/Header';
import tw from 'twin.macro';
import { Container } from 'styles/Container';
import Chat from '../components/chat/Chat';
import React, { useEffect, useState, useRef } from 'react';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { timeElapsed } from 'components/popups/ShowComment'
import { number } from 'yup/lib/locale';

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
  return `${dayString}${d.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`
}
const Home: NextPage = () => {
  const { userData, loading: authLoading } = useAuth();
  const [selectedChat, setSelectedChat] = useState('');
  interface ChatMessage {
    content: string;
    time: number;
    me: boolean;
  }
  const [tempChats, setTempChats] = useState<
    {
      pfp: string,  // changes these
      name: string, // to user data type
      msgs: ChatMessage[] // maybe 'me' can be user id or something so don't need to store chat twice
      read: boolean
    }[]
  >([...Array(8).fill([
    {
      pfp: '/assets/images/kevin.png',
      name: 'Kevin Fang',
      msgs: [
        {
          content: 'i',
          time: 1656105336000,
          me: false
        },
        {
          content: 'love',
          time: 1656105337000,
          me: false
        },
        {
          content: 'gfp',
          time: 1656105339000,
          me: false
        },
        {
          content: 'ew u weirdo',
          time: 1656105346000,
          me: true
        },
        {
          content: 'get away from me',
          time: 1656105350000,
          me: true
        },
        ...Array(10).fill(
          {
            content: 'I LOOOOVE GFP',
            time: 1656106550000,
            me: false
          })
      ],
      read: false
    }
  ][0]),
  {
    pfp: '/assets/images/ayu.png',
    name: 'Alice Yu',
    msgs: [
      {
        content: 'waaaaaaaaaah',
        time: 1656129793000,
        me: false
      }
    ],
    read: false
  }])
  const [selected, setSelected] = useState(0);
  // to reset scroll on different user click
  const scrollRef = useRef<HTMLDivElement>(null);
  // to reset message on different user click
  const msgRef = useRef<HTMLInputElement>(null);
  const handleOpenChat = (i: number) => {
    if (i !== selected) {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = 0;
      }
      if (msgRef.current) {
        msgRef.current.value = '';
      }
    }
    setSelected(i);
    if (!tempChats[i].read) {
      const temp = [...tempChats];
      temp[i] = { ...temp[i], read: true };
      setTempChats(temp);
    }
  }
  const handleNewMessage = (msg: string) => {
    if (msg === '') return;
    const temp = [...tempChats];
    temp[selected] = {
      ...temp[selected],
      msgs: [...temp[selected].msgs, { content: msg, time: Date.now(), me: true }]
    }
    setTempChats(temp);
  }
  const getLatestChat = (msgs: ChatMessage[]) => {
    return msgs[msgs.length - 1] ?? { content: '', time: 0, me: false };
  }
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
      <Head>
        <title>Pkazo</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div tw='absolute top-0 bottom-0 left-0 right-0 flex flex-col'>
        <Header />
        <Container tw='w-full max-h-full flex overflow-hidden'>
          <div tw='w-full flex border-[1px] border-[#D8D8D8] mb-12 mt-3 rounded-[6px]'>
            <div tw='flex-grow-[1] px-7 overflow-auto'>
              <div tw='pt-7 sticky top-0 bg-white text-[28px] text-black font-bold z-50'>Messages</div>
              <div tw='mt-2'>
                {tempChats.
                  sort((a, b) => getLatestChat(b.msgs).time - getLatestChat(a.msgs).time).
                  map((chat, i) => (
                    <div
                      key={i}
                      tw='border-t border-t-[#D8D8D8] pt-4 pb-5 flex items-center justify-between cursor-pointer hover:bg-[#FAFAFA]'
                      onClick={() => {
                        handleOpenChat(i);
                      }}
                    >
                      <div tw='flex'>
                        <div tw='relative w-[50px] h-[50px] overflow-hidden rounded-full'>
                          <Image
                            src={chat.pfp}
                            alt='pfp'
                            layout='fill'
                            objectFit='cover'
                          />
                        </div>
                        <div tw='ml-4'>
                          <div
                            tw='text-[20px] text-black leading-[1em]'
                            css={[chat.read ? tw`font-semibold` : tw`font-bold`]}
                          >{chat.name}</div>
                          <div tw='text-[14px] leading-[1em] mt-2'>
                            <span
                              tw='text-[#3C3C3C] overflow-ellipsis overflow-hidden whitespace-nowrap'
                              css={[!chat.read && tw`font-semibold`]}
                            >{getLatestChat(chat.msgs).content}</span>
                            <span tw='text-[#838383]'> · {timeElapsed(getLatestChat(chat.msgs).time)}</span>
                          </div>
                        </div>
                      </div>
                      {!chat.read &&
                        <div tw='px-3 flex items-center justify-center'>
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="5" cy="5" r="5" fill="#E44C4D" />
                          </svg>
                        </div>
                      }
                    </div>
                  ))}
              </div>
            </div>
            <div tw='w-[1px] h-full bg-[#D8D8D8] flex-shrink-0' />
            <div tw='flex-grow-[2] px-7 flex flex-col relative'>
              <div tw='pt-7 pb-5 border-b border-b-[#D8D8D8] flex items-center'>
                <div tw='ml-2 w-[52px] h-[52px] relative overflow-hidden rounded-full'>
                  <Image
                    src={tempChats[selected].pfp}
                    alt='pfp'
                    layout='fill'
                    objectFit='cover'
                  />
                </div>
                <div tw='ml-4'>
                  <div tw='text-[20px] font-semibold text-black leading-[1em]'>{tempChats[selected].name}</div>
                  <div tw='text-[14px] text-[#838383] leading-[1em] mt-2'>Online</div>
                </div>
              </div>
              <div tw='flex flex-col-reverse overflow-auto pr-1' ref={scrollRef}>
                <div>
                  {tempChats[selected].msgs.map((msg, i, msgs) => {
                    const showTime = (!i || msg.time - msgs[i - 1].time > 1000 * 60 * 15);
                    return <div key={i}>
                      {showTime &&
                        <div tw='flex justify-center mt-4 text-[12px] text-[#838383]'>
                          {parseDate(msg.time)}
                        </div>
                      }
                      <div
                        tw='flex items-end'
                        css={[
                          msg.me ? tw`justify-end` : tw`justify-start`,
                          i > 0 && (msg.me === msgs[i - 1].me) && !showTime ? tw`mt-[2px]` : tw`mt-4`
                        ]}
                      >
                        {!msg.me && (i + 1 >= msgs.length || msgs[i + 1].me) ?
                          <div tw='w-9 h-9 mr-3 rounded-full relative overflow-hidden'>
                            <Image
                              src={tempChats[selected].pfp}
                              alt='other pfp'
                              layout='fill'
                              objectFit='cover'
                            />
                          </div> :
                          <div tw='w-12' />
                        }
                        <div
                          tw='max-w-[75%] py-2 px-4 rounded-[20px]'
                          css={[
                            msg.me ? tw`bg-[#F4F4F4]` : tw`border border-[#D8D8D8] bg-white`,
                            (i > 0 && msg.me && msgs[i - 1].me) && tw`rounded-tr-[6px]`,
                            (i > 0 && !msg.me && !msgs[i - 1].me) && tw`rounded-tl-[6px]`,
                            (i + 1 < msgs.length && msg.me && msgs[i + 1].me) && tw`rounded-br-[6px]`,
                            (i + 1 < msgs.length && !msg.me && !msgs[i + 1].me) && tw`rounded-bl-[6px]`,
                          ]}
                        >
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  })}
                </div>
              </div>
              <div tw='mt-auto py-4 bg-white'>
                <div tw='flex items-center rounded-[25px] bg-[#F4F4F4] h-11 px-6'>
                  <input
                    ref={msgRef}
                    tw='w-full bg-transparent outline-none text-[14px]'
                    placeholder='Message...'
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleNewMessage(e.currentTarget.value);
                        e.currentTarget.value = ''
                      }
                    }}
                  />
                  {/* upload file */}
                  <button tw='flex items-center' onClick={() => 0}>
                    <Image src='/assets/images/kevin.png' width='18px' height='18px' />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div >
    </>
  );
};

export default Home;
