import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import 'twin.macro';
import {
  ForSaleWorkRecord,
  WorkData,
  WorkRecord,
} from '../../../types/dbTypes';
import { loadStorageImage } from '../../../helpers/FirebaseFunctions';
import { useMediaQuery } from 'react-responsive';


export default function Hit({
  hit: work,
  imageURL,
}: {
  hit: ForSaleWorkRecord;
  imageURL: string;
}) {
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
  return (
    <Link href={'/work/' + work.id} passHref>
      <div tw='cursor-pointer my-4 md:my-10'>
        <div tw="w-full">
          {imageURL && <img src={imageURL} alt="Image Alt" />}
        </div>
        {isMobile ?
          <div tw='mt-2 flex justify-between'>
            <div>
              <div tw='text-[#65676B] text-[12px] leading-[1em] font-semibold'>
                {work.title}
              </div>
              <div tw="text-[#838383] text-[9px] leading-[1em] italic mt-[6px]">
                {work.medium}
              </div>
            </div>
            <div tw='text-black text-[14px] leading-[1em] font-bold'>
              ${work.sale ? work.sale.price : 'NFS!!'}
            </div>
          </div> :
          <div tw='mt-4'>
            <div tw='text-[#3C3C3C] text-[20px] leading-[1em] font-semibold'>
              {work.title}
            </div>
            <div tw="flex justify-between mt-2">
              <div tw="text-[#838383] text-[18px] leading-[1em] italic">
                {work.medium}
              </div>
              <div tw='text-black text-[24px] leading-[1em] font-bold'>
                ${work.sale ? work.sale.price : 'NFS!!'}
              </div>
            </div>
          </div>
        }
      </div>
    </Link>
  );
}
