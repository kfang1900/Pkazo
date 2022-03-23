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
        '/assets/images/wip/img1.png',
        '/assets/images/wip/img2.png',
        '/assets/images/wip/img3.png',
        '/assets/images/wip/img4.png',
        '/assets/images/wip/img5.png',
        '/assets/images/wip/img6.png',
        '/assets/images/wip/img7.png',
        '/assets/images/wip/img8.png',
        '/assets/images/wip/img9.png',
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
      <Header tw="border-b border-[#D8D8D8]" isBuyer />
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
