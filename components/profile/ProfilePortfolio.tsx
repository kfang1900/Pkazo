import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';

import { portfolio_images } from 'utils/mockImports';
import styles from '../../styles/ProfilePortfolio.module.css';
import { useMediaQuery } from 'react-responsive';
interface PortfolioObject {
  Portfolios: Record<string, any>[];
  Works: Record<string, any>[][];
  PortfolioImages: string[];
  WorkImages: string[][];
}
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

function GallerySection({ portfolioData }: { portfolioData: PortfolioObject }) {
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
  const [activeIndex, setActiveIndex] = useState<null | number>(null);
  const [curGallery, setCurGallery] = useState<{
    Data: any[];
    Images: string[];
  }>({ Data: [], Images: [] });

  useEffect(() => {
    setCurGallery(getGalleryData(portfolioData, null));
  }, [portfolioData]);

  const [seeNum, setSeeNum] = useState(9);
  function updSeeNum() {
    if (seeNum >= curGallery.Images.length) setSeeNum(9);
    else setSeeNum(seeNum + 9);
  }
  return (
    <div>
      {/* Circle Images Section --Start-- */}
      <section css={[isMobile ? tw`mt-4` : tw`mt-10`]}>
        <div className="container">
          <div tw="flex justify-center gap-6 md:gap-[140px] ">
            {portfolioData.Portfolios.map((portfolio, index) => (
              <div
                key={index}
                tw="cursor-pointer"
                onClick={() => {
                  setActiveIndex(activeIndex === index ? null : index);
                  setCurGallery(
                    getGalleryData(
                      portfolioData,
                      activeIndex === index ? null : index
                    )
                  );
                }}
              >
                <div
                  css={[
                    tw`relative rounded-full overflow-hidden origin-bottom border-transparent`,
                    activeIndex === index && tw`border-[#C6C5C3]`,
                    isMobile ? tw`w-[56px] h-[56px] border-2` : tw`w-[128px] h-[128px] border-4`
                  ]}
                >
                  {portfolioData.PortfolioImages[index] && (
                    <Image
                      src={portfolioData.PortfolioImages[index]}
                      alt="Portfolio Image"
                      layout="fill"
                    />
                  )}
                </div>

                <div css={[
                  tw`text-[#3C3C3C] text-center`,
                  isMobile ? tw`text-[12px] mt-1` : tw`text-[16px] mt-2`
                ]}>{portfolio.name}</div>
              </div>
            ))}
          </div>

          <CircleDescriptionBox
            activeIndex={activeIndex}
            portfolioData={portfolioData}
            isMobile={isMobile}
          />
        </div>
      </section>
      {/* Circle Images Section --End-- */}
      {/* Gallery Section --Start-- */}
      <section css={[isMobile ? tw`mt-[18px]` : tw`mt-12`]}>
        <div className="container">
          <Masonry
            breakpointCols={{ default: 3, 500: 2 }}
            className={styles['my-masonry-grid']}
            columnClassName={styles['my-masonry-grid_column']}
          >
            {
              //.Images.slice(0, seeNum)
              curGallery.Images?.slice(0, seeNum).map((gallery: string, i) => (
                <>
                  <Link
                    key={i}
                    passHref
                    href={'/work/' + curGallery.Data[i].__id}
                  >
                    <img src={gallery} tw="cursor-pointer w-full h-auto"
                      css={[isMobile ? tw`my-[5px]` : tw`my-[36px]`]}
                      alt="" />
                  </Link>
                </>
              ))
            }
          </Masonry>
        </div>

        <div tw="flex w-full justify-center items-center mt-[30px]"
          css={[curGallery.Images.length > 9 && tw`mb-[20px]`]}>
          <hr tw="border border-[#C7C7C7] bg-[#C7C7C7] flex-grow" />
          {curGallery.Images.length > 9 && (
            <button
              tw="rounded-full border-none outline-none bg-[#F4F4F4] hover:bg-[#EBEBEB] mr-[-10%] w-[60px] h-[60px] mx-[30px] px-0 text-[#8E8E93] font-bold text-[13px] text-center"
              onClick={() => updSeeNum()}
            >
              <img
                src="/assets/svgs/arrow_down.svg"
                css={[
                  tw`m-auto`,
                  seeNum >= curGallery.Images.length && tw`scale-y-[-1]`,
                ]}
              />
            </button>
          )}
          <hr tw="border border-[#C7C7C7] bg-[#C7C7C7] flex-grow" />
        </div>
      </section>
      {/* Gallery Section --End-- */}
      {/*
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
      </div>*/}
      {/* 
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
      */}
    </div>
  );
}

export default GallerySection;

const getGalleryData = (
  portfolioData: PortfolioObject,
  activeIndex: null | number,
) => {
  if (activeIndex === null) {
    const a = portfolioData.Works.map((i) => i).flat();
    const b = portfolioData.WorkImages.map((i) => i).flat();
    //console.log("rendering images", a, b)
    return { Data: a, Images: b };
  } else {
    const a = portfolioData.Works[activeIndex];
    const b = portfolioData.WorkImages[activeIndex];
    //console.log("rendering images", a, b)
    return { Data: a, Images: b };
  }
};

const CircleDescriptionBox = ({
  activeIndex,
  portfolioData,
  isMobile
}: {
  activeIndex: null | number;
  portfolioData: PortfolioObject;
  isMobile: boolean;
}) => {
  //console.log("rendering description box", props)

  if (activeIndex === null) return null;
  const data = portfolioData.Portfolios[activeIndex];

  if (isMobile)
    return <div tw='mt-[18px] text-[14px] text-[#3C3C3C] px-4 '>{data.description}</div>

  return (
    <div tw="mt-12 flex rounded-3xl border-2 border-[#D8D8D8] max-w-[1000px] mx-auto pr-[60px] py-9">
      <div tw="w-[120px] h-[120px] relative rounded-full overflow-hidden duration-200 origin-bottom ml-[52px] mr-[44px] my-auto flex-shrink-0">
        {portfolioData.PortfolioImages[activeIndex] && (
          <Image
            src={portfolioData.PortfolioImages[activeIndex]}
            alt="Portfolio Image"
            layout="fill"
          />
        )}
      </div>
      <div>
        <h6 tw="text-[28px] font-semibold text-[#595959]">{data.name}</h6>
        <div tw="text-black text-[16px] mt-4 max-w-[700px]">
          {data.description}
        </div>
      </div>
    </div>
  );
};
