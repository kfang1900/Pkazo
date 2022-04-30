import { getApp } from "firebase/app";
import { getDownloadURL, getStorage, ref} from "firebase/storage";
import { doc,getDoc,getDocs, getFirestore, QuerySnapshot, DocumentData,collection, query} from "firebase/firestore";

function defaultString<T>(arg: (param: string) => string ){
    return arg
}

//Returns the Image URL as a string
const loadStorageImage = async (photoURL:string) => {
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

const loadStorageImages = async(photoURLs:string[])=>{
    const retURLS:string[] = []
    photoURLs.forEach(async (url)=>{
        retURLS.push(await loadStorageImage(url))
    })
    console.log(retURLS)
    return retURLS
}

const fetchArtistByID = async(artistref: string)=>{
    console.log("Fetching artist ", artistref)
    let app = getApp();
    let db = getFirestore(app);
    const docRef = doc(db, "Artists", artistref);
    const docSnap = await getDoc(docRef);
    return docSnap
  }
  
  const fetchWorkByID = async(workref: string)=>{       
      let app = getApp();
      //Get that document from the database
      let db = getFirestore(app);
      const docRef = doc(db, "Works", workref);
      const docSnap = await getDoc(docRef);
      return docSnap
    }

const getPortfolioHelper = async(docRef:QuerySnapshot<DocumentData>)=>{
    let Portfolios:DocumentData[] = []
    let Works:DocumentData[][] = []
    let PortfolioImages:string[] = []
    let WorkImages:string[][]=[]
    let curPos= 0
    await docRef.forEach(async (element) =>  {
        Portfolios.push(element.data())
        curPos = Portfolios.length-1
        //console.log(curPos,Portfolios)
        const portImageURL = await loadStorageImage(element.data().Picture)
        PortfolioImages.push(portImageURL)
        let subworks:DocumentData[] = []
        let subworkImages:string[]=[]
        element.data().Works?.forEach(async (workref:string) => {
            console.log("Fetching Work Data",workref)            
            const workdata = await fetchWorkByID(workref)
            const workImage = await(loadStorageImage(workdata.data()!.MainImage))
            //console.log(Works,subworks)
            subworks.push(workdata.data()!)
            subworkImages.push(workImage!)
        })
        Works.push(subworks)
        WorkImages.push(subworkImages)
    })
    const res = {Portfolios:Portfolios,Works:Works,PortfolioImages,WorkImages}
    return res
}
//Returns a Portfolio Preview Object of a specific portfolio 
//{PortfolioName: Paintings, Works:[WorkPreviewObject1, WorkPreviewObject2...WorkPreviewObject8]}
const getPortfolioByRef = async (artistref:string) => {
    let app = getApp();
    let db = getFirestore(app);
    const q = await query(collection(db, "Artists", artistref,"Portfolios"))
    const docRef = await getDocs(q)
    let dex = 0
    const res = await getPortfolioHelper(docRef)
    console.log("returning res",res)
    return res
}


//Returns a Work Preview Object of a specific piece of work 
//{WorkName: The Maiden with the hair, Image: url.url.com}
const getWorkPreview = async (workRef:string) => {
    
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

export { getWorkPreview, getPortfolioByRef,fetchWorkByID,loadStorageImage,loadStorageImages,fetchArtistByID}
export default{defaultString}