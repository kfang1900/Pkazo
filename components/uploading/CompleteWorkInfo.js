import tw from 'twin.macro';
import Image from 'next/image';
import { useState } from 'react';

function CompleteWorkInfo(props) {
  const [workForSale, setWorkForSale] = useState(false);

  return (
    <div tw="mx-auto flex flex-row w-full max-w-7xl items-start justify-between gap-5 px-4">
      <div tw="flex-auto w-64 ml-10 mr-10">
        <div tw="mb-2.5 md:mb-4">
          <input
            type="text"
            placeholder="Title"
            tw="block w-full rounded-[10px] border border-light-300 py-3 px-4 text-sm text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:py-5 md:text-lg"
          />
        </div>

        <div tw="mb-8">
          <textarea
            placeholder="Write a description..."
            tw="block h-[122px] w-full resize-none rounded-[10px] border border-light-300 py-3 px-4 text-sm text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:py-5 md:text-lg"
          ></textarea>
        </div>

        <div tw="mb-2.5 flex w-full items-center justify-between gap-4 md:mb-4">
          <p tw="text-sm text-dark-300 md:text-lg">Year</p>
          <div tw="relative w-full max-w-[170px]">
            <select tw="block w-full appearance-none rounded-full border border-light-300 py-2.5 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
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

        <div tw="mb-2.5 flex w-full items-center justify-between gap-4 md:mb-4">
          <p tw="text-sm text-dark-300 md:text-lg">Medium</p>
          <div tw="relative w-full max-w-[170px]">
            <select tw="block w-full appearance-none rounded-full border border-light-300 py-2.5 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
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

        <div tw="mb-2.5 flex w-full flex-col justify-between gap-4 md:mb-4 md:flex-row md:items-center">
          <p tw="text-sm text-dark-300 md:text-lg">Size</p>
          <div tw="flex w-full items-center justify-end gap-3">
            <div tw="flex items-center gap-1.5">
              <label htmlFor="height" tw="text-sm text-light-400 md:text-lg">
                H:
              </label>
              <input
                type="text"
                id="height"
                tw="block w-full max-w-[106px] rounded-full border border-light-300 py-2 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg"
              />
            </div>
            <div tw="flex items-center gap-1.5">
              <label htmlFor="width" tw="text-sm text-light-400 md:text-lg">
                W:
              </label>
              <input
                type="text"
                id="width"
                tw="block w-full max-w-[106px] rounded-full border border-light-300 py-2 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg"
              />
            </div>
            <div tw="relative w-full max-w-[106px]">
              <select tw="block w-full appearance-none rounded-full border border-light-300 py-2.5 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
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
        </div>

        <div tw="mb-2.5 flex w-full items-center justify-between gap-4 md:mb-4">
          <p tw="text-sm text-dark-300 md:text-lg">Group Tags</p>
          <div tw="relative w-full max-w-[170px]">
            <select tw="block w-full appearance-none rounded-full border border-light-300 py-2.5 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
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

        <div tw="mb-8 flex w-full items-center justify-between gap-4">
          <p tw="text-sm text-dark-300 md:text-lg">Work Type</p>
          <div tw="relative flex items-center gap-10">
            <div tw="flex items-center gap-5">
              <input
                type="radio"
                id="original"
                name="work-type"
                tw="h-4 w-4"
                css={{ 'accent-color': '#E24E4D' }}
              />
              <label tw="text-sm text-light-400 md:text-lg" htmlFor="original">
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
              />
              <label tw="text-sm text-light-400 md:text-lg" htmlFor="print">
                Print{' '}
              </label>
            </div>
          </div>
        </div>

        <div tw="rounded-[10px] border border-light-300 px-4 py-5">
          <div tw="flex w-full items-center justify-between gap-4">
            <p tw="text-sm text-dark-300 md:text-lg">Work for Sale</p>
            <div
              tw="relative flex items-center gap-10"
              onChange={(event) => setWorkForSale(event.target.value === 'yes')}
            >
              <div tw="flex items-center gap-5">
                <input
                  type="radio"
                  id="yes"
                  name="sale-work"
                  value="yes"
                  tw="h-4 w-4"
                  css={{ 'accent-color': '#E24E4D' }}
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
                <div tw="grid w-full max-w-[256px] grid-cols-2 items-center gap-3.5">
                  <input
                    type="text"
                    tw="block w-full appearance-none rounded-full border border-light-300 py-2 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg"
                  />
                  <div tw="relative w-full">
                    <select tw="block w-full appearance-none rounded-full border border-light-300 py-2.5 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
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
              </div>

              <div tw="mb-4 flex w-full items-center justify-between gap-4">
                <p tw="text-sm text-dark-300 md:text-lg">Price</p>
                <div tw="relative w-full max-w-[170px]">
                  <select tw="block w-full appearance-none rounded-full border border-light-300 py-2.5 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
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
                <p tw="text-sm text-dark-300 md:text-lg">Subject</p>
                <div tw="relative w-full max-w-[170px]">
                  <select tw="block w-full appearance-none rounded-full border border-light-300 py-2.5 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
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
                  <select tw="block w-full appearance-none rounded-full border border-light-300 py-2.5 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
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
                  <select tw="block w-full appearance-none rounded-full border border-light-300 py-2.5 px-4 text-sm leading-none text-black text-opacity-50 focus:caret-theme-red focus:outline-theme-red md:text-lg">
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
                      name="work-type"
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
                      name="work-type"
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

        <div tw="mt-14 text-right lg:mt-24">
          <button
            tw="rounded-full bg-theme-red py-3 px-6 font-semibold text-white"
            onClick={props.goNext}
          >
            Next
          </button>
        </div>
      </div>

      <div tw="lg:block flex-auto w-32 ml-5 mr-5">
        <Image
          src="/assets/images/img-01.png"
          alt="image"
          width={153}
          height={153}
          layout="responsive"
          tw="h-auto w-full object-contain opacity-80"
        />
      </div>
    </div>
  );
}

export default CompleteWorkInfo;
