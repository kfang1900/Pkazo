import styles from '../../../styles/ProfilePortfolio.module.css';
import { Hits, HitsProps, useHits } from 'react-instantsearch-hooks-web';
import Hit from './Hit';
import Masonry from 'react-masonry-css';
import React, { useEffect, useReducer } from 'react';
import { ForSaleWorkRecord, WorkRecord } from '../../../types/dbTypes';
import {
  loadStorageImage,
  loadStorageImageSafe,
} from '../../../helpers/FirebaseFunctions';

export default function CustomHits(props: HitsProps<ForSaleWorkRecord>) {
  console.log(props);
  const { hits } = useHits(props);
  console.log(hits);
  const [memonizedImageURLS, addMemonizedImageURL] = useReducer(
    (state: Record<string, string>, [workId, imageURL]: [string, string]) => {
      console.log(state, workId, imageURL);
      return {
        ...state,
        [workId]: imageURL,
      };
    },
    {}
  );
  useEffect(() => {
    hits.forEach((hit) => {
      if (!hit.images || hit.images.length === 0) return;
      const imageRef = hit.images[0];
      if (!memonizedImageURLS[imageRef]) {
        loadStorageImage(imageRef).then((url) =>
          addMemonizedImageURL([hit.id, url + ''])
        );
      }
    });
  }, [hits]);
  return (
    <Masonry
      breakpointCols={{ default: 3, 500: 2 }}
      className={styles['masonry-column']}
      columnClassName={styles['store-column']}
    >
      {hits.map((hit) => (
        <Hit key={hit.id} hit={hit} imageURL={memonizedImageURLS[hit.id]} />
      ))}
      {/*/!* Single Portfolio *!/*/}
      {/*{works.map(({ id, data: work, imageURL }, i) => (*/}
      {/*  <a*/}
      {/*    key={id}*/}
      {/*    tw={'cursor-pointer my-[18px]'}*/}
      {/*    href={'/work/' + id}*/}
      {/*  >*/}
      {/*    <div tw="w-full mb-6">*/}
      {/*      <img src={imageURL} alt="Image Alt" />*/}
      {/*    </div>*/}
      {/*    <div>*/}
      {/*      <h4>{work.title}</h4>*/}
      {/*      <div tw="flex items-center justify-between">*/}
      {/*        <p tw="text-gray-600">{work.medium}</p>*/}
      {/*        <strong>${work.sale.price}</strong>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </a>*/}
      {/*))}*/}
    </Masonry>
  );
}
