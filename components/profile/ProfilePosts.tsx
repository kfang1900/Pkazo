import Image from 'next/image';
import tw, { styled } from 'twin.macro';

function ProfilePosts() {
  const postList = [
    { imgSrc: '/assets/images/posts/1.png' },
    { imgSrc: '/assets/images/posts/2.png' },
    { imgSrc: '/assets/images/posts/3.png' },
    { imgSrc: '/assets/images/posts/4.png' },
  ];

  return (
    <div tw="mb-10 mx-[5%]">
      <div tw="grid gap-6 lg:gap-10 sm:grid-cols-2 sm:w-[595px] lg:w-[915px] 2xl:w-[1235px] lg:grid-cols-3 2xl:grid-cols-4 mx-auto items-center">
        {/* Single Portfolio */}
        {postList.map((post, idx) => (
          <button key={idx}>
            <div tw="w-[full]">
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
