import { useState } from 'react';
import Image from 'next/image';
import tw from 'twin.macro';

import buttons from '../../styles/Button';
import ConfirmUnfollowModal from './ConfirmUnfollow';

import { Artist } from '../../obj/Artist';

const numFormatter = (x: number) => {
  if (x > 999 && x < 1000000) {
    return (x / 1000).toFixed(1).replace(/\.?0+$/, '') + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (x > 1000000) {
    return (x / 1000000).toFixed(1).replace(/\.?0+$/, '') + 'M'; // convert to M for number from > 1 million
  } else return x; // if value < 1000, nothing to do
};

interface Props {
  user: Artist;
}
const ArtistProfile = (props: Props) => {
  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(false);
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
                src={props.user.pfp}
                alt="profile_image"
                width="200px"
                height="200px"
                objectFit="cover"
              />
            </div>
            <div>
              <div tw="flex items-center justify-between">
                <div tw="flex items-center">
                  <h1 tw="text-3xl font-semibold text-black mr-[40px]">
                    {props.user.name}
                  </h1>
                  {!isFollowing && (
                    <button onClick={follwButtonHandler} css={buttons.red}>
                      Follow
                    </button>
                  )}
                  {isFollowing && (
                    <>
                      <button
                        onClick={() => 0}
                        css={[buttons.white, tw`font-semibold`]}
                      >
                        Message
                      </button>
                      <button
                        onClick={follwButtonHandler}
                        css={[buttons.white, tw`px-0 w-[40px] ml-7`]}
                      >
                        <img src="/assets/svgs/following.svg" tw="mx-auto" />
                      </button>
                    </>
                  )}
                </div>
                <button
                  css={buttons.white}
                  tw="border-none outline-none bg-[#F4F4F4] hover:bg-[#EBEBEB] mr-[-10%] w-[40px] h-[40px] px-0 text-[#8E8E93] font-bold text-[13px] text-center"
                >
                  •&#8201;•&#8201;•
                </button>
              </div>
              <p tw="text-gray-600 text-lg my-2">
                {props.user.location}
                &nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;{props.user.discipline}
              </p>
              <div>
                <p tw="text-black">{props.user.bio}</p>
              </div>
              <div tw="grid grid-cols-[repeat(4,100px)] gap-[30px] ml-[-20px] mt-[35px]">
                <div tw="px-5 text-center mx-auto">
                  <p tw="text-xl text-black font-semibold">
                    {numFormatter(125)}
                  </p>
                  <p tw="text-lg text-gray-600">Posts</p>
                </div>
                <div tw="px-5 text-center mx-auto">
                  <p tw="text-xl text-black font-semibold">
                    {numFormatter(20)}
                  </p>
                  <p tw="text-lg text-gray-600">Works</p>
                </div>
                <div tw="px-5 text-center mx-auto">
                  <p tw="text-xl text-black font-semibold">
                    {numFormatter(isFollowing ? 114 : 113)}
                  </p>
                  <p tw="text-lg text-gray-600">Followers</p>
                </div>
                <div tw="px-5 text-center mx-auto">
                  <p tw="text-xl text-black font-semibold">{numFormatter(3)}</p>
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
