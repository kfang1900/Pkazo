import React, { useState } from 'react';
import 'twin.macro';
import Image from 'next/image';
import UserThumb from '../images/user.png';
import UserThumb2 from '../images/user-2.png';

function Ratings() {
    const [Dropdown, setDropdown] = useState(null);

    const handleOpenDropdown = (e: any, getID: any) => {
        e.preventDefault();
        setDropdown(getID);
    }

    const ratings_list = [
        {
            user: {
                thumb: UserThumb,
                name: "William Sanger"
            },
            date: "May 09, 2022",
            reaction: 6,
            content: "Amazing painting. Absolutely love it. Amazing painting. Absolutely love it. Amazing painting. Absolutely love it. Amazing painting. Absolutely love it. Amazing painting. "
        },
        {
            user: {
                thumb: UserThumb,
                name: "William Sanger"
            },
            date: "May 09, 2022",
            reaction: 6,
            content: "Amazing painting. Absolutely love it. Amazing painting. Absolutely love it. Amazing painting. Absolutely love it. Amazing painting. Absolutely love it. Amazing painting. "
        },
        {
            user: {
                thumb: UserThumb,
                name: "William Sanger"
            },
            date: "May 09, 2022",
            reaction: 6,
            content: "Amazing painting. Absolutely love it. Amazing painting. Absolutely love it. Amazing painting. Absolutely love it. Amazing painting. Absolutely love it. Amazing painting. "
        },
    ]
    return (
        <div tw='mt-[45px]'>

            {/* Heading */}
            <div tw="grid mb-[32px] grid-cols-5 gap-4">
                {/* Left Side */}
                <div tw="col-span-3">
                    <div tw="flex gap-5 items-center">
                        <span tw="font-semibold text-[20px]">120 store reviews</span>
                        {/* Reviews */}
                        <span tw="flex items-center gap-1">
                            <strong tw='mr-1'>5.0</strong>
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4505 5.63393L11.3543 4.90397L9.0761 0.352127C9.01387 0.227501 8.91151 0.126612 8.78505 0.065288C8.46792 -0.0890118 8.08253 0.0395714 7.92396 0.352127L5.64579 4.90397L0.549519 5.63393C0.409015 5.65371 0.280554 5.71899 0.182201 5.8179C-0.064684 6.06913 -0.0606696 6.46873 0.194245 6.71403L3.88147 10.257L3.01034 15.2599C2.98626 15.3964 3.00834 15.5388 3.07457 15.6614C3.23916 15.97 3.62856 16.0907 3.94168 15.9265L8.50003 13.5645L13.0584 15.9265C13.1828 15.9918 13.3273 16.0136 13.4658 15.9898C13.8151 15.9305 14.0499 15.6041 13.9897 15.2599L13.1186 10.257L16.8058 6.71403C16.9062 6.61709 16.9724 6.49049 16.9925 6.35201C17.0467 6.00583 16.8018 5.68536 16.4505 5.63393Z" fill="#ED6D44" />
                            </svg>
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4505 5.63393L11.3543 4.90397L9.0761 0.352127C9.01387 0.227501 8.91151 0.126612 8.78505 0.065288C8.46792 -0.0890118 8.08253 0.0395714 7.92396 0.352127L5.64579 4.90397L0.549519 5.63393C0.409015 5.65371 0.280554 5.71899 0.182201 5.8179C-0.064684 6.06913 -0.0606696 6.46873 0.194245 6.71403L3.88147 10.257L3.01034 15.2599C2.98626 15.3964 3.00834 15.5388 3.07457 15.6614C3.23916 15.97 3.62856 16.0907 3.94168 15.9265L8.50003 13.5645L13.0584 15.9265C13.1828 15.9918 13.3273 16.0136 13.4658 15.9898C13.8151 15.9305 14.0499 15.6041 13.9897 15.2599L13.1186 10.257L16.8058 6.71403C16.9062 6.61709 16.9724 6.49049 16.9925 6.35201C17.0467 6.00583 16.8018 5.68536 16.4505 5.63393Z" fill="#ED6D44" />
                            </svg>
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4505 5.63393L11.3543 4.90397L9.0761 0.352127C9.01387 0.227501 8.91151 0.126612 8.78505 0.065288C8.46792 -0.0890118 8.08253 0.0395714 7.92396 0.352127L5.64579 4.90397L0.549519 5.63393C0.409015 5.65371 0.280554 5.71899 0.182201 5.8179C-0.064684 6.06913 -0.0606696 6.46873 0.194245 6.71403L3.88147 10.257L3.01034 15.2599C2.98626 15.3964 3.00834 15.5388 3.07457 15.6614C3.23916 15.97 3.62856 16.0907 3.94168 15.9265L8.50003 13.5645L13.0584 15.9265C13.1828 15.9918 13.3273 16.0136 13.4658 15.9898C13.8151 15.9305 14.0499 15.6041 13.9897 15.2599L13.1186 10.257L16.8058 6.71403C16.9062 6.61709 16.9724 6.49049 16.9925 6.35201C17.0467 6.00583 16.8018 5.68536 16.4505 5.63393Z" fill="#ED6D44" />
                            </svg>
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4505 5.63393L11.3543 4.90397L9.0761 0.352127C9.01387 0.227501 8.91151 0.126612 8.78505 0.065288C8.46792 -0.0890118 8.08253 0.0395714 7.92396 0.352127L5.64579 4.90397L0.549519 5.63393C0.409015 5.65371 0.280554 5.71899 0.182201 5.8179C-0.064684 6.06913 -0.0606696 6.46873 0.194245 6.71403L3.88147 10.257L3.01034 15.2599C2.98626 15.3964 3.00834 15.5388 3.07457 15.6614C3.23916 15.97 3.62856 16.0907 3.94168 15.9265L8.50003 13.5645L13.0584 15.9265C13.1828 15.9918 13.3273 16.0136 13.4658 15.9898C13.8151 15.9305 14.0499 15.6041 13.9897 15.2599L13.1186 10.257L16.8058 6.71403C16.9062 6.61709 16.9724 6.49049 16.9925 6.35201C17.0467 6.00583 16.8018 5.68536 16.4505 5.63393Z" fill="#ED6D44" />
                            </svg>
                            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.4505 5.63393L11.3543 4.90397L9.0761 0.352127C9.01387 0.227501 8.91151 0.126612 8.78505 0.065288C8.46792 -0.0890118 8.08253 0.0395714 7.92396 0.352127L5.64579 4.90397L0.549519 5.63393C0.409015 5.65371 0.280554 5.71899 0.182201 5.8179C-0.064684 6.06913 -0.0606696 6.46873 0.194245 6.71403L3.88147 10.257L3.01034 15.2599C2.98626 15.3964 3.00834 15.5388 3.07457 15.6614C3.23916 15.97 3.62856 16.0907 3.94168 15.9265L8.50003 13.5645L13.0584 15.9265C13.1828 15.9918 13.3273 16.0136 13.4658 15.9898C13.8151 15.9305 14.0499 15.6041 13.9897 15.2599L13.1186 10.257L16.8058 6.71403C16.9062 6.61709 16.9724 6.49049 16.9925 6.35201C17.0467 6.00583 16.8018 5.68536 16.4505 5.63393Z" fill="#E3E3E3" />
                            </svg>
                        </span>
                    </div>
                </div>
                <div tw="col-span-2">
                    <div tw="flex justify-end relative">
                        <a href="#" onClick={(e) => handleOpenDropdown(e, 'recomendation-dropdown')} tw='flex items-center gap-2'>
                            Sort by: Recommended
                            <svg tw='self-center' width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 7L0.803848 0.25L11.1962 0.25L6 7Z" fill="black" />
                            </svg>
                        </a>

                        {Dropdown && <div onClick={() => setDropdown(null)} tw="fixed bg-transparent w-full h-full top-0 left-0 z-[50]"></div>}

                        {Dropdown && Dropdown === 'recomendation-dropdown' &&
                            <ul tw="absolute bg-white shadow-md py-1 min-w-[10rem] z-[51] rounded">
                                <li tw="">
                                    <a tw='px-4 py-2 text-sm block hover:bg-gray-100 ease-in duration-300' href="#">List Item 1</a>
                                </li>
                                <li tw="">
                                    <a tw='px-4 py-2 text-sm block hover:bg-gray-100 ease-in duration-300' href="#">List Item 1</a>
                                </li>
                                <li tw="">
                                    <a tw='px-4 py-2 text-sm block hover:bg-gray-100 ease-in duration-300' href="#">List Item 1</a>
                                </li>
                                <li tw="">
                                    <a tw='px-4 py-2 text-sm block hover:bg-gray-100 ease-in duration-300' href="#">List Item 1</a>
                                </li>
                                <li tw="">
                                    <a tw='px-4 py-2 text-sm block hover:bg-gray-100 ease-in duration-300' href="#">List Item 1</a>
                                </li>
                            </ul>
                        }
                    </div>
                </div>
            </div>

            {/* Reviews List */}
            <ul tw="flex flex-col gap-[36px]">
                {/* Single */}
                {ratings_list && ratings_list.map((rat, i) => (
                    <li key={i}>
                        {/* Headings */}
                        <div tw="flex gap-2 mb-3 justify-between">
                            {/* User */}
                            <div tw="flex gap-2">
                                {/* Image */}
                                <div tw="w-[36px] h-[36px]">
                                    <Image src={rat.user.thumb.src} height={rat.user.thumb.height} width={rat.user.thumb.width} tw="w-full h-full object-cover object-center" alt="" />
                                </div>
                                {/* User Info */}
                                <div tw="">
                                    <h5 tw='font-bold mb-1 text-[12px]'>{rat.user.name} <span tw='ml-3 align-middle font-normal text-[#7F838B]'>{rat.date}</span></h5>
                                    <div tw="flex gap-1">
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.5475 4.57757L9.35057 3.98448L7.47443 0.286103C7.42319 0.184844 7.33889 0.102872 7.23475 0.0530465C6.97358 -0.0723221 6.6562 0.0321517 6.52562 0.286103L4.64948 3.98448L0.452545 4.57757C0.336836 4.59364 0.231045 4.64668 0.150048 4.72704C-0.0532691 4.93117 -0.0499632 5.25584 0.159966 5.45514L3.1965 8.3338L2.47911 12.3986C2.45927 12.5095 2.47745 12.6253 2.532 12.7249C2.66755 12.9756 2.98823 13.0737 3.24609 12.9403L7.00003 11.0212L10.754 12.9403C10.8564 12.9933 10.9755 13.011 11.0895 12.9917C11.3771 12.9435 11.5705 12.6783 11.5209 12.3986L10.8035 8.3338L13.8401 5.45514C13.9227 5.37639 13.9773 5.27352 13.9938 5.16101C14.0384 4.87974 13.8368 4.61935 13.5475 4.57757Z" fill="#E67136" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.5475 4.57757L9.35057 3.98448L7.47443 0.286103C7.42319 0.184844 7.33889 0.102872 7.23475 0.0530465C6.97358 -0.0723221 6.6562 0.0321517 6.52562 0.286103L4.64948 3.98448L0.452545 4.57757C0.336836 4.59364 0.231045 4.64668 0.150048 4.72704C-0.0532691 4.93117 -0.0499632 5.25584 0.159966 5.45514L3.1965 8.3338L2.47911 12.3986C2.45927 12.5095 2.47745 12.6253 2.532 12.7249C2.66755 12.9756 2.98823 13.0737 3.24609 12.9403L7.00003 11.0212L10.754 12.9403C10.8564 12.9933 10.9755 13.011 11.0895 12.9917C11.3771 12.9435 11.5705 12.6783 11.5209 12.3986L10.8035 8.3338L13.8401 5.45514C13.9227 5.37639 13.9773 5.27352 13.9938 5.16101C14.0384 4.87974 13.8368 4.61935 13.5475 4.57757Z" fill="#E67136" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.5475 4.57757L9.35057 3.98448L7.47443 0.286103C7.42319 0.184844 7.33889 0.102872 7.23475 0.0530465C6.97358 -0.0723221 6.6562 0.0321517 6.52562 0.286103L4.64948 3.98448L0.452545 4.57757C0.336836 4.59364 0.231045 4.64668 0.150048 4.72704C-0.0532691 4.93117 -0.0499632 5.25584 0.159966 5.45514L3.1965 8.3338L2.47911 12.3986C2.45927 12.5095 2.47745 12.6253 2.532 12.7249C2.66755 12.9756 2.98823 13.0737 3.24609 12.9403L7.00003 11.0212L10.754 12.9403C10.8564 12.9933 10.9755 13.011 11.0895 12.9917C11.3771 12.9435 11.5705 12.6783 11.5209 12.3986L10.8035 8.3338L13.8401 5.45514C13.9227 5.37639 13.9773 5.27352 13.9938 5.16101C14.0384 4.87974 13.8368 4.61935 13.5475 4.57757Z" fill="#E67136" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.5475 4.57757L9.35057 3.98448L7.47443 0.286103C7.42319 0.184844 7.33889 0.102872 7.23475 0.0530465C6.97358 -0.0723221 6.6562 0.0321517 6.52562 0.286103L4.64948 3.98448L0.452545 4.57757C0.336836 4.59364 0.231045 4.64668 0.150048 4.72704C-0.0532691 4.93117 -0.0499632 5.25584 0.159966 5.45514L3.1965 8.3338L2.47911 12.3986C2.45927 12.5095 2.47745 12.6253 2.532 12.7249C2.66755 12.9756 2.98823 13.0737 3.24609 12.9403L7.00003 11.0212L10.754 12.9403C10.8564 12.9933 10.9755 13.011 11.0895 12.9917C11.3771 12.9435 11.5705 12.6783 11.5209 12.3986L10.8035 8.3338L13.8401 5.45514C13.9227 5.37639 13.9773 5.27352 13.9938 5.16101C14.0384 4.87974 13.8368 4.61935 13.5475 4.57757Z" fill="#E67136" />
                                        </svg>
                                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M13.5475 4.57757L9.35057 3.98448L7.47443 0.286103C7.42319 0.184844 7.33889 0.102872 7.23475 0.0530465C6.97358 -0.0723221 6.6562 0.0321517 6.52562 0.286103L4.64948 3.98448L0.452545 4.57757C0.336836 4.59364 0.231045 4.64668 0.150048 4.72704C-0.0532691 4.93117 -0.0499632 5.25584 0.159966 5.45514L3.1965 8.3338L2.47911 12.3986C2.45927 12.5095 2.47745 12.6253 2.532 12.7249C2.66755 12.9756 2.98823 13.0737 3.24609 12.9403L7.00003 11.0212L10.754 12.9403C10.8564 12.9933 10.9755 13.011 11.0895 12.9917C11.3771 12.9435 11.5705 12.6783 11.5209 12.3986L10.8035 8.3338L13.8401 5.45514C13.9227 5.37639 13.9773 5.27352 13.9938 5.16101C14.0384 4.87974 13.8368 4.61935 13.5475 4.57757Z" fill="#E3E3E3" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            {/* Reacts */}
                            <div tw="flex gap-1 items-center">
                                <span tw='align-middle'>
                                    <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4.22109 1.3335C2.44217 1.3335 1 2.76995 1 4.54183C1 7.75016 4.80674 10.6668 6.85653 11.3452C8.90631 10.6668 12.7131 7.75016 12.7131 4.54183C12.7131 2.76995 11.2709 1.3335 9.49196 1.3335C8.40265 1.3335 7.43925 1.87221 6.85653 2.69675C6.55951 2.27535 6.16492 1.93144 5.70617 1.69414C5.24742 1.45684 4.73802 1.33313 4.22109 1.3335Z" fill="#E44C4D" stroke="#E44C4D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <span tw='text-sm'>{rat.reaction}</span>
                            </div>
                        </div>
                        {/* Content */}
                        {rat.content && <div tw='mb-3 text-[14px]'>{rat.content}</div>}

                        {/* Reply */}
                        <div tw="flex gap-3 items-center">
                            <div tw="w-[40px] h-[40px] rounded overflow-hidden">
                                <Image src={UserThumb2.src} height={UserThumb2.height} width={UserThumb2.width} tw='w-full h-full' alt="" />
                            </div>
                            <div className="content">
                                <a tw='text-[14px] text-[#3E3E3E] underline' href="#">Grilled Cheese </a>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Pagination */}
            <ul tw='mt-7 flex gap-1 items-center'>
                <li>
                    <a tw='h-[40px] w-[40px] inline-flex items-center justify-center text-[14px] text-[#3C3C3C] rounded-full opacity-50' href="#">
                        <svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.80474 11.7803C6.06509 11.4874 6.06509 11.0126 5.80474 10.7197L1.60945 5.99999L5.80474 1.28031C6.06509 0.987432 6.06509 0.512532 5.80474 0.219656C5.54439 -0.0732193 5.12228 -0.0732193 4.86192 0.219656L0.195251 5.46966C-0.065083 5.76254 -0.065083 6.23744 0.195251 6.53032L4.86192 11.7803C5.12228 12.0732 5.54439 12.0732 5.80474 11.7803Z" fill="#8B8B8B" />
                        </svg>
                    </a>
                </li>
                <li><a tw='h-[40px] w-[40px] inline-flex items-center justify-center text-[14px] text-[#3C3C3C] rounded-full hover:bg-gray-200 ease-in duration-300 bg-gray-100' href="#">1</a></li>
                <li><a tw='h-[40px] w-[40px] inline-flex items-center justify-center text-[14px] text-[#3C3C3C] rounded-full hover:bg-gray-200 ease-in duration-300' href="#">2</a></li>
                <li><a tw='h-[40px] w-[40px] inline-flex items-center justify-center text-[14px] text-[#3C3C3C] rounded-full' href="#">...</a></li>
                <li><a tw='h-[40px] w-[40px] inline-flex items-center justify-center text-[14px] text-[#3C3C3C] rounded-full hover:bg-gray-200 ease-in duration-300' href="#">9</a></li>
                <li><a tw='h-[40px] w-[40px] inline-flex items-center justify-center text-[14px] text-[#3C3C3C] rounded-full hover:bg-gray-200 ease-in duration-300' href="#"><svg width="6" height="12" viewBox="0 0 6 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.195261 0.219668C-0.0650868 0.512566 -0.0650868 0.987436 0.195261 1.28033L4.39055 6.00001L0.195261 10.7197C-0.0650868 11.0126 -0.0650868 11.4875 0.195261 11.7803C0.455615 12.0732 0.877723 12.0732 1.13808 11.7803L5.80475 6.53034C6.06508 6.23746 6.06508 5.76256 5.80475 5.46968L1.13808 0.219668C0.877723 -0.0732226 0.455615 -0.0732226 0.195261 0.219668Z" fill="#8B8B8B" />
                </svg></a></li>
            </ul>
        </div>
    )
}

export default Ratings