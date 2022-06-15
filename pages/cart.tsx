import React, { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import tw, { styled } from 'twin.macro';
import buttons from 'styles/Button';
import Dropdown from 'styles/Dropdown';
import { useMediaQuery } from 'react-responsive';

const LineBreak = styled.div`${tw`h-[0.5px] bg-[#E3E3E3]`}`;

const CartPage: NextPage = () => {
    const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
    const [works, setWorks] = useState([...Array(2)]);
    return <div>
        <Head>
            <title>Cart</title>
        </Head>
        <Header />
        <div tw='w-full px-4'>
            {works.map((work, i) => (
                <div key={i} tw='mt-[18px]'>
                    <div tw='flex items-center'>
                        <div tw="w-[55px] h-[55px] overflow-hidden rounded-full flex items-center">
                            <Image
                                src='/assets/images/kevin.png'
                                alt="profile_image"
                                width="55px"
                                height="55px"
                                objectFit="cover"
                            />
                        </div>
                        <div tw='ml-[10px]'>
                            <div tw='text-[16px] leading-[19px] font-semibold text-black'>
                                James Jean
                            </div>
                            <div tw='mt-1 text-[14px] font-medium text-[#727373]'>
                                Los Angeles, CA
                            </div>
                        </div>
                        <button
                            css={[
                                buttons.white,
                                tw`px-6 text-[13px] text-[#3C3C3C] font-semibold ml-auto h-[30px]`
                            ]}
                        >
                            Message
                        </button>
                    </div>
                    <div tw='flex mt-4'>
                        <div tw='w-[88px] h-[88px] rounded-[8px] overflow-hidden flex-none'>
                            <Image
                                src='/assets/images/kevin_fang.jpg'
                                width='88px'
                                height='88px'
                                objectFit='cover' />
                        </div>
                        <div tw='ml-4 w-full'>
                            {/* original */}
                            {i % 2 === 0 &&
                                <>
                                    <div tw='bg-[#FFE1E1] rounded-[52px] h-5 w-16 text-[#742F2F] text-[12px] font-semibold text-center'>
                                        Original
                                    </div>
                                    <div tw='flex items-center justify-between w-full'>
                                        <div tw='mt-1 text-[24px] italic text-[#696969] font-medium leading-[1em]'>
                                            Jammer
                                        </div>
                                        <div tw='ml-auto font-semibold text-[#242424] text-[20px] leading-[1em]'>
                                            $1,820
                                        </div>
                                    </div>
                                </>
                            }
                            {/* print */}
                            {i % 2 === 1 &&
                                <>
                                    <div tw='bg-[#D8E8D8] rounded-[52px] h-5 w-11 text-[#222222] text-[12px] font-semibold text-center'>
                                        Print
                                    </div>
                                    <div tw='mt-1 text-[24px] italic text-[#696969] font-medium leading-[1em]'>
                                        Jammer
                                    </div>
                                    <div tw='flex mt-[6px] text-[#696969] text-[14px] leading-[17px]'>
                                        <div>Size: 8&quot; x 10&quot; inches</div>
                                        <button
                                            tw='ml-3'
                                            onClick={() => 0}
                                        >Edit</button>
                                    </div>
                                    <div tw='flex justify-between w-full mt-3'>
                                        <Dropdown
                                            onChange={() => 0}
                                            appearance={tw`border-[#EAEAEA] rounded-[8px] w-[64px] pl-3 py-2 text-[16px] text-[#7E7E7E] font-semibold`}
                                            triangle
                                        >
                                            {[...Array(10)].map((_, i) => <option key={i}>{i + 1}</option>)}
                                        </Dropdown>
                                        <div tw='ml-auto font-semibold text-[#242424] text-[20px] leading-[1em]'>
                                            $1,820
                                        </div>
                                    </div>
                                </>
                            }
                            <div tw='flex mt-4 text-[12px] text-[#2C2C2C] gap-x-6'>
                                <button
                                    tw='font-bold'
                                    onClick={() => 0}
                                // onClick={() => {
                                //     work.buyNow = false;
                                // }}
                                >
                                    Save for later
                                </button>
                                <button
                                    tw='font-bold'
                                    onClick={() => setWorks((w) => {
                                        const t = [...w];
                                        t.splice(i, 1);
                                        return t;
                                    })}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    </div>
                    <textarea
                        rows={3}
                        placeholder={`Add a note to ${'James Jean'} (optional)`}
                        tw='mt-5 w-full border-[0.5px] border-[#ECECEC] focus:border-[#D8D8D8] outline-none rounded-[7px] p-3 text-[14px] leading-[17px] resize-none'
                    />
                    <div tw='mt-3 w-full flex flex-col items-end'>
                        <div tw='text-[13px] text-black'>
                            Shipping: ${(Math.round(4 * 100) / 100).toFixed(2)}
                        </div>
                        <div tw='mt-3 text-[12px] text-[#7C7C7C] text-right'>
                            Estimated delivery: June 3-8 <br />
                            from Dallas, TX
                        </div>
                    </div>
                    <LineBreak tw='mt-5' />
                </div>
            ))}
            <div tw='flex mt-4'>
                <input type='checkbox' tw='w-[18px] h-[18px] rounded-[4px]' />
                <div tw='ml-2'>
                    <div tw='text-[14px] leading-[17px] text-[#616161] font-medium'>
                        This order is a gift
                    </div>
                    <div tw='mt-[2px] text-[12px] leading-[14px] text-[#888888]'>
                        Prices will not be shown on packing slip
                    </div>
                </div>
            </div>
            <LineBreak tw='mt-4' />
            <div tw='grid grid-cols-2 justify-between mt-4 gap-y-[10px] text-[16px] text-black'>
                <div tw='font-semibold'>Subtotal</div>
                <div tw='text-right'>
                    ${(Math.round(1820 * 100) / 100).toFixed(2)}
                </div>
                <div>
                    <div tw='font-semibold text-[16px] text-black'>Shipping</div>
                    <div tw='mt-[2px] text-[12px] text-[#888888]'>
                        (To <button tw='underline'>United States, 75025</button>)
                    </div>
                </div>
                <div tw='text-right'>
                    ${(Math.round(8 * 100) / 100).toFixed(2)}
                </div>
            </div>
            <LineBreak tw='mt-4' />
            <div tw='mt-4 flex items-center justify-between text-[16px] text-black'>
                <div tw='font-semibold'>Total</div>
                <div tw='text-right'>
                    ${(Math.round(1828 * 100) / 100).toFixed(2)}
                </div>
            </div>
        </div>
        <div tw='sticky bottom-0 bg-white'>
            <LineBreak tw='mt-4' />
            <div tw='px-4'>
                <button
                    tw='w-full h-11 mt-[14px] mb-4 bg-[#2C1D1D] hover:bg-[#3B2727] rounded-[30px] text-center text-white text-[14px] font-bold'
                >
                    Proceed to checkout
                </button>
            </div>
        </div>
    </div >
}
export default CartPage;
