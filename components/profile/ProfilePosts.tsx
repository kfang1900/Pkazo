import Image from 'next/image';
import tw, { styled } from 'twin.macro';

function ProfilePosts() {
  const postList = [
    {
      imgSrc: '/store_assets/img/gallery/gallery_1.png',
    },
    {
      imgSrc: '/store_assets/img/gallery/gallery_2.png',
    },
    {
      imgSrc: '/store_assets/img/gallery/gallery_3.png',
    },
    {
      imgSrc: '/store_assets/img/gallery/gallery_4.png',
    },
    {
      imgSrc: '/store_assets/img/gallery/gallery_5.png',
    },
    {
      imgSrc: '/store_assets/img/gallery/gallery_6.png',
    },
    {
      imgSrc: '/store_assets/img/gallery/gallery_7.png',
    },
    {
      imgSrc: '/store_assets/img/gallery/gallery_8.png',
    },
    {
      imgSrc: '/store_assets/img/gallery/gallery_9.png',
    },
    { imgSrc: '/store_assets/img/product-placeholder.jpg' },
    { imgSrc: '/store_assets/img/product-placeholder.jpg' },
    { imgSrc: '/store_assets/img/product-placeholder.jpg' },
    { imgSrc: '/store_assets/img/product-placeholder.jpg' },
    { imgSrc: '/store_assets/img/product-placeholder.jpg' },
    { imgSrc: '/store_assets/img/product-placeholder.jpg' },
    { imgSrc: '/store_assets/img/product-placeholder.jpg' },
    { imgSrc: '/store_assets/img/product-placeholder.jpg' },
    { imgSrc: '/store_assets/img/product-placeholder.jpg' },
    { imgSrc: '/store_assets/img/product-placeholder.jpg' },
    { imgSrc: '/store_assets/img/product-placeholder.jpg' },
  ];

  return (
    <div tw="mb-10 mx-[5%]">
      <div tw="grid gap-6 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {/* Single Portfolio */}
        {postList.map((post, idx) => (
          <button key={idx}>
            <div tw="w-full">
              <img
                src={post.imgSrc}
                alt="Image Alt"
                tw="object-none w-[275px] h-[275px] mx-auto"
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProfilePosts;
