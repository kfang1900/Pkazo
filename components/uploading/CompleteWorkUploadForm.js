import { useState } from 'react';
import CompleteWorkInfo from './CompleteWorkInfo';
import Header from '../Header.tsx';
import CompleteWorkTabSelector from './CompleteWorkTabSelector';
import CompleteWorkPosts from './CompleteWorkPosts';
import CompleteWorkPortfolio from './CompleteWorkPortfolio';
import { doc, getFirestore, setDoc, addDoc, collection, updateDoc, arrayUnion } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { getPortfolioImagesOnlyByRef } from 'helpers/FirebaseFunctions';

const getBlobFromUri = async (uri) => {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
  return blob;
};

const uploadImages = async (images) => {
  const storage = getStorage()
  //TODO replace with dynamic work location
  const uploadLocation = "Works/" + "YDx1IlGcogMongCBzEo0" + "/"
  //Then add images to storage
  let firstRet = null;
  const promises = await images.map(async (pic) => {
    const picblob = await getBlobFromUri(pic)
    console.log(picblob)
    const storageRef = ref(storage, uploadLocation + picblob.name);
    await uploadBytesResumable(storageRef, picblob);
    // Listen for state changes, errors, and completion of the upload.
    console.log(storageRef, storageRef.fullPath)
    let path = "gs://" + storageRef.bucket + "/" + storageRef.fullPath
    if (firstRet === null) {
      firstRet = path
    }
    return path
  })
  const imagerefs = await Promise.all(promises)
  console.log('returning', imagerefs, imagerefs[0])
  return imagerefs
}

const getPortfolioInfo = async (setPortfolioData, setPortfolioRefs) => {
  const artistref = "VWOgAFjhL0BlFlbDTJZF"  //TODO replace with dynamic artist reference
  const portInfo = await getPortfolioImagesOnlyByRef(artistref)

  console.log("Writing portfolio Info", portInfo)
  setPortfolioData(portInfo[0])
  setPortfolioRefs(portInfo[1])

}

function CompleteWorkUploadForm() {
  const [stage, setStage] = useState(0);
  const [data, setData] = useState({})
  const [uploading, setUploading] = useState(false)
  const [portfolioNames, setPortfolioNames] = useState([])
  const [portfolioRefs, setPortfolioRefs] = useState([])
  const workref = "YDx1IlGcogMongCBzEo0"

  const uploadData = async (s) => {
    setUploading(true)
    //First Create Document with Initial Data
    console.log("uploading", s)
    const app = getApp();
    const db = getFirestore(app);
    const docRef = await setDoc(doc(db, "Works", "YDx1IlGcogMongCBzEo0"), s)
    const imagerefs = await uploadImages(s.Images)
    //Update the newly created work document with the image references in storage.
    console.log("MainImageRef,", imagerefs[0])
    const updateRef = doc(db, 'Works', "YDx1IlGcogMongCBzEo0");
    setDoc(updateRef, { "MainImage": imagerefs[0], "Images": imagerefs, "Artist": "VWOgAFjhL0BlFlbDTJZF" }, { merge: true });
    console.log("finished uploading")
    setUploading(false);
  }

  const getData = () => {
    return data
  }
  const handlePortfolio = async (n) => {
    if (workref === null) {
      console.log("Please Upload an item first")
      return
    }
    if (n === null) {
      console.log("uploading to hidden Portfolio")
      return
    }
    console.log("uploading to portfolio", portfolioNames[n], portfolioRefs[n])
    const artistref = "VWOgAFjhL0BlFlbDTJZF"
    const app = getApp();
    const db = getFirestore(app);
    const docRef = doc(db, "Artists", artistref, "Portfolios", portfolioRefs[n])
    await updateDoc(docRef, {
      Works: arrayUnion(workref)
    });


  }

  console.log("initial portfolio Data", (portfolioNames.length))
  if (portfolioNames.length === 0) {
    getPortfolioInfo(setPortfolioNames, setPortfolioRefs)
  }
  const functions = { setStage, setData, uploadData, getData }
  const portfolioProps = { Portfolios: portfolioNames, setActivePortfolio: handlePortfolio }
  return (
    <>
      <Header />
      <CompleteWorkTabSelector stage={stage} setStage={setStage} />
      {stage === 0 && <CompleteWorkInfo {...functions} />}
      {stage === 1 && <CompleteWorkPosts {...functions} />}
      {stage === 2 && <CompleteWorkPortfolio {...portfolioProps} />}
    </>
  );
}

export default CompleteWorkUploadForm;
