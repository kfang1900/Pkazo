import React, { useState } from 'react';
import 'twin.macro';
import Image from 'next/image';
import Logo from '../images/logo.svg';
import { FiHeart, FiSearch, FiShoppingCart } from 'react-icons/fi';
import ProductThumb from '../images/checkout-item.png';
import ProductUserThumb from '../images/james-jean.png';



function LoginRegister() {
    const [show_login_password, setShow_login_password] = useState(false);
    const [show_register_password, setShow_register_password] = useState(false);

    const cart = [
        {
            name: "Jammer",
            thumb: ProductThumb,
            size: "Size: 8” x 10” inches",
            price: "$1,820",
        },
        {
            name: "Jammer",
            thumb: ProductThumb,
            size: "Size: 8” x 10” inches",
            price: "$1,820",
        },
        {
            name: "Jammer",
            thumb: ProductThumb,
            size: "Size: 8” x 10” inches",
            price: "$1,820",
        },
        {
            name: "Jammer",
            thumb: ProductThumb,
            size: "Size: 8” x 10” inches",
            price: "$1,820",
        },
        {
            name: "Jammer",
            thumb: ProductThumb,
            size: "Size: 8” x 10” inches",
            price: "$1,820",
        },
        {
            name: "Jammer",
            thumb: ProductThumb,
            size: "Size: 8” x 10” inches",
            price: "$1,820",
        },
    ]
    return (
        <div tw='bg-[#E5E5E5] p-4 min-h-[100vh] flex items-center justify-center'>
            <div tw="flex gap-4">

                {/* LOGIN FRAME 
                =================================================================================== */}
                <div tw="border w-[375px] bg-white">


                    {/* START CODE FOR AUTH */}
                    {/* Header */}
                    <div tw="border-b border-[#E2E2E2] py-[16px] px-[20px]">
                        <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="" />
                    </div>
                    <div tw="p-[20px]">


                        {/* Section Heading */}
                        <div tw='mb-[24px]'>
                            <p tw='text-[#838383] text-[16px] leading-[28px]'>Welcome back!</p>
                            <h3 tw='text-[#3C3C3C] text-[20px] font-bold leading-[28px]'>Sign in</h3>
                        </div>

                        <form tw='font-open-sans'>
                            {/* Form Control Group */}
                            <div tw="mb-4">
                                <label tw='font-semibold text-[16px] text-[#3C3C3C] mb-2 block' htmlFor="label--email">Email address</label>
                                <input type="text" id='label--email' tw='border border-[#D8D8D8] py-3 px-4 w-full rounded-[6px]' />
                            </div>
                            {/* Form Control Group */}
                            <div tw="mb-4">
                                <label tw='font-semibold text-[16px] text-[#3C3C3C] mb-2 block' htmlFor="label--password">Password</label>
                                <div tw="relative">
                                    <input type={show_login_password ? "text" : "password"} id='label--password' tw='border border-[#D8D8D8] py-3 px-4 pr-20 w-full rounded-[6px]' />
                                    <a onClick={() => { setShow_login_password(!show_login_password) }} tw='absolute cursor-pointer top-1/2 right-3 -translate-y-1/2 underline text-[14px] font-light'>
                                        {show_login_password ? "Hide" : "Show"}
                                    </a>
                                </div>
                            </div>
                            {/* Form Control Group */}
                            <div tw="flex items-center justify-between mb-[27px]">
                                <div tw="">
                                    <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
                                    <label tw='pl-2' htmlFor="vehicle1">Stay signed in</label>
                                </div>
                                <a href='#' tw="text-[#333333] text-[13px] leading-[18px] font-normal underline font-open-sans">Forgot your password?</a>
                            </div>
                            {/* Button */}
                            <button tw="border w-full border-[#D8D8D8] bg-[#3C3C3C] text-white h-[52px] rounded-full hover:bg-dark-400 transition-all duration-300 flex justify-center items-center gap-3">
                                Sign in
                            </button>
                        </form>


                        {/* OR */}

                        <div tw="relative py-4 z-10 flex justify-center items-center before:content[''] before:w-full before:h-[1.5px] before:bg-[#E2E2E2] before:absolute before:top-1/2 before:-translate-y-1/2 before:z-[-1]">
                            <span tw='px-4 bg-white text-[#98989E] text-[14px] leading-[17px]'>Or</span>
                        </div>


                        {/* Authentication */}
                        <div tw="mb-[60px]">


                            <div tw="flex flex-col gap-[12px] mb-[16px]">
                                {/* Google */}
                                <button tw="border border-[#D8D8D8] h-[52px] rounded-full hover:bg-dark-100/5 transition-all duration-300 flex justify-center items-center gap-3">
                                    <span>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.1171 8.36775H17.4478V8.33317H9.97015V11.6665H14.6657C13.9807 13.6069 12.1399 14.9998 9.97015 14.9998C7.21712 14.9998 4.98503 12.7611 4.98503 9.99984C4.98503 7.23859 7.21712 4.99984 9.97015 4.99984C11.2409 4.99984 12.3971 5.48067 13.2774 6.26609L15.6274 3.909C14.1435 2.52192 12.1586 1.6665 9.97015 1.6665C5.38177 1.6665 1.66162 5.39775 1.66162 9.99984C1.66162 14.6019 5.38177 18.3332 9.97015 18.3332C14.5585 18.3332 18.2787 14.6019 18.2787 9.99984C18.2787 9.44109 18.2214 8.89567 18.1171 8.36775Z" fill="#FFC107" />
                                            <path d="M2.61963 6.12109L5.3494 8.129C6.08802 6.29484 7.87685 4.99984 9.97019 4.99984C11.241 4.99984 12.3971 5.48067 13.2774 6.26609L15.6275 3.909C14.1436 2.52192 12.1587 1.6665 9.97019 1.6665C6.77888 1.6665 4.01131 3.47359 2.61963 6.12109Z" fill="#FF3D00" />
                                            <path d="M9.9704 18.3331C12.1165 18.3331 14.0665 17.5094 15.5409 16.1698L12.9694 13.9873C12.1072 14.645 11.0536 15.0007 9.9704 14.9998C7.80935 14.9998 5.97441 13.6177 5.28314 11.689L2.57373 13.7827C3.94879 16.4815 6.74129 18.3331 9.9704 18.3331Z" fill="#4CAF50" />
                                            <path d="M18.1171 8.36808H17.4479V8.3335H9.97021V11.6668H14.6658C14.3381 12.5903 13.7478 13.3973 12.9679 13.9881L12.9692 13.9872L15.5407 16.1697C15.3587 16.3356 18.2787 14.1668 18.2787 10.0002C18.2787 9.44141 18.2214 8.896 18.1171 8.36808Z" fill="#1976D2" />
                                        </svg>
                                    </span>
                                    <span tw='text-[16px] font-bold text-[#000000] leading-[22px]'>Continue with Google</span>
                                </button>
                                {/* Google */}
                                <button tw="border border-[#D8D8D8] h-[52px] rounded-full hover:bg-dark-100/5 transition-all duration-300 flex justify-center items-center gap-3">
                                    <span>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.0661 18C17.5523 18 17.9465 17.6046 17.9465 17.1169V2.88306C17.9465 2.39531 17.5523 2 17.0661 2H2.87457C2.38821 2 1.99414 2.39531 1.99414 2.88306V17.1169C1.99414 17.6046 2.38821 18 2.87457 18H17.0661Z" fill="#395185" />
                                            <path d="M11.3884 16.9808V11.0585H13.2257L13.5007 8.75055H11.3884V7.27693C11.3884 6.6087 11.56 6.15332 12.4456 6.15332L13.5751 6.15278V4.08854C13.3797 4.0604 12.7092 3.99756 11.9292 3.99756C10.3006 3.99756 9.18569 5.07314 9.18569 7.04843V8.75055H7.34375V11.0585H9.18569V16.9808H11.3884Z" fill="white" />
                                        </svg>
                                    </span>
                                    <span tw='text-[16px] font-bold text-[#000000] leading-[22px]'>Continue with Facebook</span>
                                </button>
                            </div>


                            <div tw="text-[13px] leading-[20px] font-normal text-[#595959]">
                                <p>By clicking Create Account or Continue with Google or Facebook, you agree to Pkazo’s Terms of Use and Privacy Policy. Pkazo may send you communications; you may change your preferences in your account settings.</p>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div tw="text-center text-[13px] leading-[17px] font-bold">
                            <p>New to Pkazo? <a href='#' tw="text-[#E24E4D] underline">Register here</a></p>
                        </div>
                    </div>
                    {/* END CODE FOR AUTH */}


                </div>




                {/* REGISTER FRAME 
                ===================================================================================*/}
                <div tw="border w-[375px] bg-white">


                    {/* START CODE FOR AUTH */}
                    {/* Header */}
                    <div tw="border-b border-[#E2E2E2] py-[16px] px-[20px]">
                        <Image src={Logo.src} width={Logo.width} height={Logo.height} alt="" />
                    </div>
                    <div tw="p-[20px]">
                        {/* Section Heading */}
                        <div tw='mb-[24px]'>
                            <p tw='text-[#838383] text-[16px] leading-[28px]'>Welcome back!</p>
                            <h3 tw='text-[#3C3C3C] text-[20px] font-bold leading-[28px]'>Join The Community</h3>
                        </div>

                        <form tw='font-open-sans'>
                            {/* Form Control Group */}
                            <div tw="mb-4">
                                <label tw='font-semibold text-[16px] text-[#3C3C3C] mb-2 block' htmlFor="label--email">Email address <sup tw='text-[#E24E4D]'>*</sup></label>
                                <input type="email" id='label--email' tw='border border-[#D8D8D8] py-3 px-4 w-full rounded-[6px]' />
                            </div>
                            {/* Form Control Group */}
                            <div tw="mb-4">
                                <label tw='font-semibold text-[16px] text-[#3C3C3C] mb-2 block' htmlFor="label--name">Name <sup tw='text-[#E24E4D]'>*</sup></label>
                                <input type="text" id='label--name' tw='border border-[#D8D8D8] py-3 px-4 w-full rounded-[6px]' />
                            </div>
                            {/* Form Control Group */}
                            <div tw="mb-4">
                                <label tw='font-semibold text-[16px] text-[#3C3C3C] mb-2 block' htmlFor="label--password">Password <sup tw='text-[#E24E4D]'>*</sup></label>
                                <div tw="relative">
                                    <input type={show_register_password ? "text" : "password"} id='label--password' tw='border border-[#D8D8D8] py-3 px-4 pr-20 w-full rounded-[6px]' />
                                    <span onClick={() => { setShow_register_password(!show_register_password) }} tw='cursor-pointer absolute top-1/2 right-3 -translate-y-1/2 underline text-[14px] font-light'>Show</span>
                                </div>
                            </div>
                            {/* Button */}
                            <button tw="border w-full border-[#D8D8D8] bg-[#3C3C3C] text-white h-[52px] rounded-full hover:bg-dark-400 transition-all duration-300 flex justify-center items-center gap-3">
                                Create Account
                            </button>
                        </form>


                        {/* OR */}

                        <div tw="relative py-4 z-10 flex justify-center items-center before:content[''] before:w-full before:h-[1.5px] before:bg-[#E2E2E2] before:absolute before:top-1/2 before:-translate-y-1/2 before:z-[-1]">
                            <span tw='px-4 bg-white text-[#98989E] text-[14px] leading-[17px]'>Or</span>
                        </div>

                        {/* Authentication */}
                        <div tw="mb-[60px]">
                            <div tw="flex flex-col gap-[12px] mb-[16px]">
                                {/* Google */}
                                <button tw="border border-[#D8D8D8] h-[52px] rounded-full hover:bg-dark-100/5 transition-all duration-300 flex justify-center items-center gap-3">
                                    <span>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18.1171 8.36775H17.4478V8.33317H9.97015V11.6665H14.6657C13.9807 13.6069 12.1399 14.9998 9.97015 14.9998C7.21712 14.9998 4.98503 12.7611 4.98503 9.99984C4.98503 7.23859 7.21712 4.99984 9.97015 4.99984C11.2409 4.99984 12.3971 5.48067 13.2774 6.26609L15.6274 3.909C14.1435 2.52192 12.1586 1.6665 9.97015 1.6665C5.38177 1.6665 1.66162 5.39775 1.66162 9.99984C1.66162 14.6019 5.38177 18.3332 9.97015 18.3332C14.5585 18.3332 18.2787 14.6019 18.2787 9.99984C18.2787 9.44109 18.2214 8.89567 18.1171 8.36775Z" fill="#FFC107" />
                                            <path d="M2.61963 6.12109L5.3494 8.129C6.08802 6.29484 7.87685 4.99984 9.97019 4.99984C11.241 4.99984 12.3971 5.48067 13.2774 6.26609L15.6275 3.909C14.1436 2.52192 12.1587 1.6665 9.97019 1.6665C6.77888 1.6665 4.01131 3.47359 2.61963 6.12109Z" fill="#FF3D00" />
                                            <path d="M9.9704 18.3331C12.1165 18.3331 14.0665 17.5094 15.5409 16.1698L12.9694 13.9873C12.1072 14.645 11.0536 15.0007 9.9704 14.9998C7.80935 14.9998 5.97441 13.6177 5.28314 11.689L2.57373 13.7827C3.94879 16.4815 6.74129 18.3331 9.9704 18.3331Z" fill="#4CAF50" />
                                            <path d="M18.1171 8.36808H17.4479V8.3335H9.97021V11.6668H14.6658C14.3381 12.5903 13.7478 13.3973 12.9679 13.9881L12.9692 13.9872L15.5407 16.1697C15.3587 16.3356 18.2787 14.1668 18.2787 10.0002C18.2787 9.44141 18.2214 8.896 18.1171 8.36808Z" fill="#1976D2" />
                                        </svg>
                                    </span>
                                    <span tw='text-[16px] font-bold text-[#000000] leading-[22px]'>Continue with Google</span>
                                </button>
                                {/* Google */}
                                <button tw="border border-[#D8D8D8] h-[52px] rounded-full hover:bg-dark-100/5 transition-all duration-300 flex justify-center items-center gap-3">
                                    <span>
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M17.0661 18C17.5523 18 17.9465 17.6046 17.9465 17.1169V2.88306C17.9465 2.39531 17.5523 2 17.0661 2H2.87457C2.38821 2 1.99414 2.39531 1.99414 2.88306V17.1169C1.99414 17.6046 2.38821 18 2.87457 18H17.0661Z" fill="#395185" />
                                            <path d="M11.3884 16.9808V11.0585H13.2257L13.5007 8.75055H11.3884V7.27693C11.3884 6.6087 11.56 6.15332 12.4456 6.15332L13.5751 6.15278V4.08854C13.3797 4.0604 12.7092 3.99756 11.9292 3.99756C10.3006 3.99756 9.18569 5.07314 9.18569 7.04843V8.75055H7.34375V11.0585H9.18569V16.9808H11.3884Z" fill="white" />
                                        </svg>
                                    </span>
                                    <span tw='text-[16px] font-bold text-[#000000] leading-[22px]'>Continue with Facebook</span>
                                </button>
                            </div>


                            <div tw="text-[13px] leading-[20px] font-normal text-[#595959]">
                                <p>By clicking Create Account or Continue with Google or Facebook, you agree to Pkazo’s Terms of Use and Privacy Policy. Pkazo may send you communications; you may change your preferences in your account settings.</p>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div tw="text-center text-[13px] leading-[17px] font-bold">
                            <p>New to Pkazo? <a href='#' tw="text-[#E24E4D] underline">Register here</a></p>
                        </div>
                    </div>
                    {/* END CODE FOR AUTH */}


                </div>



                {/* CHECKOUT PAGE 
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
                    <div tw="p-[20px] max-h-[calc(100vh - 13rem)] overflow-x-hidden relative">

                        {cart.map((item, idx) => (
                            <div key={idx}>

                                {/* Product Author */}
                                <div tw="mb-4 flex gap-3 items-center">
                                    <div tw="w-[50px] h-[50px]">
                                        <Image src={ProductUserThumb.src} width={ProductUserThumb.width} height={ProductUserThumb.height} tw='w-full h-full' alt="" />
                                    </div>
                                    <div>
                                        <h2 tw='text-[16px] font-bold font-open-sans'>James Jean</h2>
                                        <p tw="mb-0 font-semibold text-[14px] font-medium font-open-sans text-[#838383]">Los Angeles, CA</p>
                                    </div>
                                    <button tw='ml-auto rounded-full text-[13px] py-[7px] px-[20px] font-semibold transition-all duration-300 border border-[#8E8E93] bg-white text-[#3C3C3C] hover:bg-[#3C3C3C] hover:border-[#3C3C3C] hover:text-white'>Message</button>
                                </div>

                                {/* Product Details */}
                                <div tw='flex gap-4'>
                                    <div>
                                        <Image src={item.thumb.src} width={item.thumb.width} height={item.thumb.height} alt="" />
                                    </div>
                                    <div>

                                        <div tw='flex gap-3 flex-wrap'>
                                            <span tw='bg-[#FFE1E1] text-[#742F2F] text-[12px] font-semibold py-[2px] px-2 rounded-full'>Original</span>
                                            <span tw='bg-[#D8E8D8] text-[#222222] text-[12px] font-semibold py-[2px] px-2 rounded-full'>Print</span>
                                        </div>

                                        <h3 tw='italic text-[24px] text-[#696969] font-semibold'>{item.name}</h3>
                                        <p tw='text-[14px] text-[#696969]'>
                                            <span>{item.size}</span>
                                            <a tw='ml-3' href="#">Edit</a>
                                        </p>

                                        <div tw='flex mb-4 justify-between items-center'>

                                            <select name="" id="">
                                                <option value="1">1</option>
                                                <option value="1">2</option>
                                                <option value="1">3</option>
                                            </select>

                                            <strong>{item.price}</strong>
                                        </div>


                                        <div tw='flex gap-3 lg:gap-7 flex-wrap'>
                                            <a href="#" tw='text-[#2C2C2C] font-bold text-[12px]'>Save for later</a>
                                            <a href="#" tw='text-[#2C2C2C] font-bold text-[12px]'>Remove</a>
                                        </div>
                                    </div>
                                </div>
                                {/* Product Note */}
                                <div>
                                    <div tw="flex gap-2 mb-4 items-center">
                                        <input type="checkbox" id="order_gift-1" name="order_gift-1" value="Bike" />
                                        <label tw='pl-2 text-[14px] text-[#616161]' htmlFor="order_gift-1">
                                            <h6>This order is a gift</h6>
                                            <p tw='text-[12px] text-[#888888]'>Prices will not be shown on packing slip</p>
                                        </label>
                                    </div>
                                    <textarea tw='mb-2 w-full border border-[#CDCDCD] rounded resize-none px-3 py-2 h-[95px] text-[14px]' name="" id="" placeholder='Add a note to James Jean (optional)'></textarea>
                                </div>

                                {/* Shipping */}
                                <div tw='text-[12px] text-[#7C7C7C] text-right'>
                                    <h6 tw='text-[13px] text-[#000000] mb-1 font-medium'>Shipping: $4.00</h6>
                                    <p>Estimated delivery: June 3-8</p>
                                    <p>from Dallas, TX</p>
                                </div>


                                <hr tw='border my-[24px]' />
                            </div>
                        ))}
                    </div>
                    {/* END CODE FOR AUTH */}


                    {/* Footer Sticky */}
                    <div tw="bg-white border-t py-3 px-5 sticky bottom-[-20px]">
                        <button tw="border w-full border-[#2C1D1D] bg-[#2C1D1D] text-white h-[52px] rounded-full hover:bg-dark-400 transition-all duration-300 flex justify-center items-center gap-3">Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginRegister;