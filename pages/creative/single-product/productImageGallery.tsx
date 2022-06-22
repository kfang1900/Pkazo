import React from 'react';
import 'twin.macro';
import Image from 'next/image';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

import ProductImage1 from '../images/product-image.png';
import ProductImage2 from '../images/product-image-2.png';
import HeartIcon from '../images/heart.svg';


function ProductImageGallery() {
    const product_images_list = [
        {
            id: 1,
            image: ProductImage1,
        },
        {
            id: 2,
            image: ProductImage2,
        },
    ]

    return (
        <div>

            <div tw="flex flex-col md:flex-row gap-4 mb-5 relative">
                <button type='button' tw='absolute top-3 z-50 right-3 z-10'>
                    <Image width={HeartIcon.width} height={HeartIcon.height} src={HeartIcon.src} alt="" />
                </button>
                {/* Product Thumbnail */}
                <div tw="text-center w-full overflow-hidden">
                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={50}
                        slidesPerView={1}
                        effect="fade"
                        navigation
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {product_images_list && product_images_list.map((p, i) => (
                            <SwiperSlide key={i}>
                                <div tw="block">
                                    <img src="https://via.placeholder.com/1920x1080" tw='h-full w-full object-cover object-center' alt={`product-image-${p.id}`} />

                                    {/* <Image src={ProductImage1.src} tw='h-full w-full object-cover object-center' width={ProductImage1.width} height={ProductImage1.height} alt={`product-image-${p.id}`} /> */}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                {/* Product Gallery */}
                <ul tw="flex md:flex-col md:order-first flex-wrap gap-2">
                    {product_images_list && product_images_list.map((p, i) => (
                        <li key={i} tw='rounded-md w-[86px] h-[86px] overflow-hidden'>
                            <Image src={p.image.src} tw='h-full w-full object-cover object-center' width={p.image.width} height={p.image.height} alt={`product-image-${p.id}`} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ProductImageGallery