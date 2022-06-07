import Link from 'next/link';
import Image from 'next/image';
import Logo from '/public/assets/images/Pkazo.svg';
import HouseLogo from '/public/assets/images/house.svg';
import ShopLogo from '/public/assets/images/shop.svg';
import GroupsLogo from '/public/assets/images/groups.svg';
import PlusLogo from '/public/assets/images/plus.svg';
import MessageLogo from '/public/assets/images/message.svg';
import CompassLogo from '/public/assets/images/compass.svg';
import CartLogo from '/public/assets/images/cart.svg';
import ProfilePlaceholderImg from '/public/assets/svgs/profile.svg';
import SearchIcon from '/public/assets/images/search.svg';

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

function NavbarIcon(
  props: {
    src: string | StaticImport;
    alt: string;
    disabled?: boolean;
    round?: boolean;
  } & (
      | {
        onClick: () => void;
      }
      | { href: string | UrlObject }
    )
) {
  return (
    <div tw={'flex flex-none transform w-8'}>
      {!!(props as Record<string, any>).href ? (
        <Link href={(props as { href: string }).href} passHref>
          <Image
            src={props.src}
            alt={props.alt}
            layout="fill"
            css={[
              tw`scale-75 cursor-pointer `,
              props.disabled ? '' : tw`hover:scale-90 ease-in-out duration-200`,
              props.round ? tw`rounded-full` : '',
            ]}
          />
        </Link>
      ) : (
        <button onClick={(props as { onClick: () => void }).onClick}>
          <Image
            src={props.src}
            alt={props.alt}
            layout="fill"
            css={[
              tw`scale-75 cursor-pointer `,
              props.disabled ? '' : tw` ease-in-out duration-200`,
              props.round ? tw`rounded-full` : '',
            ]}
          />
        </button>
      )}
    </div>
  );
}

const Header = (props: { isBuyer?: boolean | undefined }) => {
  const isMobile = useMediaQuery({ query: `(max-width: 640px)` });
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
  return (
    <div tw="sticky top-0 z-50 w-full border-b border-[#D8D8D8] bg-white">
      {showLoginModal && <LoginForm onClose={() => setShowLoginModal(false)} />}
      {showUploadWorkPopup && (
        <UploadWork onClose={() => setShowUploadWorkPopup(false)} />
      )}
      <div tw="px-4 sm:px-[60px] py-[18px] sm:py-[10px] h-[68px] flex items-center">
        <Link href="/" passHref>
          <Image src={Logo} tw="cursor-pointer" width="92px" height="32px" alt="Pkazo" />
        </Link>
        {!isMobile &&
          <input
            type="text"
            placeholder="Search for anything"
            tw="flex-grow ml-5 mr-10 px-6 h-11 bg-gray-100 border border-[#A3A3A3] focus:border-[#838383] outline-none rounded-full w-auto"
          />
        }

        <div tw={'flex-none w-36'}>
          <div tw="flex flex-auto flex-row-reverse w-36 justify-start h-8 gap-3">
            <NavbarIcon href="/" src={CartLogo} alt="Cart Logo" />
            {/*{((props.isBuyer === undefined || !props.isBuyer) && (*/}
            <>
              <div tw={'md:hidden flex flex-none transform w-8'}>
                <button onClick={() => setShowSearch((s) => !s)}>
                  <Image
                    src={SearchIcon}
                    alt={'Search Icon'}
                    layout="fill"
                    tw={'scale-75 cursor-pointer'}
                  />
                </button>
              </div>
              <NavbarIcon
                onClick={() => setShowChooseWorkDropdown((s) => !s)}
                src={PlusLogo}
                alt="Plus Logo"
              />
              <div>
                {showChooseWorkDropdown && (
                  <div
                    tw="origin-top-right absolute right-16 top-10 mt-2 w-24 rounded-md py-1 bg-white focus:outline-none shadow-lg"
                    aria-orientation="vertical"
                    tabIndex={-1}
                  >
                    <a
                      onClick={() => {
                        alert('Coming Soon');
                      }}
                      tw="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                      role="menuitem"
                      tabIndex={-1}
                      id="user-menu-item-2"
                    >
                      Post
                    </a>

                    <a
                      tw="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                      onClick={() => setShowUploadWorkPopup((s) => !s)}
                    >
                      Work
                    </a>
                  </div>
                )}
              </div>
            </>
            {!user && (
              <Link href={'/onboarding'}>
                <input
                  type="button"
                  value="Create on Pkazo"
                  tw="h-9 relative -top-0.5 text-white bg-theme-red rounded-full px-4 py-1 cursor-pointer hover:bg-[#E24E4D]"
                />
              </Link>
            )}
            {/*)) || (*/}
            {/*  <input*/}
            {/*    type="button"*/}
            {/*    value="Create on Pkazo"*/}
            {/*    tw="h-9 relative -top-0.5 text-white bg-theme-red rounded-full px-4 py-1 cursor-pointer hover:bg-[#be4040]"*/}
            {/*  />*/}
            {/*)}*/}
            {!user ? (
              <button
                tw="h-9 relative -top-0.5 text-[#3C3C3C] text-[14px] font-semibold px-4 px-4 py-1 cursor-pointer w-48"
                onClick={() => setShowLoginModal(true)}
              >
                Sign in
              </button>
            ) : (
              <>
                <NavbarIcon
                  onClick={() => setShowProfileDropdown((s) => !s)}
                  src={pfp || ProfilePlaceholderImg}
                  alt="Profile Picture"
                  round
                />
                <div>
                  {showProfileDropdown && (
                    <div
                      tw="origin-top-right absolute right-20 top-10 mt-2 w-48 rounded-md py-1 bg-white focus:outline-none shadow-lg"
                      aria-orientation="vertical"
                      tabIndex={-1}
                    >
                      <Link href={'/' + username} passHref>
                        <a tw="block px-4 py-2 text-sm text-gray-700">
                          Profile
                        </a>
                      </Link>
                      {/*<Link href={'/' + username} passHref>*/}
                      {/*  <a tw="block px-4 py-2 text-sm text-gray-700">*/}
                      {/*    Portfolios*/}
                      {/*  </a>*/}
                      {/*</Link>*/}
                      <Link href={'/account/edit'} passHref>
                        <a tw="block px-4 py-2 text-sm text-gray-700">
                          Settings
                        </a>
                      </Link>
                      <a
                        onClick={() => signOut()}
                        tw="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
                        role="menuitem"
                        tabIndex={-1}
                        id="user-menu-item-2"
                      >
                        Log out
                      </a>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {
        showSearch && (
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
        )
      }
    </div >
  );
};

export default Header;
