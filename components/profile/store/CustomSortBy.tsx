import { useSortBy, UseSortByProps } from 'react-instantsearch-hooks-web';
import { BsChevronCompactDown } from 'react-icons/bs';
import React, { useEffect, useRef, useState } from 'react';
import useClickOutsideEffect from '../../../utils/hooks/useOutsideClickEffect';
import tw from 'twin.macro';
import Dropdown from 'styles/Dropdown';
export default function CustomSortBy() {
  const { initialIndex, currentRefinement, options, refine, hasNoResults } =
    useSortBy({
      items: [
        { label: 'Relevancy', value: 'pkazo-works' },
        { label: 'Lowest Price', value: 'pkazo-works-priceasc' },
        { label: 'Highest Price', value: 'pkazo-works-pricedesc' },
        { label: 'Most Recent', value: 'pkazo-works-recencydesc' },
      ],
    });
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useClickOutsideEffect(() => setShowDropdown(false));
  return (
    <Dropdown
      onChange={(event) => refine(event.target.value)}
      appearance={tw`appearance-none border border-[#D8D8D8] rounded-[40px] pl-5 w-[160px] h-11 outline-none focus:border-[#A2A2A2] text-[#3C3C3C]`}>
      {options.map(({ label, value }) => <option value={value} key={value}>{label}</option>)}
    </Dropdown>
    // <>
    //   <div tw="relative">
    //     <button
    //       onClick={() => setShowDropdown((s) => !s)}
    //       tw="border border-gray-200 rounded-xl flex items-center cursor-pointer gap-4 py-2 px-6"
    //     >
    //       <span tw="whitespace-nowrap">
    //         Sort:{' '}
    //         <strong>
    //           {
    //             (
    //               options.find((o) => o.value === currentRefinement) || {
    //                 label: 'Relevancy',
    //               }
    //             ).label
    //           }
    //         </strong>
    //       </span>
    //       <BsChevronCompactDown tw="text-gray-400" />
    //     </button>
    //     {showDropdown && (
    //       <ul
    //         tw="bg-white rounded-b-xl border-b border-l border-r border-gray-200 z-40 left-0 right-0 absolute top-9"
    //         ref={dropdownRef}
    //       >
    //         {options.map(({ label, value }) => (
    //           <li key={value} tw={'w-full'}>
    //             <button
    //               onClick={() => {
    //                 refine(value);
    //                 setShowDropdown(false);
    //               }}
    //               tw="block px-6 py-2 leading-10 hover:bg-gray-100 text-base leading-3 w-full text-left"
    //             >
    //               {label}
    //             </button>
    //           </li>
    //         ))}
    //       </ul>
    //     )}
    //   </div>
    // </>
  );
}
