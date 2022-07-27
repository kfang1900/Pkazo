import React, { useEffect, useState } from 'react';
import { FiDollarSign, FiMinus, FiPlus, FiSearch } from 'react-icons/fi';
import {
  BsSliders,
  BsChevronCompactDown,
  BsGrid3X3GapFill,
} from 'react-icons/bs';
import { FiX } from 'react-icons/fi';
import tw, { styled } from 'twin.macro';
import Masonry from 'react-masonry-css';
import styles from '../../styles/ProfilePortfolio.module.css';
import Dropdown from 'styles/Dropdown';
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import buttons from 'styles/Button';

import { Container } from 'styles/Container';
import { WorkData } from '../../types/dbTypes';
import useAuth from '../../utils/auth/useAuth';
import {
  collection,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { loadStorageImageSafe } from '../../helpers/FirebaseFunctions';
import CustomRefinementGroup from './store/CustomRefinementList';
import CustomSortBy from './store/CustomSortBy';
import ProductCollection from './store/ProductCollection';
// import algoliaSearchClient from '../shared/algoliaSearchClient';
import FilterCategory from './store/FilterCategory';
import DoubleSlider from './store/DoubleSlider';
import { useRouter } from 'next/router';
const ListCheckGroup = styled.ul`
  .check-group input[type='radio'],
  .check-group input[type='checkbox'] {
    ${tw`hidden`}
  }
  .check-group input[type='radio']:checked + label:before,
  .check-group input[type='checkbox']:checked + label:before {
    ${tw`bg-[#C4C4C4]`}
  }
  .check-group label {
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    line-height: 2;
  }
  .check-group label:before {
    ${tw`inline-block min-h-[1em] w-[1em]`}
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 30em;
    border: 2px solid #c4c4c4;
  }
  .check-group label.color-check:before {
    background: var(--checkbg) !important;
    border: 0;
  }
  .check-group input:checked + label.color-check:after {
    --check-after-size: 6px;
    content: '';
    position: absolute;
    width: var(--check-after-size);
    height: var(--check-after-size);
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 30em;
    ${/*background: theme('colors.white');*/ tw`bg-white`}
  }
`;

const PriceFilterDimension = styled.div`
  ${tw`py-3 flex justify-between items-center`}
  input[type="number"]::-webkit-outer-spin-button,input[type="number"]::-webkit-inner-spin-button {
    ${tw`appearance-none`}
  }
`;

interface PortfolioObject {
  Portfolios: Record<string, any>[];
  Works: Record<string, any>[][];
  PortfolioImages: string[];
  WorkImages: string[][];
}

const StorePortFolio = ({
  profileType,
  portfolioData,
}: {
  profileType: number;
  portfolioData: PortfolioObject;
}) => {
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
  const [filterOpen, setFilterOpen] = React.useState(false);
  const [loadMore, setLoadMore] = React.useState(null);
  const [activeIndex, setActiveIndex] = useState<null | number>(null);

  const [sortDropdown, setSortDropdown] = React.useState(false);
  const [sortValueDropdown, setSortValueDropdown] =
    React.useState('Low to High');

  console.log('Profile type', profileType);
  const filters = {
    portfolio: {
      title: 'Portfolio',
      values: [
        'All portfolios',
        ...portfolioData.Portfolios.map((p) => p.name),
      ],
      unique: true,
    },
    price: {
      title: 'Price',
      values: [
        'All prices',
        'Under $200',
        '$200 to $500',
        '$500 to $2000',
        'Over $2000',
        'Custom',
      ],
      unique: true,
    },
    size: {
      title: 'Size',
      values: ['All sizes', 'Small', 'Medium', 'Large', 'Oversized'],
      unique: true,
    },
    medium: {
      title: 'Medium',
      values: ['Oil', 'Watercolor', 'Acrylic', 'Ink', 'Gouache', 'Spraypaint'],
    },
    surface: {
      title: 'Surface',
      values: [
        'Stretched canvas',
        'Canvas board',
        'Wood',
        'Fabric',
        'Linen',
        'Paper',
      ],
    },
    subject: {
      title: 'Subject',
      values: [
        'Portrait',
        'Nature',
        'Street',
        'Beach',
        'Floral',
        'Vacation',
        'Tropical',
      ],
    },
    style: {
      title: 'Style',
      values: [
        'Abstract',
        'Cubist',
        'Expressoinist',
        'Folk',
        'Impressionist',
        'Minimalist',
        'Photorealist',
        'Pointillist',
        'Pop art',
        'Psychedelic',
        'Surrealist',
      ],
    },
  };

  // Price Value
  const [priceValue, setPriceValue] = React.useState(0);
  const [pricefilter, setPriceFilter] = React.useState({
    initialMin: 0,
    initialMax: 0,
    min: 0,
    max: 10000,
    step: 10,
  });
  const [filterInitialMin, setFilterInitialMin] = React.useState(0);
  const [filterInitialMax, setFilterInitialMax] = React.useState(0);
  const [minValue, setMinValue] = React.useState(0);
  const [maxValue, setMaxValue] = React.useState(10000);
  const [allWorks, setAllWorks] = useState<
    {
      id: string;
      data: WorkData & { forSale: true };
      imageURL: string;
    }[]
  >([]);
  const [works, setWorks] = useState<
    {
      id: string;
      data: WorkData & { forSale: true };
      imageURL: string;
    }[]
  >([]);
  const router = useRouter();
  const { username } = router.query;
  const [artistId, setArtistId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const app = getApp();
      const db = getFirestore(app);
      const artistIdSnapshot = await getDocs(
        query(collection(db, 'artists'), where('username', '==', username))
      );
      if (artistIdSnapshot.docs.length === 0) {
        throw new Error('user not found.');
      }
      const _artistId = artistIdSnapshot.docs[0].id;
      setArtistId(_artistId);

      console.log('artist ID', _artistId);
      const querySnapshot = await getDocs(
        query(
          collection(db, 'works'),
          where('artist', '==', _artistId),
          where('forSale', '==', true)
        )
      );
      const newWorks: {
        id: string;
        data: WorkData & { forSale: true };
        imageURL: string;
      }[] = [];
      await Promise.all(
        querySnapshot.docs.map(async (snapshot) => {
          const workData = snapshot.data() as WorkData & { forSale: true };
          newWorks.push({
            id: snapshot.id,
            data: workData,
            imageURL: await loadStorageImageSafe(workData.images[0]),
          });
          console.log(workData);
          if (!workData.forSale) {
            console.log('ALERT ALERT ^^^');
          }
        })
      );
      setAllWorks(newWorks);
      setWorks(newWorks);
      setLoading(false);
      console.log('Works: ', works);
    })();
  }, []);

  const loadMoreButton = (e: any, button_id: any) => {
    if (loadMore === button_id) {
      return (
        <button
          type={'button'}
          onClick={(e) => setLoadMore(null)}
          tw="-ml-4 py-2 px-5 flex gap-2 transition-all duration-300 relative z-10 rounded-full items-center hover:bg-gray-100 font-semibold"
        >
          {' '}
          <FiMinus /> <span>Show Fewer</span>
        </button>
      );
    } else {
      return (
        <button
          type={'button'}
          onClick={(e) => setLoadMore(button_id)}
          tw="-ml-4 py-2 px-5 flex gap-2 transition-all duration-300 relative z-10 rounded-full items-center hover:bg-gray-100 font-semibold"
        >
          {' '}
          <FiPlus /> <span>Show More</span>
        </button>
      );
    }
  };

  const getPortfolioMatch = (e: string) => {
    //console.log(e, portfolioData);
    const obj = portfolioData.Portfolios.find(
      (portfolio) => portfolio.name === e
    );
    if (obj) {
      const newWorks: {
        id: string;
        data: WorkData & { forSale: true };
        imageURL: string;
      }[] = [];
      //console.log(allWorks);
      allWorks.forEach((work) => {
        //console.log(obj.works, work.id, obj.works.includes(work.id))
        if (obj?.works.includes(work.id)) {
          console.log('adding to new work');
          newWorks.push(work);
        }
      });
      setWorks(newWorks);
    } else {
      setWorks(allWorks);
    }
    return;
  };

  return (
    <div>
      <Container tw="px-4 md:px-0 bg-white">
        {profileType === 3 && (
          <div tw="flex justify-center gap-6 md:gap-[140px] mt-4 md:mt-12">
            {portfolioData.Portfolios.map((portfolio, index) => (
              <div
                key={index}
                tw="cursor-pointer"
                onClick={() => {
                  setActiveIndex(activeIndex === index ? null : index);
                  // setCurGallery(
                  //   getGalleryData(
                  //     portfolioData,
                  //     activeIndex === index ? null : index
                  //   )
                  // );
                }}
              >
                <div
                  css={[
                    tw`relative rounded-full overflow-hidden origin-bottom border-transparent`,
                    activeIndex === index && tw`border-[#C6C5C3]`,
                    isMobile
                      ? tw`w-[60px] h-[60px] border-2`
                      : tw`w-[128px] h-[128px] border-4`,
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
        )}
        {/* Heading */}
        <div
          tw="flex items-center gap-x-3 md:gap-x-6 w-full"
          css={[
            profileType === 1 && tw`mt-3 md:mt-6`,
            profileType === 2 && tw`mt-4 md:mt-[52px]`,
            profileType === 3 && tw`mt-4 md:mt-12`,
          ]}
        >
          {/* Filter Button */}
          <div
            onClick={() => setFilterOpen(true)}
            tw="cursor-pointer flex items-center border border-[#D8D8D8] focus:border-[#A2A2A2] text-[#65676B]"
            css={[
              isMobile
                ? tw`w-[32px] h-[32px] rounded-full justify-center`
                : tw`gap-[10px] h-11 pl-[22px] pr-6 rounded-[40px]`,
            ]}
          >
            <img
              src="/assets/svgs/filter.svg"
              tw="w-4 h-4 md:w-auto md:h-auto"
            />
            {!isMobile && 'All Filters'}
          </div>
          {/* Search  */}
          {/*<CustomSearch />*/}
          {/* Portfolio for profile 1 and 2 */}
          {profileType !== 3 && !isMobile && (
            <Dropdown
              onChange={(event) => {
                getPortfolioMatch(event.target.value);
              }}
              appearance={tw`border-[#D8D8D8] rounded-[40px] pl-5 min-w-[160px] h-11 focus:border-[#A2A2A2] text-[#3C3C3C]`}
            >
              <option value="all">
                {profileType === 1 ? 'All Portfolios' : 'Category'}
              </option>
              {portfolioData.Portfolios.map((portfolio) => (
                <option value={portfolio.name} key={portfolio.name}>
                  {portfolio.name}
                </option>
              ))}
            </Dropdown>
          )}
          {/* Price Sort */}
          {/* <CustomSortBy /> */}
          {/*/!* Grid *!/*/}
          {/*<div tw="flex items-center text-2xl rounded border border-gray-200">*/}
          {/*  <span tw="px-4 py-2 cursor-pointer transition-all duration-300 text-gray-700 hover:text-black border-r border-gray-200">*/}
          {/*    <MdWidgets />*/}
          {/*  </span>*/}
          {/*  <span tw="px-4 py-2 cursor-pointer transition-all duration-300 text-gray-700 hover:text-black">*/}
          {/*    <BsGrid3X3GapFill />*/}
          {/*  </span>*/}
          {/*</div>*/}
        </div>

        {/* No Portfolio Found */}
        {!loading && works.length === 0 && (
          <div tw="text-[#3C3C3C] text-[12px] md:text-[16px] mt-4 md:mt-8">
            No works for sale
          </div>
        )}

        {/* Portfolio Gallery */}
        <div tw="mb-4 md:mb-[30px]">
          {!loading && <ProductCollection works={works} />}
        </div>
      </Container>

      <div>
        <div
          css={[
            tw`fixed bg-white max-w-full z-[99] transition-all duration-300`,
            isMobile ?
              (filterOpen ? tw`top-0` : tw`z-[-1] top-full`) :
              (filterOpen ? tw`left-0` : tw`-left-full`),
            isMobile ? tw`left-0 right-0` : tw`top-0 bottom-0`
          ]}
        >
          {filterOpen && <style>{`body {overflow: hidden}`}</style>}
          {!isMobile &&
            <button
              onClick={() => setFilterOpen(false)}
              className="close-icon group"
              tw="absolute rounded-full w-11 h-11 top-5 right-[-60px] flex items-center justify-center"
            >
              <div tw='w-0 transition-all duration-200 group-hover:w-full group-hover:h-full h-0 absolute bg-white/20 rounded-full z-[-1]' />
              <img
                src="/assets/svgs/close.svg"
                tw="w-4 h-4 m-auto"
                alt="close button"
              />
            </button>
          }

          {/* Filter Box */}
          <div tw='w-full md:w-[400px] max-h-[100vh] overflow-auto'>
            <div tw='p-8'>
              <div tw='flex w-full items-center justify-between'>
                <div tw='text-[32px] text-[#3C3C3C]'>Filters</div>
                {isMobile &&
                  <button tw="w-5 h-5" onClick={() => setFilterOpen(false)}>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.40898 7.99829L15.7044 1.71285C15.8926 1.52468 15.9983 1.26947 15.9983 1.00336C15.9983 0.737256 15.8926 0.482046 15.7044 0.293879C15.5162 0.105711 15.261 0 14.9949 0C14.7288 0 14.4736 0.105711 14.2854 0.293879L8 6.58932L1.71456 0.293879C1.52639 0.105711 1.27118 2.36263e-07 1.00507 2.38246e-07C0.738961 2.40229e-07 0.483751 0.105711 0.295584 0.293879C0.107417 0.482046 0.0017056 0.737256 0.0017056 1.00336C0.0017056 1.26947 0.107417 1.52468 0.295584 1.71285L6.59102 7.99829L0.295584 14.2837C0.201924 14.3766 0.127583 14.4872 0.0768515 14.6089C0.0261196 14.7307 0 14.8613 0 14.9932C0 15.1251 0.0261196 15.2558 0.0768515 15.3775C0.127583 15.4993 0.201924 15.6098 0.295584 15.7027C0.38848 15.7964 0.499001 15.8707 0.620772 15.9214C0.742543 15.9722 0.873154 15.9983 1.00507 15.9983C1.13699 15.9983 1.2676 15.9722 1.38937 15.9214C1.51114 15.8707 1.62166 15.7964 1.71456 15.7027L8 9.40727L14.2854 15.7027C14.3783 15.7964 14.4889 15.8707 14.6106 15.9214C14.7324 15.9722 14.863 15.9983 14.9949 15.9983C15.1268 15.9983 15.2575 15.9722 15.3792 15.9214C15.501 15.8707 15.6115 15.7964 15.7044 15.7027C15.7981 15.6098 15.8724 15.4993 15.9232 15.3775C15.9739 15.2558 16 15.1251 16 14.9932C16 14.8613 15.9739 14.7307 15.9232 14.6089C15.8724 14.4872 15.7981 14.3766 15.7044 14.2837L9.40898 7.99829Z"
                        fill="#3C3C3C"
                      />
                    </svg>
                  </button>
                }
              </div>
              <div tw='mt-6 flex flex-col gap-y-7'>
                <FilterCategory {...filters['portfolio']} />
                <FilterCategory {...filters['price']} isPrice />
                <FilterCategory {...filters['size']} />
                <FilterCategory {...filters['medium']} />
                <FilterCategory {...filters['surface']} />
                <FilterCategory {...filters['subject']} />
                <FilterCategory {...filters['style']} />
              </div>
            </div>
            <div tw="sticky w-full bottom-0 bg-white">
              <div tw='h-[0.5px] bg-[#E3E3E3]' />
              <div tw='px-4 flex w-full px-8 py-5 gap-x-3'>
                <button
                  onClick={() => setFilterOpen(false)}
                  css={[buttons.white, tw`w-full h-10`]}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setFilterOpen(false)}
                  css={[buttons.red, tw`w-full h-10`]}
                >
                  Apply
                </button>
              </div>
            </div>
            <div css={[!filterOpen && tw`w-full h-full bg-white z-50`]} />
          </div>
        </div>
        {!isMobile &&
          <span
            onClick={() => setFilterOpen(false)}
            css={[
              tw`fixed z-[98] left-0 top-0 bottom-0 bg-[rgba(34,34,34,0.65)]`,
              filterOpen && tw`w-full`,
            ]}
          ></span>
        }
      </div>
      {/* <DrawerFilter drawerToggle={drawerToggle} handleCloseFilter={handleCloseFilter}/> */}
    </div>
  );
};
/*
ALGOLIA BASED SEARCH
return (
    <>
      <h1>Store</h1>

      <InstantSearch searchClient={algoliaSearchClient} indexName="pkazo-works">
        <Configure
          facetFilters={[
            `artist:${artistId || 'notarealartist'}`,
            'forSale:true',
          ]}
        />
        <div>
          <Container tw="px-4 md:px-0">
            {profileType === 3 && (
              <div tw="flex justify-center gap-6 md:gap-[140px] mt-4 md:mt-12">
                {portfolioData.Portfolios.map((portfolio, index) => (
                  <div
                    key={index}
                    tw="cursor-pointer"
                    onClick={() => {
                      setActiveIndex(activeIndex === index ? null : index);
                      // setCurGallery(
                      //   getGalleryData(
                      //     portfolioData,
                      //     activeIndex === index ? null : index
                      //   )
                      // );
                    }}
                  >
                    <div
                      css={[
                        tw`relative rounded-full overflow-hidden origin-bottom border-transparent`,
                        activeIndex === index && tw`border-[#C6C5C3]`,
                        isMobile
                          ? tw`w-[60px] h-[60px] border-2`
                          : tw`w-[128px] h-[128px] border-4`,
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
            )}
            <div
              tw="flex items-center gap-x-3 md:gap-x-6 w-full"
              css={[
                profileType === 1 && tw`mt-3 md:mt-6`,
                profileType === 2 && tw`mt-4 md:mt-[52px]`,
                profileType === 3 && tw`mt-4 md:mt-12`,
              ]}
            >
              <div
                onClick={() => setFilterOpen(true)}
                tw="cursor-pointer flex items-center border border-[#D8D8D8] focus:border-[#A2A2A2] text-[#65676B]"
                css={[
                  isMobile
                    ? tw`w-[32px] h-[32px] rounded-full justify-center`
                    : tw`gap-[10px] h-11 pl-[22px] pr-6 rounded-[40px]`,
                ]}
              >
                <img
                  src="/assets/svgs/filter.svg"
                  tw="w-4 h-4 md:w-auto md:h-auto"
                />
                {!isMobile && 'All Filters'}
              </div>
              <CustomSearch />
              {profileType !== 3 && !isMobile && (
                <Dropdown
                  onChange={(event) => event.target.value}
                  appearance={tw`border-[#D8D8D8] rounded-[40px] pl-5 min-w-[160px] h-11 focus:border-[#A2A2A2] text-[#3C3C3C]`}
                >
                  <option value="all">
                    {profileType === 1 ? 'All Portfolios' : 'Category'}
                  </option>
                  {portfolioData.Portfolios.map((portfolio) => (
                    <option value={portfolio.name} key={portfolio.name}>
                      {portfolio.name}
                    </option>
                  ))}
                </Dropdown>
              )}
             
              <CustomSortBy />
              
            </div>

            {!loading && works.length === 0 && (
              <div tw="text-[#3C3C3C] text-[12px] md:text-[16px] mt-4 md:mt-8">
                No works for sale
              </div>
            )}

            <div tw="mb-4 md:mb-[30px]">{!loading && <CustomHits />}</div>
            <h1>Works Found</h1>
          </Container>

          {!isMobile && (
            <div>
              <div
                css={[
                  tw`fixed top-0 bg-white bottom-0 max-w-full w-[400] 2xl:w-[480px] z-[99] -left-full transition-all duration-300`,
                  filterOpen && tw`left-0`,
                ]}
              >
                <span
                  onClick={() => setFilterOpen(false)}
                  className="close-icon"
                  tw="before:content-[''] before:w-0 before:transition-all before:duration-300 hover:before:w-full hover:before:h-full before:h-0 before:absolute before:bg-white/20 before:rounded-full before:z-[-1] absolute text-white cursor-pointer rounded-full flex items-center justify-center text-3xl w-[50px] h-[50px] top-5 right-[-60px]"
                >
                  <FiX />
                </span>

                <div>
                  <div tw="overflow-auto pr-14 m-6 h-[calc(100vh-120px)]">
                    <h2 tw="text-3xl font-bold mb-4">Filters</h2>

                    <ul tw={'pl-6'}>
                      <div></div>

                      <CustomRefinementGroup attribute={'medium'} />
                      <CustomRefinementGroup attribute={'year'} />
                      <CustomRefinementGroup
                        attribute={'sale.color'}
                        title={'Color'}
                      />
                      <CustomRefinementGroup attribute={'dimensions'} />
                    </ul>
                  </div>
        <div>
          <div
            css={[
              tw`fixed bg-white max-w-full z-[99] transition-all duration-300`,
              isMobile ?
                (filterOpen ? tw`bottom-0` : tw`-bottom-full`) :
                (filterOpen ? tw`left-0` : tw`-left-full`),
              isMobile ? tw`left-0 right-0` : tw`top-0 bottom-0`
            ]}
          >
            {filterOpen && <style>{`body {overflow: hidden}`}</style>}
            {!isMobile &&
              <span
                onClick={() => setFilterOpen(false)}
                className="close-icon"
                tw="before:content-[''] before:w-0 before:transition-all before:duration-300 hover:before:w-full hover:before:h-full before:h-0 before:absolute before:bg-white/20 before:rounded-full before:z-[-1] absolute text-white cursor-pointer rounded-full flex items-center justify-center text-3xl w-[50px] h-[50px] top-5 right-[-60px]"
              >
                <FiX />
              </span>
            }

            
          )}
        </div>
      </InstantSearch>
    </>
          </div>
          {!isMobile &&
            <span
              onClick={() => setFilterOpen(false)}
              css={[
                tw`fixed z-[98] left-0 top-0 bottom-0 bg-[rgba(34,34,34,0.65)]`,
                filterOpen && tw`w-full`,
              ]}
            ></span>
          }
        </div>
      </div>
    </InstantSearch>
  );
};
*/

export default StorePortFolio;
