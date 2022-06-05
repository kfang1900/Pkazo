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
