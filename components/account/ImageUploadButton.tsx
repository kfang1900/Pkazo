import {
  getStorage,
  ref,
  StorageError,
  StorageReference,
  uploadBytesResumable,
} from 'firebase/storage';
import { getApp } from 'firebase/app';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';
import { loadStorageImage } from '../../helpers/FirebaseFunctions';
import Image from 'next/image';
import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';

export default function ImageUploadButton({
  onUploadComplete,
  onError,
  uploadLocation,
  offset,
}: {
  /**
   * Called after the image has successfully been uploaded to firebase storage.
   * @param uploadRef -- a reference to the uploaded file.
   */
  onUploadComplete: (uploadRef: StorageReference) => void;
  /**
   * Called if an error occurs.
   * @param error -- the error object passed from firebase.
   */
  onError: (error: StorageError) => void;
  /**
   * The folder in which to upload the image. Do not include a trailing slash.
   * e.g. Artists/VWOgAFjhL0BlFlbDTJZF/Cover_Photo
   */
  uploadLocation: string;
  /**
   * Number of pixels to offset buttom from bottom right corner of container. Default: 12 (equivalent to "right-3 bottom-3" in tailwind)
   */
  offset?: number;
}) {
  const [uploading, setUploading] = useState(false);
  return (
    <button
      onClick={() => {
        const input = document.createElement('input');
        input.type = 'file';

        input.onchange = (e: Event) => {
          if (!(e?.target as any)?.files) return;
          const file = (e.target as any).files[0];
          setUploading(true);

          const storage = getStorage();

          const storageRef = ref(storage, uploadLocation + '/' + file.name);
          const uploadTask = uploadBytesResumable(storageRef, file);

          // Listen for state changes, errors, and completion of the upload.
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              // const progress =
              //   (snapshot.bytesTransferred /
              //     snapshot.totalBytes) *
              //   100;
              // console.log('Upload is ' + progress + '% done');
            },
            (error) => {
              setUploading(false);
              onError(error);
            },
            async () => {
              await onUploadComplete(uploadTask.snapshot.ref);
              setUploading(false);
            }
          );
        };

        input.click();

        return;
      }}
      tw={
        'absolute w-[34px] h-[34px] rounded-full bg-black opacity-70 hover:opacity-60'
      }
      style={{
        right: offset ?? 12,
        bottom: offset ?? 12,
      }}
    >
      {!uploading ? (
        <div tw="mt-1">
          <Image
            src="/assets/svgs/camera.svg"
            alt="edit pfp"
            width="18px"
            height="18px"
          />
        </div>
      ) : (
        <svg
          tw="animate-spin h-5 w-5 mx-auto my-auto text-white"
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
  );
}
