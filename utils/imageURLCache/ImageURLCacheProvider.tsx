import { ReactNode, useCallback, useReducer } from 'react';
import ImageURLCacheContext from './ImageURLCacheContext';
import { loadStorageImage } from '../../helpers/FirebaseFunctions';

export default function ImageURLCacheProvider({
  children,
}: {
  children?: ReactNode;
}) {
  const [cache, updateCache] = useReducer(
    (
      state: Record<string, string>,
      [action, key, value]:
        | ['set-item', string, string]
        | ['remove-item', string]
    ) => {
      if (action === 'set-item') {
        return {
          ...state,
          [key]: value,
        };
      } else if (action === 'remove-item') {
        const _state = { ...state };
        delete _state[key];
        return _state;
      } else {
        return state;
      }
    },
    {}
  );
  const getImage = useCallback(
    async (imageRef: string) => {
      if (cache[imageRef]) return cache[imageRef];
      const url = await loadStorageImage(imageRef);
      updateCache(['set-item', imageRef, url]);
      return url;
    },
    [cache]
  );
  return (
    <ImageURLCacheContext.Provider
      value={{
        getImage: getImage,
      }}
    >
      {children}
    </ImageURLCacheContext.Provider>
  );
}
