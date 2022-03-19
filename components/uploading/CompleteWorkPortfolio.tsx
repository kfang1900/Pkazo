import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import tw from 'twin.macro';
import ImageSrc1 from '/public/assets/images/image1.svg';
import ImageSrc6 from '/public/assets/images/image6.svg';
import ImageSrc3 from '/public/assets/images/image3.svg';
import ImageSrc4 from '/public/assets/images/image4.svg';
import ImageSrc9 from '/public/assets/images/image9.svg';

function ImageSelector(props) {
  return (
    <div onClick={() => props.selectImage()}>
      <div
        css={[
          tw`w-[130px] h-[130px] transform cursor-pointer rounded-full overflow-hidden duration-150 ease-in-out`,
          {
            border: props.isSelected
              ? '5px solid rgba(128, 128, 128, 0.61)'
              : '',
            transform: `scale(${props.isSelected ? '1.12' : '1'})`,
          },
        ]}
      >
        <Image
          src={props.src}
          alt="Portfolio Image"
          css={[
            tw`w-full h-full object-cover duration-150 ease-in-out`,
            {
              transform: `scale(${props.isSelected ? '1.12' : '1'})`,
            },
          ]}
        />
      </div>
      <div tw="mx-auto opacity-90 mt-3 flex items-center justify-center">
        {props.children}
      </div>
    </div>
  );
}

const CompleteWorkPortfolio = () => {
  const [selectedImage, setSelectedImage] = useState(1);

  return (
    <>
      <div tw="text-2xl max-w-[1000px] px-[40px]  leading-[1.5] mx-auto text-center opacity-80 mt-20 font-bold">
        Include this completed work in your portfolio!
      </div>

      <div tw="max-w-[1100px] gap-5 px-[40px] mx-auto flex items-center justify-between flex-wrap mt-24 mb-10">
        <ImageSelector
          selectImage={() => setSelectedImage(1)}
          isSelected={selectedImage === 1}
          src={ImageSrc1}
        >
          Series 1
        </ImageSelector>

        <ImageSelector
          selectImage={() => setSelectedImage(2)}
          isSelected={selectedImage === 2}
          src={ImageSrc6}
        >
          Series 2
        </ImageSelector>

        <ImageSelector
          selectImage={() => setSelectedImage(3)}
          isSelected={selectedImage === 3}
          src={ImageSrc3}
        >
          Series 3
        </ImageSelector>

        <ImageSelector
          selectImage={() => setSelectedImage(4)}
          isSelected={selectedImage === 4}
          src={ImageSrc4}
        >
          Series 4
        </ImageSelector>

        <ImageSelector
          selectImage={() => setSelectedImage(5)}
          isSelected={selectedImage === 5}
          src={ImageSrc9}
        >
          Series 5
        </ImageSelector>
      </div>

      <div tw="px-[40px] flex items-center text-white text-lg justify-start mb-20 mt-20">
        <Link href="/complete-post" passHref>
          <div tw="py-4 px-16 mx-auto my-0 rounded-full bg-[#E24E4D] hover:bg-[#be4040]">
            Post Completed Work
          </div>
        </Link>
      </div>

      <input value="true" tw="" type="radio" id="series1" />

      <input value="true" tw="" type="radio" id="series2" />
    </>
  );
};

export default CompleteWorkPortfolio;
