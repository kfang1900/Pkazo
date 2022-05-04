import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';
import { getApp } from 'firebase/app';
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { sample_artist } from 'utils/Sample_Posts_Imports';
import {
  showEdu,
  showExp,
  showExh,
  Artist,
  Experience,
  Exhibition,
  Education,
} from 'obj/Artist';
import buttons from 'styles/Button';
import {
  fetchArtistByID,
  loadStorageImage,
} from '../../helpers/FirebaseFunctions';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import ImageUploadButton from '../../components/account/ImageUploadButton';
import useAuth from '../../utils/useAuth';
type ArtistData = {
  name: string;
  location: string;
  discipline: string;
  bio: string;
  pfp: string;
  cover: string;
  education: Education[];
  exhibitions: Exhibition[];
  experience: Experience[];
};
const EditAccount: NextPage = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<ArtistData | undefined>();
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

        const artistsRef = collection(db, 'Artists');
        const q = query(artistsRef, where('AssociatedUser', '==', user.uid));

        const ref = await getDocs(q);

        ref.forEach((snapshot) => {
          setArtistId(snapshot.id); // assumes that there will only be one result
          const artist = snapshot.data();
          (async () => {
            setData({
              name: artist.Name,
              location: artist.Location,
              discipline: artist.Discipline,
              bio: artist.Bio,
              pfp: await loadStorageImage(artist.ProfilePicture),
              cover: await loadStorageImage(artist.Cover),
              education: artist.Education,
              experience: artist.Experience,
              exhibitions: artist.Exhibitions,
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

  const pages = [
    'Edit Profile',
    // 'Change Password',
    // 'Apps and Websites',
    // 'Email and SMS',
  ];
  const styles = {
    label: tw`text-[16px] text-[#8B8B8B] text-right mt-[10px]`,
    input: tw`border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]`,
  };
  return (
    <>
      <Head>
        <title>Feed</title>
      </Head>
      <Header isBuyer />
      <div tw="flex h-full">
        <div tw="sticky top-0 w-[289px] border-r border-r-[#D8D8D8] pt-2">
          {pages.map((p, i) => (
            <div
              key={i}
              css={[
                tw`my-5 py-2 ml-[60px] cursor-pointer`,
                page === i && tw`font-bold`,
              ]}
              onClick={() => setPage(i)}
            >
              {p}
            </div>
          ))}
        </div>
        {page === 0 && (
          <div tw="ml-[76px] mt-9 mb-[100px]">
            {!data && <p>Loading...</p>}
            {data && (
              <>
                <div tw="flex">
                  <div tw="w-[132px] h-[132px] relative">
                    <div tw="overflow-hidden rounded-full flex items-center ">
                      {data.pfp ? (
                        <Image
                          src={data.pfp}
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
                      uploadLocation={
                        'Artists/VWOgAFjhL0BlFlbDTJZF/Profile_Photo'
                      }
                      onError={(error) => {
                        console.log(error);
                      }}
                      onUploadComplete={async (uploadRef) => {
                        const app = getApp();
                        const db = getFirestore(app);
                        const gsURL = uploadRef.toString();

                        await updateDoc(doc(db, 'Artists', artistId), {
                          ProfilePicture: gsURL,
                        });

                        const pfpURL = await loadStorageImage(gsURL);

                        setData((oldData) => {
                          return Object.assign({}, oldData, {
                            pfp: pfpURL,
                          });
                        });
                      }}
                    />
                  </div>
                  <div tw="ml-9 flex flex-col justify-center">
                    <div tw="text-black text-[28px] font-semibold">
                      {data.name}
                    </div>
                    <div tw="text-[#8B8B8B] text-[20px] font-semibold mt-[10px]">
                      {data.location}
                      &nbsp;&nbsp;•&nbsp;&nbsp;{data.discipline}
                    </div>
                  </div>
                </div>
                <div tw="font-semibold mt-12 text-[20px]">
                  Basic Information
                </div>
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
                    await updateDoc(doc(db, 'Artists', artistId), {
                      Name: values.name,
                      Discipline: values.discipline,
                      Location: values.location,
                      Bio: values.bio,
                      PostNumber: 0,
                      WorkNumber: 0,
                    });
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
                      <Field
                        type="input"
                        name="discipline"
                        css={styles.input}
                      />
                      <div css={styles.label}>Location</div>
                      <Field type="input" name="location" css={styles.input} />
                      <div css={styles.label}>Bio</div>
                      <Field
                        component="textarea"
                        rows="8"
                        name="bio"
                        css={[styles.input, tw`w-[710px] h-[160px] py-2`]}
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
                    {data.cover && (
                      <Image
                        src={data.cover}
                        alt="Cover Photo"
                        layout="fill"
                        objectFit="cover"
                      />
                    )}
                  </div>

                  <div className="right-3 bottom-3">
                    <ImageUploadButton
                      uploadLocation={
                        'Artists/VWOgAFjhL0BlFlbDTJZF/Cover_Photo'
                      }
                      onError={(error) => {
                        console.log(error);
                      }}
                      onUploadComplete={async (uploadRef) => {
                        const app = getApp();
                        const db = getFirestore(app);
                        const gsURL = uploadRef.toString();

                        await updateDoc(doc(db, 'Artists', artistId), {
                          Cover: gsURL,
                        });

                        const coverImageURL = await loadStorageImage(gsURL);

                        setData((oldData) => {
                          return Object.assign({}, oldData, {
                            cover: coverImageURL,
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
                      .sort((a, b) => b.End - a.End)
                      .map((x, i) => (
                        <div key={i} tw="mt-5">
                          {showEdu(x)}
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
                      .sort((a, b) => b.End - a.End)
                      .map((x, i) => (
                        <div key={i} tw="mt-5">
                          {showExp(x)}
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
                      .sort((a, b) => b.Year - a.Year)
                      .map((x, i) => (
                        <div key={i} tw="mt-5">
                          {showExh(x)}
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EditAccount;
