import tw, { styled } from 'twin.macro';
import Image from 'next/image';
import { useState, MouseEventHandler } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const fileTypes = ['JPG', 'PNG', 'SVG'];

const Bold = styled.span`
  ${tw`font-bold`}
`;

/* copied from image.tsx */
interface StaticRequire {
  default: StaticImageData;
}
type StaticImport = StaticRequire | StaticImageData;

function ImageSelector(props: { src: string | StaticImport }) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      tw="h-auto transform rounded-xl overflow-hidden cursor-pointer"
      onClick={() => setSelected((state: boolean) => !state)}
    >
      <FontAwesomeIcon
        icon={solid('check')}
        css={[
          tw`text-white z-20 p-5 absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2`,
          !selected && tw`hidden`,
        ]}
      />
      <div
        css={[
          tw`bg-black opacity-50 z-10 absolute w-full h-full`,
          !selected && tw`hidden`,
        ]}
      ></div>
      <Image
        src={props.src}
        width={128}
        height={128}
        layout="responsive"
        alt="post"
        tw="w-full object-cover absolute z-0"
      />
    </div>
  );
}

const CompleteWorkPosts = (props: {
  goNext: MouseEventHandler<HTMLInputElement>;
}) => {
  const [uploadedImages, setUploadedImages] = useState<string[]>([
    '/assets/images/image1.svg',
    '/assets/images/image2.svg',
    '/assets/images/image3.svg',
    '/assets/images/image4.svg',
    '/assets/images/image5.svg',
    '/assets/images/image6.svg',
    '/assets/images/image7.svg',
    '/assets/images/image8.svg',
    '/assets/images/image9.svg',
  ]);
  const handleChange = (files: File[]) =>
    setUploadedImages((state: string[]) =>
      state.concat(Array(...files).map(URL.createObjectURL))
    );

  return (
    <>
      <div tw="text-2xl max-w-[900px] px-[40px] leading-[1.5] mx-auto text-center opacity-80 mt-20 font-semibold">
        Attach in progress posts of the same work to this completed work. <br />
        <span tw="font-normal text-xl">(Select a maximum of 8 posts)</span>
      </div>

      <div tw="max-w-[1000px] px-[40px] mx-auto mt-12 mb-10">
        <div tw="text-xl text-[#8B8B8B] mb-5">Select from Existing Posts</div>

        <div tw="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Default images (do we even want them?)
          <ImageSelector src="/assets/images/image1.svg" />
          <ImageSelector src="/assets/images/image2.svg" />
          <ImageSelector src="/assets/images/image3.svg" />
          <ImageSelector src="/assets/images/image4.svg" />
          <ImageSelector src="/assets/images/image5.svg" />
          <ImageSelector src="/assets/images/image6.svg" />
          <ImageSelector src="/assets/images/image7.svg" />
          <ImageSelector src="/assets/images/image8.svg" />
          <ImageSelector src="/assets/images/image9.svg" /> */}
          {uploadedImages.map((value, key) => (
            <ImageSelector src={value} key={key} />
          ))}
        </div>
      </div>

      <div tw="flex items-center justify-center  px-[40px] max-w-[1000px] mt-12 mb-6 mx-auto ">
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        >
          <div tw="text-lg text-[#65676B] border-[#D8D8D8] border-[3px] border-dashed cursor-pointer px-16 py-8 rounded-[7px]">
            <Bold>Upload</Bold> in progress photos or videos from your computer
          </div>
        </FileUploader>
      </div>

      <div tw="px-[40px] flex items-center text-white text-lg justify-start mb-20 mt-10">
        <input
          type="button"
          tw="py-2.5 px-8 mx-auto my-0 rounded-full bg-[#E24E4D] hover:bg-[#be4040] font-bold cursor-pointer"
          onClick={props.goNext}
          value="Next"
        />
      </div>
    </>
  );
};

export default CompleteWorkPosts;
