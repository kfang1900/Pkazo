import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import useImageURLCache from '../../utils/imageURLCache/useImageURLCache';

export default function FirebaseStorageImage({
  imageRef,
}: {
  imageRef: string;
}) {
  const { getImage } = useImageURLCache();
  const [url, setUrl] = useState('');
  useEffect(() => {
    if (!imageRef) return;
    getImage(imageRef).then((_url) => {
      setUrl(_url);
    });
  }, [imageRef]);
  return url ? <Image src={url} layout="fill" objectFit="cover" /> : <></>;
}
