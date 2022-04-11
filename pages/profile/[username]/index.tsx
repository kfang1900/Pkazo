import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import { useRouter } from 'next/router';
import tw, { styled } from 'twin.macro';

import ArtistProfile from 'components/profile/ArtistProfile';
import Gallery from 'components/profile/ProfilePortfolio';
import ProfilePosts from 'components/profile/ProfilePosts';
import StorePortfolio from 'components/profile/StorePortfolio';

import { Artist } from 'obj/Artist';
import { sample_artist } from 'utils/Sample_Posts_Imports';

export const Container = styled.div`
  ${tw`px-5 max-w-[1320px] mx-auto`}
`;

export const getUser = (username: string) => {
  return sample_artist;
};

const Portfolio: NextPage = () => {
  const router = useRouter();
  const user = getUser(router.query.username as string);

  const [page, setPage] = useState(1);
  const pages = ['Posts', 'Portfolio', 'Store'];
  return (
    <>
      <Head>
        <title>{user.name}</title>
      </Head>
      <Header />
      <div>
        {/* Cover Photo */}
        <div tw="relative w-full h-[180px] lg:h-[300px]">
          <Image
            src={user.cover}
            alt="Cover Photo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Cover Photo --End-- */}

        {/* Profile Section Start */}
        <Container>
          <ArtistProfile user={user} />
        </Container>
        {/* Profile Section End */}

        {/* Tab Section Start*/}
        <section tw="mb-10">
          <Container>
            <div tw="flex items-center justify-around relative before:absolute before:w-full before:h-1 before:bottom-0 before:left-0 before:bg-gray-200">
              {pages.map((p, index) => (
                <button
                  key={index}
                  onClick={() => setPage(index)}
                  css={[
                    tw`text-lg relative z-10 font-semibold text-gray-600 hover:bg-black/5 duration-150 px-8 md:px-20 py-2 border-b-4 border-transparent cursor-pointer`,
                    page === index &&
                      tw`border-soft-red pointer-events-none hover:bg-transparent`,
                  ]}
                >
                  {p}
                </button>
              ))}
            </div>
          </Container>
        </section>

        <Container>
          {page === 0 && <ProfilePosts />}
          {page === 1 && <Gallery user={user} />}
          {page === 2 && <StorePortfolio />}
        </Container>
      </div>
    </>
  );
};

export default Portfolio;
