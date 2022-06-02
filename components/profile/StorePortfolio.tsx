import React, { useEffect, useState } from 'react';
import { FiDollarSign, FiMinus, FiPlus, FiSearch } from 'react-icons/fi';
import {
  BsSliders,
  BsChevronCompactDown,
  BsGrid3X3GapFill,
} from 'react-icons/bs';
import { MdWidgets } from 'react-icons/md';
import { FiX } from 'react-icons/fi';
import Image from 'next/image';
import tw, { styled } from 'twin.macro';
import Masonry from 'react-masonry-css';
import styles from '../../styles/ProfilePortfolio.module.css';

import { Container } from 'pages/[username]/index';
import Img01 from 'public/assets/images/portfolios/pf1/1.jpeg';
import Img02 from 'public/assets/images/portfolios/pf1/2.jpeg';
import Img03 from 'public/assets/images/portfolios/pf2/3.jpeg';
import Img04 from 'public/assets/images/portfolios/pf3/4.jpeg';
import Img05 from 'public/assets/images/portfolios/pf4/2.jpeg';
import Img06 from 'public/assets/images/portfolios/pf5/7.jpeg';
import { WorkData } from '../../types/firebaseTypes';
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
          <div tw="w-full">
            <form
              action=""
              tw="relative px-4 flex items-center border border-gray-200 rounded-full w-full"
            >
              <FiSearch tw="text-gray-400" />
              <input
                type="text"
                tw="py-2 px-4 outline-none shadow-none w-full"
                placeholder="Search"
              />
            </form>
          </div>
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
                        Top Customzer Reviews
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
          {/* Grid */}
          <div tw="flex items-center text-2xl rounded border border-gray-200">
            <span tw="px-4 py-2 cursor-pointer transition-all duration-300 text-gray-700 hover:text-black border-r border-gray-200">
              <MdWidgets />
            </span>
            <span tw="px-4 py-2 cursor-pointer transition-all duration-300 text-gray-700 hover:text-black">
              <BsGrid3X3GapFill />
            </span>
          </div>
        </div>

        {/* Portfolio Found */}
        <div tw="mb-5">
          <p tw="text-gray-600 text-lg">20 works for sale</p>
        </div>

        {/* Portfolio Gallery */}
        <div tw="mb-10">
          <Masonry
            breakpointCols={{ default: 4, 1024: 3, 640: 2 }}
            className={styles['my-masonry-grid']}
            columnClassName={styles['my-masonry-grid_column']}
          >
            {/* Single Portfolio */}
            {works.map(({ id, data: work, imageURL }, i) => (
              <a key={id} tw={'cursor-pointer my-[18px]'} href={'/work/' + id}>
                <div tw="w-full mb-6">
                  <img src={imageURL} alt="Image Alt" />
                </div>
                <div>
                  <h4>{work.title}</h4>
                  <div tw="flex items-center justify-between">
                    <p tw="text-gray-600">{work.medium}</p>
                    <strong>${work.sale.price}</strong>
                  </div>
                </div>
              </a>
            ))}
          </Masonry>
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

              <ul tw="pl-6">
                {filters.category && (
                  <li>
                    <h3 tw="mb-3 font-bold text-lg">
                      {filters.category.heading}
                    </h3>
                    <ListCheckGroup tw="mb-5">
                      {loadmore === 'load-more--category'
                        ? filters.category.list.map((item, idx) => (
                            <li key={idx}>
                              <div className="check-group">
                                <input
                                  type="checkbox"
                                  id={`check-category-id--${idx}`}
                                  name={`check-category-id--${idx}`}
                                />
                                <label
                                  htmlFor={`check-category-id--${idx}`}
                                  className="check-label"
                                >
                                  {item.label}
                                </label>
                              </div>
                            </li>
                          ))
                        : filters.category.list.slice(0, 5).map((item, idx) => (
                            <li key={idx}>
                              <div className="check-group">
                                <input
                                  type="checkbox"
                                  id={`check-category-id--${idx}`}
                                  name={`check-category-id--${idx}`}
                                />
                                <label
                                  htmlFor={`check-category-id--${idx}`}
                                  className="check-label"
                                >
                                  {item.label}
                                </label>
                              </div>
                            </li>
                          ))}
                      <li>
                        <div className="show-more-button">
                          {loadMoreButton(
                            (event: any) => event,
                            'load-more--category'
                          )}
                        </div>
                      </li>
                    </ListCheckGroup>
                  </li>
                )}
                {filters.price && (
                  <li className="filter__cat-item">
                    <h3 tw="mb-3 font-bold text-lg">{filters.price.heading}</h3>

                    <div>
                      <form tw="flex bg-gray-100 rounded-xl px-3 items-center justify-center relative border border-gray-200/50">
                        <FiDollarSign />
                        <input
                          type="number"
                          value={priceValue}
                          onChange={(e: any) => setPriceValue(e.target.value)}
                          placeholder="United States Dollar"
                          tw="py-3 px-4 bg-transparent outline-none w-full"
                        />
                      </form>

                      {/* Filter Slider */}
                      <div tw="relative bg-gray-200 block h-1 rounded-md my-6">
                        <div
                          tw="block absolute h-1 bg-red-600 rounded"
                          ref={progressRef}
                        ></div>
                        <div tw="relative">
                          <input
                            type="range"
                            tw="absolute w-full top-0 h-1 bg-transparent appearance-none pointer-events-none"
                            value={minValue}
                            onChange={handleMin}
                            min={min}
                            step={step}
                            max={max}
                          />
                          <input
                            type="range"
                            tw="absolute w-full top-0 h-1 bg-transparent appearance-none pointer-events-none"
                            onChange={handleMax}
                            value={maxValue}
                            min={min}
                            step={step}
                            max={max}
                          />
                        </div>
                        <div className="price-filter__slider"></div>
                      </div>

                      {/* price Filter Bottom */}
                      <PriceFilterDimension>
                        <input
                          type="number"
                          value={minValue}
                          onChange={(e: any) => setMinValue(e.target.value)}
                          tw="border border-gray-200 px-3 max-w-[4em] w-[4em] text-center py-2 rounded-lg text-gray-600 text-xl font-semibold"
                        />
                        <span className="font-regular text-lg">to</span>
                        <input
                          type="number"
                          value={maxValue}
                          onChange={(e: any) => setMaxValue(e.target.value)}
                          tw="border border-gray-200 px-3 max-w-[4em] w-[4em] text-center py-2 rounded-lg text-gray-600 text-xl font-semibold"
                        />
                      </PriceFilterDimension>
                    </div>

                    <ListCheckGroup tw="mb-5">
                      {filters.price.list.map((item, idx) => (
                        <li key={idx}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              id={`check.price-id--${idx}`}
                              name="shop-price"
                            />
                            <label
                              htmlFor={`check.price-id--${idx}`}
                              className="form-check-label"
                            >
                              {item.label}
                            </label>
                          </div>
                        </li>
                      ))}
                      <li>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="custom-shop-price"
                            name="shop-price"
                          />
                          <label
                            htmlFor="custom-shop-price"
                            className="form-check-label"
                          >
                            Custom price
                          </label>
                        </div>
                        <div tw="pl-5 pt-2">
                          <input
                            type="text"
                            tw="rounded-lg text-sm placeholder:text-gray-600 py-2 px-4 bg-gray-100/50 shadow-sm border border-gray-200/50"
                            placeholder="Custom Location"
                          />
                        </div>
                      </li>
                    </ListCheckGroup>
                  </li>
                )}

                {filters.subject && (
                  <li className="filter__cat-item">
                    <h3 tw="mb-3 font-bold text-lg">
                      {filters.subject.heading}
                    </h3>
                    <ListCheckGroup tw="mb-5">
                      {loadmore === 'load-more--subject'
                        ? filters.subject.list.map((item, idx) => (
                            <li key={idx}>
                              <div className="check-group">
                                <input
                                  type="checkbox"
                                  id={`check-subject-id--${idx}`}
                                  name={`check-subject-id--${idx}`}
                                />
                                <label
                                  htmlFor={`check-subject-id--${idx}`}
                                  className="check-label"
                                >
                                  {item.label}
                                </label>
                              </div>
                            </li>
                          ))
                        : filters.subject.list.slice(0, 5).map((item, idx) => (
                            <li key={idx}>
                              <div className="check-group">
                                <input
                                  type="checkbox"
                                  id={`check-subject-id--${idx}`}
                                  name={`check-subject-id--${idx}`}
                                />
                                <label
                                  htmlFor={`check-subject-id--${idx}`}
                                  className="check-label"
                                >
                                  {item.label}
                                </label>
                              </div>
                            </li>
                          ))}
                      <li>
                        <div className="show-more-button">
                          {loadMoreButton(
                            (event: any) => event,
                            'load-more--subject'
                          )}
                        </div>
                      </li>
                    </ListCheckGroup>
                  </li>
                )}

                {filters.style && (
                  <li className="filter__cat-item">
                    <h3 tw="mb-3 font-bold text-lg">{filters.style.heading}</h3>
                    <ListCheckGroup tw="mb-5">
                      {loadmore === 'load-more-style'
                        ? filters.style.list.map((item, idx) => (
                            <li key={idx}>
                              <div className="check-group">
                                <input
                                  type="checkbox"
                                  id={`check.style-id--${idx}`}
                                  name={`check.style-id--${idx}`}
                                />
                                <label
                                  htmlFor={`check.style-id--${idx}`}
                                  className="check-label"
                                >
                                  {item.label}
                                </label>
                              </div>
                            </li>
                          ))
                        : filters.style.list.slice(0, 5).map((item, idx) => (
                            <li key={idx}>
                              <div className="check-group">
                                <input
                                  type="checkbox"
                                  id={`check.style-id--${idx}`}
                                  name={`check.style-id--${idx}`}
                                />
                                <label
                                  htmlFor={`check.style-id--${idx}`}
                                  className="check-label"
                                >
                                  {item.label}
                                </label>
                              </div>
                            </li>
                          ))}
                      <li>
                        <div className="show-more-button">
                          {loadMoreButton(
                            (event: any) => event,
                            'load-more-style'
                          )}
                        </div>
                      </li>
                    </ListCheckGroup>
                  </li>
                )}

                {filters.location && (
                  <li className="filter__cat-item">
                    <h3 tw="mb-3 font-bold text-lg">
                      {filters.location.heading}
                    </h3>
                    <ListCheckGroup tw="mb-5">
                      {filters.location.list.map((item, idx) => (
                        <li key={idx}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              id={`check.location-id--${idx}`}
                              name="shop-location"
                            />
                            <label
                              htmlFor={`check.location-id--${idx}`}
                              className="form-check-label"
                            >
                              {item.label}
                            </label>
                          </div>
                        </li>
                      ))}
                      <li>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            id="custom-shop-location"
                            name="shop-location"
                          />
                          <label
                            htmlFor="custom-shop-location"
                            className="form-check-label"
                          >
                            Custom Location
                          </label>
                        </div>
                        <div tw="pl-5 pt-2">
                          <input
                            type="text"
                            tw="rounded-lg text-sm placeholder:text-gray-600 py-2 px-4 bg-gray-100/50 shadow-sm border border-gray-200/50"
                            placeholder="Custom Location"
                          />
                        </div>
                      </li>
                    </ListCheckGroup>
                  </li>
                )}

                {filters.itemType && (
                  <li className="filter__cat-item">
                    <h3 tw="mb-3 font-bold text-lg">
                      {filters.itemType.heading}
                    </h3>
                    <ListCheckGroup tw="mb-5">
                      {filters.itemType.list.map((item, idx) => (
                        <li key={idx}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              id={`check.itemType-id--${idx}`}
                              name="shop-itemType"
                            />
                            <label
                              htmlFor={`check.itemType-id--${idx}`}
                              className="form-check-label"
                            >
                              {item.label}
                            </label>
                          </div>
                        </li>
                      ))}
                    </ListCheckGroup>
                  </li>
                )}

                {/* {Filter.map((cat, idx) => (
                            <li key={idx} className="filter__cat-item">
                                <h3 className="mb-3 font-bold text-lg">{cat.heading}</h3>
                                {cat.radio_check ?                                 
                                    <ul className="list-checkgroup mb-5">
                                        {cat.list.map((item, subidx) => (
                                            <li key={subidx}>
                                                <div className='check-group'>
                                                    <input type="radio" id={`check-${idx}--${subidx}`} name={`check-color`} />
                                                    <label htmlFor={`check-${idx}--${subidx}`} style={{ [ '--checkbg' as any]: item.code }} className={`checkbtn ${item.code ? "color-check" : ""}`}>{item.label}</label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    :    
                                    <ul className="list-checkgroup mb-5">
                                        {cat.list.map((item, subidx) => (
                                            <li key={subidx}>
                                                <div className='check-group'>
                                                    <input type="checkbox" id={`check-${idx}--${subidx}`} name={`check-${idx}--${subidx}`} />
                                                    <label htmlFor={`check-${idx}--${subidx}`} className="checkbtn">{item.label}</label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                }
                            </li>
                            ))} */}
              </ul>
            </div>

            {/* Action Area */}
            <div tw="px-4 lg:px-10 flex gap-4 border-t py-3">
              <button tw="py-2 w-full rounded-full px-4 transition-all duration-300 border-2 font-bold border-red-600 text-red-600 hover:bg-red-600 hover:text-white">
                Cancel
              </button>
              <button tw="py-2 w-full rounded-full px-4 transition-all duration-300 font-bold bg-red-500 text-white hover:bg-red-600">
                Apply Filters
              </button>
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
  );
};

export default StorePortFolio;
