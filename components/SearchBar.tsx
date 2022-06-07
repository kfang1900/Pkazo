import '@algolia/autocomplete-theme-classic';
import React, {
  createElement,
  Fragment,
  useEffect,
  useRef,
  useState,
} from 'react';
import Link from 'next/link';
import tw from 'twin.macro';
import {
  autocomplete,
  AutocompleteComponents,
  getAlgoliaResults,
} from '@algolia/autocomplete-js';
import algoliaSearchClient from './shared/algoliaSearchClient';
import { WorkRecord } from '../types/dbTypes';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import { Hit } from 'instantsearch.js';
import { render } from 'react-dom';
import { useRouter } from 'next/router';
function SearchResultWork({
  hit,
  components,
  getImageURL,
}: {
  hit: WorkRecord;
  components: AutocompleteComponents;
  getImageURL: (url: string) => Promise<string>;
}) {
  const [imageURLHitId, setImageURLHitId] = useState('');
  const [imageURL, setImageURL] = useState('');

  useEffect(() => {
    if (hit.id !== imageURLHitId) {
      setImageURL('');
    }
    if (!hit.images || hit.images.length === 0) return;
    getImageURL(hit.images[0]).then((downloadURL) => {
      setImageURL(downloadURL);
      setImageURLHitId(hit.id);
    });
  }, [hit]);

  return (
    <div>
      <div className="aa-ItemWrapper">
        <div className="aa-ItemContent">
          <div className="aa-ItemIcon aa-ItemIcon--alignTop">
            <img src={imageURL} width="40" height="40" />
          </div>
          <div className="aa-ItemContentBody">
            <div className="aa-ItemContentTitle">
              <components.Highlight hit={hit} attribute="title" />
            </div>
            <div className="aa-ItemContentDescription">
              <components.Snippet hit={hit} attribute="description" />
            </div>
          </div>
          <div className="aa-ItemActions">
            <button
              className="aa-ItemActionButton aa-DesktopOnly aa-ActiveOnly"
              type="button"
              title="Select"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
              >
                <path d="M18.984 6.984h2.016v6h-15.188l3.609 3.609-1.406 1.406-6-6 6-6 1.406 1.406-3.609 3.609h13.172v-4.031z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function SearchBar() {
  const router = useRouter();

  const [cachedImageURLs, setCachedImageURLs] = useState<
    Record<string, string>
  >({});
  const getImageURL = async (imageRef: string) => {
    if (cachedImageURLs[imageRef]) return cachedImageURLs[imageRef];
    const storage = getStorage();
    const downloadURL = await getDownloadURL(ref(storage, imageRef));
    setCachedImageURLs((urls) => ({ ...urls, [imageRef]: downloadURL }));
    return downloadURL;
  };
  const containerRef = useRef(null);
  useEffect(() => {
    if (!containerRef || !containerRef.current) {
      return;
    }

    const search = autocomplete<WorkRecord>({
      placeholder: 'Search for products',
      container: containerRef.current,
      renderer: { createElement, Fragment, render },
      openOnFocus: true,

      getSources({ query }) {
        return [
          {
            sourceId: 'products',
            getItems() {
              return getAlgoliaResults({
                searchClient: algoliaSearchClient,
                queries: [
                  {
                    indexName: 'pkazo-works',
                    query,
                    params: {
                      hitsPerPage: 5,
                      attributesToSnippet: ['title:10', 'description:35'],
                      snippetEllipsisText: '…',
                    },
                  },
                ],
              });
            },
            getItemUrl({ item }) {
              return `/work/${item.id}`;
            },
            templates: {
              item({ item, components }) {
                return (
                  <a
                    href={'/work/' + item.id}
                    onClick={(e) => {
                      // todo: figure out why Link component wasn't working here
                      e.preventDefault();
                      router.push('/work/' + item.id);
                    }}
                  >
                    <SearchResultWork
                      hit={item}
                      components={components}
                      getImageURL={getImageURL}
                    />
                  </a>
                );
              },
            },
            navigator: {
              navigate({ itemUrl }: { itemUrl: string }) {
                return router.push(itemUrl);
              },
              navigateNewTab({ itemUrl }: { itemUrl: string }) {
                const windowReference = window.open(
                  itemUrl,
                  '_blank',
                  'noopener'
                );

                if (windowReference) {
                  windowReference.focus();
                }
              },
              navigateNewWindow({ itemUrl }: { itemUrl: string }) {
                window.open(itemUrl, '_blank', 'noopener');
              },
            },
          },
        ];
      },
    });

    return () => search.destroy();
  }, [containerRef, algoliaSearchClient]);

  return (
    // <input
    //   type="text"
    //   placeholder="Search"
    //   tw="px-4 py-1 bg-gray-100 outline-none rounded-full w-full"
    // />
    <div ref={containerRef}></div>
  );
}
