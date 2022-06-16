import Link from 'next/link';
import Image from 'next/image';

import buttons from 'styles/Button';
import { UrlObject } from 'url';
import useAuth from '../utils/auth/useAuth';
import tw, { TwStyle } from 'twin.macro';
import React, { useEffect, useState } from 'react';
import { getApp } from 'firebase/app';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { ArtistData } from '../types/dbTypes';
import LoginForm from './popups/LoginForm';
import { useRouter } from 'next/router';
import {
  loadStorageImage,
  loadStorageImages,
} from '../helpers/FirebaseFunctions';
import UploadWork from './uploading/UploadWork';
import { useMediaQuery } from 'react-responsive';
import SearchBar from './SearchBar';

/* Copied from image.tsx source */
interface StaticRequire {
  default: StaticImageData;
}
type StaticImport = StaticRequire | StaticImageData;

const Header = (props: {
  isBuyer?: boolean | undefined;
  logoOnly?: boolean;
}) => {
  const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
  }, [mediaQuery, isMobile]);
  // 0 = artist (signed in)
  // 1 = not signed in
  // 2 = regular user (signed in)
  // const [profileType, setProfileType] = useState(1);

  const { user, signOut, isArtist } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pfp, setPfp] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showChooseWorkDropdown, setShowChooseWorkDropdown] = useState(false);
  const [showUploadWorkPopup, setShowUploadWorkPopup] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();
  const { artistData } = useAuth();
  const username = artistData?.username;
  useEffect(() => {
    console.log('user', user);
    if (!artistData || !artistData?.profilePicture) {
      return;
    }
    (async () => {
      setPfp(await loadStorageImage(artistData?.profilePicture));
    })();
  }, [artistData]);
  if (props.logoOnly) {
    return (
      <div tw='top-0 z-50 w-full'>
        <div tw="bg-white h-[56px] md:h-[60px] px-5 md:px-[60px] flex items-center justify-between border-b md:border-0 border-[#D8D8D8]">
          <Link href="/" passHref>
            <img
              src='/assets/images/Pkazo.svg'
              tw="cursor-pointer w-[69px] h-[24px] md:w-[92px] md:h-[32px]"
              alt="Pkazo"
            />
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div tw="sticky top-0 z-50 w-full">
      {showLoginModal && <LoginForm onClose={() => setShowLoginModal(false)} />}
      {showUploadWorkPopup && (
        <UploadWork onClose={() => setShowUploadWorkPopup(false)} />
      )}
      <div tw="bg-white h-10 md:h-[60px] px-4 md:px-[60px] flex items-center justify-between border-b border-[#D8D8D8]">
        <Link href="/" passHref>
          <img
            src="/assets/images/Pkazo.svg"
            tw="cursor-pointer w-[57px] h-[20px] md:w-[92px] md:h-[32px]"
            alt="Pkazo"
          />
        </Link>
        {!isMobile && (
          <div tw="flex-grow ml-5 pl-6 pr-5 rounded-[48px] h-10 bg-[#F0F0F0] border border-[#A3A3A3] focus-within:border-[#838383] outline-none flex items-center">
            <input
              type="text"
              placeholder="Search for anything"
              tw="w-full bg-transparent outline-none text-[16px]"
            />
            <img src="/assets/svgs/search.svg" tw="ml-3 w-[18px] h-[18px]" />
          </div>
        )}
        <div tw="ml-10 flex items-center gap-x-4 md:gap-x-8">
          {!!user && (
            <>
              <Link href="/favorites" passHref>
                <img
                  src={`/assets/svgs/${isMobile ? 'mobile/' : ''}like.svg`}
                  tw="cursor-pointer"
                />
              </Link>
              <Link href="/chats" passHref>
                <img
                  src={`/assets/svgs/${isMobile ? 'mobile/' : ''}chat.svg`}
                  tw="cursor-pointer"
                />
              </Link>
            </>
          )}
          {!!user && isArtist && (
            <>
              <Link href="/shop" passHref>
                <img
                  src={`/assets/svgs/${isMobile ? 'mobile/' : ''}shop.svg`}
                  tw="cursor-pointer"
                />
              </Link>
              <button onClick={() => setShowUploadWorkPopup(true)}>
                <img
                  src={`/assets/svgs/${isMobile ? 'mobile/' : ''}create.svg`}
                  tw="cursor-pointer"
                />
              </button>
              <div className="ml-3 relative">
                <div tw="w-4 h-4 md:w-6 md:h-6 my-auto overflow-hidden rounded-full flex items-center">
                  {pfp && (
                    <Image
                      src={pfp}
                      alt="profile"
                      width={isMobile ? '16px' : '24px'}
                      height={isMobile ? '16px' : '24px'}
                      objectFit="cover"
                    />
                  )}
                </div>

                <div
                  tw="origin-top-right absolute right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex={-1}
                >
                  <Link href={`/account/edit`} passHref>
                    <a
                      tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-100"
                      tabIndex={-1}
                    >
                      Acconut Settings
                    </a>
                  </Link>
                  <a
                    tw="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-100"
                    tabIndex={-1}
                    onClick={() => signOut()}
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </>
          )}
          {!user && (
            <>
              <Link
                href={isMobile ? '/signin' : 'javascript:void(0);'}
                passHref
              >
                <button
                  tw="text-[12px] md:text-[14px] text-[#3C3C3C] font-semibold py-1 flex-shrink-0"
                  onClick={() => setShowLoginModal(true)}
                >
                  Sign in
                </button>
              </Link>
              <button
                css={[
                  buttons.red,
                  tw`font-semibold w-[108px] md:w-[121px] h-[32px] md:h-[42px] text-[12px] md:text-[14px] px-0 py-0 flex-shrink-0`,
                ]}
              >
                Sell on Pkazo
              </button>
            </>
          )}
          {!!user && !isArtist && (
            <>
              <div>
                <img
                  src={`/assets/svgs/${isMobile ? 'mobile/' : ''}profile.svg`}
                />
              </div>
            </>
          )}
          <Link href="/cart" passHref>
            <img
              src={`/assets/svgs/${isMobile ? 'mobile/' : ''}cart.svg`}
              tw="cursor-pointer"
            />
          </Link>
        </div>
      </div>
      {showSearch && (
        <div tw="md:hidden flex flex-row items-center justify-between py-2">
          <div
            css={[
              tw`w-full mx-2 md:mx-4 lg:mx-8`,
              showSearch ? '' : tw`hidden md:block`,
            ]}
          >
            <input
              type="text"
              placeholder="Search"
              tw="px-4 py-1 bg-gray-100 outline-none rounded-full w-full"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
