import React, { useState, ReactNode, Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import tw from 'twin.macro';
import ImageSrc1 from '/public/assets/images/image1.svg';
import ImageSrc6 from '/public/assets/images/image6.svg';
import ImageSrc3 from '/public/assets/images/image3.svg';
import ImageSrc4 from '/public/assets/images/image4.svg';
import ImageSrc9 from '/public/assets/images/image9.svg';

/* copied from image.tsx */
interface StaticRequire {
  default: StaticImageData;
}
type StaticImport = StaticRequire | StaticImageData;

function ImageSelector(props: {
  id: number;
  selectedImage: number;
  setSelectedImage: Dispatch<SetStateAction<number>>;
  src: string | StaticImport;
  children: ReactNode;
}) {
  return (
    <div
      onClick={() =>
        props.setSelectedImage((state) => (state === props.id ? -1 : props.id))
      }
    >
      <div
        css={[
          tw`w-[130px] h-[130px] transform cursor-pointer rounded-full border-[5px] border-transparent overflow-hidden`,
          props.id === props.selectedImage && tw`scale-110 border-[#C6C5C3]`,
        ]}
      >
        <Image
          src={props.src}
          alt="Portfolio Image"
          layout="fill"
          tw="scale-105"
        />
      </div>
      <div
        css={[
          tw`mx-auto opacity-90 mt-3 flex items-center justify-center relative`,
          props.id === props.selectedImage && tw`top-2`,
        ]}
      >
        {props.children}
      </div>
    </div>
  );
}

const CompleteWorkPortfolio = (props: { goNext: () => void }) => {
  const [selectedImage, setSelectedImage] = useState(-1);

  return (
    <>
      <div tw="text-2xl max-w-[1000px] px-[40px]  leading-[1.5] mx-auto text-center opacity-80 mt-20 font-bold">
        Include this completed work in your portfolio!
      </div>

      <div tw="max-w-[1100px] gap-5 px-[40px] mx-auto flex items-center justify-between flex-wrap mt-20 mb-10">
        <ImageSelector
          id={1}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          src={ImageSrc1}
        >
          Moon Child
        </ImageSelector>

        <ImageSelector
          id={2}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          src={ImageSrc6}
        >
          Seven Phases
        </ImageSelector>

        <ImageSelector
          id={3}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          src={ImageSrc3}
        >
          Meowtide
        </ImageSelector>

        <ImageSelector
          id={4}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          src={ImageSrc4}
        >
          Kali
        </ImageSelector>

        <ImageSelector
          id={5}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          src={ImageSrc9}
        >
          Sadhu
        </ImageSelector>
      </div>

      <div tw="px-[40px] flex items-center text-white text-lg justify-start mb-20 mt-20">
        <div
          tw="py-2.5 px-14 mx-auto my-0 rounded-full bg-[#E24E4D] hover:bg-[#be4040] font-bold cursor-pointer"
          onClick={props.goNext}
        >
          Post Completed Work
        </div>
      </div>

      <input value="true" tw="" type="radio" id="series1" />

      <input value="true" tw="" type="radio" id="series2" />
    </>
  );
};

export default CompleteWorkPortfolio;
