import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';

import { Container } from './profile/[username]/index';
import FeedPost from '../components/feed/FeedPost';

const Feed: NextPage = () => {
  const posts = [
    {
      imgs: ['/post_assets/social.png'],
      type: 'social',
      comments: [],
    },
    {
      imgs: [
        '/post_assets/wip/img1.png',
        '/post_assets/wip/img2.png',
        '/post_assets/wip/img3.png',
        '/post_assets/wip/img4.png',
        '/post_assets/wip/img5.png',
        '/post_assets/wip/img6.png',
        '/post_assets/wip/img7.png',
        '/post_assets/wip/img8.png',
        '/post_assets/wip/img9.png',
      ],
      type: 'wip',
      comments: [],
    },
    {
      imgs: ['/assets/images/jammer.jpg'],
      type: 'complete',
      comments: [],
    },
  ];
  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      <Header tw="border-b border-[#D8D8D8]" />
      <Container>
        <div tw="w-[50%] mx-auto">
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
