import tw, { css } from 'twin.macro';

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Image from 'next/image';
import Link from 'next/link';

import buttons from '../../styles/Button';
import ConfirmUnfollowModal from '../profile/ConfirmUnfollow';
import PostImage from './PostImage';
import { MdRadioButtonUnchecked } from 'react-icons/md';
import useAuth from '../../utils/useAuth';

interface LoginErrors {
  email?: string;
  displayName?: string;
  password?: string;
}
export interface LoginFormProps {
  onClose: () => void;
  defaultSignUp?: boolean;
  notCloseable?: boolean;
}
function LoginForm(props: LoginFormProps) {
  const styles = {
    label: tw`font-semibold text-[16px] leading-5 text-[#333333] mt-3`,
    input: tw`border border-[#D8D8D8] rounded-[6px] p-[10px] mt-[5px] text-[16px] leading-7 w-full`,
    error: tw`text-[12px] mt-[2px] text-[#A61A2E]`,
    req: tw`after:content-[' *'] after:text-soft-red`,
  };
  const [register, setRegister] = useState(!!props.defaultSignUp);
  const [showPassword, setShowPassword] = useState(false);
  const auth = useAuth();

  const registerModal = () => {
    return (
      <>
        <div tw="text-[16px] leading-7 text-grey-8B font-semibold">
          Welcome!
        </div>
        <div tw="font-bold text-[20px] leading-7 text-[#333333]">
          Join the community
        </div>
        <Formik
          initialValues={{ email: '', displayName: '', password: '' }}
          validateOnChange={false}
          validate={(values) => {
            const errors: LoginErrors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.displayName) {
              errors.displayName = 'Required';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            return errors;
          }}
          onSubmit={async (values, { setFieldError }) => {
            try {
              await auth
                .createUserWithEmailAndPassword(
                  values.displayName,
                  values.email,
                  values.password
                )
                .then((userCred) => {
                  if (!userCred?.user) return;
                  auth.apiLogin(userCred.user);
                });
              props.onClose();
            } catch (error: any) {
              switch (error.code) {
                case 'auth/email-already-in-use': {
                  setFieldError(
                    'email',
                    'An account with that email already exists'
                  );
                  break;
                }
                case 'auth/invalid-email': {
                  setFieldError('email', 'Invalid email address');
                  break;
                }
                case 'auth/weak-password': {
                  setFieldError('password', 'Password is not strong enough');
                  break;
                }
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form tw="mt-3">
              <div>
                <div css={[styles.label, styles.req]}>Email address</div>
                <Field type="email" name="email" css={styles.input} />
                <div css={styles.error}>
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div>
                <div css={[styles.label, styles.req]}>Name</div>
                <Field type="text" name="displayName" css={styles.input} />
                <div css={styles.error}>
                  <ErrorMessage name="displayName" />
                </div>
              </div>
              <div css={[styles.label, styles.req]}>Password</div>
              <div tw="relative">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  css={styles.input}
                />
                <button
                  tw="bg-transparent border-none outline-none text-[#333333] underline text-[13px] leading-[18px] cursor-pointer absolute top-[18px] right-[10px]"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
                <div css={styles.error}>
                  <ErrorMessage name="password" />
                </div>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                css={[
                  buttons.red,
                  tw`bg-[#333333] hover:bg-[#3f3f3f] text-[16px] font-normal mt-5 w-full duration-150 h-14`,
                ]}
              >
                Create Account
              </button>
            </Form>
          )}
        </Formik>
      </>
    );
  };
  const loginModal = () => {
    return (
      <>
        <div tw="text-[16px] leading-7 text-grey-8B font-semibold">
          Welcome back!
        </div>
        <div tw="font-bold text-[20px] leading-7 text-[#333333]">Sign in</div>
        <Formik
          initialValues={{ email: '', password: '', staySignedIn: true }}
          validateOnChange={false}
          validate={(values) => {
            const errors: LoginErrors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            return errors;
          }}
          onSubmit={async (values, { setFieldError }) => {
            try {
              await auth
                .setRememberSession(true)
                .then(() =>
                  auth.signInWithEmailAndPassword(values.email, values.password)
                )
                .then((userCred) => {
                  if (!userCred?.user) return;
                  auth.apiLogin(userCred.user);
                });
              props.onClose();
            } catch (error: any) {
              switch (error.code) {
                case 'auth/invalid-email': {
                  setFieldError('email', 'Invalid email address');
                  break;
                }
                case 'auth/user-not-found': {
                  setFieldError(
                    'email',
                    'No user with the given email was found'
                  );
                  break;
                }
                case 'auth/wrong-password': {
                  setFieldError('password', 'Invalid password');
                }
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form tw="mt-3">
              <div>
                <div css={styles.label}>Email address</div>
                <Field type="email" name="email" css={styles.input} />
                <div css={styles.error}>
                  <ErrorMessage name="email" />
                </div>
              </div>
              <div css={styles.label}>Password</div>
              <div tw="relative">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  css={styles.input}
                />
                <button
                  tw="bg-transparent border-none outline-none text-[#333333] underline text-[13px] leading-[18px] cursor-pointer absolute top-[18px] right-[10px]"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
                <div css={styles.error}>
                  <ErrorMessage name="password" />
                </div>
              </div>
              <div tw="mt-[19px] flex w-full">
                <Field type="checkbox" name="staySignedIn" tw="w-5 h-5" />
                <div tw="font-semibold text-[13px] leading-5 text-[#333333] text-center ml-[10px]">
                  Stay signed in
                </div>
                <Link href="#" passHref>
                  <div tw="text-[#333333] underline text-[13px] leading-[18px] cursor-pointer ml-auto">
                    Forgot your password?
                  </div>
                </Link>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                css={[
                  buttons.red,
                  tw`bg-[#333333] hover:bg-[#3f3f3f] text-[16px] font-normal mt-5 w-full duration-150 h-14`,
                ]}
              >
                Sign in
              </button>
            </Form>
          )}
        </Formik>
      </>
    );
  };
  return (
    <div tw="fixed top-0 left-0 w-full h-full z-50 bg-black/40 flex items-center justify-center overflow-auto p-[50px]">
      <div tw="flex m-auto">
        <div tw="bg-white rounded-[20px] p-8 w-[400px]">
          {(register ? registerModal : loginModal)()}
          <div tw="flex mt-3 w-full justify-center items-center">
            <hr tw="border border-[#F1F2F3] bg-[#F1F2F3] flex-grow" />
            <div tw="w-4 text-[14px] text-center mx-10 text-[#98989E]">or</div>
            <hr tw="border border-[#F1F2F3] bg-[#F1F2F3] flex-grow" />
          </div>
          <button
            css={[
              buttons.white,
              tw`text-[16px] font-semibold mt-3 w-full duration-150 h-[52px]`,
            ]}
            onClick={() => auth.signInWithGoogle()}
          >
            <div tw="flex items-center justify-center">
              <img
                src="/assets/svgs/google.svg"
                tw="h-[50px] mr-[-3px]"
                alt="google icon"
              />
              Continue with Google
            </div>
          </button>
          <button
            css={[
              buttons.white,
              tw`text-[16px] font-semibold mt-3 w-full duration-150 h-[52px]`,
            ]}
            onClick={() => auth.signInWithFacebook()}
          >
            <div tw="flex items-center justify-center">
              <img
                src="/assets/svgs/facebook.svg"
                tw="h-[25px] mr-[10px]"
                alt="facebook icon"
              />
              Continue with Facebook
            </div>
          </button>
          <div tw="text-[13px] leading-5 mt-3 text-[#595959]">
            By clicking Create Account or Continue with Google or Facebook, you
            agree to Pkazo&#39;s{' '}
            <Link href="#" passHref>
              <span tw="underline cursor-pointer">Terms of Use</span>
            </Link>{' '}
            and{' '}
            <Link href="#" passHref>
              <span tw="underline cursor-pointer">Privacy Policy</span>
            </Link>
            . Pkazo may send you communications; you may change your preferences
            in your account settings.
          </div>

          {!register && (
            <div tw="text-[13px] leading-5 mt-3 text-center">
              New to Pkazo?{' '}
              <button
                onClick={() => setRegister(!register)}
                tw="bg-transparent border-none outline-none text-soft-red font-semibold underline cursor-pointer"
              >
                Register here
              </button>
            </div>
          )}
          {register && (
            <div tw="text-[13px] leading-5 mt-3 text-center">
              Already have an account?{' '}
              <button
                onClick={() => setRegister(!register)}
                tw="bg-transparent border-none outline-none text-soft-red font-semibold underline cursor-pointer"
              >
                Sign in
              </button>
            </div>
          )}
        </div>
        {!props.notCloseable && (
          <button
            onClick={props.onClose}
            tw="ml-5 w-11 h-11 border-0 outline-none bg-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.15)] rounded-full"
          >
            <img
              src="/assets/svgs/close.svg"
              tw="w-4 h-4 m-auto"
              alt="close button"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
