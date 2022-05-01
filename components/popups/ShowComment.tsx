import { useState } from 'react';
import Image from 'next/image';
import tw from 'twin.macro';

import { Comment } from '../../obj/Comment';

interface Props {
  comment: Comment;
}

export const timeElapsed = (timestamp: number) => {
  let diff = (Date.now() - timestamp) / 1000;
  if (diff < 60) return 'now';
  // x minutes ago
  diff = Math.floor(diff / 60);
  if (diff < 60) return diff + 'm';
  // x hours ago
  diff = Math.floor(diff / 60);
  if (diff < 24) return diff + 'h';
  // x days ago
  diff = Math.floor(diff / 24);
  if (diff < 7) return diff + 'd';
  // x weeks ago
  diff = Math.floor(diff / 7);
  if (diff < 12) return diff + 'w';
  // years
  return Math.floor(diff / 52) + 'y';
};
const ShowComment = (props: Props) => {
  const [liked, setLiked] = useState(false);
  return (
    <div tw="flex mb-[24px] mr-2">
      <div tw="w-[36px] h-full overflow-hidden rounded-full flex items-center">
        <Image
          src={props.comment.user.ProfilePicture}
          alt="profile_image"
          width="36px"
          height="36px"
          objectFit="cover"
        />
      </div>
      <div tw="ml-[12px]">
        <div tw="flex">
          <div tw="text-[12px] leading-[18px] font-bold text-black">
            {props.comment.user.Name}
          </div>
          <div tw="text-[12px] leading-[18px] text-[#7F838B] ml-[12px]">
            {timeElapsed(props.comment.time)}
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
export default ShowComment;
