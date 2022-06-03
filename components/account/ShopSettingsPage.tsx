import Image from 'next/image';
import { getApp } from 'firebase/app';
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { loadStorageImage } from '../../helpers/FirebaseFunctions';
import tw from 'twin.macro';
import React, { useCallback, useEffect, useState } from 'react';
import useAuth from '../../utils/useAuth';
import useRequireOnboarding from '../../utils/useRequireOnboarding';
import { ArtistData } from '../../types/dbTypes';

export default function ShopSettingsPage() {
  useRequireOnboarding();
  const [data, setData] = useState<
    | (ArtistData & {
        profilePictureURL: string;
        coverImageURL: string;
      })
    | undefined
  >();
  const [artistId, setArtistId] = useState('');
  const { user, loading } = useAuth();
  useEffect(() => {
    console.log(loading, user);
    if (loading || !user) {
      return;
    } else {
      // determine the stage of the user
      (async () => {
        // check if a profile already exists
        const app = getApp();
        const db = getFirestore(app);

        const artistsRef = collection(db, 'artists');
        const q = query(artistsRef, where('associatedUser', '==', user.uid));

        const ref = await getDocs(q);

        ref.forEach((snapshot) => {
          setArtistId(snapshot.id); // assumes that there will only be one result
          const artist = snapshot.data() as ArtistData;
          (async () => {
            setData({
              ...artist,
              profilePictureURL: await loadStorageImage(artist.profilePicture),
              coverImageURL: await loadStorageImage(artist.coverImage),
            });
            setKeyCounter(artist.faqs?.length || 0);
            setFirebaseFAQs(
              (artist.faqs || []).map((faq, i) => ({
                ...faq,
                key: i,
              })) || []
            );
            setFirebaseShippingData({
              shippingReturnPolicies: artist.shippingReturnPolicies || '',
              shippingProcessingTime: artist.shippingProcessingTime || '',
            });
            setShippingReturnPolicies(artist.shippingReturnPolicies || '');
            setProcessingTime(artist.shippingProcessingTime || '');
            setInputFAQs(
              (
                (artist.faqs as { question: string; answer: string }[]) || []
              ).map((faq, i) => ({
                ...faq,
                key: i,
              }))
            );
          })();
        });
      })();
    }
  }, [loading, user]);

  const isDataModified = useCallback(
    (values: {
      name: string;
      location: string;
      discipline: string;
      bio: string;
    }) => {
      return (
        !data ||
        values.name !== data.name ||
        values.location !== data.location ||
        values.discipline !== data.discipline ||
        values.bio !== data.bio
      );
    },
    [data]
  );
  const [firebaseFAQs, setFirebaseFAQs] = useState<
    { question: string; answer: string; key: number }[]
  >([]);
  const [inputFAQs, setInputFAQs] = useState<
    { question: string; answer: string; key: number }[]
  >([]);
  const styles = {
    label: tw`text-[16px] text-[#8B8B8B] text-right mt-[10px]`,
    input: tw`border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]`,
  };
  const [keyCounter, setKeyCounter] = useState(0);
  const [savingFAQs, setSavingFAQs] = useState(false);

  const [savingShipping, setSavingShipping] = useState(false);
  const [shippingReturnPolicies, setShippingReturnPolicies] =
    useState('Loading...');
  const [processingTime, setProcessingTime] = useState('Loading...');
  const [firebaseShippingData, setFirebaseShippingData] = useState<{
    shippingProcessingTime: string;
    shippingReturnPolicies: string;
  }>({
    shippingProcessingTime: 'Loading...',
    shippingReturnPolicies: 'Loading...',
  });

  return (
    <div tw="ml-[76px] mt-9 mb-[100px]">
      {!data && <p>Loading...</p>}
      {data && (
        <>
          <div tw="font-semibold mt-12 text-[20px]">Shipping & Returns</div>
          <div tw={'mt-6'}>
            <div tw={'font-bold mb-1'}>Processing Time</div>
            <p tw={'text-gray-500 italic mb-2'}>
              How many days does it take for you to ship an order once you
              receive it? (e.g. &quot;3 - 5 Business Days&quot;)
            </p>
            <input
              disabled={savingShipping}
              type="input"
              name="location"
              css={styles.input}
              value={processingTime}
              placeholder={'e.g. 3 - 5 Business Days'}
              onChange={(e) => setProcessingTime(e.target.value)}
            />
            <div tw={'mt-4'}>
              <div tw={'font-bold mb-1'}>Return Policy</div>
              <p tw={'text-gray-500 italic mb-2'}>
                e.g. &quot;I do not accept returns&quot; or &quot;I accept
                returns within 30 days of purchase. Buyer pays return
                shipping.&quot;
              </p>
              <textarea
                disabled={savingShipping}
                rows={3}
                name="bio"
                css={[styles.input, tw`w-[710px] h-[90px] py-2`]}
                value={shippingReturnPolicies}
                onChange={(e) => setShippingReturnPolicies(e.target.value)}
              />
            </div>
            {(firebaseShippingData.shippingReturnPolicies !==
              shippingReturnPolicies ||
              firebaseShippingData.shippingProcessingTime !==
                processingTime) && (
              <div>
                <input
                  disabled={savingShipping}
                  onClick={async () => {
                    setSavingShipping(true);
                    if (!artistId) return;
                    const app = getApp();
                    const db = getFirestore(app);
                    await updateDoc(doc(db, 'artists', artistId), {
                      shippingReturnPolicies,
                      shippingProcessingTime: processingTime,
                    } as Partial<ArtistData>);
                    setFirebaseShippingData({
                      shippingReturnPolicies,
                      shippingProcessingTime: processingTime,
                    });
                    setSavingShipping(false);
                  }}
                  type="button"
                  value={savingShipping ? 'Saving...' : 'Save'}
                  tw="inline-block h-[40px] relative text-white bg-theme-red rounded-[6px] px-4 py-1 cursor-pointer hover:bg-[#be4040]"
                />
                <button
                  disabled={savingShipping}
                  onClick={() => {
                    {
                      setShippingReturnPolicies(
                        firebaseShippingData.shippingReturnPolicies
                      );
                      setProcessingTime(
                        firebaseShippingData.shippingProcessingTime
                      );
                    }
                  }}
                  tw="inline-block h-[40px] w-40 border border-[#D8D8D8] rounded-[6px] pl-4 pr-3 text-[#3C3C3C] text-[16px] ml-4 items-center hover:bg-[#F5F5F5]"
                >
                  Discard Changes
                </button>
              </div>
            )}
          </div>
          <div tw="font-semibold mt-12 text-[20px]">
            Frequently Asked Questions
          </div>
          <div tw="w-full mt-6 grid grid-cols-[115px 450px] gap-x-7 gap-y-6">
            {inputFAQs.length === 0 && (
              <>
                <div />
                <p>
                  <i>You have no FAQs yet.</i>
                </p>
              </>
            )}
            {inputFAQs.map(({ question, answer, key }, i) => (
              <React.Fragment key={key}>
                <div css={styles.label}>Question</div>

                <input
                  disabled={savingFAQs}
                  type="input"
                  name="location"
                  css={styles.input}
                  value={inputFAQs[i].question}
                  onChange={(e) => {
                    setInputFAQs((state) => {
                      const newState = state.slice();
                      newState[i].question = e.target.value;
                      return newState;
                    });
                  }}
                />

                <div css={styles.label}>Answer</div>

                <textarea
                  disabled={savingFAQs}
                  rows={3}
                  name="bio"
                  css={[styles.input, tw`w-[710px] h-[90px] py-2`]}
                  value={inputFAQs[i].answer}
                  onChange={(e) => {
                    setInputFAQs((state) => {
                      const newState = state.slice();
                      newState[i].answer = e.target.value;
                      return newState;
                    });
                  }}
                />

                <div />
                <div tw={'mb-8'}>
                  <a
                    onClick={() => {
                      setInputFAQs((state) => [
                        ...state.slice(0, i - 1),
                        state[i],
                        state[i - 1],
                        ...state.slice(i + 1),
                      ]);
                    }}
                    css={[
                      i !== 0
                        ? tw`text-blue-600 hover:underline cursor-pointer`
                        : 'text-gray-800',
                    ]}
                  >
                    Move Up
                  </a>
                  {' | '}
                  <a
                    onClick={() => {
                      setInputFAQs((state) => [
                        ...state.slice(0, i),
                        state[i + 1],
                        state[i],
                        ...state.slice(i + 2),
                      ]);
                    }}
                    css={[
                      i !== inputFAQs.length - 1
                        ? tw`text-blue-600 hover:underline cursor-pointer`
                        : 'text-gray-800',
                    ]}
                  >
                    Move Down
                  </a>
                  {' | '}
                  <a
                    onClick={() => {
                      setInputFAQs((state) => [
                        ...state.slice(0, i),
                        ...state.slice(i + 1),
                      ]);
                    }}
                    css={tw`text-blue-600 hover:underline cursor-pointer`}
                  >
                    Delete
                  </a>
                </div>
              </React.Fragment>
            ))}
            <div />
            <button
              onClick={() => {
                {
                  setInputFAQs((state) => [
                    ...state,
                    { question: '', answer: '', key: keyCounter },
                  ]);
                  setKeyCounter((s) => s + 1);
                }
              }}
              tw="h-[40px] w-40 border border-[#D8D8D8] rounded-[6px] pl-4 pr-3 text-[#3C3C3C] text-[16px] flex items-center hover:bg-[#F5F5F5]"
            >
              <Image
                src="/assets/svgs/plus.svg"
                alt="add education"
                width="15px"
                height="15px"
              />
              <div tw="ml-2">Add Question</div>
            </button>
            {(inputFAQs.length !== firebaseFAQs.length ||
              !inputFAQs.every(
                ({ question, answer }, i) =>
                  question === firebaseFAQs[i].question &&
                  answer === firebaseFAQs[i].answer
              )) && (
              <>
                <div />
                <div>
                  <input
                    disabled={savingFAQs}
                    onClick={async () => {
                      setSavingFAQs(true);
                      const app = getApp();
                      const db = getFirestore(app);
                      await updateDoc(doc(db, 'artists', artistId), {
                        faqs: inputFAQs
                          .filter((item) => item.question || item.answer)
                          .map((item) => ({
                            question: item.question,
                            answer: item.answer,
                            // strip key
                          })),
                      });
                      setInputFAQs((s) =>
                        s.filter((item) => item.question || item.answer)
                      );
                      setFirebaseFAQs(
                        inputFAQs.filter((item) => item.question || item.answer)
                      );
                      setSavingFAQs(false);
                    }}
                    type="button"
                    value={savingFAQs ? 'Saving...' : 'Save'}
                    tw="inline-block h-[40px] relative text-white bg-theme-red rounded-[6px] px-4 py-1 cursor-pointer hover:bg-[#be4040]"
                  />
                  <button
                    disabled={savingFAQs}
                    onClick={() => {
                      {
                        setInputFAQs(firebaseFAQs);
                        setKeyCounter((s) => s + 1);
                      }
                    }}
                    tw="inline-block h-[40px] w-40 border border-[#D8D8D8] rounded-[6px] pl-4 pr-3 text-[#3C3C3C] text-[16px] ml-4 items-center hover:bg-[#F5F5F5]"
                  >
                    Discard Changes
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
