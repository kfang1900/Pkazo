import React, { Ref, useEffect, useRef, useState } from 'react';
import {
  useRefinementList,
  UseRefinementListProps,
} from 'react-instantsearch-hooks-web';
import 'twin.macro';
import { FiDollarSign, FiMinus, FiPlus } from 'react-icons/fi';
import tw, { styled } from 'twin.macro';

export default function CustomRefinementList(
  props: UseRefinementListProps & { title?: string }
) {
  const {
    items,
    hasExhaustiveItems,
    createURL,
    refine,
    sendEvent,
    searchForItems,
    isFromSearch,
    canRefine,
    canToggleShowMore,
    isShowingMore,
    toggleShowMore,
  } = useRefinementList(props);
  console.log('RFL', items);
  return (
    <div>

      <div tw="font-bold text-[20px] text-[#3C3C3C]">
        {props.title
          ? props.title
          : props.attribute.charAt(0).toUpperCase() +
          props.attribute.substring(1)}
      </div>
      <div tw="mt-4 flex flex-col gap-y-[10px]">
        {items.map((item, i) => (
          <div key={item.label}>
            <div className="check-group" tw="flex items-center">
              <input
                type="checkbox"
                id={`refinement-check-${props.attribute}-${item.value}`}
                name={`refinement-check-${props.attribute}`}
                checked={item.isRefined}
                tw='w-4 h-4'
                css={{ 'accent-color': '#E24E4D' }}
                onChange={(e) => refine(item.value)}
              />
              <label
                htmlFor={`refinement-check-${props.attribute}-${item.value}`}
                className="check-label"
                tw='ml-3 font-semibold text-[14px] text-[#5A5A5A]'
              >
                {item.label}
              </label>
            </div>
          </div>
        ))}

        {canToggleShowMore && (
          <li>
            <div className="show-more-button">
              {/*{loadMoreButton(*/}
              {/*  (event: any) => event,*/}
              {/*  'load-more--category'*/}
              {/*)}*/}
              <button
                onClick={() => toggleShowMore()}
                tw="-ml-4 py-2 px-5 flex gap-2 transition-all duration-300 relative z-10 rounded-full items-center hover:bg-gray-100 font-semibold"
              >
                {isShowingMore ? <FiMinus /> : <FiPlus />}{' '}
                <span>Show {isShowingMore ? 'Fewer' : 'More'}</span>
              </button>
            </div>
          </li>
        )}
      </div>
    </div>
  );
}
