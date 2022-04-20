import { getApp } from "firebase/app";
import { getDownloadURL, getStorage, ref} from "firebase/storage";
import { doc,getDoc,getDocs, getFirestore, DocumentData,DocumentSnapshot,collection, query} from "firebase/firestore";



//Returns the Image URL as a string
export const loadStorageImage = async (photoURL:string) => {
    const app = getApp();
    const storage = getStorage(app);
    try {
        console.log(photoURL)
        //Create reference to the user's profile picture
        const reference = ref(storage, photoURL)

        let url = String(await getDownloadURL(reference));
        //console.log("Photo url is ", url)
        return url
    } catch (error) {
        console.log("ProfPic Error: " + error);
        return "";
    }
}

export const loadStorageImages = async(photoURLs:string[])=>{
    const retURLS:string[] = []
    photoURLs.forEach(async (url)=>{
        retURLS.push(await loadStorageImage(url))
    })
    console.log(retURLS)
    return retURLS
}

export const fetchArtistByID = async(artistref: string)=>{
    console.log("Fetching artist ", artistref)
    let app = getApp();
    let db = getFirestore(app);
    const docRef = doc(db, "Artists", artistref);
    const docSnap = await getDoc(docRef);
    return docSnap
  }
  
  export const fetchWorkByID = async(workref: string)=>{       
      let app = getApp();
      //Get that document from the database
      let db = getFirestore(app);
      const docRef = doc(db, "Works", workref);
      const docSnap = await getDoc(docRef);
      return docSnap
    }


//Returns a Portfolio Preview Object of a specific portfolio 
//{PortfolioName: Paintings, Works:[WorkPreviewObject1, WorkPreviewObject2...WorkPreviewObject8]}
export const getPortfolioByRef = async (artistref:string) => {
    let app = getApp();
    let db = getFirestore(app);
    const q = await query(collection(db, "Artists", artistref,"Portfolios"))
    const docRef = await getDocs(q)
    docRef.forEach(element =>{
        console.log(element.data())
    })
}


//Returns a Work Preview Object of a specific piece of work 
//{WorkName: The Maiden with the hair, Image: url.url.com}
export const getWorkPreview = async (workRef:string) => {
    
    const app = getApp();
    let db = getFirestore(app);

    const docRef = doc(db, "Works", workRef);
    const ref = await (await getDoc(docRef)).data()
    let ret:{WorkName:string,DisplayImage:string} = {WorkName:"",DisplayImage:""}
    if(ref!=null){
        const pic = await loadStorageImage(ref["MainImage"])
        let ret = {WorkName:ref["Name"],DisplayImage:pic}
        return ret
    }
    return ret

}