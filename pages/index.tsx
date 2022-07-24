import type { NextPage } from 'next';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Header from '../components/Header';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import buttons from 'styles/Button'
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
  }, [mediaQuery, isMobile]);

  const largeQuery = useMediaQuery({ query: `(min-width: 1024px)` });
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    if (isLargeScreen !== largeQuery) setIsLargeScreen(largeQuery);
  }, [largeQuery, isLargeScreen]);

  // banner in view
  const { ref, inView } = useInView({ rootMargin: "-60px" });

  // router
  const router = useRouter();

  // username state
  const [username, setUsername] = useState('');

  return (
    <>
      <Head>
        <title>Pkazo</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header isHome={inView} isSticky />

      <div tw='w-full'>
        <div
          tw='bg-[#F8F5F0] flex flex-col lg:flex-row py-8 px-4 md:px-[36px] xl:px-[60px] gap-x-[60px] items-center justify-start lg:justify-center'
          ref={ref}
        >
          <div tw='lg:max-w-[480px] flex-shrink-[1] w-full'>
            <div css={[!isLargeScreen && tw`max-w-[500px]`]}>
              <div tw='text-[32px] leading-[40px] md:text-[40px] md:leading-[48px] font-bold text-black'>
                Community for Professional Artists
              </div>
              <div tw='mt-5 text-[16px] md:mt-3 md:text-[20px] md:leading-[30px] text-black font-normal'>
                Showcase and sell your work with no fees. Connect with employers and local galleries.
              </div>
            </div>
            <div
              css={[
                !isMobile && !isLargeScreen && tw`flex items-center mt-6 gap-x-8`,
                isMobile && tw`mt-8`
              ]}
            >
              <div
                tw='lg:mt-10 h-[52px] md:h-[64px] flex items-center w-full bg-white rounded-[46px] px-6 md:px-9 text-[#222222] text-[16px] md:text-[20px]'
                css={[!isMobile && !isLargeScreen && tw`max-w-[600px]`]}
              >
                <div tw='font-semibold'>pkazo.com/</div>
                <input
                  type='text'
                  tw='outline-none w-full'
                  placeholder='yourname'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <button
                css={[
                  buttons.red,
                  !isMobile && !isLargeScreen && tw`max-w-[224px]`,
                  isMobile && tw`mt-4`
                ]}
                tw='w-full lg:mt-4 h-[52px] md:h-[64px] text-[16px] md:text-[20px] font-semibold md:font-bold'
                onClick={() => router.push(
                  isMobile ?
                    `/signin?redirect=/onboarding${username && '&username=' + username}` :
                    `/onboarding${username && '?username=' + username}`
                )}
              >
                Start my page
              </button>
            </div>
          </div>
          <div tw='w-full mt-2 md:mt-4 lg:mt-0 lg:max-w-[700px] lg:h-[430px] flex-shrink-[0.8] lg:relative'>
            <Image
              src='/assets/images/homepage/banner.png'
              alt='banner image'
              width='100%'
              height='70%'
              layout={isLargeScreen ? 'fill' : 'responsive'}
              objectFit='contain'
            />
          </div>
        </div>
        <div tw='mt-8 md:mt-[80px] lg:mt-[100px] flex flex-col mx-auto gap-y-6 md:gap-y-0 lg:gap-y-[30px] max-w-[1000px] px-4 md:px-9'>
          <div tw='md:grid md:grid-cols-[47% 47%] justify-between md:h-[500px]'>
            <div tw='h-full flex flex-col justify-center md:order-last'>
              <div tw='text-[28px] leading-[36px] md:text-[36px] md:leading-[40px] text-black font-semibold'>
                Display your work beautifully
              </div>
              <div tw='mt-3 md:mt-6 text-[16px] leading-[24px] md:text-[20px] md:leading-[30px] text-[#444444] font-normal'>
                No image compression or cropping. Show your artistic development by organizing your work into portfolios.
              </div>
            </div>
            <div tw='md:relative w-full mt-4 md:mt-0'>
              <Image
                src='/assets/images/homepage/portfolios.png'
                alt='portfolios example'
                width='100%'
                height='100%'
                layout={isMobile ? 'responsive' : 'fill'}
                objectFit='contain'
              />
            </div>
          </div>
          <div tw='md:grid md:grid-cols-[40% 60%] gap-x-[20px] md:h-[500px]'>
            <div tw='h-full flex flex-col justify-center'>
              <div tw='text-[28px] leading-[36px] md:text-[36px] md:leading-[40px] text-black font-semibold'>
                Selling made easy and free
              </div>
              <div tw='mt-3 md:mt-6 text-[16px] leading-[24px] md:text-[20px] md:leading-[30px] text-[#444444] font-normal'>
                Simply upload your images and fill out our artist-specific fields. Keep 100% on purchases from your fans that visit your page. Get paid instantly.
              </div>
            </div>
            <div tw='md:relative w-full mt-4 md:mt-0'>
              <Image
                src='/assets/images/homepage/upload.png'
                alt='portfolios example'
                width='100%'
                height='80%'
                layout={isMobile ? 'responsive' : 'fill'}
                objectFit='contain'
              />
            </div>
          </div>
        </div>
        <div tw='md:mt-[40px] lg:mt-[80px] w-full bg-[#E44C4D] text-white flex flex-col items-center py-8 md:pt-[60px] md:pb-[80px] px-4 md:px-9 gap-y-4 md:gap-y-8'>
          <div tw='md:italic text-[20px] md:text-[36px] font-semibold'>
            Simple, transparent, secure.
          </div>
          <div tw='w-full max-w-[800px] grid grid-cols-[240px] md:grid-cols-[320px 320px] justify-center md:justify-between gap-y-4 md:gap-y-0'>
            <div tw='flex flex-col items-center'>
              <div tw='text-[32px] md:text-[40px] font-semibold md:font-bold'>Free</div>
              <div tw='mt-1 md:mt-4 text-[12px] md:text-[16px] font-medium md:font-semibold'>
                No monthly fee. Keep 100% of your sale from your fans from Instagram, TikTok, anywhere ― as long as they vist page directly.
              </div>
            </div>
            <div tw='flex flex-col items-center'>
              <div tw='text-[32px] md:text-[40px] font-semibold md:font-bold'>15%</div>
              <div tw='mt-1 md:mt-4 text-[12px] md:text-[16px] font-medium md:font-semibold'>
                You pay a 15% platform fee when a customer discovers you from our marketplace, or on one of our ads we run for you.
              </div>
            </div>
          </div>
        </div>
        <div tw='mt-[50px] h-[200px] bg-white' />
      </div>
    </>
  );
};

export default Home;
