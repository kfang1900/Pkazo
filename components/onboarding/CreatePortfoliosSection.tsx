import { Container } from '../../pages/[username]';
import { User } from '@firebase/auth';
import tw from 'twin.macro';
import Image from 'next/image';
import { portfolio_images } from '../../utils/mockImports';
import React, { useEffect, useState } from 'react';
import greyPlus from 'public/assets/temp/temp_plus.png';
import Modal from '../popups/Modal';
import PortfolioWorkUpload from '../uploading/PortfolioWorkUpload';
import { getApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { loadStorageImage } from '../../helpers/FirebaseFunctions';
import Link from 'next/link';

export default function CreatePortfoliosSection({
  user,
  onComplete,
  artistId,
}: {
  user: User | null;
  onComplete: () => void;
  artistId: string;
}) {
  const [showPortfolioUploadModal, setShowPortfolioUploadModal] =
    useState(false);
  const [username, setUsername] = useState('');
  const [portfolios, setPortfolios] = useState<
    {
      name: string;
      image: string;
    }[]
  >([]);
  useEffect(() => {
    if (!user) return;
    (async () => {
      const app = getApp();
      const db = getFirestore(app);
      const querySnapshot = await getDocs(
        collection(db, 'artists', artistId, 'portfolios')
      );
      const docs: Promise<{
        name: string;
        image: string;
      }>[] = [];
      querySnapshot.forEach((doc) => {
        setUsername(doc.data().username);
        docs.push(
          loadStorageImage(doc.data().picture).then((image) => ({
            name: doc.data().name,
            image: image,
          }))
        );
      });
      Promise.all(docs).then((docs) => setPortfolios(docs));
    })();
  }, [user, artistId]);
  return (
    <>
      {showPortfolioUploadModal && (
        <Modal open onClose={() => setShowPortfolioUploadModal(false)}>
          <PortfolioWorkUpload
            artistId={artistId}
            userId={user?.uid}
            onClose={(
              newPortfolio: {
                image: string;
                name: string;
              }
            ) => {
              setPortfolios((state) => [...state, newPortfolio]);
              setShowPortfolioUploadModal(false);
            }}
          />
        </Modal>
      )}
      <Container>
        <div tw="text-[28px] font-semibold text-[#333333] text-center mt-14">
          Create Portfolios
        </div>
        <div tw="text-[18px] font-semibold text-[#333333] text-center mt-1">
          How would you like to categorize your work?
        </div>
        <div tw="max-w-[1100px] gap-5 px-[40px] mx-auto flex items-center flex-wrap mt-20 mb-10">
          {portfolios.map(({ name, image }) => (
            <div key={name}>
              <div
                css={[
                  tw`w-[128px] h-[128px] relative rounded-full overflow-hidden duration-200 origin-bottom border-4 border-transparent mx-[60px]`,
                ]}
              >
                <Image src={image} alt={name + ' cover image'} layout="fill" />
              </div>
              <p tw="text-black mt-2 text-center">{name}</p>
            </div>
          ))}
          <div tw="cursor-pointer">
            <div
              css={[
                tw`w-[128px] h-[128px] relative rounded-full overflow-hidden duration-200 origin-bottom border-4 border-transparent mx-[60px]`,
              ]}
            >
              {/* TODO: replace this with a svg plus icon */}
              <Image
                src={greyPlus}
                alt="Portfolio Image"
                layout="fill"
                onClick={() => setShowPortfolioUploadModal(true)}
              />
            </div>
            <p tw="text-black mt-2 text-center">New Portfolio</p>
          </div>
        </div>
        <Link href={'/' + username}>
          <input
            type="button"
            value="Finish Setup"
            tw="float-right h-9 relative -top-0.5 text-white bg-theme-red rounded-full px-4 py-1 cursor-pointer hover:bg-[#be4040]"
          />
        </Link>
      </Container>
    </>
  );
}
