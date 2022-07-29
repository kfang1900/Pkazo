import { useState, useMemo } from 'react';
import Image from 'next/image';
import tw from 'twin.macro'

import { ArtistData, WorkData } from '../../types/dbTypes';
import { CartItem as CartItemType } from '../../utils/hooks/useCart';
import { formatPrice } from '../popups/PostDetails';

import scrollStyle from 'styles/UploadWork.module.css';
import Dropdown from 'styles/Dropdown';
import buttons from 'styles/Button';

const CheckoutCart = ({ page }: { page: number }) => {
    // const [works, setWorks] = useState<
    //     (CartItemType & {
    //         workData: WorkData & { forSale: true };
    //         artistData: ArtistData & { id: string };
    //         workImageURL: string;
    //         artistProfilePictureURL: string;
    //     })[]
    // >([]);
    const [works, setWorks] = useState([
        { artistData: { username: 'Kevin Fang' }, type: 'original' },
        { artistData: { username: 'Kevin Fang' }, type: 'print' },
        { artistData: { username: 'Kevin Fang' }, type: 'print' },
        { artistData: { username: 'Alice Yu' }, type: 'original' },
        { artistData: { username: 'Alice Yu' }, type: 'original' }
    ]);

    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);


    return <div tw='max-w-[572px] w-full pl-12 bg-[#FAFAFA]'>
        <div tw='max-h-[100vh] pt-16 pb-[100px] flex flex-col'>
            <div tw='overflow-auto pb-9' className={scrollStyle['workInfo']}>
                {works
                    .sort((a, b) => {
                        if (a.artistData.username < b.artistData.username) return -1;
                        if (a.artistData.username > b.artistData.username) return 1;
                        return 0;
                    })
                    .map((data, i, arr) => {
                        const showProfile = !i || arr[i].artistData.username !== arr[i - 1].artistData.username
                        return <div key={i} css={[i && showProfile && tw`mt-6`]}>
                            {showProfile &&
                                <div tw='flex items-center'>
                                    <div tw='w-[55px] h-[55px] relative overflow-hidden rounded-full flex items-center'>
                                        <Image
                                            src={'/assets/images/ayu.png'}
                                            alt='profile_image'
                                            layout='fill'
                                            objectFit='cover'
                                        />
                                    </div>
                                    <div tw='ml-[10px]'>
                                        <div tw='text-[16px] leading-[19px] font-semibold text-black'>
                                            { /* data.artistData.name */}
                                            {data.artistData.username}
                                        </div>
                                        <div tw='mt-[2px] text-[14px] font-medium text-[#727373]'>
                                            {/*data.artistData.location*/}
                                            NYC, New York
                                        </div>
                                    </div>
                                </div>
                            }
                            <div tw='mt-4 flex items-center'>
                                <div tw='relative w-[120px] h-[120px] flex items-center justify-center'>
                                    <Image
                                        src='/assets/images/jammer.jpg'
                                        alt='work image'
                                        layout='fill'
                                        objectFit='contain'
                                    />
                                </div>
                                <div tw='ml-4 self-start'>
                                    <div
                                        tw='h-5 px-2 rounded-[52px] w-auto text-[12px] font-semibold inline-block'
                                        css={[data.type === 'print' ? tw`bg-[#D8E8D8] text-[#222222]` : tw`bg-[#FFE1E1] text-[#742F2F]`]}
                                    >
                                        {data.type === 'print' ? 'Print' : 'Original'}
                                    </div>
                                    <div tw='text-[24px] italic text-[#696969] font-medium'>
                                        Jammer
                                    </div>
                                </div>
                                <div tw='ml-auto text-[20px] text-[#242424] font-semibold'>
                                    {formatPrice(1820)}
                                </div>
                            </div>
                        </div>
                    })
                }
            </div>
            {/* bottom panel */}
            <div>
                <div tw='h-[1px] bg-[#E3E3E3]' />
                <div tw='flex justify-between items-center mt-6 text-[20px] text-[#333333] font-semibold'>
                    <div>Subtotal</div>
                    <div>{formatPrice(subtotal)}</div>
                </div>
                <div tw='flex justify-between items-center mt-3 font-semibold'>
                    <div tw='text-[20px] text-[#333333]'>Shipping</div>
                    <div tw='text-[16px] text-[#717171]'>
                        {page ?
                            formatPrice(shipping) :
                            'Calculated at next step'
                        }
                    </div>
                </div>
                <div tw='h-[1px] bg-[#E3E3E3] mt-6' />
                <div tw='flex justify-between items-center mt-6 text-[#333333] font-semibold'>
                    <div tw='text-[20px]'>Total</div>
                    <div tw='text-[28px]'>
                        {page ?
                            formatPrice(subtotal + shipping) :
                            <>
                                {formatPrice(subtotal)}
                                <span tw='text-[16px]'>
                                    {' + shipping'}
                                </span>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
}
export default CheckoutCart;