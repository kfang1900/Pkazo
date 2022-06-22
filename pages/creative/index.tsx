import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import Header from '../../components/Header';
import 'twin.macro';
import { FiX } from 'react-icons/fi';
import MultiRangeSlider from 'components/multiRangeSlider';
const Creative: NextPage = () => {
    const [openFilter, setOpenFilter] = React.useState(false);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    }
    const handleCloseFilter = () => {
        setOpenFilter(false);
    }

    const filters = [
        {
            id: 'portfolio',
            label: 'Portfolio',
            list: [
                {
                    name: "Moonchild",
                },
                {
                    name: "Baba Yaga",
                },
                {
                    name: "I love Chicken",
                },
                {
                    name: "Me too",
                },
                {
                    name: "KFC for life!",
                },
            ],
        },
        {
            id: 'price',
            label: 'Price',
            list: [
                {
                    name: "Under $200",
                },
                {
                    name: "$200 to $500",
                },
                {
                    name: "$500 to $2000",
                },
                {
                    name: "Over $2000",
                },
                {
                    name: "Custom",
                    range: {
                        min: 0,
                        max: 100,
                    }
                },
            ],
        },
        {
            id: 'size',
            label: 'Size',
            list: [
                {
                    name: "Small",
                },
                {
                    name: "Medium",
                },
                {
                    name: "Large",
                },
                {
                    name: "Oversized",
                },
            ],
        },
    ]

    return (
        <>
            <Header />
            <div className={styles.container}>
                <Head>
                    <title>Pkazo</title>
                    <meta name="description" content="" />
                    <link rel="icon" href="/favicon.ico" />
                </Head>

                <div>
                    <div>
                        <button onClick={handleOpenFilter} className="btn btn">Open Filter</button>
                    </div>
                </div>

                {/* Filter */}
                {openFilter &&
                    <div tw='fixed bg-black bg-opacity-50 w-full h-screen top-0 left-[0px] z-50'>
                        <div tw='inline-block h-full w-full max-w-[350px] relative'>
                            <span onClick={handleCloseFilter} tw='text-[30px] cursor-pointer absolute top-4 text-white right-[-2.5rem]'><FiX /></span>

                            <div tw='w-full bg-white h-full overflow-x-hidden p-8'>
                                <h2 tw='text-[32px] mb-6 text-[#3C3C3C] font-semibold font-open-sans'>Filters</h2>
                                <div>
                                    {filters && filters.map((group, idx) => (
                                        <ul tw='mb-5' key={idx}>
                                            {/* Heading */}
                                            {group.label && <li tw="text-[18px] font-bold mb-2 text-[#3C3C3C] font-open-sans">{group.label}</li>}
                                            {/* List */}
                                            {group.list.map((item, id) => (
                                                <li key={id} tw=''>
                                                    <div>
                                                        <input type="radio" id={`filter-item-${group.id}-${id}`} name={`filter-item-${group.id}-${idx}`} value="Bike" />
                                                        <label tw='pl-2 leading-9 cursor-pointer' htmlFor={`filter-item-${group.id}-${id}`}>{item.name}</label>
                                                    </div>
                                                    {item.range && <div tw='pt-4 pb-14'>
                                                        <MultiRangeSlider min={0} max={1000} />
                                                    </div>}
                                                </li>
                                            ))}
                                        </ul>
                                    ))}

                                    <div tw='flex gap-3'>
                                        <button onClick={handleCloseFilter} tw="border w-full border-[#8E8E93] bg-white text-[#3C3C3C] h-[37px] text-[14px] font-semibold leading-[21px] rounded-full hover:bg-dark-400 hover:text-white transition-all duration-300 flex justify-center items-center">Cancel</button>
                                        <button tw="border w-full border-[#E44C4D] bg-[#E44C4D] text-white h-[37px] text-[14px] font-semibold leading-[21px] rounded-full hover:bg-white hover:text-[#E44C4D] transition-all duration-300 flex justify-center items-center">Apply</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                }
            </div>
        </>
    );
};

export default Creative;
