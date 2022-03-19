import tw, { css } from 'twin.macro';

import React, { useState } from 'react';
import Image from 'next/image';
import sliderImg from '/public/assets/images/slider-image-1.jpg';
import dots from '/public/assets/svgs/dots.svg';
import arrowRight from '/public/assets/svgs/arrow_right.svg';
import like from '/public/assets/svgs/like.svg';
import share from '/public/assets/svgs/share.svg';
import save from '/public/assets/svgs/save.svg';
import Img1 from '/public/assets/images/image-1.jpg';
import Img2 from '/public/assets/images/image-2.jpg';
import Img3 from '/public/assets/images/image-3.jpg';
import Img4 from '/public/assets/images/image-4.jpg';
import avatar from '/public/assets/images/profile-2.png';

const followingStyle = css`
  ${tw`hover:bg-red-500 hover:bg-opacity-40 hover:text-red-600`}
`;

function Store(props) {
  const [following, setFollowing] = useState(false);
  const [unfollow, setUnfollow] = useState(false);
  const onFollow = () => {
    setFollowing(true);
  };
  const onHover = () => {
    setUnfollow(true);
  };
  const onHoverLeave = () => {
    setUnfollow(false);
  };
  return (
    <>
      <div tw="flex flex-shrink-0">
        <Image
          css={[tw`lg:w-full lg:h-auto`, { 'aspect-ratio': '1 / 1' }]}
          src={sliderImg}
          alt="post-image-1"
        />
      </div>
      <div tw="flex flex-col">
        <div tw="flex items-center justify-between">
          <div tw="flex items-center space-x-3.5">
            <img
              tw="rounded-full border-2 border-white"
              src={avatar}
              alt="profile"
            />
            <div tw="flex flex-col justify-center -space-y-1">
              <h5 tw="text-lg font-bold text-black-light">Erin Hanson</h5>
              <p tw="text-xs font-semibold text-grey-8B">McMinnville, OR</p>
            </div>
          </div>
          <div tw="flex items-center space-x-5">
            <button
              onMouseEnter={onHover}
              onMouseLeave={onHoverLeave}
              onClick={onFollow}
              css={[
                tw`flex items-center justify-center space-x-3 border-1.5 font-semibold font-open-sans rounded-full text-sm px-8 py-1 border-black-light hover:bg-black-light hover:text-white text-black-light`,
                following && followingStyle,
              ]}
            >
              {following && !unfollow
                ? 'Following'
                : following && unfollow
                ? 'Unfollow'
                : 'Follow'}
            </button>
            <div tw="relative -mt-2.5">
              <button>
                <img src={dots} alt="" />
              </button>
            </div>
          </div>
        </div>
        <p tw="text-sm font-open-sans text-black">
          Left panel of a diptych oil painting of Paso Robles, the beautiful
          wine country of central California. This large painting spans 10 feet
          of wall space, creating quite an impact in a home or office.
        </p>
        <div tw="flex flex-col pt-3 lg:pt-9">
          <h4 tw="text-lg text-black font-open-sans">More from Erin Hanson</h4>
          <hr tw="border-grey-D8 mt-1.5 mb-4" />
          <div tw="flex items-center gap-3.5 justify-between">
            <div>
              <img src={Img1} alt="image-1" />
            </div>
            <div>
              <img src={Img2} alt="image-1" />
            </div>
            <div>
              <img src={Img3} alt="image-1" />
            </div>
            <div>
              <img src={Img4} alt="image-1" />
            </div>
          </div>
        </div>
        <div tw="flex flex-col mt-7 mb-5">
          <div tw="flex items-center justify-between border border-grey-D8 hover:shadow w-full rounded-10 py-4 px-5">
            <div tw="flex flex-col space-y-2">
              <h3 tw="text-lg font-semibold font-open-sans">
                Pasoscapes Diptych Left Panel Print
              </h3>
              <p tw="text-sm font-semibold font-open-sans text-grey-8B">
                Framed Oil Painting{' '}
              </p>
            </div>
            <div tw="flex items-center space-x-7">
              <span tw="text-2xl font-semibold to-black-light">$150</span>
              <a href="#" tw="">
                <img src={arrowRight} alt="" />
              </a>
            </div>
          </div>
        </div>
        <div tw="flex flex-col space-y-3 w-full">
          <button tw="flex items-center justify-center space-x-3 border-1.5 font-semibold font-open-sans rounded-full font-bold text-lg py-2 w-full border-black-light hover:bg-black-light hover:text-white text-black-light">
            Buy Now
          </button>
          <button tw="flex items-center justify-center space-x-3 border-1.5 font-semibold font-open-sans rounded-full font-bold text-lg py-2 w-full border-black-light bg-black-light hover:bg-black-lighter text-white">
            Add to cart
          </button>
        </div>
        <hr tw="border-grey-D8 mt-5 mb-4" />
        <div tw="flex items-center space-x-6">
          <button>
            <img src={like} alt="like" />
          </button>
          <button>
            <img src={save} alt="like" />
          </button>
          <button>
            <img src={share} alt="like" />
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
      </div>
    </>
  );
}

export default Store;
