import { useState, useEffect } from 'react';
import CompleteWorkInfo from './CompleteWorkInfo';
import Header from '../Header.tsx';
import CompleteWorkTabSelector from './CompleteWorkTabSelector';
import CompleteWorkPosts from './CompleteWorkPosts';
import CompleteWorkPortfolio from './CompleteWorkPortfolio';
import { doc, getFirestore, setDoc, addDoc, collection, updateDoc, arrayUnion, where, query, getDocs } from 'firebase/firestore';
import { getApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { getPortfolioImagesOnlyByRef } from 'helpers/FirebaseFunctions';
import useAuth from '../../utils/useAuth';
import LoginForm from '../popups/LoginForm';


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

const uploadImages = async (images, workref) => {
  const storage = getStorage()
  //TODO replace with dynamic work location
  const uploadLocation = "Works/" + workref + "/"
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

const getPortfolioInfo = async (user, setPortfolioData, setPortfolioRefs, setArtistRef) => {
  const app = getApp();
  const db = getFirestore(app);

  const artistsRef = collection(db, 'Artists');

  const q = query(artistsRef, where('AssociatedUser', '==', user.uid));
  console.log("Getting user ID")
  const ref = await getDocs(q);
  if (ref.length === 0) {
    console.log("error no documents found with associated user id")

  } else {
    console.log(ref)
    ref.forEach(async (element) => {
      const artistref = element.id
      const portInfo = await getPortfolioImagesOnlyByRef(artistref)
      setArtistRef(artistref)
      console.log("Writing portfolio Info", portInfo)
      setPortfolioData(portInfo[0])
      setPortfolioRefs(portInfo[1])
    })


  }
}


function CompleteWorkUploadForm() {
  const [signupFormActive, setSignupFormActive] = useState(false);
  const [stage, setStage] = useState(0);
  const [data, setData] = useState({})
  const [uploading, setUploading] = useState(false)
  const [portfolioNames, setPortfolioNames] = useState([])
  const [portfolioRefs, setPortfolioRefs] = useState([])
  const [workref, setWorkRef] = useState(null)
  const { user, loading } = useAuth();
  const [artistref, setArtistRef] = useState("")

  useEffect(() => {
    console.log(loading, user);
    if (loading) {
      return;
    }
    if (!user) {
      setSignupFormActive(true);
    } else {
      setSignupFormActive(false);
      if (portfolioNames.length === 0) {
        getPortfolioInfo(user, setPortfolioNames, setPortfolioRefs, setArtistRef)
      }
    }
  })

  const uploadData = async (s) => {
    setUploading(true)
    //First Create Document with Initial Data
    console.log("uploading", s)
    const app = getApp();
    const db = getFirestore(app);
    const docRef = await addDoc(collection(db, "Works"), s)
    const imagerefs = await uploadImages(s.Images, docRef.id)
    //Update the newly created work document with the image references in storage.
    console.log("MainImageRef,", imagerefs[0])
    const updateRef = doc(db, 'Works', docRef.id);
    setDoc(updateRef, { "MainImage": imagerefs[0], "Images": imagerefs, "Artist": "VWOgAFjhL0BlFlbDTJZF" }, { merge: true });
    console.log("finished uploading", docRef.id)
    setUploading(false);
    setWorkRef(docRef.id)
  }

  const getData = () => {
    return data
  }
  const handlePortfolio = async (n) => {
    console.log(workref)
    if (workref === null) {
      console.log("Please Upload an item first")
      return
    }
    if (n === null) {
      console.log("uploading to hidden Portfolio")
      return
    }
    console.log("uploading to portfolio", portfolioNames[n], portfolioRefs[n], "workref ", workref)
    const app = getApp();
    const db = getFirestore(app);
    const docRef = doc(db, "Artists", artistref, "Portfolios", portfolioRefs[n])
    await updateDoc(docRef, {
      Works: arrayUnion(workref)
    });



  }


  const functions = { setStage, setData, uploadData, getData }
  const portfolioProps = { Portfolios: portfolioNames, setActivePortfolio: handlePortfolio }
  return (
    <>
      <Header />
      {signupFormActive && (
        <LoginForm
          defaultSignUp
          notCloseable
          onClose={() => setSignupFormActive(false)}
        />
      )}
      <CompleteWorkTabSelector stage={stage} setStage={setStage} />
      {stage === 0 && <CompleteWorkInfo {...functions} />}
      {stage === 1 && <CompleteWorkPosts {...functions} />}
      {stage === 2 && <CompleteWorkPortfolio {...portfolioProps} />}
    </>
  );
}

export default CompleteWorkUploadForm;
