import styles from '../../../styles/ProfilePortfolio.module.css';
import Hit from './Hit';
import Masonry from 'react-masonry-css';
import React, { useEffect, useReducer } from 'react';
import { ForSaleWorkRecord, WorkRecord } from '../../../types/dbTypes';
import { loadStorageImageSafe } from '../../../helpers/FirebaseFunctions';
import { WorkData } from '../../../types/dbTypes';
import { useMediaQuery } from 'react-responsive';
import Link from 'next/link';
import 'twin.macro';

interface WorkPackage {
  id: string;
  data: WorkData & { forSale: true };
  imageURL: string;
}

//Similar function to CustomHits.tsx. It is for manual implementation of the display of search result items.
export default function ProductCollection(props: WorkPackage[]) {
  const workprops: WorkPackage[] = Object.values(props);
  console.log(workprops);

  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });

  return (
    <Masonry
      breakpointCols={{ default: 3, 500: 2 }}
      className={styles['masonry-column']}
      columnClassName={styles['store-column']}
    >
      {/*/!* Single Portfolio *!/*/}
      {workprops.map(({ id, data: work, imageURL }, i) => (
        <Link key={i} href={'/work/' + id} passHref>
          <div tw="cursor-pointer my-4 md:my-10">
            {imageURL && <img src={imageURL} alt="Image Alt" tw="w-full" />}
            {isMobile ? (
              <div tw="mt-2 flex justify-between">
                <div>
                  <div tw="text-[#65676B] text-[12px] leading-[1em] font-semibold">
                    {work.title}
                  </div>
                  <div tw="text-[#838383] text-[9px] leading-[1em] italic mt-[6px]">
                    {work.medium}
                  </div>
                </div>
                <div tw="text-black text-[14px] leading-[1em] font-bold">
                  ${work.sale ? work.sale.price : 'NFS!!'}
                </div>
              </div>
            ) : (
              <div tw="mt-4">
                <div tw="text-[#3C3C3C] text-[20px] leading-[1em] font-semibold">
                  {work.title}{' '}
                  {/* <button
                    tw={'underline italic ml-8'}
                    onClick={(e) => {
                      e.preventDefault();
                      setEditing(true);
                    }}
                  >
                    Edit
                  </button> */}
                </div>
                <div tw="flex justify-between mt-2">
                  <div tw="text-[#838383] text-[18px] leading-[1em] italic">
                    {work.medium}
                  </div>
                  <div tw="text-black text-[24px] leading-[1em] font-bold">
                    ${work.sale ? work.sale.price : 'NFS!!'}
                  </div>
                </div>
              </div>
            )}
          </div>
        </Link>
        // <a key={id} tw={'cursor-pointer my-[18px]'} href={'/work/' + id}>
        //   <div tw="w-full mb-6 mt-4">
        //     <img src={imageURL} alt="Image Alt" />
        //   </div>
        //   <div>
        //     <h4>{work.title}</h4>
        //     <div tw="flex items-center justify-between">
        //       <p tw="text-gray-600">{work.medium}</p>
        //       <strong>${work.sale.price}</strong>
        //     </div>
        //   </div>
        // </a>
      ))}
    </Masonry>
  );
}
