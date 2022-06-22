import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../../styles/Home.module.css';
import Header from '../../../components/Header';
import CollectionThumb_1 from '../images/collections-1.png';
import CollectionThumb_2 from '../images/collections-2.png';
import CollectionThumb_3 from '../images/collections-3.png';
import CollectionThumb_4 from '../images/collections-4.png';
import CollectionThumb_5 from '../images/collections-5.png';
import CollectionThumb_6 from '../images/collections-6.png';
import CollectionThumb_7 from '../images/collections-7.png';
import CollectionThumb_8 from '../images/collections-8.png';
import CollectionThumb_9 from '../images/collections-9.png';

import 'twin.macro';
import { FiX } from 'react-icons/fi';
const Revise: NextPage = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState({
        popupLoading: false,
    });
    const sidebar = {
        menu: [
            {
                name: "Change Password",
                url: "change-password",
            },
            {
                name: "Apps and Websites",
                url: "apps-and-websites",
            },
            {
                name: "Email and Websites",
                url: "email-and-websites",
            },
            {
                name: "Push Notifications",
                url: "push-notifications",
            },
            {
                name: "Manage Contacts",
                url: "manage-contacts",
            },
            {
                name: "Privacy and Security",
                url: "privacy-and-security",
            },
            {
                name: "Supervision",
                url: "supervision",
            },
            {
                name: "Login Activity",
                url: "login-activity",
            },
            {
                name: "Emails from Pkazo",
                url: "emails-from-pkazo",
            },
            {
                name: "Help",
                url: "help",
            },
        ]
    }
    const collectons = {

        top: [
            { image: CollectionThumb_1 },
            { image: CollectionThumb_2 },
            { image: CollectionThumb_3 },
            { image: CollectionThumb_4 },
            { image: CollectionThumb_5 },
        ],

        bottom: [
            { image: CollectionThumb_1 },
            { image: CollectionThumb_2 },
            { image: CollectionThumb_3 },
            { image: CollectionThumb_4 },
            { image: CollectionThumb_5 },
            { image: CollectionThumb_6 },
            { image: CollectionThumb_7 },
            { image: CollectionThumb_8 },
            { image: CollectionThumb_9 },

            { image: CollectionThumb_1 },
            { image: CollectionThumb_2 },
            { image: CollectionThumb_3 },
            { image: CollectionThumb_4 },
            { image: CollectionThumb_5 },
            { image: CollectionThumb_9 },
        ]

    }


    const handleOpenModal = () => {
        document.body.classList.add('overflow-hidden');
        setIsLoading({ popupLoading: true });
        setIsOpen(true);
        setTimeout(() => {
            setIsLoading({ popupLoading: false });
        }, 1000);
    }
    const handleCloseModal = () => {
        document.body.classList.remove('overflow-hidden');
        setIsOpen(false);
    }

    const { popupLoading } = isLoading;

    const ModalPopup = (props: any) => (
        props.isOpenModal &&
        <div tw="fixed bg-[#343434] top-0 left-0 h-full z-[999] w-full bg-opacity-75 overflow-x-hidden overflow-y-auto">
            {/* Content */}
            <div tw="m-[1.75rem auto] w-full max-w-[1200px] flex items-center lg:min-h-[calc(100% - 3.5rem)]">
                <div tw="bg-white relative w-full pointer-events-auto rounded outline-none">

                    {/* Close Button */}
                    <button onClick={handleCloseModal} tw='absolute top-0 right-[-2.7rem] text-white text-4xl'><FiX /></button>


                    {/* Body */}
                    <div tw="relative p-4 lg:p-[72px] lg:pb-[35px]">
                        <div tw="flex gap-[40px]">
                            {/* Thumbnail */}
                            <div tw="rounded-full relative min-w-[180px] w-[180px] h-[180px] overflow-hidden">
                                {popupLoading ? <div tw="bg-gray-200/70 w-full h-full"></div> :
                                    <Image layout='fill' tw='w-full h-full object-cover object-center' src={CollectionThumb_3.src} width={CollectionThumb_3.width} height={CollectionThumb_3.height} alt="" />
                                }
                            </div>
                            {/* Content */}
                            {popupLoading ?
                                <div tw="w-full">
                                    <div tw='h-9 mb-3 rounded bg-gray-200/70 block w-1/5'></div>
                                    <div tw='h-[130px] rounded bg-gray-200/70 block w-3/5'></div>
                                </div>
                                :
                                <div tw="">
                                    <input type="text" placeholder='Title' tw='border px-4 py-3 py-2 rounded mb-4' />
                                    <textarea name="" id="" tw='border px-4 py-3 py-2 rounded w-full h-[130px] resize-none' placeholder='(Optional) Write a description...'></textarea>
                                </div>
                            }
                        </div>
                        {/* Content */}
                        {popupLoading ?
                            <div tw='h-9 mb-3 rounded bg-gray-200/70 block w-full my-5'></div>
                            :
                            <p tw="text-[20px] text-[#575757] my-4">Upload the works that belong in this portfolio. For now, only one image per work.</p>
                        }
                        {/* Images Gallery */}
                        {popupLoading ?
                            <div tw="inline-flex flex-wrap gap-[20px]">
                                {/* Single Image */}
                                {collectons.top && collectons.bottom.map((item, i) => (
                                    <div key={i} tw="w-[110px] h-[110px] rounded-[6px] bg-gray-100">
                                        <div tw='h-full w-full mb-3 rounded bg-gray-200/70 block'></div>
                                    </div>
                                ))}
                            </div>
                            :
                            <div tw="inline-flex flex-wrap gap-[20px]">
                                {/* Single Image */}
                                {collectons.top && collectons.bottom.map((item, i) => (
                                    <div key={i} tw="w-[110px] h-[110px] rounded-[6px] bg-gray-100">
                                        <Image src={item.image.src} width={item.image.width} height={item.image.height} tw="w-full h-full object-cover object-center" alt="" />
                                    </div>
                                ))}
                            </div>
                        }

                        {popupLoading ?
                            <div tw='h-[140px] my-5 w-full mb-3 rounded bg-gray-200/70 block'></div>
                            :
                            <div tw="my-7 border border-[3px] border-[#D8D8D8] px-4 text-center py-6 lg:py-[3rem] border-dashed rounded-lg">
                                <input type="file" tw='hidden' id='label--file-upload' />
                                <label htmlFor="label--file-upload" tw="text-[#575757]">
                                    <strong tw='text-[#65676B]'>Upload</strong> or <strong tw='text-[#65676B]'>Drag and Drop</strong> works from computer
                                </label>
                            </div>
                        }

                        {popupLoading ?
                            <div tw="flex justify-end gap-4">
                                <div tw='h-[40px] mt-3 w-[120px] rounded bg-gray-200/70 block'></div>
                                <div tw='h-[40px] mt-3 w-[120px] rounded bg-gray-200/70 block'></div>
                            </div>

                            :
                            <div tw="flex justify-end gap-4">
                                <button onClick={handleCloseModal} type="button" tw="border border-2 border-[#E44C4D] text-[#E44C4D] py-2 px-6 rounded-full font-bold hover:text-white hover:bg-[#E44C4D] transition-all duration-300">Cancel</button>
                                <button tw="border border-2 border-[#E44C4D] text-white py-2 px-8 rounded-full font-bold hover:bg-white hover:text-[#E44C4D] bg-[#E44C4D] transition-all duration-300">Save</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )


    return (
        <>

            <Header />
            <Head>
                <title>Pkazo</title>
                <meta name="description" content="" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main tw="flex flex-wrap lg:flex-nowrap">
                {/* SIDEBAR */}
                <div tw='w-full -left-full lg:left-[unset] fixed lg:relative pl-16 py-5 pr-5 max-w-[250px] border-r border-[#D8D8D8]'>

                    <h4 tw='text-[16px] mb-5 text-[#3C3C3C] font-bold'>Edit Profile</h4>

                    {sidebar && sidebar.menu && <ul tw='flex flex-col gap-5'>
                        {sidebar.menu.map((item, i) => (
                            <li key={i}><a tw='text-[16px] font-light leading-[22px] hover:text-[#3C3C3C] duration-300 transition-all ease-in' href={item.url}>{item.name}</a></li>
                        ))}
                    </ul>}
                </div>
                <div tw='p-4 md:px-[72px] md:py-7 w-full lg:max-w-[calc(100% - 250px)]'>
                    <h2 tw='font-bold text-black text-[32px] leading-[44px] mb-[40px]'>Collections</h2>

                    {/* List */}
                    <div tw="flex flex-wrap justify-center gap-[35px] mb-[110px]">
                        {/* Single Image */}
                        {collectons.top && collectons.top.map((item, i) => (
                            <div key={i} tw="min-w-[110px] w-[110px] h-[110px] rounded-full overflow-hidden">
                                <Image src={item.image.src} width={item.image.width} height={item.image.height} tw="object-cover object-center" alt="" />
                            </div>
                        ))}
                        <button onClick={handleOpenModal} tw="w-[110px] h-[110px] relative rounded-full overflow-hidden">
                            <svg tw='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2' width="124" height="124" viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="124" height="124" rx="5" fill="#F3F3F3" />
                                <rect x="59.6196" y="43.7593" width="5.57152" height="35.6372" rx="2.78576" fill="#C4C4C4" />
                                <rect x="44.2979" y="64.3193" width="5.48265" height="36.2149" rx="2.74132" transform="rotate(-90 44.2979 64.3193)" fill="#C4C4C4" />
                            </svg>
                        </button>
                    </div>

                    <form>
                        <div tw="text-center">
                            {/* PROFILE IMAGE */}
                            <div tw="inline-block mb-[35px] clear-both relative rounded-full overflow-hidden w-[100px] h-[100px]">
                                <Image src={CollectionThumb_1.src} width={CollectionThumb_1.width} height={CollectionThumb_1.height} tw="w-full h-full object-cover" alt="" />

                                <input type="file" id='label--upload-image' tw='hidden' />
                                <label htmlFor='label--upload-image' tw='absolute cursor-pointer bottom-4 right-4'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle opacity="0.7" cx="9.88684" cy="9.88391" r="9.44445" fill="black" />
                                        <path d="M5.37212 8.73515H5.0249H5.37212ZM5.37212 13.0032H5.71935H5.37212ZM13.011 14.3921V14.0449V14.3921ZM6.76101 14.3921V14.7393V14.3921ZM14.3999 8.73515H14.0527H14.3999ZM14.3999 13.0032H14.7471H14.3999ZM11.9607 6.73584L12.2711 6.58063L11.9607 6.73584ZM11.6586 6.13202L11.3482 6.28723L11.6589 6.13202H11.6586ZM10.4169 5.36431V5.71153V5.36431ZM9.35581 5.36431V5.71153V5.36431ZM8.11345 6.13202L8.42421 6.28723L8.11345 6.13202ZM7.81136 6.73619L7.50129 6.58063L7.81171 6.73584L7.81136 6.73619ZM6.65997 7.44765V7.10042V7.44765ZM13.1128 7.44765V7.79487V7.44765ZM11.2749 10.5726C11.2749 10.941 11.1286 11.2943 10.8681 11.5547C10.6076 11.8152 10.2544 11.9615 9.88602 11.9615V12.656C10.4385 12.656 10.9685 12.4365 11.3592 12.0458C11.7499 11.6551 11.9693 11.1252 11.9693 10.5726H11.2749ZM9.88602 11.9615C9.51766 11.9615 9.16439 11.8152 8.90392 11.5547C8.64345 11.2943 8.49713 10.941 8.49713 10.5726H7.80268C7.80268 11.1252 8.02217 11.6551 8.41288 12.0458C8.80358 12.4365 9.33348 12.656 9.88602 12.656V11.9615ZM8.49713 10.5726C8.49713 10.2043 8.64345 9.85102 8.90392 9.59055C9.16439 9.33009 9.51766 9.18376 9.88602 9.18376V8.48931C9.33348 8.48931 8.80358 8.70881 8.41288 9.09951C8.02217 9.49021 7.80268 10.0201 7.80268 10.5726H8.49713ZM9.88602 9.18376C10.2544 9.18376 10.6076 9.33009 10.8681 9.59055C11.1286 9.85102 11.2749 10.2043 11.2749 10.5726H11.9693C11.9693 10.0201 11.7499 9.49021 11.3592 9.09951C10.9685 8.70881 10.4385 8.48931 9.88602 8.48931V9.18376ZM5.0249 8.73515V13.0032H5.71935V8.73515H5.0249ZM13.011 14.0449H6.76101V14.7393H13.011V14.0449ZM14.0527 8.73515V13.0032H14.7471V8.73515H14.0527ZM12.2714 6.58063L11.9693 5.97647L11.3482 6.28723L11.6503 6.8914L12.2711 6.58063H12.2714ZM10.4162 5.01709H9.35511V5.71153H10.4162V5.01709ZM7.80268 5.97681L7.5006 6.58063L8.12213 6.89105L8.42386 6.28723L7.80268 5.97681ZM9.35546 5.01709C9.03305 5.0171 8.71701 5.10689 8.44275 5.2764C8.1685 5.44591 7.94686 5.68844 7.80268 5.97681L8.42386 6.28723C8.51039 6.11424 8.64336 5.96876 8.8079 5.86708C8.97244 5.7654 9.16204 5.71154 9.35546 5.71153V5.01709ZM6.65963 7.79487C6.96323 7.79486 7.26084 7.71029 7.51909 7.55066C7.77734 7.39102 7.98603 7.16262 8.12178 6.89105L7.5006 6.58063C7.42251 6.73682 7.30247 6.86817 7.15394 6.95998C7.00541 7.05178 6.83424 7.10042 6.65963 7.10042V7.79487ZM13.1124 7.10042C12.9377 7.10048 12.7665 7.05188 12.6179 6.96007C12.4693 6.86826 12.3492 6.73687 12.2711 6.58063L11.6503 6.89105C11.7859 7.16251 11.9945 7.39085 12.2526 7.55047C12.5108 7.7101 12.8082 7.79473 13.1117 7.79487V7.10042H13.1124ZM11.9693 5.97681C11.8252 5.68844 11.6035 5.44591 11.3293 5.2764C11.055 5.10689 10.739 5.0171 10.4166 5.01709V5.71153C10.61 5.71154 10.7996 5.7654 10.9641 5.86708C11.1287 5.96876 11.2616 6.11424 11.3482 6.28723L11.9693 5.97681ZM14.7471 8.73515C14.7471 7.83237 14.0152 7.10042 13.1124 7.10042V7.79487C13.3618 7.79487 13.6009 7.89393 13.7773 8.07027C13.9536 8.24661 14.0527 8.48577 14.0527 8.73515H14.7471ZM5.71935 8.73515C5.71935 8.48577 5.81841 8.24661 5.99475 8.07027C6.17108 7.89393 6.41025 7.79487 6.65963 7.79487V7.10042C6.22607 7.10042 5.81027 7.27265 5.5037 7.57922C5.19713 7.88579 5.0249 8.30159 5.0249 8.73515H5.71935ZM5.0249 13.0032C5.0249 13.4636 5.20781 13.9052 5.5334 14.2308C5.85898 14.5564 6.30057 14.7393 6.76101 14.7393V14.0449C6.48475 14.0449 6.21979 13.9351 6.02444 13.7398C5.82909 13.5444 5.71935 13.2795 5.71935 13.0032H5.0249ZM13.011 14.7393C13.4715 14.7393 13.913 14.5564 14.2386 14.2308C14.5642 13.9052 14.7471 13.4636 14.7471 13.0032H14.0527C14.0527 13.2795 13.9429 13.5444 13.7476 13.7398C13.5522 13.9351 13.2873 14.0449 13.011 14.0449V14.7393Z" fill="white" />
                                    </svg>
                                </label>
                            </div>

                            {/* FIELDS */}
                            <div>
                                <div tw="block xl:inline-flex gap-5 mb-[40px] items-center">
                                    <label tw='block mb-3 text-[16px] text-[#838383] leading-[22px]' htmlFor="label--title">Title</label>
                                    <input id='label--title' type="text" tw='text-[16px] leading-[24px] border border-[#D8D8D8] w-[430px] h-[40px] px-6 max-w-full rounded-[6px]' />
                                </div>
                            </div>
                            <div>
                                <div tw="block xl:inline-flex gap-4 mb-[40px]">
                                    <label tw='block mb-3 text-[16px] mt-3 text-[#838383] leading-[22px]' htmlFor="label--desc">Description</label>
                                    <textarea tw='py-4 text-[16px] leading-[24px] border border-[#D8D8D8] rounded-[10px] w-full xl:w-[710px] h-[160px] px-6' />
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* List */}
                    <div tw="inline-flex flex-wrap gap-[20px] xl:gap-[35px]">
                        {/* Single Image */}
                        {collectons.top && collectons.bottom.map((item, i) => (
                            <div key={i} tw="min-w-[124px] w-[124px] h-[124px] rounded-[6px] overflow-hidden">
                                <Image src={item.image.src} width={item.image.width} height={item.image.height} tw="object-cover object-center" alt="" />
                            </div>
                        ))}
                        <button type='button' onClick={handleOpenModal} tw="w-[124px] h-[124px] rounded-[6px] relative">
                            <svg tw='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2' width="124" height="124" viewBox="0 0 124 124" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect width="124" height="124" rx="5" fill="#F3F3F3" />
                                <rect x="59.6196" y="43.7593" width="5.57152" height="35.6372" rx="2.78576" fill="#C4C4C4" />
                                <rect x="44.2979" y="64.3193" width="5.48265" height="36.2149" rx="2.74132" transform="rotate(-90 44.2979 64.3193)" fill="#C4C4C4" />
                            </svg>
                        </button>
                    </div>

                </div>
            </main>

            <ModalPopup isOpenModal={isOpen} />
        </>
    );
};

export default Revise;
