import useAuth from '../../utils/auth/useAuth';
import 'twin.macro';
import React, { useCallback, useEffect, useState } from 'react';
import { getDatabase, push, ref, serverTimestamp } from '@firebase/database';
import { getApp } from 'firebase/app';
import tw from 'twin.macro';

import Image from 'next/image';

import { ChatMessage, parseDate } from '../../pages/chat';

export default function Chat({
  partnerId,
  pfp,
  name,
  scrollRef,
  messageRef,
  messages,
  setSelectedChat,
  isMobile,
}: {
  /**
   * userId of the person who the user is chatting with
   */
  partnerId: string;
  pfp: string;
  name: string;
  scrollRef: React.Ref<HTMLDivElement>;
  messageRef: React.Ref<HTMLTextAreaElement>;
  messages: ChatMessage[];
  setSelectedChat: any;
  isMobile: boolean;
}) {
  const { user } = useAuth();
  const [text, setText] = useState('');

  useEffect(() => {
    if (!user) return;
  }, [user, partnerId]);
  const onSend = useCallback(() => {
    if (!user) return;

    const app = getApp();
    const rtdb = getDatabase(app);
    const messagesRef = ref(
      rtdb,
      'chats/' + [user.uid, partnerId].sort().join('--') + '/messages'
    );
    push(messagesRef, {
      author: user.uid,
      version: 1,
      text: text,
      timestamp: serverTimestamp(),
    });
    setText('');
  }, [user, text, setText, partnerId]);
  console.log('This is a mobile device', isMobile);
  return (
    <div
      tw="w-full flex flex-col relative"
      css={[isMobile ? tw`h-[100vh]` : tw`h-[80vh]`]}
    >
      <div tw="px-7 pt-4 pb-4 border-b border-b-[#D8D8D8] flex items-center">
        {isMobile && (
          <button tw="flex items-center" onClick={() => setSelectedChat('')}>
            <Image
              src="/assets/svgs/arrow_left.svg"
              width="18px"
              height="18px"
            />
          </button>
        )}
        <div tw="ml-2 w-[48px] h-[48px] relative overflow-hidden rounded-full">
          <Image src={pfp} alt="pfp" layout="fill" objectFit="cover" />
        </div>
        <div tw="ml-4">
          <div tw="text-[20px] text-black leading-[1.25em]">{name}</div>
          <div tw="text-[18px] text-gray-400 leading-[1em]">Painter</div>
          {/*<div tw="text-[14px] text-[#838383] leading-[1em] mt-2">Online</div>*/}
        </div>
      </div>
      <div tw="flex flex-col overflow-y-scroll flex-grow pr-1" ref={scrollRef}>
        {messages.map((msg, i, msgs) => {
          const showTime =
            i === 0 || msg.timestamp - msgs[i - 1].timestamp > 1000 * 60 * 15;
          const isCurrentUser = msg.author === user?.uid;
          return (
            <div key={i}>
              {showTime && (
                <div tw="flex justify-center mt-4 text-[12px] text-[#838383]">
                  {parseDate(msg.timestamp)}
                </div>
              )}
              <div
                tw="flex items-end"
                css={[
                  isCurrentUser ? tw`justify-end` : tw`justify-start`,
                  i > 0 &&
                  isCurrentUser === (msgs[i - 1].author === user?.uid) &&
                  !showTime
                    ? tw`mt-[2px]`
                    : tw`mt-4`,
                ]}
              >
                {!isCurrentUser &&
                (i + 1 >= msgs.length || msgs[i + 1].author === user?.uid) ? (
                  <div tw="w-9 h-9 mr-3 rounded-full relative overflow-hidden">
                    <Image
                      src={pfp}
                      alt="other pfp"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                ) : (
                  <div tw="w-12" />
                )}
                <div
                  tw="max-w-[360px] py-2 px-4 rounded-[20px] text-[#222222] break-words"
                  css={[
                    isCurrentUser
                      ? tw`bg-[#F4F4F4]`
                      : tw`border border-[#D8D8D8] bg-white`,
                    i > 0 &&
                      isCurrentUser &&
                      msgs[i - 1].author === user?.uid &&
                      tw`rounded-tr-[6px]`,
                    i > 0 &&
                      !isCurrentUser &&
                      !(msgs[i - 1].author === user?.uid) &&
                      tw`rounded-tl-[6px]`,
                    i + 1 < msgs.length &&
                      isCurrentUser &&
                      msgs[i + 1].author === user?.uid &&
                      tw`rounded-br-[6px]`,
                    i + 1 < msgs.length &&
                      !isCurrentUser &&
                      !(msgs[i + 1].author === user?.uid) &&
                      tw`rounded-bl-[6px]`,
                  ]}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div tw="relative mt-auto px-4 bg-white">
        <div tw="flex items-center rounded-[25px] border border-[#D8D8D8] mb-4 mt-4 px-6">
          <textarea
            ref={messageRef}
            tw="w-full mt-2 resize-none bg-transparent outline-none text-[14px] focus:outline-none focus:resize-y text-[#222222]"
            placeholder="Message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                onSend();
              }
            }}
          />
          {/* TODO: change to upload file */}
          <button tw="flex items-center" onClick={() => onSend()}>
            <Image src="/assets/svgs/send.svg" width="18px" height="18px" />
          </button>
        </div>
      </div>
    </div>
  );
}
