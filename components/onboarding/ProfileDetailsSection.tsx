import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikErrors,
} from 'formik';
import { getApp } from 'firebase/app';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  where,
} from 'firebase/firestore';
import Dropdown from 'styles/Dropdown';
import React, { ReactNode, useState, useMemo, useEffect } from 'react';
import tw from 'twin.macro';
import { User } from '@firebase/auth';
import { ArtistData } from '../../types/dbTypes';
import countryList from 'react-select-country-list'
import { OnboardingFormValues } from 'pages/onboarding'
import { useMediaQuery } from 'react-responsive';
import { Container } from 'styles/Container';

export default function ProfileDetailsSection(
  { country, values }: { country?: string, values: OnboardingFormValues }
) {
  const mediaQuery = !useMediaQuery({ query: `(min-width: 768px)` });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (isMobile !== mediaQuery) setIsMobile(mediaQuery);
  }, [mediaQuery, isMobile]);
  const styles = {
    label: tw`font-semibold text-[16px] leading-5 text-[#333333]`,
    input: tw`border border-[#D8D8D8] rounded-[6px] px-4 h-11 text-[16px] w-full focus:outline-none focus:border-[#888888]`,
    error: tw`text-[12px] mt-[2px] text-[#A61A2E]`,
    req: tw`after:content-[' *'] after:text-soft-red`,
  };
  const [selectedCountry, setSelectedCountry] = useState(country || '');
  const countries = useMemo(() => countryList().getLabels(), []);

  const YesNoRadio = (props: { name: string }) => {
    const yesId = `yes${props.name}`;
    const noId = `no${props.name}`;
    return <div tw='mt-3 md:mt-0 md:h-11 flex items-center text-[16px] leading-[1em] text-[#838383] font-semibold'>
      <label htmlFor={yesId}>Yes</label>
      <Field
        type='radio'
        name={props.name}
        value='yes'
        id={yesId}
        tw="w-4 h-4 ml-3"
        css={{ 'accent-color': '#E24E4D' }}
      />
      <label htmlFor={noId} tw='ml-8'>No</label>
      <Field
        type='radio'
        name={props.name}
        value='no'
        id={noId}
        tw='w-4 h-4 ml-3'
        css={{ 'accent-color': '#E24E4D' }}
      />
    </div>
  }
  return (
    <Form>
      <div css={[
        !isMobile && tw`mx-auto grid grid-cols-[200px 1fr] items-center gap-x-[60px] gap-y-7 max-w-[700px]`
      ]}>
        <div css={[styles.label, styles.req]}>Name</div>
        <Field type='text' name='name' css={styles.input} tw='mt-2 md:mt-0' />
        <div css={[styles.label, styles.req]} tw='mt-4 md:mt-0'>Art Discipline</div>
        <div tw='mt-2 md:mt-0'>
          <Field
            as={Dropdown}
            type='select'
            name='discipline'
            appearance={styles.input}
            triangle
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              values.discipline = event.target.value;
            }}
          >
            {['Painter', 'Photographer', 'Other'].map((i) => <option key={i} value={i}>{i}</option>)}
          </Field>
        </div>
        <div css={[styles.label, styles.req]} tw='mt-4 md:mt-0'>Location</div>
        <div tw='mt-2 md:mt-0 grid grid-cols-2 gap-x-5 md:gap-x-8'>
          <Field
            as={Dropdown}
            type="select"
            name='country'
            appearance={[styles.input, tw`pr-6 overflow-ellipsis`]}
            triangle
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              values.country = event.target.value;
              setSelectedCountry(values.country);
            }}
          >
            <option value={selectedCountry}>{selectedCountry}</option>
            {countries.map((i, ind) =>
              i !== selectedCountry && <option key={ind} value={i}>{i}</option>)
            }
          </Field>
          <Field type='text' name='city' css={styles.input} placeholder='Zip code' />
        </div>
        <div css={[styles.label, styles.req]} tw='mt-6 md:mt-0'>Do you accept commissions?</div>
        <YesNoRadio name='acceptCommission' />
        <div css={[styles.label, styles.req]} tw='mt-6 md:mt-0'>Is all your work for sale?</div>
        <YesNoRadio name='onlySale' />
        <div css={[styles.label, styles.req]} tw='mt-6 md:mt-0'>Are your collections unique to you?</div>
        <YesNoRadio name='uniqueCollections' />
      </div>
    </Form>
  );
}
