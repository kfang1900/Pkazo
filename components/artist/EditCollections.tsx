import React, { useCallback, useEffect, useMemo, useState } from 'react';
import tw from 'twin.macro';
import Image from 'next/image';
import useAuth from '../../utils/auth/useAuth';
import Link from 'next/link';
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
import { PortfolioPopup } from '../onboarding/PortfolioSection';
import PortfolioWorkUpload from '../uploading/PortfolioWorkUpload';
import Modal from '../popups/Modal';
import { useMediaQuery } from 'react-responsive';

async function loadPortfolios(artistId: string) {
  const app = getApp();
  const db = getFirestore(app);
  const storage = getStorage(app);
  const portfoliosSnapshot = await getDocs(
    collection(db, 'artists', artistId + '', 'portfolios')
  );
  return Promise.all(
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
                      ? await getDownloadURL(ref(storage, workData.images[0]))
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
}
export default function EditCollections() {
  const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
  }, [mediaQuery, isMobile]);

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
      setPortfolios(await loadPortfolios(artistId));
    })();
  }, [artistId]);
  const activePortfolio = useMemo(
    () => portfolios.find((p) => p.id === activePortfolioID),
    [activePortfolioID, portfolios]
  );
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

  const defaultPortfolio: PortfolioData = {
    picture: '',
    name: '',
    description: '',
    works: [],
  };
  const [newPortfolio, setNewPortfolio] = useState<PortfolioData>({
    ...defaultPortfolio,
  });

  return (
    <div tw="w-full">
      {isMobile &&
        <div tw='sticky top-0 z-50 bg-white'>
          <div tw='flex items-center justify-between h-12 px-5'>
            <Link
              href={`/artist${window.location.search}`}
              passHref
            >

              <Image
                src='/assets/svgs/mobile/back.svg'
                width='11'
                height='18'
                alt='popup back'
                tw='cursor-pointer'
              />
            </Link>
            <div tw='text-[16px] text-black font-semibold'>Collections</div>
            <div />
          </div>
          <div tw='h-[0.5px] bg-[#E2E2E2] w-full' />
        </div>
      }
      {
        // portfolio, setPortfolio is useState<dbTypes/PortfolioData>
        <PortfolioPopup
          portfolio={newPortfolio}
          setPortfolio={setNewPortfolio}
          onSave={() => {
            // add portfolio to list of portfolios
            setCreateNewPortfolioMode(false);
          }}
          onCancel={() => setCreateNewPortfolioMode(false)}
          isMobile={isMobile}
          toShow={createNewPortfolioMode}
        />
      }
      {/* {createNewPortfolioMode && (
        <Modal open onClose={() => setCreateNewPortfolioMode(false)}>
          <PortfolioWorkUpload
            artistId={artistId + ''}
            userId={user?.uid}
            onClose={async (newPortfolio: { image: string; name: string }) => {
              await loadPortfolios(artistId + '');
              setCreateNewPortfolioMode(false);
            }}
          />
        </Modal>
      )} */}
      {showUploadEditWorkModal && (
        <UploadWork
          onClose={() => setShowUploadEditWorkModal(false)}
          workId={currentlyEditingWork}
        />
      )}
      {/* portfolio circles */}
      <div
        css={[isMobile ?
          tw`flex items-center gap-x-5 pl-5 py-6 overflow-x-auto` :
          tw`mx-auto w-full flex items-center justify-center gap-x-[36px] mt-[52px]`
        ]}
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
                tw`w-[64px] h-[64px] md:w-[112px] md:h-[112px] border-[4px]`,
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
              setNewPortfolio({ ...defaultPortfolio });
            }}
            tw="w-[60px] h-[60px] md:w-[108px] md:h-[108px] bg-[#F3F3F3] hover:bg-[#E8E8E8] rounded-full flex items-center justify-center"
          >
            <svg
              width={isMobile ? "20" : "37"}
              height={isMobile ? "20" : "38"}
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
      <div tw='h-[0.5px] bg-[#D8D8D8] w-full md:hidden' />
      {!activePortfolio && (
        <p tw={'w-full text-center my-10 md:my-20'}>
          Select a portfolio above to edit it.
        </p>
      )}
      {/* current portfolio */}
      {activePortfolio && (
        <div tw="w-full flex flex-col items-center mt-6 md:mt-[52px] gap-y-6 md:gap-y-10">
          <div tw="w-[80px] h-[80px] md:w-[100px] md:h-[100px] relative">
            <div tw="relative w-full h-full overflow-hidden rounded-full flex items-center ">
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
          {isMobile ?
            <div tw='w-full px-5'>
              <input
                tw="w-full h-10 border border-[#D8D8D8] focus:border-[#888888] rounded-[6px] px-3 outline-none"
                value={name}
                placeholder='Title'
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                tw="mt-4 w-full border border-[#D8D8D8] focus:border-[#888888] rounded-[6px] p-3 outline-none resize-none"
                rows={4}
                value={description}
                placeholder='(Optional) Write a description...'
                onChange={(e) => setDescription(e.target.value)}
              />
            </div> :
            <>
              <div tw="flex items-center gap-x-7">
                <div tw="text-[16px] text-[#838383]">Title</div>
                <input
                  tw="w-[350px] h-10 border border-[#D8D8D8] focus:border-[#888888] rounded-[6px] px-4 outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div tw="flex items-start gap-x-7">
                <div tw="text-[16px] text-[#838383] leading-10">Description</div>
                <textarea
                  tw="w-[550px] border border-[#D8D8D8] focus:border-[#888888] rounded-[6px] px-4 py-2 outline-none resize-none"
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </>
          }
          {titleDescriptionHasChanges && (
            <div>
              <input
                onClick={() => {
                  (async () => {
                    setSaving(true);
                    const db = getFirestore();
                    const storage = getStorage();

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
          <div
            tw="grid gap-4 justify-center md:gap-9 mb-10 w-full px-5"
            css={[isMobile ?
              tw`grid-cols-[repeat(auto-fill,minmax(72px, 1fr))]` :
              tw`grid-cols-[repeat(5,112px)]`]}
          >
            {activePortfolio.workData.map((work) => (
              <button
                key={work.id}
                onClick={() => {
                  setCurrentlyEditingWork(work.id);
                  setShowUploadEditWorkModal(true);
                }}
                tw="cursor-pointer w-full rounded-[5px] relative overflow-hidden"
              >
                <div tw='block pb-[100%]' />
                <Image
                  src={work.imageURL}
                  alt="work"
                  layout="fill"
                  objectFit="cover"
                />
              </button>
            ))}
            <button
              tw="w-full bg-[#F3F3F3] hover:bg-[#E8E8E8] rounded-[5px] flex items-center justify-center"
              onClick={() => {
                setCurrentlyEditingWork('');
                setShowUploadEditWorkModal(true);
              }}
            >
              <div tw='block pb-[100%]' />
              <svg
                width={isMobile ? "20" : "37"}
                height={isMobile ? "20" : "38"}
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
        </div>
      )}
    </div>
  );
}
