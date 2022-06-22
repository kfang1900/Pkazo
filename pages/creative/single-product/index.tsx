import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import Header from '../../../components/Header';
import ProductImageGallery from './productImageGallery';
import ProductUserThumb from '../images/james-jean.png';


import 'twin.macro';
import Faq from './faq';
import Ratings from './ratings';
import Shipping from './shipping';
const SingleProduct: NextPage = () => {
    const [open, setOpen] = React.useState(`accordion-item--3`);

    const handleOpen = (getID: any) => {
        setOpen(getID);
    }

    const sampleAccordionData = [
        {
            title: "Shipping and return policies ",
            content: "Lorem ipsum dolor amet gastropub church-key gentrify actually tacos."
        },
        {
            title: "FAQs",
            content: "Slow-carb knausgaard health goth kombucha tousled four loko. Messenger bag cronut +1."
        },
        {
            title: "Contact James Jean",
            content: "Health goth humblebrag live-edge meggings pork belly actually ugh kombucha banh mi plaid etsy waistcoat."
        },
    ];

    return (
        <>

            <Header />
            <Head>
                <title>Pkazo</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main tw="px-4 lg:px-16 py-12">
                <div tw='lg:grid lg:grid-cols-12 gap-10 lg:gap-4'>

                    {/* Product Images Gallery */}
                    <div tw='lg:col-span-8 lg:pr-[8rem]'>
                        <ProductImageGallery />

                        {/* Product Details */}
                        <div>
                            <p>The girl emerges from the vessel of the mind, entwined in her own noodle-like hair. A forest of mushrooms casts a blanket of prismatic gradients. Bath is a new addition to the growing pantheon of characters that includes Slingshot, Maze, Descendent, and Woodcutter. Her appearance here marks the beginning of her transformation into different sculptural mediums in the future.</p>
                        </div>

                        {/* Tags */}
                        <ul tw="mt-[35px] inline-flex gap-[12px] text-[12px] font-semibold leading-[16.8px] flex-wrap">
                            <li tw="inline-block">
                                <a href="#" tw='inline-block px-5 py-2 bg-[#C4C4C4] hover:bg-dark-100 ease-in duration-300 rounded-full text-white'>surrealism</a>
                            </li>
                            <li tw="inline-block">
                                <a href="#" tw='inline-block px-5 py-2 bg-[#C4C4C4] hover:bg-dark-100 ease-in duration-300 rounded-full text-white'>pastel</a>
                            </li>
                            <li tw="inline-block">
                                <a href="#" tw='inline-block px-5 py-2 bg-[#C4C4C4] hover:bg-dark-100 ease-in duration-300 rounded-full text-white'>rollerblades</a>
                            </li>
                            <li tw="inline-block">
                                <a href="#" tw='inline-block px-5 py-2 bg-[#C4C4C4] hover:bg-dark-100 ease-in duration-300 rounded-full text-white'>doll</a>
                            </li>
                            <li tw="inline-block">
                                <a href="#" tw='inline-block px-5 py-2 bg-[#C4C4C4] hover:bg-dark-100 ease-in duration-300 rounded-full text-white'>underpainting</a>
                            </li>
                            <li tw="inline-block">
                                <a href="#" tw='inline-block px-5 py-2 bg-[#C4C4C4] hover:bg-dark-100 ease-in duration-300 rounded-full text-white'>drip</a>
                            </li>
                        </ul>

                        {/* Ratings */}
                        <Ratings />
                    </div>
                    <div tw='lg:col-span-4'>

                        {/* Product Author */}
                        <div tw="flex gap-4 items-center">
                            <div tw="w-[60px] h-[60px]">
                                <Image src={ProductUserThumb.src} width={ProductUserThumb.width} height={ProductUserThumb.height} tw='w-full h-full' alt="" />
                            </div>
                            <div>
                                <h2 tw='text-[20px] font-bold font-open-sans'>James Jean</h2>
                                <p tw="mb-0 font-semibold text-[16px] font-medium font-open-sans text-[#838383]">Los Angeles, CA</p>
                            </div>
                            <button tw='ml-auto rounded-full text-[13px] py-2 px-7 font-semibold transition-all duration-300 border border-[#E44C4D] bg-[#E44C4D] text-white hover:bg-white hover:text-[#E44C4D]'>Follow</button>
                        </div>


                        <div tw='py-4'>
                            <ul tw='flex justify-center items-center mb-5 gap-4 lg:gap-14'>
                                <li tw='text-[22px] text-[#3C3C3C] font-open-sans font-semibold border-b-2 py-1 border-[#E44C4D]'>Original</li>
                                <li tw='text-[22px] text-[#838383] font-open-sans font-semibold py-1'>Print</li>
                            </ul>

                            <div tw="flex justify-between items-center mb-3">
                                <h2 tw='italic text-[36px] font-medium text-[#3B3B3B]'>Jammer</h2>
                                <strong tw='text-[36px] font-semibold'>$1,820</strong>
                            </div>
                            <div tw='mb-4 flex gap-3 flex-wrap'>
                                <span tw='bg-[#FFE1E1] text-[#742F2F] text-[12px] font-semibold py-2 px-5 rounded-full'>Unique Work</span>
                                <span tw='bg-[#D8E8D8] text-[#222222] text-[12px] font-semibold py-2 px-5 rounded-full'>Prints Available</span>
                            </div>
                            <div tw='text-[20px] leading-8'>
                                <p>2021</p>
                                <p>Acrylic on Canvas</p>
                                <p>18 x 24 inches</p>
                            </div>
                        </div>

                        <hr tw='border my-[24px]' />
                        <Shipping />

                        {/* START MOBILE DEVICES */}

                        <div tw="flex flex-col gap-4 mb-5 lg:hidden" id="accordionExample">
                            {sampleAccordionData && sampleAccordionData.map((item, i) => (
                                <div key={i} tw="bg-white overflow-hidden">
                                    <button onClick={() => handleOpen(`accordion-item--${i}`)} tw="relative flex items-center w-full font-semibold text-base text-[#65676B] text-left bg-white border-0 rounded-none transition focus:outline-none" type="button">
                                        {item.title}
                                        <span tw='ml-auto'>
                                            <svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14.6871 0.273877C14.3219 -0.0912924 13.7298 -0.0912924 13.3646 0.273877L7.48026 6.15828L1.59586 0.273877C1.23071 -0.091293 0.638616 -0.091293 0.273465 0.273876C-0.0916853 0.639055 -0.0916853 1.23111 0.273465 1.59629L6.81906 8.14188C7.18421 8.50703 7.77631 8.50703 8.14146 8.14188L14.6871 1.59629C15.0522 1.23112 15.0522 0.639056 14.6871 0.273877Z" fill="#8B8B8B" />
                                            </svg>
                                        </span>
                                    </button>
                                    {open && open === `accordion-item--${i}` &&
                                        <div tw="mt-4 pb-4 text-[14px] text-[#8B8B8B]">
                                            {item.content}
                                        </div>}
                                </div>
                            ))
                            }
                        </div>
                        {/* END MOBILE DEVICES */}
                        <Faq />
                    </div>
                </div>
            </main>
        </>
    );
};

export default SingleProduct;
