import styles from '../../../styles/ProfilePortfolio.module.css';
import Hit from './Hit';
import Masonry from 'react-masonry-css';
import React, { useEffect, useReducer } from 'react';
import { ForSaleWorkRecord, WorkRecord } from '../../../types/dbTypes';
import { loadStorageImageSafe } from '../../../helpers/FirebaseFunctions';
import { WorkData } from '../../../types/dbTypes';

interface WorkPackage {
  id: string;
  data: WorkData & { forSale: true };
  imageURL: string;
}

//Similar function to CustomHits.tsx. It is for manual implementation of the display of search result items.
export default function ProductCollection(props: WorkPackage[]) {
  const workprops: WorkPackage[] = Object.values(props);
  console.log(workprops);
  return (
    <Masonry
      breakpointCols={{ default: 3, 500: 2 }}
      className={styles['masonry-column']}
      columnClassName={styles['store-column']}
      tw="mt-100"
    >
      {/*/!* Single Portfolio *!/*/}
      {workprops.map(({ id, data: work, imageURL }, i) => (
        <a key={id} tw={'cursor-pointer my-[18px]'} href={'/work/' + id}>
          <div tw="w-full mb-6 mt-4">
            <img src={imageURL} alt="Image Alt" />
          </div>
          <div>
            <h4>{work.title}</h4>
            <div tw="flex items-center justify-between">
              <p tw="text-gray-600">{work.medium}</p>
              <strong>${work.sale.price}</strong>
            </div>
          </div>
        </a>
      ))}
    </Masonry>
  );
}
