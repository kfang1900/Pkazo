import tw, { css } from 'twin.macro';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import buttons from '../../styles/Button';
import ConfirmUnfollowModal from '../profile/ConfirmUnfollow';
import PostImage from './PostImage';

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
  onClose: () => void;
}
function PostDetails(props: Props) {
  const [comments, setComments] = useState<
    { user: string; time: string; comment: string; imgSrc: string }[]
  >(props.post.comments);
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
          user: 'lowly servant alice yu',
          time: 'now',
          comment: comment,
          imgSrc: '/store_assets/img/user.png',
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
              tw="h-7 bg-[#C4C4C4] hover:bg-[#B9B9B9] text-white mt-5 px-5 font-normal text-[12px] mr-5"
            >
              {tag}
            </button>
          </Link>
        ))}
      </div>
    );
  };
  const completedDesc = () => {
    return (
      <div tw="border border-grey-D8 hover:border-gray-400 mt-5 mb-5 w-full rounded-[5px] py-5 px-6">
        <div tw="flex flex-col">
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
        <p tw="text-sm font-open-sans text-black mt-[25px]">
          The girl emerges from the vessel of the mind, entwined in her own
          noodle-like hair. A forest of mushrooms casts a blanket of prismatic
          gradients.
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
        <div tw="border border-grey-D8 mt-5 w-full rounded-[5px] py-4 px-6">
          <div tw="flex flex-col">
            <div tw="flex items-center justify-between">
              <div tw="flex flex-col">
                <h3 tw="text-lg font-semibold font-open-sans">Jammer</h3>
                <p tw="text-sm font-semibold font-open-sans text-grey-8B my-[2px]">
                  Acrylic on Canvas
                </p>
                <p tw="text-sm font-semibold font-open-sans text-grey-8B">
                  Releases in May
                </p>
              </div>
              <div tw="text-sm font-semibold text-grey-8B">In Progress</div>
            </div>
          </div>
        </div>
        {postTags(['surrealism', 'pastel', 'rollerblades'])}
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
        {postTags(['surrealism', 'pastel', 'doggo'])}
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
      <div tw="flex h-[85%]">
        <div tw="flex bg-white rounded-lg z-20 p-[39px]">
          <PostImage imgs={props.post.imgs} layout="h" />
          <div tw="w-[560px] flex flex-col pl-[30px]">
            <div tw="flex items-center justify-between">
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
                  tw="ml-[10px] w-[40px] h-[40px] px-0 border-0"
                >
                  •••
                </button>
              </div>
            </div>
            {props.post.type === 'complete' && completedDesc()}
            {props.post.type === 'wip' && wipDesc()}
            {props.post.type === 'social' && socialDesc()}
            <div tw="h-full overflow-y-auto">
              {comments.map((comment, index) => (
                <div key={index} tw="flex mb-[24px]">
                  <div tw="w-[36px] h-full overflow-hidden rounded-full flex items-center">
                    <Image
                      src={comment.imgSrc}
                      alt="profile_image"
                      width="36px"
                      height="36px"
                      objectFit="cover"
                    />
                  </div>
                  <div tw="ml-[12px]">
                    <div tw="flex">
                      <div tw="text-[12px] leading-[18px] font-bold text-black">
                        {comment.user}
                      </div>
                      <div tw="text-[12px] leading-[18px] text-[#7F838B] ml-[12px]">
                        {comment.time}
                      </div>
                    </div>
                    <div tw="text-[12px] leading-[18px] text-black">
                      {comment.comment}
                    </div>
                  </div>
                </div>
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
                tw="w-[48px] h-[40px] absolute top-[0px] right-[0px] z-10"
                onClick={() => {
                  onPost(curComment);
                  setCurComment('');
                }}
              >
                <img
                  src={
                    '../../post_assets/img/' +
                    (curComment.trim() === ''
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
          tw="ml-5 w-7 h-7 border-0 outline-none p-1"
        >
          <img
            src="/assets/svgs/close.svg"
            tw="w-full h-full"
            alt="close button"
          />
        </button>
      </div>
    </div>
  );
}

export default PostDetails;
