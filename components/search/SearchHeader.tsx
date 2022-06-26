import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import tw, { styled } from 'twin.macro'

const LineBreak = styled.div`
  ${tw`h-[0.5px] bg-[#E3E3E3]`}
`;

const SearchHeader = (props: {
    onClose?: () => void,
    searchValue: string,
    updateSearchValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {

    if (props.onClose) {
        return <div tw='absolute z-50 left-0 top-0 h-[100vh] w-full bg-white flex flex-col'>
            <style>
                {`body { overflow:hidden }`}
            </style>
            <div tw='flex mt-2 ml-[10px] mr-[14px] gap-x-[10px]'>
                <div tw='w-full pl-4 pr-[10px] h-9 rounded-[48px] bg-[#F5F5F5] border border-[#A3A3A3] focus-within:border-[#838383] focus-within:bg-white outline-none flex items-center'>
                    <input
                        type="text"
                        placeholder="Search for anything"
                        tw="w-full bg-transparent outline-none text-[14px]"
                        onChange={props.updateSearchValue}
                    />
                    <img src="/assets/svgs/mobile/search.svg" tw="ml-2 w-4 h-4" />
                </div>
                <button onClick={props.onClose}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.23286 6.99851L13.7414 1.49874C13.906 1.3341 13.9985 1.11079 13.9985 0.877944C13.9985 0.645099 13.906 0.42179 13.7414 0.257144C13.5767 0.0924974 13.3534 0 13.1206 0C12.8877 0 12.6644 0.0924974 12.4998 0.257144L7 5.76565L1.50024 0.257144C1.33559 0.0924974 1.11228 2.0673e-07 0.879436 2.08465e-07C0.646591 2.102e-07 0.423282 0.0924974 0.258636 0.257144C0.0939896 0.42179 0.0014924 0.645099 0.0014924 0.877944C0.0014924 1.11079 0.0939896 1.3341 0.258636 1.49874L5.76714 6.99851L0.258636 12.4983C0.176683 12.5796 0.111635 12.6763 0.067245 12.7828C0.0228546 12.8894 0 13.0036 0 13.1191C0 13.2345 0.0228546 13.3488 0.067245 13.4553C0.111635 13.5619 0.176683 13.6586 0.258636 13.7399C0.33992 13.8218 0.436626 13.8869 0.543175 13.9313C0.649725 13.9757 0.764009 13.9985 0.879436 13.9985C0.994863 13.9985 1.10915 13.9757 1.2157 13.9313C1.32225 13.8869 1.41895 13.8218 1.50024 13.7399L7 8.23136L12.4998 13.7399C12.581 13.8218 12.6778 13.8869 12.7843 13.9313C12.8909 13.9757 13.0051 13.9985 13.1206 13.9985C13.236 13.9985 13.3503 13.9757 13.4568 13.9313C13.5634 13.8869 13.6601 13.8218 13.7414 13.7399C13.8233 13.6586 13.8884 13.5619 13.9328 13.4553C13.9771 13.3488 14 13.2345 14 13.1191C14 13.0036 13.9771 12.8894 13.9328 12.7828C13.8884 12.6763 13.8233 12.5796 13.7414 12.4983L8.23286 6.99851Z" fill="#8C8C8C" />
                    </svg>
                </button>
            </div>
            {!props.searchValue &&
                <div tw='w-full mt-4 bg-white overflow-auto'>
                    <button tw='px-4 w-full flex items-center justify-between'>
                        <div tw='font-semibold text-[14px] text-[#363636]'>Browse by discipline</div>
                        <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.74891 4.63747L1.33435 0.23071C1.26184 0.157606 1.17557 0.0995817 1.08053 0.0599843C0.985484 0.0203869 0.883539 0 0.780576 0C0.677612 0 0.575667 0.0203869 0.480622 0.0599843C0.385577 0.0995817 0.299313 0.157606 0.226806 0.23071C0.081538 0.376845 0 0.574527 0 0.78058C0 0.986634 0.081538 1.18432 0.226806 1.33045L4.0876 5.23024L0.226806 9.09103C0.081538 9.23716 0 9.43485 0 9.6409C0 9.84695 0.081538 10.0446 0.226806 10.1908C0.299041 10.2645 0.385184 10.3231 0.480241 10.3633C0.575299 10.4034 0.677382 10.4243 0.780576 10.4248C0.88377 10.4243 0.985853 10.4034 1.08091 10.3633C1.17597 10.3231 1.26211 10.2645 1.33435 10.1908L5.74891 5.78401C5.82808 5.71097 5.89126 5.62233 5.93447 5.52366C5.97769 5.425 6 5.31845 6 5.21074C6 5.10303 5.97769 4.99648 5.93447 4.89782C5.89126 4.79915 5.82808 4.71051 5.74891 4.63747V4.63747Z" fill="#363636" />
                        </svg>
                    </button>
                    <LineBreak tw='px-3 mt-3' />
                    <div tw='px-4 mt-3 mb-2 text-[14px] text-[#363636] font-semibold'>Recent</div>
                    {
                        ['cat collar', 'cat painting', 'cat bowl'].map((result, i) => (
                            <div
                                key={i}
                                tw='px-4 py-2 text-[14px] text-[#5A5A5A] w-full bg-white hover:bg-[#F5F5F5] cursor-pointer'
                            >
                                {result}
                            </div>
                        ))
                    }
                    <LineBreak tw='px-3 mt-2' />
                    <div tw='px-4 mt-3 mb-2 text-[14px] text-[#363636] font-semibold'>Trending Searches</div>
                    {
                        ['cat collar', 'cat painting', 'cat bowl'].map((result, i) => (
                            <div
                                key={i}
                                tw='px-4 py-2 text-[14px] text-[#5A5A5A] w-full bg-white hover:bg-[#F5F5F5] cursor-pointer'
                            >
                                {result}
                            </div>
                        ))
                    }
                    <LineBreak tw='px-3 mt-2' />
                    <div tw='px-4 mt-3 mb-2 text-[14px] text-[#363636] font-semibold'>Featured Artists</div>
                    <div tw='px-4 mt-4 grid grid-rows-1 grid-flow-col gap-x-6 overflow-auto'>
                        {[...Array(10)].map((v, i) => (
                            <div
                                key={i}
                            >
                                <div tw='w-[64px] h-[64px] rounded-full overflow-hidden relative'>
                                    <Image src='/assets/images/kevin.png' layout='fill' objectFit='cover' />
                                </div>
                                <div tw='mt-2 text-[12px] text-black'>Kevin Fang</div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            {props.searchValue &&
                <div tw='w-full mt-4 bg-white overflow-auto'>
                    {
                        [' collar', ' painting', ' bowl'].map((result, i) => (
                            <div
                                key={i}
                                tw='px-4 py-2 text-[14px] text-[#5A5A5A] w-full bg-white hover:bg-[#F5F5F5] cursor-pointer'
                            >
                                {props.searchValue}<b>{result}</b>
                            </div>
                        ))
                    }
                    <div tw='px-4 mt-3 mb-2 text-[14px] text-[#363636] font-semibold'>Artists</div>
                    <div tw='px-4 mt-4 grid grid-rows-1 grid-flow-col gap-x-6 overflow-auto'>
                        {[...Array(10)].map((v, i) => (
                            <div
                                key={i}
                            >
                                <div tw='w-[64px] h-[64px] rounded-full overflow-hidden relative'>
                                    <Image src='/assets/images/kevin.png' layout='fill' objectFit='cover' />
                                </div>
                                <div tw='mt-2 text-[12px] text-black'>Kevin Fang</div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    }

    return <div tw='absolute z-50 w-full bg-white rounded-[8px] pt-6 pb-4 shadow-md'>
        {!props.searchValue &&
            <>
                <div tw='font-semibold text-[16px] text-[#363636] px-6 mb-2'>Recent</div>
                {
                    ['cat collar', 'cat painting', 'cat bowl'].map((result, i) => (
                        <div
                            key={i}
                            tw='px-6 py-2 text-[16px] text-[#5A5A5A] w-full bg-white hover:bg-[#F5F5F5] cursor-pointer'
                        >
                            {result}
                        </div>
                    ))
                }
                <div tw='font-semibold text-[16px] text-[#363636] px-6 mt-4 mb-2'>Trending Searches</div>
                {
                    ['cat collar', 'cat painting', 'cat bowl'].map((result, i) => (
                        <div
                            key={i}
                            tw='px-6 py-2 text-[16px] text-[#5A5A5A] w-full bg-white hover:bg-[#F5F5F5] cursor-pointer'
                        >
                            {result}
                        </div>
                    ))
                }
                <div tw='font-semibold text-[16px] text-[#363636] px-6 mt-4 mb-2'>Featured Artists</div>
                {
                    [...Array(2)].map((v, i) => (
                        <div
                            key={i}
                            tw='flex items-center gap-x-3 px-6 py-2 bg-white hover:bg-[#F5F5F5] cursor-pointer'
                        >
                            <div tw='w-10 h-10 relative overflow-hidden'>
                                <Image
                                    src='/assets/images/kevin.png'
                                    layout='fill'
                                    objectFit='cover'
                                />
                            </div>
                            <div>
                                <div tw='text-[16px] leading-[19px] text-black'>Kevin Fang</div>
                                <div tw='mt-[2px] text-[14px] leading-[17px] text-[#727373]'>Los Angeles, CA</div>
                            </div>
                        </div>
                    ))
                }
            </>
        }
        {props.searchValue &&
            <>
                {/* matches */}
                {
                    [' collar', ' painting', ' bowl'].map((result, i) => (
                        <div
                            key={i}
                            tw='px-6 py-2 text-[16px] text-[#5A5A5A] w-full bg-white hover:bg-[#F5F5F5] cursor-pointer'
                        >
                            {props.searchValue}<b>{result}</b>
                        </div>
                    ))
                }
                <div tw='font-semibold text-[16px] text-[#363636] px-6 mt-4 mb-2'>Artists</div>
                {
                    [...Array(2)].map((v, i) => (
                        <div
                            key={i}
                            tw='flex items-center gap-x-3 px-6 py-2 bg-white hover:bg-[#F5F5F5] cursor-pointer'
                        >
                            <div tw='w-10 h-10 relative overflow-hidden'>
                                <Image
                                    src='/assets/images/kevin.png'
                                    layout='fill'
                                    objectFit='cover'
                                />
                            </div>
                            <div>
                                <div tw='text-[16px] leading-[19px] text-black'>Kevin Fang</div>
                                <div tw='mt-[2px] text-[14px] leading-[17px] text-[#727373]'>Los Angeles, CA</div>
                            </div>
                        </div>
                    ))
                }
            </>
        }
    </div>
}

export default SearchHeader;