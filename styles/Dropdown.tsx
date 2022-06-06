import React from 'react';
import tw, { styled, TwStyle } from 'twin.macro';

interface DropdownProps {
    children: JSX.Element[];
    look: TwStyle;
}
const Dropdown = (props: DropdownProps) => {
    return <div tw='relative'>
        <select
            css={[props.look, tw`border border-[#D8D8D8] pl-4 appearance-none focus:outline-none focus:border-[#888888] text-[14px] text-[#838383]`]}
        >
            {props.children}
        </select>
        <button tw="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 transform">
            <svg
                width="14"
                height="9"
                viewBox="0 0 14 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M6.73757 6.17509L1.26509 0.705078L0.205078 1.76609L6.73807 8.29609L13.2651 1.76605L12.2046 0.705547L6.73757 6.17509Z"
                    fill="#8E8E93"
                />
            </svg>
        </button>
    </div>
}
export default Dropdown;