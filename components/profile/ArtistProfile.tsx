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
  const { artistId, user, setShowLoginModal } = useAuth();
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });

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
      console.log(picture);
      // call the function
      fetchData()
        // make sure to catch any error
        .catch(console.error);
    };
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
  return isMobile ? (
    <>
      <div tw="mt-4 mb-3 px-5">
        <div tw="grid grid-cols-[96px auto] gap-5">
          <div tw="w-[96px] h-[96px] my-auto overflow-hidden rounded-full flex items-center">
            {picture && (
              <Image
                src={picture}
                alt="profile_image"
                width="90px"
                height="90px"
                objectFit="cover"
              />
            )}
          </div>
          <div tw="h-full flex flex-col">
            <div tw="text-[22px] leading-[26px] text-black font-medium">
              {artist.name}
            </div>
            <div tw="text-[16px] leading-[20px] mt-1 text-[#727373] font-medium flex items-center gap-x-[6px]">
              {artist.location}
              <div tw="text-[10px]">&bull;</div>
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
                  onClick={() => router.push('/account/edit')}
                  css={buttons.white}
                  tw="text-[14px] h-8 px-5"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    css={buttons.white}
                    tw="text-[#3B3B3B] w-8 h-8 p-0 flex justify-center items-center"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.0109 0C6.96185 0 5.92308 0.206917 4.95388 0.608937C3.98468 1.01096 3.10405 1.60021 2.36226 2.34304C0.864148 3.84327 0.0225164 5.87801 0.0225164 7.99965C0.0155328 9.84687 0.654232 11.6383 1.82789 13.0634L0.230214 14.6634C0.119369 14.7758 0.0442816 14.9187 0.0144257 15.0739C-0.0154302 15.2291 0.00128365 15.3896 0.0624583 15.5353C0.128808 15.6792 0.236369 15.8002 0.371486 15.8828C0.506604 15.9654 0.663186 16.006 0.821355 15.9993H8.0109C10.1296 15.9993 12.1614 15.1565 13.6595 13.6563C15.1577 12.156 15.9993 10.1213 15.9993 7.99965C15.9993 5.87801 15.1577 3.84327 13.6595 2.34304C12.1614 0.842817 10.1296 0 8.0109 0V0ZM8.0109 14.3994H2.74656L3.48948 13.6554C3.63826 13.5055 3.72177 13.3028 3.72177 13.0914C3.72177 12.8801 3.63826 12.6773 3.48948 12.5274C2.44347 11.4811 1.79208 10.104 1.64631 8.63065C1.50053 7.15732 1.86939 5.67895 2.69002 4.44742C3.51066 3.21589 4.7323 2.30738 6.14683 1.8767C7.56135 1.44601 9.08124 1.51978 10.4475 2.08544C11.8138 2.6511 12.942 3.67366 13.6399 4.97889C14.3377 6.28413 14.5621 7.79129 14.2747 9.2436C13.9873 10.6959 13.206 12.0035 12.0638 12.9436C10.9217 13.8837 9.48937 14.3982 8.0109 14.3994V14.3994Z"
                        fill="#3B3B3B"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => 0}
                    css={buttons.red}
                    tw="text-[14px] ml-[12px] flex items-center justify-center font-semibold w-[116px] h-8"
                  >
                    Commission
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
        <ShowMore
          appearance={tw`mt-4 text-[#3C3C3C] text-[14px] leading-[19px]`}
          height={57}
          fixed
        >
          <div>{artist.bio}</div>
        </ShowMore>
        <div tw="flex mt-3 items-center">
          <img src="/assets/svgs/star.svg" tw="w-[15px] h-[14px]" />
          <div tw="text-[13px] text-black ml-1 font-semibold">4.9 </div>
          <Link href="#" passHref>
            <div tw="text-[13px] text-[#838383] ml-[6px] underline cursor-pointer">
              See {numFormatter(313)} reviews
            </div>
          </Link>
        </div>
      </div>
    </>
  ) : (
    <>
      <section tw="mt-[48px] mb-[40px]">
        <div tw="flex">
          <div tw="w-[10%] flex-shrink-[0.5]" />
          <div tw="w-full grid grid-cols-[200px auto]">
            <div tw="w-[200px] h-[200px] my-auto overflow-hidden rounded-full flex items-center">
              {picture && (
                <Image
                  src={picture}
                  alt="profile_image"
                  width="200px"
                  height="200px"
                  objectFit="cover"
                />
              )}
            </div>
            <div tw="flex">
              <div tw="max-w-[85px] w-[10%] h-full flex-shrink-0" />
              <div tw="flex flex-col">
                <div tw="flex items-start justify-start">
                  <h1 tw="text-[32px] leading-[32px] font-semibold text-black">
                    {artist.name}
                  </h1>
                  <div tw="w-10 flex-shrink h-full" />
                  {isCurrentUserPage ? (
                    <button
                      onClick={() => router.push('/account/edit')}
                      css={buttons.white}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
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
                        onClick={() => {
                          if (!user || !artistData[0].id) {
                            setShowLoginModal(true);
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
                        css={buttons.white}
                        tw="ml-5 px-7 font-semibold"
                      >
                        Message
                      </button>

                      <button
                        onClick={() => 0}
                        css={buttons.red}
                        tw="ml-5 px-7 py-2 font-semibold"
                      >
                        Commission
                      </button>
                    </>
                  )}
                </div>
                <p tw="text-gray-600 text-[20px] mt-1">
                  {artist.location} &bull; {artist.discipline}
                </p>
                <ShowMore
                  appearance={tw`mt-3 text-black text-[16px] leading-[24px]`}
                  height={72}
                  fixed
                >
                  <div>{artist.bio}</div>
                </ShowMore>
                <div tw="flex mt-3 items-center">
                  <img src="/assets/svgs/star.svg" tw="w-6 h-[22px]" />
                  <div tw="text-[18px] text-black ml-[7px] font-semibold">
                    4.9{' '}
                  </div>
                  <Link href="#" passHref>
                    <div tw="text-[18px] text-[#8E8E93] ml-[10px] underline cursor-pointer">
                      See {numFormatter(313)} reviews
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div tw="w-[10%] flex-shrink-[0.5]" />
        </div>
      </section>
    </>
  );
};

export default ArtistProfile;
