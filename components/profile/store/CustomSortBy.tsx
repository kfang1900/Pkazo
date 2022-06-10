import { useSortBy, UseSortByProps } from 'react-instantsearch-hooks-web';
import { BsChevronCompactDown } from 'react-icons/bs';
import React, { useEffect, useRef, useState } from 'react';
import useClickOutsideEffect from '../../../utils/hooks/useOutsideClickEffect';
import tw from 'twin.macro';
import Dropdown from 'styles/Dropdown';
import { useMediaQuery } from 'react-responsive';

export default function CustomSortBy() {
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
  const { initialIndex, currentRefinement, options, refine, hasNoResults } =
    useSortBy({
      items: [
        { label: 'Relevancy', value: 'pkazo-works' },
        { label: 'Lowest Price', value: 'pkazo-works-priceasc' },
        { label: 'Highest Price', value: 'pkazo-works-pricedesc' },
        { label: 'Most Recent', value: 'pkazo-works-recencydesc' },
      ],
    });
  return (isMobile ?
    <div tw='relative'>
      <select
        onChange={(event) => refine(event.target.value)}
        tw='appearance-none border border-[#D8D8D8] rounded-full outline-none focus:border-[#A2A2A2] w-8 h-8 pl-2'
      >
        {options.map(({ label, value }) => <option value={value} key={value}>{label}</option>)}
      </select>
      <div tw='pointer-events-none absolute left-[1px] top-[1px] bg-white rounded-full w-[30px] h-[30px]' />
      <button tw='pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <img src='/assets/svgs/sortby.svg' />
      </button>
    </div> :
    <Dropdown
      onChange={(event) => refine(event.target.value)}
      appearance={tw`appearance-none border border-[#D8D8D8] rounded-[40px] pl-5 w-[160px] h-11 outline-none focus:border-[#A2A2A2] text-[#3C3C3C]`}
    >
      {options.map(({ label, value }) => <option value={value} key={value}>{label}</option>)}
    </Dropdown>
  );
}
