import React, { useState } from 'react';
import tw, { css } from 'twin.macro';

interface Props {
  imgs: Array<string>;
  layout: string; // 'w' or 'h'
}
const PostImage = (props: Props) => {
  const [imgIndex, setImgIndex] = useState(0);
  const nextImg = () =>
    setImgIndex(Math.min(imgIndex + 1, props.imgs.length - 1));
  const prevImg = () => setImgIndex(Math.max(imgIndex - 1, 0));
  return (
    <div tw="relative">
      <img
        css={[props.layout === 'h' ? tw`h-full` : tw`w-full`]}
        src={props.imgs[imgIndex]}
        alt="post-image"
      />
      {props.imgs.length > 1 && (
        <div tw="absolute mx-auto w-full bottom-[10px] flex justify-center">
          {props.imgs.map((_, i) => {
            return (
              <span
                key={i}
                css={[
                  tw`w-2 h-2 rounded-[50%] inline-block mx-[2px]`,
                  imgIndex === i
                    ? tw`bg-soft-red opacity-70`
                    : tw`bg-gray-500 opacity-50`,
                ]}
              />
            );
          })}
        </div>
      )}
      {imgIndex > 0 && (
        <button
          tw="w-9 h-9 rounded-[50%] inline-block bg-white opacity-30 hover:opacity-50 absolute top-[50%] left-[10px] p-3"
          onClick={prevImg}
        >
          <img
            src="/store_assets/img/chevron-right.svg"
            tw="scale-x-[-1] w-full h-full"
          />
        </button>
      )}
      {imgIndex < props.imgs.length - 1 && (
        <button
          tw="w-9 h-9 rounded-[50%] inline-block bg-white opacity-30 hover:opacity-50 absolute top-[50%] right-[10px] p-3"
          onClick={nextImg}
        >
          <img src="/store_assets/img/chevron-right.svg" tw="w-full h-full" />
        </button>
      )}
    </div>
  );
};

export default PostImage;
