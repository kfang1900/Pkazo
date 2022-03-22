import tw, { css } from 'twin.macro';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import dots from '/public/assets/svgs/dots.svg';
import arrowRight from '/public/assets/svgs/arrow_right.svg';
import like from '/public/assets/svgs/like.svg';
import share from '/public/assets/svgs/share.svg';
import save from '/public/assets/svgs/save.svg';

import buttons from '../../styles/Button';
import ConfirmUnfollowModal from '../profile/ConfirmUnfollow';

const followingStyle = css`
  ${tw`hover:bg-red-500 hover:bg-opacity-40 hover:text-red-600`}
`;

function PostDetails() {
  const [comments, setComments] = useState<string[]>(['6138', '505', '508']);
  const [curComment, setCurComment] = useState('');
  const [following, setFollowing] = useState(false);
  const [isShowUnfollowConfirmModal, setIsShowUnfollwConfirmModal] =
    useState(false);
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
      return [...prev, comment];
    });
  };
  return (
    <>
      <ConfirmUnfollowModal
        showModal={isShowUnfollowConfirmModal}
        setShowModal={setIsShowUnfollwConfirmModal}
        handleUnfollow={() => {
          setFollowing(false);
          setIsShowUnfollwConfirmModal(false);
        }}
      />
      <div tw="grid grid-cols-[minmax(0,1fr) 560px]">
        <div tw="flex flex-shrink-0">
          <img
            css={[
              tw`h-auto w-auto max-h-[100%] max-w-[100%] block object-scale-down`,
            ]}
            src="/assets/images/jammer.jpg"
            alt="post-image-1"
          />
        </div>
        <div tw="flex flex-col pl-[30px]">
          <div tw="flex items-center justify-between">
            <div tw="flex items-center space-x-3.5">
              <img
                src="store_assets/img/user.png"
                alt="profile"
                tw="w-[64px] h-[64px]"
              />
              <div tw="flex flex-col justify-center -space-y-1">
                <h5 tw="text-lg font-bold text-black-light">
                  mister boss kevin fang
                </h5>
                <p tw="text-xs font-semibold text-grey-8B">McMinnville, OR</p>
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
          <div tw="border border-grey-D8 hover:border-gray-400 mt-5 mb-7 w-full rounded-10 py-5 px-6">
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
              noodle-like hair. A forest of mushrooms casts a blanket of
              prismatic gradients.
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
          <div tw="h-full overflow-y-auto">
            {comments.map((comment, index) => (
              <div key={index} tw="flex my-[24px]">
                <div tw="w-[36px] h-full overflow-hidden rounded-full flex items-center">
                  <Image
                    src="/store_assets/img/user.png"
                    alt="profile_image"
                    width="36px"
                    height="36px"
                    objectFit="cover"
                  />
                </div>
                <div tw="ml-[12px]">
                  <div tw="flex">
                    <div tw="text-[12px] leading-[18px] font-bold text-black">
                      lowly servant alice yu
                    </div>
                    <div tw="text-[12px] leading-[18px] text-[#7F838B] ml-[12px]">
                      2h
                    </div>
                  </div>
                  <div tw="text-[12px] leading-[18px] text-black">
                    {comment}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <hr tw="border-grey-D8 mt-5 mb-4" />
          <div tw="flex items-center space-x-6">
            <button>
              <Image src={like} alt="like" />
            </button>
            <button>
              <Image src={save} alt="like" />
            </button>
            <button>
              <Image src={share} alt="like" />
            </button>
          </div>
          <p tw="text-sm font-open-sans pt-3.5">
            Liked by{' '}
            <a tw="font-semibold" href="#">
              Amanda Evans
            </a>{' '}
            and{' '}
            <a tw="font-semibold" href="#">
              10 others
            </a>
          </p>
          <div tw="flex mt-[15px] w-full relative">
            <input
              type="text"
              placeholder="Add a comment..."
              tw="pl-4 pr-12 py-2 border border-[#D8D8D8] outline-none focus:border-[#B0B0B0] rounded-[5px] w-full"
              value={curComment}
              onChange={(event) => setCurComment(event.target.value)}
            />
            <button
              tw="w-[18px] h-[18px] absolute top-[12px] right-[18px] z-10"
              onClick={() => {
                onPost(curComment);
                setCurComment('');
              }}
            >
              <img
                src={
                  '../../post_assets/img/' +
                  (curComment.trim() === '' ? 'grey_send.svg' : 'blue_send.svg')
                }
                tw="w-full h-full"
              />
            </button>
            {/* todo: submit button here */}
          </div>
        </div>
      </div>
    </>
  );
}

export default PostDetails;
