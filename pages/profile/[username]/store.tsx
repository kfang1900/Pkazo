import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import tw, { styled } from 'twin.macro';

import StorePortfolio from 'components/StorePortfolio';

const numFormatter = (x: number) => {
  if (x > 999 && x < 1000000) {
    return (x / 1000).toFixed(1).replace(/\.?0+$/, '') + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (x > 1000000) {
    return (x / 1000000).toFixed(1).replace(/\.?0+$/, '') + 'M'; // convert to M for number from > 1 million
  } else return x; // if value < 1000, nothing to do
};

export const Container = styled.div`
  ${tw`px-5 2xl:max-w-[1400px] mx-auto`}
`;

const Store: NextPage = () => {
  return (
    <>
      <Head>
        <title>Store</title>
      </Head>
      Header
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
        <section tw="py-10">
          <Container>
            <div tw="grid md:grid-cols-2 gap-4 justify-center">
              {/* User Thumb Area */}
              <div tw="gap-4 gap-x-10 lg:flex items-center">
                <div tw="relative h-[200px] w-[200px] min-w[200px]">
                  <Image
                    src="/store_assets/img/user.png"
                    alt="Cover Photo"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div>
                  <h1 tw="mb-3 2xl:text-5xl">James Jean</h1>
                  <p tw="mb-4 font-semibold text-gray-600">
                    Taiwan, United States
                  </p>

                  <div>
                    <button tw="py-2 px-10 bg-red-500 hover:bg-red-600 text-white rounded-full">
                      Follow
                    </button>
                  </div>
                </div>
              </div>
              {/* User Info Area */}
              <div>
                <div tw="mb-5 text-center">
                  <div tw="flex gap-3 gap-x-10">
                    {/* Single Item */}
                    <div>
                      <h2 tw="font-semibold text-3xl">{numFormatter(125)}</h2>
                      <div tw="text-sm text-gray-400">Posts</div>
                    </div>
                    {/* Single Item */}
                    <div>
                      <h2 tw="font-semibold text-3xl">{numFormatter(20)}</h2>
                      <div tw="text-sm text-gray-400">Works</div>
                    </div>
                    {/* Single Item */}
                    <div>
                      <h2 tw="font-semibold text-3xl">
                        {numFormatter(154655)}
                      </h2>
                      <div tw="text-sm text-gray-400">Followers</div>
                    </div>
                    {/* Single Item */}
                    <div>
                      <h2 tw="font-semibold text-3xl">
                        {numFormatter(13464652)}
                      </h2>
                      <div tw="text-sm text-gray-400">Following</div>
                    </div>
                  </div>
                </div>
                {/* About User */}
                <div>
                  <p>
                    In his wide-ranging practice, Mike Kelley mined the banal
                    objects of everyday life and repurposed them in dark,
                    imaginative multimedia artworks. Throughout his oeuvre, the
                    artist explored notions of memory and dismantled
                    distinctions between high and low art.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>
        {/* Profile Section End */}

        {/* Tab Section Start*/}
        <section tw="mb-10">
          <Container>
            <div tw="flex items-center justify-around relative before:absolute before:w-full before:h-1 before:bottom-0 before:left-0 before:bg-gray-200">
              <button tw="text-lg relative z-10 font-semibold text-gray-600 hover:bg-black/5 duration-150 px-8 md:px-20 py-2 border-b-4 border-transparent">
                Posts
              </button>
              <button tw="text-lg relative z-10 font-semibold text-gray-600 hover:bg-black/5 duration-150 px-8 md:px-20 py-2 border-b-4 border-transparent hover:bg-soft-red/5 border-soft-red">
                Portfolio
              </button>
              <button tw="text-lg relative z-10 font-semibold text-gray-600 hover:bg-black/5 duration-150 px-8 md:px-20 py-2 border-b-4 border-transparent">
                Store
              </button>
            </div>
          </Container>
        </section>
        {/* Tab Section End*/}

        {/* Portfolio Area */}
        <StorePortfolio />

        {/* <ProfileSection /> */}
        {/* <TabsSection /> */}
        {/* <Gallery /> */}
      </div>
    </>
  );
};

export default Store;
