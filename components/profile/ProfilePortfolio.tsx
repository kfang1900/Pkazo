import Image from 'next/image';
import { ReactNode, useState } from 'react';
import Masonry from 'react-masonry-css';
import tw, { styled } from 'twin.macro';

import { portfolio_images } from 'utils/Cancer_Imports';

import styles from '../../styles/ProfilePortfolio.module.css';

type GalleryDataType = {
  circleImgSrc: string;
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
    circleImgSrc: '/store_assets/img/circle_img_1.png',
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
    circleImgSrc: '/store_assets/img/circle_img_2.png',
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
    circleImgSrc: '/store_assets/img/circle_img_3.png',
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
    circleImgSrc: '/store_assets/img/circle_img_4.png',
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
    circleImgSrc: '/store_assets/img/circle_img_2.png',
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

function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  return (
    <>
      {/* Circle Images Section --Start-- */}
      <section tw="mt-[56px]">
        <div className="container">
          <div tw="md:w-[1100px] mx-auto grid grid-cols-2 gap-y-10 md:gap-y-0 md:grid-cols-5 place-items-center mb-[50px]">
            {galleryData.map((gallery, index) => (
              <div
                key={index}
                tw="cursor-pointer"
                onClick={() =>
                  setActiveIndex((state: number | null) =>
                    state === index ? null : index
                  )
                }
              >
                <div
                  css={[
                    tw`w-[102px] h-[102px] relative rounded-full overflow-hidden duration-200 origin-bottom border-4 border-transparent`,
                    activeIndex === index && tw`border-[#C6C5C3] scale-[1.15]`,
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
            {shuffle(getGalleryData(activeIndex))
              .slice(0, 9)
              .map((gallery, index) => (
                <button key={index} tw="my-[10px]">
                  <Image src={gallery.imgSrc} tw="w-full h-auto" alt="" />
                </button>
              ))}
          </Masonry>
        </div>
      </section>
      {/* Gallery Section --End-- */}
    </>
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
  const data = galleryData[activeIndex].descriptionBox;

  return (
    <div tw="grid grid-cols-[200px minmax(0,1fr) 40px] gap-6 md:gap-14 md:w-[1000px] mx-auto px-[35px] md:px-[60px] py-[30px] md:py-[50px] rounded-3xl border-4 border-[#D8D8D8]">
      <h6 tw="text-[28px] font-semibold text-[#595959] text-center">
        {data.title}
      </h6>
      <p tw="text-black">{data.description}</p>
      <div tw="flex items-center justify-self-end md:justify-start w-10">
        <a href="#">
          <img src="/store_assets/img/chevron-right.svg" alt="chevron-right" />
        </a>
      </div>
    </div>
  );
};
