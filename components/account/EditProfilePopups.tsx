import tw from 'twin.macro';
import Image from 'next/image';
import Dropdown from 'styles/Dropdown'
import buttons from 'styles/Button'

const EditProfilePopup = (
    { onSave, onClose, type }: {
        onSave: () => void;
        onClose: () => void;
        type: number; // either 0, 1, or 2
    }
) => {
    const popups = [
        {
            title: 'education',
            fields: ['School', 'Field of study'],
            dateRange: true
        },
        {
            title: 'experience',
            fields: ['Company name', 'Title'],
            dateRange: true
        },
        {
            title: 'exhibition',
            fields: ['Exhibition'],
            dateRange: false
        }
    ]
    return <div tw='fixed top-0 left-0 w-full h-full z-50 bg-black/40 flex items-center justify-center overflow-auto md:p-[50px]'>
        <style>
            {`body {overflow: hidden}`}
        </style>
        <div tw='flex w-full justify-center'>
            <div tw='bg-white w-[540px] rounded-[20px] px-9 pt-9 pb-6'>
                <div tw='text-[20px] text-black font-semibold'>
                    Add {popups[type].title}
                </div>
                <div tw='mt-6 text-[16px] text-[#3C3C3C] font-semibold flex flex-col gap-y-9'>
                    {popups[type].fields.map((field, i) => (
                        <div key={i}>
                            <div>{field}</div>
                            <input tw='mt-1 w-full rounded-[6px] border border-[#D8D8D8] outline-none focus:border-[#888888] px-4 h-10' />
                        </div>
                    ))}
                    <div>
                        <div>Time period</div>
                        <div tw='flex gap-x-5 mt-1 items-center'>
                            <Dropdown
                                onChange={(e) => 0}
                                appearance={tw`pl-4 py-2 text-[16px] rounded-[6px] w-[114px]`}
                            >
                                {[...Array(100)].map((_, i) => (
                                    <option key={i}>{(new Date()).getFullYear() - i}</option>
                                ))}
                            </Dropdown>
                            {popups[type].dateRange &&
                                <>
                                    <div tw='text-[16px] text-[#838383] font-normal'>To</div>
                                    <Dropdown
                                        onChange={(e) => 0}
                                        appearance={tw`pl-4 py-2 text-[16px] rounded-[6px] w-[114px]`}
                                    >
                                        {[...Array(100)].map((_, i) => (
                                            <option key={i}>{(new Date()).getFullYear() - i}</option>
                                        ))}
                                    </Dropdown>
                                </>
                            }
                        </div>
                    </div>
                </div>
                <div tw='mt-6 flex justify-end'>
                    <button
                        css={[
                            buttons.red,
                            tw`text-[14px] px-7 h-9`
                        ]}
                        onClick={() => { onSave(); onClose(); }}
                    >
                        Save
                    </button>
                </div>
            </div>
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
export default EditProfilePopup;