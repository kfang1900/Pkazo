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
      comments: [
        {
          user: 'William Sanger',
          time: '1h',
          comment: 'What a cute dog!',
          imgSrc: '/assets/images/users/william_sanger.png',
        },
        {
          user: 'Tyler Wu',
          time: '2h',
          comment: 'Precious. Wonderful photo and what a great name.',
          imgSrc: '/assets/images/users/tyler_wu.png',
        },
        {
          user: 'Jake Hill',
          time: '1h',
          comment: 'Miso is my cats name too! 😸',
          imgSrc: '/assets/images/users/jake_hill.png',
        },
        {
          user: 'Amanda Evans',
          time: '2h',
          comment: 'So cute. He is the color of miso soup😍',
          imgSrc: '/assets/images/users/amanda_evans.png',
        },
        {
          user: 'Prashant Singh',
          time: '5h',
          comment: 'So precious, paw prints on my heart!',
          imgSrc: '/assets/images/users/prashant_singh.png',
        },
      ],
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
      comments: [
        {
          user: 'Jake Hill',
          time: '1h',
          comment: 'Super cool. Kinda creepy. I love it.',
          imgSrc: '/assets/images/users/jake_hill.png',
        },
        {
          user: 'Amanda Evans',
          time: '2h',
          comment: 'This is amazing! The red really adds to the painting.',
          imgSrc: '/assets/images/users/amanda_evans.png',
        },
        {
          user: 'Prashant Singh',
          time: '5h',
          comment: 'Ugh! 😧 Your talent is out of our orbit. Seriously!',
          imgSrc: '/assets/images/users/prashant_singh.png',
        },
      ],
    },
    {
      imgs: ['/assets/images/jammer.jpg'],
      type: 'complete',
      comments: [
        {
          user: 'Jake Hill',
          time: '1h',
          comment: 'Super cool. Kinda creepy. I love it.',
          imgSrc: '/assets/images/users/jake_hill.png',
        },
        {
          user: 'Amanda Evans',
          time: '2h',
          comment: 'This is amazing! The red really adds to the painting.',
          imgSrc: '/assets/images/users/amanda_evans.png',
        },
        {
          user: 'Prashant Singh',
          time: '5h',
          comment: 'Ugh! 😧 Your talent is out of our orbit. Seriously!',
          imgSrc: '/assets/images/users/prashant_singh.png',
        },
      ],
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
