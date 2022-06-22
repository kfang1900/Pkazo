import React from 'react'
import 'twin.macro';

function Shipping() {
    return (
        <div>
            <div tw='sm:px-6'>

                <div tw="text-center mb-5">
                    <p tw='mb-[20px] text-[14px]'>Pay as low as $66/ mo. <strong>Affirm</strong>. See if you’re prequalified.</p>

                    {/* Buttons */}
                    <button tw="mb-[12px] w-full py-[15px] px-4 text-[14px] font-bold rounded-full border border-[1.5px] border-[#3C3C3C] text-[#222222] hover:bg-dark-400 hover:text-white ease-in duration-300">Make an Offer</button>
                    <button tw="mb-[12px] w-full py-[15px] px-4 text-[14px] font-bold rounded-full border border-[1.5px] border-[#3C3C3C] text-[#3C3C3C] hover:bg-dark-400 hover:text-white ease-in duration-300">Buy Now</button>
                    <button tw="w-full py-[15px] px-4 text-[14px] font-bold rounded-full border border-[1.5px] border-[#E44C4D] bg-[#E44C4D] text-white hover:bg-[#dd2627] hover:text-white ease-in duration-300">Add to cart</button>
                </div>


                <ul tw='flex flex-col gap-4'>
                    <li tw='flex gap-2'>
                        <div tw='mt-2'>
                            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.00677 0L11.4864 1.70996C11.6393 1.75766 11.7729 1.85306 11.8676 1.98176C11.9625 2.11046 12.0136 2.26616 12.0135 2.42635V3.75022H13.5152C13.7144 3.75022 13.9054 3.82852 14.0462 3.96982C14.1869 4.11022 14.266 4.30102 14.266 4.49991V10.5001C14.266 10.699 14.1869 10.8898 14.0462 11.0302C13.9054 11.1706 13.7144 11.2498 13.5152 11.2498L11.0975 11.2507C10.807 11.6332 10.454 11.9707 10.0463 12.2479L6.00677 15L1.96721 12.2487C1.36093 11.8357 0.864786 11.2813 0.52194 10.6333C0.179095 9.98529 -7.20595e-05 9.26352 2.17408e-08 8.53003V2.42635C9.01233e-05 2.26616 0.0512767 2.11046 0.146091 1.98176C0.240895 1.85306 0.37439 1.75855 0.527094 1.71085L6.00677 0ZM6.00677 1.57046L1.5017 2.97714V8.53003C1.50159 8.98992 1.607 9.44261 1.80982 9.8548C2.01263 10.267 2.30743 10.627 2.67151 10.9069L2.81342 11.0086L6.00677 13.1847L8.84644 11.2498H5.25592C5.05679 11.2498 4.86581 11.1706 4.725 11.0302C4.58419 10.8898 4.50508 10.699 4.50508 10.5001V4.49991C4.50508 4.30102 4.58419 4.11022 4.725 3.96982C4.86581 3.82852 5.05679 3.75022 5.25592 3.75022H10.5119V2.97714L6.00677 1.57046ZM6.00677 7.49955V9.7495H12.7644V7.49955H6.00677ZM6.00677 6.00018H12.7644V5.24959H6.00677V6.00018Z" fill="#333333" />
                            </svg>
                        </div>
                        <div tw='text-[14px]'>
                            <h5 tw='font-semibold'>Secure Payment</h5>
                            <p tw=''>Secure transactions by credit card through Stripe.</p>
                        </div>
                    </li>
                    <li tw='flex gap-2'>
                        <div tw='mt-2'>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.643 5.21533H9.85696C9.68602 5.21533 9.52341 5.29676 9.42283 5.43733L6.78814 9.08702L5.5948 7.43275C5.49424 7.29389 5.33334 7.21075 5.16071 7.21075H4.37465C4.26571 7.21075 4.20202 7.33419 4.26571 7.42333L6.35405 10.3162C6.5669 10.6119 7.0077 10.6119 7.22055 10.3162L10.7503 5.42792C10.8157 5.33877 10.752 5.21533 10.643 5.21533Z" fill="#333333" />
                                <path d="M7.50861 0C3.36211 0 0 3.35829 0 7.5C0 11.6417 3.36211 15 7.50861 15C11.6551 15 15.0172 11.6417 15.0172 7.5C15.0172 3.35829 11.6551 0 7.50861 0ZM7.50861 13.728C4.06604 13.728 1.27379 10.9389 1.27379 7.5C1.27379 4.06114 4.06604 1.27201 7.50861 1.27201C10.9512 1.27201 13.7434 4.06114 13.7434 7.5C13.7434 10.9389 10.9512 13.728 7.50861 13.728Z" fill="#333333" />
                            </svg>
                        </div>
                        <div tw='text-[14px]'>
                            <h5 tw='font-semibold'>Your purchase is protected</h5>
                            <p tw=''>Learn more about <strong>Pkazo’s buyer protection.</strong></p>
                        </div>
                    </li>
                </ul>
            </div>
            <hr tw='border my-[24px]' />

            <div tw='sm:px-6'>
                <ul tw="flex flex-col gap-5">
                    <li>
                        <div tw="grid grid-cols-2">
                            <div tw="sm:col-span-1">
                                <h5 tw='text-[#65676B] text-[14px]'>Ready to Ship </h5>
                                <p tw="text-[20px] leading-[28px] text-black">5-7 business days </p>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div tw="grid grid-cols-2">
                            <div tw="sm:col-span-1">
                                <h5 tw='text-[#65676B] text-[14px]'>Shipping Cost </h5>
                                <p tw="text-[20px] leading-[28px] text-black">$120</p>
                            </div>
                            <div tw="sm:col-span-1">
                                <h5 tw='text-[#65676B] text-[14px]'>Returns </h5>
                                <p tw="text-[20px] leading-[28px] text-black">Accepted</p>
                            </div>
                        </div>
                    </li>
                </ul>


                <div tw="mt-5 mb-10">
                    <a href="#" tw='text-[14px] underline text-[#65676B]'>Shipping and Return Policies</a>
                </div>

            </div>
        </div>
    )
}

export default Shipping