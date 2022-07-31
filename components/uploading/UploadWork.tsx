import tw, { css } from 'twin.macro';
import * as Yup from 'yup';
import React, { useEffect, useMemo, useState } from 'react';
import { Formik, Form, Field, FormikBag } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FileUploader } from 'react-drag-drop-files';
import { useMediaQuery } from 'react-responsive';

import buttons from 'styles/Button';
import extraStyle from 'styles/UploadWork.module.css';
import useAuth from '../../utils/auth/useAuth';
import { getApp } from 'firebase/app';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { FirebaseStorage } from '@firebase/storage';
import {
  getStorage,
  ref,
  StorageError,
  uploadBytesResumable,
} from 'firebase/storage';
import { useRouter } from 'next/router';
import { WorkData } from '../../types/dbTypes';
import axios from 'axios';
import { loadStorageImageSafe } from '../../helpers/FirebaseFunctions';
import { updateWorksIndex } from '../../utils/indexes/updateIndexes';
import uploadImage from '../../utils/firebase/uploadImage';

/* copied from image.tsx */
interface StaticRequire {
  default: StaticImageData;
}
type StaticImport = StaticRequire | StaticImageData;

const mediums = [
  'Oil',
  'Watercolor',
  'Acrylic',
  'Ink',
  'Gouache',
  'Spraypaint',
];
const surfaces = [
  'Stretched canvas',
  'Canvas board',
  'Wood',
  'Fabric',
  'Linen',
  'Paper',
];
const units = ['in', 'cm', 'ft'];
const saleSubjects = [
  'Portrait',
  'Nature',
  'Street',
  'Beach',
  'Floral',
  'Vacation',
  'Tropical',
];
const saleStyles = [
  'Abstract',
  'Cubist',
  'Expressoinist',
  'Folk',
  'Impressionist',
  'Minimalist',
  'Photorealist',
  'Pointillist',
  'Pop art',
  'Psychedelic',
  'Surrealist',
];
// const saleColors = [
//   'rgb(36, 113, 237)',
//   'rgb(219, 9, 9)',
//   'rgb(6, 145, 20)',
//   'rgb(255, 123, 0)',
//   'rgb(255, 225, 0)',
//   'rgb(255, 43, 248)',
//   'rgb(113, 8, 199)',
//   'rgb(0, 0, 0)',
// ];
const saleColors = ['🟥', '🟧', '🟨', '🟩', '🟦', '🟪', '🟫', '⬛', '⬜'];
const saleColorStrings = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple',
  'brown',
  'black',
  'white',
];

function DropdownButton() {
  return (
    <button tw="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 transform">
      <svg
        width="14"
        height="9"
        viewBox="0 0 14 9"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.73757 6.17509L1.26509 0.705078L0.205078 1.76609L6.73807 8.29609L13.2651 1.76605L12.2046 0.705547L6.73757 6.17509Z"
          fill="#8E8E93"
        />
      </svg>
    </button>
  );
}

const validationSchema = Yup.object().shape({
  title: Yup.string().max(100, 'Too Long!').required('This value is required.'),
  description: Yup.string().required('This value is required.'),
  portfolio: Yup.string().required('You must select a portfolio.'),
  year: Yup.string(),
  medium: Yup.string().required('You must select a medium.'),
  surface: Yup.string().required('You must select a surface type.'),
  height: Yup.string().required('This value is required.'),
  width: Yup.string().required('This value is required.'),
  units: Yup.string().required('This value is required.'),
  forSale: Yup.string().required('This value is required.'),
  salePrice: Yup.string().when('forSale', {
    is: 'yes',
    then: Yup.string()
      .required('This value is required.')
      .test('is-number', 'The price must be at least $1', (value) => {
        try {
          parseFloat(value + '');
          return true;
        } catch (e) {
          return false;
        }
      })
      .test(
        'min-price',
        'The price must be at least $1',
        (value) => parseFloat(value + '') >= 1
      )
      .test(
        'max-price',
        'To set a price higher than $1,000,000, please contact us.',
        (value) => parseFloat(value + '') <= 1000000
      ),
  }),
  saleSubject: Yup.string().when('forSale', {
    is: 'yes',
    then: Yup.string().required('This value is required.'),
  }),
  saleStyle: Yup.string().when('forSale', {
    is: 'yes',
    then: Yup.string().required('This value is required.'),
  }),
  saleOrientation: Yup.string().when('forSale', {
    is: 'yes',
    then: Yup.string().required('This value is required.'),
  }),
  saleColor: Yup.string().when('forSale', {
    is: 'yes',
    then: Yup.string().required('This value is required.'),
  }),
  saleFraming: Yup.string().when('forSale', {
    is: 'yes',
    then: Yup.string().required('This value is required.'),
  }),
  forPrint: Yup.string().required('This value is required.'),
  printPrice: Yup.string().when('forPrint', {
    is: 'yes',
    then: Yup.string()
      .required('This value is required.')
      .test('is-number', 'The price must be at least $1', (value) => {
        try {
          parseFloat(value + '');
          return true;
        } catch (e) {
          return false;
        }
      })
      .test(
        'min-price',
        'The price must be at least $1',
        (value) => parseFloat(value + '') >= 1
      )
      .test(
        'max-price',
        'To set a price higher than $1,000,000, please contact us.',
        (value) => parseFloat(value + '') <= 1000000
      ),
  }),
  printHeight: Yup.string().when('forPrint', {
    is: 'yes',
    then: Yup.string().required('This value is required.'),
  }),
  printWidth: Yup.string().when('forPrint', {
    is: 'yes',
    then: Yup.string().required('This value is required.'),
  }),
  printUnits: Yup.string().when('forPrint', {
    is: 'yes',
    then: Yup.string().required('This value is required.'),
  }),
  printSurface: Yup.string().when('forPrint', {
    is: 'yes',
    then: Yup.string().required('This value is required.'),
  }),
  printFraming: Yup.string().when('forPrint', {
    is: 'yes',
    then: Yup.string().required('This value is required.'),
  }),
});

function UploadWork({
  onClose,
  workId,
  toShow,
}: {
  onClose: () => void;
  workId?: string;
  toShow: boolean;
}) {
  const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
  }, [mediaQuery, isMobile]);

  // just to be explicit
  const editMode = !!workId;
  const saleOrientations = ['Horizontal', 'Vertical', 'Square'];
  const printSurfaces = ['Fine Art Paper', 'Canvas'];
  const styles = {
    label: tw`text-[14px] leading-5 text-[#3C3C3C]`,
    input: tw`border rounded-[6px] px-3 text-[14px] w-full focus:outline-none`,
    dropdown: tw`w-full md:w-[132px] h-[30px] rounded-[20px] border pl-4 pr-5 md:pr-0 appearance-none focus:outline-none text-[14px] text-[#838383]`,
  };

  const [selected, setSelected] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<
    ({
      url: string;
    } & (
      | {
          isLocal: true;
          file: File;
        }
      | { isLocal: false; ref: string }
    ))[]
  >([]);
  const [uploadPage, setUploadPage] = useState(0);
  const [portfolios, setPortfolios] = useState<{ name: string; id: string }[]>(
    []
  );
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.loading || !auth.artistId || portfolios.length > 0) return;
    const app = getApp();
    const db = getFirestore();
    getDocs(collection(db, 'artists', auth.artistId, 'portfolios')).then(
      (querySnapshot) => {
        setPortfolios(
          querySnapshot.docs.map((portfolio) => ({
            id: portfolio.id,
            name: portfolio.data().name,
          }))
        );
      }
    );
  }, [auth]);
  const [editData, setEditData] = useState<WorkData | null>(null);
  useEffect(() => {
    (async () => {
      if (!editMode) return;
      const db = getFirestore();
      const snapshot = await getDoc(doc(db, 'works', workId + ''));
      const data = snapshot.data() as WorkData;
      setEditData(data);
      const _uploadedImages = await Promise.all(
        data.images.map((image) =>
          loadStorageImageSafe(image).then(
            (url) =>
              ({
                isLocal: false,
                ref: image,
                url: url,
              } as {
                isLocal: false;
                ref: string;
                url: string;
              })
          )
        )
      );
      setUploadedImages(_uploadedImages);
    })();
  }, [editMode, workId]);
  const initialFormValues = useMemo(() => {
    if (!editMode) {
      const savedData = JSON.parse(
        typeof window !== 'undefined'
          ? localStorage.getItem('pkazo-upload-work-saved-data') || '{}'
          : '{}'
      );

      return Object.assign(
        {
          title: '',
          description: '',
          portfolio: '',
          year: new Date().getFullYear(),
          medium: '',
          surface: '',
          height: '',
          width: '',
          units: 'in',
          forSale: 'yes',
          salePrice: '',
          saleSubject: '',
          saleStyle: '',
          saleOrientation: '',
          saleColor: '',
          saleFraming: 'no',
          forPrint: 'no',
          printPrice: '',
          printHeight: '',
          printWidth: '',
          printUnits: 'in',
          printSurface: '',
          printFraming: 'no',
        },
        savedData,
        {
          title: '',
          description: '',
        }
      );
    }
    if (!editData) return null;
    return {
      title: editData.title,
      description: editData.description,
      portfolio: editData.portfolio,
      year: editData.year,
      medium: editData.medium,
      surface: editData.surface,
      height: editData.height,
      width: editData.width,
      units: editData.units,
      forSale: editData.forSale ? 'yes' : 'no',
      salePrice: editData.forSale ? editData.sale.price : '',
      saleSubject: editData.forSale ? editData.sale.subject : '',
      saleStyle: editData.forSale ? editData.sale.style : '',
      saleOrientation: editData.forSale ? editData.sale.orientation : '',
      saleColor: editData.forSale ? editData.sale.color : '',
      saleFraming: editData.forSale
        ? editData.sale.framing
          ? 'yes'
          : 'no'
        : '',
      forPrint: editData.forPrint ? 'yes' : 'no',
      printPrice: editData.forPrint ? editData.print.price : '',
      printHeight: editData.forPrint ? editData.print.height : '',
      printWidth: editData.forPrint ? editData.print.width : '',
      printUnits: editData.forPrint ? editData.print.units : '',
      printSurface: editData.forPrint ? editData.print.surface : '',
      printFraming: editData.forPrint
        ? editData.print.framing
          ? 'yes'
          : 'no'
        : '',
    };
  }, [editMode, editData]);

  return (
    <div
      tw="fixed top-0 left-0 w-full z-50 flex items-center justify-center overflow-auto md:p-[50px]"
      css={[
        toShow && tw`h-full bg-black/40`,
        !toShow && !isMobile && tw`hidden`,
      ]}
    >
      {toShow && <style>{`body {overflow: hidden}`}</style>}
      <div tw="flex md:m-auto" css={[isMobile && tw`w-full justify-center`]}>
        <div
          css={[
            isMobile
              ? tw`fixed top-full -bottom-full bg-white w-full rounded-t-[12px] flex flex-col overflow-hidden duration-300`
              : tw`bg-white rounded-[20px] z-20 p-[52px] w-[1171px] h-[746px]`,
            isMobile && toShow && tw`top-[30px] bottom-0`,
            !isMobile && !toShow && tw`hidden`,
          ]}
        >
          {initialFormValues && (
            <Formik
              initialValues={initialFormValues}
              //validationSchema={validationSchema}
              //validator={() => ({})}
              onSubmit={async (values) => {
                console.log('submitting formik', values, initialFormValues);

                try {
                  if (!auth.artistId) return;

                  console.log(values);
                  localStorage.setItem(
                    'pkazo-upload-work-saved-data',
                    JSON.stringify(values)
                  );

                  if (uploadedImages.length === 0) {
                    alert('Please select at least one image for this work.');
                    return;
                  }
                  if (!values.portfolio) {
                    alert(
                      'Please select a portfolio for this work to live in.'
                    );
                    return;
                  }

                  const app = getApp();
                  const db = getFirestore(app);
                  const storage = getStorage(app);
                  // TODO: make this atomic with transactions
                  const ivalues = initialFormValues;
                  const dataToUpload = {
                    ...(values.title !== '' && { title: values.title }),
                    ...(values.description !== '' && {
                      description: values.description,
                    }),
                    ...(values.portfolio !== undefined && {
                      portfolio: values.portfolio,
                    }),
                    ...(values.year !== undefined && { year: values.year }),
                    ...(values.medium !== undefined && {
                      medium: values.medium,
                    }),
                    ...(values.surface !== undefined && {
                      surface: values.surface,
                    }),
                    ...(values.height !== undefined && {
                      height: values.height,
                    }),
                    ...(values.width !== undefined && {
                      width: parseFloat(values.width + ''),
                    }),
                    ...(values.units !== undefined && { units: values.units }),
                    forSale: values.forSale === 'yes',
                    ...(values.forSale === 'yes'
                      ? {
                          sale: {
                            ...(values.salePrice !== '' && {
                              price: values.salePrice,
                            }),
                            ...(values.saleSubject !== '' && {
                              subject: values.saleSubject,
                            }),
                            ...(values.saleColor !== '' && {
                              color: values.saleColor,
                            }),
                            ...(values.saleStyle !== '' && {
                              style: values.saleStyle,
                            }),
                            ...(values.saleFraming !== '' && {
                              framing: values.saleFraming,
                            }),
                          },
                        }
                      : {}),
                    forPrint: values.forPrint === 'yes',
                    ...(values.forPrint === 'yes'
                      ? {
                          print: {
                            ...(values.printPrice !== '' && {
                              price: values.printPrice,
                            }),
                            ...(values.height !== '' && {
                              height: parseFloat(values.height + ''),
                            }),
                            ...(values.width !== '' && {
                              width: parseFloat(values.width + ''),
                            }),
                            ...(values.printUnits !== '' && {
                              units: values.printUnits,
                            }),
                            ...(values.printSurface !== '' && {
                              surface: values.printSurface,
                            }),
                            ...(values.printFraming !== '' && {
                              framing: values.printFraming,
                            }),
                          },
                        }
                      : {}),
                    artist: auth.artistId,
                    // serverTimestamp() is not technically a Timestamp, but it will become one on the server.
                    ...(editMode && {
                      timestamp: serverTimestamp() as Timestamp,
                    }),
                    editTimestamps:
                      editMode && editData
                        ? arrayUnion(Timestamp.fromDate(new Date()))
                        : [],
                    images:
                      editMode && editData
                        ? uploadedImages
                            .filter((i) => !i.isLocal)
                            .map((i) =>
                              !i.isLocal
                                ? i.ref
                                : 'this value should be unreachable 1'
                            )
                        : [],
                  } as WorkData;
                  let workRef;
                  console.log('updating work: ', editMode, dataToUpload);
                  if (!editMode) {
                    workRef = await addDoc(
                      collection(db, 'works'),
                      dataToUpload
                    );
                    workId = workRef.id;
                  } else {
                    workRef = await updateDoc(
                      doc(db, 'works', workId + ''),
                      dataToUpload
                    );
                    if (editData && editData.portfolio !== values.portfolio) {
                      await updateDoc(
                        doc(
                          db,
                          'artists',
                          auth.artistId || '',
                          'portfolios',
                          editData.portfolio
                        ),
                        {
                          works: arrayRemove(workId),
                        }
                      );
                    }
                  }
                  await updateDoc(
                    doc(
                      db,
                      'artists',
                      auth.artistId || '',
                      'portfolios',
                      values.portfolio
                    ),
                    {
                      works: arrayUnion(workId),
                    }
                  );
                  const imageReferences = await Promise.all(
                    uploadedImages
                      .filter((i) => i.isLocal)
                      .map((image) =>
                        image.isLocal
                          ? uploadImage(
                              storage,
                              image.file,
                              `/Works/${workId}/`
                            )
                          : 'this value should be unreachable 2'
                      )
                  );
                  await updateDoc(doc(db, 'works', workId + ''), {
                    images: arrayUnion(...imageReferences),
                  });
                  await updateWorksIndex(workId + '');
                  if (!editMode) {
                    onClose();
                    router.push(`/work/${workId}`);
                    window.location.reload();
                  } else {
                    onClose();
                  }
                } catch (error: any) {
                  console.log(error);
                  throw error;
                  alert('An error occurred ' + error?.message);
                }
              }}
            >
              {({
                values,
                errors,
                isSubmitting,
                setFieldValue,
                setFieldTouched,
                touched,
              }) => (
                <Form>
                  {isMobile && (
                    <div tw="w-full flex items-center justify-between gap-x-4 px-5 py-[18px] border-b border-b-[#E2E2E2]">
                      <button tw="w-4 h-4" onClick={onClose}>
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9.40898 7.99829L15.7044 1.71285C15.8926 1.52468 15.9983 1.26947 15.9983 1.00336C15.9983 0.737256 15.8926 0.482046 15.7044 0.293879C15.5162 0.105711 15.261 0 14.9949 0C14.7288 0 14.4736 0.105711 14.2854 0.293879L8 6.58932L1.71456 0.293879C1.52639 0.105711 1.27118 2.36263e-07 1.00507 2.38246e-07C0.738961 2.40229e-07 0.483751 0.105711 0.295584 0.293879C0.107417 0.482046 0.0017056 0.737256 0.0017056 1.00336C0.0017056 1.26947 0.107417 1.52468 0.295584 1.71285L6.59102 7.99829L0.295584 14.2837C0.201924 14.3766 0.127583 14.4872 0.0768515 14.6089C0.0261196 14.7307 0 14.8613 0 14.9932C0 15.1251 0.0261196 15.2558 0.0768515 15.3775C0.127583 15.4993 0.201924 15.6098 0.295584 15.7027C0.38848 15.7964 0.499001 15.8707 0.620772 15.9214C0.742543 15.9722 0.873154 15.9983 1.00507 15.9983C1.13699 15.9983 1.2676 15.9722 1.38937 15.9214C1.51114 15.8707 1.62166 15.7964 1.71456 15.7027L8 9.40727L14.2854 15.7027C14.3783 15.7964 14.4889 15.8707 14.6106 15.9214C14.7324 15.9722 14.863 15.9983 14.9949 15.9983C15.1268 15.9983 15.2575 15.9722 15.3792 15.9214C15.501 15.8707 15.6115 15.7964 15.7044 15.7027C15.7981 15.6098 15.8724 15.4993 15.9232 15.3775C15.9739 15.2558 16 15.1251 16 14.9932C16 14.8613 15.9739 14.7307 15.9232 14.6089C15.8724 14.4872 15.7981 14.3766 15.7044 14.2837L9.40898 7.99829Z"
                            fill="#3C3C3C"
                          />
                        </svg>
                      </button>
                      <div tw="w-full text-center text-[16px] leading-[1em] text-[#3C3C3C] font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                        {values.title || 'New Work'}
                      </div>
                      <button
                        type={'submit'}
                        tw="text-[16px] leading-[1em] text-[#3C3C3C] font-semibold"
                      >
                        Save
                      </button>
                    </div>
                  )}
                  {uploadPage === 0 && (
                    <div
                      css={[
                        isMobile &&
                          tw`px-4 pb-6 overflow-auto h-[600px] flex flex-col`,
                      ]}
                    >
                      <div tw="md:flex">
                        {/* image */}
                        <div tw="md:w-[550px] md:h-[642px]">
                          {(uploadedImages.length > 0 || isMobile) && (
                            <div>
                              {!isMobile && (
                                <div tw="h-[570px] transform overflow-hidden">
                                  <Image
                                    src={uploadedImages[selected].url}
                                    alt="selected image"
                                    layout="fill"
                                    objectFit="contain"
                                  />
                                </div>
                              )}
                              <div tw="flex overflow-x-auto gap-x-3 mt-4 md:mt-3">
                                {uploadedImages.map((image, index) => (
                                  <div
                                    key={index}
                                    css={[
                                      tw`w-[60px] rounded-[5px] overflow-hidden cursor-pointer flex-shrink-0`,
                                      index !== selected &&
                                        !isMobile &&
                                        tw`opacity-30`,
                                      { aspectRatio: '1/1' },
                                    ]}
                                    onClick={() => setSelected(index)}
                                  >
                                    <div tw="transform w-full h-full">
                                      <Image
                                        src={image.url}
                                        alt="Uploaded Image"
                                        layout="fill"
                                        objectFit="cover"
                                      />
                                    </div>
                                  </div>
                                ))}
                                <FileUploader
                                  multiple={true}
                                  name="upload-work-image"
                                  types={['PNG', 'JPG', 'JPEG']}
                                  handleChange={(files: File[]) => {
                                    setUploadedImages((state) => [
                                      ...state,
                                      ...Array.from(files)
                                        .flat()
                                        .map(
                                          (file: File) =>
                                            ({
                                              file,
                                              url: URL.createObjectURL(file),
                                              isLocal: true,
                                            } as {
                                              file: File;
                                              url: string;
                                              isLocal: true;
                                            })
                                        ),
                                    ]);
                                  }}
                                >
                                  <div
                                    tw="w-[60px] h-[60px] rounded-[5px] transform overflow-hidden bg-[#F3F3F3] cursor-pointer"
                                    css={{ 'aspect-ratio': '1/1' }}
                                  >
                                    <FontAwesomeIcon
                                      icon={solid('plus')}
                                      tw="text-2xl text-[#C4C4C4] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                                    />
                                  </div>
                                </FileUploader>
                              </div>
                            </div>
                          )}
                          {uploadedImages.length === 0 && !isMobile && (
                            <div tw="h-full flex flex-col items-center justify-center pb-[30px]">
                              <img
                                src="/assets/svgs/upload_work.svg"
                                tw="mb-20"
                              />
                              <FileUploader
                                multiple={true}
                                name="upload-work-image"
                                types={['PNG', 'JPG', 'JPEG']}
                                handleChange={(files: File[]) => {
                                  setUploadedImages((state) => [
                                    ...state,
                                    ...Array.from(files)
                                      .flat()
                                      .map(
                                        (file: File) =>
                                          ({
                                            file,
                                            url: URL.createObjectURL(file),
                                            isLocal: true,
                                          } as {
                                            file: File;
                                            url: string;
                                            isLocal: true;
                                          })
                                      ),
                                  ]);
                                }}
                              >
                                <button
                                  type={'button'}
                                  css={[buttons.red, tw`text-[16px] h-11 px-8`]}
                                >
                                  Select from computer
                                </button>
                              </FileUploader>
                            </div>
                          )}
                        </div>
                        {/* contents */}
                        <div tw="flex flex-col items-end w-full md:w-[465px] md:ml-[52px] mt-4 md:mt-6 md:mt-0">
                          <div
                            tw="w-full md:h-[600px] md:overflow-y-auto"
                            className={isMobile ? '' : extraStyle['workInfo']}
                          >
                            <Field
                              type="text"
                              name="title"
                              placeholder="Title"
                              css={[
                                styles.input,
                                tw`h-[34px] leading-[14px]`,
                                touched.title && errors.title
                                  ? tw`border-red-600 focus:border-red-800`
                                  : tw`border-[#D8D8D8] focus:border-[#888888]`,
                              ]}
                            />
                            {touched.title && errors.title && (
                              <p tw={'text-red-800 text-xs mt-1'}>
                                {errors.title}
                              </p>
                            )}
                            <Field
                              type="text"
                              component="textarea"
                              name="description"
                              rows="3"
                              placeholder="Write a description..."
                              css={[
                                styles.input,
                                tw`mt-3 py-[10px] leading-5 resize-none`,
                                touched.description && errors.description
                                  ? tw`border-red-600 focus:border-red-800`
                                  : tw`border-[#D8D8D8] focus:border-[#888888]`,
                              ]}
                            />
                            {touched.description && errors.description && (
                              <p tw={'text-red-800 text-xs mt-1'}>
                                {errors.description}
                              </p>
                            )}
                            <div tw="md:px-3">
                              <div tw="grid grid-cols-2 gap-x-4 md:gap-x-[25px] gap-y-3 items-center mt-4">
                                <div tw="flex items-center">
                                  <div
                                    css={[
                                      styles.label,
                                      tw`w-[69px] md:w-[76px]`,
                                    ]}
                                  >
                                    Portfolio
                                  </div>
                                  <div tw="relative flex-1">
                                    <select
                                      name="portfolio"
                                      css={[
                                        styles.dropdown,
                                        touched.portfolio && errors.portfolio
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                      onChange={(e) =>
                                        setFieldValue(
                                          'portfolio',
                                          e.target.value
                                        )
                                      }
                                      onBlur={() =>
                                        setFieldTouched('portfolio')
                                      }
                                      value={values.portfolio}
                                    >
                                      <option value="" disabled />
                                      {portfolios.map((portfolio) => (
                                        <option
                                          value={portfolio.id}
                                          key={portfolio.id}
                                        >
                                          {portfolio.name}
                                        </option>
                                      ))}
                                    </select>
                                    <DropdownButton />
                                  </div>
                                </div>

                                <div tw="flex items-center">
                                  <div
                                    css={[
                                      styles.label,
                                      tw`w-[69px] md:w-[76px]`,
                                    ]}
                                  >
                                    Year
                                  </div>
                                  <div tw="relative flex-1">
                                    <select
                                      name="year"
                                      css={[
                                        styles.dropdown,
                                        touched.year && errors.year
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                      onChange={(e) =>
                                        setFieldValue(
                                          'year',
                                          parseInt(e.target.value)
                                        )
                                      }
                                      onBlur={() => setFieldTouched('year')}
                                      value={values.year}
                                    >
                                      {Array(...Array(100)).map(
                                        (value, key) => (
                                          <option key={key} value={2022 - key}>
                                            {2022 - key}
                                          </option>
                                        )
                                      )}
                                    </select>
                                    <DropdownButton />
                                  </div>
                                </div>
                                <div tw="flex items-center">
                                  <div
                                    css={[
                                      styles.label,
                                      tw`w-[69px] md:w-[76px]`,
                                    ]}
                                  >
                                    Medium
                                  </div>
                                  <div tw="relative flex-1">
                                    <select
                                      onChange={(e) =>
                                        setFieldValue('medium', e.target.value)
                                      }
                                      onBlur={() => setFieldTouched('medium')}
                                      value={values.medium}
                                      name="medium"
                                      css={[
                                        styles.dropdown,
                                        touched.medium && errors.medium
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                    >
                                      <option value="" disabled />
                                      {mediums.map((value, i) => (
                                        <option key={i} value={value}>
                                          {value}
                                        </option>
                                      ))}
                                    </select>
                                    <DropdownButton />
                                  </div>
                                </div>
                                <div tw="flex items-center">
                                  <div
                                    css={[
                                      styles.label,
                                      tw`w-[69px] md:w-[76px]`,
                                    ]}
                                  >
                                    Surface
                                  </div>
                                  <div tw="relative flex-1">
                                    <select
                                      onChange={(e) =>
                                        setFieldValue('surface', e.target.value)
                                      }
                                      onBlur={() => setFieldTouched('surface')}
                                      value={values.surface}
                                      name="surface"
                                      css={[
                                        styles.dropdown,
                                        tw`pr-6 overflow-ellipsis`,
                                        touched.surface && errors.surface
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                    >
                                      <option value="" disabled />
                                      {surfaces.map((value, i) => (
                                        <option key={i} value={value}>
                                          {value}
                                        </option>
                                      ))}
                                    </select>
                                    <DropdownButton />
                                  </div>
                                </div>
                              </div>
                              <div tw="flex items-center mt-3">
                                <div css={[styles.label, tw`w-[60px]`]}>
                                  Size
                                </div>
                                <div tw="text-[14px] text-[#838383]">W:</div>
                                <Field
                                  type="number"
                                  name="width"
                                  css={[
                                    styles.dropdown,
                                    tw`w-[52px] md:w-[52px] pl-3 pr-0 ml-1`,
                                    touched.height && errors.height
                                      ? tw`border-red-600 focus:border-red-800`
                                      : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                  ]}
                                  className={extraStyle['numberInput']}
                                  min="0"
                                />
                                <div tw="text-[14px] text-[#838383] ml-2">
                                  H:
                                </div>
                                <Field
                                  type="number"
                                  name="height"
                                  css={[
                                    styles.dropdown,
                                    tw`w-[52px] md:w-[52px] pl-3 pr-0 mx-1`,
                                    touched.width && errors.width
                                      ? tw`border-red-600 focus:border-red-800`
                                      : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                  ]}
                                  className={extraStyle['numberInput']}
                                  min="0"
                                />
                                <div tw="relative ml-3">
                                  <select
                                    onChange={(e) =>
                                      setFieldValue('units', e.target.value)
                                    }
                                    onBlur={() => setFieldTouched('units')}
                                    value={values.units}
                                    name="units"
                                    css={[
                                      styles.dropdown,
                                      tw`w-[60px] md:w-[60px] pl-3`,
                                      touched.units && errors.units
                                        ? tw`border-red-600 focus:border-red-800`
                                        : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                    ]}
                                  >
                                    {units.map((value, i) => (
                                      <option key={i} value={value}>
                                        {value}
                                      </option>
                                    ))}
                                  </select>
                                  <DropdownButton />
                                </div>
                              </div>
                            </div>
                            <div
                              tw="w-full md:border md:border-[#D8D8D8] mt-5 md:mt-4 md:rounded-[5px] md:p-4"
                              css={[
                                isMobile &&
                                  tw`border-t border-t-[#D8D8D8] py-5`,
                              ]}
                            >
                              <div tw="flex text-[14px] text-[#3C3C3C] justify-between">
                                Work for Sale?
                                <div tw="flex items-center text-[14px] text-[#838383]">
                                  <Field
                                    type="radio"
                                    name="forSale"
                                    value="yes"
                                    id="yesForSale"
                                    tw="w-[14px] h-[14px] mr-3"
                                    css={{ 'accent-color': '#E24E4D' }}
                                  />
                                  <label htmlFor="yesForSale">Yes</label>
                                  <Field
                                    type="radio"
                                    name="forSale"
                                    value="no"
                                    id="noForSale"
                                    tw="w-[14px] h-[14px] mr-3 ml-7"
                                    css={{ 'accent-color': '#E24E4D' }}
                                  />
                                  <label htmlFor="noForSale">No</label>
                                </div>
                              </div>
                              {values.forSale === 'yes' && (
                                <div tw="md:mx-5 mt-4 md:mt-3 grid grid-cols-[75px auto] md:grid-cols-2 justify-between items-center gap-y-3">
                                  <div css={styles.label}>Price</div>
                                  <div tw="relative ml-auto">
                                    <Field
                                      type="number"
                                      name="salePrice"
                                      css={[
                                        styles.dropdown,
                                        tw`pl-[30px] w-[132px]`,
                                        touched.salePrice && errors.salePrice
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                      min="1"
                                      max="1000000"
                                      className={extraStyle['numberInput']}
                                    />
                                    <div tw="text-[14px] text-[#838383] absolute left-4 top-[4px]">
                                      $
                                    </div>
                                    {touched.salePrice && errors.salePrice && (
                                      <p tw={'text-red-800 text-xs mt-1'}>
                                        {errors.salePrice}
                                      </p>
                                    )}
                                  </div>

                                  <div css={styles.label}>Subject</div>
                                  <div tw="relative ml-auto">
                                    <select
                                      onChange={(e) =>
                                        setFieldValue(
                                          'saleSubject',
                                          e.target.value
                                        )
                                      }
                                      onBlur={() =>
                                        setFieldTouched('saleSubject')
                                      }
                                      value={values.saleSubject}
                                      name="saleSubject"
                                      css={[
                                        styles.dropdown,
                                        tw`w-[132px]`,
                                        touched.saleSubject &&
                                        errors.saleSubject
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                    >
                                      <option value="" disabled />
                                      {saleSubjects.map((value, i) => (
                                        <option key={i} value={value}>
                                          {value}
                                        </option>
                                      ))}
                                    </select>
                                    <DropdownButton />
                                  </div>
                                  <div css={styles.label}>Style</div>
                                  <div tw="relative ml-auto">
                                    <select
                                      onChange={(e) =>
                                        setFieldValue(
                                          'saleStyle',
                                          e.target.value
                                        )
                                      }
                                      onBlur={() =>
                                        setFieldTouched('saleStyle')
                                      }
                                      value={values.saleStyle}
                                      name="saleStyle"
                                      css={[
                                        styles.dropdown,
                                        tw`w-[132px]`,
                                        touched.saleStyle && errors.saleStyle
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                    >
                                      <option value="" disabled />
                                      {saleStyles.map((value, i) => (
                                        <option key={i} value={value}>
                                          {value}
                                        </option>
                                      ))}
                                    </select>
                                    <DropdownButton />
                                  </div>
                                  <div css={styles.label}>Orientation</div>
                                  <div tw="relative ml-auto">
                                    <select
                                      onChange={(e) =>
                                        setFieldValue(
                                          'saleOrientation',
                                          e.target.value
                                        )
                                      }
                                      onBlur={() =>
                                        setFieldTouched('saleOrientation')
                                      }
                                      value={values.saleOrientation}
                                      name="saleOrientation"
                                      css={[
                                        styles.dropdown,
                                        tw`w-[132px]`,
                                        touched.saleOrientation &&
                                        errors.saleOrientation
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                    >
                                      <option value="" disabled />
                                      {saleOrientations.map((value, i) => (
                                        <option key={i} value={value}>
                                          {value}
                                        </option>
                                      ))}
                                    </select>
                                    <DropdownButton />
                                  </div>
                                  <div css={styles.label}>Main Color</div>
                                  <div tw="relative ml-auto">
                                    <select
                                      onChange={(e) =>
                                        setFieldValue(
                                          'saleColor',
                                          e.target.value
                                        )
                                      }
                                      onBlur={() =>
                                        setFieldTouched('saleColor')
                                      }
                                      value={values.saleColor}
                                      name="saleColor"
                                      css={[
                                        styles.dropdown,
                                        tw`w-[64px] md:w-[73px]`,
                                        touched.saleColor && errors.saleColor
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                    >
                                      <option value="" disabled />
                                      {saleColors.map((value, i) => (
                                        <option
                                          key={i}
                                          value={saleColorStrings[i]}
                                        >
                                          {value}
                                        </option>
                                      ))}
                                    </select>
                                    <DropdownButton />
                                  </div>
                                  <div css={styles.label}>Framing</div>
                                  <div tw="flex items-center text-[14px] text-[#838383] ml-auto">
                                    <Field
                                      type="radio"
                                      name="saleFraming"
                                      value="yes"
                                      id="yesSaleFraming"
                                      tw="w-[14px] h-[14px] mr-3"
                                      css={[
                                        { 'accent-color': '#6C6C6C' },
                                        touched.saleFraming &&
                                        errors.saleFraming
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                    />
                                    <label htmlFor="yesSaleFraming">
                                      Framed
                                    </label>
                                    <Field
                                      type="radio"
                                      name="saleFraming"
                                      value="no"
                                      id="noSaleFraming"
                                      tw="w-[14px] h-[14px] mr-3 ml-6 md:ml-7"
                                      css={[
                                        { 'accent-color': '#6C6C6C' },
                                        touched.saleFraming &&
                                        errors.saleFraming
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                    />
                                    <label htmlFor="noSaleFraming">
                                      Unframed
                                    </label>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div
                              tw="w-full md:border md:border-[#D8D8D8] md:mt-4 md:rounded-[5px] md:p-4"
                              css={[
                                isMobile &&
                                  tw`border-t border-t-[#D8D8D8] pt-5`,
                              ]}
                            >
                              <div tw="flex text-[14px] text-[#3C3C3C] justify-between">
                                Prints Available?
                                <div tw="flex items-center text-[14px] text-[#838383]">
                                  <Field
                                    type="radio"
                                    name="forPrint"
                                    value="yes"
                                    id="yesForPrint"
                                    tw="w-[14px] h-[14px] mr-3"
                                    css={[
                                      { 'accent-color': '#E24E4D' },
                                      touched.forPrint && errors.forPrint
                                        ? tw`border-red-600 focus:border-red-800`
                                        : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                    ]}
                                  />
                                  <label htmlFor="yesForPrint">Yes</label>
                                  <Field
                                    type="radio"
                                    name="forPrint"
                                    value="no"
                                    id="noForPrint"
                                    tw="w-[14px] h-[14px] mr-3 ml-7"
                                    css={[
                                      { 'accent-color': '#E24E4D' },
                                      touched.forPrint && errors.forPrint
                                        ? tw`border-red-600 focus:border-red-800`
                                        : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                    ]}
                                  />
                                  <label htmlFor="noForPrint">No</label>
                                </div>
                              </div>
                              {values.forPrint === 'yes' && (
                                <div tw="md:mx-5 mt-4 md:mt-3 grid grid-cols-[70px auto] md:grid-cols-[150px auto] justify-between items-center gap-y-3">
                                  <div css={styles.label}>Price</div>
                                  <div tw="relative ml-auto">
                                    <Field
                                      type="number"
                                      name="printPrice"
                                      css={[
                                        styles.dropdown,
                                        tw`pl-[30px] w-[132px]`,
                                        touched.printPrice && errors.printPrice
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                      min="1"
                                      max="1000000"
                                    />
                                    <div tw="text-[14px] text-[#838383] absolute left-4 top-[4px]">
                                      $
                                    </div>
                                    {touched.printPrice &&
                                      errors.printPrice && (
                                        <p tw={'text-red-800 text-xs mt-1'}>
                                          {errors.printPrice}
                                        </p>
                                      )}
                                  </div>
                                  <div css={styles.label}>Size</div>
                                  <div tw="ml-auto flex items-center">
                                    <div tw="text-[14px] text-[#838383]">
                                      W:
                                    </div>
                                    <Field
                                      type="number"
                                      name="printWidth"
                                      css={[
                                        styles.dropdown,
                                        tw`w-[52px] md:w-[52px] pl-3 pr-0 ml-1`,
                                        touched.printHeight &&
                                        errors.printHeight
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                      min="0"
                                    />
                                    <div tw="text-[14px] text-[#838383] ml-2">
                                      H:
                                    </div>
                                    <Field
                                      type="number"
                                      name="printHeight"
                                      css={[
                                        styles.dropdown,
                                        tw`w-[52px] md:w-[52px] pl-3 pr-0 mx-1`,
                                        touched.printWidth && errors.printWidth
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                      min="0"
                                    />
                                    <div tw="relative ml-3">
                                      <select
                                        onChange={(e) =>
                                          setFieldValue(
                                            'printUnits',
                                            e.target.value
                                          )
                                        }
                                        onBlur={() =>
                                          setFieldTouched('printUnits')
                                        }
                                        value={values.printUnits}
                                        name="printUnits"
                                        css={[
                                          styles.dropdown,
                                          tw`w-[60px] md:w-[60px] pl-3`,
                                          touched.printUnits &&
                                          errors.printUnits
                                            ? tw`border-red-600 focus:border-red-800`
                                            : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                        ]}
                                      >
                                        {units.map((value, i) => (
                                          <option key={i} value={value}>
                                            {value}
                                          </option>
                                        ))}
                                      </select>
                                      <DropdownButton />
                                    </div>
                                  </div>

                                  <div css={styles.label}>Surface</div>
                                  <div tw="relative ml-auto">
                                    <select
                                      onChange={(e) =>
                                        setFieldValue(
                                          'printSurface',
                                          e.target.value
                                        )
                                      }
                                      onBlur={() =>
                                        setFieldTouched('printSurface')
                                      }
                                      value={values.printSurface}
                                      name="printSurface"
                                      css={[
                                        styles.dropdown,
                                        tw`pr-6 overflow-ellipsis w-[132px]`,
                                        touched.printSurface &&
                                        errors.printSurface
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                    >
                                      <option value="" disabled />
                                      {printSurfaces.map((value, i) => (
                                        <option key={i} value={value}>
                                          {value}
                                        </option>
                                      ))}
                                    </select>
                                    <DropdownButton />
                                  </div>
                                  <div css={styles.label}>Framing</div>
                                  <div tw="flex items-center text-[14px] text-[#838383] ml-auto">
                                    <Field
                                      type="radio"
                                      name="printFraming"
                                      value="yes"
                                      id="yesPrintFraming"
                                      tw="w-[14px] h-[14px] mr-3"
                                      css={[
                                        { 'accent-color': '#6C6C6C' },
                                        touched.printFraming &&
                                        errors.printFraming
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                    />
                                    <label htmlFor="yesPrintFraming">
                                      Framed
                                    </label>
                                    <Field
                                      type="radio"
                                      name="printFraming"
                                      value="no"
                                      id="noPrintFraming"
                                      tw="w-[14px] h-[14px] mr-3 ml-6 md:ml-7"
                                      css={[
                                        { 'accent-color': '#6C6C6C' },
                                        touched.printFraming &&
                                        errors.printFraming
                                          ? tw`border-red-600 focus:border-red-800`
                                          : tw`border-[#D8D8D8] focus:border-[#888888]`,
                                      ]}
                                    />
                                    <label htmlFor="noPrintFraming">
                                      Unframed
                                    </label>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          {!isMobile && (
                            <button
                              css={[buttons.red, tw`ml-auto mt-[24px]`]}
                              //onClick={() => { console.log("Submitting", initialFormValues) }}
                              type="submit" //This should take care of the form submitting and invoke the forms onSubmit handler
                              disabled={isSubmitting}
                            >
                              {editMode
                                ? isSubmitting
                                  ? 'Saving Changes...'
                                  : 'Save Changes'
                                : isSubmitting
                                ? 'Creating Work...'
                                : 'Create Work'}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                  {/*{uploadPage === 1 && (*/}
                  {/*  <div tw="w-full">*/}
                  {/*    <div tw="text-[22px] text-[#3C3C3C] font-semibold text-center">*/}
                  {/*      Attach in progress posts of the same work to this*/}
                  {/*      completed work.*/}
                  {/*    </div>*/}
                  {/*    <div tw="text-[22px] text-[#3C3C3C] text-center">*/}
                  {/*      (select a maximum of 8 posts)*/}
                  {/*    </div>*/}
                  {/*    <div tw="text-[22px] text-[#838383] mt-5">*/}
                  {/*      Select from Existing Posts*/}
                  {/*    </div>*/}
                  {/*    <div tw="overflow-y-auto h-[330px] mt-[30px] mb-4">*/}
                  {/*      <div tw="grid grid-cols-6 gap-8">*/}
                  {/*        {wipImages.map((value, index) => (*/}
                  {/*          <DisplayWip src={value} key={index} />*/}
                  {/*        ))}*/}
                  {/*      </div>*/}
                  {/*    </div>*/}
                  {/*    <FileUploader*/}
                  {/*      multiple={true}*/}
                  {/*      name="file"*/}
                  {/*      types={['JPG', 'PNG', 'SVG']}*/}
                  {/*      handleChange={(files: File[]) => {*/}
                  {/*        setWipImages((state: string[]) => {*/}
                  {/*          return state.concat(*/}
                  {/*            Array(...files).map(URL.createObjectURL)*/}
                  {/*          );*/}
                  {/*        });*/}
                  {/*      }}*/}
                  {/*    >*/}
                  {/*      <div tw="text-lg text-[#65676B] border-[#D8D8D8] border-[3px] border-dashed cursor-pointer px-16 py-8 rounded-[7px] w-[680px] mx-auto">*/}
                  {/*        <span tw="font-bold">Upload</span> in progress photos or*/}
                  {/*        videos from your computer*/}
                  {/*      </div>*/}
                  {/*    </FileUploader>*/}
                  {/*    <div tw="flex justify-between mt-5 px-9">*/}
                  {/*      <button*/}
                  {/*        type={"button"}*/}
                  {/*        css={buttons.white}*/}
                  {/*        onClick={() => setUploadPage(0)}*/}
                  {/*      >*/}
                  {/*        Back*/}
                  {/*      </button>*/}
                  {/*      <button css={buttons.red} type="submit">*/}
                  {/*        Post*/}
                  {/*      </button>*/}
                  {/*    </div>*/}
                  {/*  </div>*/}
                  {/*)}*/}
                </Form>
              )}
            </Formik>
          )}
        </div>
        {!isMobile && toShow && (
          <button
            onClick={() => onClose()}
            tw="ml-5 w-12 h-12 border-0 flex items-center justify-center relative rounded-full"
            className="group"
          >
            <div tw="w-0 transition-all duration-200 group-hover:w-full group-hover:h-full h-0 absolute bg-white/20 rounded-full z-[-1]" />
            <img
              src="/assets/svgs/close.svg"
              tw="w-5 h-5 m-auto"
              alt="close button"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default UploadWork;
