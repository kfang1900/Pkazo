import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';

import { sample_artist } from 'utils/Sample_Posts_Imports';

const EditAccount: NextPage = () => {
  const [page, setPage] = useState(0);
  const user = sample_artist;
  const pages = [
    'Edit Profile',
    'Change Password',
    'Apps and Websites',
    'Email and SMS',
    'Gay furry porn',
  ];
  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      <Header isBuyer />
      <div tw="flex h-full">
        <div tw="sticky top-0 w-[289px] border-r border-r-[#D8D8D8] pt-2">
          {pages.map((p, i) => (
            <div
              key={i}
              css={[
                tw`my-5 py-2 ml-[60px] cursor-pointer`,
                page === i && tw`font-bold`,
              ]}
              onClick={() => setPage(i)}
            >
              {p}
            </div>
          ))}
        </div>
        {page === 0 && (
          <div tw="ml-[76px] mt-9">
            <div tw="flex">
              <div tw="w-[132px] h-[132px] relative">
                <div tw="overflow-hidden rounded-full flex items-center">
                  <Image
                    src={user.pfp}
                    alt="profile_image"
                    width="132px"
                    height="132px"
                    objectFit="cover"
                  />
                </div>
                <button tw="absolute right-0 bottom-0 w-[34px] h-[34px] rounded-full bg-black opacity-70 hover:opacity-60 pt-1">
                  <Image
                    src="/assets/svgs/camera.svg"
                    alt="edit pfp"
                    width="18px"
                    height="18px"
                  />
                </button>
              </div>
              <div tw="ml-9 flex flex-col justify-center">
                <div tw="text-black text-[28px] font-semibold">{user.name}</div>
                <div tw="text-[#8B8B8B] text-[20px] font-semibold mt-[10px]">
                  {user.location}
                  &nbsp;&nbsp;•&nbsp;&nbsp;{user.discipline}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default EditAccount;
