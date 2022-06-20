import { FirebaseStorage } from '@firebase/storage';
import { ref, StorageError, uploadBytesResumable } from 'firebase/storage';

/**
 * Uploads an image to firebase.
 * @param storage - FirebaseStorage object, from getFirebase(app)
 * @param file - The `File` to upload.
 * @param pathPrefix - The location to upload the file in. Include a trailing slash. The file will be uploaded to `${pathPrefix}${file.name}`
 * @returns fileRef - A string representing the firebase storage reference to the file (gs://...)
 */
export default async function uploadImage(
  storage: FirebaseStorage,
  file: File,
  pathPrefix: string
): Promise<string> {
  try {
    const uploadRef = await uploadBytesResumable(
      ref(
        storage,
        // prefix the file name with the current time (precise to the seconds), to avoid duplicates
        pathPrefix + Math.floor(new Date().getTime() * 1000) + file.name
      ),
      file
    );
    return uploadRef.ref.toString();
  } catch (error) {
    alert('An error occurred: ' + (error as StorageError).message);
    throw new Error();
  }
}
