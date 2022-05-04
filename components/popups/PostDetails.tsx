import tw, { css } from 'twin.macro';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import buttons from '../../styles/Button';
import ConfirmUnfollowModal from '../profile/ConfirmUnfollow';
import PostImage from './PostImage';
import ShowComment from './ShowComment';
import { Post, CompleteInfo, WipInfo, SocialInfo } from '../../obj/Post';
import { Comment } from '../../obj/Comment';

export interface PostDetailsProps {
  post: Post;
  onClose: () => void;
}
export const formatPrice = (price: number) => {
  return '$' + price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
};
function PostDetails(props: PostDetailsProps) {
  const [comments, setComments] = useState(props.post.comments);
  const [commentHover, setCommentHover] = useState(false);
  const [curComment, setCurComment] = useState('');
  const [following, setFollowing] = useState(false);
  const [isShowUnfollowConfirmModal, setIsShowUnfollwConfirmModal] =
    useState(false);
  const [liked, setLiked] = useState(false);
  const onFollow = () => {
    setFollowing((prev) => {
      if (prev) {
        setIsShowUnfollwConfirmModal(true);
        return true;
      } else {
        return true;
      }
    });
  };
  const onPost = (comment: string) => {
    setComments((prev) => {
      return [
        ...prev,
        {
          user: { Name: 'Kevin Fang', ProfilePicture: '/assets/images/kevin_fang.jpg' },
          time: Date.now(),
          comment: comment,
        },
      ];
    });
  };
  const postTags = (tags: Array<string>) => {
    return (
      <div tw="flex">
        {tags.map((tag, index) => (
          <Link href="#" key={index} passHref={true}>
            <button
              css={buttons.red}
              tw="h-7 bg-[#A3A3A3] hover:bg-[#AAAAAA] text-white mt-5 px-5 font-normal text-[12px] mr-5"
            >
              {tag}
            </button>
          </Link>
        ))}
      </div>
    );
  };
  const completedDesc = () => {
    const postInfo = props.post.info as CompleteInfo;
    return (
      <Link href="/individual_work" passHref>
        <div tw="border border-grey-D8 hover:border-[#C0C0C0] mt-5 mb-5 w-full rounded-[5px] py-5 px-6 cursor-pointer">
          <div tw="flex flex-col">
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
          <p tw="text-sm font-open-sans text-black mt-[25px]">
            {props.post.desc}
          </p>
          <div tw="flex justify-evenly mt-[30px]">
            <button
              css={buttons.white}
              tw="w-[40%] text-[#707070] border-[#707070] px-0"
            >
              Buy Now
            </button>
            <button
              css={buttons.red}
              tw="w-[40%] bg-[#707070] hover:bg-[#656565] px-0"
            >
              Add to cart
            </button>
          </div>
        </div>
      </Link>
    );
  };
  const wipDesc = () => {
    const postInfo = props.post.info as WipInfo;
    return (
      <div tw="mt-5 mb-5">
        <div tw="text-2xl font-bold to-black-light">{props.post.title}</div>
        <div tw="text-[14px] to-black-light mt-3">{props.post.desc}</div>
        <div tw="border border-grey-D8 mt-5 w-full rounded-[5px] py-4 px-6">
          <div tw="flex flex-col">
            <div tw="flex items-center justify-between">
              <div tw="flex flex-col">
                <h3 tw="text-lg font-semibold font-open-sans">
                  {postInfo.workTitle}
                </h3>
                <p tw="text-sm font-semibold font-open-sans text-grey-8B my-[2px]">
                  {postInfo.media}
                </p>
                <p tw="text-sm font-semibold font-open-sans text-grey-8B">
                  Releases in {postInfo.releaseDate}
                </p>
              </div>
              <div tw="text-sm font-semibold text-grey-8B">In Progress</div>
            </div>
          </div>
        </div>
        {postTags(postInfo.tags)}
      </div>
    );
  };
  const socialDesc = () => {
    const postInfo = props.post.info as SocialInfo;
    return (
      <div tw="mt-5 mb-5">
        <div tw="text-2xl font-bold to-black-light">{props.post.title}</div>
        <div tw="text-[14px] to-black-light mt-3">{props.post.desc}</div>
        {postTags(postInfo.tags)}
      </div>
    );
  };
  return (
    <div tw="fixed top-0 left-0 w-full h-full z-50 bg-black/40 flex items-center justify-center">
      <ConfirmUnfollowModal
        showModal={isShowUnfollowConfirmModal}
        setShowModal={setIsShowUnfollwConfirmModal}
        handleUnfollow={() => {
          setFollowing(false);
          setIsShowUnfollwConfirmModal(false);
        }}
      />
      <div tw="flex h-[90%]">
        <div tw="flex bg-white rounded-lg z-20 p-[39px]">
          <PostImage imgs={props.post.imgs} layout="h" />
          <div tw="w-[560px] flex flex-col pl-[30px]">
            <div tw="flex items-center justify-between">
              <Link href={'/' + props.post.user.username} passHref>
                <div tw="flex items-center space-x-3.5 cursor-pointer">
                  <img
                    src="/assets/images/user.png"
                    alt="profile"
                    tw="w-[64px] h-[64px]"
                  />
                  <div tw="flex flex-col justify-center -space-y-1">
                    <h5 tw="text-lg font-bold text-black-light mb-1">
                      {props.post.user.Name}
                    </h5>
                    <p tw="text-xs font-semibold text-grey-8B">
                      {props.post.user.Location}
                    </p>
                  </div>
                </div>
              </Link>
              <div tw="flex items-center">
                <button
                  onClick={onFollow}
                  css={following ? buttons.white : buttons.red}
                  tw="px-6"
                >
                  {following ? 'Following' : 'Follow'}
                </button>
                <button
                  css={buttons.white}
                  tw="border-none outline-none bg-[#F4F4F4] hover:bg-[#EBEBEB] ml-[10px] w-[40px] h-[40px] px-0 text-[#8E8E93] font-bold text-[13px] text-center"
                >
                  •&#8201;•&#8201;•
                </button>
              </div>
            </div>
            {props.post.info.type === 'complete' && completedDesc()}
            {props.post.info.type === 'wip' && wipDesc()}
            {props.post.info.type === 'social' && socialDesc()}
            <div tw="h-full overflow-y-auto">
              {comments.map((comment, index) => (
                <ShowComment comment={comment} key={index} />
              ))}
            </div>
            <hr tw="border-grey-D8" />
            <div tw="text-sm font-open-sans py-3.5">
              Liked by{' '}
              <a tw="font-semibold" href="#">
                Amanda Evans
              </a>{' '}
              and{' '}
              <a tw="font-semibold" href="#">
                {10 + ~~liked} others
              </a>
            </div>
            <div tw="flex items-center space-x-6">
              <button onClick={() => setLiked(!liked)}>
                <Image
                  src={'/assets/svgs/' + (liked ? 'red_like.svg' : 'like.svg')}
                  width="22px"
                  height="20px"
                  alt="like"
                />
              </button>
              <button>
                <Image
                  src="/assets/svgs/save.svg"
                  width="22px"
                  height="20px"
                  alt="save"
                />
              </button>
              <button>
                <Image
                  src="/assets/svgs/share.svg"
                  width="22px"
                  height="20px"
                  alt="share"
                />
              </button>
            </div>
            <div tw="flex mt-[15px] w-full relative">
              <input
                type="text"
                placeholder="Add a comment..."
                tw="pl-4 pr-12 py-2 border border-[#D8D8D8] outline-none focus:border-[#B0B0B0] rounded-[5px] w-full"
                value={curComment}
                onChange={(event) => setCurComment(event.target.value)}
                autoFocus
              />
              <button
                css={[
                  tw`w-[48px] h-[40px] absolute top-[0px] right-[0px] z-10`,
                  (curComment.trim() === '' || !commentHover) &&
                    tw`cursor-auto`,
                ]}
                onClick={() => {
                  if (curComment.trim() !== '') {
                    onPost(curComment);
                    setCurComment('');
                  }
                }}
                onMouseOver={() => setCommentHover(true)}
                onMouseOut={() => setCommentHover(false)}
              >
                <img
                  src={
                    '../../post_assets/img/' +
                    (curComment.trim() === '' || !commentHover
                      ? 'grey_send.svg'
                      : 'blue_send.svg')
                  }
                  tw="w-[18px] h-[18px] m-auto"
                />
              </button>
            </div>
          </div>
        </div>
        <button
          onClick={props.onClose}
          tw="ml-5 w-12 h-12 border-0 outline-none bg-none hover:bg-[rgba(255,255,255,0.08)] rounded-full"
        >
          <img
            src="/assets/svgs/close.svg"
            tw="w-5 h-5 m-auto"
            alt="close button"
          />
        </button>
      </div>
    </div>
  );
}

export default PostDetails;
