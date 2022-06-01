import React, { useState, useEffect } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import { useRouter } from 'next/router';
import tw, { styled } from 'twin.macro';
import ArtistProfile from 'components/profile/ArtistProfile';
import Gallery from 'components/profile/ProfilePortfolio';
import ProfilePosts from 'components/profile/ProfilePosts';
import StorePortfolio from 'components/profile/StorePortfolio';
import { getApp } from 'firebase/app';
import {
  getDocs,
  getFirestore,
  collection,
  query,
  where,
  QueryDocumentSnapshot,
  DocumentData,
} from 'firebase/firestore';
import { defaultCoverImage } from 'utils/FrontEndDefaults';
import { getPortfolioByRef, loadStorageImage } from 'helpers/FirebaseFunctions';
import useAuth from '../../utils/useAuth';
import useRequireOnboarding from '../../utils/useRequireOnboarding';

//import { sample_artist } from 'utils/Sample_Posts_Imports';

export const Container = styled.div`
  ${tw`px-5 max-w-[1320px] mx-auto`}
`;

const fetchArtist = async (
  username: string,
  setData: any,
  setCover: any,
  setPortfolioData: any,
  setLoadingPortfolio: any
) => {
 // TODO refactor this code -- the state shouldn't be passed in, etc.
  // if this is to be extracted into a function, the function should be pure
  // ie it only returns data directly, it doesn't mutate state through side effects
  const app = getApp();
  const db = getFirestore(app);

  const artistsRef = collection(db, 'artists');
  const q = query(artistsRef, where('username', '==', username));
  const ref = await getDocs(q);
  const result: QueryDocumentSnapshot<DocumentData>[] = [];
  ref.forEach((snapshot) => {
    result.push(snapshot);
  });
  setData(result);
  const coverImageURL = await loadStorageImage(result[0]?.data()?.coverImage);
  setCover(coverImageURL);
  console.log('loaded cover image: ', coverImageURL);
  const portfolioCollection = await getPortfolioByRef(result[0]?.id);
  setPortfolioData(portfolioCollection!);
  if (
    portfolioCollection.PortfolioImages !== [] &&
    portfolioCollection.WorkImages !== []
  ) {
    setLoadingPortfolio(false);
  }
  console.log(portfolioCollection);

};

const Portfolio: NextPage = () => {
  const router = useRouter();
  const { username } = router.query;
  const [page, setPage] = useState(1);
  const [artistData, setData] = useState<QueryDocumentSnapshot<DocumentData>[]>(
    []
  );

  const [loading, setLoading] = useState<boolean>(true);
  const [coverImage, setCoverImage] = useState(defaultCoverImage);
  const [portfolioData, setPortfolioData] = useState({
    Portfolios: [],
    Works: [],
    PortfolioImages: [],
    WorkImages: [],
  });
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const { artistData: currentUserArtistData } = useAuth();
  useRequireOnboarding(
    artistData.length > 0 &&
      artistData[0].data() &&
      artistData[0].data().username === username
  );

  const isCurrentUserPage =
    currentUserArtistData && username === currentUserArtistData.username;
  const pages = ['Posts', 'Portfolio', 'Store'];
  useEffect(() => {
    if (router.isReady && artistData.length === 0) {
      console.log(username);
      console.log(typeof username);

      if (typeof username === 'string') {
        console.log('String ', username);
        fetchArtist(
          username,
          setData,
          setCoverImage,
          setPortfolioData,
          setLoadingPortfolio
        ).then(() => {
          setLoading(false);
        });
      }
    }
  });

  return (
    <>
      <>
        <Head>
          <title>
            {loading
              ? 'Loading...'
              : artistData.length === 0
              ? 'User not found'
              : artistData[0].data().name}
          </title>
        </Head>
        <Header />
        {loading ? (
          <div tw={'flex flex-col'}>
            <h2 tw={'mx-auto text-lg'}>Loading</h2>
          </div>
        ) : artistData.length === 0 ? (
          <div>
            <h2>404: User not found</h2>
          </div>
        ) : (
          <div>
            {/* Cover Photo */}
            <div tw="relative w-full h-[180px] lg:h-[300px]">
              {coverImage && (
                <Image
                  src={coverImage}
                  alt="Cover Photo"
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>
            {/* Cover Photo --End-- */}

            {/* Profile Section Start */}
            <Container>
              <ArtistProfile
                isCurrentUserPage={isCurrentUserPage || false}
                artistData={artistData}
              />
            </Container>
            {/* Profile Section End */}

            {/* Tab Section Start*/}
            <section tw="mb-10">
              <Container>
                <div tw="flex items-center justify-around relative before:absolute before:w-full before:h-1 before:bottom-0 before:left-0 before:bg-gray-200">
                  {pages.map((p, index) => (
                    <button
                      key={index}
                      onClick={() => setPage(index)}
                      css={[
                        tw`text-lg relative z-10 font-semibold text-gray-600 hover:bg-black/5 duration-150 px-8 md:px-20 py-2 border-b-4 border-transparent cursor-pointer`,
                        page === index &&
                          tw`border-soft-red pointer-events-none hover:bg-transparent`,
                      ]}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </Container>
            </section>
            {loadingPortfolio ? (
              <></>
            ) : (
              <Container>
                {page === 0 && <ProfilePosts />}
                {page === 1 && (
                  <>
                    <Gallery portfolioData={portfolioData} />
                    {/*<Resume {...artistData} />*/}
                    {/*  TODO fix resume section */}
                  </>
                )}
                {page === 2 && <StorePortfolio />}
              </Container>
            )}
          </div>
        )}
      </>
    </>
  );
};

export default Portfolio;
