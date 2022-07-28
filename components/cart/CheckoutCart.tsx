import { useState, useMemo } from 'react';
import Image from 'next/image';
import tw from 'twin.macro'

import { ArtistData, WorkData } from '../../types/dbTypes';
import { CartItem as CartItemType } from '../../utils/hooks/useCart';
import { formatPrice } from '../popups/PostDetails';

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
        { artistData: { username: 'Kevin Fang' } },
        { artistData: { username: 'Kevin Fang' } },
        { artistData: { username: 'Kevin Fang' } },
        { artistData: { username: 'Alice Yu' } },
        { artistData: { username: 'Alice Yu' } }
    ]);

    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);


    return <div tw='max-w-[572px] w-full pl-12 bg-[#FAFAFA]'>
        <div tw='max-h-[100vh] pt-16 pb-[100px] flex flex-col'>
            <div tw='overflow-auto pb-9'>
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
                                    <div tw='ml-3'>
                                        <div tw='text-[20px] leading-[24px] font-semibold text-black'>
                                            { /* data.artistData.name */}
                                            {data.artistData.username}
                                        </div>
                                        <div tw='mt-[2px] text-[18px] leading-[21px] font-semibold text-[#727373]'>
                                            {/*data.artistData.location*/}
                                            NYC, New York
                                        </div>
                                    </div>
                                </div>
                            }
                            <div tw='mt-4 flex'>
                                <div tw='relative w-[120px] h-[120px] flex items-center justify-center'>
                                    <Image
                                        src='/assets/images/jammer.jpg'
                                        alt='work image'
                                        layout='fill'
                                        objectFit='contain'
                                    />
                                </div>
                                <div tw='ml-4'>
                                    <div tw='text-[32px] italic text-[#696969] font-semibold'>
                                        Jammer
                                    </div>
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