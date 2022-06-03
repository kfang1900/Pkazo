import React, { useEffect, useMemo, useState } from 'react';
import tw from 'twin.macro';

import Image from 'next/image';
import { FileUploader } from 'react-drag-drop-files';
import { getApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  StorageReference,
  uploadBytesResumable,
} from 'firebase/storage';
import { loadStorageImage } from '../../helpers/FirebaseFunctions';
import { PortfolioData, WorkData } from '../../types/dbTypes';
function uploadFile(pathPrefix: string, file: File): Promise<StorageReference> {
  return new Promise((res, rej) => {
    const storage = getStorage();

    const storageRef = ref(storage, pathPrefix + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        /*noop*/
      },
      (error) => {
        rej(error);
      },
      async () => {
        res(uploadTask.snapshot.ref);
      }
    );
  });
}
export default function PortfolioWorkUpload({
  artistId,
  userId,
  onClose,
}: {
  artistId: string;
  userId?: string;
  onClose: (portfolio: { name: string; image: string }) => void;
}) {
  const [uploadedImages, setUploadedImages] = useState<
    { file: File; url: string }[]
  >([]);

  const [portfolioImage, setPortfolioImage] = useState<File | null>(null);
  const [portfolioImageDataURL, setPortfolioImageDataURL] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  useEffect(() => {
    (async () => {
      const dataURL = await new Promise<string>((res, rej) => {
        const reader = new FileReader();

        if (portfolioImage) {
          reader.readAsDataURL(portfolioImage);
        }
        reader.addEventListener(
          'load',
          function () {
            res(reader.result + '');
          },
          false
        );
      });
      setPortfolioImageDataURL(dataURL);
    })();
  }, [portfolioImage]);
  return (
    <div tw={'flex flex-col h-full w-full'}>
      <div tw="flex flex-row w-full">
        <div tw="w-[180px] h-[180px] relative">
          <div
            css={[
              tw`overflow-hidden rounded-full flex items-center`,
              portfolioImageDataURL ? `` : tw`border-dashed	border-[6px]`,
            ]}
          >
            {portfolioImageDataURL ? (
              <Image
                src={portfolioImageDataURL}
                alt="profile_image"
                width="180px"
                height="180px"
                objectFit="cover"
              />
            ) : (
              <div
                style={{
                  width: 180,
                  height: 180,
                }}
              />
            )}
          </div>
          <button
            onClick={() => {
              if (uploading) return;
              const input = document.createElement('input');
              input.type = 'file';

              input.onchange = (e: Event) => {
                if (!(e?.target as any)?.files) return;
                const file = (e.target as any).files[0];
                setPortfolioImage(file);
              };

              input.click();

              return;
            }}
            tw={
              'absolute w-[34px] h-[34px] rounded-full bg-black opacity-70 hover:opacity-60'
            }
            style={{
              right: 20,
              bottom: 20,
            }}
          >
            <div tw="mt-1">
              <Image
                src="/assets/svgs/camera.svg"
                alt="edit"
                width="18px"
                height="18px"
              />
            </div>
          </button>
        </div>
        <div tw={'ml-4 w-full'}>
          <div tw="mt-2.5 mb-1.5">
            <input
              disabled={uploading}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              tw="block w-full h-11 rounded-[10px] border border-light-300 py-1 px-4 text-sm text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:py-2 md:text-lg"
            />
          </div>
          <div tw="my-1.5">
            <textarea
              disabled={uploading}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional: write a description..."
              tw="block w-full h-32 rounded-[10px] border border-light-300 py-1 px-4 text-sm text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:py-2 md:text-lg"
            />
          </div>
        </div>
      </div>
      <div tw="max-w-[800px] w-full px-[40px] mx-auto">
        <div tw="text-lg text-[#8B8B8B] my-5">
          Upload the works that belong in this portfolio. For now, only one
          image per work.{' '}
        </div>

        <div tw="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {uploadedImages.map((image, i) => (
            <div
              key={i}
              tw="w-full transform rounded-md overflow-hidden bg-gray-200 cursor-pointer mb-4"
              css={[{ 'aspect-ratio': '1/1' }]}
            >
              <Image
                src={image.url}
                layout="fill"
                objectFit="cover"
                alt="Uploaded Image"
              />
            </div>
          ))}
        </div>
      </div>
      <div tw="flex items-center justify-center px-[40px] max-w-[1000px] mt-12 mb-6 mx-auto ">
        <FileUploader
          multiple={true}
          handleChange={(files: File[]) => {
            if (uploading) return;
            setUploadedImages((state) => [
              ...state,
              ...Array(...files).map((f) => ({
                file: f,
                url: URL.createObjectURL(f),
              })),
            ]);
          }}
          name="file"
          types={['JPG', 'JPEG', 'PNG', 'SVG']}
        >
          <div tw="text-lg text-[#65676B] border-[#D8D8D8] border-[3px] border-dashed cursor-pointer px-16 py-8 rounded-[7px]">
            <b>Upload</b> or <b>Drag and Drop</b> works from computer
          </div>
        </FileUploader>
      </div>
      <div>
        <div tw="px-[40px] flex items-center text-white text-lg justify-start bottom-10 absolute right-10">
          {error && <p tw={'text-soft-red mr-5'}>{error}</p>}
          <button
            disabled={uploading}
            onClick={async () => {
              if (uploading) return;
              setError('');
              if (!userId) return;
              if (!portfolioImage) {
                console.log(portfolioImage, 213);
                setError(
                  'Please upload a portfolio image in the top right corner.'
                );
                return;
              }
              if (!title) {
                setError('Please enter a title.');
                return;
              }
              setUploading(true);
              const app = getApp();
              const db = getFirestore(app);

              const portfolioRef = await addDoc(
                collection(db, 'artists', artistId, 'portfolios'),
                {
                  name: title,
                  description: description,
                } as Partial<PortfolioData>
              );

              const portfolioId = portfolioRef.id;
              const portfolioImageRef = await uploadFile(
                `/Artists/${artistId}/Portfolios/${portfolioId}/Cover/`,
                portfolioImage
              );
              const uploadedWorkIds = await Promise.all(
                uploadedImages
                  .map((i) => i.file)
                  .map(async (file) => {
                    const workRef = await addDoc(collection(db, 'works'), {
                      timestamp: serverTimestamp() as Timestamp,
                      artist: artistId,
                      title: '',
                      description: '',
                      images: [],
                      portfolio: '',
                      year: new Date().getFullYear(),
                      medium: '',
                      surface: '',
                      height: 0,
                      width: 0,
                      units: 'in',
                      forSale: false,
                      forPrint: false,
                    } as WorkData);
                    const workId = workRef.id;
                    const fileRef = await uploadFile(`/Works/${workId}/`, file);
                    await updateDoc(doc(db, 'works', workId), {
                      images: [fileRef.toString()],
                    });
                    return workId;
                  })
              );
              await updateDoc(
                doc(db, 'artists', artistId, 'portfolios', portfolioId),
                {
                  works: uploadedWorkIds,
                  picture: portfolioImageRef.toString(),
                } as Partial<PortfolioData>
              );
              setUploading(false);
              const loadedPortfolioImage = await loadStorageImage(
                portfolioImageRef.toString()
              );
              onClose({
                name: title,
                image: loadedPortfolioImage,
              });
            }}
            css={[
              tw`py-2.5 px-8 mx-auto my-0 rounded-full  font-bold cursor-pointer`,
              !uploading
                ? tw`bg-[#E24E4D] hover:bg-[#BE4040]`
                : tw`bg-[#ED9191]`,
            ]}
          >
            <span css={uploading ? tw`mr-5` : ''}>
              {uploading ? 'Uploading...' : 'Next'}
            </span>
            {uploading && (
              <svg
                tw="inline-block animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  tw="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  tw="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
