import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import Link from 'next/link';
import queryString from 'query-string';
import 'twin.macro';

const ShopManager = () => {
    const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
    }, [mediaQuery, isMobile]);

    useEffect(() => {
        if (!mediaQuery) router.push('/artist/collections');
    })

    const pages = [
        { title: 'Collections', url: 'collections' },
        { title: 'Orders', url: 'orders' },
        { title: 'Reviews', url: 'reviews' },
        { title: 'Shipping', url: 'shipping' },
        { title: 'Return Policy', url: 'return' },
        { title: 'FAQ', url: 'faq' },
        { title: 'Payments', url: 'payments' },
    ]

    const router = useRouter();
    console.log(typeof window);
    return <div>
        <div tw='sticky top-0'>
            <div tw='flex items-center justify-between h-12 px-5'>
                <Link
                    href={(typeof window !== 'undefined' && queryString.parse(window.location.search).redirect as string) || '/'}
                    passHref
                >
                    <Image
                        src='/assets/svgs/mobile/close.svg'
                        width='16'
                        height='16'
                        alt='popup close'
                        tw='cursor-pointer'
                    />
                </Link>
                <div tw='text-[16px] text-black font-semibold'>Artist Dashboard</div>
                <div />
            </div>
            <div tw='h-[0.5px] bg-[#E2E2E2] w-full' />
        </div>
        <div tw='my-3'>
            {pages.map(({ title, url }, i) => (
                <Link key={i} href={`/artist/${url}${typeof window === 'undefined' ? '' : window.location.search}`} passHref>
                    <div tw='pl-5 pr-4 py-3 flex items-center justify-between w-full bg-white hover:bg-[#F5F5F5] cursor-pointer'>
                        <div tw='text-[14px] text-black font-medium'>{title}</div>
                        <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.70706 5.41038L1.55674 0.269162C1.47214 0.183874 1.3715 0.116179 1.26062 0.0699817C1.14973 0.0237847 1.0308 0 0.910672 0C0.790547 0 0.671612 0.0237847 0.560726 0.0699817C0.44984 0.116179 0.349199 0.183874 0.264607 0.269162C0.0951276 0.439652 0 0.670281 0 0.910677C0 1.15107 0.0951276 1.3817 0.264607 1.55219L4.76886 6.10195L0.264607 10.6062C0.0951276 10.7767 0 11.0073 0 11.2477C0 11.4881 0.0951276 11.7187 0.264607 11.8892C0.348882 11.9752 0.449381 12.0436 0.560282 12.0905C0.671182 12.1373 0.790279 12.1617 0.910672 12.1622C1.03106 12.1617 1.15016 12.1373 1.26106 12.0905C1.37196 12.0436 1.47246 11.9752 1.55674 11.8892L6.70706 6.74801C6.79942 6.6628 6.87314 6.55938 6.92355 6.44427C6.97397 6.32917 7 6.20486 7 6.0792C7 5.95353 6.97397 5.82923 6.92355 5.71412C6.87314 5.59901 6.79942 5.49559 6.70706 5.41038Z" fill="#C7C7C7" />
                        </svg>
                    </div>
                </Link>
            ))}
        </div>
    </div >
}

export default ShopManager;