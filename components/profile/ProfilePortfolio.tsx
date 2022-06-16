import Image from 'next/image';
import { ReactNode, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';

import { portfolio_images } from 'utils/mockImports';
import styles from '../../styles/ProfilePortfolio.module.css';
import ShowMore from 'styles/ShowMore';
import { useMediaQuery } from 'react-responsive';
import { ArtistData } from '../../types/dbTypes';
import exp from 'constants';
import { useFavicon } from 'react-use';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
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

function GallerySection({
  portfolioData,
  artistData,
}: {
  portfolioData: PortfolioObject;
  artistData: ArtistData | null;
}) {
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

  // useState(() => {
  //   const db = getFirestore();
  //   updateDoc(doc(db, 'artists', 'eUuE7jK1J2Zl84qwFjFh'), {
  //     exhibitions: [
  //       {
  //         year: 2019,
  //         gallery: 'Some Gallery',
  //       },
  //       {
  //         year: 2020,
  //         gallery: 'Some Other Gallery',
  //       },
  //     ],
  //     education: [
  //       {
  //         start: 2019,
  //         end: 2020,
  //         school: 'Some college of art',
  //         field: 'Photography',
  //       },
  //     ],
  //     experience: [
  //       {
  //         start: 2009,
  //         end: 2012,
  //         company: 'Some company',
  //         position: 'Some position',
  //       },
  //       {
  //         start: 2013,
  //         end: 2014,
  //         company: 'Another company',
  //         position: 'Yet another position',
  //       },
  //     ],
  //   });
  // }, []);

  return (
    <div>
      {/* Circle Images Section --Start-- */}
      <section css={[isMobile ? tw`mt-4` : tw`mt-[52px]`]}>
        <div className="container">
          <div tw="flex justify-center">
            <div
              css={[
                isMobile &&
                  tw`grid grid-rows-1 grid-flow-col px-4 overflow-auto justify-start`,
              ]}
              tw="md:flex md:justify-between gap-6 md:w-full"
              style={{
                maxWidth: `${268 * portfolioData.Portfolios.length - 140}px`,
              }}
            >
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
                      isMobile
                        ? tw`w-[64px] h-[64px] border-[4px]`
                        : tw`w-[128px] h-[128px] border-[6px]`,
                    ]}
                  >
                    {portfolioData.PortfolioImages[index] && (
                      <Image
                        src={portfolioData.PortfolioImages[index]}
                        alt="Portfolio Image"
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                  </div>

                  <div
                    css={[
                      tw`text-[#3C3C3C] text-center`,
                      isMobile ? tw`text-[12px] mt-1` : tw`text-[16px] mt-2`,
                    ]}
                  >
                    {portfolio.name}
                  </div>
                </div>
              ))}
            </div>
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
      <section tw="mt-3 md:mt-12">
        <div className="container" tw="overflow-x-hidden">
          <Masonry
            breakpointCols={{ default: 3, 500: 2 }}
            className={styles['masonry']}
            columnClassName={styles['column']}
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
                    <img
                      src={gallery}
                      tw="cursor-pointer w-full h-auto my-[5px] md:my-9"
                      alt=""
                    />
                  </Link>
                </>
              ))
            }
          </Masonry>
        </div>
      </section>

      <div
        tw="flex justify-center items-center mt-4 md:mt-[30px]"
        css={[curGallery.Images.length > 9 && tw`mb-1 md:mb-5`]}
      >
        <hr tw="border border-[#C7C7C7] bg-[#C7C7C7] flex-grow" />
        {curGallery.Images.length > 9 && (
          <button
            tw="rounded-full border-none outline-none bg-[#F4F4F4] hover:bg-[#EBEBEB]"
            css={[
              isMobile
                ? tw`w-[30px] h-[30px] mx-[15px]`
                : tw`w-[60px] h-[60px] mx-[30px]`,
            ]}
            onClick={() => updSeeNum()}
          >
            <img
              src="/assets/svgs/arrow_down.svg"
              css={[
                tw`m-auto scale-50 md:scale-100`,
                seeNum >= curGallery.Images.length &&
                  tw`scale-y-[-0.5] md:scale-y-[-1]`,
              ]}
            />
          </button>
        )}
        <hr tw="border border-[#C7C7C7] bg-[#C7C7C7] flex-grow" />
      </div>
      {/* Gallery Section --End-- */}

      {/* education, experience, exhibitions */}
      {artistData && (
        <div tw="grid grid-cols-3 gap-16 mt-7 w-full">
          <div tw="flex-grow">
            <div tw="text-black text-[20px] leading-[27px] mb-2 font-semibold">
              Education
            </div>
            {artistData.education // education array
              .sort((a, b) => (b.end || b.start) - (a.end || a.start)) // b.end - a.end, sorted by end year
              .map((education, i) => (
                <div key={i} tw="mt-4">
                  {/* 
                needs school, optional field, start and end year
                 */}
                  {education.school}
                  {education.start}
                  {education.end}
                  {education.field}
                </div>
              ))}
          </div>
          <div tw="flex-grow">
            <div tw="text-black text-[20px] leading-[27px] font-semibold">
              Experience
            </div>
            {artistData.experience //experience array
              .sort((a, b) => (b.end || b.start) - (a.end || a.start)) // b.end - a.end, sorted by end year
              .map((experience, i) => (
                <div key={i} tw="mt-4">
                  {/*
                needs company, optional role, start and end year
                */}
                  {experience.company}
                  {experience.position}
                  {experience.start}
                  {experience.end}
                </div>
              ))}
          </div>
          <div tw="flex-grow">
            <div tw="text-black text-[20px] leading-[27px] font-semibold">
              Exhibitions
            </div>
            {artistData.exhibitions // exhibition array
              .sort((a, b) => b.year - a.year) // b.end - a.end, sorted by end year
              .map((exhibition, i) => (
                <div key={i} tw="mt-4">
                  {/*
                needs exhibition location, start and end year
                */}
                  {/* Jeffrey: exhibitions only have one year according to Kevin */}
                  {exhibition.year}
                  {exhibition.gallery}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* <div tw="mt-7">
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
      </div> */}
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
  activeIndex: null | number
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
  isMobile,
}: {
  activeIndex: null | number;
  portfolioData: PortfolioObject;
  isMobile: boolean;
}) => {
  //console.log("rendering description box", props)

  if (activeIndex === null) return null;
  const data = portfolioData.Portfolios[activeIndex];

  if (isMobile)
    return (
      <ShowMore
        appearance={tw`mt-[18px] text-[14px] leading-[19px] text-[#3C3C3C] mx-4 `}
        height={57}
      >
        {data.description}
      </ShowMore>
    );

  return (
    <div tw="mt-12 flex rounded-3xl border-2 border-[#D8D8D8] max-w-[1000px] mx-auto pr-[60px] py-9">
      <div tw="w-[120px] h-[120px] relative rounded-full overflow-hidden duration-200 origin-bottom ml-[52px] mr-[44px] my-auto flex-shrink-0">
        {portfolioData.PortfolioImages[activeIndex] && (
          <Image
            src={portfolioData.PortfolioImages[activeIndex]}
            alt="Portfolio Image"
            layout="fill"
            objectFit="cover"
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
