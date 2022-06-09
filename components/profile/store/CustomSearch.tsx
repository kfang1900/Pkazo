import { FiSearch } from 'react-icons/fi';
import React, { Ref, useEffect, useRef, useState } from 'react';
import { useSearchBox, UseSearchBoxProps } from 'react-instantsearch-hooks-web';
import 'twin.macro';

export default function CustomSearch(props: UseSearchBoxProps) {
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
    <div tw='flex-grow'>
      <div tw="relative px-4 flex items-center border border-[#D8D8D8] focus-within:border-[#A2A2A2] rounded-full w-full h-11">
        <FiSearch tw="text-gray-400" />
        <input
          value={value}
          ref={inputRef}
          onChange={(e) => setValue(e.target.value)}
          type="text"
          tw="py-2 px-4 outline-none shadow-none w-full"
          placeholder="Search name, description, medium, anything ..."
        />
      </div>
    </div>
  );
}
