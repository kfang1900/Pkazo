import Image from 'next/image';
import buttons from '../../styles/Button';
import tw from 'twin.macro';
import Dropdown from '../../styles/Dropdown';
import React from 'react';
import { ArtistData, WorkData } from '../../types/dbTypes';
import { CartItem as CartItemType } from '../../utils/hooks/useCart';
import formatCurrency from '../../utils/formatCurrency';
import Link from 'next/link';

export default function CartItem({
  data: {
    id,
    quantity,
    artistData,
    type,
    workData,
    artistProfilePictureURL,
    workImageURL,
  },
  removeCartItem,
  shippingCost,
  shippingCostLoading,
  onCalculateShipping,
}: {
  data: CartItemType & {
    workData: WorkData & { forSale: true };
    artistData: ArtistData;
    workImageURL: string;
    artistProfilePictureURL: string;
  };
  removeCartItem: (id: string) => void;
  shippingCost: number | null;
  onCalculateShipping: () => void;
  shippingCostLoading: boolean;
}) {
  return (
    <div tw="mt-[18px]">
      <div tw="flex items-center">
        <Link href={'/' + artistData.username} passHref>
          <div tw="w-[55px] h-[55px] overflow-hidden rounded-full flex items-center cursor-pointer">
            <Image
              src={artistProfilePictureURL}
              alt="profile_image"
              width="55px"
              height="55px"
              objectFit="cover"
            />
          </div>
        </Link>
        <Link href={'/' + artistData.username} passHref>
          <div tw="ml-[10px] cursor-pointer">
            <div tw="text-[16px] leading-[19px] font-semibold text-black">
              {artistData.name}
            </div>
            <div tw="mt-1 text-[14px] font-medium text-[#727373]">
              {artistData.location}
            </div>
          </div>
        </Link>
        <button
          css={[
            buttons.white,
            tw`px-6 text-[13px] text-[#3C3C3C] font-semibold ml-auto h-[30px]`,
          ]}
        >
          Message
        </button>
      </div>
      <div tw="flex mt-4">
        <div tw="w-[88px] h-[88px] rounded-[8px] overflow-hidden flex-none">
          <Image
            src={workImageURL}
            width="88px"
            height="88px"
            objectFit="cover"
          />
        </div>
        <div tw="ml-4 w-full">
          <div
            css={[
              tw`bg-[#D8E8D8] rounded-[52px] h-5 text-[#222222] text-[12px] font-semibold text-center`,
              type === 'print' ? tw`w-11` : tw`w-16`,
            ]}
          >
            {type === 'print' ? 'Print' : 'Original'}
          </div>

          {type === 'print' ? (
            <>
              <Link href={'/works/' + id} passHref>
                <div tw="mt-1 text-[24px] italic text-[#696969] font-medium leading-[1em] cursor-pointer">
                  {workData.title}
                </div>
              </Link>
              <div tw="flex mt-[6px] text-[#696969] text-[14px] leading-[17px]">
                <div>Size: 8 x 10 in</div>
                <button tw="ml-3" onClick={() => 0}>
                  Edit
                </button>
              </div>
              <div tw="flex justify-between w-full mt-3">
                <Dropdown
                  onChange={() => 0}
                  appearance={tw`border-[#EAEAEA] rounded-[8px] w-[64px] pl-3 py-2 text-[16px] text-[#7E7E7E] font-semibold`}
                  triangle
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
                </Dropdown>
                <div tw="ml-auto font-semibold text-[#242424] text-[20px] leading-[1em]">
                  {formatCurrency(workData.sale.price)}
                </div>
              </div>
            </>
          ) : (
            <div tw="flex items-center justify-between w-full">
              <Link href={'/work/' + id} passHref>
                <div tw="mt-1 text-[24px] italic text-[#696969] font-medium leading-[1em] cursor-pointer">
                  {workData.title}
                </div>
              </Link>
              <div tw="ml-auto font-semibold text-[#242424] text-[20px] leading-[1em]">
                {formatCurrency(workData.sale.price)}
              </div>
            </div>
          )}

          <div tw="flex mt-4 text-[12px] text-[#2C2C2C] gap-x-6">
            <button
              tw="font-bold"
              onClick={() => 0}
              // onClick={() => {
              //     work.buyNow = false;
              // }}
            >
              Save for later
            </button>
            <button tw="font-bold" onClick={() => removeCartItem(id)}>
              Remove
            </button>
          </div>
        </div>
      </div>
      <textarea
        rows={3}
        placeholder={`Add a note to ${artistData.name} (optional)`}
        tw="mt-5 w-full border-[0.5px] border-[#ECECEC] focus:border-[#D8D8D8] outline-none rounded-[7px] p-3 text-[14px] leading-[17px]"
      />
      <div tw="mt-3 w-full flex flex-col items-end">
        <div tw="text-[13px] text-black">
          Shipping:{' '}
          {shippingCostLoading ? (
            'Loading...'
          ) : shippingCost ? (
            formatCurrency(shippingCost)
          ) : (
            <button tw={'underline'} onClick={() => onCalculateShipping()}>
              Calculate
            </button>
          )}
        </div>
        {/*TODO*/}
        {/*<div tw="mt-3 text-[12px] text-[#7C7C7C] text-right">*/}
        {/*  Estimated delivery: June 3-8 <br />*/}
        {/*  from Dallas, TX*/}
        {/*</div>*/}
      </div>
      <div tw="h-[0.5px] bg-[#E3E3E3] mt-5" />
    </div>
  );
}
