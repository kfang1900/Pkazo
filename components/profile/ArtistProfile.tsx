import { useState } from 'react';
import Image from 'next/image';
import 'twin.macro';

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
      <section tw="pt-[48px]">
        <div className="container">
          <div tw="w-[90%] mx-auto grid grid-cols-2 md:grid-cols-[430px,auto] gap-y-[50px] md:gap-[172px]">
            <div tw="grid grid-cols-2 md:grid-cols-[200px,auto] place-items-center gap-[42px]">
              <div tw="w-[200px] h-[200px] overflow-hidden rounded-full justify-self-end">
                <Image
                  src="/store_assets/img/user.png"
                  alt="profile_image"
                  width="200px"
                  height="200px"
                  objectFit="cover"
                />
              </div>
              <div tw="flex flex-col justify-center items-center md:items-start justify-self-start">
                <h1 tw="text-3xl font-semibold text-black">James Jean</h1>
                <p tw="text-gray-600 text-lg mt-1">Taiwan, United States</p>
                <div tw="mt-[25px]">
                  {isFollowing ? (
                    <button
                      onClick={follwButtonHandler}
                      tw="duration-150 rounded-full font-bold text-base py-2.5 px-9 border border-[#C6C5C3] bg-white text-black hover:bg-black/5"
                    >
                      Following
                    </button>
                  ) : (
                    <button
                      onClick={follwButtonHandler}
                      tw="duration-150 rounded-full font-bold text-base py-2.5 px-9 border border-soft-red bg-soft-red hover:bg-red-600 hover:border-red-600 text-white"
                    >
                      Follow
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div tw="md:ml-[-40px]">
              <div tw="grid grid-cols-2 md:grid-cols-4 gap-[30px]">
                <div tw="px-5 text-center">
                  <p tw="text-xl text-black font-semibold">125</p>
                  <p tw="text-lg text-gray-600">Posts</p>
                </div>
                <div tw="px-5 text-center">
                  <p tw="text-xl text-black font-semibold">20</p>
                  <p tw="text-lg text-gray-600">Works</p>
                </div>
                <div tw="px-5 text-center">
                  <p tw="text-xl text-black font-semibold">
                    {isFollowing ? 114 : 113}
                  </p>
                  <p tw="text-lg text-gray-600">Followers</p>
                </div>
                <div tw="px-5 text-center">
                  <p tw="text-xl text-black font-semibold">3</p>
                  <p tw="text-lg text-gray-600">Following</p>
                </div>
              </div>

              <div tw="mt-[35px]">
                <p tw="text-black md:w-[100%]">
                  In his wide-ranging practice, Mike Kelley mined the banal
                  objects of everyday life and repurposed them in dark,
                  imaginative multimedia artworks. Throughout his oeuvre, the
                  artist explored notions of memory and dismantled distinctions
                  between high and low art.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArtistProfile;
