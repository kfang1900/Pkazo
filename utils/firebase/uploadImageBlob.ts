import { FirebaseStorage } from '@firebase/storage';
import { ref, StorageError, uploadBytesResumable } from 'firebase/storage';

const getFileBlob = async function (url: string) {
  const blob = await fetch(url).then((r) => r.blob());
  return blob;
};

/**
 * Uploads an image to firebase.
 * @param storage - FirebaseStorage object, from getFirebase(app)
 * @param blob - The blob url to upload.
 * @param pathPrefix - The location to upload the file in. Include a trailing slash. The file will be uploaded to `${pathPrefix}${file.name}`
 * @returns fileRef - A string representing the firebase storage reference to the file (gs://...)
 */
export default async function uploadImageBlob(
  storage: FirebaseStorage,
  file: string,
  pathPrefix: string,
  name: string
): Promise<string> {
  const blob = await getFileBlob(file);
  console.log('uploading blob ', blob);
  try {
    const uploadRef = await uploadBytesResumable(
      ref(
        storage,
        // prefix the file name with the current time (precise to the seconds), to avoid duplicates
        pathPrefix + Math.floor(new Date().getTime() * 1000) + name
      ),
      blob
    );
    return uploadRef.ref.toString();
  } catch (error) {
    alert('An error occurred: ' + (error as StorageError).message);
    throw new Error();
  }
}
