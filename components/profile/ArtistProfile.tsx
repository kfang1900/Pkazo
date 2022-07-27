import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import tw from 'twin.macro';
import Link from 'next/link';

import buttons from 'styles/Button';
import ShowMore from 'styles/ShowMore';
import ConfirmUnfollowModal from './ConfirmUnfollow';
import {
  QueryDocumentSnapshot,
  DocumentData,
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  collection,
  setDoc,
} from 'firebase/firestore';
import { loadStorageImage } from 'helpers/FirebaseFunctions';
import { useRouter } from 'next/router';
import { getApp } from 'firebase/app';
import useAuth from '../../utils/auth/useAuth';
import { useMediaQuery } from 'react-responsive';
import { ArtistData } from '../../types/dbTypes';

const numFormatter = (x: number) => {
  if (x > 999 && x < 1000000) {
    return (x / 1000).toFixed(1).replace(/\.?0+$/, '') + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (x >= 1000000) {
    return (x / 1000000).toFixed(1).replace(/\.?0+$/, '') + 'M'; // convert to M for number from > 1 million
  } else return x; // if value < 1000, nothing to do
};

const ArtistProfile = ({
  artistData,
  isCurrentUserPage,
}: {
  artistData: QueryDocumentSnapshot<DocumentData>[];
  isCurrentUserPage?: boolean;
}) => {
  const { artistId, user, showLoginModal } = useAuth();
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
  const isSmall = !useMediaQuery({ query: `(min-width: 1024px)` });

  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(false);
  const [picture, setPicture] = useState('');

  const router = useRouter();

  const artist = artistData[0].data() as ArtistData;

  useEffect(() => {
    const fetchData = async () => {
      const artistPFP = await loadStorageImage(artist.profilePicture);
      if (artistPFP === null) {
        setPicture('/images/default-profile-picture.png');
      } else {
        setPicture(artistPFP);
      }
    };
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [artist]);

  const bioRef = useRef<HTMLDivElement>(null);
  const [moreBio, setMoreBio] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const handleBioResize = () => {
    if (bioRef.current && 72 < bioRef.current['scrollHeight']) {
      setMoreBio(true);
    } else {
      setMoreBio(false);
    }
  };
  useEffect(() => {
    window.addEventListener('resize', handleBioResize);
  });
  useEffect(handleBioResize, [bioRef]);
  return <div tw="mt-4 md:mt-12 mb-3 md:mb-10 px-5 flex">
    <div tw='md:w-[10%] md:flex-shrink' />
    <div tw='w-full'>
      {isSmall ? (
        <>
          <div tw="w-full grid grid-cols-[96px auto] md:grid-cols-[128px auto] gap-5 md:gap-8">
            <div tw="w-[96px] h-[96px] md:w-[128px] md:h-[128px] my-auto relative overflow-hidden rounded-full flex items-center">
              {picture && (
                <Image
                  src={picture}
                  alt="profile_image"
                  layout='fill'
                  objectFit="cover"
                />
              )}
            </div>
            <div tw="h-full flex flex-col">
              <div tw="text-[22px] md:text-[36px] leading-[26px] md:leading-[32px] text-[#222222] font-medium md:font-semibold">
                {artist.name}
              </div>
              <div tw="text-[16px] md:text-[24px] leading-[20px] md:leading-[24px] mt-1 md:mt-3 text-[#8E8E93] font-medium flex items-center gap-x-[6px] md:gap-x-4">
                {artist.location}
                <div tw='w-[2px] h-[2px] md:w-[6px] md:h-[6px] rounded-full bg-[#8E8E93]' />
                {artist.discipline}
              </div>
              <div tw="flex mt-auto">
                {/* <button
                onClick={() => setIsFollowing(!isFollowing)}
                css={buttons.white}
                tw="text-[#3B3B3B] h-8 text-[13px] px-3 gap-[6px] flex justify-center items-center font-semibold"
              >
                <img
                  src={
                    isFollowing
                      ? '/assets/svgs/red_like.svg'
              : '/assets/svgs/like.svg'
                  }
              tw="w-4 h-3"
                />
              {numFormatter((artist as any)?.followers || 3122)}
            </button> */}
                {isCurrentUserPage ? (
                  <button
                    onClick={() => router.push(`/account/edit?redirect=${window.location.pathname}`)}
                    css={buttons.white}
                    tw="text-[14px] h-8 px-5"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      css={buttons.white}
                      tw="text-[#3B3B3B] w-8 h-8 md:w-11 md:h-11 p-0 flex items-center justify-center"
                      onClick={() => {
                        if (!user || !artistData[0].id) {
                          return;
                        }
                        const app = getApp();
                        const db = getFirestore(app);

                        updateDoc(doc(db, 'users', user.uid), {
                          chats: arrayUnion(artistData[0].id),
                        }).then(() => {
                          return router.push(`/chat#${artistData[0].id}`);
                        });
                      }}
                    >
                      <div tw='pb-[1px] pl-[1px]'>
                        <img src='assets/svgs/message.svg' tw='md:w-6 md:h-6' />
                      </div>
                    </button>
                    <button
                      onClick={() => 0}
                      css={buttons.red}
                      tw="text-[14px] md:text-[20px] ml-3 md:ml-5 flex items-center justify-center font-semibold w-[116px] h-8 md:w-[170px] md:h-11"
                    >
                      Commission
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
          <ShowMore
            appearance={tw`mt-4 md:mt-5 text-black text-[14px] md:text-[16px] leading-[19px] md:leading-[24px]`}
            height={isMobile ? 57 : 72}
            fixed
          >
            <div>{artist.bio || "This artist hasn't completed their bio yet."}</div>
          </ShowMore>
          <div tw="flex mt-3 items-center">
            <img src="/assets/svgs/star.svg" tw="w-[15px] h-[14px]" />
            <div tw="text-[13px] md:text-[18px] text-black ml-1 md:ml-[6px] font-semibold">4.9 </div>
            <Link href="#" passHref>
              <div tw="text-[13px] md:text-[18px] text-[#8E8E93] ml-[6px] md:ml-4 underline cursor-pointer">
                See {numFormatter(313)} reviews
              </div>
            </Link>
          </div>
        </>
      ) : (
        <div tw="w-full grid grid-cols-[200px auto]">
          <div tw="w-[200px] h-[200px] my-auto relative overflow-hidden rounded-full flex items-center">
            {picture && (
              <Image
                src={picture}
                alt="profile_image"
                layout='fill'
                objectFit="cover"
              />
            )}
          </div>
          <div tw="flex">
            <div tw="w-[52px] h-full flex-shrink-0" />
            <div tw="flex flex-col">
              <div tw="flex items-center justify-start">
                <div tw="text-[36px] leading-[32px] font-semibold text-black">
                  {artist.name}
                </div>
                <div tw='min-w-[40px] max-w-[80px] flex-grow' />
                {isCurrentUserPage ? (
                  <button
                    onClick={() => router.push(`/account/edit?redirect=${window.location.pathname}`)}
                    css={buttons.white}
                  >
                    Edit Profile
                  </button>
                ) : (
                  <div tw='flex'  >
                    {/* <button
                        onClick={() => setIsFollowing(!isFollowing)}
                        css={buttons.white}
                        tw="flex-shrink-0 text-[#3B3B3B] text-[16px] px-5 py-3 gap-2 flex justify-center items-center font-semibold"
                      >
                        <img
                          src={
                            isFollowing
                              ? '/assets/svgs/red_like.svg'
                              : '/assets/svgs/like.svg'
                          }
                          tw="w-5 h-4"
                        />
                        {numFormatter((artist as any)?.followers | 3900)}
                      </button> */}

                    <button
                      css={buttons.white}
                      tw="text-[#3B3B3B] border-2 w-11 h-11 p-0 flex items-center justify-center flex-none"
                      onClick={() => {
                        if (!user || !artistData[0].id) {
                          showLoginModal(true);
                          return;
                        }
                        const app = getApp();
                        const db = getFirestore(app);

                        updateDoc(doc(db, 'users', user.uid), {
                          chats: arrayUnion(artistData[0].id),
                        }).then(() => {
                          return router.push(`/chat#${artistData[0].id}`);
                        });
                      }}
                    >
                      <div tw='pb-[1px] pl-[1px]'>
                        <img src='assets/svgs/message.svg' tw='w-[24px] h-[24px]' />
                      </div>
                    </button>

                    <button
                      onClick={() => 0}
                      css={buttons.red}
                      tw="ml-5 w-[170px] h-11 flex items-center justify-center text-[20px] font-semibold text-white"
                    >
                      Commission
                    </button>
                  </div>
                )}
              </div>
              <div tw='text-[#8E8E93] font-medium text-[24px] leading-[29px] mt-[4px] flex items-center gap-x-4'>
                {artist.location}
                <div tw='w-[6px] h-[6px] rounded-full bg-[#8E8E93]' />
                {artist.discipline}
              </div>
              <ShowMore
                appearance={tw`mt-3 text-black text-[16px] leading-[24px]`}
                height={72}
                fixed
              >
                <div>{artist.bio || "This artist hasn't completed their bio yet."}</div>
              </ShowMore>
              <div tw="flex mt-3 items-center">
                <img src="/assets/svgs/star.svg" tw="w-6 h-[22px]" />
                <div tw="text-[18px] text-black ml-[6px] font-semibold">
                  4.9{' '}
                </div>
                <Link href="#" passHref>
                  <div tw="text-[18px] text-[#8E8E93] ml-4 underline cursor-pointer">
                    See {numFormatter(313)} reviews
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <div tw='md:w-[10%] md:flex-shrink' />
  </div >
};

export default ArtistProfile;
