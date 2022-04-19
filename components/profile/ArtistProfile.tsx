import { useState } from 'react';
import Image from 'next/image';
import tw from 'twin.macro';

import buttons from 'styles/Button';
import ConfirmUnfollowModal from './ConfirmUnfollow';
import {QueryDocumentSnapshot, DocumentData} from "firebase/firestore";
import {loadStorageImage} from 'utils/FirebaseFunctions'

import { Artist } from '../../obj/Artist';

const numFormatter = (x: number) => {
  if (x > 999 && x < 1000000) {
    return (x / 1000).toFixed(1).replace(/\.?0+$/, '') + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (x >= 1000000) {
    return (x / 1000000).toFixed(1).replace(/\.?0+$/, '') + 'M'; // convert to M for number from > 1 million
  } else return x; // if value < 1000, nothing to do
};



const ArtistProfile = (artistData:QueryDocumentSnapshot<DocumentData>[]) => {
  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(false);
  const [picture, setPicture] = useState("/store_assets/img/user.png")
  const [isShowUnfollowConfirmModal, setIsShowUnfollwConfirmModal] =
    useState(false);

  const follwButtonHandler = () => {
    setIsFollowing((prev) => {
      if (prev) {
        setIsShowUnfollwConfirmModal(true);
        return true;
      } else {
        return true;
      }
    });
  };

  const unFollowHandler = () => {
    setIsFollowing(false);
    setIsShowUnfollwConfirmModal(false);
  };

  const artist = artistData[0].data()
  const prepData =async () => {
    const profile_image = await loadStorageImage(artist["ProfilePicture"])
    setPicture(profile_image)
  } 
  prepData()
  return (
    <>
      <ConfirmUnfollowModal
        showModal={isShowUnfollowConfirmModal}
        setShowModal={setIsShowUnfollwConfirmModal}
        handleUnfollow={unFollowHandler}
      />
      <section tw="mt-[48px] mb-[40px]">
        <div className="container">
          <div tw="grid grid-cols-[200px auto] gap-[85px] mx-[10%]">
            <div tw="w-[200px] h-[200px] my-auto overflow-hidden rounded-full flex items-center">
              <Image
                src={picture}
                alt="profile_image"
                width="200px"
                height="200px"
                objectFit="cover"
              />
            </div>
            <div>
              <div tw="flex items-center justify-start">
                <h1 tw="text-3xl font-semibold text-black mr-[40px]">
                  {artist["Name"]}
                </h1>
                <button
                  onClick={follwButtonHandler}
                  css={isFollowing ? buttons.white : buttons.red}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button
                  css={buttons.white}
                  tw="border-none outline-none bg-[#F4F4F4] hover:bg-[#EBEBEB] mr-[-10%] w-[40px] h-[40px] px-0 text-[#8E8E93] font-bold text-[13px] text-center"
                >
                  •&#8201;•&#8201;•
                </button>
              </div>
              <p tw="text-gray-600 text-lg mt-1">{artist["Location"]}</p>
              <div tw="mt-[15px]">
                <p tw="text-black">
                  {artist["Bio"]
                    /*
                  In his large-scale paintings, James Jean depicts detailed
                  cosmological worlds filled with allegorical and contemporary
                  imagery. He incorporates elements of traditional Chinese and
                  Japanese scroll paintings, Japanese woodblock prints,
                  Renaissance portraiture, comic books, and anime into these
                  complex compositions. As he experiments with such different
                  styles and art historical genres, Jean diminishes the boundary
                  between new and old, and between Eastern and Western
                  artmaking.*/
                  }   
                </p>
              </div>
              <div tw="grid grid-cols-[repeat(4,100px)] gap-[30px] ml-[-20px] mt-[35px]">
                <div tw="px-5 text-center mx-auto">
                  <p tw="text-xl text-black font-semibold">
                    {numFormatter(artist["PostNumber"])}
                  </p>
                  <p tw="text-lg text-gray-600">Posts</p>
                </div>
                <div tw="px-5 text-center mx-auto">
                  <p tw="text-xl text-black font-semibold">
                    {numFormatter(artist["WorkNumber"])}
                  </p>
                  <p tw="text-lg text-gray-600">Works</p>
                </div>
                <div tw="px-5 text-center mx-auto">
                  <p tw="text-xl text-black font-semibold">
                    {numFormatter(artist["Followers"])}
                  </p>
                  <p tw="text-lg text-gray-600">Followers</p>
                </div>
                <div tw="px-5 text-center mx-auto">
                  <p tw="text-xl text-black font-semibold">{numFormatter(artist["Following"])}</p>
                  <p tw="text-lg text-gray-600">Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtistProfile;
