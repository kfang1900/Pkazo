import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';

import { Container } from 'styles/Container';
import FeedPost from '../components/feed/FeedPost';
import { sample_posts } from 'utils/Sample_Posts_Imports';

const Feed: NextPage = () => {
  const posts = sample_posts;

  const [page, setPage] = useState(0);
  const pages = ['Home', 'Trending', 'Spotlight'];
  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      <Header isBuyer />
      <Container>
        <div tw="w-[50%] mx-auto">
          <div tw="flex items-center justify-around my-3">
            {pages.map((p, index) => (
              <button
                key={index}
                onClick={() => setPage(index)}
                css={[
                  tw`w-[15%] text-lg relative z-10 font-semibold text-[#8B8B8B] hover:bg-black/5 duration-150 py-1 border-b-4 border-transparent cursor-pointer text-center`,
                  page === index &&
                    tw`border-soft-red pointer-events-none hover:bg-transparent text-[#333333]`,
                ]}
              >
                {p}
              </button>
            ))}
          </div>
          {posts.map((p, i) => (
            <div key={i} tw="my-4">
              <FeedPost post={p} />
            </div>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Feed;
