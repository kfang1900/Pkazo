import Image from 'next/image';
import { ReactNode, useState } from 'react';
import Masonry from 'react-masonry-css';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';

import { portfolio_images } from 'utils/Cancer_Imports';
import { Artist, showEdu, showExp, showExh } from 'obj/Artist';

import styles from '../../styles/ProfilePortfolio.module.css';

type GalleryDataType = {
  circleImgSrc: string | StaticImageData;
  circleTitle: ReactNode;
  descriptionBox: {
    title: ReactNode;
    description: ReactNode;
  };
  galleries: GalleryType[];
};

type GalleryType = {
  imgSrc: StaticImageData;
};

const galleryData: GalleryDataType[] = [
  {
    circleImgSrc: portfolio_images[0][0],
    circleTitle: 'Moon Child',
    descriptionBox: {
      title: 'Moon Child',
      description:
        'One famous piece, Day is Done (2005), is a massive multimedia project that explores the rituals and traditions of American adolescence through imagined, reconstructed high school yearbook photographs. ',
    },
    galleries: portfolio_images[0].map((value: StaticImageData) => ({
      imgSrc: value,
    })),
  },
  {
    circleImgSrc: portfolio_images[1][0],
    circleTitle: 'Seven Phases',
    descriptionBox: {
      title: 'Seven Phases',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, adipisci expedita voluptates vero neque quo deserunt soluta? amet consectetur adipisicing elit. Ut, adipisci expedit',
    },
    galleries: portfolio_images[1].map((value: StaticImageData) => ({
      imgSrc: value,
    })),
  },
  {
    circleImgSrc: portfolio_images[2][0],
    circleTitle: 'Meowtide',
    descriptionBox: {
      title: 'Meowtide',
      description:
        'magni voluptatum nesciunt perferendis rem reprehenderit necessitatibus ea provident, sed ullam. Quam, sapiente explicabo ab perferendis molestiae sint officia. Possimus, eos at!',
    },
    galleries: portfolio_images[2].map((value: StaticImageData) => ({
      imgSrc: value,
    })),
  },
  {
    circleImgSrc: portfolio_images[3][0],
    circleTitle: 'Kali',
    descriptionBox: {
      title: 'Kali',
      description:
        'Quidem expedita nostrum et neque blanditiis consectetur rerum nulla. Illum eligendi nemo, sapiente sunt libero similique perspiciatis neque iusto cumque, doloremque tenetur voluptatem totam? ',
    },
    galleries: portfolio_images[3].map((value: StaticImageData) => ({
      imgSrc: value,
    })),
  },
  {
    circleImgSrc: portfolio_images[4][0],
    circleTitle: 'Sadhu',
    descriptionBox: {
      title: 'Sadhu',
      description:
        'Dicta, accusamus et perspiciatis facere, beatae sunt est nesciunt cumque doloribus a assumenda provident sequi eligendi? Cumque cupiditate exercitationem, necessitatibus, nesciunt voluptates consectetur',
    },
    galleries: portfolio_images[4].map((value: StaticImageData) => ({
      imgSrc: value,
    })),
  },
];

// Credit: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

interface Props {
  user: Artist;
}
function GallerySection(props: Props) {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [curGallery, setCurGallery] = useState(getGalleryData(null));
  const [seeNum, setSeeNum] = useState(9);
  function updSeeNum() {
    if (seeNum >= curGallery.length) setSeeNum(9);
    else setSeeNum(seeNum + 9);
  }
  return (
    <div tw="pb-[100px]">
      {/* Circle Images Section --Start-- */}
      <section tw="mt-10">
        <div className="container">
          <div tw="flex justify-center mb-12">
            {galleryData.map((gallery, index) => (
              <div
                key={index}
                tw="cursor-pointer"
                onClick={() => {
                  setActiveIndex(activeIndex === index ? null : index);
                  setCurGallery(
                    shuffle(
                      getGalleryData(activeIndex === index ? null : index)
                    )
                  );
                }}
              >
                <div
                  css={[
                    tw`w-[128px] h-[128px] relative rounded-full overflow-hidden duration-200 origin-bottom border-4 border-transparent mx-[60px]`,
                    activeIndex === index && tw`border-[#C6C5C3]`,
                  ]}
                >
                  <Image
                    src={gallery.circleImgSrc}
                    alt="Portfolio Image"
                    layout="fill"
                  />
                </div>
                <p tw="text-black mt-2 text-center">{gallery.circleTitle}</p>
              </div>
            ))}
          </div>

          <CircleDescriptionBox activeIndex={activeIndex} />
        </div>
      </section>
      {/* Circle Images Section --End-- */}
      {/* Gallery Section --Start-- */}
      <section tw="mt-[55px]">
        <div className="container">
          <Masonry
            breakpointCols={{ default: 3, 800: 2, 400: 1 }}
            className={styles['my-masonry-grid']}
            columnClassName={styles['my-masonry-grid_column']}
          >
            {curGallery.slice(0, seeNum).map((gallery, index) => (
              <button key={index} tw="my-[18px]">
                <Image src={gallery.imgSrc} tw="w-full h-auto" alt="" />
              </button>
            ))}
          </Masonry>
        </div>

        <div tw="flex w-full justify-center items-center mt-[30px]">
          <hr tw="border border-[#C7C7C7] bg-[#C7C7C7] flex-grow" />
          {curGallery.length > 9 && (
            <button
              tw="rounded-full border-none outline-none bg-[#F4F4F4] hover:bg-[#EBEBEB] mr-[-10%] w-[60px] h-[60px] mx-[30px] px-0 text-[#8E8E93] font-bold text-[13px] text-center"
              onClick={() => updSeeNum()}
            >
              <img
                src="/assets/svgs/arrow_down.svg"
                css={[
                  tw`m-auto`,
                  seeNum >= curGallery.length && tw`scale-y-[-1]`,
                ]}
              />
            </button>
          )}
          <hr tw="border border-[#C7C7C7] bg-[#C7C7C7] flex-grow" />
        </div>
      </section>
      {/* Gallery Section --End-- */}
      <div tw="grid grid-cols-3 gap-16 mt-7 w-full">
        <div tw="flex-grow">
          <div tw="text-black text-[20px] leading-[27px] mb-2 font-semibold">
            Education
          </div>
          {props.user.education
            .sort((a, b) => b.end - a.end)
            .map((x, i) => (
              <div key={i} tw="mt-4">
                {showEdu(x)}
              </div>
            ))}
        </div>
        <div tw="flex-grow">
          <div tw="text-black text-[20px] leading-[27px] font-semibold">
            Experience
          </div>
          {props.user.experience
            .sort((a, b) => b.end - a.end)
            .map((x, i) => (
              <div key={i} tw="mt-4">
                {showExp(x)}
              </div>
            ))}
        </div>
        <div tw="flex-grow">
          <div tw="text-black text-[20px] leading-[27px] font-semibold">
            Exhibitions
          </div>
          {props.user.exhibitions
            .sort((a, b) => b.end - a.end)
            .map((x, i) => (
              <div key={i} tw="mt-4">
                {showExh(x)}
              </div>
            ))}
        </div>
      </div>

      <div tw="mt-7">
        <div tw="flex items-end">
          <div tw="text-black text-[30px] font-semibold leading-[30px]">
            Works for Sale
          </div>
          <Link href="#" passHref>
            <div tw="text-[#8B8B8B] text-[20px] leading-[25px] ml-9 cursor-pointer hover:text-[#656565]">
              see all
            </div>
          </Link>
        </div>
      </div>

      <div tw="mt-[100px]">
        <div tw="flex items-end">
          <div tw="text-black text-[30px] font-semibold leading-[30px]">
            Social Posts
          </div>
          <Link href="#" passHref>
            <div tw="text-[#8B8B8B] text-[20px] leading-[25px] ml-9 cursor-pointer hover:text-[#656565]">
              see all
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default GallerySection;

const getGalleryData = (activeIndex: null | number) => {
  if (activeIndex === null) {
    return galleryData.map((i) => i.galleries).flat();
  }
  return galleryData[activeIndex].galleries;
};

const CircleDescriptionBox = ({
  activeIndex,
}: {
  activeIndex: null | number;
}) => {
  if (activeIndex === null) return null;
  const data = galleryData[activeIndex];

  return (
    <div tw="flex rounded-3xl border-2 border-[#D8D8D8] max-w-[1000px] mx-auto pr-[60px] py-9">
      <div tw="w-[120px] h-[120px] relative rounded-full overflow-hidden duration-200 origin-bottom ml-[52px] mr-[44px] my-auto flex-shrink-0">
        <Image src={data.circleImgSrc} alt="Portfolio Image" layout="fill" />
      </div>
      <div>
        <h6 tw="text-[28px] font-semibold text-[#595959]">
          {data.descriptionBox.title}
        </h6>
        <div tw="text-black text-[16px] mt-4 max-w-[700px]">
          {data.descriptionBox.description}
        </div>
      </div>
    </div>
  );
};
