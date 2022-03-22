import tw, { styled } from 'twin.macro';
import Image from 'next/image';
import { useState, MouseEventHandler } from 'react';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ['JPEG', 'PNG', 'GIF'];

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
      <i
        className="far fa-check"
        css={[
          tw`text-white z-20 text-4xl absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2`,
          !selected && tw`hidden`,
        ]}
      ></i>
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
  goNext: MouseEventHandler<HTMLDivElement>;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    setFile(file);
  };

  return (
    <>
      <div tw="text-2xl max-w-[900px] px-[40px] leading-[1.5] mx-auto text-center opacity-80 mt-20 font-semibold">
        Attach in progress posts of the same work to this completed work. <br />
        <span tw="font-normal text-xl">(Select a maximum of 8 posts)</span>
      </div>

      <div tw="max-w-[1000px] px-[40px] mx-auto mt-12 mb-10">
        <div tw="text-xl text-[#8B8B8B] mb-5">Select from Existing Posts</div>

        <div tw="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
          <ImageSelector src="/assets/images/image1.svg" />
          <ImageSelector src="/assets/images/image2.svg" />
          <ImageSelector src="/assets/images/image3.svg" />
          <ImageSelector src="/assets/images/image4.svg" />
          <ImageSelector src="/assets/images/image5.svg" />
          <ImageSelector src="/assets/images/image6.svg" />
          <ImageSelector src="/assets/images/image7.svg" />
          <ImageSelector src="/assets/images/image8.svg" />
          <ImageSelector src="/assets/images/image9.svg" />
        </div>
      </div>

      <div tw="flex items-center justify-center  px-[40px] max-w-[1000px] mt-12 mb-6 mx-auto ">
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        >
          <div tw="text-[#65676B] border-[#D8D8D8] border-[3px] border-dashed cursor-pointer px-16 py-6 rounded-[7px]">
            <Bold>Upload</Bold> or <Bold>Drag and Drop</Bold> works from
            computer
          </div>
        </FileUploader>
      </div>

      <div tw="px-[40px] flex items-center text-white text-lg justify-start mb-20 mt-10">
        <div
          tw="py-4 px-16 mx-auto my-0 rounded-full bg-[#E24E4D] hover:bg-[#be4040] cursor-pointer"
          onClick={props.goNext}
        >
          Next
        </div>
      </div>
    </>
  );
};

export default CompleteWorkPosts;
