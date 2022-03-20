import { MouseEventHandler, ReactNode } from 'react';
import Image from 'next/image';
import crossIcon from 'public/assets/svgs/close.svg';
import tw from 'twin.macro';

const Modal = (props: {
  open: boolean;
  onClose: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
}) => {
  return (
    <>
      <div
        css={[
          props.open ? '' : tw`hidden`,
          tw`flex w-full h-full lg:h-screen lg:overflow-y-auto p-6 lg:p-10 items-center justify-center bg-black bg-opacity-70`,
        ]}
      >
        <div tw="relative flex max-w-7xl w-full h-full p-3 md:p-5 lg:p-7 bg-white rounded-lg lg:rounded-2xl">
          <button
            onClick={props.onClose}
            tw="absolute h-6 w-6 lg:h-auto lg:w-auto -top-2 lg:top-0 -right-2.5 lg:-right-10 border-1.5 border-transparent bg-black lg:bg-transparent text-white hover:border-white rounded-full p-1 lg:p-1.5"
          >
            <Image src={crossIcon} alt="" />
          </button>
          {props.children}
        </div>
      </div>
    </>
  );
};
export default Modal;
