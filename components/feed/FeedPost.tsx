import tw, { css } from 'twin.macro';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import buttons from '../../styles/Button';
import ConfirmUnfollowModal from '../profile/ConfirmUnfollow';
import PostImage from '../popups/PostImage';
import PostDetails, { formatPrice } from '../popups/PostDetails';

import { Post, CompleteInfo, WipInfo, SocialInfo } from '../../obj/Post';

interface Props {
  post: Post;
}
function FeedPost(props: Props) {
  const [liked, setLiked] = useState(false);
  const [popup, setPopup] = useState(false);
  const workDesc = () => {
    const postInfo = props.post.info as CompleteInfo;
    return (
      <>
        <Link href="/individual_work" passHref>
          <div tw="border border-grey-D8 hover:border-[#C0C0C0] mt-5 mb-2 w-full rounded-[5px] py-5 px-6 cursor-pointer">
            <div tw="flex items-center justify-between">
              <div tw="flex flex-col">
                <h3 tw="text-lg font-semibold font-open-sans">
                  {props.post.title}
                </h3>
                <p tw="text-sm font-semibold font-open-sans text-grey-8B">
                  {postInfo.media}
                </p>
              </div>
              <div tw="flex items-center space-x-3">
                <span tw="text-2xl font-semibold to-black-light">
                  {formatPrice(postInfo.price)}
                </span>
                <img
                  src="/store_assets/img/chevron-right.svg"
                  alt="chevron-right"
                  tw="h-[15px]"
                />
              </div>
            </div>
          </div>
        </Link>
        <p tw="text-sm font-open-sans text-black mb-5">{props.post.desc}</p>
      </>
    );
  };
  const postDesc = () => {
    return (
      <div tw="mt-5 mb-5">
        <div tw="text-2xl font-bold to-black-light">{props.post.title}</div>
        <div tw="text-[14px] to-black-light mt-3">{props.post.desc}</div>
      </div>
    );
  };
  return (
    <div tw="w-full border border-[#D8D8D8] rounded-[6px] bg-white">
      {popup && (
        <PostDetails post={props.post} onClose={() => setPopup(false)} />
      )}
      <div tw="flex items-center justify-between my-4 mx-5">
        <Link href={'/' + props.post.user.username} passHref>
          <div tw="flex items-center space-x-3.5 cursor-pointer">
            <div tw="w-[64px] h-[64px] overflow-hidden rounded-full flex items-center">
              <Image
                src={props.post.user.pfp}
                alt="profile_image"
                width="64px"
                height="64px"
                objectFit="cover"
              />
            </div>
            <div tw="flex flex-col justify-center -space-y-1">
              <h5 tw="text-lg font-bold text-black-light mb-1">
                {props.post.user.name}
              </h5>
              <p tw="text-xs font-semibold text-grey-8B">
                {props.post.user.location}
              </p>
            </div>
          </div>
        </Link>
        <button
          css={buttons.white}
          tw="border-none outline-none bg-[#F4F4F4] hover:bg-[#EBEBEB] ml-[10px] w-[40px] h-[40px] px-0 text-[#8E8E93] font-bold text-[13px] text-center"
        >
          •&#8201;•&#8201;•
        </button>
      </div>
      <PostImage imgs={props.post.imgs} layout="w" />
      <div tw="mx-5 mb-5">
        {props.post.info.type === 'complete' ? workDesc() : postDesc()}
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
