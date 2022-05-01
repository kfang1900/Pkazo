import { useState } from 'react';
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
  ...props
}: {
  label: string;
  name: string;
  helpText: string;
  type?: string;
  optional?: boolean;
}) {
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
        <>
          <div tw="bg-[#F1F1F1] rounded-[5px]">
            <p tw="px-6 py-2">{helpText}</p>
          </div>
        </>
      ) : (
        <div />
      )}
      <button
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
          <select
            css={styles.input}
            name={name}
            {...props}
            tw={"after:content-['▼'] after:absolute after:text-sm"}
          >
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
          </select>
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
            <Form tw="mr-auto mt-12 w-full grid grid-cols-[300px 30px 160px 450px] gap-x-4 gap-y-6 items-center">
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
            </Form>
          </Formik>
        </Container>
      </div>
    </>
  );
}

export default Onboarding;
