import { useContext } from 'react';

import ImageURLCacheContext from './ImageURLCacheContext';

export default function useImageURLCache() {
  const imageURLCache = useContext(ImageURLCacheContext);
  return imageURLCache;
}
