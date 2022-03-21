import { useState } from 'react';
import Image from 'next/image';
import tw from 'twin.macro';

const numFormatter = (x: number) => {
  if (x > 999 && x < 1000000) {
    return (x / 1000).toFixed(1).replace(/\.?0+$/, '') + 'K'; // convert to K for number from > 1000 < 1 million
  } else if (x > 1000000) {
    return (x / 1000000).toFixed(1).replace(/\.?0+$/, '') + 'M'; // convert to M for number from > 1 million
  } else return x; // if value < 1000, nothing to do
};

const ArtistProfile = () => {
  const [isFollowing, setIsFollowing] = useState<boolean | undefined>(false);
  const [isShowUnfollowConfirmModal, setIsShowUnfollwConfirmModal] =
    useState(false);

  const follwButtonHandler = () => {
    setIsFollowing((prev) => {
      if (prev) {
        setIsShowUnfollwConfirmModal(true);
        return true;
      } else {
        return true;
      }
    });
  };

  const unFollowHandler = () => {
    setIsFollowing(false);
    setIsShowUnfollwConfirmModal(false);
  };

  const UnFollowConfirmationModal = () => {
    return (
      <div tw="fixed top-0 left-0 w-full h-full z-50 bg-black/40 flex items-center justify-center">
        <div tw="w-[350px] rounded-3xl bg-white py-10 px-10">
          <h2 tw="text-2xl text-black font-bold">Unfollow James Jean?</h2>
          {/* <p tw="text-black/70 mt-2 text-lg leading-[1.4]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa et
            magni, voluptatibus ut blanditiis molestiae?
          </p> */}
          <div tw="mt-8 space-y-4">
            <button
              onClick={unFollowHandler}
              tw="duration-150 block w-full rounded-full font-bold text-base py-2.5 px-9 border-2 border-soft-red bg-soft-red hover:bg-red-600 hover:border-red-600 text-white"
            >
              Unfollow
            </button>
            <button
              onClick={() => setIsShowUnfollwConfirmModal(false)}
              tw="duration-150 block w-full rounded-full font-bold text-base py-2.5 px-9 border border-[#C6C5C3] bg-white text-black hover:bg-black/5"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {isShowUnfollowConfirmModal && <UnFollowConfirmationModal />}
      <section tw="mt-[48px] mb-[40px]">
        <div className="container">
          <div tw="grid grid-cols-[200px auto] gap-[85px] mx-[15%]">
            <div tw="w-[200px] h-[200px] overflow-hidden rounded-full">
              <Image
                src="/store_assets/img/user.png"
                alt="profile_image"
                width="200px"
                height="200px"
                objectFit="cover"
              />
            </div>
            <div>
              <div tw="flex items-center justify-start">
                <h1 tw="text-3xl font-semibold text-black mr-[40px]">
                  James Jean
                </h1>
                <button
                  onClick={follwButtonHandler}
                  css={[
                    tw`h-[40px] rounded-full font-bold text-base px-9 border text-center`,
                    isFollowing
                      ? tw`border-[#C6C5C3] bg-white text-black hover:bg-black/5`
                      : tw`border-soft-red bg-soft-red hover:bg-red-600 hover:border-red-600 text-white`,
                  ]}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
                <button tw="ml-[20px] w-[40px] h-[40px] rounded-full border border-[#C6C5C3] bg-white text-[#8E8E93] hover:bg-black/5 text-center">
                  •••
                </button>
              </div>
              <p tw="text-gray-600 text-lg mt-1">Taiwan, United States</p>
              <div tw="mt-[12px]">
                <p tw="text-black">
                  In his wide-ranging practice, Mike Kelley mined the banal
                  objects of everyday life and repurposed them in dark,
                  imaginative multimedia artworks. Throughout his oeuvre, the
                  artist explored notions of memory and dismantled distinctions
                  between high and low art.
                </p>
              </div>
              <div tw="grid grid-cols-[repeat(4,100px)] gap-[30px] ml-[-20px] mt-[35px]">
                <div tw="px-5 text-center mx-auto">
                  <p tw="text-xl text-black font-semibold">
                    {numFormatter(125)}
                  </p>
                  <p tw="text-lg text-gray-600">Posts</p>
                </div>
                <div tw="px-5 text-center mx-auto">
                  <p tw="text-xl text-black font-semibold">
                    {numFormatter(20)}
                  </p>
                  <p tw="text-lg text-gray-600">Works</p>
                </div>
                <div tw="px-5 text-center mx-auto">
                  <p tw="text-xl text-black font-semibold">
                    {numFormatter(isFollowing ? 114 : 113)}
                  </p>
                  <p tw="text-lg text-gray-600">Followers</p>
                </div>
                <div tw="px-5 text-center mx-auto">
                  <p tw="text-xl text-black font-semibold">{numFormatter(3)}</p>
                  <p tw="text-lg text-gray-600">Following</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtistProfile;
