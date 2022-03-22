import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';
import { useRouter } from 'next/router';
import tw, { styled } from 'twin.macro';

import { Container } from './store';
import ArtistProfile from 'components/profile/ArtistProfile';
import Gallery from 'components/profile/ProfilePortfolio';

const Portfolio: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;
  return (
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <Header />
      <div>
        {/* Cover Photo */}
        <div tw="relative w-full h-[180px] lg:h-[300px]">
          <Image
            src="/store_assets/img/profile-cover-banner.jpg"
            alt="Cover Photo"
            layout="fill"
            objectFit="cover"
          />
        </div>
        {/* Cover Photo --End-- */}

        {/* Profile Section Start */}
        <Container>
          <ArtistProfile />
        </Container>
        {/* Profile Section End */}

        {/* Tab Section Start*/}
        <section tw="mb-10">
          <Container>
            <div tw="flex items-center justify-around relative before:absolute before:w-full before:h-1 before:bottom-0 before:left-0 before:bg-gray-200">
              <Link href={'../' + username + '/posts'}>
                <a tw="text-lg relative z-10 font-semibold text-gray-600 hover:bg-black/5 duration-150 px-8 md:px-20 py-2 border-b-4 border-transparent cursor-pointer">
                  Posts
                </a>
              </Link>
              <Link href={'../' + username + '/portfolio'}>
                <a tw="text-lg relative z-10 font-semibold text-gray-600 duration-150 px-8 md:px-20 py-2 border-b-4 border-transparent  border-soft-red pointer-events-none">
                  Portfolio
                </a>
              </Link>
              <Link href={'../' + username + '/store'}>
                <a tw="text-lg relative z-10 font-semibold text-gray-600 hover:bg-black/5 duration-150 px-8 md:px-20 py-2 border-b-4 border-transparent cursor-pointer">
                  Store
                </a>
              </Link>
            </div>
          </Container>
        </section>
        {/* Tab Section End*/}

        {/* Portfolio Area */}

        {/* <ProfileSection /> */}
        {/* <TabsSection /> */}
        <Container>
          <Gallery />
        </Container>
      </div>
    </>
  );
};

export default Portfolio;
