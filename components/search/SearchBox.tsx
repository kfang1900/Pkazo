import React, { useState } from 'react';
import Link from 'next/link';

import algoliasearch from 'algoliasearch/lite';
import {
  AutocompleteState,
  createAutocomplete,
} from '@algolia/autocomplete-core';
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia';
import tw from 'twin.macro';
import Image from 'next/image';
import {
  ArtistData,
  ArtistRecord,
  WorkData,
  WorkRecord,
} from '../../types/dbTypes';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import FirebaseStorageImage from '../shared/FirebaseStorageImage';

const searchClient = algoliasearch(
  'C7MS0BD8WG',
  '6a66c7b3a0c0cf3d52edb60146226383'
);

/**
 * Returns the index of the last character in the longest prefix that is the same for both strings.
 * @param a
 * @param b
 */
function getMatchingPrefixIndex(aa: string, bb: string): number {
  const a = aa.toLowerCase();
  const b = bb.toLowerCase();

  if (a.charAt(0) !== b.charAt(0)) {
    return -1;
  }
  let i = 0;
  while (i < a.length && i < b.length && a.charAt(i) === b.charAt(i)) {
    i++;
  }
  console.log(i);
  return i;
}

export default function SearchBox() {
  // (1) Create a React state.
  const [autocompleteState, setAutocompleteState] = React.useState<
    AutocompleteState<WorkRecord | ArtistRecord>
  >({} as any);
  const autocomplete = React.useMemo(
    () =>
      createAutocomplete<WorkRecord | ArtistRecord>({
        onStateChange({ state }) {
          // (2) Synchronize the Autocomplete state with the React state.
          setAutocompleteState(state);
        },

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getSources() {
          return [
            // (3) Use an Algolia index source.
            {
              sourceId: 'Works',
              getItemInputValue({ work }: { work?: WorkRecord }) {
                return work?.title || '';
              },
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 'pkazo-works',
                      query,
                      params: {
                        hitsPerPage: 6,
                        highlightPreTag: '<mark>',
                        highlightPostTag: '</mark>',
                      },
                    },
                  ],
                });
              },
              getItemUrl({ work }: { work?: WorkRecord }) {
                return work?.id ? `/work/${work.id}` : '';
              },
            },
            {
              sourceId: 'Artists',
              getItemInputValue({ artist }: { artist?: ArtistRecord }) {
                return artist?.name || '';
              },
              getItems({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 'pkazo-artists',
                      query,
                      params: {
                        hitsPerPage: 3,
                        highlightPreTag: '<mark>',
                        highlightPostTag: '</mark>',
                      },
                    },
                  ],
                });
              },
              getItemUrl({ artist }: { artist?: ArtistRecord }) {
                return artist?.username ? `/${artist.username}` : '';
              },
            },
          ];
        },
      }),
    []
  );
  // to build manual index:
  // React.useEffect(() => {
  //   (async () => {
  //     const db = getFirestore();
  //     const qs = await getDocs(collection(db, 'artists'));
  //     console.log(
  //       qs.docs.map((doc) => ({
  //         ...doc.data(),
  //         id: doc.id,
  //         objectID: doc.id,
  //       }))
  //     );
  //   })();
  // }, []);

  // <div>
  //   <input
  //     onFocus={() => setOnSearch(true)}
  //     onBlur={() => setOnSearch(false)}
  //     type="text"
  //     placeholder="Search for anything"
  //   />
  // </div>;
  // // ...

  return (
    <div
      className="aa-Autocomplete"
      tw="pl-6 pr-5 rounded-[48px] h-10 bg-[#F5F5F5] border border-[#AAAAAA] focus-within:border-[#838383] focus-within:bg-white outline-none flex items-center"
      {...autocomplete.getRootProps({})}
    >
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*
      // @ts-ignore */}
      <input
        className="aa-Input"
        tw="w-full bg-transparent outline-none text-[16px]"
        {...autocomplete.getInputProps({} as any)}
      />
      <img src="/assets/svgs/search.svg" tw="ml-3 w-[18px] h-[18px]" />
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*
      // @ts-ignore */}
      <div
        tw={' left-0 top-0'}
        className="aa-Panel"
        {...autocomplete.getPanelProps({})}
      >
        {autocompleteState.isOpen && (
          <div tw="absolute w-full left-0 top-14 bg-white rounded-[8px] pt-6 pb-4 shadow-md z-50">
            {autocompleteState.collections.map((collection, index) => {
              const { source, items } = collection;
              return (
                <React.Fragment key={`source-${index}`}>
                  {source.sourceId === 'Artists' && items.length > 0 && (
                    <div tw="font-semibold text-[16px] text-[#363636] px-6 mb-2">
                      Artists
                    </div>
                  )}
                  <ul className="aa-List" {...autocomplete.getListProps()}>
                    {source.sourceId === 'Works'
                      ? items.map((item) => (
                        <>
                          <Link
                            href={`/work/${item.id}`}
                            key={item.objectID}
                            passHref
                          >
                            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                            {/*
                            // @ts-ignore */}
                            <li
                              tw="px-6 py-2 text-[16px] text-[#5A5A5A] w-full bg-white hover:bg-[#F5F5F5] cursor-pointer"
                              className="aa-Item"
                              {...autocomplete.getItemProps({
                                item,
                                source,
                              })}
                            >
                              {autocompleteState.query.substring(
                                0,
                                getMatchingPrefixIndex(
                                  autocompleteState.query,
                                  (item as WorkRecord).title
                                ) + 1
                              )}
                              <b>
                                {(item as WorkRecord).title.substring(
                                  getMatchingPrefixIndex(
                                    autocompleteState.query,
                                    (item as WorkRecord).title
                                  )
                                )}
                              </b>
                            </li>
                          </Link>
                        </>
                      ))
                      : source.sourceId === 'Artists'
                        ? items.map((item) => (
                          <Link
                            href={`/${(item as ArtistData).username}`}
                            key={item.objectID}
                            passHref
                          >
                            <li tw="flex items-center gap-x-3 px-6 py-2 bg-white hover:bg-[#F5F5F5] cursor-pointer">
                              <div tw="w-10 h-10 relative overflow-hidden">
                                <FirebaseStorageImage
                                  imageRef={(item as ArtistData).profilePicture}
                                />
                              </div>
                              <div>
                                <div tw="text-[16px] leading-[19px] text-black">
                                  {(item as ArtistData).name}
                                </div>
                                <div tw="mt-[2px] text-[14px] leading-[17px] text-[#727373]">
                                  {(item as ArtistData).location}
                                </div>
                              </div>
                            </li>
                          </Link>
                        ))
                        : 'ERROR'}{' '}
                  </ul>
                </React.Fragment>
              );
              // return (
              //   <div key={`source-${index}`} className="aa-Source">
              //     {items.length > 0 && (
              //       <ul className="aa-List" {...autocomplete.getListProps()}>
              //         {items.map((item) => (
              //           <li
              //             key={item.objectID}
              //             className="aa-Item"
              //             {...autocomplete.getItemProps({
              //               item,
              //               source,
              //             })}
              //           >
              //             {item.name}
              //           </li>
              //         ))}
              //       </ul>
              //     )}
              //   </div>
              // );
            })}
            {autocompleteState.query === '' && (
              <>
                {/*<div tw="font-semibold text-[16px] text-[#363636] px-6 mb-2">*/}
                {/*  Recent*/}
                {/*</div>*/}
                {/*{['cat collar', 'cat painting', 'cat bowl'].map((result, i) => (*/}
                {/*  <div*/}
                {/*    key={i}*/}
                {/*    tw="px-6 py-2 text-[16px] text-[#5A5A5A] w-full bg-white hover:bg-[#F5F5F5] cursor-pointer"*/}
                {/*  >*/}
                {/*    {result}*/}
                {/*  </div>*/}
                {/*))}*/}

                <div tw="font-semibold text-[16px] text-[#363636] px-6 mt-4 mb-2">
                  Trending Searches
                </div>
                {['cat collar', 'cat painting', 'cat bowl'].map((result, i) => (
                  <div
                    key={i}
                    tw="px-6 py-2 text-[16px] text-[#5A5A5A] w-full bg-white hover:bg-[#F5F5F5] cursor-pointer"
                  >
                    {result}
                  </div>
                ))}
              </>
            )}
            {/*<div tw="font-semibold text-[16px] text-[#363636] px-6 mt-4 mb-2">*/}
            {/*  Artists*/}
            {/*</div>*/}
            {/*{[...Array(2)].map((v, i) => (*/}
            {/*  <div*/}
            {/*    key={i}*/}
            {/*    tw="flex items-center gap-x-3 px-6 py-2 bg-white hover:bg-[#F5F5F5] cursor-pointer"*/}
            {/*  >*/}
            {/*    <div tw="w-10 h-10 relative overflow-hidden">*/}
            {/*      <Image*/}
            {/*        src="/assets/images/kevin.png"*/}
            {/*        layout="fill"*/}
            {/*        objectFit="cover"*/}
            {/*      />*/}
            {/*    </div>*/}
            {/*    <div>*/}
            {/*      <div tw="text-[16px] leading-[19px] text-black">*/}
            {/*        Kevin Fang*/}
            {/*      </div>*/}
            {/*      <div tw="mt-[2px] text-[14px] leading-[17px] text-[#727373]">*/}
            {/*        Los Angeles, CA*/}
            {/*      </div>*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*))}*/}
          </div>
        )}
      </div>
    </div>
  );
}
