import { getApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import {
  doc,
  getDoc,
  getDocs,
  setDoc,
  getFirestore,
  QuerySnapshot,
  DocumentData,
  collection,
  query,
} from 'firebase/firestore';
import { urlObjectKeys } from 'next/dist/shared/lib/utils';

function defaultString<T>(arg: (param: string) => string) {
  return arg;
}

//Returns the Image URL as a string
const loadStorageImage = async (url: string) => {
  if (!url) {
    console.warn("Unable to load storage URL because URL wasn't provided");
    //return("Does not exist")
    //NOTE: commenting out next line to return null instead of throwing an error,
    //relaying error handling to front-end. Important for EditPortfolioPage.
    //If you rely on return type being only string, use loadStorageImageSafe
    //throw new Error("Didn't receive a valid URL");
    return null;
  }
  try {
    const app = getApp();
    const storage = getStorage(app);
    //console.log("Loading storage Image",url)
    return await getDownloadURL(ref(storage, url));
  } catch (e) {
    throw e;
  }
};

//Returns the Image URL as a string
const loadStorageImageSafe = async (url: string) => {
  if (!url) {
    //return("Does not exist")
    //NOTE: commenting out next line to return null instead of throwing an error,
    //relaying error handling to front-end. Important for EditPortfolioPage
    // throw new Error("Didn't receive a valid URL");
    return '';
  }
  try {
    const app = getApp();
    const storage = getStorage(app);
    //console.log("Loading storage Image",url)
    return await getDownloadURL(ref(storage, url));
  } catch (e) {
    throw e;
  }
};

const loadStorageImages = async (photoURLs: string[]) =>
  Promise.all(photoURLs.map((url) => loadStorageImageSafe(url)));

const fetchArtistByID = async (artistref: string) => {
  //console.log('Fetching artist ', artistref);
  const app = getApp();
  const db = getFirestore(app);
  const docRef = doc(db, 'artists', artistref);
  const docSnap = await getDoc(docRef);
  return docSnap;
};

const fetchWorkByID = async (workref: string) => {
  const app = getApp();
  //Get that document from the database
  const db = getFirestore(app);
  const docRef = doc(db, 'works', workref);
  const docSnap = await getDoc(docRef);
  return docSnap;
};
/**
 * @deprecated
 */
const getPortfolioHelper = async (docRef: QuerySnapshot<DocumentData>) => {
  console.warn('Deprecated function used: getPortfolioHelper');

  const Portfolios: DocumentData[] = [];
  const Works: DocumentData[][] = [];
  const PortfolioImages: string[] = [];
  const WorkImages: string[][] = [];
  let curPos = 0;
  const promises: Promise<void>[] = [];
  docRef.forEach((element) => {
    promises.push(
      (async () => {
        Portfolios.push(element.data());
        curPos = Portfolios.length - 1;
        //console.log(curPos,Portfolios)
        const portImageURL = await loadStorageImage(element.data().picture);
        if (portImageURL !== null) {
          PortfolioImages.push(portImageURL);
          const subworks: DocumentData[] = [];
          const subworkImages: string[] = [];
          await Promise.all(
            (element.data().works || []).map(async (workref: string) => {
              const workdata = await fetchWorkByID(workref);
              if (
                !workdata.data() ||
                !workdata.data()!.images ||
                workdata.data()!.images.length === 0
              ) {
                return;
              }
              //console.log("work information",workdata.data(),workdata.id)
              const workImage = await loadStorageImageSafe(
                workdata.data()!.images[0]
              );
              //console.log(Works,subworks)
              subworks.push({
                ...workdata.data()!,
                __id: workdata.id,
              });
              subworkImages.push(workImage!);
            })
          );
          Works.push(subworks);
          WorkImages.push(subworkImages);
        }
      })()
    );
  });
  await Promise.all(promises);
  const res = {
    Portfolios: Portfolios,
    Works: Works,
    PortfolioImages,
    WorkImages,
  };
  return res;
};
//Returns a Portfolio Preview Object of a specific portfolio
//{PortfolioName: Paintings, Works:[WorkPreviewObject1, WorkPreviewObject2...WorkPreviewObject8]}
/**
 * @deprecated
 */
const getPortfolioByRef = async (artistref: string) => {
  console.warn('Deprecated function used: getPortfolioByRef');

  const app = getApp();
  const db = getFirestore(app);
  //console.log("fetching portfolio collection of",artistref)
  const q = await query(collection(db, 'artists', artistref, 'portfolios'));
  const docRef = await getDocs(q);
  //console.log(docRef)
  const dex = 0;
  const res = await getPortfolioHelper(docRef);
  //console.log("returning res",res)
  return res;
};

//Get only the Portfolio Titles and Title Images
/**
 * @deprecated
 */
const getPortfolioImagesOnlyByRef = async (artistref: string) => {
  console.warn('Deprecated function used: getPortfolioImagesOnlyByRef');
  const app = getApp();
  const db = getFirestore(app);
  const q = await query(collection(db, 'artists', artistref, 'portfolios'));
  const docRef = await getDocs(q);
  const arr: string[] = [];
  const arr2: string[] = [];
  docRef.forEach((element) => {
    arr.push(element.data().name);
    arr2.push(element.id);
  });
  return [arr, arr2];
};

//Creates a user document with the same reference as the authentication id.
//returns that reference to be in sync.
const createUserWithID = async (
  uid: string,
  email: string,
  displayName: string
) => {
  const app = getApp();
  const db = getFirestore(app);
  await setDoc(doc(db, 'users', uid), {
    name: displayName,
    email: email,
  });
  return uid;
};
export {
  getPortfolioByRef,
  fetchWorkByID,
  loadStorageImage,
  loadStorageImages,
  fetchArtistByID,
  getPortfolioImagesOnlyByRef,
  loadStorageImageSafe,
  createUserWithID,
};
export default { defaultString };
