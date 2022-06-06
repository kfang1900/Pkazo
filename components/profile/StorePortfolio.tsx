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

import { Container } from 'pages/[username]/index';
import { WorkData } from '../../types/dbTypes';
import useAuth from '../../utils/useAuth';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { loadStorageImage } from '../../helpers/FirebaseFunctions';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  RefinementList,
  SearchBox,
  Hits,
  useSearchBox,
  Configure,
} from 'react-instantsearch-hooks-web';
import CustomSearch from './store/CustomSearch';
import Hit from './store/Hit';
import CustomHits from './store/CustomHits';
import CustomRefinementGroup from './store/CustomRefinementList';
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

const searchClient = algoliasearch(
  'C7MS0BD8WG',
  '6a66c7b3a0c0cf3d52edb60146226383'
);

const PriceFilterDimension = styled.div`
  ${tw`py-3 flex justify-between items-center`}
  input[type="number"]::-webkit-outer-spin-button,input[type="number"]::-webkit-inner-spin-button {
    ${tw`appearance-none`}
  }
`;

const filters = {
  category: {
    heading: 'Category',
    list: [
      {
        label: 'Oil',
      },
      {
        label: 'Watercolor',
      },
      {
        label: 'Acrylic',
      },
      {
        label: 'Spray Paint',
      },
      {
        label: 'Ink',
      },
      {
        label: 'Gouache',
      },
    ],
  },

  subject: {
    heading: 'Subject',
    list: [
      {
        label: 'Abstract',
      },
      {
        label: 'Land',
      },
      {
        label: 'Sea',
      },
      {
        label: 'People',
      },
      {
        label: 'Food',
      },
      {
        label: 'Pop',
      },
      {
        label: 'Abstract & geometric',
      },
      {
        label: 'Anime & cartoon',
      },
      {
        label: 'Architecture & cityscape',
      },
      {
        label: 'Beach & tropical',
      },
      {
        label: 'Comics & manga',
      },
      {
        label: 'Flowers',
      },
      {
        label: 'Geography & locale',
      },
      {
        label: 'Love & friendship',
      },
      {
        label: 'Love & friendship',
      },
    ],
  },

  style: {
    heading: 'Style',
    list: [
      {
        label: 'Fine Art',
      },
      {
        label: 'Figurative',
      },
      {
        label: 'Realism',
      },
      {
        label: 'Modern',
      },
      {
        label: 'Expressionism',
      },
      {
        label: 'Impressionism',
      },
    ],
  },

  location: {
    heading: 'Shop Location',
    list: [
      {
        label: 'Any where',
      },
      {
        label: 'Usa',
      },
      {
        label: 'Bangladesh',
      },
    ],
  },

  itemType: {
    heading: 'Item Type',
    list: [
      {
        label: 'All Items',
      },
      {
        label: 'Hand Made',
      },
      {
        label: 'Vintage',
      },
    ],
  },

  price: {
    heading: 'Price ($)',
    radio_check: true,
    list: [
      {
        label: 'Any price',
      },
      {
        label: 'Under USD 25',
      },
      {
        label: 'USD 25 to USD 50',
      },
      {
        label: 'USD 50 to USD 100',
      },
      {
        label: 'Over USD 100',
      },
    ],
  },

  color: {
    heading: 'Color',
    radio_check: true,
    list: [
      {
        label: 'Black and White',
        code: '#090909',
      },
      {
        label: 'Red',
        code: '#FF3A3A',
      },
      {
        label: 'Orange',
        code: '#FFA944',
      },
      {
        label: 'Green',
        code: '#A7FF72',
      },
      {
        label: 'Purple',
        code: '#F095FF',
      },
    ],
  },
};

const StorePortFolio = () => {
  const [open, setOpen] = React.useState(false);
  const [loadmore, setLoadmore] = React.useState(null);

  const [sortDropdown, setSortDropdown] = React.useState(false);
  const [sortValueDropdown, setSortValueDropdown] =
    React.useState('Low to High');

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
  const [works, setWorks] = useState<
    {
      id: string;
      data: WorkData & { forSale: true };
      imageURL: string;
    }[]
  >([]);

  const { artistId } = useAuth();

  useEffect(() => {
    (async () => {
      const app = getApp();
      const db = getFirestore(app);
      const querySnapshot = await getDocs(
        query(
          collection(db, 'works'),
          where('artist', '==', artistId),
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
            imageURL: await loadStorageImage(workData.images[0]),
          });
          console.log(workData);
          if (!workData.forSale) {
            console.log('ALERT ALERT ^^^');
          }
        })
      );
      setWorks(newWorks);
    })();
  }, []);

  const progressRef = React.useRef(null);

  const { initialMin, initialMax, min, max, step } = pricefilter;

  const handleMin = (event: any) => {
    const a = 69;
  };
  const handleMax = (event: any) => {
    const a = 69;
  };

  // React.useEffect(() => {
  //   progressRef.current.style.left = (minValue / max) * step + '%';
  //   progressRef.current.style.right = step - (maxValue / max) * step + '%';

  // }, []);

  // const drawerToggle = React.useRef('');

  const handleOpenFilter = () => {
    // drawerToggle.classList.add("open");
    setOpen(true);
  };
  const handleCloseFilter = () => {
    // drawerToggle.classList.remove("open");
    setOpen(false);
  };
  const handleDropdownClick = (event: any, getValue: any) => {
    event.preventDefault();
    setSortValueDropdown(getValue);
    setSortDropdown(false);
  };

  const handleLoadMore = (event: any, getID: any) => {
    event.preventDefault();
    setLoadmore(getID);
  };
  const loadMoreButton = (e: any, button_id: any) => {
    if (loadmore === button_id) {
      return (
        <button
          onClick={(e) => handleLoadMore(e, null)}
          tw="-ml-4 py-2 px-5 flex gap-2 transition-all duration-300 relative z-10 rounded-full items-center hover:bg-gray-100 font-semibold"
        >
          {' '}
          <FiMinus /> <span>Show Fewer</span>
        </button>
      );
    } else {
      return (
        <button
          onClick={(e) => handleLoadMore(e, button_id)}
          tw="-ml-4 py-2 px-5 flex gap-2 transition-all duration-300 relative z-10 rounded-full items-center hover:bg-gray-100 font-semibold"
        >
          {' '}
          <FiPlus /> <span>Show More</span>
        </button>
      );
    }
  };
  return (
    <InstantSearch searchClient={searchClient} indexName="pkazo-works">
      <Configure facetFilters={[`artist:${artistId}`, 'forSale:true']} />
      <div>
        <Container>
          {/* Heading */}
          <div tw="mb-10 flex items-center gap-3 gap-x-10">
            {/* Filter Button */}
            <div
              onClick={handleOpenFilter}
              tw="cursor-pointer flex items-center gap-3 py-2 px-8 border border-gray-200 rounded-full"
            >
              <BsSliders tw="text-2xl" />
              <span tw="text-lg">Filters</span>
            </div>
            {/* Search  */}
            <CustomSearch />
            {/* Price Sort */}
            <div>
              <div tw="relative">
                <span
                  onClick={() => setSortDropdown(true)}
                  tw="border border-gray-200 rounded-xl flex items-center cursor-pointer gap-4 py-2 px-6"
                >
                  <span tw="whitespace-nowrap">
                    Price: <strong>{sortValueDropdown}</strong>
                  </span>
                  <BsChevronCompactDown tw="text-gray-400" />
                </span>
                {sortDropdown && (
                  <>
                    <div
                      onClick={() => setSortDropdown(false)}
                      tw="w-full h-full fixed left-0 top-0 z-10"
                    ></div>
                    <ul tw="bg-white rounded-b-xl border-b border-l border-r border-gray-200 z-40 left-0 right-0 absolute top-9">
                      <li>
                        <a
                          onClick={(e: any) =>
                            handleDropdownClick(e, 'Relevancy')
                          }
                          tw="block px-6 leading-10 hover:bg-gray-100 text-sm"
                          href="#"
                        >
                          Relevancy
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e: any) =>
                            handleDropdownClick(e, 'Lowest Price')
                          }
                          tw="block px-6 leading-10 hover:bg-gray-100 text-sm"
                          href="#"
                        >
                          Lowest Price
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e: any) =>
                            handleDropdownClick(e, 'Highest Price')
                          }
                          tw="block px-6 leading-10 hover:bg-gray-100 text-sm"
                          href="#"
                        >
                          Highest Price
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e: any) =>
                            handleDropdownClick(e, 'Top Customzer Reviews')
                          }
                          tw="block px-6 leading-10 hover:bg-gray-100 text-sm"
                          href="#"
                        >
                          Top Customer Reviews
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={(e: any) =>
                            handleDropdownClick(e, 'Most Recent')
                          }
                          tw="block px-6 leading-10 hover:bg-gray-100 text-sm"
                          href="#"
                        >
                          Most Recent
                        </a>
                      </li>
                    </ul>
                  </>
                )}
              </div>
            </div>
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

          {/* Portfolio Found */}
          <div tw="mb-5">
            <p tw="text-gray-600 text-lg">
              {works.length} work{works.length !== 1 ? 's' : ''} for sale
            </p>
          </div>

          {/* Portfolio Gallery */}
          <div tw="mb-10">
            <CustomHits />
          </div>
        </Container>

        <div>
          <div
            css={[
              tw`fixed top-0 bg-white bottom-0 max-w-full w-[400] 2xl:w-[480px] z-[99] -left-full transition-all duration-300`,
              open && tw`left-0`,
            ]}
          >
            <span
              onClick={handleCloseFilter}
              className="close-icon"
              tw="before:content-[''] before:w-0 before:transition-all before:duration-300 hover:before:w-full hover:before:h-full before:h-0 before:absolute before:bg-white/20 before:rounded-full before:z-[-1] absolute text-white cursor-pointer rounded-full flex items-center justify-center text-3xl w-[50px] h-[50px] top-5 right-[-60px]"
            >
              <FiX />
            </span>

            {/* Filter Box */}
            <div>
              <div tw="overflow-auto pr-14 m-6 h-[calc(100vh-120px)]">
                <h2 tw="text-3xl font-bold mb-4">Filters</h2>

                <ul tw={'pl-6'}>
                  <div>{/* TODO: put the price refinement in here */}</div>

                  <CustomRefinementGroup attribute={'medium'} />
                  <CustomRefinementGroup attribute={'year'} />
                  <CustomRefinementGroup
                    attribute={'sale.color'}
                    title={'Color'}
                  />
                  <CustomRefinementGroup attribute={'dimensions'} />
                </ul>
              </div>
            </div>
          </div>
          <span
            onClick={handleCloseFilter}
            css={[
              tw`fixed z-[98] left-0 top-0 bottom-0 bg-[rgba(34,34,34,0.65)]`,
              open && tw`w-full`,
            ]}
          ></span>
        </div>

        {/* <DrawerFilter drawerToggle={drawerToggle} handleCloseFilter={handleCloseFilter}/> */}
      </div>
    </InstantSearch>
  );
};

export default StorePortFolio;