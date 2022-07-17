import React, { useState, useEffect } from 'react';
import tw from 'twin.macro';
import { Form } from 'formik';
import { OnboardingFormValues } from 'pages/onboarding';
import { PortfolioData } from 'types/dbTypes';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import buttons from 'styles/Button';
import { FileUploader } from 'react-drag-drop-files';

export const PortfolioPopup = ({
  portfolio,
  setPortfolio,
  onSave,
  onCancel,
  isMobile,
}: {
  portfolio: PortfolioData;
  setPortfolio: (p: PortfolioData) => void;
  onSave: () => void;
  onCancel: () => void;
  isMobile: boolean;
}) => {
  return (
    <div tw="fixed top-0 left-0 w-full h-full z-50 bg-black/40 flex items-start justify-center overflow-auto md:p-[50px]">
      <style>{`body {overflow: hidden}`}</style>
      <div tw="flex w-full justify-center">
        <div
          css={[
            isMobile
              ? tw`fixed bottom-0 bg-white w-full rounded-t-[12px] h-[92%] flex flex-col overflow-hidden`
              : tw`bg-white w-full max-w-[1000px] rounded-[20px] pt-[56px] pb-8 px-[72px]`,
          ]}
        >
          {isMobile && (
            <div tw="w-full flex items-center justify-between gap-x-4 px-5 py-[18px] border-b border-b-[#E2E2E2]">
              <button tw="w-4 h-4" onClick={onCancel}>
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
                {portfolio.name || 'New Portfolio'}
              </div>
              <button
                onClick={onSave}
                tw="text-[16px] leading-[1em] text-[#3C3C3C] font-semibold"
              >
                Save
              </button>
            </div>
          )}
          <div css={[isMobile && tw`px-5 pb-6 overflow-auto h-full flex flex-col justify-between`]}>
            <div>
              <div
                tw="flex gap-x-10 mt-5 md:mt-0"
                css={[isMobile && tw`flex-col items-center w-full`]}
              >
                <div tw="relative">
                  <div tw="relative w-[100px] h-[100px] md:w-[180px] md:h-[180px] rounded-full overflow-hidden flex items-center">
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
                    <FileUploader
                      types={['PNG', 'JPG']}
                      handleChange={(file: File) => {
                        setPortfolio({
                          ...portfolio,
                          picture: URL.createObjectURL(file),
                        });
                      }}
                    >
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
                    </FileUploader>
                  </div>
                </div>
                <div tw="flex flex-col gap-y-4 flex-1 mt-5 md:mt-0 w-full">
                  <input
                    tw="border border-[#D8D8D8] rounded-[6px] outline-none focus:border-[#888888] h-9 px-3"
                    placeholder="Title"
                    defaultValue={portfolio.name}
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
                    defaultValue={portfolio.description}
                    rows={4}
                    onChange={(e) => {
                      portfolio.description = e.target.value;
                    }}
                  />
                </div>
              </div>
              <div tw="mt-4 md:mt-8 text-[#575757] text-[16px]">
                Upload the works that belong in this portfolio. For now, only one
                image per work.
              </div>
              <div tw="mt-4 grid grid-flow-col gap-5 overflow-auto justify-start">
                {portfolio.works.map((work, i) => (
                  <div
                    tw="w-[110px] h-[110px] rounded-[5px] relative overflow-hidden"
                    key={i}
                  >
                    <Image
                      src={work}
                      layout="fill"
                      objectFit="cover"
                      alt="work image"
                    />
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
                console.log(files.length);
                console.log(portfolio.works.length);
              }}
            >
              <button
                tw="block mt-7 border-[3px] border-dashed border-[#D8D8D8] text-center rounded-[7px] w-full p-6 md:py-10 md:px-0"
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
          {!isMobile && (
            <div tw="mt-7 flex justify-end gap-x-4">
              <button
                css={[buttons.white, tw`px-8 h-[46px]`]}
                onClick={onCancel}
                type="button"
              >
                Cancel
              </button>
              <button
                css={[buttons.red, tw`px-10 h-[46px]`]}
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
  console.log('opening portfolio', values);
  const [curPortfolio, setCurPortfolio] = useState<PortfolioData>({
    ...newPortfolio,
  });
  return (
    <Form>
      {popupIndex >= 0 && (
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
        />
      )}
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
                  <div
                    tw="w-full h-[108px] rounded-full bg-[#F8F8F8] relative flex items-center overflow-hidden"
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
                      <Image
                        src={values.portfolios[i].picture}
                        layout="fill"
                        objectFit="cover"
                        alt="portfolio image"
                      />
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
