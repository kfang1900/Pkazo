import { useState } from 'react';
import CompleteWorkInfo from './CompleteWorkInfo';
import Header from '../Header.tsx';
import CompleteWorkTabSelector from './CompleteWorkTabSelector';
import CompleteWorkPosts from './CompleteWorkPosts';
import CompleteWorkPortfolio from './CompleteWorkPortfolio';
import { doc, getFirestore, setDoc,addDoc,collection, } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import {getStorage,ref,uploadBytesResumable} from 'firebase/storage';


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


function CompleteWorkUploadForm() {
  const [stage, setStage] = useState(0);
  const [data, setData] = useState({})
  const [uploading,setUploading] = useState(false)

  const uploadData=async(s)=>{
    setUploading(true)
    //First Create Document with Initial Data
    console.log("uploading",s)
    const app = getApp();
    const db = getFirestore(app);
    const docRef = await setDoc(doc(db, "Works","YDx1IlGcogMongCBzEo0"),s )
    let imagerefs = []
    const storage = getStorage()
    const uploadLocation="Works/"+"YDx1IlGcogMongCBzEo0"+"/"
    //Then add images to storage
    let i = 0
    s.Images.forEach(async(pic) =>{
      const picblob = await getBlobFromUri(pic)
      console.log(picblob)
      const storageRef = ref(storage, uploadLocation + picblob.name);
      const uploadTask = uploadBytesResumable(storageRef, picblob);
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        (snapshot) => {
        },
        (error) => {
          setUploading(false);
          console.log("an error occured during uploading")
          },
        async () => {
          console.log("uploaded image ",pic)
        }
      );
      console.log(storageRef,storageRef.fullPath)
      let imageRefData = storageRef.fullPath
      imagerefs.push(imageRefData)
      i=i+1
    })
    //Update the newly created work document with the image references in storage.
    const mainImage = imagerefs[0]
    console.log("MainImageRef,",mainImage)
    const updateRef = doc(db, 'Works', "YDx1IlGcogMongCBzEo0");
    setDoc(updateRef, {"MainImage": mainImage,"Images":imagerefs},{ merge: true });
    console.log("finished uploading")
    setUploading(false);
      }
  
  const getData=()=>{
    return data
  }
  const functions={setStage,setData,uploadData,getData}

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
