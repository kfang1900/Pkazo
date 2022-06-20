import { getApp } from 'firebase/app';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
import {
  doc,
  getDoc,
  getDocs,
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
  try {
    const app = getApp();
    const storage = getStorage(app);
    return await getDownloadURL(ref(storage, url));
  } catch (e) {
    throw e;
  }
};

const loadStorageImages = async (photoURLs: string[]) =>
  Promise.all(photoURLs.map((url) => loadStorageImage(url)));

const fetchArtistByID = async (artistref: string) => {
  console.log('Fetching artist ', artistref);
  let app = getApp();
  let db = getFirestore(app);
  const docRef = doc(db, 'artists', artistref);
  const docSnap = await getDoc(docRef);
  return docSnap;
};

const fetchWorkByID = async (workref: string) => {
  let app = getApp();
  //Get that document from the database
  let db = getFirestore(app);
  const docRef = doc(db, 'works', workref);
  const docSnap = await getDoc(docRef);
  return docSnap;
};
/**
 * @deprecated
 */
const getPortfolioHelper = async (docRef: QuerySnapshot<DocumentData>) => {
  console.warn('Deprecated function used: getPortfolioHelper');

  let Portfolios: DocumentData[] = [];
  let Works: DocumentData[][] = [];
  let PortfolioImages: string[] = [];
  let WorkImages: string[][] = [];
  let curPos = 0;
  const promises: Promise<void>[] = [];
  docRef.forEach((element) => {
    promises.push(
      (async () => {
        Portfolios.push(element.data());
        curPos = Portfolios.length - 1;
        //console.log(curPos,Portfolios)
        const portImageURL = await loadStorageImage(element.data().picture);
        PortfolioImages.push(portImageURL);
        let subworks: DocumentData[] = [];
        let subworkImages: string[] = [];
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

            const workImage = await loadStorageImage(
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

  let app = getApp();
  let db = getFirestore(app);
  const q = await query(collection(db, 'artists', artistref, 'portfolios'));
  const docRef = await getDocs(q);
  let dex = 0;
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
  let app = getApp();
  let db = getFirestore(app);
  const q = await query(collection(db, 'artists', artistref, 'portfolios'));
  const docRef = await getDocs(q);
  let arr: string[] = [];
  let arr2: string[] = [];
  docRef.forEach((element) => {
    arr.push(element.data().name);
    arr2.push(element.id);
  });
  return [arr, arr2];
};

export {
  getPortfolioByRef,
  fetchWorkByID,
  loadStorageImage,
  loadStorageImages,
  fetchArtistByID,
  getPortfolioImagesOnlyByRef,
};
export default { defaultString };
