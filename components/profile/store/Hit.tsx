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
import UploadWork from '../../uploading/UploadWork';
import useAuth from '../../../utils/auth/useAuth';
import { useInstantSearch } from 'react-instantsearch-hooks-web';

export default function Hit({
  hit: work,
  imageURL,
}: {
  hit: ForSaleWorkRecord;
  imageURL: string;
}) {
  const { user, artistId: userArtistId } = useAuth();
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
  const [editing, setEditing] = useState(false);
  const { refresh } = useInstantSearch();

  return (
    <>
      {editing && (
        <UploadWork
          onClose={() => {
            setEditing(false);
            refresh();
            const timeoutIds = [500, 1000, 1500, 2000, 3000, 5000].map((ms) =>
              setTimeout(() => refresh(), ms)
            );
            return () => timeoutIds.forEach((id) => clearTimeout(id));
          }}
          workId={work.id}
          toShow={editing}
        />
      )}
      <Link href={'/work/' + work.id} passHref>
        <div tw="cursor-pointer my-4 md:my-10 relative">
          {user && userArtistId === work.artist && (
            <button
              tw="absolute right-2 top-2 rounded-full w-[32px] h-[32px] md:w-[40px] md:h-[40px] xl:w-[52px] xl:h-[52px] bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)] flex items-center justify-center"
              onClick={(e) => {
                e.preventDefault();
                setEditing(true);
              }}
            >
              <img src="/assets/svgs/edit.svg" tw="w-[50%] h-[50%]" />
            </button>
          )}
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
                {work.title}
              </div>
              <div tw="flex justify-between mt-2">
                <div tw="text-[#838383] text-[18px] leading-[1em] italic">
                  {work.medium}
                </div>
                <div tw="text-black text-[24px] leading-[1em] font-bold">
                  {work.sale ? '$' + work.sale.price : ''}
                </div>
              </div>
            </div>
          )}
        </div>
      </Link>
    </>
  );
}
