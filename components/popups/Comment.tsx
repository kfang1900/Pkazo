import { useState } from 'react';
import Image from 'next/image';
import tw from 'twin.macro';

interface Props {
  comment: {
    user: string;
    time: string;
    comment: string;
    imgSrc: string;
  };
}
const Comment = (props: Props) => {
  const [liked, setLiked] = useState(false);
  return (
    <div tw="flex mb-[24px] mr-2">
      <div tw="w-[36px] h-full overflow-hidden rounded-full flex items-center">
        <Image
          src={props.comment.imgSrc}
          alt="profile_image"
          width="36px"
          height="36px"
          objectFit="cover"
        />
      </div>
      <div tw="ml-[12px]">
        <div tw="flex">
          <div tw="text-[12px] leading-[18px] font-bold text-black">
            {props.comment.user}
          </div>
          <div tw="text-[12px] leading-[18px] text-[#7F838B] ml-[12px]">
            {props.comment.time}
          </div>
        </div>
        <div tw="text-[12px] leading-[18px] text-black">
          {props.comment.comment}
        </div>
      </div>
      <button onClick={() => setLiked(!liked)} tw="ml-auto flex self-center">
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
          {liked ? 6 : 5}
        </div>
      </button>
    </div>
  );
};
export default Comment;
