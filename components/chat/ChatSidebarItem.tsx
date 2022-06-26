import useAuth from '../../utils/auth/useAuth';
import 'twin.macro';
import React, { useCallback, useEffect, useState } from 'react';
import {
  getDatabase,
  onChildAdded,
  onValue,
  push,
  ref,
} from '@firebase/database';
import { getApp } from 'firebase/app';
import tw from 'twin.macro';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import Image from 'next/image';
import { timeElapsed } from '../popups/ShowComment';
import { loadStorageImage } from '../../helpers/FirebaseFunctions';
import { ArtistData } from '../../types/dbTypes';
import { ChatMessage } from '../../pages/chat';

export default function ChatSidebarItem({
  selected,
  onSelect,
  pfp,
  name,
  latestMessage,
}: {
  selected: boolean;
  onSelect: () => void;
  pfp: string;
  name: string;
  latestMessage: ChatMessage | null;
}) {
  console.log(latestMessage, "LMLMLMLMLMLM");

  // TODO
  const read = !selected;
  return (
    <div
      tw="border-t border-t-[#D8D8D8] pt-4 pb-5 flex items-center justify-between cursor-pointer hover:bg-[#FAFAFA]"
      onClick={() => onSelect()}
    >
      <div tw="flex">
        <div tw="relative w-[50px] h-[50px] overflow-hidden rounded-full">
          <Image src={pfp} alt="pfp" layout="fill" objectFit="cover" />
        </div>
        <div tw="ml-4">
          <div
            tw="text-[20px] text-black leading-[1em]"
            css={[read ? tw`font-semibold` : tw`font-bold`]}
          >
            {name}
          </div>
          <div tw="text-[14px] leading-[1em] mt-2">
            <span
              tw="text-[#3C3C3C] overflow-ellipsis overflow-hidden whitespace-nowrap"
              css={[!read && tw`font-semibold`]}
            >
              {latestMessage && latestMessage.text}
            </span>
            <span tw="text-[#838383]">
              {' · '}
              {latestMessage?.timestamp && timeElapsed(latestMessage.timestamp)}
            </span>
          </div>
        </div>
      </div>
      {/*{!read && (*/}
      {/*  <div tw="px-3 flex items-center justify-center">*/}
      {/*    <svg*/}
      {/*      width="10"*/}
      {/*      height="10"*/}
      {/*      viewBox="0 0 10 10"*/}
      {/*      fill="none"*/}
      {/*      xmlns="http://www.w3.org/2000/svg"*/}
      {/*    >*/}
      {/*      <circle cx="5" cy="5" r="5" fill="#E44C4D" />*/}
      {/*    </svg>*/}
      {/*  </div>*/}
      {/*)}*/}
    </div>
  );
}
