import { MouseEventHandler, ReactNode } from 'react';
import Image from 'next/image';
import crossIcon from 'public/assets/svgs/close.svg';
import tw from 'twin.macro';

const Modal = ({
  open,
  onClose,
  children,
  small,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  small?: boolean;
}) => {
  return (
    <>
      <div
        css={[
          open ? '' : tw`hidden`,
          tw`fixed top-0 left-0 z-50 flex p-4 lg:p-10 items-center justify-center bg-black bg-opacity-70`,
          tw`w-full h-full lg:h-screen lg:overflow-y-auto`,
        ]}
      >
        <div
          css={[
            tw`relative flex p-8 bg-white rounded-lg lg:rounded-2xl`,
            small ? 'w-[40vw] h-[50vh]' : tw`min-h-full w-full`,
          ]}
        >
          <button
            onClick={() => onClose()}
            tw="absolute h-6 w-6 lg:h-auto lg:w-auto -top-2 lg:top-0 -right-2.5 lg:-right-9 border-1.5 border-transparent bg-black lg:bg-transparent text-white hover:border-white rounded-full p-1 lg:p-1.5"
          >
            <div tw="transform w-4 h-4">
              <Image src={crossIcon} alt="close" layout="fill" />
            </div>
          </button>
          {children}
        </div>
      </div>
    </>
  );
};
export default Modal;
