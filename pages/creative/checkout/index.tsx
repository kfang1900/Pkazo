import React, { useState } from 'react';
import 'twin.macro';
import Image from 'next/image';
import Logo from '../images/logo.svg';
import { FiHeart, FiSearch, FiShoppingCart } from 'react-icons/fi';
import ProductThumb from '../images/checkout-item.png';
import ProductUserThumb from '../images/james-jean.png';



function CheckoutCart() {
    const [showShipping, setShowShipping] = useState(false);

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

    const handleShipping = (e: any) => {
        e.preventDefault();
        setShowShipping(true);
    }

    const Checkout = () => {
        return (
            <>
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
                                <div tw='w-full'>

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

                    {/* SubTotal */}
                    <div tw='w-full max-w-[360px]'>
                        <div tw='flex justify-between mb-3'>
                            <h3 tw="mb-0 text-[#000000] font-bold text-[14px]">Subtotal</h3>
                            <strong tw='text-[13px] font-semibold'>$1820.00</strong>
                        </div>
                        {/* Shipping */}
                        {!showShipping ?
                            <a onClick={handleShipping} href="#" tw='underline font-semibold text-[#4A4A4A] text-[14px]'>Get shipping cost</a>
                            :
                            <div tw='flex justify-between mb-3'>
                                <h3 tw="mb-0 text-[#000000] font-bold text-[14px]">
                                    Shipping
                                    <p tw='text-[12px] font-normal text-[#888888]'>(To United States, 75025)</p>
                                </h3>
                                <strong tw='text-[13px] font-semibold'>$8.00</strong>
                            </div>
                        }
                        <hr tw='border my-[24px]' />

                        <div tw='flex justify-between'>
                            <h3 tw="mb-0 text-[#000000] font-bold text-[14px]">Total</h3>
                            <strong tw='text-[13px] font-semibold'>$1828.00</strong>
                        </div>

                    </div>
                </div>
                {/* END CODE FOR AUTH */}


                {/* Footer Sticky */}
                <div tw="bg-white border-t py-3 px-5 sticky bottom-[-20px]">
                    <button tw="border w-full border-[#2C1D1D] bg-[#2C1D1D] text-white h-[52px] rounded-full hover:bg-dark-400 transition-all duration-300 flex justify-center items-center gap-3">Proceed to Checkout</button>
                </div>

            </>

        );
    }
    return (
        <div tw='bg-[#E5E5E5] p-4 min-h-[100vh] flex items-center justify-center'>
            <div tw="flex gap-4">


                {/* CHECKOUT PAGE 
                ===================================================================================*/}
                <div tw="border w-[375px] bg-white">

                    {Checkout()}
                </div>

                {/* CHECKOUT PAGE 
                ===================================================================================*/}
                <div tw="border w-[770px] bg-white">
                    {Checkout()}
                </div>
            </div>
        </div>
    )
}

export default CheckoutCart;