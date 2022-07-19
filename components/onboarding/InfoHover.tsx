import { useState } from 'react';
import 'twin.macro';

const InfoHover = (props: { text: string }) => {
    const [showText, setShowText] = useState(false);
    return <div tw='relative flex items-center'>
        <div
            tw='cursor-pointer'
            onMouseOver={() => setShowText(true)}
            onMouseOut={() => setShowText(false)}
        >
            <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 0.15625C4.47768 0.15625 0 4.63393 0 10.1563C0 15.6786 4.47768 20.1563 10 20.1563C15.5223 20.1563 20 15.6786 20 10.1563C20 4.63393 15.5223 0.15625 10 0.15625ZM10 15.9598C9.5067 15.9598 9.10714 15.5603 9.10714 15.067C9.10714 14.5737 9.5067 14.1741 10 14.1741C10.4933 14.1741 10.8929 14.5737 10.8929 15.067C10.8929 15.5603 10.4933 15.9598 10 15.9598ZM11.404 11.0603C10.9911 11.2188 10.7143 11.6205 10.7143 12.0603V12.567C10.7143 12.6652 10.6339 12.7455 10.5357 12.7455H9.46429C9.36607 12.7455 9.28571 12.6652 9.28571 12.567V12.0871C9.28571 11.5714 9.43527 11.0625 9.72991 10.6384C10.0179 10.2232 10.4196 9.90625 10.8929 9.72545C11.6518 9.43304 12.1429 8.79688 12.1429 8.10268C12.1429 7.1183 11.1808 6.31696 10 6.31696C8.8192 6.31696 7.85714 7.1183 7.85714 8.10268V8.27232C7.85714 8.37054 7.77679 8.45089 7.67857 8.45089H6.60714C6.50893 8.45089 6.42857 8.37054 6.42857 8.27232V8.10268C6.42857 7.22545 6.8125 6.40625 7.50893 5.79688C8.17857 5.20982 9.0625 4.88839 10 4.88839C10.9375 4.88839 11.8214 5.21205 12.4911 5.79688C13.1875 6.40625 13.5714 7.22545 13.5714 8.10268C13.5714 9.39286 12.721 10.5536 11.404 11.0603Z" fill="#CACACA" />
            </svg>
        </div>
        {showText &&
            <div tw='absolute -top-4 -bottom-4 left-5 flex items-center pl-3'>
                <div tw='w-0 h-0 border-l-0 border-r-[12px] border-r-[#F1F1F1] border-t-[10px] border-b-[10px] border-t-transparent border-b-transparent' />
                <div tw='w-[300px] bg-[#F1F1F1] py-4 px-6 rounded-[16px] text-[14px] text-[#3C3C3C]'>
                    {props.text}
                </div>
            </div>
        }
    </div>
}

export default InfoHover;