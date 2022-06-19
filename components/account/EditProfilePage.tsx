import Image from 'next/image';
import ImageUploadButton from './ImageUploadButton';
import { getApp } from 'firebase/app';
import {
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

export default function EditProfilePage() {
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

  const isDataModified = useCallback(
    (values: {
      name: string;
      location: string;
      discipline: string;
      bio: string;
    }) => {
      return (
        !data ||
        values.name !== data.name ||
        values.location !== data.location ||
        values.discipline !== data.discipline ||
        values.bio !== data.bio
      );
    },
    [data]
  );

  const styles = {
    label: tw`text-[16px] text-[#8B8B8B] text-right mt-[10px]`,
    input: tw`border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]`,
  };
  return (
    <div tw="ml-[76px] mt-9 mb-[100px]">
      {!data && <p>Loading...</p>}
      {data && (
        <>
          <div tw="flex">
            <div tw="w-[132px] h-[132px] relative">
              <div tw="overflow-hidden rounded-full flex items-center ">
                {data.profilePictureURL ? (
                  <Image
                    src={data.profilePictureURL}
                    alt="profile_image"
                    width="132px"
                    height="132px"
                    objectFit="cover"
                  />
                ) : (
                  <div tw={'bg-gray-200 w-[132px] h-[132px]'} />
                )}
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
            <div tw="ml-9 flex flex-col justify-center">
              <div tw="text-black text-[28px] font-semibold">{data.name}</div>
              <div tw="text-[#8B8B8B] text-[20px] font-semibold mt-[10px]">
                {data.location}
                &nbsp;&nbsp;•&nbsp;&nbsp;{data.discipline}
              </div>
            </div>
          </div>
          <div tw="font-semibold mt-12 text-[20px]">Basic Information</div>
          <Formik
            initialValues={{
              name: data.name,
              discipline: data.discipline,
              location: data.location,
              bio: data.bio,
            }}
            onSubmit={async (values) => {
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
                return Object.assign({}, oldData, values);
              });
              console.log('updated');
            }}
          >
            {({ values, setValues }) => (
              <Form tw="w-full mt-6 grid grid-cols-[115px 450px] gap-x-7 gap-y-6">
                <div css={styles.label}>Name</div>
                <Field type="input" name="name" css={styles.input} />
                <div css={styles.label}>Discipline</div>
                <Field type="input" name="discipline" css={styles.input} />
                <div css={styles.label}>Location</div>
                <Field type="input" name="location" css={styles.input} />
                <div css={styles.label}>Bio</div>
                <Field
                  component="textarea"
                  rows="8"
                  name="bio"
                  css={[styles.input, tw`w-[710px] h-[160px] py-2 resize-none`]}
                />
                <div />
                {isDataModified(values) && (
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
                        });
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </Form>
            )}
          </Formik>
          <div tw="font-semibold mt-9 text-[20px]">Cover Image</div>
          <div tw="relative mt-6">
            <div tw="w-[852px] h-[201px] bg-gray-200">
              {data.coverImageURL && (
                <Image
                  src={data.coverImageURL}
                  alt="Cover Photo"
                  layout="fill"
                  objectFit="cover"
                />
              )}
            </div>

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

          <div tw="font-semibold mt-9 text-[20px]">Education</div>
          <div tw="w-full mt-6 grid grid-cols-[115px 450px] gap-x-7">
            <div css={styles.label}>College</div>
            <div>
              <button tw="h-[40px] border border-[#D8D8D8] rounded-[6px] pl-4 pr-3 text-[#3C3C3C] text-[16px] flex items-center hover:bg-[#F5F5F5]">
                <Image
                  src="/assets/svgs/plus.svg"
                  alt="add education"
                  width="15px"
                  height="15px"
                />
                <div tw="ml-2">Add a college (coming soon)</div>
              </button>
              {data.education
                .sort((a, b) => (b.end || 9999) - (a.end || 9999))
                .map((x, i) => (
                  <div key={i} tw="mt-5">
                    <div tw="text-[16px] text-[#3C3C3C] leading-[24px]">
                      Studied{' '}
                      {x.field && <span tw="font-semibold">{x.field}</span>} at{' '}
                      <span tw="font-semibold">{x.school}</span>
                    </div>
                    <div tw="text-[16px] text-[#8B8B8B] leading-[24px] mt-1">
                      {x.start}
                      {x.start !== x.end && '-' + (x.end || '')}
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div tw="font-semibold mt-9 text-[20px]">Career Details</div>
          <div tw="w-full mt-6 grid grid-cols-[115px 450px] gap-x-7 gap-y-9">
            <div css={styles.label}>Work</div>
            <div>
              <button tw="h-[40px] border border-[#D8D8D8] rounded-[6px] pl-4 pr-3 text-[#3C3C3C] text-[16px] flex items-center hover:bg-[#F5F5F5]">
                <Image
                  src="/assets/svgs/plus.svg"
                  alt="add education"
                  width="15px"
                  height="15px"
                />
                <div tw="ml-2">Add a workplace (coming soon)</div>
              </button>
              {data.experience
                .sort((a, b) => (b.end || 9999) - (a.end || 9999))
                .map((x, i) => (
                  <div key={i} tw="mt-5">
                    <div tw="text-[16px] text-[#3C3C3C] leading-[24px] font-semibold">
                      {x.position !== undefined && (
                        <>
                          {x.position} <span tw="font-normal"> at </span>
                        </>
                      )}
                      {x.company}
                    </div>
                    <div tw="text-[16px] text-[#8B8B8B] leading-[24px] mt-1">
                      {x.start}
                      {x.start !== x.end && '-' + x.end}
                    </div>
                  </div>
                ))}
            </div>
            <div css={styles.label}>Exhibition</div>
            <div>
              <button tw="h-[40px] border border-[#D8D8D8] rounded-[6px] pl-4 pr-3 text-[#3C3C3C] text-[16px] flex items-center hover:bg-[#F5F5F5]">
                <Image
                  src="/assets/svgs/plus.svg"
                  alt="add education"
                  width="15px"
                  height="15px"
                />
                <div tw="ml-2">Add an exhibition (coming soon)</div>
              </button>
              {data.exhibitions
                .sort((a, b) => b.year - a.year)
                .map((exhibition, i) => (
                  <div key={i} tw="mt-5">
                    <div tw="text-[16px] text-[#3C3C3C] leading-[24px] font-semibold">
                      {exhibition.gallery}
                    </div>
                    <div tw="text-[16px] text-[#8B8B8B] leading-[24px]">
                      {exhibition.year}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
