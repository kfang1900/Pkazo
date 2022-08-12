import React, { ReactNode, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import tw, { styled } from 'twin.macro';
import buttons from 'styles/Button';
import Dropdown from 'styles/Dropdown';
import { useMediaQuery } from 'react-responsive';
import useCart from '../../utils/hooks/useCart';
import { CartItem as CartItemType } from '../../utils/hooks/CartContext';
import {
  doc,
  DocumentSnapshot,
  getDoc,
  getFirestore,
} from 'firebase/firestore';
import { ArtistData, WorkData } from '../../types/dbTypes';
import {
  loadStorageImage,
  loadStorageImageSafe,
} from '../../helpers/FirebaseFunctions';
import CartItem from './CartItem';
import formatCurrency from '../../utils/formatCurrency';
import axios from 'axios';
import Modal from '../popups/Modal';
import Link from 'next/link';

const LineBreak = styled.div`
  ${tw`h-[0.5px] bg-[#E3E3E3]`}
`;
type EstimatedRateItem = {
  id: string;
  estimatedRate: number;
};
export function CartComponent() {
  const isMobile = !useMediaQuery({ query: `(min-width: 768px)` });
  const [works, setWorks] = useState<
    (CartItemType & {
      workData: WorkData & { forSale: true };
      artistData: ArtistData & { id: string };
      workImageURL: string;
      artistProfilePictureURL: string;
    })[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [shippingCosts, setShippingCosts] = useState<EstimatedRateItem[]>([]);
  const [shippingEstimateZip, setShippingEstimateZip] = useState<string | null>(
    null
  );
  const [shippingLoading, setShippingLoading] = useState(true);
  const [ableToCalculateRate, setAbleToCalculateRate] = useState(true);
  const [showShippingEstimateModal, setShowShippingEstimateModal] =
    useState(false);
  const [shippingEstimateModalZip, setShippingEstimateModalZip] = useState('');
  const { cartLoading, cart, removeCartItem } = useCart();
  useEffect(() => {
    if (cartLoading) return;
    (async () => {
      const db = getFirestore();
      const data: (CartItemType & {
        workData: WorkData & { forSale: true };
      })[] = await Promise.all(
        cart.map((cartItem) =>
          getDoc(doc(db, 'works', cartItem.id))
            .then((snapshot) => snapshot.data() as WorkData & { forSale: true })
            .then((data) => ({
              ...cartItem,
              workData: data,
            }))
        )
      );
      const artistData = await Promise.all(
        Array.from(new Set(data.map((d) => d.workData.artist))).map(
          (artistId) =>
            getDoc(doc(db, 'artists', artistId))
              .then((snapshot) => snapshot.data() as ArtistData)
              .then((data) => ({
                id: artistId,
                data,
              }))
        )
      );

      setWorks(
        await Promise.all(
          data.map((w) => {
            const workArtistData = artistData.find(
              (a) => a.id === w.workData.artist
            );
            if (!workArtistData) {
              throw new Error('Unable to get artist data for work: ' + w.id);
            }
            return (async () => {
              return {
                ...w,
                artistData: {
                  ...workArtistData.data,
                  id: workArtistData.id,
                },
                artistProfilePictureURL:
                  (await loadStorageImage(workArtistData.data.profilePicture)) +
                  '',
                workImageURL:
                  (await loadStorageImage(w.workData.images[0])) + '',
              };
            })();
          })
        )
      );
      setLoading(false);
    })();
  }, [cart, cartLoading]);
  useEffect(() => {
    (async () => {
      setShippingLoading(true);
      setAbleToCalculateRate(true);
      const estimatedRates = (await Promise.all(
        works
          .map((work) => work.id)
          .map((workId) =>
            axios
              .get(
                `/api/shipping/estimated-rates?workId=${workId}${
                  shippingEstimateZip ? '&zip=' + shippingEstimateZip : ''
                }`
              )

              .then((resp) => resp.data)
              .then((data: { rates: { amount: string }[]; zip: string }) => {
                setShippingEstimateZip(data.zip);
                const lowestRate = data.rates.reduce(
                  (lowestRate, rate) =>
                    Math.min(lowestRate, parseFloat(rate.amount)),
                  parseFloat(data.rates[0].amount)
                );
                return {
                  id: workId,
                  estimatedRate: lowestRate,
                };
              })
              .catch((e) => {
                setAbleToCalculateRate(false);
                return;
              })
          )
      )) as any as EstimatedRateItem[];
      setShippingCosts(estimatedRates);
      setShippingLoading(false);
    })();
  }, [works, shippingEstimateZip]);
  useEffect(() => {
    setShippingEstimateZip(sessionStorage.getItem('shippingZipCode'));
  }, [setShippingEstimateZip]);
  useEffect(() => {
    setShippingEstimateModalZip(shippingEstimateZip || '');
  }, [
    showShippingEstimateModal,
    shippingEstimateZip,
    setShippingEstimateModalZip,
  ]);
  return (
    <div tw="h-full flex-1 flex flex-col">
      {showShippingEstimateModal && (
        <Modal
          small
          open={showShippingEstimateModal}
          onClose={() => setShowShippingEstimateModal(false)}
        >
          <form
            onSubmit={(e) => {
              setShippingEstimateZip(shippingEstimateModalZip);
              setShowShippingEstimateModal(false);
              sessionStorage.setItem(
                'shippingZipCode',
                shippingEstimateModalZip
              );
              e.preventDefault();
              return false;
            }}
          >
            <h1 tw={'text-xl mb-6'}>Calculate Shipping</h1>
            <label tw={'font-bold  block mb-2'}>Shipping Zip Code:</label>
            <input
              autoFocus
              value={shippingEstimateModalZip}
              onChange={(e) => setShippingEstimateModalZip(e.target.value)}
              placeholder={'e.g. 13948'}
              tw={
                'block border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px] mb-4'
              }
            />
            <button
              type={'submit'}
              tw="h-9 w-20 text-center relative -top-0.5 text-white bg-theme-red rounded-[6px] px-4 py-1 cursor-pointer hover:bg-[#be4040]"
            >
              Save
            </button>
          </form>
        </Modal>
      )}
      {loading && (
        <div tw="flex w-full justify-center">
          <img src={'/assets/svgs/loading.svg'} tw="w-[80px] md:w-[100px]" />
        </div>
      )}

      {!loading && (
        <div tw="w-full h-full flex-1 flex flex-col relative">
          <div tw="px-4 flex-1 flex flex-col">
            {works
              .sort((a, b) => {
                if (a.artistData.username < b.artistData.username) return -1;
                if (a.artistData.username > b.artistData.username) return 1;
                return 0;
              })
              .map((data, i, arr) => (
                <CartItem
                  data={data}
                  key={data.id}
                  removeCartItem={(id) => {
                    setWorks((oldWorks) => oldWorks.filter((w) => w.id !== id));
                    removeCartItem(id);
                  }}
                  shippingCost={
                    (
                      shippingCosts
                        .filter((r) => !!r)
                        .find((r) => r.id === data.id) || {
                        estimatedRate: null,
                      }
                    ).estimatedRate
                  }
                  shippingCostLoading={shippingLoading}
                  onCalculateShipping={() => setShowShippingEstimateModal(true)}
                  duplicateArtist={
                    i > 0 &&
                    arr[i - 1].artistData.username ===
                      arr[i].artistData.username
                  }
                  duplicateArtistLast={
                    i === works.length - 1 ||
                    arr[i].artistData.username !==
                      arr[i + 1].artistData.username
                  }
                  isLast={i === works.length - 1}
                />
              ))}
            <div tw="mt-auto flex-1" />
            <LineBreak tw="mt-5" />
            <div tw="flex mt-4">
              <input type="checkbox" tw="w-[18px] h-[18px] rounded-[4px]" />
              <div tw="ml-2">
                <div tw="text-[14px] leading-[17px] text-[#616161] font-medium">
                  This order is a gift
                </div>
                <div tw="mt-[2px] text-[12px] leading-[14px] text-[#888888]">
                  Prices will not be shown on packing slip
                </div>
              </div>
            </div>
            <LineBreak tw="mt-4" />
            <div tw="grid grid-cols-2 justify-between mt-4 gap-y-[10px] text-[16px] text-black">
              <div tw="font-semibold">Subtotal</div>
              <div tw="text-right">
                {formatCurrency(
                  works.reduce((acc, w) => acc + w.workData.sale.price, 0)
                )}
              </div>
              <div>
                <div tw="font-semibold text-[16px] text-black">
                  Estimated Shipping
                </div>
                {shippingEstimateZip && (
                  <div tw="mt-[2px] text-[12px] text-[#888888]">
                    (To{' '}
                    <button
                      tw="underline"
                      onClick={() => setShowShippingEstimateModal(true)}
                    >
                      United States, {shippingEstimateZip}
                    </button>
                    )
                  </div>
                )}
              </div>
              <div tw="text-right">
                {shippingLoading ? (
                  'Loading...'
                ) : ableToCalculateRate ? (
                  formatCurrency(
                    shippingCosts.reduce(
                      (sum, rate) => sum + rate.estimatedRate,
                      0
                    )
                  )
                ) : (
                  <button
                    tw="underline"
                    onClick={() => setShowShippingEstimateModal(true)}
                  >
                    Calculate
                  </button>
                )}
              </div>
            </div>
            <LineBreak tw="mt-4" />
            <div tw="mt-4 flex items-center justify-between text-[16px] text-black">
              <div tw="font-semibold">Estimated Total</div>
              <div tw="text-right">
                {ableToCalculateRate && !shippingLoading
                  ? formatCurrency(
                      works.reduce((acc, w) => acc + w.workData.sale.price, 0) +
                        shippingCosts.reduce(
                          (sum, rate) => sum + rate.estimatedRate,
                          0
                        )
                    )
                  : formatCurrency(
                      works.reduce((acc, w) => acc + w.workData.sale.price, 0)
                    ) + ' + Shipping'}
              </div>
            </div>
          </div>
          <div tw="sticky w-full bottom-0 bg-white mt-4">
            <LineBreak />
            <div tw="px-4">
              <Link href={'/checkout'} passHref>
                <button tw="w-full h-11 mt-[14px] mb-4 bg-[#2C1D1D] hover:bg-[#3B2727] rounded-[30px] text-center text-white text-[14px] font-bold">
                  Proceed to checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
const Cart: NextPage = () => {
  return <CartComponent />;
};
export default Cart;
