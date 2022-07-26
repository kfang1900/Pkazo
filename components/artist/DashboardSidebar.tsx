import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';

const DashboardSidebar = (
    { toShow, onClose, pageName }:
        { toShow: boolean, onClose: () => void, pageName: string }) => {

    const mediaQuery = useMediaQuery({ query: `(min-width: 1280px)` });
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    useEffect(() => {
        if (isLargeScreen !== mediaQuery) setIsLargeScreen(mediaQuery);
    }, [mediaQuery, isLargeScreen]);

    const pages = [
        { title: 'Collections', url: 'collections' },
        { title: 'Orders', url: 'orders' },
        { title: 'Reviews', url: 'reviews' },
        { title: 'Shipping', url: 'shipping' },
        { title: 'Return Policy', url: 'return' },
        { title: 'FAQ', url: 'faq' },
        { title: 'Payments', url: 'payments' },
    ]

    return <div
        tw="fixed top-[60px] bottom-0 w-[350px] border-r border-r-[#D8D8D8] pt-7 xl:pt-4 bg-white z-10 duration-300"
        css={[
            toShow || isLargeScreen ? tw`left-0` : tw`left-[-350px]`,
        ]}
    >
        {!isLargeScreen &&
            <div tw='flex px-9 justify-between items-center text-[26px] font-semibold text-[#222222] mb-3'>
                Artist Dashboard
                <div tw='cursor-pointer' onClick={onClose}>
                    <Image
                        src='/assets/svgs/mobile/close.svg'
                        alt='close popup'
                        width='24'
                        height='24'
                    />
                </div>
            </div>
        }
        {pages.map(({ title, url }, i) => (
            <Link key={i} href={`/artist/${url}`} passHref>
                <div
                    tw='px-9 py-4 w-full bg-white hover:bg-[#F5F5F5] cursor-pointer text-[20px] text-[#3C3C3C]'
                    css={[pageName === url && tw`font-bold`, isLargeScreen && tw`pl-[60px]`]}
                >
                    {title}
                </div>
            </Link>
        ))}
    </div>
}

export default DashboardSidebar;