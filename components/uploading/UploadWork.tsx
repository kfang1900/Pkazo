import tw, { css } from 'twin.macro';

import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FileUploader } from 'react-drag-drop-files';

import buttons from 'styles/Button';
import extraStyle from 'styles/UploadWork.module.css';

export interface UploadWorkProps {
  onClose: () => void;
}

/* copied from image.tsx */
interface StaticRequire {
  default: StaticImageData;
}
type StaticImport = StaticRequire | StaticImageData;
function DisplayWip(props: { src: string | StaticImport }) {
  const [selected, setSelected] = useState(false);
  return (
    <div
      css={[
        tw`w-full rounded-[5px] overflow-hidden cursor-pointer flex-shrink-0`,
        { aspectRatio: '1/1' },
      ]}
      onClick={() => setSelected(!selected)}
    >
      <div tw="transform w-full h-full">
        <FontAwesomeIcon
          icon={solid('check')}
          css={[
            tw`text-white z-20 p-5 absolute top-1/2 right-1/2 -translate-y-1/2 translate-x-1/2 text-[60px]`,
            !selected && tw`hidden`,
          ]}
        />
        <div
          css={[
            tw`bg-black opacity-50 z-10 absolute w-full h-full`,
            !selected && tw`hidden`,
          ]}
        ></div>
        <Image
          src={props.src}
          alt="Uploaded Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </div>
  );
}

function UploadWork(props: UploadWorkProps) {
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
  const saleOrientations = ['Horizontal', 'Vertical', 'Square'];
  const printSurfaces = ['Fine Art Paper', 'Canvas'];
  const styles = {
    label: tw`text-[14px] leading-5 text-[#3C3C3C]`,
    input: tw`border border-[#D8D8D8] rounded-[6px] px-3 text-[14px] w-full focus:outline-none focus:border-[#888888]`,
    dropdown: tw`w-[132px] h-[30px] rounded-[20px] border border-[#D8D8D8] pl-4 appearance-none focus:outline-none focus:border-[#888888] text-[14px] text-[#838383]`,
  };
  const dropdownButton = () => {
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
  };
  const [selected, setSelected] = useState(0);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [wipImages, setWipImages] = useState<string[]>([
    '/assets/images/wip/img1.png',
  ]);
  const [wipSelected, setWipSelected] = useState([0]);
  const [uploadPage, setUploadPage] = useState(0);
  return (
    <div tw="fixed top-0 left-0 w-full h-full z-50 bg-black/40 flex items-center justify-center overflow-auto p-[50px]">
      <div tw="flex m-auto">
        <div tw="bg-white rounded-[20px] z-20 p-[52px] w-[1171px] h-[746px]">
          <Formik
            initialValues={{
              title: '',
              desc: '',
              portfolio: '',
              year: 2022,
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
            }}
            onSubmit={async (values, { setFieldError }) => {
              try {
                // props.onClose();
              } catch (error: any) {}
            }}
          >
            {({ values }) => (
              <Form>
                {uploadPage === 0 && (
                  <div tw="flex">
                    {/* image */}
                    <div tw="w-[550px] h-[642px]">
                      {uploadedImages.length > 0 && (
                        <div>
                          <div tw="h-[570px] transform overflow-hidden">
                            <Image
                              src={uploadedImages[selected]}
                              alt="selected image"
                              layout="fill"
                              objectFit="contain"
                            />
                          </div>
                          <div tw="flex overflow-x-auto gap-x-3 mt-3">
                            {uploadedImages.map((value, index) => (
                              <div
                                key={index}
                                css={[
                                  tw`w-[60px] rounded-[5px] overflow-hidden cursor-pointer flex-shrink-0`,
                                  index !== selected && tw`opacity-30`,
                                  { aspectRatio: '1/1' },
                                ]}
                                onClick={() => setSelected(index)}
                              >
                                <div tw="transform w-full h-full">
                                  <Image
                                    src={value}
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
                              types={['PNG', 'JPG']}
                              handleChange={(files: File[]) => {
                                setUploadedImages((state: string[]) => {
                                  return state.concat(
                                    Array(...files).map(URL.createObjectURL)
                                  );
                                });
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
                      {uploadedImages.length === 0 && (
                        <div tw="h-full flex flex-col items-center justify-center pb-[30px]">
                          <img src="/assets/svgs/upload_work.svg" tw="mb-20" />
                          <FileUploader
                            multiple={true}
                            name="upload-work-image"
                            types={['PNG', 'JPG']}
                            handleChange={(files: File[]) => {
                              setUploadedImages((state: string[]) => {
                                return state.concat(
                                  Array(...files).map(URL.createObjectURL)
                                );
                              });
                            }}
                          >
                            <button
                              css={[buttons.red, tw`text-[16px] h-11 px-8`]}
                            >
                              Select from computer
                            </button>
                          </FileUploader>
                        </div>
                      )}
                    </div>
                    {/* contents */}
                    <div tw="flex flex-col items-end w-[465px] ml-[52px]">
                      <div
                        tw="h-[600px]overflow-y-auto"
                        className={extraStyle['workInfo']}
                      >
                        <Field
                          type="text"
                          name="title"
                          placeholder="Title"
                          css={[styles.input, tw`h-[34px] leading-[14px]`]}
                        />
                        <Field
                          type="text"
                          component="textarea"
                          name="desc"
                          rows="3"
                          placeholder="Write a description..."
                          css={[styles.input, tw`mt-3 py-[10px] leading-5`]}
                        />
                        <div tw="px-3">
                          <div tw="grid grid-cols-2 gap-x-[25px] gap-y-3 items-center mt-4">
                            <div tw="flex items-center">
                              <div css={[styles.label, tw`w-[76px]`]}>
                                Portfolio
                              </div>
                              <div tw="relative">
                                <Field
                                  as="select"
                                  name="portfolio"
                                  css={styles.dropdown}
                                >
                                  <option value="default" />
                                  <option value="1">1</option>
                                </Field>
                                {dropdownButton()}
                              </div>
                            </div>
                            <div tw="flex items-center">
                              <div css={[styles.label, tw`w-[76px]`]}>Year</div>
                              <div tw="relative">
                                <Field
                                  as="select"
                                  name="year"
                                  css={styles.dropdown}
                                >
                                  {Array(...Array(100)).map((value, key) => (
                                    <option
                                      key={key}
                                      value={2022 - key}
                                      selected={values.year === value}
                                    >
                                      {2022 - key}
                                    </option>
                                  ))}
                                </Field>
                                {dropdownButton()}
                              </div>
                            </div>
                            <div tw="flex items-center">
                              <div css={[styles.label, tw`w-[76px]`]}>
                                Medium
                              </div>
                              <div tw="relative">
                                <Field
                                  as="select"
                                  name="medium"
                                  css={styles.dropdown}
                                >
                                  <option value="default" />
                                  {mediums.map((value, i) => (
                                    <option
                                      key={i}
                                      value={value}
                                      selected={values.medium === value}
                                    >
                                      {value}
                                    </option>
                                  ))}
                                </Field>
                                {dropdownButton()}
                              </div>
                            </div>
                            <div tw="flex items-center">
                              <div css={[styles.label, tw`w-[76px]`]}>
                                Surface
                              </div>
                              <div tw="relative">
                                <Field
                                  as="select"
                                  name="surface"
                                  css={[
                                    styles.dropdown,
                                    tw`pr-6 overflow-ellipsis`,
                                  ]}
                                >
                                  <option value="default" />
                                  {surfaces.map((value, i) => (
                                    <option
                                      key={i}
                                      value={value}
                                      selected={values.surface === value}
                                    >
                                      {value}
                                    </option>
                                  ))}
                                </Field>
                                {dropdownButton()}
                              </div>
                            </div>
                          </div>
                          <div tw="flex items-center mt-3">
                            <div css={[styles.label, tw`w-[60px]`]}>Size</div>
                            <div tw="text-[14px] text-[#838383]">H:</div>
                            <Field
                              type="number"
                              name="height"
                              css={[
                                styles.dropdown,
                                tw`w-[52px] pl-3 pr-0 ml-1`,
                              ]}
                              min="0"
                            />
                            <div tw="text-[14px] text-[#838383] ml-2">W:</div>
                            <Field
                              type="number"
                              name="width"
                              css={[
                                styles.dropdown,
                                tw`w-[52px] pl-3 pr-0 mx-1`,
                              ]}
                              min="0"
                            />
                            <div tw="relative ml-3">
                              <Field
                                as="select"
                                name="units"
                                css={[styles.dropdown, tw`w-[60px] pl-3`]}
                              >
                                {units.map((value, i) => (
                                  <option
                                    key={i}
                                    value={value}
                                    selected={values.units === value}
                                  >
                                    {value}
                                  </option>
                                ))}
                              </Field>
                              {dropdownButton()}
                            </div>
                          </div>
                        </div>
                        <div tw="w-full border border-[#D8D8D8] mt-4 rounded-[5px] p-4">
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
                            <div tw="mx-5 mt-3 grid grid-cols-2 justify-between items-center gap-y-3">
                              <div css={styles.label}>Price</div>
                              <div tw="relative ml-auto">
                                <Field
                                  type="number"
                                  name="salePrice"
                                  css={[styles.dropdown, tw`pl-[30px]`]}
                                  min="0"
                                  max="9999"
                                />
                                <div tw="text-[16px] text-[#838383] absolute left-4 top-[3px]">
                                  $
                                </div>
                              </div>
                              <div css={styles.label}>Subject</div>
                              <div tw="relative ml-auto">
                                <Field
                                  as="select"
                                  name="saleSubject"
                                  css={styles.dropdown}
                                >
                                  <option value="default" />
                                  {saleSubjects.map((value, i) => (
                                    <option
                                      key={i}
                                      value={value}
                                      selected={values.saleSubject === value}
                                    >
                                      {value}
                                    </option>
                                  ))}
                                </Field>
                                {dropdownButton()}
                              </div>
                              <div css={styles.label}>Style</div>
                              <div tw="relative ml-auto">
                                <Field
                                  as="select"
                                  name="saleStyle"
                                  css={styles.dropdown}
                                >
                                  <option value="default" />
                                  {saleStyles.map((value, i) => (
                                    <option
                                      key={i}
                                      value={value}
                                      selected={values.saleStyle === value}
                                    >
                                      {value}
                                    </option>
                                  ))}
                                </Field>
                                {dropdownButton()}
                              </div>
                              <div css={styles.label}>Orientation</div>
                              <div tw="relative ml-auto">
                                <Field
                                  as="select"
                                  name="saleOrientation"
                                  css={styles.dropdown}
                                >
                                  <option value="default" />
                                  {saleOrientations.map((value, i) => (
                                    <option
                                      key={i}
                                      value={value}
                                      selected={
                                        values.saleOrientation === value
                                      }
                                    >
                                      {value}
                                    </option>
                                  ))}
                                </Field>
                                {dropdownButton()}
                              </div>
                              <div css={styles.label}>Main Color</div>
                              <div tw="relative ml-auto">
                                <Field
                                  as="select"
                                  name="saleColor"
                                  css={[styles.dropdown, tw`w-[73px]`]}
                                >
                                  <option value="default" />
                                  {saleColors.map((value, i) => (
                                    <option
                                      key={i}
                                      value={value}
                                      selected={values.saleColor === value}
                                    >
                                      {value}
                                    </option>
                                  ))}
                                </Field>
                                {dropdownButton()}
                              </div>
                              <div css={styles.label}>Framing</div>
                              <div tw="flex items-center text-[14px] text-[#838383] ml-auto">
                                <Field
                                  type="radio"
                                  name="saleFraming"
                                  value="yes"
                                  id="yesSaleFraming"
                                  tw="w-[14px] h-[14px] mr-3"
                                  css={{ 'accent-color': '#6C6C6C' }}
                                />
                                <label htmlFor="yesSaleFraming">Framed</label>
                                <Field
                                  type="radio"
                                  name="saleFraming"
                                  value="no"
                                  id="noSaleFraming"
                                  tw="w-[14px] h-[14px] mr-3 ml-7"
                                  css={{ 'accent-color': '#6C6C6C' }}
                                />
                                <label htmlFor="noSaleFraming">Unframed</label>
                              </div>
                            </div>
                          )}
                        </div>
                        <div tw="w-full border border-[#D8D8D8] mt-4 rounded-[5px] p-4">
                          <div tw="flex text-[14px] text-[#3C3C3C] justify-between">
                            Prints Available?
                            <div tw="flex items-center text-[14px] text-[#838383]">
                              <Field
                                type="radio"
                                name="forPrint"
                                value="yes"
                                id="yesForPrint"
                                tw="w-[14px] h-[14px] mr-3"
                                css={{ 'accent-color': '#E24E4D' }}
                              />
                              <label htmlFor="yesForPrint">Yes</label>
                              <Field
                                type="radio"
                                name="forPrint"
                                value="no"
                                id="noForPrint"
                                tw="w-[14px] h-[14px] mr-3 ml-7"
                                css={{ 'accent-color': '#E24E4D' }}
                              />
                              <label htmlFor="noForPrint">No</label>
                            </div>
                          </div>
                          {values.forPrint === 'yes' && (
                            <div tw="mx-5 mt-3 grid grid-cols-[150px auto] justify-between items-center gap-y-3">
                              <div css={styles.label}>Price</div>
                              <div tw="relative ml-auto">
                                <Field
                                  type="number"
                                  name="printPrice"
                                  css={[styles.dropdown, tw`pl-[30px]`]}
                                  min="0"
                                  max="9999"
                                />
                                <div tw="text-[16px] text-[#838383] absolute left-4 top-[3px]">
                                  $
                                </div>
                              </div>
                              <div css={styles.label}>Size</div>
                              <div tw="ml-auto flex items-center">
                                <div tw="text-[14px] text-[#838383]">H:</div>
                                <Field
                                  type="number"
                                  name="printHeight"
                                  css={[
                                    styles.dropdown,
                                    tw`w-[52px] pl-3 pr-0 ml-1`,
                                  ]}
                                  min="0"
                                />
                                <div tw="text-[14px] text-[#838383] ml-2">
                                  W:
                                </div>
                                <Field
                                  type="number"
                                  name="printWidth"
                                  css={[
                                    styles.dropdown,
                                    tw`w-[52px] pl-3 pr-0 mx-1`,
                                  ]}
                                  min="0"
                                />
                                <div tw="relative ml-3">
                                  <Field
                                    as="select"
                                    name="printUnits"
                                    css={[styles.dropdown, tw`w-[60px] pl-3`]}
                                  >
                                    {units.map((value, i) => (
                                      <option
                                        key={i}
                                        value={value}
                                        selected={values.printUnits === value}
                                      >
                                        {value}
                                      </option>
                                    ))}
                                  </Field>
                                  {dropdownButton()}
                                </div>
                              </div>
                              <div css={styles.label}>Surface</div>
                              <div tw="relative ml-auto">
                                <Field
                                  as="select"
                                  name="printSurface"
                                  css={[
                                    styles.dropdown,
                                    tw`pr-6 overflow-ellipsis`,
                                  ]}
                                >
                                  <option value="default" />
                                  {printSurfaces.map((value, i) => (
                                    <option
                                      key={i}
                                      value={value}
                                      selected={values.printSurface === value}
                                    >
                                      {value}
                                    </option>
                                  ))}
                                </Field>
                                {dropdownButton()}
                              </div>
                              <div css={styles.label}>Framing</div>
                              <div tw="flex items-center text-[14px] text-[#838383] ml-auto">
                                <Field
                                  type="radio"
                                  name="printFraming"
                                  value="yes"
                                  id="yesPrintFraming"
                                  tw="w-[14px] h-[14px] mr-3"
                                  css={{ 'accent-color': '#6C6C6C' }}
                                />
                                <label htmlFor="yesPrintFraming">Framed</label>
                                <Field
                                  type="radio"
                                  name="printFraming"
                                  value="no"
                                  id="noPrintFraming"
                                  tw="w-[14px] h-[14px] mr-3 ml-7"
                                  css={{ 'accent-color': '#6C6C6C' }}
                                />
                                <label htmlFor="noPrintFraming">Unframed</label>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <button
                        css={[buttons.red, tw`ml-auto mt-[24px]`]}
                        onClick={() => setUploadPage(1)}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
                {uploadPage === 1 && (
                  <div tw="w-full">
                    <div tw="text-[22px] text-[#3C3C3C] font-semibold text-center">
                      Attach in progress posts of the same work to this
                      completed work.
                    </div>
                    <div tw="text-[22px] text-[#3C3C3C] text-center">
                      (select a maximum of 8 posts)
                    </div>
                    <div tw="text-[22px] text-[#838383] mt-5">
                      Select from Existing Posts
                    </div>
                    <div tw="overflow-y-auto h-[330px] mt-[30px] mb-4">
                      <div tw="grid grid-cols-6 gap-8">
                        {wipImages.map((value, index) => (
                          <DisplayWip src={value} key={index} />
                        ))}
                      </div>
                    </div>
                    <FileUploader
                      multiple={true}
                      name="file"
                      types={['JPG', 'PNG', 'SVG']}
                      handleChange={(files: File[]) => {
                        setWipImages((state: string[]) => {
                          return state.concat(
                            Array(...files).map(URL.createObjectURL)
                          );
                        });
                      }}
                    >
                      <div tw="text-lg text-[#65676B] border-[#D8D8D8] border-[3px] border-dashed cursor-pointer px-16 py-8 rounded-[7px] w-[680px] mx-auto">
                        <span tw="font-bold">Upload</span> in progress photos or
                        videos from your computer
                      </div>
                    </FileUploader>
                    <div tw="flex justify-between mt-5 px-9">
                      <button
                        css={buttons.white}
                        onClick={() => setUploadPage(0)}
                      >
                        Back
                      </button>
                      <button css={buttons.red} type="submit">
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </Form>
            )}
          </Formik>
        </div>
        <button
          onClick={props.onClose}
          tw="ml-5 w-12 h-12 border-0 outline-none bg-none hover:bg-[rgba(255,255,255,0.08)] rounded-full"
        >
          <img
            src="/assets/svgs/close.svg"
            tw="w-5 h-5 m-auto"
            alt="close button"
          />
        </button>
      </div>
    </div>
  );
}

export default UploadWork;
