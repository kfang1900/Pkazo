import Image from 'next/image';
import ImageUploadButton from './ImageUploadButton';
import { getApp } from 'firebase/app';
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { loadStorageImage } from '../../helpers/FirebaseFunctions';
import { Field, Form, Formik } from 'formik';
import tw from 'twin.macro';
import React, { useCallback, useEffect, useState } from 'react';
import useAuth from '../../utils/auth/useAuth';
import useRequireOnboarding from '../../utils/hooks/useRequireOnboarding';
import { ArtistData } from '../../types/dbTypes';
import axios from 'axios';
import { updateArtistsIndex } from '../../utils/indexes/updateIndexes';
import { useMediaQuery } from 'react-responsive';
import { showEdu, showExp, showExh } from '../profile/ArtistInfoHelper';
import EditProfilePopups from './EditProfilePopups';
import { show } from 'dom7';

export default function EditProfilePage() {
  const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
  }, [mediaQuery, isMobile]);

  const [data, setData] = useState<
    | (ArtistData & {
        profilePictureURL: string;
        coverImageURL: string;
      })
    | undefined
  >();
  const [artistId, setArtistId] = useState('');
  const { user, loading } = useAuth();
  useEffect(() => {
    console.log(loading, user);
    if (loading || !user) {
      return;
    } else {
      // determine the stage of the user
      (async () => {
        // check if a profile already exists
        const app = getApp();
        const db = getFirestore(app);

        const artistsRef = collection(db, 'artists');
        const q = query(artistsRef, where('associatedUser', '==', user.uid));

        const ref = await getDocs(q);

        ref.forEach((snapshot) => {
          setArtistId(snapshot.id); // assumes that there will only be one result
          const artist = snapshot.data() as ArtistData;

          (async () => {
            setData({
              ...artist,
              profilePictureURL: await loadStorageImage(artist.profilePicture),
              coverImageURL: await loadStorageImage(artist.coverImage),
            });
          })();
        });
      })();
    }
  }, [loading, user]);

  const [isModified, setIsModified] = useState(false);
  const isDataModified = useCallback(
    (values: {
      name: string;
      location: string;
      discipline: string;
      bio: string;
    }) => {
      const _isModified =
        !data ||
        values.name !== data.name ||
        values.location !== data.location ||
        values.discipline !== data.discipline ||
        values.bio !== data.bio;
      setIsModified(_isModified);
      return _isModified;
    },
    [data]
  );

  const [showPopup, setShowPopup] = useState(-1);

  const styles = {
    label: isMobile
      ? tw`text-[14px] text-black font-semibold flex items-center justify-start h-9`
      : tw`text-[16px] text-[#8B8B8B] flex items-center justify-end h-10`,
    input: tw`border border-[#D8D8D8] focus:border-[#888888] outline-none rounded-[6px] px-3 md:px-[16px] text-[14px] md:text-[16px] w-full h-9 md:h-10`,
    section: tw`font-semibold mt-5 md:mt-9 text-[14px] md:text-[20px] px-4 md:px-0`,
    button: tw`mt-1 md:mt-0 h-[40px] border border-[#D8D8D8] rounded-[6px] pl-4 pr-3 text-[#3C3C3C] text-[16px] flex items-center hover:bg-[#F5F5F5] duration-100`,
  };
  return (
    <div css={[isMobile ? tw`mb-8` : tw`ml-[76px] mt-9 mb-[100px]`]}>
      {showPopup >= 0 && (
        <EditProfilePopups
          onSave={(data) => {
            const db = getFirestore();
            const type =
              showPopup === 0
                ? 'education'
                : showPopup === 1
                ? 'experience'
                : showPopup === 2
                ? 'exhibitions'
                : 'UNKNOWN';

            if (type === 'UNKNOWN') {
              throw new Error(
                "Unknown type in EditProfilePage's EditProfilePopup onsave function"
              );
            }
            setData((oldData) => ({
              ...((oldData as any) || {}),
              [type]: [...((oldData || {})[type] || []), data],
            }));
            return updateDoc(doc(db, 'artists', artistId), {
              [type]: arrayUnion(data),
            });
          }}
          onClose={() => setShowPopup(-1)}
          type={showPopup}
        />
      )}
      {!data && <p>Loading...</p>}
      {data && (
        <>
          {isMobile && (
            <div tw="w-full border-b-[0.5px] border-b-[#E2E2E2] mb-5 px-4 py-3 grid grid-cols-[40px auto 40px]">
              <div>
                <div tw="cursor-pointer w-3">
                  <svg
                    width="11"
                    height="18"
                    viewBox="0 0 11 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.240234 8.94922C0.240234 9.28125 0.367188 9.56445 0.630859 9.81836L8.24805 17.2695C8.45312 17.4844 8.72656 17.5918 9.03906 17.5918C9.67383 17.5918 10.1719 17.1035 10.1719 16.459C10.1719 16.1465 10.0449 15.8633 9.83008 15.6484L2.96484 8.94922L9.83008 2.25C10.0449 2.02539 10.1719 1.74219 10.1719 1.42969C10.1719 0.794922 9.67383 0.306641 9.03906 0.306641C8.72656 0.306641 8.45312 0.414062 8.24805 0.628906L0.630859 8.08008C0.367188 8.33398 0.25 8.61719 0.240234 8.94922Z"
                      fill="#3C3C3C"
                    />
                  </svg>
                </div>
              </div>
              <div tw="text-center text-[14px] font-bold text-black">
                Edit Profile
              </div>
              {isModified && (
                <div>
                  <div tw="cursor-pointer text-[14px] font-semibold text-[#E44C4D]">
                    Save
                  </div>
                </div>
              )}
            </div>
          )}
          <div tw="flex" css={[isMobile && tw`justify-center w-full`]}>
            <div tw="relative">
              <div tw="relative w-20 h-20 md:w-[132px] md:h-[132px] overflow-hidden rounded-full flex items-center ">
                <Image
                  src={data.profilePictureURL || '/assets/imgs/blank_pfp.jpg'}
                  alt="profile_image"
                  width="132px"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <ImageUploadButton
                offset={0}
                uploadLocation={`Artists/${artistId}/Profile_Photo`}
                onError={(error) => {
                  console.log(error);
                }}
                onUploadComplete={async (uploadRef) => {
                  const app = getApp();
                  const db = getFirestore(app);
                  const gsURL = uploadRef.toString();

                  await updateDoc(doc(db, 'artists', artistId), {
                    profilePicture: gsURL,
                  } as Partial<ArtistData>);
                  await updateArtistsIndex(artistId);
                  const pfpURL = await loadStorageImage(gsURL);

                  setData((oldData) => {
                    return Object.assign({}, oldData, {
                      profilePictureURL: pfpURL,
                    });
                  });
                }}
              />
            </div>
            {!isMobile && (
              <div tw="ml-9 flex flex-col justify-center">
                <div tw="text-black text-[28px] font-semibold">{data.name}</div>
                <div tw="text-[#8B8B8B] text-[20px] font-semibold mt-[10px]">
                  {data.location}
                  &nbsp;&nbsp;•&nbsp;&nbsp;{data.discipline}
                </div>
              </div>
            )}
          </div>
          {!isMobile && (
            <div tw="font-semibold mt-12 text-[20px]">Basic Information</div>
          )}
          {data && (
            <Formik
              initialValues={{
                name: data.name,
                discipline: data.discipline,
                location: data.location,
                bio: data.bio,
                rerenderCounter: 0, // hack to make formik rerendrer after submits, so the save button goes away
              }}
              onSubmit={async (values, bag) => {
                const app = getApp();
                const db = getFirestore(app);
                await updateDoc(doc(db, 'artists', artistId), {
                  name: values.name,
                  discipline: values.discipline,
                  location: values.location,
                  bio: values.bio,
                  numPosts: 0,
                  numWorks: 3, //TODO make this do something better
                } as Partial<ArtistData>);
                await updateArtistsIndex(artistId);
                setData((oldData) => {
                  return Object.assign({}, oldData, {
                    name: values.name,
                    discipline: values.discipline,
                    location: values.location,
                    bio: values.bio,
                  });
                });
                bag.setFieldValue(
                  'rerenderCounter',
                  values.rerenderCounter + 1
                );
                console.log('updated');
              }}
            >
              {({ values, setValues }) => (
                <Form>
                  <div
                    css={[
                      isMobile
                        ? tw`mt-5 grid grid-cols-[80px auto] px-4 gap-x-2 gap-y-3`
                        : tw`w-full mt-6 grid grid-cols-[115px 450px] gap-x-7 gap-y-6`,
                    ]}
                  >
                    <div css={styles.label}>Name</div>
                    <Field type="input" name="name" css={styles.input} />
                    <div css={styles.label}>Discipline</div>
                    <Field type="input" name="discipline" css={styles.input} />
                    <div css={styles.label}>Location</div>
                    <Field type="input" name="location" css={styles.input} />
                    <div css={styles.label}>Bio</div>
                    <Field
                      component="textarea"
                      name="bio"
                      css={[
                        styles.input,
                        tw`md:w-[710px] h-[80px] md:h-[160px] py-2 resize-none`,
                        isMobile && tw`col-span-2 -mt-1`,
                      ]}
                    />
                    <div />
                    {isDataModified(values) && !isMobile && (
                      <div>
                        <input
                          type="submit"
                          value="Save"
                          tw="h-9 w-20 relative -top-0.5 text-white bg-theme-red rounded-[6px] px-4 py-1 cursor-pointer hover:bg-[#be4040]"
                        />
                        <button
                          tw="ml-5 h-9 w-24 border border-[#D8D8D8] rounded-[6px] px-4 text-[#3C3C3C] text-[16px] hover:bg-[#F5F5F5]"
                          onClick={() => {
                            setValues({
                              name: data.name,
                              discipline: data.discipline,
                              location: data.location,
                              bio: data.bio,
                              rerenderCounter: values.rerenderCounter,
                            });
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          )}
          <div css={styles.section}>Cover Image</div>
          <div tw="mt-3 md:mt-6 relative w-full h-[136px] md:w-[852px] md:h-[201px] bg-gray-200">
            {data.coverImageURL && (
              <Image
                src={data.coverImageURL}
                alt="Cover Photo"
                layout="fill"
                objectFit="cover"
              />
            )}

            <div className="right-3 bottom-3">
              <ImageUploadButton
                uploadLocation={`Artists/${artistId}/Cover_Photo`}
                onError={(error) => {
                  console.log(error);
                }}
                onUploadComplete={async (uploadRef) => {
                  const app = getApp();
                  const db = getFirestore(app);
                  const gsURL = uploadRef.toString();

                  await updateDoc(doc(db, 'artists', artistId), {
                    coverImage: gsURL,
                  } as Partial<ArtistData>);
                  await updateArtistsIndex(artistId);
                  const coverImageURL = await loadStorageImage(gsURL);

                  setData((oldData) => {
                    return Object.assign({}, oldData, {
                      coverImage: gsURL,
                      coverImageURL: coverImageURL,
                    });
                  });
                }}
              />
            </div>
          </div>

          {!isMobile && <div css={styles.section}>Career Details</div>}
          <div
            css={[
              isMobile
                ? tw`mt-5 px-4`
                : tw`w-full mt-6 grid grid-cols-[115px 450px] gap-x-7 gap-y-9`,
            ]}
          >
            <div css={styles.label}>Education</div>
            <div>
              <button css={styles.button} onClick={() => setShowPopup(0)}>
                <Image
                  src="/assets/svgs/plus.svg"
                  alt="add education"
                  width="15px"
                  height="15px"
                />
                <div tw="ml-2">Add a college</div>
              </button>
              <div tw="ml-8 md:ml-0">
                {data.education
                  .sort((a, b) => (b.end || 9999) - (a.end || 9999))
                  .map((x, i) => (
                    <div key={i} tw="mt-4">
                      {showEdu(x)}
                    </div>
                  ))}
              </div>
            </div>
            <div css={[styles.label, isMobile && tw`mt-3`]}>Experience</div>
            <div>
              <button css={styles.button} onClick={() => setShowPopup(1)}>
                <Image
                  src="/assets/svgs/plus.svg"
                  alt="add education"
                  width="15px"
                  height="15px"
                />
                <div tw="ml-2">Add a workplace</div>
              </button>
              <div tw="ml-8 md:ml-0">
                {data.experience
                  .sort((a, b) => (b.end || 9999) - (a.end || 9999))
                  .map((x, i) => (
                    <div key={i} tw="mt-4">
                      {showExp(x)}
                    </div>
                  ))}
              </div>
            </div>
            <div css={[styles.label, isMobile && tw`mt-3`]}>Exhibitions</div>
            <div>
              <button css={styles.button} onClick={() => setShowPopup(2)}>
                <Image
                  src="/assets/svgs/plus.svg"
                  alt="add education"
                  width="15px"
                  height="15px"
                />
                <div tw="ml-2">Add an exhibition</div>
              </button>
              <div tw="ml-8 md:ml-0">
                {data.exhibitions
                  .sort((a, b) => b.year - a.year)
                  .map((x, i) => (
                    <div key={i} tw="mt-4">
                      {showExh(x)}
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
