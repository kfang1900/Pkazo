import React from 'react';
import tw, { styled, TwStyle } from 'twin.macro';

interface DropdownProps {
  children: any;
  onChange: (event: any) => void;
  appearance: TwStyle;
  triangle?: boolean;
}
const Dropdown = (props: DropdownProps) => {
  return (
    <div tw="relative">
      <select
        onChange={props.onChange}
        css={[
          tw`border border-[#D8D8D8] bg-white pl-5 appearance-none outline-none`,
          props.appearance,
        ]}
      >
        {props.children}
      </select>
      <button
        tw="pointer-events-none absolute top-1/2 -translate-y-1/2 transform"
        css={[props.triangle ? tw`right-3` : tw`right-4`]}
      >
        {props.triangle ?
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.462769 0.166992H9.50119L4.9906 5.83287L0.462769 0.166992Z"
              fill="#757575" />
          </svg>
          :
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
        }
      </button>
    </div>
  );
};
export default Dropdown;
