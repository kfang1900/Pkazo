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

import { UrlObject } from 'url';
import useAuth from '../utils/useAuth';
import tw from 'twin.macro';
import React, { useEffect, useState } from 'react';
import { getApp } from 'firebase/app';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { ArtistData } from '../types/firebaseTypes';
import LoginForm from './popups/LoginForm';
import { useRouter } from 'next/router';
import {
  loadStorageImage,
  loadStorageImages,
} from '../helpers/FirebaseFunctions';
import UploadWork from './uploading/UploadWork';

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
            tw=""
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
            tw=""
            css={[
              tw`scale-75 cursor-pointer `,
              props.disabled ? '' : tw`hover:scale-90 ease-in-out duration-200`,
              props.round ? tw`rounded-full` : '',
            ]}
          />
        </button>
      )}
    </div>
  );
}

const Header = (props: { isBuyer?: boolean | undefined }) => {
  const { user, signOut } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pfp, setPfp] = useState('');
  const [username, setUsername] = useState('');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showChooseWorkDropdown, setShowChooseWorkDropdown] = useState(false);
  const [showUploadWorkPopup, setShowUploadWorkPopup] = useState(false);
  const router = useRouter();
  useEffect(() => {
    console.log('user', user);
    if (!user) {
      return;
    }
    (async () => {
      if (!user) return;

      const app = getApp();
      const db = getFirestore(app);

      const artistsRef = collection(db, 'Artists');
      const q = query(artistsRef, where('AssociatedUser', '==', user.uid));

      const ref = await getDocs(q);
      if (ref.empty) {
        router.push('/onboarding');
        return;
      }
      ref.forEach((snapshot) => {
        (async () => {
          const data = snapshot.data();
          setPfp(await loadStorageImage(data.ProfilePicture)); // assumes that there will only be one result
          setUsername(data.username);
          console.log(data.username, 'ioasdfij');
        })();
      });
    })();
  }, [user]);
  return (
    <div tw="sticky top-0 z-50 w-full border-b border-[#D8D8D8] bg-white">
      {showLoginModal && <LoginForm onClose={() => setShowLoginModal(false)} />}
      {showUploadWorkPopup && (
        <UploadWork onClose={() => setShowUploadWorkPopup(false)} />
      )}
      <div tw="px-16 flex flex-row items-center justify-between py-2">
        <div tw="flex flex-auto items-center gap-10 w-36">
          <div tw="flex-none cursor-pointer -mr-5">
            <Link href="/" passHref>
              <Image src={Logo} tw="w-20" alt="Pkazo" />
            </Link>
          </div>

          <div>
            <input
              type="text"
              placeholder="Search"
              tw="px-4 py-1 bg-gray-100 outline-none rounded-full w-48"
            />
          </div>
        </div>

        <div tw="flex flex-auto flex-row justify-center h-8 gap-10">
          <NavbarIcon href="/feed" src={HouseLogo} alt="House Logo" />
          <NavbarIcon href="#" src={ShopLogo} alt="Shop Logo" disabled />
          <NavbarIcon href="#" src={CompassLogo} alt="Compass Logo" disabled />
          <NavbarIcon href="#" src={GroupsLogo} alt="Groups Logo" disabled />
          <NavbarIcon href="#" src={MessageLogo} alt="Message Logo" disabled />
        </div>

        <div tw="flex flex-auto flex-row-reverse w-36 justify-start h-8 gap-3">
          <NavbarIcon href="/" src={CartLogo} alt="Cart Logo" />
          {/*{((props.isBuyer === undefined || !props.isBuyer) && (*/}
          <>
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
              tw="h-9 relative -top-0.5 text-[#3C3C3C] text-[14px] font-semibold px-4 px-4 py-1 cursor-pointer"
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
                      <a tw="block px-4 py-2 text-sm text-gray-700">Profile</a>
                    </Link>
                    <Link href={'/' + username} passHref>
                      <a tw="block px-4 py-2 text-sm text-gray-700">
                        Portfolios
                      </a>
                    </Link>
                    <Link href={'/account/edit'} passHref>
                      <a tw="block px-4 py-2 text-sm text-gray-700">Settings</a>
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
  );
};

export default Header;
