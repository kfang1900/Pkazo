import React, { Ref, useEffect, useRef, useState } from 'react';
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks-web';
import tw from 'twin.macro';
import { useMediaQuery } from 'react-responsive';

export default function CustomSearch(props: UseSearchBoxProps) {
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
  const { query, refine } = useSearchBox(props);
  const [value, setValue] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  // Track when the value coming from the React state changes to synchronize
  // it with InstantSearch.
  useEffect(() => {
    if (query !== value) {
      refine(value);
    }
  }, [value, refine]);

  // Track when the InstantSearch query changes to synchronize it with
  // the React state.
  useEffect(() => {
    // We bypass the state update if the input is focused to avoid concurrent
    // updates when typing.
    if (inputRef.current !== document.activeElement && query !== value) {
      setValue(query);
    }
  }, [query]);

  return (
    <div tw='flex-1'>
      <div
        tw="relative flex items-center border border-[#D8D8D8] focus-within:border-[#A2A2A2] w-full"
        css={[isMobile ? tw`px-3 rounded-[24px] h-8` : tw`px-6 rounded-[35px] h-11`]}
      >
        <img src='/assets/svgs/search.svg' />
        <input
          value={value}
          ref={inputRef}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          tw="pl-2 md:pl-4 outline-none shadow-none w-full text-[12px] md:text-[16px] "
          placeholder="Search"
        />
      </div>
    </div>
  );
}
