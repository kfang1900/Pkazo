import { createContext } from 'react';
import { User, UserCredential } from '@firebase/auth';
import { ArtistData, UserData } from '../../types/dbTypes';

export type ImageURLCache = {
  getImage: (imageRef: string) => Promise<string>;
};

const ImageURLCacheContext = createContext<ImageURLCache>({
  getImage: async (imageRef) => Promise.resolve(''),
});

export default ImageURLCacheContext;
