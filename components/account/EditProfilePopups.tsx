import tw from 'twin.macro';
import Image from 'next/image';
import Dropdown from 'styles/Dropdown';
import buttons from 'styles/Button';
import { useState, useEffect } from 'react';
import { ArtistData } from '../../types/dbTypes';
import { useMediaQuery } from 'react-responsive';

type PopupData =
  | ArtistData['education'][number]
  | ArtistData['experience'][number]
  | ArtistData['exhibitions'][number];
const EditProfilePopup = ({
  onSave,
  onClose,
  type,
}: {
  onSave: (data: PopupData) => void;
  onClose: () => void;
  type: number; // either 0, 1, or 2
}) => {
  const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
  }, [mediaQuery, isMobile]);

  const popups = [
    {
      title: 'education',
      fields: ['School', 'Field of study'],
      fieldNames: ['school', 'field'],
      dateRange: true,
    },
    {
      title: 'experience',
      fields: ['Company name', 'Title'],
      fieldNames: ['company', 'position'],
      dateRange: true,
    },
    {
      title: 'exhibition',
      fields: ['Exhibition Gallery'],
      fieldNames: ['gallery'],
      dateRange: false,
    },
  ];

  const [data, setData] = useState<
    [
      ArtistData['education'][number],
      ArtistData['experience'][number],
      ArtistData['exhibitions'][number]
    ]
  >([
    {
      school: '',
      field: '',
      start: new Date().getFullYear(),
      end: new Date().getFullYear(),
    },
    {
      company: '',
      position: '',
      start: new Date().getFullYear(),
      end: new Date().getFullYear(),
    },
    {
      gallery: '',
      year: new Date().getFullYear(),
    },
  ]);
  return (
    <div tw="fixed top-0 left-0 w-full h-full z-50 bg-black/40 flex items-center justify-center overflow-auto md:p-[50px]">
      <style>{`body {overflow: hidden}`}</style>
      <div tw="flex w-full justify-center">
        <div
          css={[
            isMobile
              ? tw`fixed bottom-0 bg-white w-full top-[40px] rounded-t-[12px] flex flex-col overflow-hidden`
              : tw`bg-white w-[540px] rounded-[20px] px-9 pt-9 pb-6`,
          ]}
        >
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
                New {popups[type].title}
              </div>
              <button
                tw="text-[16px] leading-[1em] text-[#3C3C3C] font-semibold"
                onClick={() => {
                  onSave(data[type]);
                  onClose();
                }}
              >
                Save
              </button>
            </div>
          )}
          <div css={[isMobile && tw`px-5 py-8`]}>
            {!isMobile && (
              <div tw="text-[20px] text-black font-semibold">
                Add {popups[type].title}
              </div>
            )}
            <div tw="md:mt-6 text-[16px] text-[#3C3C3C] font-semibold flex flex-col gap-y-6 md:gap-y-9">
              {popups[type].fields.map((field, i) => (
                <div key={i}>
                  <div>{field}</div>
                  <input
                    value={
                      data[type][popups[type].fieldNames[i] as keyof PopupData]
                    }
                    onChange={(e) =>
                      setData([
                        ...data.slice(0, type),
                        {
                          ...data[type],
                          [popups[type].fieldNames[i]]: e.target.value,
                        },
                        ...data.slice(type + 1),
                      ] as any)
                    }
                    tw="mt-1 w-full rounded-[6px] border border-[#D8D8D8] outline-none focus:border-[#888888] px-4 h-10"
                  />
                </div>
              ))}
              <div>
                <div>Time period</div>
                <div tw="flex gap-x-5 mt-1 items-center">
                  <Dropdown
                    onChange={(e) =>
                      setData([
                        ...data.slice(0, type),
                        {
                          ...data[type],
                          [popups[type].dateRange ? 'start' : 'year']: parseInt(
                            e.target.value
                          ),
                        },
                        ...data.slice(type + 1),
                      ] as any)
                    }
                    appearance={tw`pl-4 py-2 text-[16px] rounded-[6px] w-[114px]`}
                  >
                    {[...Array(100)].map((_, i) => (
                      <option
                        key={i}
                        selected={
                          new Date().getFullYear() - i ===
                          data[type][
                          (popups[type].dateRange
                            ? 'start'
                            : 'year') as keyof PopupData
                          ]
                        }
                      >
                        {new Date().getFullYear() - i}
                      </option>
                    ))}
                  </Dropdown>
                  {popups[type].dateRange && (
                    <>
                      <div tw="text-[16px] text-[#838383] font-normal">To</div>
                      <Dropdown
                        onChange={(e) =>
                          setData([
                            ...data.slice(0, type),
                            {
                              ...data[type],
                              end: parseInt(e.target.value),
                            },
                            ...data.slice(type + 1),
                          ] as any)
                        }
                        appearance={tw`pl-4 py-2 text-[16px] rounded-[6px] w-[114px]`}
                      >
                        {[...Array(100)].map((_, i) => (
                          <option
                            selected={
                              new Date().getFullYear() - i ===
                              (data[type] as { end: number }).end
                            }
                            key={i}
                          >
                            {new Date().getFullYear() - i}
                          </option>
                        ))}
                      </Dropdown>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {!isMobile && (
            <div tw="mt-6 flex justify-end">
              <button
                css={[buttons.red, tw`text-[14px] px-7 h-9`]}
                onClick={() => {
                  onSave(data[type]);
                  onClose();
                }}
              >
                Save
              </button>
            </div>
          )}
        </div>
        {!isMobile && (
          <button
            onClick={onClose}
            tw="flex-shrink-0 ml-5 w-11 h-11 border-0 relative rounded-full flex items-center justify-center"
            type="button"
            className='group'
          >
            <div tw='w-0 transition-all duration-200 group-hover:w-full group-hover:h-full h-0 absolute bg-white/20 rounded-full z-[-1]' />
            <Image
              src="/assets/svgs/close.svg"
              width="16px"
              height="16px"
              alt="close button"
            />
          </button>
        )}
      </div>
    </div>
  );
};
export default EditProfilePopup;
