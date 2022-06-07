import React, { useEffect, useState } from 'react';
import 'twin.macro';
import {
  ForSaleWorkRecord,
  WorkData,
  WorkRecord,
} from '../../../types/dbTypes';
import { loadStorageImage } from '../../../helpers/FirebaseFunctions';

export default function Hit({
  hit: work,
  imageURL,
}: {
  hit: ForSaleWorkRecord;
  imageURL: string;
}) {
  console.log('DFSIJOSJFIDOSFJI');
  console.log(imageURL);
  return (
    <a tw={'cursor-pointer my-[18px]'} href={'/work/' + work.id}>
      <div tw="w-full mb-6">
        {imageURL && <img src={imageURL} alt="Image Alt" />}
      </div>
      <div>
        <h4>{work.title}</h4>
        <div tw="flex items-center justify-between">
          <p tw="text-gray-600">{work.medium}</p>
          <strong>${work.sale ? work.sale.price : 'NFS!!'}</strong>
        </div>
      </div>
    </a>
  );
}
