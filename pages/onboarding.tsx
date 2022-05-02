import { ReactNode, useState } from 'react';
import Head from 'next/head';
import tw, { styled } from 'twin.macro';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Container } from './[username]/index';

interface LoginErrors {
  discipline?: string;
}

function OnboardingInput({
  label,
  name,
  type,
  helpText,
  optional,
  children,
  inline,
  ...props
}: {
  label: string;
  name: string;
  helpText: string;
  optional?: boolean;
  children?: ReactNode;
} & (
  | { type: 'select' | 'radio'; options?: string[]; inline?: boolean }
  | { type: 'text' | 'date' }
)) {
  const styles = {
    label: tw`font-semibold text-[16px] text-[#333333]`,
    input: tw`border border-[#D8D8D8] rounded-[6px] p-[10px] text-[16px] leading-7 w-full`,
    error: tw`text-[12px] mt-[2px] text-[#A61A2E]`,
    req: tw`after:content-[' *'] after:text-soft-red`,
  };
  const [popoverActive, setPopoverActive] = useState(false);

  return (
    <>
      {popoverActive ? (
        <div tw={'h-12'}>
          <div tw="bg-[#F1F1F1] rounded-[5px]">
            <p tw="px-6 py-2">{helpText}</p>
          </div>
        </div>
      ) : (
        <div />
      )}

      <button
        type={'button'}
        tw="text-[#D1D1D1] border-[2px] border-[#D1D1D1] rounded-full text-center"
        onMouseOver={() => setPopoverActive(true)}
        onFocus={() => setPopoverActive(true)}
        onMouseOut={() => setPopoverActive(false)}
        onBlur={() => setPopoverActive(false)}
      >
        ?
      </button>
      <div>
        <div css={optional ? [styles.label] : [styles.label, styles.req]}>
          {label}
        </div>
      </div>
      <div>
        {type === 'select' ? (
          <div tw="inline-block relative w-full">
            <select css={styles.input} tw="block appearance-none">
              <option selected disabled></option>
              {(props as { options: string[] }).options.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <div tw="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                tw="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        ) : type === 'radio' ? (
          <>
            {(props as { options: string[] }).options.map((option) => (
              <label
                key={option}
                tw={'text-[#8B8B8B] text-[16px] pl-1 pr-3'}
                style={{
                  display: inline ? 'inline-block' : 'block',
                }}
              >
                <input
                  name={name}
                  type={'radio'}
                  value={option}
                  tw="h-4 w-4 mx-1 align-middle"
                  css={{ 'accent-color': '#D11826' }}
                />
               <span> {option}</span>
              </label>
            ))}
          </>
        ) : (
          <input
            css={styles.input}
            name={name}
            type={type || 'text'}
            {...props}
          />
        )}
      </div>
    </>
  );
}
function Onboarding() {
  const [stage, setStage] = useState(0);
  // let artistName = '';
  // let discipline = '';

  const sections = [
    'Profile details',
    'Upload works',
    'Upload portfolios',
    "How you'll get paid",
  ];

  return (
    <>
      <Head>
        <title>Onboarding</title>
      </Head>
      <div>
        <div tw="mx-10 my-5">
          <img src="assets/images/Pkazo.svg" alt="Pkazo" />
        </div>
        <Container>
          <div tw="flex w-full justify-center">
            {sections.map((x, i) => (
              <div
                css={[
                  tw`text-center max-w-[300px] w-full border-t-4 border-grey-D8 text-[#65676B] text-[16px] pt-3`,
                  i === stage && tw`border-soft-red`,
                ]}
                key={i}
              >
                {x}
              </div>
            ))}
          </div>
          <div tw="text-[28px] font-semibold text-[#333333] text-center mt-14">
            Profile Details
          </div>
          <div tw="text-[18px] font-semibold text-[#333333] text-center mt-1">
            Let&#39;s get started! Tell us a little about you.
          </div>
          <Formik
            initialValues={{ discipline: '' }}
            validateOnChange={false}
            validate={(values) => {
              return;
            }}
            onSubmit={async (values) => {
              return 0;
            }}
          >
            <Form tw="mr-auto mt-12 w-full grid grid-cols-[250px 30px 160px 500px] gap-x-4 gap-y-6 items-center">
              <Field
                as={OnboardingInput}
                type="text"
                name="name"
                label={'Name'}
                helpText={'Just your first and last name.'}
              />
              <Field
                as={OnboardingInput}
                type="text"
                name="artistName"
                label={'Artist Name'}
                optional
                helpText={
                  'If you are known in the art world by a nickname. Think Banksy.'
                }
              />
              <Field
                as={OnboardingInput}
                type="select"
                options={['Painter', 'Photographer', 'Other']}
                name="discipline"
                label={'Art Discipline'}
                helpText={
                  "If your art does not belong to any of the disciplines listed, please select the 'other' field. We are always looking to expand the types of art on Pkazo. "
                }
              />
              <Field
                as={OnboardingInput}
                type="date"
                name="birthday"
                label={'Birthday'}
                helpText={
                  'This will help us run promotions for young and senior artists.'
                }
              ></Field>
              <Field
                as={OnboardingInput}
                name="location"
                label={'Location'}
                helpText={'For buyers who want to purchase art locally.'}
              ></Field>
              <OnboardingInput
                type={'radio'}
                inline
                name="artistType"
                label={'Do you accept commissions?'}
                helpText={
                  'This is just an FYI for us, and won’t have an impact on anything.'
                }
                options={['Yes', 'No']}
              ></OnboardingInput>

              <OnboardingInput
                type={'radio'}
                name="artistType"
                label={'Which of these best describes you?'}
                helpText={
                  'This is just an FYI for us, and won’t have an impact on anything.'
                }
                options={[
                  'I am a professional artist',
                  'I create art as a hobby but want to turn professional someday',
                  'I create art as a hobby and that’s how I like it',
                  'Other',
                ]}
              ></OnboardingInput>

              <div />
              <div />
              <div />

              <div>
                <input
                  type="submit"
                  value="Create on Pkazo"
                  tw="float-right h-9 relative -top-0.5 text-white bg-theme-red rounded-full px-4 py-1 cursor-pointer hover:bg-[#be4040]"
                />
              </div>
            </Form>
          </Formik>
        </Container>
      </div>
    </>
  );
}

export default Onboarding;
