import React, { useState } from 'react';
import 'twin.macro';
import tw, { css } from 'twin.macro';
import Image from 'next/image';
import Logo from '../images/logo.svg';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { FiChevronLeft, FiChevronRight, FiHeart, FiSearch, FiShoppingCart, FiX } from 'react-icons/fi';
import collection1 from '../images/collections-1.png';
import CoverImage from '../images/cover-image.png';
import ProductUserThumb from '../images/james-jean.png';
import MessageThumb1 from '../images/message-user-1.png';
import MessageThumb2 from '../images/message-user-2.png';
import MessageThumb3 from '../images/message-user-3.png';
import MessageThumb4 from '../images/message-user-4.png';
import MessageThumb5 from '../images/message-user-5.png';

import CollectionThumb_1 from '../images/collections-1.png';
import CollectionThumb_2 from '../images/collections-2.png';
import CollectionThumb_3 from '../images/collections-3.png';
import CollectionThumb_4 from '../images/collections-4.png';
import CollectionThumb_5 from '../images/collections-5.png';
import CollectionThumb_6 from '../images/collections-6.png';
import CollectionThumb_7 from '../images/collections-7.png';
import CollectionThumb_8 from '../images/collections-8.png';
import CollectionThumb_9 from '../images/collections-9.png';

import Select from 'react-select';


function OnBoarding() {
    const [openNewPortFolioModal, setopenNewPortFolioModal] = useState(null);
    const [openShopManager, setOpenShopManager] = useState(false);
    const [activeShopMenuDropdown, setActiveShopMenuDropdown] = useState(null);
    const [portfolio, setPortfolio] = useState([
        {
            name: "Seastorm",
            thumb: collection1,
        },
        {
            name: "Seastorm",
            thumb: collection1,
        },
    ]);

    const handleOpenNewPortfolioModal = (e: any, getID: any) => {
        e.preventDefault();
        setopenNewPortFolioModal(getID);
    }

    const handleSubmenuOpen = (e: any, getID: any) => {
        e.preventDefault();
        setActiveShopMenuDropdown(getID);
    }

    const openNewItemModal = css`
        -webkit-transition:opacity 0.2s ease-in, top 0.3s ease-in; /* Safari */
        transition: opacity 0.2s ease-in, top 0.3s ease-in;
        ${tw`absolute bottom-0 w-full left-0 h-full z-30 pt-[5rem] before:content before:absolute before:w-full before:h-full before:top-0 before:bg-[rgba(217, 217, 217, 0.6)] before:z-[-1]`
        }
        ${openNewPortFolioModal === "create-portfolio" ?
            tw`top-0 opacity-100 before:opacity-100`
            :
            tw`top-full opacity-0 before:opacity-0`}
    `;

    const openNewPhotosModal = css`
        -webkit-transition:opacity 0.2s ease-in, top 0.3s ease-in; /* Safari */
        transition: opacity 0.2s ease-in, top 0.3s ease-in;
        ${tw`absolute bottom-0 w-full left-0 h-full z-30 pt-[5rem] before:content before:absolute before:w-full before:h-full before:top-0 before:bg-[rgba(217, 217, 217, 0.6)] before:z-[-1]`
        }
        ${openNewPortFolioModal === "portfolio-photos" ?
            tw`top-0 opacity-100 before:opacity-100`
            :
            tw`top-full opacity-0 before:opacity-0`}
    `;


    const shop_manager_list = [
        {
            name: 'Collections',
            list: [
                {
                    name: "Collection item 1",
                },
                {
                    name: "Collection item 1",
                },
                {
                    name: "Collection item 1",
                },
                {
                    name: "Collection item 1",
                },
            ]
        },
        {
            name: 'Orders',
            list: [
                {
                    name: "Ordeers item 1",
                },
                {
                    name: "Ordeers item 1",
                },
                {
                    name: "Ordeers item 1",
                },
                {
                    name: "Ordeers item 1",
                },
            ]
        },
        {
            name: 'Reviews',
            list: [
                {
                    name: "Reviews item 1",
                },
                {
                    name: "Reviews item 1",
                },
                {
                    name: "Reviews item 1",
                },
                {
                    name: "Reviews item 1",
                },
            ]
        },
        {
            name: 'Shipping',
        },
        {
            name: 'Return Policy',
        },
        {
            name: 'FAQ',
        },
        {
            name: 'Payments',
        },
    ]


    const mediaGallery = [
        {
            thumb: CollectionThumb_1,
        },
        {
            thumb: CollectionThumb_2,
        },
        {
            thumb: CollectionThumb_3,
        },
        {
            thumb: CollectionThumb_4,
        },
        {
            thumb: CollectionThumb_5,
        },
        {
            thumb: CollectionThumb_6,
        },
        {
            thumb: CollectionThumb_7,
        },
        {
            thumb: CollectionThumb_8,
        },
        {
            thumb: CollectionThumb_9,
        },
    ]


    const location = {
        desciplines: [
            { value: '1', label: 'Dropdown item 1' },
            { value: '2', label: 'Dropdown item 2' },
            { value: '3', label: 'Dropdown item 3' },
            { value: '4', label: 'Dropdown item 4' },
            { value: '5', label: 'Dropdown item 5' },
        ],
        countries: [
            { value: 'USA', label: 'USA' },
            { value: 'UK', label: 'UK' },
            { value: 'Belgium', label: 'Belgium' }
        ]
    }

    const user_profile_info = [
        {
            label: 'Education',
            button_label: 'Add a college',
            list: [
                {
                    name: 'Studied Graphic Design at Rhode Island School',
                    date: '2007 - 2011',
                }
            ]
        },
        {
            label: 'Experience',
            button_label: 'Add a workplace',
            list: [
                {
                    name: 'Software Engineer at Google',
                    date: '2007 - 2011',
                }
            ]
        },
        {
            label: 'Exhibitions',
            button_label: 'Add a gallery',
            list: [
                {
                    name: 'The Metropolitan Museum of Art',
                    date: '2021',
                },
                {
                    name: 'The Metropolitan Museum of Art',
                    date: '2021',
                },
                {
                    name: 'The Metropolitan Museum of Art',
                    date: '2021',
                },
                {
                    name: 'The Metropolitan Museum of Art',
                    date: '2021',
                },
            ]
        },
    ]

    const messages_users = [
        {
            unread: true,
            user: {
                name: "Anil",
                thumb: MessageThumb1,
            },
            timestamp: "1h",
            content: "April fool’s day",
        },
        {
            unread: true,
            user: {
                name: "Chuuthiya",
                thumb: MessageThumb2,
            },
            timestamp: "3h",
            content: "Baag",
        },
        {
            unread: false,
            user: {
                name: "Mary ma’am",
                thumb: MessageThumb3,
            },
            timestamp: "2d",
            content: "You have to report it...",
        },
        {
            unread: false,
            user: {
                name: "Bill Gates",
                thumb: MessageThumb4,
            },
            timestamp: "3d",
            content: "Baag",
        },
        {
            unread: false,
            user: {
                name: "Chuuthiya",
                thumb: MessageThumb5,
            },
            timestamp: "3d",
            content: "Happy children’s day",
        },
        {
            unread: true,
            user: {
                name: "Anil",
                thumb: MessageThumb1,
            },
            timestamp: "1h",
            content: "April fool’s day",
        },
        {
            unread: true,
            user: {
                name: "Chuuthiya",
                thumb: MessageThumb2,
            },
            timestamp: "3h",
            content: "Baag",
        },
        {
            unread: false,
            user: {
                name: "Mary ma’am",
                thumb: MessageThumb3,
            },
            timestamp: "2d",
            content: "You have to report it...",
        },
        {
            unread: false,
            user: {
                name: "Bill Gates",
                thumb: MessageThumb4,
            },
            timestamp: "3d",
            content: "Baag",
        },
        {
            unread: false,
            user: {
                name: "Chuuthiya",
                thumb: MessageThumb5,
            },
            timestamp: "3d",
            content: "Happy children’s day",
        },
        {
            unread: true,
            user: {
                name: "Anil",
                thumb: MessageThumb1,
            },
            timestamp: "1h",
            content: "April fool’s day",
        },
        {
            unread: true,
            user: {
                name: "Chuuthiya",
                thumb: MessageThumb2,
            },
            timestamp: "3h",
            content: "Baag",
        },
        {
            unread: false,
            user: {
                name: "Mary ma’am",
                thumb: MessageThumb3,
            },
            timestamp: "2d",
            content: "You have to report it...",
        },
        {
            unread: false,
            user: {
                name: "Bill Gates",
                thumb: MessageThumb4,
            },
            timestamp: "3d",
            content: "Baag",
        },
        {
            unread: false,
            user: {
                name: "Chuuthiya",
                thumb: MessageThumb5,
            },
            timestamp: "3d",
            content: "Happy children’s day",
        },
    ]

    const messages = [
        {
            me: false,
            user: {
                name: "Anil",
                thumb: ProductUserThumb,
            },
            list: [
                {
                    date: "19/03/2022",
                    content: "Hey There?",
                },
                {
                    date: "19/03/2022",
                    content: "How are you sdas?",
                },
            ]
        },
        {
            me: true,
            user: {
                name: "Anil",
                thumb: ProductUserThumb,
            },
            list: [
                {
                    date: "19/03/2022",
                    content: "Hello!",
                },
                {
                    date: "19/03/2022",
                    content: "I am fine and how are you?",
                },
            ]
        },
        {
            me: false,
            user: {
                name: "Anil",
                thumb: ProductUserThumb,
            },
            list: [
                {
                    date: "19/03/2022",
                    content: "I am doing well, Can we meet tomorrow?",
                },
            ]
        },
        {
            me: true,
            user: {
                name: "Anil",
                thumb: ProductUserThumb,
            },
            list: [
                {
                    date: "19/03/2022",
                    content: "Yes Sure!",
                },
            ]
        },
    ]
    return (
        <div tw='bg-[#E5E5E5] p-4 min-h-[100vh] flex items-center justify-center'>
            <div tw="flex gap-4 flex-wrap justify-center">


                {/* Onboarding 1 
                ===================================================================================*/}
                <div tw="border w-[375px] bg-white">

                    {/* START CODE FOR AUTH */}
                    {/* Header */}
                    <div tw="border-b border-[#E2E2E2] py-[16px] px-[20px]">
                        <div tw="flex justify-between items-center">
                            <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="" />

                            <div tw="flex gap-3">
                                <a href='#' tw='cursor-pointer'><FiSearch /></a>
                                <a href='#' tw='cursor-pointer'><FiHeart /></a>
                                <a href='#' tw='cursor-pointer'><FiShoppingCart /></a>
                            </div>
                        </div>
                    </div>
                    <div tw="p-[20px] flex flex-col h-[calc(100vh - 13rem)] overflow-x-hidden relative">

                        {/* Page Heading */}
                        <div tw='mb-8 text-center'>
                            <h3 tw='text-[#333333] text-[24px] font-bold mb-1'>Porfile Details</h3>
                            <p tw='font-normal text-[16px]'>Let’s get started! Tell us a little about you.</p>
                        </div>

                        <form action="#">
                            {/* Form Group */}
                            <div tw='mb-5'>
                                <label tw='mb-1 text-[16px] font-medium block' htmlFor="label--name">Name <sup tw='text-[#E44C4D]'>*</sup></label>
                                <input type="text" id='label--name' tw='px-5 block w-full py-2 border rounded' />
                            </div>
                            {/* Form Group */}
                            <div tw='mb-5'>
                                <label tw='mb-1 text-[16px] font-medium block' htmlFor="label--art-disiplane">Art Discipline <sup tw='text-[#E44C4D]'>*</sup></label>
                                <Select placeholder="" options={location.desciplines} />
                            </div>
                            {/* Form Group */}
                            <div tw='mb-5'>
                                <label tw='mb-1 text-[16px] font-medium block' htmlFor="label--location">Location <sup tw='text-[#E44C4D]'>*</sup></label>

                                <div tw='flex gap-4'>
                                    <div tw='w-full'>
                                        <Select options={location.countries} />
                                    </div>
                                    <div tw='w-full'>
                                        <input type="text" tw='px-5 block w-full py-2 border rounded' placeholder='City' />
                                    </div>
                                </div>
                            </div>
                            {/* Form Group */}
                            <div tw='mb-5'>
                                <div tw='mb-1 text-[16px] font-medium block'>Do you accept commissions? <sup tw='text-[#E44C4D]'>*</sup></div>

                                <div tw='flex gap-4'>
                                    <div>
                                        <input type="radio" id="label--accept-comissions-check-yes" name="check-comissions" checked value="yes" />
                                        <label tw='pl-2 leading-9 cursor-pointer text-[#838383]' htmlFor="label--accept-comissions-check-yes">Yes</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="label--accept-comissions-check-no" name="check-comissions" value="no" />
                                        <label tw='pl-2 leading-9 cursor-pointer text-[#838383]' htmlFor="label--accept-comissions-check-no">No</label>
                                    </div>
                                </div>
                            </div>
                            {/* Form Group */}
                            <div tw='mb-3'>
                                <div tw='mb-1 text-[16px] font-medium block'>Is all your work for sale? <sup tw='text-[#E44C4D]'>*</sup></div>

                                <div tw='flex gap-4'>
                                    <div>
                                        <input type="radio" id="label--work-for-sale-check-yes" name="check-work-for-sale" checked value="yes" />
                                        <label tw='pl-2 leading-9 cursor-pointer text-[#838383]' htmlFor="label--work-for-sale-check-yes">Yes</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="label--work-for-sale-check-no" name="check-work-for-sale" value="no" />
                                        <label tw='pl-2 leading-9 cursor-pointer text-[#838383]' htmlFor="label--work-for-sale-check-no">No</label>
                                    </div>
                                </div>
                            </div>
                        </form>


                        {/* Button Area */}
                        <div tw='mt-auto text-center p-3'>
                            <button tw='bg-[#E44C4D] text-white inline-flex h-[52px] items-center px-8 rounded-full text-[16px] font-bold'>Save and continue</button>
                        </div>
                    </div>
                    {/* END CODE FOR AUTH */}


                </div>


                {/* Onboarding 2 
                ===================================================================================*/}
                <div tw="border w-[375px] bg-white relative">

                    {/* START CODE FOR AUTH */}
                    {/* Header */}
                    <div tw="border-b border-[#E2E2E2] py-[16px] px-[20px]">
                        <div tw="flex justify-between items-center">
                            <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="" />

                            <div tw="flex gap-3">
                                <a href='#' tw='cursor-pointer'><FiSearch /></a>
                                <a href='#' tw='cursor-pointer'><FiHeart /></a>
                                <a href='#' onClick={() => setOpenShopManager(true)} tw='cursor-pointer'><FiShoppingCart /></a>
                            </div>
                        </div>
                    </div>
                    <div tw="p-[20px] flex flex-col h-[calc(100vh - 13rem)] overflow-x-hidden relative">

                        {/* Page Heading */}
                        <div tw='mb-8 text-center'>
                            <h3 tw='text-[#333333] text-[24px] font-bold mb-1'>Porfile Details</h3>
                            <p tw='font-normal text-[16px]'>Let’s get started! Tell us a little about you.</p>
                        </div>

                        <form action="#">
                            {/* Form Group */}
                            <div tw='mb-5'>
                                <label tw='mb-1 text-[16px] font-medium block' htmlFor="label--name">Name <sup tw='text-[#E44C4D]'>*</sup></label>
                                <input type="text" id='label--name' tw='px-5 block w-full py-2 border rounded' />
                            </div>
                            {/* Form Group */}
                            <div tw='mb-5'>
                                <label tw='mb-1 text-[16px] font-medium block' htmlFor="label--art-disiplane">Art Discipline <sup tw='text-[#E44C4D]'>*</sup></label>
                                <Select placeholder="" options={location.desciplines} />
                            </div>
                            {/* Form Group */}
                            <div tw='mb-5'>
                                <label tw='mb-1 text-[16px] font-medium block' htmlFor="label--location">Location <sup tw='text-[#E44C4D]'>*</sup></label>

                                <div tw='flex gap-4'>
                                    <div tw='w-full'>
                                        <Select options={location.countries} />
                                    </div>
                                    <div tw='w-full'>
                                        <input type="text" tw='px-5 block w-full py-2 border rounded' placeholder='City' />
                                    </div>
                                </div>
                            </div>
                            {/* Form Group */}
                            <div tw='mb-5'>
                                <div tw='mb-1 text-[16px] font-medium block'>Do you accept commissions? <sup tw='text-[#E44C4D]'>*</sup></div>

                                <div tw='flex gap-4'>
                                    <div>
                                        <input type="radio" id="label--accept-comissions-check-yes" name="check-comissions" checked value="yes" />
                                        <label tw='pl-2 leading-9 cursor-pointer text-[#838383]' htmlFor="label--accept-comissions-check-yes">Yes</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="label--accept-comissions-check-no" name="check-comissions" value="no" />
                                        <label tw='pl-2 leading-9 cursor-pointer text-[#838383]' htmlFor="label--accept-comissions-check-no">No</label>
                                    </div>
                                </div>
                            </div>
                            {/* Form Group */}
                            <div tw='mb-3'>
                                <div tw='mb-1 text-[16px] font-medium block'>Is all your work for sale? <sup tw='text-[#E44C4D]'>*</sup></div>

                                <div tw='flex gap-4'>
                                    <div>
                                        <input type="radio" id="label--work-for-sale-check-yes" name="check-work-for-sale" checked value="yes" />
                                        <label tw='pl-2 leading-9 cursor-pointer text-[#838383]' htmlFor="label--work-for-sale-check-yes">Yes</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="label--work-for-sale-check-no" name="check-work-for-sale" value="no" />
                                        <label tw='pl-2 leading-9 cursor-pointer text-[#838383]' htmlFor="label--work-for-sale-check-no">No</label>
                                    </div>
                                </div>
                            </div>
                            {/* Form Group */}
                            <div tw='mb-3'>
                                <div tw='mb-1 text-[16px] font-medium block'>Are your collections unique to you? <sup tw='text-[#E44C4D]'>*</sup></div>

                                <div tw='flex gap-4'>
                                    <div>
                                        <input type="radio" id="label--collections-unique-check-yes" name="check-collections-unique" checked value="yes" />
                                        <label tw='pl-2 leading-9 cursor-pointer text-[#838383]' htmlFor="label--collections-unique-check-yes">Yes</label>
                                    </div>

                                    <div>
                                        <input type="radio" id="label--collections-unique-check-no" name="check-collections-unique" value="no" />
                                        <label tw='pl-2 leading-9 cursor-pointer text-[#838383]' htmlFor="label--collections-unique-check-no">No</label>
                                    </div>
                                </div>
                            </div>
                        </form>


                        {/* Button Area */}
                        <div tw='mt-auto text-center p-3'>
                            <button tw='bg-[#E44C4D] text-white inline-flex h-[52px] items-center px-8 rounded-full text-[16px] font-bold'>Save and continue</button>
                        </div>
                    </div>
                    {/* END CODE FOR AUTH */}
                </div>


                {/* Shop Manager
                ===================================================================================*/}
                <div tw="border w-[375px] bg-white relative">

                    {/* START CODE FOR AUTH */}
                    {/* Header */}
                    <div tw="border-b border-[#E2E2E2] py-[16px] px-[20px]">
                        <div tw="flex justify-between items-center">
                            <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="" />

                            <div tw="flex gap-3">
                                <a href='#' tw='cursor-pointer'><FiSearch /></a>
                                <a href='#' tw='cursor-pointer'><FiHeart /></a>
                                <a href='#' onClick={() => setOpenShopManager(true)} tw='cursor-pointer'><FiShoppingCart /></a>
                            </div>
                        </div>
                    </div>
                    <div tw="p-[20px] flex flex-col h-[calc(100vh - 13rem)] overflow-x-hidden relative">
                        {/* Content */}
                    </div>
                    {/* END CODE FOR AUTH */}
                    <div tw='w-full h-full absolute top-0 left-0 right-0 bg-white'>
                        {/* Header */}
                        <div tw="border-b border-[#E2E2E2] text-[16px] py-[16px] px-[20px]">
                            <div tw="flex justify-between items-center">
                                <span tw='text-[20px] cursor-pointer'>
                                    <FiX />
                                </span>
                                <h6 tw='text-[#3C3C3C] mx-auto font-semibold'>Shop Manager</h6>
                            </div>
                        </div>

                        <div tw='py-3'>
                            {shop_manager_list && <ul>
                                {shop_manager_list.map((item, idx) => (
                                    <li key={idx}>
                                        {item.list ?
                                            <a onClick={(e) => handleSubmenuOpen(e, `menu-item--${idx}`)} tw='block py-[10px] flex items-center px-[20px] hover:bg-[#F0F0F0] transition-all duration-300' href="#">
                                                {item.name}

                                                {item.list && <span tw='ml-auto align-middle'>
                                                    <FiChevronRight />
                                                </span>}
                                            </a>
                                            :

                                            <a tw='block py-[10px] flex items-center px-[20px] hover:bg-[#F0F0F0] transition-all duration-300' href="#">
                                                {item.name}

                                                {item.list && <span tw='ml-auto align-middle'>
                                                    <FiChevronRight />
                                                </span>}
                                            </a>

                                        }

                                        {item.list && activeShopMenuDropdown === `menu-item--${idx}` && <ul>
                                            {item.list.map((sub, i) => (
                                                <li key={i}><a tw='block py-[10px] flex items-center px-[20px] hover:bg-[#F0F0F0] transition-all duration-300' href="#">
                                                    {sub.name}
                                                </a></li>
                                            ))}
                                        </ul>}
                                    </li>
                                ))}
                            </ul>}
                        </div>




                    </div>

                </div>


                {/* Portfilo (Onboarding - if FS yes) 
                ===================================================================================*/}
                <div tw="border w-[375px] bg-white relative overflow-hidden">

                    {/* START CODE FOR AUTH */}
                    {/* Header */}
                    <div tw="border-b border-[#E2E2E2] py-[16px] px-[20px]">
                        <div tw="flex justify-between items-center">
                            <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="" />

                            <div tw="flex gap-3">
                                <a href='#' tw='cursor-pointer'><FiSearch /></a>
                                <a href='#' tw='cursor-pointer'><FiHeart /></a>
                                <a href='#' tw='cursor-pointer'><FiShoppingCart /></a>
                            </div>
                        </div>
                    </div>
                    <div tw="p-[20px] flex flex-col h-[calc(100vh - 13rem)] overflow-x-hidden relative z-10">

                        {/* Page Heading */}
                        <div tw='mb-8 text-center'>
                            <h3 tw='text-[#333333] text-[24px] font-bold mb-1'>Create a Portfolio</h3>
                            <p tw='font-normal text-[16px]'>How would you like to categorize your work?</p>
                        </div>

                        <ul tw='flex items-center flex-col gap-5'>
                            {portfolio.map((item, id) => (
                                <li key={id} tw="text-center">
                                    <div tw="inline-block clear-both relative rounded-full w-[100px] h-[100px]">
                                        <Image src={item.thumb.src} width={item.thumb.width} height={item.thumb.height} tw="w-full h-full object-cover rounded-full" alt="" />
                                        <span tw='bg-[#000000] text-white flex justify-center items-center rounded-full top-0 right-2 w-[20px] h-[20px] absolute z-10'>
                                            <FiX />
                                        </span>
                                    </div>
                                    <h4 tw='text-[16px] font-semibold text-[#000000]'>{item.name}</h4>
                                </li>
                            ))}
                            <li tw="">
                                <button onClick={(e) => handleOpenNewPortfolioModal(e, 'create-portfolio')} tw="inline-block clear-both relative rounded-full w-[100px] h-[100px]">
                                    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="100" height="100" rx="50" fill="#F3F3F3" />
                                        <rect x="47.7783" y="36.1113" width="4.44444" height="27.7778" rx="2.22222" fill="#C4C4C4" />
                                        <rect x="36.1113" y="52.2227" width="4.44444" height="27.7778" rx="2.22222" transform="rotate(-90 36.1113 52.2227)" fill="#C4C4C4" />
                                    </svg>
                                </button>
                            </li>
                        </ul>

                        {/* Button Area */}
                        <div tw='mt-auto text-center border-t border-[#E2E2E2] mx-[-20px] p-3'>
                            <button tw='bg-[#E44C4D] text-white inline-flex h-[52px] items-center px-8 rounded-full text-[16px] font-bold'>Save and continue</button>
                        </div>
                    </div>


                    {/* ADD NEW PORTFOLIO */}
                    <div css={[openNewItemModal]}>
                        <div tw='rounded-t-[12px] flex flex-col bg-white w-full h-full left-0 right-0' css={{ "box-shadow": "0px -3px 20px rgba(173, 173, 173, 0.25)", }}>
                            {/* Header */}
                            <div tw="border-b border-[#E2E2E2] text-[16px] py-[16px] px-[20px]">
                                <div tw="flex justify-between items-center">
                                    <span onClick={() => setopenNewPortFolioModal(null)} tw='text-[20px] cursor-pointer'>
                                        <FiX />
                                    </span>
                                    <h6 tw='text-[#3C3C3C] font-semibold'>Portfolio 1</h6>
                                    <button tw='text-[#3C3C3C] font-semibold'>Save</button>
                                </div>
                            </div>
                            <div tw='px-[20px] pt-[20px] mb-3 text-center'>
                                {/* PROFILE IMAGE */}
                                <div tw="inline-block clear-both relative w-[100px] h-[100px]">
                                    <Image src={collection1.src} width={collection1.width} height={collection1.height} tw="w-full h-full rounded-full object-cover" alt="" />

                                    <input type="file" id='label--upload-image' tw='hidden' />
                                    <label htmlFor='label--upload-image' tw='absolute cursor-pointer bottom-0 right-4'>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <circle opacity="0.7" cx="9.88684" cy="9.88391" r="9.44445" fill="black" />
                                            <path d="M5.37212 8.73515H5.0249H5.37212ZM5.37212 13.0032H5.71935H5.37212ZM13.011 14.3921V14.0449V14.3921ZM6.76101 14.3921V14.7393V14.3921ZM14.3999 8.73515H14.0527H14.3999ZM14.3999 13.0032H14.7471H14.3999ZM11.9607 6.73584L12.2711 6.58063L11.9607 6.73584ZM11.6586 6.13202L11.3482 6.28723L11.6589 6.13202H11.6586ZM10.4169 5.36431V5.71153V5.36431ZM9.35581 5.36431V5.71153V5.36431ZM8.11345 6.13202L8.42421 6.28723L8.11345 6.13202ZM7.81136 6.73619L7.50129 6.58063L7.81171 6.73584L7.81136 6.73619ZM6.65997 7.44765V7.10042V7.44765ZM13.1128 7.44765V7.79487V7.44765ZM11.2749 10.5726C11.2749 10.941 11.1286 11.2943 10.8681 11.5547C10.6076 11.8152 10.2544 11.9615 9.88602 11.9615V12.656C10.4385 12.656 10.9685 12.4365 11.3592 12.0458C11.7499 11.6551 11.9693 11.1252 11.9693 10.5726H11.2749ZM9.88602 11.9615C9.51766 11.9615 9.16439 11.8152 8.90392 11.5547C8.64345 11.2943 8.49713 10.941 8.49713 10.5726H7.80268C7.80268 11.1252 8.02217 11.6551 8.41288 12.0458C8.80358 12.4365 9.33348 12.656 9.88602 12.656V11.9615ZM8.49713 10.5726C8.49713 10.2043 8.64345 9.85102 8.90392 9.59055C9.16439 9.33009 9.51766 9.18376 9.88602 9.18376V8.48931C9.33348 8.48931 8.80358 8.70881 8.41288 9.09951C8.02217 9.49021 7.80268 10.0201 7.80268 10.5726H8.49713ZM9.88602 9.18376C10.2544 9.18376 10.6076 9.33009 10.8681 9.59055C11.1286 9.85102 11.2749 10.2043 11.2749 10.5726H11.9693C11.9693 10.0201 11.7499 9.49021 11.3592 9.09951C10.9685 8.70881 10.4385 8.48931 9.88602 8.48931V9.18376ZM5.0249 8.73515V13.0032H5.71935V8.73515H5.0249ZM13.011 14.0449H6.76101V14.7393H13.011V14.0449ZM14.0527 8.73515V13.0032H14.7471V8.73515H14.0527ZM12.2714 6.58063L11.9693 5.97647L11.3482 6.28723L11.6503 6.8914L12.2711 6.58063H12.2714ZM10.4162 5.01709H9.35511V5.71153H10.4162V5.01709ZM7.80268 5.97681L7.5006 6.58063L8.12213 6.89105L8.42386 6.28723L7.80268 5.97681ZM9.35546 5.01709C9.03305 5.0171 8.71701 5.10689 8.44275 5.2764C8.1685 5.44591 7.94686 5.68844 7.80268 5.97681L8.42386 6.28723C8.51039 6.11424 8.64336 5.96876 8.8079 5.86708C8.97244 5.7654 9.16204 5.71154 9.35546 5.71153V5.01709ZM6.65963 7.79487C6.96323 7.79486 7.26084 7.71029 7.51909 7.55066C7.77734 7.39102 7.98603 7.16262 8.12178 6.89105L7.5006 6.58063C7.42251 6.73682 7.30247 6.86817 7.15394 6.95998C7.00541 7.05178 6.83424 7.10042 6.65963 7.10042V7.79487ZM13.1124 7.10042C12.9377 7.10048 12.7665 7.05188 12.6179 6.96007C12.4693 6.86826 12.3492 6.73687 12.2711 6.58063L11.6503 6.89105C11.7859 7.16251 11.9945 7.39085 12.2526 7.55047C12.5108 7.7101 12.8082 7.79473 13.1117 7.79487V7.10042H13.1124ZM11.9693 5.97681C11.8252 5.68844 11.6035 5.44591 11.3293 5.2764C11.055 5.10689 10.739 5.0171 10.4166 5.01709V5.71153C10.61 5.71154 10.7996 5.7654 10.9641 5.86708C11.1287 5.96876 11.2616 6.11424 11.3482 6.28723L11.9693 5.97681ZM14.7471 8.73515C14.7471 7.83237 14.0152 7.10042 13.1124 7.10042V7.79487C13.3618 7.79487 13.6009 7.89393 13.7773 8.07027C13.9536 8.24661 14.0527 8.48577 14.0527 8.73515H14.7471ZM5.71935 8.73515C5.71935 8.48577 5.81841 8.24661 5.99475 8.07027C6.17108 7.89393 6.41025 7.79487 6.65963 7.79487V7.10042C6.22607 7.10042 5.81027 7.27265 5.5037 7.57922C5.19713 7.88579 5.0249 8.30159 5.0249 8.73515H5.71935ZM5.0249 13.0032C5.0249 13.4636 5.20781 13.9052 5.5334 14.2308C5.85898 14.5564 6.30057 14.7393 6.76101 14.7393V14.0449C6.48475 14.0449 6.21979 13.9351 6.02444 13.7398C5.82909 13.5444 5.71935 13.2795 5.71935 13.0032H5.0249ZM13.011 14.7393C13.4715 14.7393 13.913 14.5564 14.2386 14.2308C14.5642 13.9052 14.7471 13.4636 14.7471 13.0032H14.0527C14.0527 13.2795 13.9429 13.5444 13.7476 13.7398C13.5522 13.9351 13.2873 14.0449 13.011 14.0449V14.7393Z" fill="white" />
                                        </svg>
                                    </label>
                                </div>
                            </div>
                            {/* Form Group */}
                            <div tw='px-[20px] mb-4'>
                                <input type="text" placeholder='Title *' tw='py-2 px-5 rounded border w-full text-[16px]' />
                            </div>
                            {/* Form Group */}
                            <div tw='px-[20px] mb-4'>
                                <textarea placeholder='(Optional) Write a description...' tw='py-2 px-5 rounded border w-full text-[16px] resize-none h-[100px]'></textarea>
                            </div>

                            {/* From Group */}
                            <div tw='p-[20px] max-h-[23vh] overflow-x-hidden'>
                                <ul tw='flex gap-3 flex-wrap'>
                                    {mediaGallery && mediaGallery.map((item, id) => (
                                        <li onClick={(e) => handleOpenNewPortfolioModal(e, 'portfolio-photos')} key={id} tw='w-[70px] h-[70px] cursor-pointer'>
                                            <Image src={item.thumb.src} width={item.thumb.width} height={item.thumb.height} tw="w-full h-full object-cover" alt="" />
                                        </li>
                                    ))}
                                </ul>
                            </div>


                            {/* Form Group */}
                            <div tw='px-[20px] mb-4 mt-auto'>
                                <input type="file" tw='hidden' id='upload-portfolio-image' />
                                <label htmlFor="upload-portfolio-image" tw='border-2 cursor-pointer border-dashed rounded block p-4 text-center'>
                                    <h6 tw='text-[20px] font-normal font-open-sans text-[#808080]'><strong tw='text-[#3C3C3C]'>Upload</strong> works <br />in this portfolio</h6>
                                </label>
                            </div>
                        </div>
                    </div>
                    {/* END CODE FOR AUTH */}

                    {/* ADD NEW PHOTOS */}
                    <div css={[openNewPhotosModal]}>
                        <div tw='rounded-t-[12px] flex flex-col bg-white w-full h-full left-0 right-0' css={{ "box-shadow": "0px -3px 20px rgba(173, 173, 173, 0.25)", }}>
                            {/* Header */}
                            <div tw="border-b border-[#E2E2E2] text-[16px] py-[16px] px-[20px]">
                                <div tw="flex justify-between items-center">
                                    <span onClick={() => setopenNewPortFolioModal(null)} tw='text-[20px] cursor-pointer'>
                                        <FiChevronLeft />
                                    </span>
                                    <h6 tw='text-[#3C3C3C] font-semibold'>Photos</h6>
                                    <button tw='text-[#3C3C3C] font-semibold'>Done</button>
                                </div>
                            </div>
                            <div tw='px-[20px] pt-[20px] mb-3 text-center'>
                                <p tw='text-[16px] text-[#808080] font-normal leading-[22px]'>For now, only one image per work. You will be able to add multiple images later.</p>
                            </div>
                            {/* Gallery */}
                            <div tw='p-[20px] mb-4 max-h-[calc(100vh - 15rem)] overflow-x-hidden'>
                                <ul tw="grid grid-cols-2 gap-3 flex-wrap">
                                    {mediaGallery && mediaGallery.map((item, idx) => (
                                        <li key={idx} tw="inline-block clear-both relative">
                                            <Image src={item.thumb.src} width={300} height={300} tw="w-full h-full object-cover" alt="" />
                                            <span tw='bg-[#000000] text-white cursor-pointer flex justify-center items-center rounded-full top-[-0.5rem] left-[-0.5rem] w-[20px] h-[20px] absolute z-10'>
                                                <FiX />
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/* END CODE FOR AUTH */}
                </div>



                {/* EDIT PROFILE 
                ===================================================================================*/}
                <div tw="border w-[375px] bg-white">

                    {/* START CODE FOR AUTH */}
                    {/* Header */}
                    <div tw="border-b border-[#E2E2E2] py-[16px] px-[20px]">
                        <div tw="flex justify-between items-center">
                            <a href="#" tw='text-[#000000] text-[14px] font-semibold'>Cancel</a>

                            <h5 tw="mb-0 text-[#000000] text-[14px] font-bold">Edit Profile</h5>

                            <button tw='text-[#E44C4D] text-[14px] font-semibold'>Done</button>

                        </div>
                    </div>
                    <form tw="p-[20px] flex flex-col h-[calc(100vh - 13rem)] overflow-x-hidden relative">


                        {/* Page Heading */}
                        <div tw='mb-3 text-center'>
                            {/* PROFILE IMAGE */}
                            <div tw="inline-block clear-both relative rounded-full overflow-hidden w-[80px] h-[80px]">
                                <Image src={ProductUserThumb.src} width={ProductUserThumb.width} height={ProductUserThumb.height} tw="w-full h-full object-cover" alt="" />

                                <input type="file" id='label--upload-image' tw='hidden' />
                                <label htmlFor='label--upload-image' tw='absolute cursor-pointer bottom-4 right-4'>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle opacity="0.7" cx="9.88684" cy="9.88391" r="9.44445" fill="black" />
                                        <path d="M5.37212 8.73515H5.0249H5.37212ZM5.37212 13.0032H5.71935H5.37212ZM13.011 14.3921V14.0449V14.3921ZM6.76101 14.3921V14.7393V14.3921ZM14.3999 8.73515H14.0527H14.3999ZM14.3999 13.0032H14.7471H14.3999ZM11.9607 6.73584L12.2711 6.58063L11.9607 6.73584ZM11.6586 6.13202L11.3482 6.28723L11.6589 6.13202H11.6586ZM10.4169 5.36431V5.71153V5.36431ZM9.35581 5.36431V5.71153V5.36431ZM8.11345 6.13202L8.42421 6.28723L8.11345 6.13202ZM7.81136 6.73619L7.50129 6.58063L7.81171 6.73584L7.81136 6.73619ZM6.65997 7.44765V7.10042V7.44765ZM13.1128 7.44765V7.79487V7.44765ZM11.2749 10.5726C11.2749 10.941 11.1286 11.2943 10.8681 11.5547C10.6076 11.8152 10.2544 11.9615 9.88602 11.9615V12.656C10.4385 12.656 10.9685 12.4365 11.3592 12.0458C11.7499 11.6551 11.9693 11.1252 11.9693 10.5726H11.2749ZM9.88602 11.9615C9.51766 11.9615 9.16439 11.8152 8.90392 11.5547C8.64345 11.2943 8.49713 10.941 8.49713 10.5726H7.80268C7.80268 11.1252 8.02217 11.6551 8.41288 12.0458C8.80358 12.4365 9.33348 12.656 9.88602 12.656V11.9615ZM8.49713 10.5726C8.49713 10.2043 8.64345 9.85102 8.90392 9.59055C9.16439 9.33009 9.51766 9.18376 9.88602 9.18376V8.48931C9.33348 8.48931 8.80358 8.70881 8.41288 9.09951C8.02217 9.49021 7.80268 10.0201 7.80268 10.5726H8.49713ZM9.88602 9.18376C10.2544 9.18376 10.6076 9.33009 10.8681 9.59055C11.1286 9.85102 11.2749 10.2043 11.2749 10.5726H11.9693C11.9693 10.0201 11.7499 9.49021 11.3592 9.09951C10.9685 8.70881 10.4385 8.48931 9.88602 8.48931V9.18376ZM5.0249 8.73515V13.0032H5.71935V8.73515H5.0249ZM13.011 14.0449H6.76101V14.7393H13.011V14.0449ZM14.0527 8.73515V13.0032H14.7471V8.73515H14.0527ZM12.2714 6.58063L11.9693 5.97647L11.3482 6.28723L11.6503 6.8914L12.2711 6.58063H12.2714ZM10.4162 5.01709H9.35511V5.71153H10.4162V5.01709ZM7.80268 5.97681L7.5006 6.58063L8.12213 6.89105L8.42386 6.28723L7.80268 5.97681ZM9.35546 5.01709C9.03305 5.0171 8.71701 5.10689 8.44275 5.2764C8.1685 5.44591 7.94686 5.68844 7.80268 5.97681L8.42386 6.28723C8.51039 6.11424 8.64336 5.96876 8.8079 5.86708C8.97244 5.7654 9.16204 5.71154 9.35546 5.71153V5.01709ZM6.65963 7.79487C6.96323 7.79486 7.26084 7.71029 7.51909 7.55066C7.77734 7.39102 7.98603 7.16262 8.12178 6.89105L7.5006 6.58063C7.42251 6.73682 7.30247 6.86817 7.15394 6.95998C7.00541 7.05178 6.83424 7.10042 6.65963 7.10042V7.79487ZM13.1124 7.10042C12.9377 7.10048 12.7665 7.05188 12.6179 6.96007C12.4693 6.86826 12.3492 6.73687 12.2711 6.58063L11.6503 6.89105C11.7859 7.16251 11.9945 7.39085 12.2526 7.55047C12.5108 7.7101 12.8082 7.79473 13.1117 7.79487V7.10042H13.1124ZM11.9693 5.97681C11.8252 5.68844 11.6035 5.44591 11.3293 5.2764C11.055 5.10689 10.739 5.0171 10.4166 5.01709V5.71153C10.61 5.71154 10.7996 5.7654 10.9641 5.86708C11.1287 5.96876 11.2616 6.11424 11.3482 6.28723L11.9693 5.97681ZM14.7471 8.73515C14.7471 7.83237 14.0152 7.10042 13.1124 7.10042V7.79487C13.3618 7.79487 13.6009 7.89393 13.7773 8.07027C13.9536 8.24661 14.0527 8.48577 14.0527 8.73515H14.7471ZM5.71935 8.73515C5.71935 8.48577 5.81841 8.24661 5.99475 8.07027C6.17108 7.89393 6.41025 7.79487 6.65963 7.79487V7.10042C6.22607 7.10042 5.81027 7.27265 5.5037 7.57922C5.19713 7.88579 5.0249 8.30159 5.0249 8.73515H5.71935ZM5.0249 13.0032C5.0249 13.4636 5.20781 13.9052 5.5334 14.2308C5.85898 14.5564 6.30057 14.7393 6.76101 14.7393V14.0449C6.48475 14.0449 6.21979 13.9351 6.02444 13.7398C5.82909 13.5444 5.71935 13.2795 5.71935 13.0032H5.0249ZM13.011 14.7393C13.4715 14.7393 13.913 14.5564 14.2386 14.2308C14.5642 13.9052 14.7471 13.4636 14.7471 13.0032H14.0527C14.0527 13.2795 13.9429 13.5444 13.7476 13.7398C13.5522 13.9351 13.2873 14.0449 13.011 14.0449V14.7393Z" fill="white" />
                                    </svg>
                                </label>
                            </div>
                            {/* Form Group */}
                            <div tw='mb-3 flex gap-4 items-center text-[14px]'>
                                <label tw='w-[30%] text-left font-open-sans font-semibold text-[#000000]' htmlFor="label-user-edit--name">Name</label>
                                <input type="text" tw='px-5 block w-full py-2 border rounded' id="label-user-edit--name" value={'James jean'} />
                            </div>
                            {/* Form Group */}
                            <div tw='mb-3 flex gap-4 items-center text-[14px]'>
                                <label tw='w-[30%] text-left font-open-sans font-semibold text-[#000000]' htmlFor="label-user-edit--discipline">Discipline</label>
                                <div tw='w-full text-left text-[14px]'>
                                    <Select placeholder="" options={location.desciplines} />
                                </div>
                            </div>
                            {/* Form Group */}
                            <div tw='mb-3 flex gap-4 items-center text-[14px]'>
                                <label tw='w-[30%] text-left font-open-sans font-semibold text-[#000000]' htmlFor="label-user-edit--location">Location</label>
                                <input type="text" tw='px-5 block w-full py-2 border rounded' id="label-user-edit--location" value={'Denver, CO'} />
                            </div>
                            {/* Form Group */}
                            <div tw='mb-5 text-[14px]'>
                                <label tw='block text-left font-open-sans font-semibold mb-2 text-[#000000]' htmlFor="label-user-edit--location">Bio</label>
                                <textarea name="" id="label-user-edit--location" tw='rounded-lg border border-[#D8D8D8] h-[80px] px-5 py-2 block w-full resize-none'>Awide-ranging practice, Mike Kelley mined the banal objects of everyday life and repurposed them in dark, imagination. I am aaa</textarea>
                            </div>


                            {/* Cover Photo */}
                            <div tw='mb-5 text-[14px]'>
                                <h6 tw='block text-left font-open-sans font-semibold mb-2 text-[#000000]'>Cover Image</h6>
                                {/* PROFILE IMAGE */}
                                <div tw="mx-[-20px]">
                                    <div tw="block clear-both relative overflow-hidden w-full h-[140px]">
                                        <Image src={CoverImage.src} width={CoverImage.width} height={CoverImage.height} tw="w-full h-full object-cover" alt="" />

                                        <input type="file" id='label--upload-cover-image' tw='hidden' />
                                        <label htmlFor='label--upload-cover-image' tw='absolute cursor-pointer bottom-4 right-4'>
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <circle opacity="0.7" cx="9.88684" cy="9.88391" r="9.44445" fill="black" />
                                                <path d="M5.37212 8.73515H5.0249H5.37212ZM5.37212 13.0032H5.71935H5.37212ZM13.011 14.3921V14.0449V14.3921ZM6.76101 14.3921V14.7393V14.3921ZM14.3999 8.73515H14.0527H14.3999ZM14.3999 13.0032H14.7471H14.3999ZM11.9607 6.73584L12.2711 6.58063L11.9607 6.73584ZM11.6586 6.13202L11.3482 6.28723L11.6589 6.13202H11.6586ZM10.4169 5.36431V5.71153V5.36431ZM9.35581 5.36431V5.71153V5.36431ZM8.11345 6.13202L8.42421 6.28723L8.11345 6.13202ZM7.81136 6.73619L7.50129 6.58063L7.81171 6.73584L7.81136 6.73619ZM6.65997 7.44765V7.10042V7.44765ZM13.1128 7.44765V7.79487V7.44765ZM11.2749 10.5726C11.2749 10.941 11.1286 11.2943 10.8681 11.5547C10.6076 11.8152 10.2544 11.9615 9.88602 11.9615V12.656C10.4385 12.656 10.9685 12.4365 11.3592 12.0458C11.7499 11.6551 11.9693 11.1252 11.9693 10.5726H11.2749ZM9.88602 11.9615C9.51766 11.9615 9.16439 11.8152 8.90392 11.5547C8.64345 11.2943 8.49713 10.941 8.49713 10.5726H7.80268C7.80268 11.1252 8.02217 11.6551 8.41288 12.0458C8.80358 12.4365 9.33348 12.656 9.88602 12.656V11.9615ZM8.49713 10.5726C8.49713 10.2043 8.64345 9.85102 8.90392 9.59055C9.16439 9.33009 9.51766 9.18376 9.88602 9.18376V8.48931C9.33348 8.48931 8.80358 8.70881 8.41288 9.09951C8.02217 9.49021 7.80268 10.0201 7.80268 10.5726H8.49713ZM9.88602 9.18376C10.2544 9.18376 10.6076 9.33009 10.8681 9.59055C11.1286 9.85102 11.2749 10.2043 11.2749 10.5726H11.9693C11.9693 10.0201 11.7499 9.49021 11.3592 9.09951C10.9685 8.70881 10.4385 8.48931 9.88602 8.48931V9.18376ZM5.0249 8.73515V13.0032H5.71935V8.73515H5.0249ZM13.011 14.0449H6.76101V14.7393H13.011V14.0449ZM14.0527 8.73515V13.0032H14.7471V8.73515H14.0527ZM12.2714 6.58063L11.9693 5.97647L11.3482 6.28723L11.6503 6.8914L12.2711 6.58063H12.2714ZM10.4162 5.01709H9.35511V5.71153H10.4162V5.01709ZM7.80268 5.97681L7.5006 6.58063L8.12213 6.89105L8.42386 6.28723L7.80268 5.97681ZM9.35546 5.01709C9.03305 5.0171 8.71701 5.10689 8.44275 5.2764C8.1685 5.44591 7.94686 5.68844 7.80268 5.97681L8.42386 6.28723C8.51039 6.11424 8.64336 5.96876 8.8079 5.86708C8.97244 5.7654 9.16204 5.71154 9.35546 5.71153V5.01709ZM6.65963 7.79487C6.96323 7.79486 7.26084 7.71029 7.51909 7.55066C7.77734 7.39102 7.98603 7.16262 8.12178 6.89105L7.5006 6.58063C7.42251 6.73682 7.30247 6.86817 7.15394 6.95998C7.00541 7.05178 6.83424 7.10042 6.65963 7.10042V7.79487ZM13.1124 7.10042C12.9377 7.10048 12.7665 7.05188 12.6179 6.96007C12.4693 6.86826 12.3492 6.73687 12.2711 6.58063L11.6503 6.89105C11.7859 7.16251 11.9945 7.39085 12.2526 7.55047C12.5108 7.7101 12.8082 7.79473 13.1117 7.79487V7.10042H13.1124ZM11.9693 5.97681C11.8252 5.68844 11.6035 5.44591 11.3293 5.2764C11.055 5.10689 10.739 5.0171 10.4166 5.01709V5.71153C10.61 5.71154 10.7996 5.7654 10.9641 5.86708C11.1287 5.96876 11.2616 6.11424 11.3482 6.28723L11.9693 5.97681ZM14.7471 8.73515C14.7471 7.83237 14.0152 7.10042 13.1124 7.10042V7.79487C13.3618 7.79487 13.6009 7.89393 13.7773 8.07027C13.9536 8.24661 14.0527 8.48577 14.0527 8.73515H14.7471ZM5.71935 8.73515C5.71935 8.48577 5.81841 8.24661 5.99475 8.07027C6.17108 7.89393 6.41025 7.79487 6.65963 7.79487V7.10042C6.22607 7.10042 5.81027 7.27265 5.5037 7.57922C5.19713 7.88579 5.0249 8.30159 5.0249 8.73515H5.71935ZM5.0249 13.0032C5.0249 13.4636 5.20781 13.9052 5.5334 14.2308C5.85898 14.5564 6.30057 14.7393 6.76101 14.7393V14.0449C6.48475 14.0449 6.21979 13.9351 6.02444 13.7398C5.82909 13.5444 5.71935 13.2795 5.71935 13.0032H5.0249ZM13.011 14.7393C13.4715 14.7393 13.913 14.5564 14.2386 14.2308C14.5642 13.9052 14.7471 13.4636 14.7471 13.0032H14.0527C14.0527 13.2795 13.9429 13.5444 13.7476 13.7398C13.5522 13.9351 13.2873 14.0449 13.011 14.0449V14.7393Z" fill="white" />
                                            </svg>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            {/* EDUCATION */}
                            {
                                user_profile_info && user_profile_info.map((item, idx) => (
                                    <div key={idx} tw='mb-5 text-left text-[14px]'>
                                        <h6 tw='block font-open-sans font-semibold mb-2 text-[#000000]'>{item.label}</h6>

                                        {/* Add New */}
                                        <button tw="py-2 flex gap-2 items-center shadow-[0px, 0px rgba(97, 97, 97, 0.25)] mb-3 px-4 border border-[#D8D8D8] rounded">
                                            <span>
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M13.125 6.125H7.875V0.875C7.875 0.642936 7.78281 0.420376 7.61872 0.256282C7.45462 0.0921874 7.23206 0 7 0C6.76794 0 6.54538 0.0921874 6.38128 0.256282C6.21719 0.420376 6.125 0.642936 6.125 0.875V6.125H0.875C0.642936 6.125 0.420376 6.21719 0.256282 6.38128C0.0921874 6.54538 0 6.76794 0 7C0 7.23206 0.0921874 7.45462 0.256282 7.61872C0.420376 7.78281 0.642936 7.875 0.875 7.875H6.125V13.125C6.125 13.3571 6.21719 13.5796 6.38128 13.7437C6.54538 13.9078 6.76794 14 7 14C7.23206 14 7.45462 13.9078 7.61872 13.7437C7.78281 13.5796 7.875 13.3571 7.875 13.125V7.875H13.125C13.3571 7.875 13.5796 7.78281 13.7437 7.61872C13.9078 7.45462 14 7.23206 14 7C14 6.76794 13.9078 6.54538 13.7437 6.38128C13.5796 6.21719 13.3571 6.125 13.125 6.125Z" fill="#E44C4D" />
                                                </svg>
                                            </span>
                                            <span>{item.button_label}</span>
                                        </button>
                                        {item.list &&
                                            <ul tw="block pl-5 lg:pl-8 clear-both relative flex gap-4 flex-col">
                                                {item.list.map((edu, i) => (
                                                    <li key={i}>
                                                        <h6 tw='font-bold text-[#000000] text-[12px] font-open-sans'>{edu.name}</h6>
                                                        <p tw='font-normal text-[#838383] text-[12px]'>{edu.date}</p>
                                                    </li>
                                                ))}
                                            </ul>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </form>
                    {/* END CODE FOR AUTH */}

                </div>

                {/* Edit Collections
                ===================================================================================*/}
                <div tw="border w-[375px] bg-white">

                    {/* START CODE FOR AUTH */}
                    {/* Header */}
                    <div tw="border-b border-[#E2E2E2] py-[16px] px-[20px]">
                        <div tw="flex items-center gap-2">
                            <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.240234 8.94922C0.240234 9.28125 0.367188 9.56445 0.630859 9.81836L8.24805 17.2695C8.45312 17.4844 8.72656 17.5918 9.03906 17.5918C9.67383 17.5918 10.1719 17.1035 10.1719 16.459C10.1719 16.1465 10.0449 15.8633 9.83008 15.6484L2.96484 8.94922L9.83008 2.25C10.0449 2.02539 10.1719 1.74219 10.1719 1.42969C10.1719 0.794922 9.67383 0.306641 9.03906 0.306641C8.72656 0.306641 8.45312 0.414062 8.24805 0.628906L0.630859 8.08008C0.367188 8.33398 0.25 8.61719 0.240234 8.94922Z" fill="black" />
                            </svg>
                            <div tw='mx-auto'>
                                <h4 tw="text-[#000000] text-[14px] font-semibold">Collections</h4>
                            </div>
                        </div>
                    </div>
                    <div tw='mt-5 text-center'>
                        {/* Slider */}
                        <div tw='pl-[20px]'>
                            <Swiper
                                modules={[Navigation]}
                                spaceBetween={15}
                                slidesPerView={5}
                                effect="fade"
                                onSlideChange={() => console.log('slide change')}
                                onSwiper={(swiper) => console.log(swiper)}
                            >
                                {mediaGallery && mediaGallery.map((item, i) => (
                                    <SwiperSlide key={i}>
                                        <div tw="inline-block">
                                            <Image src={item.thumb.src} height={item.thumb.height} width={item.thumb.width} tw="rounded-full overflow-hidden" alt="" />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>

                        <hr tw='my-5 border-[#E2E2E2]' />
                        {/* PROFILE IMAGE */}
                        <div tw="inline-block clear-both relative mb-3">
                            <Image src={ProductUserThumb.src} width={80} height={80} tw="w-full rounded-full h-full object-cover w-[80px] h-[80px]" alt="" />

                            <input type="file" id='label--upload-image' tw='hidden' />
                            <label htmlFor='label--upload-image' tw='absolute cursor-pointer bottom-1 right-1'>
                                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle opacity="0.7" cx="9.88684" cy="9.88391" r="9.44445" fill="black" />
                                    <path d="M5.37212 8.73515H5.0249H5.37212ZM5.37212 13.0032H5.71935H5.37212ZM13.011 14.3921V14.0449V14.3921ZM6.76101 14.3921V14.7393V14.3921ZM14.3999 8.73515H14.0527H14.3999ZM14.3999 13.0032H14.7471H14.3999ZM11.9607 6.73584L12.2711 6.58063L11.9607 6.73584ZM11.6586 6.13202L11.3482 6.28723L11.6589 6.13202H11.6586ZM10.4169 5.36431V5.71153V5.36431ZM9.35581 5.36431V5.71153V5.36431ZM8.11345 6.13202L8.42421 6.28723L8.11345 6.13202ZM7.81136 6.73619L7.50129 6.58063L7.81171 6.73584L7.81136 6.73619ZM6.65997 7.44765V7.10042V7.44765ZM13.1128 7.44765V7.79487V7.44765ZM11.2749 10.5726C11.2749 10.941 11.1286 11.2943 10.8681 11.5547C10.6076 11.8152 10.2544 11.9615 9.88602 11.9615V12.656C10.4385 12.656 10.9685 12.4365 11.3592 12.0458C11.7499 11.6551 11.9693 11.1252 11.9693 10.5726H11.2749ZM9.88602 11.9615C9.51766 11.9615 9.16439 11.8152 8.90392 11.5547C8.64345 11.2943 8.49713 10.941 8.49713 10.5726H7.80268C7.80268 11.1252 8.02217 11.6551 8.41288 12.0458C8.80358 12.4365 9.33348 12.656 9.88602 12.656V11.9615ZM8.49713 10.5726C8.49713 10.2043 8.64345 9.85102 8.90392 9.59055C9.16439 9.33009 9.51766 9.18376 9.88602 9.18376V8.48931C9.33348 8.48931 8.80358 8.70881 8.41288 9.09951C8.02217 9.49021 7.80268 10.0201 7.80268 10.5726H8.49713ZM9.88602 9.18376C10.2544 9.18376 10.6076 9.33009 10.8681 9.59055C11.1286 9.85102 11.2749 10.2043 11.2749 10.5726H11.9693C11.9693 10.0201 11.7499 9.49021 11.3592 9.09951C10.9685 8.70881 10.4385 8.48931 9.88602 8.48931V9.18376ZM5.0249 8.73515V13.0032H5.71935V8.73515H5.0249ZM13.011 14.0449H6.76101V14.7393H13.011V14.0449ZM14.0527 8.73515V13.0032H14.7471V8.73515H14.0527ZM12.2714 6.58063L11.9693 5.97647L11.3482 6.28723L11.6503 6.8914L12.2711 6.58063H12.2714ZM10.4162 5.01709H9.35511V5.71153H10.4162V5.01709ZM7.80268 5.97681L7.5006 6.58063L8.12213 6.89105L8.42386 6.28723L7.80268 5.97681ZM9.35546 5.01709C9.03305 5.0171 8.71701 5.10689 8.44275 5.2764C8.1685 5.44591 7.94686 5.68844 7.80268 5.97681L8.42386 6.28723C8.51039 6.11424 8.64336 5.96876 8.8079 5.86708C8.97244 5.7654 9.16204 5.71154 9.35546 5.71153V5.01709ZM6.65963 7.79487C6.96323 7.79486 7.26084 7.71029 7.51909 7.55066C7.77734 7.39102 7.98603 7.16262 8.12178 6.89105L7.5006 6.58063C7.42251 6.73682 7.30247 6.86817 7.15394 6.95998C7.00541 7.05178 6.83424 7.10042 6.65963 7.10042V7.79487ZM13.1124 7.10042C12.9377 7.10048 12.7665 7.05188 12.6179 6.96007C12.4693 6.86826 12.3492 6.73687 12.2711 6.58063L11.6503 6.89105C11.7859 7.16251 11.9945 7.39085 12.2526 7.55047C12.5108 7.7101 12.8082 7.79473 13.1117 7.79487V7.10042H13.1124ZM11.9693 5.97681C11.8252 5.68844 11.6035 5.44591 11.3293 5.2764C11.055 5.10689 10.739 5.0171 10.4166 5.01709V5.71153C10.61 5.71154 10.7996 5.7654 10.9641 5.86708C11.1287 5.96876 11.2616 6.11424 11.3482 6.28723L11.9693 5.97681ZM14.7471 8.73515C14.7471 7.83237 14.0152 7.10042 13.1124 7.10042V7.79487C13.3618 7.79487 13.6009 7.89393 13.7773 8.07027C13.9536 8.24661 14.0527 8.48577 14.0527 8.73515H14.7471ZM5.71935 8.73515C5.71935 8.48577 5.81841 8.24661 5.99475 8.07027C6.17108 7.89393 6.41025 7.79487 6.65963 7.79487V7.10042C6.22607 7.10042 5.81027 7.27265 5.5037 7.57922C5.19713 7.88579 5.0249 8.30159 5.0249 8.73515H5.71935ZM5.0249 13.0032C5.0249 13.4636 5.20781 13.9052 5.5334 14.2308C5.85898 14.5564 6.30057 14.7393 6.76101 14.7393V14.0449C6.48475 14.0449 6.21979 13.9351 6.02444 13.7398C5.82909 13.5444 5.71935 13.2795 5.71935 13.0032H5.0249ZM13.011 14.7393C13.4715 14.7393 13.913 14.5564 14.2386 14.2308C14.5642 13.9052 14.7471 13.4636 14.7471 13.0032H14.0527C14.0527 13.2795 13.9429 13.5444 13.7476 13.7398C13.5522 13.9351 13.2873 14.0449 13.011 14.0449V14.7393Z" fill="white" />
                                </svg>
                            </label>
                        </div>

                        {/* Form Group */}
                        <div tw='px-[20px] mb-4'>
                            <input type="text" placeholder='Title *' tw='py-2 px-5 rounded border w-full text-[16px]' />
                        </div>
                        {/* Form Group */}
                        <div tw='px-[20px] mb-4'>
                            <textarea placeholder='(Optional) Write a description...' tw='py-2 px-5 rounded border w-full text-[16px] resize-none h-[100px]'></textarea>
                        </div>

                        {/* From Group */}
                        <div tw='p-[20px] max-h-[50vh] overflow-x-hidden'>
                            <ul tw='flex gap-3 flex-wrap'>
                                {mediaGallery && mediaGallery.map((item, id) => (
                                    <li key={id} tw='w-[70px] h-[70px] cursor-pointer'>
                                        <Image src={item.thumb.src} width={item.thumb.width} height={item.thumb.height} tw="w-full h-full object-cover" alt="" />
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* END CODE FOR AUTH */}


                </div>

                {/* Message 3
                ===================================================================================*/}
                <div tw="border w-[375px] bg-white">

                    {/* START CODE FOR AUTH */}
                    {/* Header */}
                    <div tw="py-[16px] px-[20px]">
                        <div tw="flex items-center gap-2">
                            <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.240234 8.94922C0.240234 9.28125 0.367188 9.56445 0.630859 9.81836L8.24805 17.2695C8.45312 17.4844 8.72656 17.5918 9.03906 17.5918C9.67383 17.5918 10.1719 17.1035 10.1719 16.459C10.1719 16.1465 10.0449 15.8633 9.83008 15.6484L2.96484 8.94922L9.83008 2.25C10.0449 2.02539 10.1719 1.74219 10.1719 1.42969C10.1719 0.794922 9.67383 0.306641 9.03906 0.306641C8.72656 0.306641 8.45312 0.414062 8.24805 0.628906L0.630859 8.08008C0.367188 8.33398 0.25 8.61719 0.240234 8.94922Z" fill="black" />
                            </svg>
                            <div tw='mx-auto'>
                                <h4 tw="text-[#000000] text-[14px] font-semibold">Message</h4>
                            </div>
                        </div>
                    </div>
                    {/* Search */}
                    <div tw='px-[20px]'>
                        <div tw='bg-[#F0F0F0] mb-1 rounded-full flex gap-3 items-center px-4'>
                            <span>
                                <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.58834 0.470703C9.96718 0.470703 12.706 3.20953 12.706 6.58834C12.706 8.08953 12.1648 9.46506 11.2674 10.53L14.9046 14.2848L13.8382 15.385L10.1413 11.569C9.10508 12.3104 7.86244 12.708 6.58834 12.706C3.20953 12.706 0.470703 9.96718 0.470703 6.58834C0.470703 3.2095 3.20953 0.470703 6.58834 0.470703ZM6.58834 1.88247C3.98931 1.88247 1.88247 3.98931 1.88247 6.58834C1.88247 9.18738 3.98931 11.2942 6.58834 11.2942C9.18738 11.2942 11.2942 9.1874 11.2942 6.58834C11.2942 3.98928 9.1874 1.88247 6.58834 1.88247Z" fill="#5A5A5A" />
                                </svg>
                            </span>
                            <input type="text" tw='px-3 bg-transparent w-full outline-none py-3 text-[14px] text-[#303030]' placeholder='Type your message here...' />
                        </div>
                    </div>
                    <div tw="flex flex-col h-[calc(100vh - 16rem)] overflow-x-hidden relative">
                        <ul tw='w-full'>
                            {messages_users.map((item, idx) => (
                                <li key={idx} tw="flex px-[20px] py-2 cursor-pointer hover:bg-[#F0F0F0] transition-all duration-300 gap-4">
                                    {/* Thumb Area */}
                                    <div tw='h-[50px] w-[50px]'>
                                        <Image layout='responsive' src={item.user.thumb.src} width={item.user.thumb.width} height={item.user.thumb.height} alt="" />
                                    </div>
                                    <div tw="">
                                        <h3 tw='text-[#000000] text-[14px] font-bold'>{item.user.name}</h3>
                                        <p tw='text-[#3C3C3C] text-[14px] font-normal'>
                                            <span>{item.content}</span>

                                            <span tw='relative before:content before:w-[3px] before:h-[3px] before:mx-3 before:rounded-full before:bg-[#838383] before:inline-block'>{item.timestamp}</span>
                                        </p>
                                    </div>
                                    {item.unread && <span tw='w-[6px] h-[6px] rounded-full ml-auto bg-[#E44C4D]'></span>}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {/* END CODE FOR AUTH */}


                </div>

                {/* Message 4 
                ===================================================================================*/}
                <div tw="border w-[375px] bg-white">

                    {/* START CODE FOR AUTH */}
                    {/* Header */}
                    <div tw="border-b border-[#E2E2E2] py-[16px] px-[20px]">
                        <div tw="flex items-center gap-2">
                            <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.240234 8.94922C0.240234 9.28125 0.367188 9.56445 0.630859 9.81836L8.24805 17.2695C8.45312 17.4844 8.72656 17.5918 9.03906 17.5918C9.67383 17.5918 10.1719 17.1035 10.1719 16.459C10.1719 16.1465 10.0449 15.8633 9.83008 15.6484L2.96484 8.94922L9.83008 2.25C10.0449 2.02539 10.1719 1.74219 10.1719 1.42969C10.1719 0.794922 9.67383 0.306641 9.03906 0.306641C8.72656 0.306641 8.45312 0.414062 8.24805 0.628906L0.630859 8.08008C0.367188 8.33398 0.25 8.61719 0.240234 8.94922Z" fill="black" />
                            </svg>

                            <span tw='h-[36px] w-[36px]'>
                                <Image layout='responsive' src={ProductUserThumb.src} width={ProductUserThumb.width} height={ProductUserThumb.height} alt="" />
                            </span>
                            <div>
                                <h4 tw="text-[#000000] text-[14px] font-semibold">Anil</h4>
                                <p tw='text-[12px] leading-[14px] text-[#3C3C3C]'>Painter</p>
                            </div>
                        </div>
                    </div>
                    <div tw="p-[20px] flex flex-col h-[calc(100vh - 13rem)] overflow-x-hidden relative">
                        <ul tw='w-full'>
                            {/* Date */}
                            <li>
                                {/* Date */}
                                <p tw="text-center mb-4 font-open-sans text-[#838383] text-[12px]">Today, 8.30pm</p>
                            </li>
                            {messages.map((item, idx) => (
                                item.me ?
                                    <li key={idx} tw="flex justify-end gap-4 mb-5">
                                        {/* Message Box */}
                                        <ul tw='block text-right'>
                                            {item.list && item.list.map((msg, i) => (
                                                <li tw='block' key={i}>
                                                    <span tw='bg-[#F4F4F4] text-[#3C3C3C] text-[14px] leading-[17px] inline-block mb-3 rounded-full py-3 px-5'>
                                                        {msg.content}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    :
                                    <li key={idx} tw="flex gap-4 mb-5">
                                        {/* Thumb Area */}
                                        <div tw='h-[36px] w-[36px]'>
                                            <Image layout='responsive' src={ProductUserThumb.src} width={ProductUserThumb.width} height={ProductUserThumb.height} alt="" />
                                        </div>
                                        {/* Message Box */}
                                        <ul tw='block'>
                                            {item.list && item.list.map((msg, i) => (
                                                <li tw='block' key={i}>
                                                    <span tw='text-[#3C3C3C] text-[14px] leading-[17px] border border-[#D8D8D8] inline-block mb-3 rounded-full py-3 px-5'>
                                                        {msg.content}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                            ))}
                        </ul>

                        {/* Button Area */}
                        <div tw='mt-auto flex gap-2 items-center text-center p-3'>
                            <div tw='bg-[#F4F4F4] rounded-full flex gap-4 items-center px-4 w-full'>
                                <input type="text" tw='px-3 bg-transparent outline-none py-3 text-[14px] text-[#303030]' placeholder='Type your message here...' />

                                <span tw='cursor-pointer'>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 6C5.80109 6 5.61032 6.07902 5.46967 6.21967C5.32902 6.36032 5.25 6.55109 5.25 6.75C5.25 6.94891 5.17098 7.13968 5.03033 7.28033C4.88968 7.42098 4.69891 7.5 4.5 7.5C4.30109 7.5 4.11032 7.42098 3.96967 7.28033C3.82902 7.13968 3.75 6.94891 3.75 6.75C3.75 6.15326 3.98705 5.58097 4.40901 5.15901C4.83097 4.73705 5.40326 4.5 6 4.5C6.59674 4.5 7.16903 4.73705 7.59099 5.15901C8.01295 5.58097 8.25 6.15326 8.25 6.75C8.25 6.94891 8.17098 7.13968 8.03033 7.28033C7.88968 7.42098 7.69891 7.5 7.5 7.5C7.30109 7.5 7.11032 7.42098 6.96967 7.28033C6.82902 7.13968 6.75 6.94891 6.75 6.75C6.75 6.55109 6.67098 6.36032 6.53033 6.21967C6.38968 6.07902 6.19891 6 6 6ZM12 6C11.8011 6 11.6103 6.07902 11.4697 6.21967C11.329 6.36032 11.25 6.55109 11.25 6.75C11.25 6.94891 11.171 7.13968 11.0303 7.28033C10.8897 7.42098 10.6989 7.5 10.5 7.5C10.3011 7.5 10.1103 7.42098 9.96967 7.28033C9.82902 7.13968 9.75 6.94891 9.75 6.75C9.75 6.15326 9.98705 5.58097 10.409 5.15901C10.831 4.73705 11.4033 4.5 12 4.5C12.5967 4.5 13.169 4.73705 13.591 5.15901C14.0129 5.58097 14.25 6.15326 14.25 6.75C14.25 6.94891 14.171 7.13968 14.0303 7.28033C13.8897 7.42098 13.6989 7.5 13.5 7.5C13.3011 7.5 13.1103 7.42098 12.9697 7.28033C12.829 7.13968 12.75 6.94891 12.75 6.75C12.75 6.55109 12.671 6.36032 12.5303 6.21967C12.3897 6.07902 12.1989 6 12 6ZM3.8025 9C3.69515 9.00002 3.58905 9.02308 3.49137 9.06763C3.3937 9.11218 3.30673 9.17718 3.23634 9.25823C3.16595 9.33929 3.11378 9.43451 3.08336 9.53747C3.05294 9.64042 3.04497 9.7487 3.06 9.855C3.26379 11.2852 3.97677 12.5939 5.06798 13.5406C6.15918 14.4874 7.55534 15.0086 9 15.0086C10.4447 15.0086 11.8408 14.4874 12.932 13.5406C14.0232 12.5939 14.7362 11.2852 14.94 9.855C14.955 9.74858 14.947 9.64016 14.9165 9.53711C14.886 9.43405 14.8337 9.33875 14.7632 9.25767C14.6926 9.17659 14.6055 9.11162 14.5076 9.06716C14.4097 9.02271 14.3035 8.9998 14.196 9H3.8025ZM9 13.5C8.06913 13.5 7.16111 13.2116 6.40092 12.6744C5.64072 12.1371 5.0657 11.3775 4.755 10.5H13.245C12.9343 11.3775 12.3593 12.1371 11.5991 12.6744C10.8389 13.2116 9.93087 13.5 9 13.5ZM18 9C18 7.8181 17.7672 6.64778 17.3149 5.55585C16.8626 4.46392 16.1997 3.47177 15.364 2.63604C14.5282 1.80031 13.5361 1.13738 12.4442 0.685084C11.3522 0.232792 10.1819 0 9 0C7.8181 0 6.64778 0.232792 5.55585 0.685084C4.46392 1.13738 3.47177 1.80031 2.63604 2.63604C1.80031 3.47177 1.13738 4.46392 0.685084 5.55585C0.232792 6.64778 -1.76116e-08 7.8181 0 9C3.55683e-08 11.3869 0.948211 13.6761 2.63604 15.364C4.32387 17.0518 6.61305 18 9 18C11.3869 18 13.6761 17.0518 15.364 15.364C17.0518 13.6761 18 11.3869 18 9ZM1.5 9C1.5 7.01088 2.29018 5.10322 3.6967 3.6967C5.10322 2.29018 7.01088 1.5 9 1.5C10.9891 1.5 12.8968 2.29018 14.3033 3.6967C15.7098 5.10322 16.5 7.01088 16.5 9C16.5 10.9891 15.7098 12.8968 14.3033 14.3033C12.8968 15.7098 10.9891 16.5 9 16.5C7.01088 16.5 5.10322 15.7098 3.6967 14.3033C2.29018 12.8968 1.5 10.9891 1.5 9Z" fill="#5A5A5A" />
                                    </svg>
                                </span>
                                <span tw='cursor-pointer'>
                                    <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.925 0.50393C12.317 0.503898 12.7023 0.606305 13.0426 0.801002C13.3829 0.9957 13.6664 1.27593 13.865 1.61393L14.679 3.00093H16.75C17.6118 3.00093 18.4383 3.3432 19.0477 3.95248C19.6572 4.56176 19.9997 5.38815 20 6.24993V15.7499C20 16.1767 19.9159 16.5993 19.7526 16.9937C19.5893 17.388 19.3499 17.7462 19.0481 18.048C18.7463 18.3498 18.388 18.5892 17.9937 18.7525C17.5994 18.9159 17.1768 18.9999 16.75 18.9999H3.25C2.38805 18.9999 1.5614 18.6575 0.951903 18.048C0.34241 17.4385 0 16.6119 0 15.7499V6.24993C0 5.38798 0.34241 4.56133 0.951903 3.95183C1.5614 3.34234 2.38805 2.99993 3.25 2.99993H5.33L6.205 1.57593C6.40619 1.24815 6.68804 0.977411 7.02364 0.789564C7.35925 0.601717 7.7374 0.503031 8.122 0.50293H11.925V0.50393ZM11.925 2.00393H8.122C8.01257 2.00402 7.90448 2.02806 7.80532 2.07435C7.70616 2.12065 7.61833 2.18809 7.548 2.27193L7.483 2.36193L6.39 4.14193C6.32298 4.25125 6.22905 4.34156 6.11718 4.40424C6.0053 4.46692 5.87923 4.49986 5.751 4.49993H3.251C3.0211 4.4998 2.79343 4.54497 2.581 4.63285C2.36856 4.72074 2.17553 4.84962 2.01292 5.01214C1.85031 5.17465 1.72131 5.36762 1.63331 5.58C1.5453 5.79239 1.5 6.02003 1.5 6.24993V15.7499C1.5 16.7159 2.284 17.4999 3.25 17.4999H16.75C17.2141 17.4999 17.6593 17.3156 17.9874 16.9874C18.3156 16.6592 18.5 16.2141 18.5 15.7499V6.24993C18.5 5.7858 18.3156 5.34068 17.9874 5.01249C17.6593 4.6843 17.2141 4.49993 16.75 4.49993H14.25C14.1193 4.5 13.9908 4.46589 13.8773 4.40099C13.7638 4.33609 13.6692 4.24264 13.603 4.12993L12.571 2.37293C12.5048 2.26036 12.4105 2.16701 12.2972 2.10212C12.1838 2.03723 12.0556 2.00304 11.925 2.00293V2.00393ZM10 5.99993C11.1935 5.99993 12.3381 6.47404 13.182 7.31795C14.0259 8.16186 14.5 9.30646 14.5 10.4999C14.5 11.6934 14.0259 12.838 13.182 13.6819C12.3381 14.5258 11.1935 14.9999 10 14.9999C8.80653 14.9999 7.66193 14.5258 6.81802 13.6819C5.97411 12.838 5.5 11.6934 5.5 10.4999C5.5 9.30646 5.97411 8.16186 6.81802 7.31795C7.66193 6.47404 8.80653 5.99993 10 5.99993ZM10 7.49993C9.60604 7.49993 9.21593 7.57753 8.85195 7.72829C8.48797 7.87905 8.15726 8.10003 7.87868 8.37861C7.6001 8.65718 7.37913 8.9879 7.22836 9.35188C7.0776 9.71586 7 10.106 7 10.4999C7 10.8939 7.0776 11.284 7.22836 11.648C7.37913 12.012 7.6001 12.3427 7.87868 12.6213C8.15726 12.8998 8.48797 13.1208 8.85195 13.2716C9.21593 13.4223 9.60604 13.4999 10 13.4999C10.7957 13.4999 11.5587 13.1839 12.1213 12.6213C12.6839 12.0586 13 11.2956 13 10.4999C13 9.70428 12.6839 8.94122 12.1213 8.37861C11.5587 7.816 10.7957 7.49993 10 7.49993Z" fill="#5A5A5A" />
                                    </svg>
                                </span>
                            </div>
                            <span tw='cursor-pointer'>
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.67972 9.16452L3.40306 10.2112C3.33089 10.2232 3.26317 10.2541 3.20671 10.3006C3.15024 10.3471 3.10702 10.4077 3.08139 10.4762L0.917222 16.2737C0.710555 16.807 1.26805 17.3154 1.77972 17.0595L16.7797 9.55952C16.8836 9.50764 16.971 9.42785 17.0321 9.32908C17.0932 9.23031 17.1255 9.11648 17.1255 9.00036C17.1255 8.88423 17.0932 8.7704 17.0321 8.67163C16.971 8.57286 16.8836 8.49307 16.7797 8.44119L1.77972 0.941188C1.26805 0.685355 0.710555 1.19452 0.917222 1.72702L3.08222 7.52452C3.10773 7.5932 3.1509 7.65394 3.20738 7.70061C3.26385 7.74728 3.33163 7.77824 3.40389 7.79036L9.68056 8.83619C9.71918 8.84296 9.75419 8.86313 9.77941 8.89315C9.80464 8.92318 9.81846 8.96114 9.81846 9.00036C9.81846 9.03957 9.80464 9.07753 9.77941 9.10756C9.75419 9.13758 9.71918 9.15775 9.68056 9.16452H9.67972Z" fill="#8E8E93" />
                                </svg>
                            </span>
                        </div>
                    </div>
                    {/* END CODE FOR AUTH */}


                </div>

            </div>
        </div>
    )
}

export default OnBoarding;