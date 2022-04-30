import { GeoPoint } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";

export interface ArtistObject {
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
  

  export interface ArtistData {
    Name: string;
    CoverImageURL: string;
    ProfilePictureURL: string;
    Location: string;
    Bio: string;
    PostNumber: number;
    WorkNumber: number;
    Followers: number;
    Following: number;
  };
  
export interface PortfolioObject {
    Portfolios: DocumentData[];
    Works:DocumentData[][];
    PortfolioImages:string[];
    WorkImages:string[][];

  }