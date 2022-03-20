// This file should not be used anywhere !!

import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import Link from 'next/link';

const fileTypes = ['JPEG', 'PNG', 'GIF'];

const Main = () => {
  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: File) => {
    setFile(file);
  };

  const [modal, setmodal] = useState('opacity-0 invisible');

  return (
    <>
      <div tw="flex items-center justify-between gap-10 px-[40px] max-w-[1250px] my-6 mx-auto">
        <div tw="flex items-center gap-1 opacity-75 cursor-pointer ">
          <i tw="far fa-angle-left text-2xl"></i>
          <span>Back</span>
        </div>

        <Link href="/complete-post">
          <div tw="flex items-center gap-1 opacity-75 cursor-pointer ">
            <span>Skip</span>
            <i tw="far fa-angle-right text-2xl"></i>
          </div>
        </Link>
      </div>

      <div tw="grid grid-cols-3  px-[40px] max-w-[1000px] my-6 mx-auto">
        <div tw="bg-gray-300 h-[3px]"></div>
        <div tw="bg-[#E24E4D] h-[3px]"></div>
        <div tw="bg-gray-300 h-[3px]"></div>
      </div>

      <div tw="grid grid-cols-3  px-[40px] max-w-[1000px] my-6 mx-auto">
        <div tw="flex items-center justify-center leading-[0.4] opacity-85">
          Work Information
        </div>
        <div tw="flex items-center justify-center leading-[0.4] opacity-85">
          In Progress Posts
        </div>
        <div tw="flex items-center justify-center leading-[0.4] opacity-85">
          Include In Portfolios
        </div>
      </div>

      <div tw="text-2xl max-w-[1000px] px-[40px]  leading-[1.5] mx-auto text-center opacity-80 mt-20 font-bold">
        Attach in progress posts of the same work to this completed work. <br />
        <span tw="font-normal text-xl">(Select a maximum of 8 posts)</span>
      </div>

      <div
        tw="max-w-[1100px] px-[40px] mx-auto  mt-24 mb-10"
        onClick={() => setmodal('opacity-100 visible')}
      >
        <div tw="text-xl opacity-80 mb-5">Select from Existing Posts</div>

        <div tw="grid grid-cols-3 lg:grid-cols-5 gap-5 cursor-pointer">
          <div tw="h-auto ">
            <img
              src="/images/image1.svg"
              alt="post"
              tw="w-full h-full object-cover position-center"
            />
          </div>

          <div tw="h-auto ">
            <img
              src="/images/image2.svg"
              alt="post"
              tw="w-full h-full object-cover position-center"
            />
          </div>

          <div tw="h-auto ">
            <img
              src="/images/image3.svg"
              alt="post"
              tw="w-full h-full object-cover position-center"
            />
          </div>

          <div tw="h-auto ">
            <img
              src="/images/image4.svg"
              alt="post"
              tw="w-full h-full object-cover position-center"
            />
          </div>

          <div tw="h-auto ">
            <img
              src="/images/image5.svg"
              alt="post"
              tw="w-full h-full object-cover position-center"
            />
          </div>

          <div tw="h-auto ">
            <img
              src="/images/image6.svg"
              alt="post"
              tw="w-full h-full object-cover position-center"
            />
          </div>

          <div tw="h-auto ">
            <img
              src="/images/image7.svg"
              alt="post"
              tw="w-full h-full object-cover position-center"
            />
          </div>

          <div tw="h-auto ">
            <img
              src="/images/image8.svg"
              alt="post"
              tw="w-full h-full object-cover position-center"
            />
          </div>

          <div tw="h-auto ">
            <img
              src="/images/image9.svg"
              alt="post"
              tw="w-full h-full object-cover position-center"
            />
          </div>
        </div>
      </div>

      <div tw="flex items-center justify-center  px-[40px] max-w-[1000px] mt-20 mb-6 mx-auto ">
        <FileUploader
          multiple={true}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
        />
      </div>

      <div tw="px-[40px] flex items-center text-white text-lg next-link justify-start mb-20 mt-20">
        <Link href="/complete-post">Next</Link>
      </div>

      {/* POPUP */}

      <div
        onClick={() => setmodal('opacity-0 invisible')}
        tw={`modalParent w-screen fixed top-1/2 transition left-1/2  h-screen ${modal}`}
      ></div>

      <div
        tw={`max-w-[1500px] px-10 py-10 grid gap-7  modal rounded-lg fixed transition top-1/2 left-1/2 bg-white z-10 max-h-[800px] h-screen ${modal}`}
      >
        <div tw="">
          <div tw="rounded-full relative mx-auto h-[200px] w-[200px] overflow-hidden flex items-center justify-center flex-col gap-5">
            <img
              src="/images/image1.svg"
              tw="w-full h-full absolute top-0 left-0 object-cover position-center"
            />
            <div tw="w-full h-full absolute top-0 left-0 z-5 blackOverlayPorfile"></div>
            <button tw="w-32 py-[5px] rounded text-white font-bold z-10 border-2 border-white">
              Replace
            </button>
            <button tw="w-32 py-[5px] rounded text-white font-bold z-10 border-2 border-white">
              Delete
            </button>
          </div>

          <div tw="mt-10">
            <input
              type="text"
              tw="w-full py-2 rounded outline-none px-3 border border-gray-300 mb-5"
              placeholder="Title"
            />
            <textarea
              tw="w-full h-[150px] py-2 rounded outline-none px-3 border border-gray-300 resize-none"
              placeholder="Write a description..."
            ></textarea>
          </div>
        </div>

        <div tw="h-full ">
          <div tw="opacity-80 font-bold mb-4 text-[19px]">
            Select the pieces that you would like in this portfolio
          </div>
          <div tw="grid  gap-5 grid-cols-5 mb-10">
            <div tw="h-[120px] rounded-md relative overflow-hidden cursor-pointer flex items-center justify-center">
              <img
                src="/images/image1.svg"
                alt="post"
                tw="w-full h-full absolute top-0 left-0 object-cover position-center"
              />
              <div tw="w-full h-full absolute top-0 left-0 z-5 blackOverlayPorfile"></div>
              <i tw="far fa-check z-10 text-white text-4xl"></i>
            </div>

            <div tw="h-[120px] rounded-md relative overflow-hidden cursor-pointer flex items-center justify-center">
              <img
                src="/images/image2.svg"
                alt="post"
                tw="w-full h-full absolute top-0 left-0 object-cover position-center"
              />
              <div tw="w-full h-full absolute top-0 left-0 z-5 blackOverlayPorfile"></div>
              <i tw="far fa-check z-10 text-white text-4xl"></i>
            </div>

            <div tw="h-[120px] rounded-md relative overflow-hidden cursor-pointer flex items-center justify-center">
              <img
                src="/images/image3.svg"
                alt="post"
                tw="w-full h-full absolute top-0 left-0 object-cover position-center"
              />
              <div tw="w-full h-full absolute top-0 left-0 z-5 blackOverlayPorfile"></div>
              <i tw="far fa-check z-10 text-white text-4xl"></i>
            </div>

            <div tw="h-[120px] rounded-md relative overflow-hidden cursor-pointer flex items-center justify-center">
              <img
                src="/images/image4.svg"
                alt="post"
                tw="w-full h-full absolute top-0 left-0 object-cover position-center"
              />
            </div>

            <div tw="h-[120px] rounded-md relative overflow-hidden cursor-pointer flex items-center justify-center">
              <img
                src="/images/image5.svg"
                alt="post"
                tw="w-full h-full absolute top-0 left-0 object-cover position-center"
              />
            </div>

            <div tw="h-[120px] rounded-md relative overflow-hidden cursor-pointer flex items-center justify-center">
              <img
                src="/images/image6.svg"
                alt="post"
                tw="w-full h-full absolute top-0 left-0 object-cover position-center"
              />
            </div>

            <div tw="h-[120px] rounded-md relative overflow-hidden cursor-pointer flex items-center justify-center">
              <img
                src="/images/image7.svg"
                alt="post"
                tw="w-full h-full absolute top-0 left-0 object-cover position-center"
              />
            </div>

            <div tw="h-[120px] rounded-md relative overflow-hidden cursor-pointer flex items-center justify-center">
              <img
                src="/images/image8.svg"
                alt="post"
                tw="w-full h-full absolute top-0 left-0 object-cover position-center"
              />
            </div>

            <div tw="h-[120px] rounded-md relative overflow-hidden cursor-pointer flex items-center justify-center">
              <img
                src="/images/image9.svg"
                alt="post"
                tw="w-full h-full absolute top-0 left-0 object-cover position-center"
              />
            </div>
          </div>

          <div tw=" w-full modalUpload mt-10 mb-6 ">
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
          </div>

          <i
            onClick={() => setmodal('opacity-0 invisible')}
            tw="far fa-times absolute cursor-pointer top-[20px] right-[30px] text-3xl text-gray-300"
          ></i>

          <div tw="modalButtons flex items-center justify-end gap-5">
            <button
              onClick={() => setmodal('opacity-0 invisible')}
              tw="border-2 border-[#E24E4D] px-7 py-2 rounded-full font-bold text-[#E24E4D]"
            >
              Cancel
            </button>
            <button tw="bg-[#E24E4D] border-2 border-[#E24E4D] px-7 py-2 rounded-full font-bold text-white transition hover:bg-[#be4040] hover:border-[#be4040]">
              Save
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
