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
        <div tw="flex mt-10 w-full">
          <div>
            <div tw='flex gap-x-9'>
              {workImages.length >= 2 && <div>image sidebar</div>}
              <div tw='relative h-[608px] max-w-[800px] w-[50vw] bg-[#F4F4F4] flex items-center'>
                {workImages[selectedImage] ?
                  <img src={workImages[selectedImage]}
                    tw='max-w-full max-h-full h-auto' /> :
                  <div tw='m-auto'>Unable to load image</div>
                }
                {workImages.length >= 2 && (
                  <button
                    tw="w-9 h-9 rounded-full bg-white opacity-30 hover:opacity-50 absolute top-[50%] left-[10px] flex-shrink-0"
                    onClick={
                      () => setSelectedImage((selectedImage - 1 + workImages.length) % workImages.length)
                    }
                  >
                    <img src='/assets/svgs/arrow_left.svg' tw='m-auto' />
                  </button>
                )}
                {workImages.length >= 2 && (
                  <button
                    tw="w-9 h-9 rounded-full bg-white opacity-30 hover:opacity-50 absolute top-[50%] right-[10px] flex-shrink-0"
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
                <div tw='text-[16px] leading-[1em] font-semibold text-[#838383]'>
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
              <div tw='font-semibold text-[32px] leading-[1em] text-[#242424]'>
                {workData.forSale ? `\$${workData.sale?.price}` : 'Not for sale'}
              </div>
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
            <div tw='mt-6 px-7 flex flex-col border-t-2 border-b-2 border-[#E9E9E9] py-6'>
              <button
                css={[
                  buttons.white,
                  tw`border-[1.5px] border-[#3C3C3C] h-12 text-[14px] text-[#3C3C3C]`
                ]}
              >
                Buy now
              </button>
              <button
                tw='mt-3'
                css={[
                  buttons.red,
                  tw`h-12 text-[14px] text-white`
                ]}
              >
                Add to cart
              </button>
            </div>
          </div>
          <div tw="min-w-[428px] hidden">
            <div tw="mt-6 border border-gray-100 mx-5"></div>
            <div tw="mt-9 items-center flex flex-col gap-y-2.5">
              <button
                tw="w-[354px] border border-black rounded-full py-4 hover:bg-gray-100"
                onClick={() => setShowCheckoutModal(true)}
              >
                Buy now
              </button>
              <button tw="w-[354px] rounded-full py-4 border-soft-red bg-soft-red hover:bg-red-600 hover:border-red-600 text-white">
                Add to cart
              </button>
            </div>
            <div tw="my-9 border border-gray-100 mx-5"></div>
            <div tw="ml-14 flex flex-col gap-y-9 text-sm text-gray-500">
              <div tw="flex">
                {shippingZip && (
                  <p tw="flex-auto">
                    Ship to{' '}
                    <span tw="text-black font-semibold">
                      United States, {shippingZip}
                    </span>
                  </p>
                )}
                <div tw="flex-auto flex flex-row-reverse">
                  <a
                    tw="underline"
                    href="#"
                    onClick={() => {
                      setShowShippingEstimateModal(true);
                      setShippingEstimateModalZip(shippingZip || '');
                    }}
                  >
                    Change Address
                  </a>
                </div>
              </div>
              {artistData.shippingProcessingTime && (
                <div tw="flex flex-col gap-y-2">
                  <p>Ready to ship</p>
                  <p tw="text-black text-xl">
                    {artistData.shippingProcessingTime}
                  </p>
                </div>
              )}
              <div tw="flex">
                <div tw="flex-auto flex flex-col gap-y-2">
                  <p>Cost to ship</p>

                  {shippingEstimateLoading ? (
                    <a tw="text-gray-500 text-lg">Loading...</a>
                  ) : shippingCost ? (
                    <p tw={'text-black text-xl'}>${shippingCost}</p>
                  ) : (
                    <a
                      tw="underline text-gray-500 text-lg cursor-pointer select-none"
                      onClick={() => {
                        setShowShippingEstimateModal(true);
                        setShippingEstimateModalZip(shippingZip || '');
                      }}
                    >
                      Calculate
                    </a>
                  )}
                </div>
                <div tw="flex-auto flex flex-col gap-y-2">
                  <p>Returns</p>
                  <p tw="text-black text-xl">Accepted</p>
                </div>
              </div>
              {artistData.shippingReturnPolicies && (
                <div>
                  <a
                    tw="underline cursor-pointer select-none"
                    onClick={() => setShowShippingPolicies((p) => !p)}
                  >
                    {showShippingPolicies ? 'Hide' : 'Show'} Shipping and Return
                    Policies
                  </a>

                  <p css={[!showShippingPolicies ? tw`invisible` : '']}>
                    {artistData.shippingReturnPolicies}
                  </p>
                </div>
              )}
            </div>
            <div tw="ml-12 mt-14 flex flex-col gap-y-3 text-gray-500">
              <p tw="font-bold text-xl mb-3">Frequently Asked Questions</p>

              {(
                (artistData.faqs || [
                  {
                    question: 'How do I get in touch?',
                    answer: 'Send me a message!',
                  },
                ]) as { question: string; answer: string }[]
              ).map(({ question, answer }, i) => (
                <button
                  tw="p-4 border border-gray-500 rounded-[27px] text-left"
                  key={i}
                  onClick={() =>
                    setExpandedFAQ((current) => (current === i ? -1 : i))
                  }
                >
                  <div tw="flex">
                    {/* flex-grow should just be grow, wait for twin.macro to update */}
                    <p tw="flex-grow text-sm font-bold">{question}</p>
                    <div tw="flex items-center">
                      <svg
                        width="15"
                        height="9"
                        viewBox="0 0 15 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        css={expandedFAQ === i ? '' : tw`rotate-[270deg]`}
                      >
                        <path
                          d="M14.6871 0.273877C14.3219 -0.0912924 13.7298 -0.0912924 13.3646 0.273877L7.48026 6.15828L1.59586 0.273877C1.23071 -0.091293 0.638616 -0.091293 0.273465 0.273876C-0.0916853 0.639055 -0.0916853 1.23111 0.273465 1.59629L6.81906 8.14188C7.18421 8.50703 7.77631 8.50703 8.14146 8.14188L14.6871 1.59629C15.0522 1.23112 15.0522 0.639056 14.6871 0.273877Z"
                          fill="#8B8B8B"
                        />
                      </svg>
                    </div>
                  </div>
                  {expandedFAQ === i && <p tw="mt-3 text-sm">{answer}</p>}
                </button>
              ))}
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
      tw="bg-white rounded-full w-9 h-9 flex justify-center items-center"
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
          fill="#222222"
        />
      </svg>
    </button>
  );
}
export default IndividualWork;
