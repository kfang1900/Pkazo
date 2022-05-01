import React, { useCallback, useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Head from 'next/head';
import Image from 'next/image';
import Header from 'components/Header';
import Link from 'next/link';
import tw, { styled } from 'twin.macro';
import { getApp } from 'firebase/app';
import { doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore';

import { sample_artist } from 'utils/Sample_Posts_Imports';
import { showEdu, showExp, showExh } from 'obj/Artist';
import buttons from 'styles/Button';
import {
  fetchArtistByID,
  loadStorageImage,
} from '../../helpers/FirebaseFunctions';

const EditAccount: NextPage = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<
    | { name: string; location: string; discipline: string; bio: string }
    | undefined
  >();
  const uid = 'VWOgAFjhL0BlFlbDTJZF';

  const isDataModified = useCallback(
    (values: {
      name: string;
      location: string;
      discipline: string;
      bio: string;
    }) => {
      console.log(
        data,
        values.name === data.name,
        values.location === data.location,
        values.discipline === data.discipline,
        values.bio === data.bio
      );
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

  useEffect(() => {
    (async () => {
      const artistRef = await fetchArtistByID(uid);
      const artist = await artistRef.data();
      console.log(artist);
      setData({
        name: artist.Name,
        location: artist.Location,
        discipline: artist.Discipline,
        bio: artist.Bio,
        pfp: await loadStorageImage(artist.ProfilePicture),
        cover: await loadStorageImage(artist.Cover),
      });
    })();
  }, []);

  const pages = [
    'Edit Profile',
    'Change Password',
    'Apps and Websites',
    'Email and SMS',
    'Nothing to see here',
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
                    <div tw="overflow-hidden rounded-full flex items-center">
                      <Image
                        src={data.pfp}
                        alt="profile_image"
                        width="132px"
                        height="132px"
                        objectFit="cover"
                      />
                    </div>
                    <button tw="absolute right-0 bottom-0 w-[34px] h-[34px] rounded-full bg-black opacity-70 hover:opacity-60 pt-1">
                      <Image
                        src="/assets/svgs/camera.svg"
                        alt="edit pfp"
                        width="18px"
                        height="18px"
                      />
                    </button>
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
                    const db = getFirestore();
                    await updateDoc(doc(db, 'Artists', uid), {
                      Name: values.name,
                      Discipline: values.discipline,
                      Location: values.location,
                      Bio: values.bio,
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
                  <div tw="w-[852px] h-[201px]">
                    <Image
                      src={data.cover}
                      alt="Cover Photo"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <button tw="absolute right-3 bottom-3 w-[34px] h-[34px] rounded-full bg-black opacity-70 hover:opacity-60 pt-1">
                    <Image
                      src="/assets/svgs/camera.svg"
                      alt="edit pfp"
                      width="18px"
                      height="18px"
                    />
                  </button>
                </div>
                {/*
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
                  <div tw="ml-2">Add a college</div>
                </button>
                {user.education
                  .sort((a, b) => b.end - a.end)
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
                  <div tw="ml-2">Add a workplace</div>
                </button>
                {user.experience
                  .sort((a, b) => b.end - a.end)
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
                  <div tw="ml-2">Add an exhibition</div>
                </button>
                {user.exhibitions
                  .sort((a, b) => b.end - a.end)
                  .map((x, i) => (
                    <div key={i} tw="mt-5">
                      {showExh(x)}
                    </div>
                  ))}
              </div>
            </div>
            */}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default EditAccount;
