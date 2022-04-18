import { getApp } from "firebase/app";
import { getDownloadURL, getStorage, ref } from "firebase/storage";


//Returns the Image URL as a string
export const loadStorageImage = async (photoURL:string) => {
    const app = getApp();
    const storage = getStorage(app);
    try {
        console.log(photoURL)
        //Create reference to the user's profile picture
        const reference = ref(storage, photoURL)

        let url = String(await getDownloadURL(reference));
        console.log("Photo url is ", url)
        return url
    } catch (error) {
        console.log("ProfPic Error: " + error);
        return "";
    }
}
