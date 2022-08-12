import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import tw from 'twin.macro';

import { ArtistData, WorkData } from '../../types/dbTypes';
import {
  CartItem,
  CartItem as CartItemType,
} from '../../utils/hooks/CartContext';
import { formatPrice } from '../popups/PostDetails';

import scrollStyle from 'styles/UploadWork.module.css';
import Dropdown from 'styles/Dropdown';
import buttons from 'styles/Button';
import useCart from '../../utils/hooks/useCart';
import {
  doc,
  DocumentSnapshot,
  getDoc,
  getFirestore,
} from 'firebase/firestore';
import ar from 'date-and-time/locale/ar';
import { loadStorageImage } from '../../helpers/FirebaseFunctions';
type CartItemWork = CartItem & {
  work: WorkData;
  artist: ArtistData;
  workImage: string;
  artistImage: string;
  price: number;
};
const CheckoutCart = ({
  page,
  shippingCost,
}: {
  page: number;
  shippingCost: number | null;
}) => {
  // const [works, setWorks] = useState<
  //     (CartItemType & {
  //         workData: WorkData & { forSale: true };
  //         artistData: ArtistData & { id: string };
  //         workImageURL: string;
  //         artistProfilePictureURL: string;
  //     })[]
  // >([]);
  const [works, setWorks] = useState([
    { artistData: { username: 'Kevin Fang' }, type: 'original' },
    { artistData: { username: 'Kevin Fang' }, type: 'print' },
    { artistData: { username: 'Kevin Fang' }, type: 'print' },
    { artistData: { username: 'Alice Yu' }, type: 'original' },
    { artistData: { username: 'Alice Yu' }, type: 'original' },
  ]);

  const { cart } = useCart();
  const [cartWorks, setCartWorks] = useState<CartItemWork[]>([]);
  useEffect(() => {
    console.log('RUN');
    (async () => {
      const db = getFirestore();
      const workData = (
        await Promise.all(
          cart.map(
            (item): Promise<null | { item: CartItem; data: WorkData }> =>
              getDoc(doc(db, 'works', item.id)).then((snapshot) => {
                if (!snapshot.data()) {
                  console.warn(
                    `Work data for cart item ${item.id} was not found in the database, so the item will be removed.`
                  );
                  return null;
                }
                return {
                  item: item,
                  data: snapshot.data() as WorkData,
                };
              })
          )
        )
      ).filter((r) => r !== null) as unknown as {
        item: CartItem;
        data: WorkData;
      }[];

      const artistSnapshots = await Promise.all(
        [...new Set(workData.map(({ data }) => data.artist))].map((artist) =>
          getDoc(doc(db, 'artists', artist)).then((snapshot) => {
            if (!snapshot.data()) {
              throw new Error('Artist not found for work: ' + artist);
            }
            return {
              id: artist,
              data: snapshot.data() as ArtistData,
            };
          })
        )
      );
      const data = await Promise.all(
        workData.map(({ item, data: workData }) => {
          return (async () => {
            const artistData = artistSnapshots.find(
              ({ id }) => id === workData.artist
            )!.data;
            let price: number;
            if (item.type === 'original') {
              if (!workData.forSale) {
                throw new Error('Work not for sale.');
              }
              price = workData.sale.price;
            } else {
              if (!workData.forPrint) {
                throw new Error('Work not for print.');
              }
              price = workData.print.price;
            }
            return {
              ...item,
              work: workData,
              artist: artistData,
              workImage:
                (await loadStorageImage(
                  workData.images && workData.images[0]
                )) + '',
              artistImage:
                (await loadStorageImage(artistData.profilePicture)) + '',
              price,
            };
          })();
        })
      );
      setCartWorks(data);
    })();
  }, [cart]);

  const subtotal = useMemo(
    () => cartWorks.reduce((sum, item) => sum + item.price, 0),
    [cartWorks]
  );
  return (
    <div tw="max-w-[572px] w-full pl-12 bg-[#FAFAFA]">
      <div tw="max-h-[100vh] pt-16 pb-[100px] flex flex-col">
        <div tw="overflow-auto pb-9" className={scrollStyle['workInfo']}>
          {cartWorks
            .sort((a, b) => a.artist.username.localeCompare(b.artist.username))
            .map((data, i, arr) => {
              const showProfile =
                i === 0 ||
                arr[i].artist.username !== arr[i - 1].artist.username;

              return (
                <div key={i} css={[i && showProfile && tw`mt-6`]}>
                  {showProfile && (
                    <div tw="flex items-center">
                      <div tw="w-[55px] h-[55px] relative overflow-hidden rounded-full flex items-center">
                        <Image
                          src={data.artistImage}
                          alt="profile_image"
                          layout="fill"
                          objectFit="cover"
                        />
                      </div>
                      <div tw="ml-[10px]">
                        <div tw="text-[16px] leading-[19px] font-semibold text-black">
                          {data.artist.name}
                        </div>
                        <div tw="mt-[2px] text-[14px] font-medium text-[#727373]">
                          {data.artist.location}
                        </div>
                      </div>
                    </div>
                  )}
                  <div tw="mt-4 flex items-center">
                    <div tw="relative w-[120px] h-[120px] flex items-center justify-center">
                      <Image
                        src={data.workImage}
                        alt="work image"
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                    <div tw="ml-4 self-start">
                      <div
                        tw="h-5 px-2 rounded-[52px] w-auto text-[12px] font-semibold inline-block"
                        css={[
                          data.type === 'print'
                            ? tw`bg-[#D8E8D8] text-[#222222]`
                            : tw`bg-[#FFE1E1] text-[#742F2F]`,
                        ]}
                      >
                        {data.type === 'print' ? 'Print' : 'Original'}
                      </div>
                      <div tw="text-[24px] italic text-[#696969] font-medium">
                        {data.work.title}
                      </div>
                    </div>
                    <div tw="ml-auto text-[20px] text-[#242424] font-semibold">
                      {formatPrice(data.price)}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
        {/* bottom panel */}
        <div>
          <div tw="h-[1px] bg-[#E3E3E3]" />
          <div tw="flex justify-between items-center mt-6 text-[20px] text-[#333333] font-semibold">
            <div>Subtotal</div>
            <div>{formatPrice(subtotal)}</div>
          </div>
          <div tw="flex justify-between items-center mt-3 font-semibold">
            <div tw="text-[20px] text-[#333333]">Shipping</div>
            <div tw="text-[16px] text-[#717171]">
              {shippingCost !== null
                ? formatPrice(shippingCost)
                : 'Calculated at next step'}
            </div>
          </div>
          <div tw="h-[1px] bg-[#E3E3E3] mt-6" />
          <div tw="flex justify-between items-center mt-6 text-[#333333] font-semibold">
            <div tw="text-[20px]">Total</div>
            <div tw="text-[28px]">
              {shippingCost !== null ? (
                formatPrice(subtotal + shippingCost)
              ) : (
                <>
                  {formatPrice(subtotal)}
                  <span tw="text-[16px]">{' + shipping'}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckoutCart;
