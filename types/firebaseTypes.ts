import { GeoPoint, Timestamp } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';

export interface ArtistObject {
  Name: string;
  Bio: string;
  AssociatedUser: string;
  DOB: string;
  Followers: number;
  Following: number;
  Gender: String;
  IsApproved: Boolean;
  Location: String;
  PostNumber: number;
  WorkNumber: number;
  ProfilePicture: string;
  username: String;
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
}

export interface PortfolioObject {
  Portfolios: DocumentData[];
  Works: DocumentData[][];
  PortfolioImages: string[];
  WorkImages: string[][];
}

interface WorkCreatorProps {
  Date: string;
  Description: string;
  Dimensions: string;
  ForSale: Boolean;
  Images: string[];
  MainImage: string;
  Medium: string;
  Name: string;
  Price: Number | undefined;
  ShippingCost: Number | string | undefined;
  Style: string | undefined;
  Subject: string | undefined;
  Type: string | undefined;
  portfolioUrl: string;
  artist: string;
  AssociatedUser: string;
}

type DimensionUnits = 'in' | 'cm' | 'ft';
export type Work = {
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
