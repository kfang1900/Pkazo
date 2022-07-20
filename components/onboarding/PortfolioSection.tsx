import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import { Form } from 'formik';
import { OnboardingFormValues } from 'pages/onboarding';
import { PortfolioData } from 'types/dbTypes';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import buttons from 'styles/Button';
import { FileUploader } from 'react-drag-drop-files';
import extraStyles from 'styles/UploadWork.module.css';

export const PortfolioPopup = ({
  portfolio,
  setPortfolio,
  onSave,
  onCancel,
  isMobile,
  toShow
}: {
  portfolio: PortfolioData;
  setPortfolio: (p: PortfolioData) => void;
  onSave: () => void;
  onCancel: () => void;
  isMobile: boolean;
  toShow: boolean;
}) => {
  const [mobileWorkPopup, setMobileWorkPopup] = useState(false);
  const [oldWorks, setOldWorks] = useState<string[]>([]);
  return (
    <div
      tw="fixed top-0 left-0 w-full z-50 flex items-start justify-center overflow-auto md:p-[50px]"
      css={[toShow && tw`h-full bg-black/40`]}
    >
      {toShow && <style>{`body {overflow: hidden}`}</style>}
      <div tw="flex w-full justify-center z-50">
        <div
          css={[
            isMobile
              ? tw`fixed -bottom-full bg-white w-full rounded-t-[12px] h-[92%] flex flex-col overflow-hidden duration-300`
              : tw`bg-white w-full max-w-[1000px] rounded-[20px] pt-[56px] pb-8 px-[72px]`,
            isMobile && toShow && tw`bottom-0`,
            !isMobile && !toShow && tw`hidden`
          ]}
        >
          {isMobile && (
            <div tw="w-full flex items-center justify-between gap-x-4 px-5 py-[18px] border-b border-b-[#E2E2E2]">
              <button
                tw="w-4 h-4"
                onClick={() => {
                  if (!mobileWorkPopup) {
                    onCancel();
                  } else {
                    setPortfolio({
                      ...portfolio,
                      works: [...oldWorks]
                    })
                  }
                  setMobileWorkPopup(false);
                }}
              >
                {mobileWorkPopup ?
                  <svg width="11" height="18" viewBox="0 0 11 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.240234 8.94922C0.240234 9.28125 0.367188 9.56445 0.630859 9.81836L8.24805 17.2695C8.45312 17.4844 8.72656 17.5918 9.03906 17.5918C9.67383 17.5918 10.1719 17.1035 10.1719 16.459C10.1719 16.1465 10.0449 15.8633 9.83008 15.6484L2.96484 8.94922L9.83008 2.25C10.0449 2.02539 10.1719 1.74219 10.1719 1.42969C10.1719 0.794922 9.67383 0.306641 9.03906 0.306641C8.72656 0.306641 8.45312 0.414062 8.24805 0.628906L0.630859 8.08008C0.367188 8.33398 0.25 8.61719 0.240234 8.94922Z" fill="#3C3C3C" />
                  </svg> :
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
                }
              </button>
              <div tw="w-full text-center text-[16px] leading-[1em] text-[#3C3C3C] font-semibold overflow-ellipsis overflow-hidden whitespace-nowrap">
                {mobileWorkPopup ? 'Works' : (portfolio.name || 'New Portfolio')}
              </div>
              <button
                onClick={() => {
                  if (!mobileWorkPopup) {
                    onCancel();
                  }
                  setMobileWorkPopup(false);
                }}
                tw="text-[16px] leading-[1em] text-[#3C3C3C] font-semibold"
              >
                {mobileWorkPopup ? 'Done' : 'Save'}
              </button>
            </div>
          )}
          {isMobile && mobileWorkPopup ?
            <div tw='z-50 h-full p-6 overflow-auto'>
              <div
                tw="grid grid-cols-[repeat(auto-fill, minmax(120px, 1fr))] gap-x-5 gap-y-3 mr-[-10px] pr-[10px]"
              >
                {portfolio.works.map((work, i) => (
                  <div tw='relative' key={i}>
                    <div
                      tw="mt-2 w-full rounded-[5px] relative overflow-hidden"
                    >
                      <div tw='block pb-[100%]' />
                      <Image
                        src={work}
                        layout="fill"
                        objectFit="cover"
                        alt="work image"
                      />
                    </div>
                    <div
                      tw='absolute top-0 right-[-10px] w-5 h-5 rounded-full bg-black opacity-70 hover:opacity-60 flex items-center justify-center cursor-pointer'
                      onClick={() => {
                        setPortfolio({
                          ...portfolio,
                          works: [...portfolio.works.filter(x => x !== work)]
                        })
                      }}
                    >
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.209802 0.209802C0.276139 0.143298 0.354944 0.0905335 0.441704 0.0545322C0.528463 0.0185308 0.621474 0 0.715406 0C0.809339 0 0.902349 0.0185308 0.989109 0.0545322C1.07587 0.0905335 1.15467 0.143298 1.22101 0.209802L5.00019 3.99041L8.77936 0.209802C8.84576 0.143405 8.92459 0.0907363 9.01134 0.0548025C9.09809 0.0188688 9.19107 0.000373895 9.28497 0.000373895C9.37887 0.000373895 9.47185 0.0188688 9.5586 0.0548025C9.64535 0.0907363 9.72418 0.143405 9.79057 0.209802C9.85697 0.276199 9.90964 0.355023 9.94557 0.441775C9.98151 0.528527 10 0.621507 10 0.715406C10 0.809306 9.98151 0.902286 9.94557 0.989038C9.90964 1.07579 9.85697 1.15461 9.79057 1.22101L6.00997 5.00019L9.79057 8.77936C9.85697 8.84576 9.90964 8.92459 9.94557 9.01134C9.98151 9.09809 10 9.19107 10 9.28497C10 9.37887 9.98151 9.47185 9.94557 9.5586C9.90964 9.64535 9.85697 9.72418 9.79057 9.79057C9.72418 9.85697 9.64535 9.90964 9.5586 9.94557C9.47185 9.98151 9.37887 10 9.28497 10C9.19107 10 9.09809 9.98151 9.01134 9.94557C8.92459 9.90964 8.84576 9.85697 8.77936 9.79057L5.00019 6.00997L1.22101 9.79057C1.15461 9.85697 1.07579 9.90964 0.989038 9.94557C0.902286 9.98151 0.809306 10 0.715406 10C0.621507 10 0.528527 9.98151 0.441775 9.94557C0.355023 9.90964 0.276199 9.85697 0.209802 9.79057C0.143405 9.72418 0.0907363 9.64535 0.0548025 9.5586C0.0188688 9.47185 0.000373895 9.37887 0.000373895 9.28497C0.000373895 9.19107 0.0188688 9.09809 0.0548025 9.01134C0.0907363 8.92459 0.143405 8.84576 0.209802 8.77936L3.99041 5.00019L0.209802 1.22101C0.143298 1.15467 0.0905335 1.07587 0.0545322 0.989109C0.0185308 0.902349 0 0.809339 0 0.715406C0 0.621474 0.0185308 0.528463 0.0545322 0.441704C0.0905335 0.354944 0.143298 0.276139 0.209802 0.209802Z" fill="white" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div> :
            <div css={[isMobile && tw`px-5 pb-6 overflow-auto h-full flex flex-col justify-between`]}>
              <div>
                <div
                  tw="flex gap-x-10 mt-5 md:mt-0"
                  css={[isMobile && tw`flex-col items-center w-full`]}
                >
                  <FileUploader
                    types={['PNG', 'JPG']}
                    handleChange={(file: File) => {
                      setPortfolio({
                        ...portfolio,
                        picture: URL.createObjectURL(file),
                      });
                    }}
                  >
                    <div tw="relative">
                      <div tw="relative w-[100px] h-[100px] md:w-[166px] md:h-[166px] rounded-full overflow-hidden flex items-center">
                        {portfolio.picture ?
                          <Image
                            src={portfolio.picture}
                            layout="fill"
                            objectFit="cover"
                            alt="portfolio image"
                          /> :
                          <div tw='w-full h-full bg-[#E3E3E3]' />
                        }
                      </div>
                      <div tw="absolute right-1 bottom-1 md:right-3 md:bottom-3">
                        <button
                          tw="w-[34px] h-[34px] rounded-full bg-black opacity-70 hover:opacity-60 flex items-center justify-center"
                          type="button"
                        >
                          <Image
                            src="/assets/svgs/camera.svg"
                            alt="edit pfp"
                            width="18px"
                            height="18px"
                          />
                        </button>
                      </div>
                    </div>
                  </FileUploader>
                  <div tw="flex flex-col gap-y-4 flex-1 mt-5 md:mt-0 w-full">
                    <input
                      tw="border border-[#D8D8D8] rounded-[6px] outline-none focus:border-[#888888] h-9 px-3"
                      placeholder="Title"
                      value={portfolio.name}
                      onChange={(e) => {
                        setPortfolio({
                          ...portfolio,
                          name: e.target.value,
                        });
                      }}
                    />
                    <textarea
                      tw="border border-[#D8D8D8] rounded-[6px] outline-none focus:border-[#888888] p-3 leading-[22px] resize-none"
                      placeholder="(Optional) Write a description..."
                      value={portfolio.description}
                      rows={4}
                      onChange={(e) => {
                        setPortfolio({
                          ...portfolio,
                          description: e.target.value,
                        })
                      }}
                    />
                  </div>
                </div>
                <div tw="mt-4 md:mt-8 text-[#575757] text-[16px]">
                  Upload the works that belong in this portfolio. For now, only one
                  image per work.
                </div>
                <div
                  tw="mt-2 grid grid-cols-[repeat(auto-fill, minmax(90px, 1fr))] gap-x-4 gap-y-2 md:gap-x-5 md:gap-y-3 max-h-[240px] overflow-auto"
                  css={[!isMobile && tw`mr-[-10px] pr-[10px]`]}
                  className={extraStyles['workInfo']}
                  onClick={() => {
                    setMobileWorkPopup(true);
                    setOldWorks([...portfolio.works]);
                  }}
                >
                  {portfolio.works.map((work, i) => (
                    <div tw='relative' key={i}>
                      <div
                        tw="mt-2 w-full rounded-[5px] relative overflow-hidden"
                        css={[isMobile && tw`cursor-pointer`]}
                      >
                        <div tw='block pb-[100%]' />
                        <Image
                          src={work}
                          layout="fill"
                          objectFit="cover"
                          alt="work image"
                        />
                      </div>
                      {!isMobile &&
                        <div
                          tw='absolute top-0 right-[-10px] w-5 h-5 rounded-full bg-black opacity-70 hover:opacity-60 flex items-center justify-center cursor-pointer'
                          onClick={() => {
                            setPortfolio({
                              ...portfolio,
                              works: [...portfolio.works.filter(x => x !== work)]
                            })
                          }}
                        >
                          <svg width="8" height="8" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.209802 0.209802C0.276139 0.143298 0.354944 0.0905335 0.441704 0.0545322C0.528463 0.0185308 0.621474 0 0.715406 0C0.809339 0 0.902349 0.0185308 0.989109 0.0545322C1.07587 0.0905335 1.15467 0.143298 1.22101 0.209802L5.00019 3.99041L8.77936 0.209802C8.84576 0.143405 8.92459 0.0907363 9.01134 0.0548025C9.09809 0.0188688 9.19107 0.000373895 9.28497 0.000373895C9.37887 0.000373895 9.47185 0.0188688 9.5586 0.0548025C9.64535 0.0907363 9.72418 0.143405 9.79057 0.209802C9.85697 0.276199 9.90964 0.355023 9.94557 0.441775C9.98151 0.528527 10 0.621507 10 0.715406C10 0.809306 9.98151 0.902286 9.94557 0.989038C9.90964 1.07579 9.85697 1.15461 9.79057 1.22101L6.00997 5.00019L9.79057 8.77936C9.85697 8.84576 9.90964 8.92459 9.94557 9.01134C9.98151 9.09809 10 9.19107 10 9.28497C10 9.37887 9.98151 9.47185 9.94557 9.5586C9.90964 9.64535 9.85697 9.72418 9.79057 9.79057C9.72418 9.85697 9.64535 9.90964 9.5586 9.94557C9.47185 9.98151 9.37887 10 9.28497 10C9.19107 10 9.09809 9.98151 9.01134 9.94557C8.92459 9.90964 8.84576 9.85697 8.77936 9.79057L5.00019 6.00997L1.22101 9.79057C1.15461 9.85697 1.07579 9.90964 0.989038 9.94557C0.902286 9.98151 0.809306 10 0.715406 10C0.621507 10 0.528527 9.98151 0.441775 9.94557C0.355023 9.90964 0.276199 9.85697 0.209802 9.79057C0.143405 9.72418 0.0907363 9.64535 0.0548025 9.5586C0.0188688 9.47185 0.000373895 9.37887 0.000373895 9.28497C0.000373895 9.19107 0.0188688 9.09809 0.0548025 9.01134C0.0907363 8.92459 0.143405 8.84576 0.209802 8.77936L3.99041 5.00019L0.209802 1.22101C0.143298 1.15467 0.0905335 1.07587 0.0545322 0.989109C0.0185308 0.902349 0 0.809339 0 0.715406C0 0.621474 0.0185308 0.528463 0.0545322 0.441704C0.0905335 0.354944 0.143298 0.276139 0.209802 0.209802Z" fill="white" />
                          </svg>
                        </div>
                      }
                    </div>
                  ))}
                </div>
              </div>
              <FileUploader
                multiple={true}
                types={['PNG', 'JPG']}
                handleChange={(files: File[]) => {
                  setPortfolio({
                    ...portfolio,
                    works: portfolio.works.concat(
                      Array(...files).map(URL.createObjectURL)
                    ),
                  });
                }}
              >
                <button
                  tw="block mt-7 border-[3px] border-dashed border-[#D8D8D8] text-center rounded-[7px] w-full p-6 md:py-10 md:px-0 text-[#65676B] text-[18px]"
                  css={[isMobile && tw`justify-self-end self-end`]}
                  type="button"
                >
                  {isMobile ? (
                    <>
                      <b>Upload</b> works in this portfolio
                    </>
                  ) : (
                    <>
                      <b>Upload</b> or <b>Drag and Drop</b> works from computer
                    </>
                  )}
                </button>
              </FileUploader>
            </div>
          }
          {!isMobile && (
            <div tw="mt-7 flex justify-end gap-x-4">
              <button
                css={[buttons.white, tw`w-[120px] h-[46px] flex items-center justify-center`]}
                onClick={onCancel}
                type="button"
              >
                Cancel
              </button>
              <button
                css={[buttons.red, tw`w-[120px]h-[46px] flex items-center justify-center`]}
                onClick={onSave}
                type="button"
              >
                Save
              </button>
            </div>
          )}
        </div>
        {!isMobile && (
          <button
            onClick={onCancel}
            tw="flex-shrink-0 ml-5 w-11 h-11 border-0 outline-none bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] rounded-full flex items-center justify-center"
            type="button"
          >
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

const PortfolioSection = ({ values }: { values: OnboardingFormValues }) => {
  const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
  }, [mediaQuery, isMobile]);

  const [popupIndex, setPopupIndex] = useState(-1);
  const newPortfolio: PortfolioData = {
    picture: '',
    name: '',
    description: '',
    works: [],
  };
  const [curPortfolio, setCurPortfolio] = useState<PortfolioData>({
    ...newPortfolio,
  });
  const [rerenderFlag, setRerenderFlag] = useState(false);
  return (
    <Form>
      <PortfolioPopup
        portfolio={curPortfolio}
        setPortfolio={setCurPortfolio}
        onSave={() => {
          values.portfolios[popupIndex] = curPortfolio;
          setPopupIndex(-1);
        }}
        onCancel={() => {
          setPopupIndex(-1);
        }}
        isMobile={isMobile}
        toShow={popupIndex >= 0}
      />
      <div
        css={[
          isMobile
            ? tw`mx-auto w-[108px] py-5`
            : tw`mx-auto max-w-[700px] py-[60px]`,
        ]}
      >
        <div tw="grid md:grid-cols-5 gap-y-6 gap-x-10 items-start">
          {[...Array(5)].map(
            (_, i) =>
              (!isMobile || i <= values.portfolios.length) && (
                <div key={i}>
                  <div tw="w-full h-[108px] relative">
                    <div
                      tw='w-full h-full rounded-full bg-[#F8F8F8] relative flex items-center overflow-hidden'
                      css={[i <= values.portfolios.length && tw`cursor-pointer`]}
                      onClick={() => {
                        if (i < values.portfolios.length)
                          setCurPortfolio({ ...values.portfolios[i] });
                        if (i === values.portfolios.length)
                          setCurPortfolio({ ...newPortfolio });
                        setPopupIndex(i);
                      }}
                    >
                      {i < values.portfolios.length && (
                        <>
                          <Image
                            src={values.portfolios[i].picture}
                            layout="fill"
                            objectFit="cover"
                            alt="portfolio image"
                          />
                        </>
                      )}
                      {i === values.portfolios.length && (
                        <div tw="w-full h-full flex items-center justify-center bg-[#F3F3F3] hover:bg-[#EFEFEF]">
                          <svg
                            width="30"
                            height="30"
                            viewBox="0 0 30 30"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="13"
                              width="4"
                              height="30"
                              rx="3"
                              fill="#C4C4C4"
                            />
                            <rect
                              y="13"
                              width="30"
                              height="4"
                              rx="3"
                              fill="#C4C4C4"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    {i < values.portfolios.length &&
                      <div
                        tw='absolute top-0 right-0 w-7 h-7 rounded-full bg-black opacity-70 hover:opacity-60 flex items-center justify-center cursor-pointer'
                        onClick={() => {
                          values.portfolios.splice(i, 1);
                          setRerenderFlag(!rerenderFlag);
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0.209802 0.209802C0.276139 0.143298 0.354944 0.0905335 0.441704 0.0545322C0.528463 0.0185308 0.621474 0 0.715406 0C0.809339 0 0.902349 0.0185308 0.989109 0.0545322C1.07587 0.0905335 1.15467 0.143298 1.22101 0.209802L5.00019 3.99041L8.77936 0.209802C8.84576 0.143405 8.92459 0.0907363 9.01134 0.0548025C9.09809 0.0188688 9.19107 0.000373895 9.28497 0.000373895C9.37887 0.000373895 9.47185 0.0188688 9.5586 0.0548025C9.64535 0.0907363 9.72418 0.143405 9.79057 0.209802C9.85697 0.276199 9.90964 0.355023 9.94557 0.441775C9.98151 0.528527 10 0.621507 10 0.715406C10 0.809306 9.98151 0.902286 9.94557 0.989038C9.90964 1.07579 9.85697 1.15461 9.79057 1.22101L6.00997 5.00019L9.79057 8.77936C9.85697 8.84576 9.90964 8.92459 9.94557 9.01134C9.98151 9.09809 10 9.19107 10 9.28497C10 9.37887 9.98151 9.47185 9.94557 9.5586C9.90964 9.64535 9.85697 9.72418 9.79057 9.79057C9.72418 9.85697 9.64535 9.90964 9.5586 9.94557C9.47185 9.98151 9.37887 10 9.28497 10C9.19107 10 9.09809 9.98151 9.01134 9.94557C8.92459 9.90964 8.84576 9.85697 8.77936 9.79057L5.00019 6.00997L1.22101 9.79057C1.15461 9.85697 1.07579 9.90964 0.989038 9.94557C0.902286 9.98151 0.809306 10 0.715406 10C0.621507 10 0.528527 9.98151 0.441775 9.94557C0.355023 9.90964 0.276199 9.85697 0.209802 9.79057C0.143405 9.72418 0.0907363 9.64535 0.0548025 9.5586C0.0188688 9.47185 0.000373895 9.37887 0.000373895 9.28497C0.000373895 9.19107 0.0188688 9.09809 0.0548025 9.01134C0.0907363 8.92459 0.143405 8.84576 0.209802 8.77936L3.99041 5.00019L0.209802 1.22101C0.143298 1.15467 0.0905335 1.07587 0.0545322 0.989109C0.0185308 0.902349 0 0.809339 0 0.715406C0 0.621474 0.0185308 0.528463 0.0545322 0.441704C0.0905335 0.354944 0.143298 0.276139 0.209802 0.209802Z" fill="white" />
                        </svg>
                      </div>
                    }
                  </div>
                  {i < values.portfolios.length && (
                    <div tw="mt-2 md:mt-3 text-[16px] md:text-[20px] text-[#3C3C3C] font-semibold w-full text-center">
                      {values.portfolios[i].name}
                    </div>
                  )}
                </div>
              )
          )}
        </div>
      </div>
    </Form>
  );
};

export default PortfolioSection;
