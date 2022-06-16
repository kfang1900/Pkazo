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
import React, { ReactNode, useState, useMemo } from 'react';
import tw from 'twin.macro';
import { User } from '@firebase/auth';
import { ArtistData } from '../../types/dbTypes';
import countryList from 'react-select-country-list'
import { OnboardingFormValues } from 'pages/onboarding'

export default function ProfileDetailsSection(
  { country, values }: { country?: string, values: OnboardingFormValues }
) {
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
    return <div tw='mt-3 flex items-center text-[16px] leading-[1em] text-[#838383] font-semibold'>
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
      <div>
        <div css={[styles.label, styles.req]}>Name</div>
        <Field type='text' name='name' css={styles.input} tw='mt-2' />
      </div>
      <div tw='mt-4'>
        <div css={[styles.label, styles.req]}>Art Discipline</div>
        <div tw='mt-2'>
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
      </div>
      <div tw='mt-4'>
        <div css={[styles.label, styles.req]}>Location</div>
        <div tw='mt-2 grid grid-cols-2 gap-x-5'>
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
      </div>
      <div tw='flex flex-col gap-y-6 mt-6'>
        <div>
          <div css={[styles.label, styles.req]}>Do you accept commissions?</div>
          <YesNoRadio name='acceptCommission' />
        </div>
        <div>
          <div css={[styles.label, styles.req]}>Is all your work for sale?</div>
          <YesNoRadio name='onlySale' />
        </div>
        <div>
          <div css={[styles.label, styles.req]}>Are your collections unique to you?</div>
          <YesNoRadio name='uniqueCollections' />
        </div>
      </div>
    </Form>
  );
}
