import { useState } from 'react';
import Head from 'next/head';
import tw, { styled } from 'twin.macro';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { Container } from './[username]/index';

interface LoginErrors {
  discipline?: string;
}
function Onboarding() {
  const styles = {
    label: tw`font-semibold text-[16px] text-[#333333]`,
    input: tw`border border-[#D8D8D8] rounded-[6px] p-[10px] text-[16px] leading-7 w-full`,
    error: tw`text-[12px] mt-[2px] text-[#A61A2E]`,
    req: tw`after:content-[' *'] after:text-soft-red`,
  };
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
              <div tw="bg-[#C4C4C4] rounded-[5px] invisible">hi</div>
              <div tw="text-[#D1D1D1] border-[2px] border-[#D1D1D1] rounded-full text-center">
                ?
              </div>
              <div>
                <div css={[styles.label, styles.req]}>Artist Name</div>
              </div>
              <div>
                <Field type="date" name="discipline" css={styles.input} />
              </div>
            </Form>
          </Formik>
        </Container>
      </div>
    </>
  );
}

export default Onboarding;
