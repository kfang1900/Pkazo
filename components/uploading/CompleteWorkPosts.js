import tw, { css } from 'twin.macro';

import { useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import Link from 'next/link';

const fileTypes = ['JPEG', 'PNG', 'GIF'];

function ImageSelector(props) {
  return (
    <div tw="h-auto ">
      <img src={props.src} alt="post" tw="w-full h-full object-cover" />
    </div>
  );
}

function ImageSelector2(props) {
  return (
    <div tw="h-[120px] rounded-md relative overflow-hidden cursor-pointer flex items-center justify-center">
      <img
        src={props.src}
        alt="post"
        tw="w-full h-full absolute top-0 left-0 object-cover"
      />
      {props.selected && (
        <>
          <div tw="w-full h-full absolute top-0 left-0 z-[5] bg-[#00000081]"></div>
          <i className="far fa-check" tw="z-10 text-white text-4xl"></i>
        </>
      )}
    </div>
  );
}

const modalStyle = css`
  transform: translate(-50%, -50%);
  width: calc(100% - 100px);
  height: calc(100% - 100px);
  grid-template-columns: 400px 1fr;
`;
const modalInvis = css`
  ${tw`opacity-0 invisible`}
`;
const modalVis = css`
  ${tw`opacity-100 visible`}
`;

const CompleteWorkPosts = () => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const [modal, setmodal] = useState(modalInvis);

  return (
    <>
      <div tw="text-2xl max-w-[1000px] px-[40px]  leading-[1.5] mx-auto text-center opacity-80 mt-20 font-bold">
        Attach in progress posts of the same work to this completed work. <br />
        <span tw="font-normal text-xl">(Select a maximum of 8 posts)</span>
      </div>

      <div
        tw="max-w-[1100px] px-[40px] mx-auto  mt-24 mb-10"
        onClick={() => setmodal(modalVis)}
      >
        <div tw="text-xl opacity-80 mb-5">Select from Existing Posts</div>

        <div tw="grid grid-cols-3 lg:grid-cols-5 gap-5 cursor-pointer">
          <ImageSelector src="/assets/images/image1.svg" />
          <ImageSelector src="/assets/images/image2.svg" />
          <ImageSelector src="/assets/images/image3.svg" />
          <ImageSelector src="/assets/images/image4.svg" />
          <ImageSelector src="/assets/images/image5.svg" />
          <ImageSelector src="/assets/images/image6.svg" />
          <ImageSelector src="/assets/images/image7.svg" />
          <ImageSelector src="/assets/images/image8.svg" />
          <ImageSelector src="/assets/images/image9.svg" />
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

      <div tw="px-[40px] flex items-center text-white text-lg justify-start mb-20 mt-20">
        <Link href="/complete-post" passHref>
          <div tw="py-4 px-16 mx-auto my-0 rounded-full bg-[#E24E4D] hover:bg-[#be4040]">
            Post Completed Work
          </div>
        </Link>
      </div>

      {/* POPUP */}

      <div
        onClick={() => setmodal(modalInvis)}
        css={[
          tw`bg-[#000000a1] transform -translate-x-1/2 -translate-y-1/2 w-screen fixed top-1/2 transition left-1/2  h-screen`,
          modal,
        ]}
      ></div>

      <div
        css={[
          tw`max-w-[1500px] px-10 py-10 grid gap-7 rounded-lg fixed transition top-1/2 left-1/2 bg-white z-10 max-h-[800px] h-screen`,
          modalStyle,
          modal,
        ]}
      >
        <div tw="">
          <div tw="rounded-full relative mx-auto h-[200px] w-[200px] overflow-hidden flex items-center justify-center flex-col gap-5">
            <img
              src="/images/image1.svg"
              tw="w-full h-full absolute top-0 left-0 object-cover"
            />
            <div tw="w-full h-full absolute top-0 left-0 z-[5] bg-[#00000081]"></div>
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
            <ImageSelector2 src="/assets/images/image1.svg" selected />
            <ImageSelector2 src="/assets/images/image2.svg" selected />
            <ImageSelector2 src="/assets/images/image3.svg" selected />
            <ImageSelector2 src="/assets/images/image4.svg" />
            <ImageSelector2 src="/assets/images/image5.svg" />
            <ImageSelector2 src="/assets/images/image6.svg" />
            <ImageSelector2 src="/assets/images/image7.svg" />
            <ImageSelector2 src="/assets/images/image8.svg" />
            <ImageSelector2 src="/assets/images/image9.svg" />
          </div>

          <div tw=" w-full mt-10 mb-6 ">
            {/* REMOVED modalUpload class*/}
            <FileUploader
              multiple={true}
              handleChange={handleChange}
              name="file"
              types={fileTypes}
            />
          </div>

          <i
            onClick={() => setmodal(modalInvis)}
            className="fa fa-times"
            tw="absolute cursor-pointer top-[20px] right-[30px] text-3xl text-gray-300"
          ></i>

          <div tw="absolute bottom-5 right-7 flex items-center justify-end gap-5">
            <button
              onClick={() => setmodal(modalInvis)}
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

export default CompleteWorkPosts;
