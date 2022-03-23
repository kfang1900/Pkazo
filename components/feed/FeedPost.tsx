import tw, { css } from 'twin.macro';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import buttons from '../../styles/Button';
import ConfirmUnfollowModal from '../profile/ConfirmUnfollow';
import PostImage from '../post_popup/PostImage';
import PostDetails from '../post_popup/PostDetails';

interface Props {
  post: {
    imgs: Array<string>;
    type: string;
    comments: Array<{
      user: string;
      time: string;
      comment: string;
      imgSrc: string;
    }>;
  };
}
function FeedPost(props: Props) {
  const [liked, setLiked] = useState(false);
  const [popup, setPopup] = useState(false);
  const completedDesc = () => {
    return (
      <>
        <div tw="border border-grey-D8 hover:border-gray-400 mt-5 mb-2 w-full rounded-[5px] py-5 px-6 hover:cursor-pointer">
          <div tw="flex items-center justify-between">
            <div tw="flex flex-col">
              <h3 tw="text-lg font-semibold font-open-sans">Jammer</h3>
              <p tw="text-sm font-semibold font-open-sans text-grey-8B">
                Acrylic on Canvas
              </p>
            </div>
            <div tw="flex items-center space-x-3">
              <span tw="text-2xl font-semibold to-black-light">$150</span>
              <img
                src="/store_assets/img/chevron-right.svg"
                alt="chevron-right"
                tw="h-[15px]"
              />
            </div>
          </div>
        </div>
        <p tw="text-sm font-open-sans text-black mb-5">
          The girl emerges from the vessel of the mind, entwined in her own
          noodle-like hair. A forest of mushrooms casts a blanket of prismatic
          gradients.
        </p>
      </>
    );
  };
  const wipDesc = () => {
    return (
      <div tw="mt-5 mb-5">
        <div tw="text-2xl font-bold to-black-light">Acrylic is Hard!</div>
        <div tw="text-[14px] to-black-light mt-3">
          This painting is finally coming together after I’ve been putting it
          off for quite a while. Acrylic is a tough medium that requires a lot
          of over-painting, something I’m not accustomed to as an oil painter.
        </div>
      </div>
    );
  };
  const socialDesc = () => {
    return (
      <div tw="mt-5 mb-5">
        <div tw="text-2xl font-bold to-black-light">My dog Miso chilling</div>
        <div tw="text-[14px] to-black-light mt-3">
          This painting is finally coming together after I’ve been putting it
          off for quite a while. Acrylic is a tough medium that requires a lot
          of over-painting, something I’m not accustomed to as an oil painter.
        </div>
      </div>
    );
  };
  return (
    <div tw="w-full border border-[#D8D8D8] rounded-[6px] bg-white">
      {popup && (
        <PostDetails post={props.post} onClose={() => setPopup(false)} />
      )}
      <div tw="flex items-center justify-between my-4 mx-5">
        <div tw="flex items-center space-x-3.5">
          <img
            src="store_assets/img/user.png"
            alt="profile"
            tw="w-[64px] h-[64px]"
          />
          <div tw="flex flex-col justify-center -space-y-1">
            <h5 tw="text-lg font-bold text-black-light">James Jean</h5>
            <p tw="text-xs font-semibold text-grey-8B">Los Angeles, CA</p>
          </div>
        </div>
        <button
          css={buttons.white}
          tw="ml-[10px] w-[40px] h-[40px] px-0 border-0 text-[#575757]"
        >
          •••
        </button>
      </div>
      <PostImage imgs={props.post.imgs} layout="w" />
      <div tw="mx-5 mb-5">
        {props.post.type === 'complete' && completedDesc()}
        {props.post.type === 'wip' && wipDesc()}
        {props.post.type === 'social' && socialDesc()}
        <div tw="flex justify-start items-center w-full">
          <button onClick={() => setLiked(!liked)} tw="flex">
            <Image
              src={'/assets/svgs/' + (liked ? 'red_like.svg' : 'like.svg')}
              width="22px"
              height="20px"
              alt="like"
            />
            <div
              css={[
                tw`ml-3 mt-[-2px] font-semibold`,
                liked ? tw`text-soft-red` : tw`text-[#5A5A5A]`,
              ]}
            >
              {liked ? 12 : 11}
            </div>
          </button>
          <button onClick={() => setPopup(true)} tw="flex ml-6">
            <Image
              src="/assets/svgs/comment.svg"
              width="22px"
              height="20px"
              alt="comment"
            />
            <div tw="ml-3 mt-[-2px] font-semibold text-[#5A5A5A]">
              {props.post.comments.length}
            </div>
          </button>
          <button tw="ml-6">
            <Image
              src="/assets/svgs/share.svg"
              width="22px"
              height="20px"
              alt="share"
            />
          </button>
          <button tw="ml-auto">
            <Image
              src="/assets/svgs/save.svg"
              width="22px"
              height="20px"
              alt="save"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedPost;
