import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import 'twin.macro';
import {useRouter} from 'next/router';
import Header from 'components/Header';
import smallpic1 from 'public/assets/indiv_work/smallpic1.png';
import bigpic1 from 'public/assets/indiv_work/bigpic1.png';
import smallpic2 from 'public/assets/indiv_work/smallpic2.png';
import bigpic2 from 'public/assets/indiv_work/bigpic2.png';
import progress1 from 'public/assets/indiv_work/progress1.png';
import progress2 from 'public/assets/indiv_work/progress2.png';
import progress3 from 'public/assets/indiv_work/progress3.png';
import progress4 from 'public/assets/indiv_work/progress4.png';
import PostDetails from 'components/popups/PostDetails';
import {fetchArtistByID, fetchWorkByID, loadStorageImage, loadStorageImages} from 'utils/FirebaseFunctions'
import {DocumentData,DocumentSnapshot} from "firebase/firestore";
import { sample_posts } from 'utils/Sample_Posts_Imports';
import {defaultWorkPicture} from 'utils/FrontEndDefaults'

const workImages = [
  { small: smallpic1, big: bigpic1 },
  { small: smallpic2, big: bigpic2 },
];
const progressImages = [progress1, progress2, progress3, progress4];
const comments = [
  {
    user: 'Jake Hill',
    time: '1h',
    comment: 'Super cool. Kinda creepy. I love it.',
    imgSrc: '/assets/indiv_work/commenter1.png',
  },
  {
    user: 'Amanda Evans',
    time: '2h',
    comment: 'This is amazing! The red really adds to the painting.',
    imgSrc: '/assets/indiv_work/commenter2.png',
  },
  {
    user: 'Prashant Singh',
    time: '5h',
    comment: 'Ugh! 😧 Your talent is out of our orbit. Seriously!',
    imgSrc: '/assets/indiv_work/commenter3.png',
  },
];
const getPageData = async(workid:string,setWorkData:any,setArtistData:any,setArtistPicture:any,setWorkPictures:any)=>{
  const workD = await fetchWorkByID(workid)
  const artistD = await fetchArtistByID(workD?.data()?.Artist)

  setArtistData(artistD)
  setWorkData(workD)
  const artistImgURL = await loadStorageImage(artistD?.data()?.ProfilePicture)
  setArtistPicture(artistImgURL)
  //console.log(artistImgURL)
  const workPictures = await loadStorageImages(workD?.data()?.Images)
  console.log(workPictures)
  setWorkPictures(workPictures)

}

const IndividualWork: NextPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [workData, setWorkData] = useState<DocumentSnapshot<DocumentData>>();
  const [artistData, setArtistData] = useState<DocumentSnapshot<DocumentData>>();
  const [artistPicture, setArtistPicture] = useState("/store_assets/img/user.png")
  const [workImages, setWorkImages]= useState([defaultWorkPicture])
  console.log(workData)
  const [popup, setPopup] = useState(false);
  const router=useRouter();
  const {workid } = router.query;
  useEffect(()=>{
    if(router.isReady && workData==undefined){
      console.log(workid, typeof workid)
      if(typeof workid == "string"){
        getPageData(workid,setWorkData,setArtistData,setArtistPicture,setWorkImages)
      }
    }
  })

  

  return (
    <>
    {workData===undefined?(<div>404</div>):(
    <>
      <Head>
        <title>Portfolio</title>
      </Head>
      <Header />
      {popup && (
        <PostDetails post={sample_posts[1]} onClose={() => setPopup(false)} />
      )}
      <div tw="flex mt-8">
        {/* flex-grow should just be grow, wait for twin.macro to update */}
        <div tw="flex-grow">
          <div tw="mt-9 ml-[126px] flex">
            <div tw="flex flex-col gap-y-5">
              {workImages.map((x, i) => (
                <button key={i} onClick={() => setSelectedImage(i)}>
                  <Image
                    src={x}
                    width={86}
                    height={86}
                    alt="work_image_preview"
                  />
                </button>
              ))}
            </div>
            {/* flex-grow should just be grow, wait for twin.macro to update */}
            <div tw="mx-10 flex-grow flex gap-x-6 justify-center items-center">
              <button
                tw="bg-gray-100 rounded-full w-8 h-8 flex justify-center items-center"
                onClick={() =>
                  setSelectedImage(
                    (selectedImage + workImages.length - 1) % workImages.length
                  )
                }
              >
                <svg
                  width="9"
                  height="16"
                  viewBox="0 0 9 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.29888 15.0384C8.66405 14.6732 8.66405 14.0811 8.29888 13.716L2.41447 7.83158L8.29888 1.94718C8.66405 1.58203 8.66405 0.989934 8.29888 0.624784C7.9337 0.259633 7.34164 0.259633 6.97646 0.624784L0.430875 7.17038C0.0657234 7.53553 0.0657234 8.12762 0.430875 8.49277L6.97646 15.0384C7.34164 15.4035 7.9337 15.4035 8.29888 15.0384Z"
                    fill="#222222"
                  />
                </svg>
              </button>
              <div tw="relative">
                <Image
                  src={workImages[selectedImage]}
                  width={486}
                  height={607.5}
                  alt="work_image"
                />
                <button tw="absolute bg-white rounded-full w-9 h-9 top-4 right-4 flex justify-center items-center">
                  <svg
                    width="18"
                    height="16"
                    viewBox="0 0 18 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16.1156 1.26059C14.0836 -0.448009 10.9441 -0.191368 9.00001 1.78793C7.05586 -0.191368 3.91641 -0.451525 1.88438 1.26059C-0.759371 3.48598 -0.372652 7.1141 1.51172 9.03715L7.67813 15.3196C8.02969 15.6782 8.50079 15.8786 9.00001 15.8786C9.50274 15.8786 9.97032 15.6817 10.3219 15.3231L16.4883 9.04066C18.3691 7.11762 18.7629 3.48949 16.1156 1.26059ZM15.2859 7.85238L9.11954 14.1348C9.03516 14.2192 8.96485 14.2192 8.88047 14.1348L2.71407 7.85238C1.43086 6.54457 1.17071 4.06957 2.97071 2.55434C4.33829 1.40473 6.44766 1.57699 7.76954 2.92348L9.00001 4.17855L10.2305 2.92348C11.5594 1.56996 13.6688 1.40473 15.0293 2.55082C16.8258 4.06605 16.5586 6.55512 15.2859 7.85238Z"
                      fill="#222222"
                    />
                  </svg>
                </button>
              </div>
              <button
                tw="bg-gray-100 rounded-full w-8 h-8 flex justify-center items-center"
                onClick={() =>
                  setSelectedImage((selectedImage + 1) % workImages.length)
                }
              >
                <svg
                  width="9"
                  height="16"
                  viewBox="0 0 9 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.69917 1.00166C0.334001 1.36684 0.334001 1.9589 0.69917 2.32408L6.58358 8.20846L0.69917 14.0929C0.334001 14.458 0.334001 15.0501 0.69917 15.4153C1.06435 15.7804 1.65641 15.7804 2.02159 15.4153L8.56717 8.86966C8.93232 8.50451 8.93232 7.91242 8.56717 7.54726L2.02159 1.00166C1.65641 0.636491 1.06435 0.636491 0.69917 1.00166Z"
                    fill="#222222"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div tw="mt-12 ml-[139px] mr-[53px]">
            <p tw="text-lg">{workData.data()!["Description"]
            /*
              The girl emerges from the vessel of the mind, entwined in her own
              noodle-like hair. A forest of mushrooms casts a blanket of
              prismatic gradients. Bath is a new addition to the growing
              pantheon of characters that includes Slingshot, Maze, Descendent,
              and Woodcutter. Her appearance here marks the beginning of her
              transformation into different sculptural mediums in the future.*/}
            </p>
            <p tw="mt-10 text-2xl font-semibold">Progress Posts</p>
            <div tw="mt-8 flex h-[150px] gap-x-8">
              {progressImages.map((x, i) => (
                <button key={i} onClick={() => setPopup(true)}>
                  <Image
                    src={x.src}
                    width={150}
                    height={150}
                    alt="work_progress_post"
                  />
                </button>
              ))}
            </div>
            <p tw="my-10 text-2xl font-semibold">Comments</p>
            <div tw="flex flex-col gap-y-8">
              {comments.map((comment, i) => (
                <div key={i} tw="flex">
                  <div tw="w-[36px] h-full overflow-hidden rounded-full flex items-center">
                    <Image
                      src={comment.imgSrc}
                      alt="profile_image"
                      width="36px"
                      height="36px"
                      objectFit="cover"
                    />
                  </div>
                  <div tw="ml-[12px]">
                    <div tw="flex">
                      <div tw="text-[12px] leading-[18px] font-bold text-black">
                        {comment.user}
                      </div>
                      <div tw="text-[12px] leading-[18px] text-[#7F838B] ml-[12px]">
                        {comment.time}
                      </div>
                    </div>
                    <div tw="text-[12px] leading-[18px] text-black">
                      {comment.comment}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div tw="min-w-[428px] mr-14">
          <div tw="flex w-full">
            <div tw="flex-auto flex">
              <div tw="w-14 h-14 overflow-hidden rounded-full flex items-center">
                <Image
                  src={artistPicture}
                  alt="profile_image"
                  width="56px"
                  height="56px"
                  objectFit="cover"
                />
              </div>
              <div tw="ml-3.5 mt-1.5">
                <p tw="text-xl font-bold">{artistData?.data()?.Name}</p>
                <p tw="mt-1.5 text-xs text-gray-500">{artistData?.data()?.Location}</p>
              </div>
            </div>
            <div tw="flex-auto flex flex-row-reverse">
              <button tw="h-[40px] rounded-full font-bold text-base px-9 text-center border-soft-red bg-soft-red hover:bg-red-600 hover:border-red-600 text-white mt-1 mr-2">
                Follow
              </button>
            </div>
          </div>
          <div tw="mt-3.5 flex">
            <p tw="flex-auto text-4xl italic ml-3.5">{workData.data()!["Name"]}</p>
            <div tw="flex-auto flex flex-row-reverse">
              <p tw="font-semibold text-3xl">$1,820</p>
            </div>
          </div>
          <div tw="mt-3 ml-2 bg-red-100 rounded-3xl w-[100px] py-2 px-3 text-xs text-red-900 font-semibold">
            {workData.data()!["Type"]}
          </div>
          <div tw="mt-4 ml-3 text-xl">
            {workData.data()!["Date"]}
            <br />
            {workData.data()!["Medium"]}
            <br />
            18 x 24 inches
          </div>
          <div tw="mt-6 border border-gray-100 mx-5"></div>
          <div tw="mt-9 items-center flex flex-col gap-y-2.5">
            <button tw="w-[354px] border border-black rounded-full py-4 hover:bg-gray-100">
              Buy now
            </button>
            <button tw="w-[354px] rounded-full py-4 border-soft-red bg-soft-red hover:bg-red-600 hover:border-red-600 text-white">
              Add to cart
            </button>
          </div>
          <div tw="my-9 border border-gray-100 mx-5"></div>
          <div tw="ml-14 flex flex-col gap-y-9 text-sm text-gray-500">
            <div tw="flex">
              <p tw="flex-auto">
                Ship to{' '}
                <span tw="text-black font-semibold">United States, 75222</span>
              </p>
              <div tw="flex-auto flex flex-row-reverse">
                <a tw="underline" href="#">
                  Change Address
                </a>
              </div>
            </div>
            <div tw="flex flex-col gap-y-2">
              <p>Ready to ship</p>
              <p tw="text-black text-xl">5-7 business days</p>
            </div>
            <div tw="flex">
              <div tw="flex-auto flex flex-col gap-y-2">
                <p>Cost to ship</p>
                <p tw="text-black text-xl">$125.00</p>
              </div>
              <div tw="flex-auto flex flex-col gap-y-2">
                <p>Returns</p>
                <p tw="text-black text-xl">Accepted</p>
              </div>
            </div>
            <a tw="underline" href="#">
              Shipping and Return Policies
            </a>
          </div>
          <div tw="ml-12 mt-14 flex flex-col gap-y-3 text-gray-500">
            <p tw="font-bold text-xl mb-3">Frequently Asked Questions</p>
            <div tw="p-4 border border-gray-500 rounded-full flex">
              {/* flex-grow should just be grow, wait for twin.macro to update */}
              <p tw="flex-grow text-sm font-bold">How do I hang it?</p>
              <button tw="flex items-center">
                <svg
                  width="15"
                  height="9"
                  viewBox="0 0 15 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6871 0.273877C14.3219 -0.0912924 13.7298 -0.0912924 13.3646 0.273877L7.48026 6.15828L1.59586 0.273877C1.23071 -0.091293 0.638616 -0.091293 0.273465 0.273876C-0.0916853 0.639055 -0.0916853 1.23111 0.273465 1.59629L6.81906 8.14188C7.18421 8.50703 7.77631 8.50703 8.14146 8.14188L14.6871 1.59629C15.0522 1.23112 15.0522 0.639056 14.6871 0.273877Z"
                    fill="#8B8B8B"
                  />
                </svg>
              </button>
            </div>
            <div tw="p-4 border border-gray-500 rounded-full flex">
              {/* flex-grow should just be grow, wait for twin.macro to update */}
              <p tw="flex-grow text-sm font-bold">Do you accept commissions?</p>
              <button tw="flex items-center">
                <svg
                  width="15"
                  height="9"
                  viewBox="0 0 15 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6871 0.273877C14.3219 -0.0912924 13.7298 -0.0912924 13.3646 0.273877L7.48026 6.15828L1.59586 0.273877C1.23071 -0.091293 0.638616 -0.091293 0.273465 0.273876C-0.0916853 0.639055 -0.0916853 1.23111 0.273465 1.59629L6.81906 8.14188C7.18421 8.50703 7.77631 8.50703 8.14146 8.14188L14.6871 1.59629C15.0522 1.23112 15.0522 0.639056 14.6871 0.273877Z"
                    fill="#8B8B8B"
                  />
                </svg>
              </button>
            </div>
            <div tw="p-4 border border-gray-500 rounded-full flex">
              {/* flex-grow should just be grow, wait for twin.macro to update */}
              <p tw="flex-grow text-sm font-bold">
                Do you sell prints of this original work?
              </p>
              <button tw="flex items-center">
                <svg
                  width="15"
                  height="9"
                  viewBox="0 0 15 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6871 0.273877C14.3219 -0.0912924 13.7298 -0.0912924 13.3646 0.273877L7.48026 6.15828L1.59586 0.273877C1.23071 -0.091293 0.638616 -0.091293 0.273465 0.273876C-0.0916853 0.639055 -0.0916853 1.23111 0.273465 1.59629L6.81906 8.14188C7.18421 8.50703 7.77631 8.50703 8.14146 8.14188L14.6871 1.59629C15.0522 1.23112 15.0522 0.639056 14.6871 0.273877Z"
                    fill="#8B8B8B"
                  />
                </svg>
              </button>
            </div>
            <div tw="p-4 border border-gray-500 rounded-full flex">
              {/* flex-grow should just be grow, wait for twin.macro to update */}
              <p tw="flex-grow text-sm font-bold">Care Instructions.</p>
              <button tw="flex items-center">
                <svg
                  width="15"
                  height="9"
                  viewBox="0 0 15 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.6871 0.273877C14.3219 -0.0912924 13.7298 -0.0912924 13.3646 0.273877L7.48026 6.15828L1.59586 0.273877C1.23071 -0.091293 0.638616 -0.091293 0.273465 0.273876C-0.0916853 0.639055 -0.0916853 1.23111 0.273465 1.59629L6.81906 8.14188C7.18421 8.50703 7.77631 8.50703 8.14146 8.14188L14.6871 1.59629C15.0522 1.23112 15.0522 0.639056 14.6871 0.273877Z"
                    fill="#8B8B8B"
                  />
                </svg>
              </button>
            </div>
            <div tw="p-4 border border-gray-500 rounded-[27px]">
              <div tw="flex">
                {/* flex-grow should just be grow, wait for twin.macro to update */}
                <p tw="flex-grow text-sm font-bold">
                  Do you accept commissions?
                </p>
                <button tw="flex items-center">
                  <svg
                    width="15"
                    height="9"
                    viewBox="0 0 15 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M14.6871 0.273877C14.3219 -0.0912924 13.7298 -0.0912924 13.3646 0.273877L7.48026 6.15828L1.59586 0.273877C1.23071 -0.091293 0.638616 -0.091293 0.273465 0.273876C-0.0916853 0.639055 -0.0916853 1.23111 0.273465 1.59629L6.81906 8.14188C7.18421 8.50703 7.77631 8.50703 8.14146 8.14188L14.6871 1.59629C15.0522 1.23112 15.0522 0.639056 14.6871 0.273877Z"
                      fill="#8B8B8B"
                    />
                  </svg>
                </button>
              </div>
              <p tw="mt-3 text-sm">Yes, I&apos;m always open to commissions.</p>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </>
    )}
    </>
  );
};

export default IndividualWork;
