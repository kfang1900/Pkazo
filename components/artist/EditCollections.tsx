import React, { useCallback, useEffect, useState } from 'react';
import tw from 'twin.macro';
import Image from 'next/image';

export default function EditProfilePage() {

    const styles = {
        label: tw`text-[16px] text-[#8B8B8B] text-right mt-[10px]`,
        input: tw`border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]`,
    };
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    // change this later
    const portfolios = [
        '/assets/images/kevin_fang.jpg',
        '/assets/images/kevin_fang.jpg',
        '/assets/images/kevin_fang.jpg',
        '/assets/images/kevin_fang.jpg'
    ]
    return (
        <div tw='w-full'>
            {/* portfolio circles */}
            <div
                tw='mx-auto flex items-center justify-between mt-[60px]'
                style={{ maxWidth: `${180 * Math.max(5, portfolios.length + 1) - 52}px` }}
            >
                {portfolios.map((portfolio, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                    >
                        <div
                            css={[
                                tw`relative rounded-full overflow-hidden border-transparent`,
                                activeIndex === i && tw`border-[#C6C5C3]`,
                                tw`w-[128px] h-[128px] border-[6px]`
                            ]}
                        >
                            <Image
                                src={portfolio}
                                alt='portfolio image'
                                layout='fill'
                                objectFit='cover'
                            />
                        </div>
                    </button>
                ))}
                {portfolios.length < 5 &&
                    <button
                        tw='w-[116px] h-[116px] bg-[#F3F3F3] hover:bg-[#E8E8E8] rounded-full flex items-center justify-center'
                    >
                        <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="15.9736" y="0.656006" width="5.77619" height="36.6864" rx="2.8881" fill="#C4C4C4" />
                            <rect x="0.811523" y="22.2336" width="5.86982" height="36.1012" rx="2.93491" transform="rotate(-90 0.811523 22.2336)" fill="#C4C4C4" />
                        </svg>
                    </button>
                }
            </div>
            {/* current portfolio */}
            {activeIndex !== null &&
                <div tw='w-full flex flex-col items-center mt-[52px] gap-y-10'>
                    <div tw='relative rounded-full overflow-hidden w-[100px] h-[100px]'>
                        <Image
                            src={portfolios[activeIndex]}
                            alt='current portfolio'
                            layout='fill'
                            objectFit='cover'
                        />
                    </div>
                    <div tw='flex items-center gap-x-7'>
                        <div tw='text-[16px] text-[#838383]'>Title</div>
                        <input
                            tw='w-[400px] h-10 border border-[#D8D8D8] focus:border-[#888888] rounded-[6px] px-4 outline-none'
                            defaultValue={'Current portfolio title here'}
                        />
                    </div>
                    <div tw='flex items-start gap-x-7'>
                        <div tw='text-[16px] text-[#838383] leading-10'>Description</div>
                        <textarea
                            tw='w-[700px] border border-[#D8D8D8] focus:border-[#888888] rounded-[6px] px-4 py-2 outline-none resize-none'
                            rows={6}
                            defaultValue={'Current portfolio description here'}
                        />
                    </div>
                    <div tw='grid grid-cols-[repeat(6,124px)] gap-9 mb-10'>
                        {[...Array(10)].map((work, i) => (
                            <div
                                key={i}
                                tw='w-full h-[124px] rounded-[5px] relative overflow-hidden'
                            >
                                <Image src={'/assets/images/kevin_fang.jpg'} alt='work' layout='fill' objectFit='cover' />
                            </div>
                        ))}
                        <button tw='w-[124px] h-[124px] bg-[#F3F3F3] hover:bg-[#E8E8E8] rounded-[5px] flex items-center justify-center'>
                            <svg width="37" height="38" viewBox="0 0 37 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="15.9736" y="0.656006" width="5.77619" height="36.6864" rx="2.8881" fill="#C4C4C4" />
                                <rect x="0.811523" y="22.2336" width="5.86982" height="36.1012" rx="2.93491" transform="rotate(-90 0.811523 22.2336)" fill="#C4C4C4" />
                            </svg>
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}
