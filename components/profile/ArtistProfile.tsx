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
  const { artistId, user } = useAuth();
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });

  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(false);
  const [picture, setPicture] = useState('');

  const router = useRouter();

  const artist = artistData[0].data();

  useEffect(() => {
    loadStorageImage(artist.profilePicture).then((profilePictureURL) =>
      setPicture(profilePictureURL)
    );
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
      <div tw="mt-4 mb-3 px-4">
        <div tw="grid grid-cols-[91px auto] gap-3">
          <div tw="w-[90px] h-[90px] my-auto overflow-hidden rounded-full flex items-center">
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
          <div>
            <div tw="text-[20px] text-black font-medium">{artist.name}</div>
            <div tw="text-[14px] mt-1 text-[#727373] font-medium">
              {artist.location}
            </div>
            <div tw="flex mt-[14px]">
              <button
                onClick={() => setIsFollowing(!isFollowing)}
                css={buttons.white}
                tw="text-[#3B3B3B] h-7 text-[13px] px-2 gap-1 flex justify-center items-center font-semibold"
              >
                <img
                  src={
                    isFollowing
                      ? '/assets/svgs/red_like.svg'
                      : '/assets/svgs/like.svg'
                  }
                  tw="w-4 h-3"
                />
                {numFormatter(artist.followers)}
              </button>
              <button
                onClick={() => 0}
                css={buttons.red}
                tw="text-[13px] ml-[10px] px-3 font-semibold w-[107px] h-7"
              >
                Commission
              </button>
            </div>
          </div>
        </div>
        <ShowMore
          appearance={tw`mt-3 text-[#3C3C3C] text-[14px] leading-[19px]`}
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
        <div tw='flex'>
          <div tw='w-[10%] flex-shrink-[0.2]' />
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
            <div tw='flex'>
              <div tw='max-w-[85px] w-[10%] h-full flex-shrink-0' />
              <div tw="flex flex-col">
                <div tw="flex items-start justify-start">
                  <h1 tw="text-[32px] leading-[32px] font-semibold text-black">
                    {artist.name}
                  </h1>
                  <div tw='w-10 flex-shrink h-full' />
                  {isCurrentUserPage ? (
                    <button
                      onClick={() => router.push('/account/edit')}
                      css={buttons.white}
                    >
                      Edit Profile
                    </button>
                  ) : (
                    <>
                      <button
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
                        {numFormatter(artist.followers | 3900)}
                      </button>
                      {isFollowing && (
                        <button
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
                          css={buttons.white}
                          tw="ml-5 px-7 font-semibold"
                        >
                          Message
                        </button>
                      )}
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
                <p tw="text-gray-600 text-[20px] mt-1">{artist.location}</p>
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
          <div tw='w-[10%] flex-shrink-[0.2]' />
        </div>
      </section>
    </>
  );
};

export default ArtistProfile;
