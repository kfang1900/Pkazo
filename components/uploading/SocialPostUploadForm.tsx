import { useState } from 'react';
import tw from 'twin.macro';

import Image from 'next/image';
import avatar from '/public/assets/images/user.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FileUploader } from 'react-drag-drop-files';

function ImageSelector(props: {
  src: string | StaticImageData;
  id: number;
  selectedImage: number;
  setSelectedImage: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div
      tw="w-full transform rounded-md overflow-hidden bg-gray-200 cursor-pointer mb-4"
      css={[{ 'aspect-ratio': '1/1' }]}
      onClick={() => props.setSelectedImage(props.id)}
    >
      <div css={[props.id !== props.selectedImage && tw`opacity-30`]}>
        <Image
          src={props.src}
          layout="fill"
          objectFit="cover"
          alt="Uploaded Image"
        />
      </div>
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
        tw="border border-light-300 rounded-2xl w-32 px-3 py-1 text-black text-sm text-opacity-50 focus:caret-theme-red focus:outline-theme-red"
      />
    </div>
  );
}

function SocialPostUploadForm() {
  // const UploadedImages = [Img1, Img2, Img3, Img4];
  const [uploadedImages, setUploadedImages] = useState<
    (StaticImageData | string)[]
  >([]);
  const [selectedImage, setSelectedImage] = useState(-1);
  const [inProgressWork, setInProgressWork] = useState(false);

  return (
    <div tw="flex flex-row w-full">
      <div tw="flex-none w-28 overflow-auto pr-3">
        {uploadedImages.map((value, index) => (
          <ImageSelector
            src={value}
            key={index}
            id={index}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        ))}
        <FileUploader
          handleChange={(file: File) => {
            setUploadedImages((state: (StaticImageData | string)[]) => {
              setSelectedImage(state.length);
              return state.concat([URL.createObjectURL(file)]);
            });
          }}
          types={['JPG', 'PNG']}
          name="upload_new_image"
          hoverTitle=" "
        >
          <div
            tw="w-full transform overflow-hidden bg-gray-200 cursor-pointer"
            css={{ 'aspect-ratio': '1/1' }}
          >
            <FontAwesomeIcon
              icon={solid('plus')}
              tw="text-4xl text-gray-400 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
            />
          </div>
        </FileUploader>
      </div>
      <div
        tw="h-full transform flex-initial overflow-hidden rounded-xl"
        css={{ aspectRatio: '1/1' }}
      >
        {(0 <= selectedImage && selectedImage < uploadedImages.length && (
          <Image
            src={uploadedImages[selectedImage]}
            objectFit="contain"
            layout="fill"
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
      <div tw="pl-5 flex-auto flex flex-col pr-3 overflow-auto">
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
            tw="block w-full h-32 rounded-[10px] border border-light-300 py-1 px-4 text-sm text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:py-2 md:text-lg"
          />
        </div>
        <div tw="rounded-[10px] border border-light-300 px-4 py-3 my-1.5">
          <div tw="flex justify-between">
            <p tw="text-sm text-gray-700 md:text-lg">In Progress Work?</p>
            <div
              tw="relative flex items-center gap-5"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setInProgressWork(event.target.value === 'yes')
              }
            >
              <div tw="flex items-center gap-3">
                <input
                  type="radio"
                  id="yes"
                  name="in-progress-work"
                  value="yes"
                  tw="h-4 w-4"
                  css={{ 'accent-color': '#E24E4D' }}
                />
                <label tw="text-sm text-light-400 md:text-lg" htmlFor="yes">
                  Yes
                </label>
              </div>
              <div tw="flex items-center gap-3">
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
