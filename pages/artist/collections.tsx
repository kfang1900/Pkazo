import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/router';
import Sidebar from 'components/artist/Sidebar'

import useRequireOnboarding from '../../utils/hooks/useRequireOnboarding';
import EditCollections from '../../components/artist/EditCollections';
import ShopSettingsPage from '../../components/account/ShopSettingsPage';

const EditAccount: NextPage = () => {
    const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
    }, [mediaQuery, isMobile]);

    const largeQuery = useMediaQuery({ query: `(min-width: 1280px)` });
    const [isLargeScreen, setIsLargeScreen] = useState(false);
    useEffect(() => {
        if (isLargeScreen !== largeQuery) setIsLargeScreen(largeQuery);
    }, [largeQuery, isLargeScreen]);

    const [page, setPage] = useState(0);
    const [showSidebar, setShowSidebar] = useState(false);

    useRequireOnboarding();

    const pages = [
        'Collections',
        'Orders and Shipping',
        'Edit FAQs',
        // 'Apps and Websites',
        // 'Email and SMS',
    ];
    return (
        <div tw='absolute top-0 h-[100vh] flex flex-col w-full'>
            <Head>
                <title>Collections</title>
            </Head>
            {!isMobile && <Header isBuyer isHome />}
            <div tw='md:flex flex-1'>
                {isMobile &&
                    <div tw='sticky top-0 z-50 bg-white'>
                        <div tw='flex items-center justify-between h-12 px-5'>
                            <Link
                                href={`/artist${window.location.search}`}
                                passHref
                            >

                                <Image
                                    src='/assets/svgs/mobile/back.svg'
                                    width='11'
                                    height='18'
                                    alt='popup back'
                                    tw='cursor-pointer'
                                />
                            </Link>
                            <div tw='text-[16px] text-black font-semibold'>Collections</div>
                            <div />
                        </div>
                        <div tw='h-[0.5px] bg-[#E2E2E2] w-full' />
                    </div>
                }
                <Sidebar
                    toShow={showSidebar && !isMobile}
                    onClose={() => setShowSidebar(false)}
                    pageName='collections'
                />
                {isLargeScreen && <div tw='w-[350px]' />}
                <div tw='w-full'>
                    {(!isMobile && !isLargeScreen) &&
                        <div tw='flex mt-7 px-9 gap-x-6 items-center'>
                            <div tw='cursor-pointer' onClick={() => setShowSidebar(true)}>
                                <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M26 10C26 9.27963 25.4367 8.69565 24.7419 8.69565H1.25806C0.563254 8.69565 0 9.27963 0 10C0 10.7204 0.563254 11.3043 1.25806 11.3043H24.7419C25.4367 11.3043 26 10.7204 26 10Z" fill="black" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M26 1.30435C26 0.583976 25.4367 0 24.7419 0H1.25806C0.563254 0 0 0.583976 0 1.30435C0 2.02472 0.563254 2.6087 1.25806 2.6087H24.7419C25.4367 2.6087 26 2.02472 26 1.30435Z" fill="black" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M26 18.6957C26 17.9753 25.4367 17.3913 24.7419 17.3913H1.25806C0.563254 17.3913 0 17.9753 0 18.6957C0 19.416 0.563254 20 1.25806 20H24.7419C25.4367 20 26 19.416 26 18.6957Z" fill="black" />
                                </svg>
                            </div>
                            <div tw='text-[28px] font-semibold text-[#222222]'>
                                Portfolio
                            </div>
                        </div>
                    }
                    <EditCollections />
                </div>
            </div >
        </div>
    );
};

export default EditAccount;
