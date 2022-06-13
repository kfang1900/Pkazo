import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import 'twin.macro';
import { useRouter } from 'next/router';
import Header from 'components/Header';
import smallpic1 from 'public/assets/indiv_work/smallpic1.png';
import bigpic1 from 'public/assets/indiv_work/bigpic1.png';
import smallpic2 from 'public/assets/indiv_work/smallpic2.png';
import bigpic2 from 'public/assets/indiv_work/bigpic2.png';
import progress1 from 'public/assets/indiv_work/progress1.png';
import progress2 from 'public/assets/indiv_work/progress2.png';
import progress3 from 'public/assets/indiv_work/progress3.png';
import progress4 from 'public/assets/indiv_work/progress4.png';
import PostDetails from 'components/popups/PostDetails';
import {
  fetchArtistByID,
  fetchWorkByID,
  loadStorageImage,
  loadStorageImages,
} from 'helpers/FirebaseFunctions';
import {
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDocs,
  getFirestore,
  setDoc,
} from 'firebase/firestore';
import { sample_posts } from 'utils/Sample_Posts_Imports';
import { defaultWorkPicture } from 'utils/FrontEndDefaults';
import Link from 'next/link';
import { ArtistData, WorkData } from '../../../types/dbTypes';
import CheckoutModal from '../../../components/popups/CheckoutModal';
import useRequireOnboarding from '../../../utils/hooks/useRequireOnboarding';
import exp from 'constants';
import tw from 'twin.macro';
import axios from 'axios';
import Modal from '../../../components/popups/Modal';
import { getApp } from 'firebase/app';
import buttons from 'styles/Button';
import { Container } from 'styles/Container'
import { useMediaQuery } from 'react-responsive';

const workImages = [
  { small: smallpic1, big: bigpic1 },
  { small: smallpic2, big: bigpic2 },
];
const progressImages = [progress1, progress2, progress3, progress4];
const comments = [
  {
    user: 'Jake Hill',
    time: '1h',
    comment: 'Super cool. Kinda creepy. I love it.',
    imgSrc: '/assets/indiv_work/commenter1.png',
  },
  {
    user: 'Amanda Evans',
    time: '2h',
    comment: 'This is amazing! The red really adds to the painting.',
    imgSrc: '/assets/indiv_work/commenter2.png',
  },
  {
    user: 'Prashant Singh',
    time: '5h',
    comment: 'Ugh! 😧 Your talent is out of our orbit. Seriously!',
    imgSrc: '/assets/indiv_work/commenter3.png',
  },
];

const IndividualWork: NextPage = () => {
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
  const [selectedImage, setSelectedImage] = useState(0);
  const [workData, setWorkData] = useState<WorkData | null>(null);
  const [artistData, setArtistData] = useState<Record<string, any>>();
  const [loading, setLoading] = useState(true);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [artistPicture, setArtistPicture] = useState(
    '/store_assets/img/user.png'
  );
  const [workImages, setWorkImages] = useState([defaultWorkPicture]);
  console.log(workData);
  const [popup, setPopup] = useState(false);
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [shippingZip, setShippingZip] = useState<string | null>(null);
  const [showShippingEstimateModal, setShowShippingEstimateModal] =
    useState(false);
  const [shippingEstimateModalZip, setShippingEstimateModalZip] = useState('');
  const [shippingEstimateLoading, setShippingEstimateLoading] = useState(false);
  const [showShippingPolicies, setShowShippingPolicies] = useState(false);
  const router = useRouter();
  const { workid: workId } = router.query;

  const calculateZip = useCallback(
    (zip?: string) => {
      console.log('CALLED', zip);
      setShippingEstimateLoading(true);
      if (zip) {
        setShippingZip(zip);
      }
      axios
        .get(
          `/api/shipping/estimated-rates?workId=${workId}${zip ? '&zip=' + zip : ''
          }`
        )

        .then((resp) => resp.data)
        .then((data: { rates: { amount: string }[]; zip: string }) => {
          console.log(data);
          setShippingCost(
            data.rates.reduce(
              (lowestRate, rate) =>
                Math.min(lowestRate, parseFloat(rate.amount)),
              parseFloat(data.rates[0].amount)
            )
          );
          setShippingEstimateLoading(false);

          setShippingZip(data.zip);
        })
        .catch((e) => {
          console.log(e.response);
          setShippingEstimateLoading(false);
        });
    },
    [setShippingEstimateLoading, setShippingCost, setShippingZip, workId]
  );

  useEffect(() => {
    if (!workId) {
      return;
    }
    const localStorageZip = sessionStorage.getItem('shippingZipCode');
    console.log('LSZ', localStorageZip);
    // just to be explicit
    calculateZip(localStorageZip ? localStorageZip : undefined);
  }, [workId]);
  useEffect(() => {
    const db = getFirestore();
    getDocs(collection(db, 'works')).then((qs) => {
      const data: Record<string, any>[] = [];
      qs.forEach((snapshot) => {
        data.push({
          id: snapshot.id,
          ...snapshot.data(),
        });
      });
      console.log(data);
    });
  }, []);
  useEffect(() => {
    if (router.isReady && !workData && workId) {
      if (typeof workId !== 'string') return;
      (async () => {
        console.log('Loading Data');
        const workData: WorkData | undefined = (
          await fetchWorkByID(workId)
        ).data() as WorkData | undefined;

        if (!workData) {
          setWorkData(null);
          setLoading(false);
          return;
        }
        const artistData = (await fetchArtistByID(workData.artist)).data();

        setArtistData(artistData);
        setWorkData(workData);
        if (!artistData) {
          setLoading(false);
          throw new Error('Work is associated with a nonexistent artist.');
        }
        const artistImgURL = await loadStorageImage(artistData.profilePicture);
        setArtistPicture(artistImgURL);
        const images = await loadStorageImages(workData.images);
        console.log(images, workData, 'IMAGES');
        setWorkImages(images);
        setLoading(false);
      })();
    }
  }, [router.isReady, workData, workId]);
  const [expandedFAQ, setExpandedFAQ] = useState(-1);
  if (!workData || loading || !artistData) {
    return (
      <>
        <Head>
          <title>Portfolio</title>
        </Head>
        <Header />
        <h1 tw={'text-center font-bold text-2xl mt-4'}>
          {loading ? 'Loading...' : "404: We weren't able to locate this page."}
        </h1>
      </>
    );
  }

  if (isMobile) {
    return (
      <>
        <Head>
          <title>{workData.title || 'Artwork'} | Pkazo</title>
        </Head>
        <Header />
        <Container>
          {workImages[selectedImage] ?
            <div tw='relative w-full flex items-center'>
              <img src={workImages[selectedImage]} tw='w-full' />
              <button
                tw='bg-white border border-[#E8E8E8] hover:bg-[#F5F5F5] w-9 h-9 rounded-full absolute top-[10px] right-[10px]'
              >
                <img src='/assets/svgs/like.svg' tw='m-auto w-[18px]' />
              </button>
              <div tw='w-9 h-9 absolute top-[10px] right-[60px]'>
                <ShareButton
                  title={`${workData.title} | Pkazo`}
                  text={`Checkout this work I found on Pkazo: ${workData.title} https://pkazo.com/work/${workId}`}
                  url={`https://pkazo.com/work/${workId}`}
                />
              </div>
            </div> :
            <div tw='w-full text-center m-auto py-5'>Unable to load image</div>
          }
          <div tw='mx-4 mt-4 mb-4'>
            <div tw='grid grid-rows-1 grid-flow-col gap-x-3 w-full overflow-auto'>
              {workImages.map((work, i) => (
                <button
                  tw='w-[60px] h-[60px] rounded-[4px] overflow-hidden flex items-center'
                  css={[selectedImage !== i && tw`opacity-70`]}
                  key={i}
                  onClick={() => setSelectedImage(i)}
                >
                  <Image
                    src={work}
                    width='60px'
                    height='60px'
                    objectFit='cover' />
                </button>
              ))}
            </div>
            <div tw='flex items-center mt-4'>
              <div tw="w-[55px] h-[55px] overflow-hidden rounded-full flex items-center">
                <Image
                  src={artistPicture}
                  alt="profile_image"
                  width="55px"
                  height="55px"
                  objectFit="cover"
                />
              </div>
              <div tw='ml-[10px]'>
                <div tw='text-[16px] leading-[19px] font-semibold text-black'>
                  {artistData.name}
                </div>
                <div tw='mt-1 text-[14px] font-medium text-[#727373]'>
                  {artistData.location}
                </div>
              </div>
            </div>
            <div tw='mt-4 flex items-center justify-center w-full'>
              Original,Print
            </div>
            <div tw='mt-5 flex items-center justify-between'>
              <div tw='font-medium italic text-[24px] leading-[1em] text-[#5F5F5F]'>
                {workData.title}
              </div>
              {workData.forSale &&
                <div tw='font-semibold text-[24px] leading-[1em] text-[#222222]'>
                  ${workData.sale?.price}
                </div>
              }
            </div>
            <div tw='flex flex-wrap w-full mt-[10px]'>
              {[workData.surface].map((tag) => (
                <div
                  tw='bg-[#FFE1E1] rounded-[52px] h-6 px-[11px] font-semibold text-[12px] text-[#742F2F] flex items-center'
                  key={tag}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div tw='font-medium mt-3 text-[14px] text-[#3C3C3C] leading-[1em] flex flex-col justify-between h-[55px]'>
              <div>{workData.year}</div>
              <div>{workData.medium}</div>
              <div>{workData.height} x {workData.width} inches</div>
            </div>
            {workData.forSale && 0 ?
              <div tw='mt-5'>
                <div tw='text-[12px] text-[#333333] cursor-pointer'>
                  Pay as low as $66/ mo. <b>Affirm.</b> See if you&#39;re qualified.
                </div>
                <button
                  tw='mt-4'
                  css={[
                    buttons.white,
                    tw`border-[1.5px] border-[#3C3C3C] h-12 text-[16px] text-[#3C3C3C] w-full`
                  ]}
                >
                  Buy now
                </button>
                <button
                  tw='mt-[14px]'
                  css={[
                    buttons.red,
                    tw`h-12 text-[16px] text-white w-full`
                  ]}
                >
                  Add to cart
                </button>
                <div tw='w-full items-center grid grid-cols-[16px auto] gap-x-2 mt-5'>
                  <img src='/assets/svgs/shieldpay.svg' />
                  <div tw='text-[12px] text-[#333333] font-semibold'>
                    Secure payment
                  </div>
                  <div />
                  <div tw='text-[12px] text-black mt-[2px] mb-2'>
                    Secure transactions by credit card through Stripe.
                  </div>
                  <img src='/assets/svgs/check.svg' />
                  <div tw='text-[12px] text-[#333333] font-semibold'>
                    Your purchase is protected
                  </div>
                  <div />
                  <div tw='text-[12px] text-black mt-[2px] mb-2'>
                    Learn more about <b tw='font-semibold'>Pkazo&#39;s buyer protection.</b>
                  </div>
                </div>
              </div> :
              <div>
                <button
                  tw='mt-5'
                  css={[
                    buttons.white,
                    tw`border-[1.5px] border-[#3C3C3C] h-12 text-[16px] text-[#3C3C3C] w-full`
                  ]}
                >
                  Make offer
                </button>
              </div>
            }
            <div tw='mt-5 text-[14px] text-[#3C3C3C] leading-[23px]'>
              {workData.description}
            </div>
          </div>
        </Container>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>{workData.title || 'Artwork'} | Pkazo</title>
      </Head>
      <Header />
      {popup && (
        <PostDetails post={sample_posts[1]} onClose={() => setPopup(false)} />
      )}
      {showShippingEstimateModal && (
        <Modal
          small
          open={showShippingEstimateModal}
          onClose={() => setShowShippingEstimateModal(false)}
        >
          <form
            onSubmit={(e) => {
              setShippingZip(shippingEstimateModalZip);
              calculateZip(shippingEstimateModalZip);
              setShowShippingEstimateModal(false);
              sessionStorage.setItem(
                'shippingZipCode',
                shippingEstimateModalZip
              );
              e.preventDefault();
              return false;
            }}
          >
            <h1 tw={'text-xl mb-6'}>Calculate Shipping</h1>
            <label tw={'font-bold  block mb-2'}>Shipping Zip Code:</label>
            <input
              autoFocus
              value={shippingEstimateModalZip}
              onChange={(e) => setShippingEstimateModalZip(e.target.value)}
              placeholder={'e.g. 13948'}
              tw={
                'block border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px] mb-4'
              }
            />
            <button
              type={'submit'}
              tw="h-9 w-20 text-center relative -top-0.5 text-white bg-theme-red rounded-[6px] px-4 py-1 cursor-pointer hover:bg-[#be4040]"
            >
              Save
            </button>
          </form>
        </Modal>
      )}
      {showCheckoutModal && (
        <CheckoutModal
          onClose={() => setShowCheckoutModal(false)}
          workId={workId + ''}
          workData={workData}
          image={workImages[0]}
          artistData={artistData as ArtistData}
        />
      )}
      <Container>
        <div tw="flex mt-10 w-full mb-[30px]">
          <div>
            <div tw='flex gap-x-9'>
              {workImages.length >= 2 &&
                <div>
                  {workImages.map((work, i) => (
                    <button
                      tw='w-[86px] h-[86px] rounded-[8px] overflow-hidden flex items-center'
                      css={[selectedImage !== i && tw`opacity-70`]}
                      key={i}
                      onClick={() => setSelectedImage(i)}
                    >
                      <Image
                        src={work}
                        width='86px'
                        height='86px'
                        objectFit='cover' />
                    </button>
                  ))}
                </div>
              }
              <div tw='relative h-[608px] max-w-[800px] w-[50vw] bg-[#F9F9F9] flex items-center justify-center'>
                {workImages[selectedImage] ?
                  <img src={workImages[selectedImage]}
                    tw='object-contain w-full h-full' /> :
                  <div tw='m-auto'>Unable to load image</div>
                }
                <button
                  tw='bg-white border border-[#E8E8E8] hover:bg-[#F5F5F5] w-12 h-12 rounded-full absolute top-[10px] right-[10px]'
                >
                  <img src='/assets/svgs/like.svg' tw='m-auto w-[18px]' />
                </button>
                {workImages.length >= 2 && (
                  <button
                    tw="w-12 h-12 rounded-full bg-white opacity-30 hover:opacity-50 absolute top-[50%] left-[10px] flex-shrink-0"
                    onClick={
                      () => setSelectedImage((selectedImage - 1 + workImages.length) % workImages.length)
                    }
                  >
                    <img src='/assets/svgs/arrow_left.svg' tw='m-auto' />
                  </button>
                )}
                {workImages.length >= 2 && (
                  <button
                    tw="w-12 h-12 rounded-full bg-white opacity-30 hover:opacity-50 absolute top-[50%] right-[10px] flex-shrink-0"
                    onClick={
                      () => setSelectedImage((selectedImage + 1) % workImages.length)
                    }
                  >
                    <img src='/assets/svgs/arrow_right.svg' tw='m-auto' />
                  </button>
                )}
              </div>
            </div>
            <div tw='mt-10 text-[18px] text-[#212121] leading-[32px]'>
              {workData.description}
            </div>
            <div tw='mt-7 flex flex-wrap gap-3 w-full'>
              {['cat', 'meow', 'gfp'].map((tag) => (
                <div
                  tw='bg-[#C4C4C4] h-7 px-[15px] rounded-[30px] text-white text-[12px] font-semibold flex items-center'
                  key={tag}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div tw='mt-10'>
              <div tw='flex items-center'>
                <div tw='text-[20px] text-black'>
                  {comments.length} store reviews
                </div>
                <div tw='ml-[18px] text-[18px] text-black font-semibold'>
                  {(Math.round(4.98 * 10) / 10).toFixed(1)}
                </div>
                <div tw='ml-2 flex gap-x-[5px] h-4'>
                  <img src='/assets/svgs/orange_star.svg' />
                  <img src='/assets/svgs/orange_star.svg' />
                  <img src='/assets/svgs/orange_star.svg' />
                  <img src='/assets/svgs/orange_star.svg' />
                  <img src='/assets/svgs/light_gray_star.svg' />
                </div>
              </div>
              <div tw='mt-8 flex flex-col gap-y-9'>
                {comments.map((comment, i) => (
                  <div key={i}>
                    <div tw='flex'>
                      <div tw="w-9 h-9 overflow-hidden rounded-full flex items-center">
                        <Image
                          src={comment.imgSrc}
                          alt="profile_image"
                          width="36px"
                          height="36px"
                          objectFit="cover"
                        />
                      </div>
                      <div tw="ml-3">
                        <div tw="flex">
                          <div tw="text-[12px] leading-[18px] font-semibold text-black">
                            {comment.user}
                          </div>
                          <div tw="text-[12px] leading-[18px] text-[#7F838B] ml-[12px]">
                            {comment.time}
                          </div>
                        </div>

                        <div tw='flex gap-x-1 h-3'>
                          <img src='/assets/svgs/orange_star.svg' />
                          <img src='/assets/svgs/orange_star.svg' />
                          <img src='/assets/svgs/orange_star.svg' />
                          <img src='/assets/svgs/orange_star.svg' />
                          <img src='/assets/svgs/light_gray_star.svg' />
                        </div>
                      </div>
                    </div>
                    <div tw="mt-1 text-[16px] leading-[24px] text-[#3C3C3C]">
                      {comment.comment}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div tw='ml-16 w-full'>
            <div tw='flex items-center'>
              <div tw="w-[60px] h-[60px] overflow-hidden rounded-full flex items-center">
                <Image
                  src={artistPicture}
                  alt="profile_image"
                  width="60px"
                  height="60px"
                  objectFit="cover"
                />
              </div>
              <div tw='ml-5'>
                <div tw='text-[20px] leading-[1em] font-bold text-[#3C3C3C]'>
                  {artistData.name}
                </div>
                <div tw='mt-[6px] text-[16px] leading-[1em] font-semibold text-[#838383]'>
                  {artistData.location}
                </div>
              </div>
            </div>
            <div tw='mt-3 flex items-center justify-center w-full'>
              Original,Print
            </div>
            <div tw='mt-5 flex items-center justify-between'>
              <div tw='italic text-[36px] leading-[1em] text-[#3C3C3C]'>
                {workData.title}
              </div>
              {workData.forSale &&
                <div tw='font-semibold text-[32px] leading-[1em] text-[#242424]'>
                  ${workData.sale?.price}
                </div>
              }
            </div>
            <div tw='flex flex-wrap w-full mt-2'>
              {[workData.surface].map((tag) => (
                <div
                  tw='bg-[#FFE1E1] rounded-[22px] h-7 px-4 font-semibold text-[12px] text-[#742F2F] flex items-center'
                  key={tag}
                >
                  {tag}
                </div>
              ))}
            </div>
            <div tw='mt-3 text-[20px] text-black leading-[1em] flex flex-col gap-y-3'>
              <div>{workData.year}</div>
              <div>{workData.medium}</div>
              <div>{workData.height} x {workData.width} inches</div>
            </div>

            {workData.forSale ?
              <div tw='mt-6 px-7 flex flex-col items-center border-t-2 border-b-2 border-[#E9E9E9] py-6'>
                <div tw='text-[14px] text-[#333333] cursor-pointer'>
                  Pay as low as $66/ mo. <b>Affirm.</b> See if you&#39;re qualified.
                </div>
                <button
                  tw='mt-5'
                  css={[
                    buttons.white,
                    tw`border-[1.5px] border-[#3C3C3C] h-12 text-[16px] text-[#3C3C3C] w-full`
                  ]}
                >
                  Buy now
                </button>
                <button
                  tw='mt-3'
                  css={[
                    buttons.red,
                    tw`h-12 text-[16px] text-white w-full`
                  ]}
                >
                  Add to cart
                </button>
                <div tw='w-full items-center grid grid-cols-[16px auto] gap-x-2 mt-5'>
                  <img src='/assets/svgs/shieldpay.svg' />
                  <div tw='text-[14px] text-[#333333] font-semibold'>
                    Secure payment
                  </div>
                  <div />
                  <div tw='text-[14px] text-black mt-[2px] mb-2'>
                    Secure transactions by credit card through Stripe.
                  </div>
                  <img src='/assets/svgs/check.svg' />
                  <div tw='text-[14px] text-[#333333] font-semibold'>
                    Your purchase is protected
                  </div>
                  <div />
                  <div tw='text-[14px] text-black mt-[2px] mb-2'>
                    Learn more about <b tw='font-semibold'>Pkazo&#39;s buyer protection.</b>
                  </div>
                </div>
              </div> :
              <div>
                <button
                  tw='mt-6'
                  css={[
                    buttons.white,
                    tw`border-[1.5px] border-[#3C3C3C] h-12 text-[16px] text-[#3C3C3C] w-full`
                  ]}
                >
                  Make offer
                </button>
              </div>
            }
            <div tw='mt-6 px-7'>
              <div tw='grid grid-cols-2 mt-6'>
                <div tw='text-[16px] leading-[20px] text-[#65676B]'>
                  Ready to ship
                </div>
                <div />
                <div tw='text-[20px] text-black leading-[28px] mt-1'>
                  {artistData.shippingProcessingTime}
                </div>
                <div />
                <div tw='text-[16px] leading-[20px] text-[#65676B] mt-6'>
                  Shipping cost
                </div>
                <div tw='text-[16px] leading-[20px] text-[#65676B] mt-6'>
                  Returns
                </div>
                <div tw='text-[20px] text-black leading-[28px] mt-1'>
                  {shippingEstimateLoading ?
                    'Loading...' :
                    (shippingCost ?
                      `\$${shippingCost}` :
                      <button
                        tw="underline text-[#333333]"
                        onClick={() => {
                          setShowShippingEstimateModal(true);
                          setShippingEstimateModalZip(shippingZip || '');
                        }}
                      >
                        Calculate
                      </button>)}
                </div>
                <div tw='text-[20px] text-black leading-[28px] mt-1'>
                  Accepted
                </div>
              </div>
              {artistData.shippingReturnPolicies &&
                <div tw='mt-6'>
                  <button
                    tw='underline text-[#65676B] text-[16px]'
                    onClick={() => setShowShippingPolicies(!showShippingPolicies)}
                  >
                    {showShippingPolicies && 'Hide '}Shipping and Return Policies
                  </button>
                  {showShippingPolicies &&
                    <div tw='text-[16px] text-black'>
                      {artistData.shippingReturnPolicies}
                    </div>}
                </div>
              }
            </div>
            <div tw='mt-10'>
              <div tw='ml-3 text-[20px] text-black leading-[27px] font-semibold'>
                Frequently Asked Questions
              </div>
              <div tw='mt-7 pl-7 flex flex-col gap-y-5'>
                {(
                  (artistData.faqs || [
                    {
                      question: 'How do I get in touch?',
                      answer: 'Send me a message!',
                    },
                  ]) as { question: string; answer: string }[]
                ).map(({ question, answer }, i) => (
                  <button
                    tw='px-6 py-[14px] border-[1.5px] border-[#8B8B8B] rounded-[30px]'
                    key={i}
                    onClick={() =>
                      setExpandedFAQ((current) => (current === i ? -1 : i))
                    }
                  >
                    <div tw='flex w-full items-center justify-between text-[14px] leading-[19px] font-bold text-[#65676B]'>
                      <div>{question}</div>
                      <img
                        src='/assets/svgs/arrow_down.svg'
                        tw='w-5'
                        css={[expandedFAQ === i && tw`scale-y-[-1]`]} />
                    </div>
                    {expandedFAQ === i &&
                      <div tw='text-left mt-1 text-[14px] text-[#8B8B8B] w-full'>
                        {answer}
                      </div>
                    }
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div >
      </Container>
    </>
  );
};

function ShareButton(props: { title: string; text: string; url: string }) {
  const data = props;
  const canShare = useMemo(
    () => navigator.canShare && navigator.canShare(data),
    []
  );
  if (!canShare) {
    return <></>;
  }
  return (
    <button
      tw="bg-white hover:bg-[#F5F5F5] rounded-full w-9 h-9 flex justify-center items-center"
      onClick={() => navigator.share(data)}
    >
      <svg
        width="16"
        height="19"
        viewBox="0 0 16 19"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 4L10.58 5.42L8.99 3.83V13H7.01V3.83L5.42 5.42L4 4L8 0L12 4ZM16 9V16.75C16 17.85 15.1 18.75 14 18.75H2C0.89 18.75 0 17.85 0 16.75V9C0 7.89 0.89 7 2 7H5V9H2V16.75H14V9H11V7H14C15.1 7 16 7.89 16 9Z"
          fill="#5A5A5A"
        />
      </svg>
    </button>
  );
}
export default IndividualWork;
