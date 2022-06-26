import tw from 'twin.macro';
import Image from 'next/image';

const EditProfilePopup = (
    { onClose }: {
        onClose: () => void;
    }
) => {
    <div tw='fixed top-0 left-0 w-full h-full z-50 bg-black/40 flex items-start justify-center overflow-auto md:p-[50px]'>
        <div tw='flex w-full justify-center'>
            <button
                onClick={onClose}
                tw="flex-shrink-0 ml-5 w-11 h-11 border-0 outline-none bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] rounded-full flex items-center justify-center"
                type='button'
            >
                <Image
                    src="/assets/svgs/close.svg"
                    width='16px'
                    height='16px'
                    alt="close button"
                />
            </button>
        </div>
    </div>
}