import React, { Ref, useEffect, useRef, useState } from 'react';
import {
  useRefinementList,
  UseRefinementListProps,
} from 'react-instantsearch-hooks-web';
import 'twin.macro';
import { FiDollarSign, FiMinus, FiPlus } from 'react-icons/fi';
import tw, { styled } from 'twin.macro';
const ListCheckGroup = styled.ul`
  .check-group input[type='radio'],
  .check-group input[type='checkbox'] {
    ${tw`hidden`}
  }
  .check-group input[type='radio']:checked + label:before,
  .check-group input[type='checkbox']:checked + label:before {
    ${tw`bg-[#C4C4C4]`}
  }
  .check-group label {
    position: relative;
    padding-left: 30px;
    cursor: pointer;
    line-height: 2;
  }
  .check-group label:before {
    ${tw`inline-block min-h-[1em] w-[1em]`}
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 30em;
    border: 2px solid #c4c4c4;
  }
  .check-group label.color-check:before {
    background: var(--checkbg) !important;
    border: 0;
  }
  .check-group input:checked + label.color-check:after {
    --check-after-size: 6px;
    content: '';
    position: absolute;
    width: var(--check-after-size);
    height: var(--check-after-size);
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 30em;
    ${/*background: theme('colors.white');*/ tw`bg-white`}
  }
`;

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
    <li>
      <h3 tw="mb-3 font-bold text-lg">
        {props.title
          ? props.title
          : props.attribute.charAt(0).toUpperCase() +
            props.attribute.substring(1)}
      </h3>
      <ul tw="mb-5">
        {items.map((item, i) => (
          <li key={item.label}>
            <div className="check-group">
              <input
                type="checkbox"
                tw={'mr-3'}
                id={`refinement-check-${props.attribute}-${item.value}`}
                name={`refinement-check-${props.attribute}-${item.value}`}
                checked={item.isRefined}
                onChange={(e) => refine(item.value)}
              />
              <label
                htmlFor={`refinement-check-${props.attribute}-${item.value}`}
                className="check-label"
              >
                {item.label}
              </label>
            </div>
          </li>
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
      </ul>
    </li>
  );
}
