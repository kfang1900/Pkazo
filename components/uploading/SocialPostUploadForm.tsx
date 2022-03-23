import { useState } from 'react';
import tw from 'twin.macro';

import Image from 'next/image';
import avatar from '/public/assets/images/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Img1 from 'public/assets/images/portfolios/pf1/1.jpeg';
import Img2 from 'public/assets/images/portfolios/pf1/2.jpeg';
import Img3 from 'public/assets/images/portfolios/pf1/3.jpeg';

function ImageSelector(props: {
  src: StaticImageData;
  id: number;
  selectedImage: number;
  setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div
      tw="w-full transform rounded-md overflow-hidden bg-gray-100 cursor-pointer mb-2"
      css={[
        { 'aspect-ratio': '1/1' },
        props.id !== props.selectedImage && tw`opacity-30`,
      ]}
      onClick={() => props.setSelectedImage(props.id)}
    >
      <Image src={props.src} alt="Uploaded Image" />
    </div>
  );
}

function SimpleFormBox(props: { prompt: string; name: string }) {
  return (
    <div tw="flex justify-between mt-4">
      <label htmlFor={props.name} tw="text-gray-500">
        {props.prompt}
      </label>
      <input
        type="text"
        name={props.name}
        tw="border border-light-300 rounded-2xl w-32 px-3 py-1 text-black text-sm text-opacity-50"
      />
    </div>
  );
}

function SocialPostUploadForm() {
  const UploadedImages = [Img1, Img2, Img3];
  const [selectedImage, setSelectedImage] = useState(-1);
  const [inProgressWork, setInProgressWork] = useState(false);

  return (
    <div tw="flex flex-row w-full">
      <div tw="flex-none w-36 overflow-auto pr-3">
        {UploadedImages.map((value, index) => (
          <ImageSelector
            src={value}
            key={index}
            id={index}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        ))}
        <div
          tw="w-full transform rounded-md overflow-hidden bg-gray-100 cursor-pointer"
          css={{ 'aspect-ratio': '1/1' }}
        >
          <FontAwesomeIcon
            icon={solid('plus')}
            tw="p-4 text-gray-300 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
          />
        </div>
      </div>
      <div
        tw="h-full flex-none overflow-hidden rounded-xl"
        css={{ 'aspect-ratio': '1/1' }}
      >
        {(0 <= selectedImage && selectedImage < UploadedImages.length && (
          <Image
            css={[tw`lg:w-full lg:h-auto`, { 'aspect-ratio': '1 / 1' }]}
            src={UploadedImages[selectedImage]}
            alt="post-image-1"
          />
        )) || (
          <div tw="h-full w-full border-2 rounded-2xl border-gray-300 border-dashed mx-auto flex flex-col justify-center">
            <h1 tw="w-full flex justify-center text-gray-300 text-2xl font-semibold">
              No Image Selected
            </h1>
          </div>
        )}
      </div>
      <div tw="pl-5 flex-1 flex flex-col pr-3 overflow-auto">
        <div tw="flex items-center space-x-3.5">
          <div tw="h-12 w-12">
            <Image
              tw="rounded-full border-2 border-white"
              src={avatar}
              alt="profile"
            />
          </div>
          <div tw="flex flex-col justify-center -space-y-1">
            <h5 tw="text-lg font-bold text-black-light">Erin Hanson</h5>
            <p tw="text-xs font-semibold text-grey-8B">McMinnville, OR</p>
          </div>
        </div>
        <div tw="mt-2.5 mb-1.5">
          <input
            type="text"
            placeholder="Title"
            tw="block w-full h-11 rounded-[10px] border border-light-300 py-1 px-4 text-sm text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:py-2 md:text-lg"
          />
        </div>
        <div tw="my-1.5">
          <textarea
            placeholder="Description"
            tw="block w-full h-36 rounded-[10px] border border-light-300 py-1 px-4 text-sm text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:py-2 md:text-lg"
          />
        </div>
        <div tw="rounded-[10px] border border-light-300 px-4 py-2 my-1.5">
          <div tw="flex justify-between">
            <p tw="text-sm text-gray-700 md:text-lg">In Progress Work?</p>
            <div
              tw="relative flex items-center gap-10"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setInProgressWork(event.target.value === 'yes')
              }
            >
              <div tw="flex items-center gap-5">
                <input
                  type="radio"
                  id="yes"
                  name="in-progress-work"
                  value="yes"
                  tw="h-4 w-4"
                  css={{ 'accent-color': '#E24E4D' }}
                />
                <label tw="text-sm text-light-400 md:text-lg" htmlFor="yes">
                  Yes{' '}
                </label>
              </div>
              <div tw="flex items-center gap-5">
                <input
                  type="radio"
                  id="no"
                  name="in-progress-work"
                  value="no"
                  tw="h-4 w-4"
                  css={{ 'accent-color': '#E24E4D' }}
                />
                <label tw="text-sm text-light-400 md:text-lg" htmlFor="no">
                  No{' '}
                </label>
              </div>
            </div>
          </div>
          {inProgressWork && (
            <div tw="ml-2">
              <SimpleFormBox prompt="Title" name="title" />
              <SimpleFormBox prompt="Medium" name="medium" />
              <SimpleFormBox prompt="Release Date" name="date" />
            </div>
          )}
        </div>
        <div tw="flex-1 flex items-end text-white text-lg mt-4">
          <input
            type="button"
            tw="py-2 w-3/4 mx-auto my-0 rounded-full bg-[#E24E4D] hover:bg-[#be4040] font-bold cursor-pointer"
            value="Share"
          />
        </div>
      </div>
    </div>
  );
}

export default SocialPostUploadForm;
