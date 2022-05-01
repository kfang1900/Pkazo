import { useState } from 'react';
import CompleteWorkInfo from './CompleteWorkInfo';
import Header from '../Header.tsx';
import CompleteWorkTabSelector from './CompleteWorkTabSelector';
import CompleteWorkPosts from './CompleteWorkPosts';
import CompleteWorkPortfolio from './CompleteWorkPortfolio';
import { doc, getFirestore, setDoc, addDoc, collection, } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';


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

function CompleteWorkUploadForm() {
  const [stage, setStage] = useState(0);
  const [data, setData] = useState({})
  const [uploading, setUploading] = useState(false)

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
    setDoc(updateRef, { "MainImage": imagerefs[0], "Images": imagerefs }, { merge: true });
    console.log("finished uploading")
    setUploading(false);
  }

  const getData = () => {
    return data
  }
  const functions = { setStage, setData, uploadData, getData }

  return (
    <>
      <Header />
      <CompleteWorkTabSelector stage={stage} setStage={setStage} />
      {stage === 0 && <CompleteWorkInfo {...functions} />}
      {stage === 1 && <CompleteWorkPosts {...functions} />}
      {stage === 2 && <CompleteWorkPortfolio />}
    </>
  );
}

export default CompleteWorkUploadForm;
