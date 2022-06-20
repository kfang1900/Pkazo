import React, { useCallback, useEffect, useMemo, useState } from 'react';
import tw from 'twin.macro';
import Image from 'next/image';
import useAuth from '../../utils/auth/useAuth';
import { getApp } from 'firebase/app';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getDocs,
  getFirestore,
  QueryDocumentSnapshot,
  QuerySnapshot,
  updateDoc,
} from 'firebase/firestore';
import { ArtistData, PortfolioData, WorkData } from '../../types/dbTypes';
import { loadStorageImage } from '../../helpers/FirebaseFunctions';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import UploadWork from '../uploading/UploadWork';
import ImageUploadButton from '../account/ImageUploadButton';
import uploadImage from '../../utils/firebase/uploadImage';

export default function EditProfilePage() {
  const styles = {
    label: tw`text-[16px] text-[#8B8B8B] text-right mt-[10px]`,
    input: tw`border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]`,
  };
  const [activePortfolioID, setActivePortfolioID] = useState<string>('');
  const { user, artistData, artistId } = useAuth();
  const [portfolios, setPortfolios] = useState<
    {
      id: string;
      portfolioData: PortfolioData;
      imageURL: string;
      workData: (WorkData & { id: string; imageURL: string })[];
    }[]
  >([]);
  useEffect(() => {
    if (!artistId) return;
    (async () => {
      //
      const app = getApp();
      const db = getFirestore(app);
      const storage = getStorage(app);
      const portfoliosSnapshot = await getDocs(
        collection(db, 'artists', artistId + '', 'portfolios')
      );
      const _portfolios = await Promise.all(
        portfoliosSnapshot.docs.map((portfolioSnapshot) =>
          (async () => {
            const data = portfolioSnapshot.data() as PortfolioData;
            const imageURL = await getDownloadURL(ref(storage, data.picture));
            const workData = await Promise.all(
              data.works.map((workId) =>
                getDoc(doc(db, 'works', workId)).then((workSnapshot) => {
                  if (!workSnapshot.data()) {
                    throw new Error('Unable to load data for work: ' + workId);
                  }
                  const workData = workSnapshot.data() as WorkData;
                  return (async () => {
                    return {
                      ...workData,
                      id: workSnapshot.id,
                      imageURL:
                        workData.images && workData.images.length > 0
                          ? await getDownloadURL(
                              ref(storage, workData.images[0])
                            )
                          : '/unable to load image url',
                    };
                  })();
                })
              )
            );

            return {
              id: portfolioSnapshot.id,
              portfolioData: data,
              imageURL,
              workData,
            };
          })()
        )
      );
      setPortfolios(_portfolios);
    })();
  }, [artistId]);
  const activePortfolio = useMemo(
    () => portfolios.find((p) => p.id === activePortfolioID),
    [activePortfolioID, portfolios]
  );
  // change this later
  // const portfolios = [
  //   '/assets/images/kevin_fang.jpg',
  //   '/assets/images/kevin_fang.jpg',
  //   '/assets/images/kevin_fang.jpg',
  //   '/assets/images/kevin_fang.jpg',
  // ];
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const titleDescriptionHasChanges = useMemo(
    () =>
      !activePortfolio ||
      name !== activePortfolio.portfolioData.name ||
      description !== activePortfolio.portfolioData.description,
    [name, description, activePortfolio, portfolios]
  );
  const [showUploadEditWorkModal, setShowUploadEditWorkModal] = useState(false);
  const [newPortfolioImageFile, setNewPortfolioImageFile] =
    useState<File | null>(null);

  const [createNewPortfolioMode, setCreateNewPortfolioMode] = useState(false);
  const [newPortfolioLoading, setNewPortfolioLoading] = useState(false);
  // if empty, then the modal will be on create mode
  const [currentlyEditingWork, setCurrentlyEditingWork] = useState('');

  return (
    <div tw="w-full">
      {showUploadEditWorkModal && (
        <UploadWork
          onClose={() => setShowUploadEditWorkModal(false)}
          workId={currentlyEditingWork}
        />
      )}
      {/* portfolio circles */}
      <div
        tw="mx-auto flex items-center justify-between mt-[60px]"
        style={{
          maxWidth: `${180 * Math.max(5, portfolios.length + 1) - 52}px`,
        }}
      >
        {portfolios.map(({ id, imageURL, portfolioData, workData }) => (
          <button
            key={id}
            onClick={() => {
              setActivePortfolioID(activePortfolioID === id ? '' : id);
              setName(portfolioData.name);
              setDescription(portfolioData.description);
              setCreateNewPortfolioMode(false);
            }}
          >
            <div
              css={[
                tw`relative rounded-full overflow-hidden border-transparent`,
                activePortfolioID === id && tw`border-[#C6C5C3]`,
                tw`w-[128px] h-[128px] border-[6px]`,
              ]}
            >
              <Image
                src={imageURL}
                alt="portfolio image"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </button>
        ))}
        {portfolios.length < 5 && (
          <button
            onClick={() => {
              setName('');
              setDescription('');
              setCreateNewPortfolioMode(true);
            }}
            tw="w-[116px] h-[116px] bg-[#F3F3F3] hover:bg-[#E8E8E8] rounded-full flex items-center justify-center"
          >
            <svg
              width="37"
              height="38"
              viewBox="0 0 37 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="15.9736"
                y="0.656006"
                width="5.77619"
                height="36.6864"
                rx="2.8881"
                fill="#C4C4C4"
              />
              <rect
                x="0.811523"
                y="22.2336"
                width="5.86982"
                height="36.1012"
                rx="2.93491"
                transform="rotate(-90 0.811523 22.2336)"
                fill="#C4C4C4"
              />
            </svg>
          </button>
        )}
      </div>
      {!activePortfolio && (
        <p tw={'w-full text-center my-20 italic'}>
          Select a portfolio above to edit it.
        </p>
      )}
      {/* current portfolio */}
      {(createNewPortfolioMode || activePortfolio) && (
        <div tw="w-full flex flex-col items-center mt-[52px] gap-y-10">
          {/*<div tw="relative rounded-full overflow-hidden w-[100px] h-[100px]">*/}
          {/*  <Image*/}
          {/*    src={*/}
          {/*      createNewPortfolioMode*/}
          {/*        ? 'http://s'*/}
          {/*        : activePortfolio?.imageURL || 'http://s'*/}
          {/*    }*/}
          {/*    alt="current portfolio"*/}
          {/*    layout="fill"*/}
          {/*    objectFit="cover"*/}
          {/*  />*/}
          {/*</div>*/}
          <div tw="w-[132px] h-[132px] relative">
            <div tw="overflow-hidden rounded-full flex items-center ">
              {activePortfolio?.imageURL ? (
                <Image
                  src={activePortfolio.imageURL}
                  alt="current portfolio"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <div tw={'bg-gray-200 w-[132px] h-[132px]'} />
              )}
            </div>
            <ImageUploadButton
              offset={0}
              localOnly
              onChange={(f) => setNewPortfolioImageFile(f)}
              loading={newPortfolioLoading}
            />
          </div>
          <div tw="flex items-center gap-x-7">
            <div tw="text-[16px] text-[#838383]">Title</div>
            <input
              tw="w-[400px] h-10 border border-[#D8D8D8] focus:border-[#888888] rounded-[6px] px-4 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div tw="flex items-start gap-x-7">
            <div tw="text-[16px] text-[#838383] leading-10">Description</div>
            <textarea
              tw="w-[700px] border border-[#D8D8D8] focus:border-[#888888] rounded-[6px] px-4 py-2 outline-none resize-none"
              rows={6}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {(createNewPortfolioMode || titleDescriptionHasChanges) && (
            <div>
              <input
                onClick={() => {
                  (async () => {
                    setSaving(true);
                    const db = getFirestore();
                    const storage = getStorage();
                    if (createNewPortfolioMode) {
                      const newPortfolioId = (
                        await addDoc(
                          collection(
                            db,
                            'artists',
                            artistId + '',
                            'portfolios'
                          ),
                          {
                            name: name,
                            description: description,
                            works: [],
                          } as Partial<PortfolioData>
                        )
                      ).id;
                      // await uploadImage(
                      //   storage,
                      //   image.file,
                      //   `/Artists/${newPortfolioId}/`
                      // );
                    } else {
                      if (!activePortfolio) {
                        throw new Error('active portfolio is undefined');
                      }
                      await updateDoc(
                        doc(
                          db,
                          'artists',
                          artistId + '',
                          'portfolios',
                          activePortfolio.id + ''
                        ),
                        {
                          name: name,
                          description: description,
                        }
                      );
                      setPortfolios((p) =>
                        p.map((p) =>
                          p.id !== activePortfolioID
                            ? p
                            : {
                                ...p,
                                portfolioData: {
                                  ...p.portfolioData,
                                  name: name,
                                  description: description,
                                },
                              }
                        )
                      );
                    }

                    console.log('SAVED', name, description);
                    setSaving(false);
                  })();
                }}
                type="button"
                disabled={saving}
                value={saving ? 'Saving...' : 'Save'}
                css={[
                  tw`h-9 w-20 relative -top-0.5 text-white rounded-[6px] px-4 py-1 cursor-pointer`,
                  saving ? tw`bg-red-400` : tw`bg-theme-red hover:bg-[#be4040]`,
                ]}
              />
              <button
                tw="ml-5 h-9 w-24 border border-[#D8D8D8] rounded-[6px] px-4 text-[#3C3C3C] text-[16px] hover:bg-[#F5F5F5]"
                disabled={saving}
                onClick={() => {
                  if (activePortfolio) {
                    setName(activePortfolio.portfolioData.name);
                    setDescription(activePortfolio.portfolioData.description);
                  } else {
                    setCurrentlyEditingWork('');
                  }
                }}
              >
                Cancel
              </button>
            </div>
          )}
          {activePortfolio && (
            <div tw="grid grid-cols-[repeat(6,124px)] gap-9 mb-10">
              {activePortfolio.workData.map((work) => (
                <button
                  key={work.id}
                  onClick={() => {
                    setCurrentlyEditingWork(work.id);
                    setShowUploadEditWorkModal(true);
                  }}
                  tw="cursor-pointer w-full h-[124px] rounded-[5px] relative overflow-hidden"
                >
                  <Image
                    src={work.imageURL}
                    alt="work"
                    layout="fill"
                    objectFit="cover"
                  />
                </button>
              ))}
              <button
                tw="w-[124px] h-[124px] bg-[#F3F3F3] hover:bg-[#E8E8E8] rounded-[5px] flex items-center justify-center"
                onClick={() => {
                  setCurrentlyEditingWork('');
                  setShowUploadEditWorkModal(true);
                }}
              >
                <svg
                  width="37"
                  height="38"
                  viewBox="0 0 37 38"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    x="15.9736"
                    y="0.656006"
                    width="5.77619"
                    height="36.6864"
                    rx="2.8881"
                    fill="#C4C4C4"
                  />
                  <rect
                    x="0.811523"
                    y="22.2336"
                    width="5.86982"
                    height="36.1012"
                    rx="2.93491"
                    transform="rotate(-90 0.811523 22.2336)"
                    fill="#C4C4C4"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
