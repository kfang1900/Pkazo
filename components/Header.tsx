import Link from 'next/link';
import Image from 'next/image';

import buttons from 'styles/Button';
import useAuth from '../utils/auth/useAuth';
import tw, { TwStyle } from 'twin.macro';
import React, { useEffect, useRef, useState } from 'react';
import LoginForm, { Login } from './popups/LoginForm';
import CartPopup from './cart/CartPopup';
import { useRouter } from 'next/router';
import {
  loadStorageImage,
  loadStorageImages,
} from '../helpers/FirebaseFunctions';
import UploadWork from './uploading/UploadWork';
import { useMediaQuery } from 'react-responsive';
import SearchHeader from './search/SearchHeader';
import SearchBox from './search/SearchBox';
import { hide } from 'dom7';
// import { useNavigate } from "react-router-dom";

/* Copied from image.tsx source */
interface StaticRequire {
  default: StaticImageData;
}
type StaticImport = StaticRequire | StaticImageData;

const Header = (props: {
  isBuyer?: boolean | undefined;
  logoOnly?: boolean;
  isSticky?: boolean;
  isHome?: boolean;
}) => {
  const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
  }, [mediaQuery, isMobile]);

  const largeQuery = useMediaQuery({ query: `(min-width: 1280px)` });
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  useEffect(() => {
    if (isLargeScreen !== largeQuery) setIsLargeScreen(largeQuery);
  }, [largeQuery, isLargeScreen]);

  // const navigate = useNavigate();
  // 0 = artist (signed in)
  // 1 = not signed in
  // 2 = regular user (signed in)
  // const [profileType, setProfileType] = useState(1);

  const {
    user,
    signOut,
    isArtist,
    loginModalDefaultSignup,
    artistData,
    showLoginModal,
    loginModalVisible,
    hideLoginModal,
  } = useAuth();

  const [showCart, setShowCart] = useState(false);
  const [pfp, setPfp] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showChooseWorkDropdown, setShowChooseWorkDropdown] = useState(false);
  const [showUploadWorkPopup, setShowUploadWorkPopup] = useState(false);
  const [loginPopup, setLoginPopup] = useState(false);

  // search states
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const updateSearchValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const router = useRouter();
  const username = artistData?.username;
  useEffect(() => {
    // console.log('user', user);
    if (!artistData || !artistData?.profilePicture) {
      return;
    }
    (async () => {
      const pfp = await loadStorageImage(artistData?.profilePicture);
      if (pfp !== null) {
        setPfp(pfp);
      } else {
        setPfp('/images/default-profile-picture.png');
      }
    })();
  }, [artistData]);

  const [onSearch, setOnSearch] = useState(false);
  const profileButtonRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        profileButtonRef.current &&
        profileButtonRef.current.contains(e.target as any)
      ) {
        setShowProfileDropdown((o) => !o);
      } else {
        setShowProfileDropdown(false);
      }
    };
    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  });
  if (props.logoOnly) {
    return (
      <div tw="top-0 z-50 w-full">
        <div tw="bg-white h-[56px] md:h-[60px] px-5 md:px-[36px] xl:px-[60px] flex items-center justify-between border-b md:border-0 border-[#D8D8D8]">
          <Link href="/" passHref>
            <img
              src="/assets/images/Pkazo.svg"
              tw="cursor-pointer w-[69px] h-[24px] md:w-[92px] md:h-[32px]"
              alt="Pkazo"
            />
          </Link>
        </div>
      </div>
    );
  }
  const navStyle = [tw`top-0 z-50 w-full`, props.isSticky && tw`sticky`];
  // if (isMobile && loginPopup) {
  //   return (
  //     <div
  //       css={navStyle}
  //       tw="h-screen overscroll-contain overflow-hidden flex justify-center"
  //     >
  //       <Login
  //         onClose={() => hideLoginModal()}
  //         defaultSignUp={loginModalDefaultSignup}
  //       />
  //     </div>
  //   );
  // }

  return (
    <div css={navStyle}>
      {!isMobile && loginPopup && (
        <LoginForm
          onClose={() => setLoginPopup(false)}
          defaultSignUp={loginModalDefaultSignup}
        />
      )}
      {!isMobile && (
        <CartPopup onClose={() => setShowCart(false)} toShow={showCart} />
      )}
      {isMobile && onSearch && <SearchBox />}

      <>
        {showUploadWorkPopup && (
          <UploadWork onClose={() => setShowUploadWorkPopup(false)} />
        )}
        <div
          tw="bg-white h-10 md:h-[60px] px-4 md:px-[36px] xl:px-[60px] flex items-center justify-between duration-100 border-b "
          css={[props.isHome ? tw`border-transparent` : tw`border-[#EFEFEF]`]}
        >
          <Link href="/" passHref>
            <img
              src="/assets/images/Pkazo.svg"
              tw="cursor-pointer w-[57px] h-[20px] md:w-[92px] md:h-[32px]"
              alt="Pkazo"
            />
          </Link>
          {!isMobile && (
            <div tw="relative flex-grow ml-5">
              <SearchBox />
            </div>
          )}
          <div tw="md:ml-10 flex items-center gap-x-4 md:gap-x-8 flex-shrink-0">
            {isMobile && (
              <button onClick={() => setOnSearch(true)}>
                <img src="/assets/svgs/mobile/search.svg" />
              </button>
            )}
            {!!user && (
              <>
                {/* <Link href="/favorites" passHref>
                  <img
                    src={`/assets/svgs/${isMobile ? 'mobile/' : ''}like.svg`}
                    tw="cursor-pointer flex-shrink-0"
                  />
                </Link> */}
                <Link href="/chat" passHref>
                  <img
                    src={`/assets/svgs/${isMobile ? 'mobile/' : ''}chat.svg`}
                    tw="cursor-pointer flex-shrink-0"
                  />
                </Link>
              </>
            )}
            {!!user && isArtist && (
              <>
                <Link href={`/artist?redirect=${window.location.pathname}`} passHref>
                  <a>
                    <img
                      src={`/assets/svgs/${isMobile ? 'mobile/' : ''}shop.svg`}
                      tw="cursor-pointer flex-shrink-0"
                    />
                  </a>
                </Link>
                <button onClick={() => setShowUploadWorkPopup(true)}>
                  <img
                    src={`/assets/svgs/${isMobile ? 'mobile/' : ''}create.svg`}
                    tw="cursor-pointer flex-shrink-0"
                  />
                </button>
                <div className="relative">
                  <button
                    tw="w-4 h-4 md:w-6 md:h-6 my-auto overflow-hidden rounded-full flex items-center"
                    ref={profileButtonRef}
                  >
                    <Image
                      src={pfp || '/assets/images/blank_pfp.jpg'}
                      alt="profile"
                      width={isMobile ? '16px' : '24px'}
                      height={isMobile ? '16px' : '24px'}
                      objectFit="cover"
                    />
                  </button>

                  {showProfileDropdown && (
                    <div
                      tw="z-10 origin-top-right absolute right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
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
                          Account Settings
                        </a>
                      </Link>
                      <Link href={`/${username}`} passHref>
                        <a
                          tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-100"
                          tabIndex={-1}
                        >
                          Profile
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
                  )}
                </div>
              </>
            )}
            {!user && (
              <>
                <Link
                  href={
                    isMobile
                      ? `/signin?redirect=${window.location.pathname}`
                      : 'javascript:void(0);'
                  }
                  passHref
                >
                  <button
                    tw="text-[12px] md:text-[14px] text-[#222222] font-semibold py-1 flex-shrink-0"
                    onClick={() => setLoginPopup(true)}
                  >
                    Sign in
                  </button>
                </Link>
                <button
                  css={[
                    buttons.red,
                    tw`font-semibold w-[108px] md:w-[121px] h-[32px] md:h-[42px] text-[12px] md:text-[14px] px-0 py-0 flex-shrink-0`,
                  ]}
                  onClick={() => window.open('/onboarding', '_self')}
                >
                  Sell on Pkazo
                </button>
              </>
            )}
            {!!user && !isArtist && (
              <>
                <button
                  css={[
                    buttons.red,
                    tw`font-semibold w-[108px] md:w-[121px] h-[32px] md:h-[42px] text-[12px] md:text-[14px] px-0 py-0 flex-shrink-0`,
                  ]}
                  onClick={() => window.open('/onboarding', '_self')}
                >
                  Sell on Pkazo
                </button>
                <div className="ml-3 relative">
                  <button
                    tw="w-4 h-4 md:w-6 md:h-6 my-auto overflow-hidden rounded-full flex items-center"
                    ref={profileButtonRef}
                  >
                    <img
                      src={`/assets/svgs/${isMobile ? 'mobile/' : ''
                        }profile.svg`}
                    />
                  </button>

                  {showProfileDropdown && (
                    <div
                      tw="z-50 origin-top-right absolute right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="user-menu-button"
                      tabIndex={-1}
                    >
                      <a
                        tw="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-100"
                        tabIndex={-1}
                        onClick={() => signOut()}
                      >
                        Sign out
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
            <Link href={isMobile ? '/cart' : 'javascript:void(0);'} passHref>
              <div onClick={() => setShowCart(true)} tw="flex-shrink-0">
                <img
                  src={`/assets/svgs/${isMobile ? 'mobile/' : ''}cart.svg`}
                  tw="cursor-pointer"
                />
              </div>
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
      </>
    </div>
  );
};

export default Header;

/*
<Link href={`/account/edit`} passHref>
                        <a
                          tw="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-100"
                          tabIndex={-1}
                        >
                          Acconut Settings
                        </a>
                      </Link> 
*/
