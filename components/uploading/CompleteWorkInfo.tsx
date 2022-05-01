import tw from 'twin.macro';
import Image from 'next/image';
import React, {
  MouseEventHandler,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FileUploader } from 'react-drag-drop-files';


function UploadedImage(props: {
  id: number;
  src: string | StaticImageData | { default: StaticImageData };
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}) {
  return (
    <div
      css={[
        tw`w-full rounded-md overflow-hidden cursor-pointer`,
        props.id !== props.selected && tw`opacity-30`,
        { aspectRatio: '1/1' },
      ]}
      onClick={() => props.setSelected(props.id)}
    >
      <div tw="transform w-full h-full">
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

function CompleteWorkInfo(props: {
  setStage: (arg: number) => void,
  getData: () => { [k: string]: any },
  setData: (arg: { [k: string]: any }) => void,
  uploadData: (args: any) => void,
}) {
  const [workForSale, setWorkForSale] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const handleData: React.MouseEventHandler = ((e: React.MouseEvent) => {
    props.setStage(2)
    props.uploadData(props.getData())

  })
  const getData = () => {
    const obj: { [k: string]: any } = props.getData();
    return obj
  }
  const placeData = (field: string, value: any) => {
    let nobj = getData()
    nobj[field] = value
    props.setData(nobj)
    console.log("changed data", nobj)
  }
  const appendImageData = (value: string[]) => {
    console.log("attempting to add imageData", value)
    let nobs = getData()
    if (nobs.Images === undefined || nobs.Images === []) {
      console.log("Adding first image")
      nobs.Images = value
      nobs["MainImage"] = value[0]
    }
    else {
      value.forEach((element) => {
        if (!(element in nobs.Images)) {
          nobs.Images.push(value)
        }
      })
    }
    props.setData(nobs)
  }

  const media: string[] = [
    'Tempura',
    'Oil Paint',
    'Acrylic Paint',
    'Watercolors',
    'Charcoal',
    'Pastels',
    'Chalk',
    'Graphite Pencils',
  ]

  const units: string[] = [
    'cm', 'in', 'ft'
  ]
  return (
    <div>
      <div tw="mx-auto flex flex-row w-full max-w-7xl items-start justify-between px-4 mt-20">
        <div tw="flex-auto w-72 ml-28 mr-10">
          <div tw="mb-2.5 md:mb-4">
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => placeData("Title", e.target.value)}
              tw="block w-full h-[46px] rounded-[10px] border border-light-300 py-1 px-4 text-sm text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:py-2 md:text-lg"
            />
          </div>

          <div tw="mb-4">
            <textarea
              placeholder="Write a description..."
              onChange={(e) => placeData("Description", e.target.value)}
              tw="block h-[144px] w-full resize-none rounded-[10px] border border-light-300 py-1 px-4 text-sm text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:py-2 md:text-lg"
            ></textarea>
          </div>

          <div tw="mb-2.5 flex w-full items-center justify-between gap-4 md:mb-4">
            <p tw="text-sm text-dark-300 md:text-lg">Year</p>
            <div tw="relative w-full max-w-[170px]">
              <select tw="block w-full appearance-none rounded-full border border-light-300 py-1 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg"
                onChange={(e) => placeData("Date", 2022 - Number(e.target.value))}>
                <option value=""></option>
                {Array(...Array(100)).map((value, key) => (
                  <option key={key} value={key}>
                    {2022 - key}
                  </option>
                ))}
              </select>
              <button tw="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform">
                <svg
                  tw=""
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
            </div>
          </div>

          <div tw="mb-2.5 flex w-full items-center justify-between gap-4 md:mb-4">
            <p tw="text-sm text-dark-300 md:text-lg">Medium</p>
            <div tw="relative w-full max-w-[170px]">
              <select tw="block w-full appearance-none rounded-full border border-light-300 py-1 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg"
                onChange={(e) => placeData("Medium", e.target.value)}>
                <option value=""></option>
                {media.map((value, key) => (
                  <option key={key}>{value}</option>
                ))}
              </select>
              <button tw="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform">
                <svg
                  tw=""
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
            </div>
          </div>

          <div tw="mb-2.5 flex w-full flex-col justify-between gap-4 md:mb-4 md:flex-row md:items-center">
            <p tw="text-sm text-dark-300 md:text-lg">Size</p>
            <div tw="flex w-full items-center justify-end gap-3">
              <div tw="flex items-center gap-1.5">
                <label htmlFor="height" tw="text-sm text-light-400 md:text-lg">
                  H:
                </label>
                <input
                  onChange={(e) => placeData("Height", e.target.value)}
                  type="text"
                  id="height"
                  tw="block w-full max-w-[90px] rounded-full border border-light-300 py-1 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg"
                />
              </div>
              <div tw="flex items-center gap-1.5">
                <label htmlFor="width" tw="text-sm text-light-400 md:text-lg">
                  W:
                </label>
                <input
                  onChange={(e) => placeData("Width", e.target.value)}
                  type="text"
                  id="width"
                  tw="block w-full max-w-[90px] rounded-full border border-light-300 py-1 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg"
                />
              </div>
              <div tw="relative w-full max-w-[130px]">
                <select tw="block w-full appearance-none rounded-full border border-light-300 py-1 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg"
                  onChange={(e) => placeData("Units", e.target.value)}>
                  {units.map((value, key) => (
                    <option key={key}>{value}</option>))}
                </select>
                <button tw="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform">
                  <svg
                    tw=""
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
              </div>
            </div>
          </div>

          {/* <div tw="mb-2.5 flex w-full items-center justify-between gap-4 md:mb-4">
            <p tw="text-sm text-dark-300 md:text-lg">Group Tags</p>
            <div tw="relative w-full max-w-[170px]">
              <select tw="block w-full appearance-none rounded-full border border-light-300 py-1 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
                <option value=""></option>
                <option value="">in</option>
                <option value="">cm</option>
                <option value="">ft</option>
              </select>
              <button tw="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform">
                <svg
                  tw=""
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
            </div>
          </div> */}

          <div tw="mb-4 flex w-full items-center justify-between gap-4">
            <p tw="text-sm text-dark-300 md:text-lg">Work Type</p>
            <div tw="relative flex items-center gap-10">
              <div tw="flex items-center gap-5">
                <input
                  type="radio"
                  id="original"
                  name="work-type"
                  tw="h-4 w-4"
                  css={{ 'accent-color': '#E24E4D' }}
                  onClick={(e) => placeData("Type", "Original")}
                />
                <label
                  tw="text-sm text-light-400 md:text-lg"
                  htmlFor="original"

                >
                  Original{' '}
                </label>
              </div>
              <div tw="flex items-center gap-5">
                <input
                  type="radio"
                  id="print"
                  name="work-type"
                  tw="h-4 w-4"
                  css={{ 'accent-color': '#E24E4D' }}
                  onClick={(e) => placeData("Type", "Print")}
                />
                <label tw="text-sm text-light-400 md:text-lg" htmlFor="print" onClick={(e) => placeData("Type", "Original")}>
                  Print{' '}
                </label>
              </div>
            </div>
          </div>

          <div tw="rounded-[10px] border border-light-300 px-4 py-4">
            <div tw="flex w-full items-center justify-between gap-4">
              <p tw="text-sm text-dark-300 md:text-lg">Work for Sale</p>
              <div
                tw="relative flex items-center gap-10"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setWorkForSale(event.target.value === 'yes')
                }

              >
                <div tw="flex items-center gap-5">
                  <input
                    type="radio"
                    id="yes"
                    name="sale-work"
                    value="yes"
                    tw="h-4 w-4"
                    css={{ 'accent-color': '#E24E4D' }}
                    onClick={(e) => placeData("ForSale", true)}
                  />
                  <label tw="text-sm text-light-400 md:text-lg" htmlFor="yes">
                    Yes{' '}
                  </label>
                </div>
                <div tw="flex items-center gap-5">
                  <input
                    type="radio"
                    id="no"
                    name="sale-work"
                    value="no"
                    tw="h-4 w-4"
                    css={{ 'accent-color': '#E24E4D' }}
                    onClick={(e) => placeData("ForSale", false)}
                  />
                  <label tw="text-sm text-light-400 md:text-lg" htmlFor="no">
                    No{' '}
                  </label>
                </div>
              </div>
            </div>
            {workForSale && (
              <div tw="md:pl-8 md:pr-3">
                <div tw="mb-4 flex w-full items-center justify-between gap-4 pt-4">
                  <p tw="text-sm text-dark-300 md:text-lg">Price</p>
                  <div tw="grid w-full max-w-[170px]">
                    {' '}
                    {/* tw:  grid-cols-2 items-center gap-3.5 */}
                    <input
                      type="text"
                      tw="block w-full appearance-none rounded-full border border-light-300 py-1 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg"
                    />
                    {/* <div tw="relative w-full">
                      <select tw="block w-full appearance-none rounded-full border border-light-300 py-1 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
                        <option value=""></option>
                        <option value="">Option-1</option>
                        <option value="">Option-2</option>
                        <option value="">Option-3</option>
                      </select>
                      <button tw="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform">
                        <svg
                          tw=""
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
                    </div>*/}
                  </div>
                </div>
                {/*
                <div tw="mb-4 flex w-full items-center justify-between gap-4">
                  <p tw="text-sm text-dark-300 md:text-lg">Price</p>
                  <div tw="relative w-full max-w-[170px]">
                    <select tw="block w-full appearance-none rounded-full border border-light-300 py-1 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
                      <option value=""></option>
                      <option value="">Option-1</option>
                      <option value="">Option-2</option>
                      <option value="">Option-3</option>
                    </select>
                    <button tw="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform">
                      <svg
                        tw=""
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
                  </div>
                </div> */}

                <div tw="mb-4 flex w-full items-center justify-between gap-4">
                  <p tw="text-sm text-dark-300 md:text-lg">Subject</p>
                  <div tw="relative w-full max-w-[170px]">
                    <select tw="block w-full appearance-none rounded-full border border-light-300 py-1 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
                      <option value=""></option>
                      <option value="">Option-1</option>
                      <option value="">Option-2</option>
                      <option value="">Option-3</option>
                    </select>
                    <button tw="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform">
                      <svg
                        tw=""
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
                  </div>
                </div>

                <div tw="mb-4 flex w-full items-center justify-between gap-4">
                  <p tw="text-sm text-dark-300 md:text-lg">Style</p>
                  <div tw="relative w-full max-w-[170px]">
                    <select tw="block w-full appearance-none rounded-full border border-light-300 py-1 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
                      <option value=""></option>
                      <option value="">Option-1</option>
                      <option value="">Option-2</option>
                      <option value="">Option-3</option>
                    </select>
                    <button tw="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform">
                      <svg
                        tw=""
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
                  </div>
                </div>

                <div tw="mb-4 flex w-full items-center justify-between gap-4">
                  <p tw="text-sm text-dark-300 md:text-lg">Market Tags</p>
                  <div tw="relative w-full max-w-[170px]">
                    <select tw="block w-full appearance-none rounded-full border border-light-300 py-1 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
                      <option value=""></option>
                      <option value="">Option-1</option>
                      <option value="">Option-2</option>
                      <option value="">Option-3</option>
                    </select>
                    <button tw="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 transform">
                      <svg
                        tw=""
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
                  </div>
                </div>

                <div tw="mb-4 flex w-full flex-col justify-between gap-2.5 sm:flex-row sm:items-center sm:gap-4">
                  <p tw="text-sm text-dark-300 md:text-lg">Work Type</p>
                  <div tw="relative grid w-full max-w-[300px] grid-cols-2 items-center gap-10">
                    <div tw="flex items-center gap-5">
                      <input
                        type="radio"
                        id="framed"
                        name="orientation"
                        tw="h-4 w-4"
                        css={{ 'accent-color': '#E24E4D' }}
                      />
                      <label
                        tw="text-sm text-light-400 md:text-lg"
                        htmlFor="framed"
                      >
                        Framed{' '}
                      </label>
                    </div>
                    <div tw="flex items-center gap-5">
                      <input
                        type="radio"
                        id="unframed"
                        name="orientation"
                        tw="h-4 w-4"
                        css={{ 'accent-color': '#E24E4D' }}
                      />
                      <label
                        tw="text-sm text-light-400 md:text-lg"
                        htmlFor="unframed"
                      >
                        Unframed{' '}
                      </label>
                    </div>
                  </div>
                </div>

                <div tw="flex w-full flex-col justify-between gap-2.5 sm:flex-row sm:items-center sm:gap-4">
                  <p tw="text-sm text-dark-300 md:text-lg">Orientation</p>
                  <div tw="relative grid w-full max-w-[300px] grid-cols-2 items-center gap-10">
                    <div tw="flex items-center gap-5">
                      <input
                        type="radio"
                        id="landscape"
                        name="work-type"
                        tw="h-4 w-4"
                        css={{ 'accent-color': '#E24E4D' }}
                      />
                      <label
                        tw="text-sm text-light-400 md:text-lg"
                        htmlFor="landscape"
                      >
                        Landscape{' '}
                      </label>
                    </div>
                    <div tw="flex items-center gap-5">
                      <input
                        type="radio"
                        id="portrait"
                        name="work-type"
                        tw="h-4 w-4"
                        css={{ 'accent-color': '#E24E4D' }}
                      />
                      <label
                        tw="text-sm text-light-400 md:text-lg"
                        htmlFor="portrait"
                      >
                        Portrait{' '}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div tw="lg:block flex-auto flex flex-col w-32 mr-10 ml-10">
          <div
            tw="h-full transform flex-initial overflow-hidden rounded-xl mb-6"
            css={{ aspectRatio: '1/1' }}
          >
            {(0 <= selected && selected < uploadedImages.length && (
              <Image
                src={uploadedImages[selected]}
                objectFit="contain"
                layout="fill"
                alt="post-image-1"
              />
            )) || (
                <div tw="h-full w-full border-2 rounded-2xl border-gray-300 border-dashed mx-auto flex flex-col justify-center">
                  <h1 tw="w-full flex justify-center text-gray-300 text-2xl font-semibold">
                    No Image Selected
                  </h1>
                </div>
              )}
          </div>
          <div tw="flex-auto grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-3">
            {uploadedImages.map((value, index) => (
              <UploadedImage
                key={index}
                id={index}
                src={value}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
            <FileUploader
              multiple={true}
              name="upload-work-image"
              types={['PNG', 'JPG']}
              handleChange={(files: File[]) => {
                setUploadedImages((state: string[]) => {
                  setSelected(state.length + files.length - 1);
                  appendImageData(Array(...files).map(URL.createObjectURL));
                  return state.concat(Array(...files).map(URL.createObjectURL));
                });
              }}
            >
              <div
                tw="h-full transform overflow-hidden bg-gray-100 cursor-pointer"
                css={{ 'aspect-ratio': '1/1' }}
              >
                <FontAwesomeIcon
                  icon={solid('plus')}
                  tw="text-2xl text-gray-300 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
                />
              </div>
            </FileUploader>
          </div>
        </div>
      </div>
      <div tw="px-10 flex items-center text-white text-lg justify-start mb-20 mt-10">
        <input
          type="button"
          tw="py-2.5 px-8 mx-auto my-0 rounded-full bg-[#E24E4D] hover:bg-[#be4040] font-bold cursor-pointer"
          onClick={handleData}
          value="Next"
        />
      </div>
    </div>
  );
}

export default CompleteWorkInfo;
