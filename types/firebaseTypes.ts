import { GeoPoint } from "firebase/firestore";

export default interface ArtistObject {
    Name: string,
    Bio: string,
    AssociatedUser: string,
    DOB:string,
    Followers:number,
    Following: number,
    Gender:String,
    IsApproved:Boolean,
    Location:String,
    PostNumber:number,
    WorkNumber:number,
    username:String,
  }
  