import { GeoPoint, Timestamp } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';

type ArtistType =
  | 'hobbyist'
  | 'hobbyist-desiring-professional'
  | 'professional';
export interface ArtistData {
  name: string;
  artistName: string;
  artistType: ArtistType;
  bio: string;
  coverImage: string;
  associatedUser: string;
  profilePicture: string;
  discipline: string;

  experience: {
    position: string;
    company: string;
    start: number;
    end?: number;
  }[];
  education: {
    field: string;
    school: string;
    start: number;
    end?: number;
  }[];
  exhibitions: {
    gallery: string;
    year: number;
  }[];

  acceptingCommissions: boolean;
  approved: boolean;
  location: string;

  numPosts: number;
  numWorks: number;
  numFollowers: number;
  numFollowing: number;

  shippingProcessingTime: string;
  shippingReturnPolicies: string;
  faqs: {
    question: string;
    answer: string;
  }[];

  username: string;
}

export interface UserData {
  dob: Timestamp;
  username: string;
  chats?: string[];
}

export interface PortfolioData {
  name: string;
  works: string[];
  picture: string;
  description: string;
}
type DimensionUnits = 'in' | 'cm' | 'ft';
export type WorkData = {
  timestamp: Timestamp;
  artist: string;

  title: string;
  description: string;
  images: string[];

  portfolio: string;
  year: number;
  medium: string;
  surface: string;
  height: number;
  width: number;
  units: DimensionUnits;
} & (
  | { forSale: false }
  | {
      forSale: true;
      sale: {
        price: number;
        subject: string;
        orientation: 'Horizontal' | 'Vertical' | 'Square';
        color:
          | 'red'
          | 'orange'
          | 'yellow'
          | 'green'
          | 'blue'
          | 'purple'
          | 'brown'
          | 'black'
          | 'white';
        style:
          | 'Abstract'
          | 'Cubist'
          | 'Expressoinist'
          | 'Folk'
          | 'Impressionist'
          | 'Minimalist'
          | 'Photorealist'
          | 'Pointillist'
          | 'Pop art'
          | 'Psychedelic'
          | 'Surrealist';
        framing: boolean;
      };
    }
) &
  (
    | {
        forPrint: false;
      }
    | {
        price: number;
        height: number;
        width: number;
        units: DimensionUnits;
        printSurface: string;
        printFraming: boolean;
      }
  );

export type WorkRecord = WorkData & { id: string };
export type ForSaleWorkRecord = WorkRecord & { forSale: true };
