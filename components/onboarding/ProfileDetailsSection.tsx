import {
  ErrorMessage,
  Field,
  FieldProps,
  Form,
  Formik,
  FormikErrors,
} from 'formik';
import { getApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import { Container } from '../../pages/[username]';
import { ReactNode, useState } from 'react';
import tw from 'twin.macro';
import { User } from '@firebase/auth';

interface OnboardingFormValues {
  name: string;
  artistName: string;
  discipline: 'artist' | 'painter' | 'other' | '';
  birthday: string;
  location: string;
  acceptingCommissions: boolean | null;
  artistType:
    | 'professional'
    | 'hobby-desiring-professional'
    | 'hobby'
    | 'other'
    | '';
}

export default function ProfileDetailsSection({
  user,
  onComplete,
  setArtistId,
}: {
  user: User | null;
  onComplete: () => void;
  setArtistId: (artistId: string) => void;
}) {
  return (
    <Container>
      <div tw="text-[28px] font-semibold text-[#333333] text-center mt-14">
        Profile Details
      </div>
      <div tw="text-[18px] font-semibold text-[#333333] text-center mt-1">
        Let&#39;s get started! Tell us a little about you.
      </div>
      <Formik<OnboardingFormValues>
        initialValues={{
          name: '',
          artistName: '',
          discipline: '',
          birthday: '',
          location: '',
          acceptingCommissions: null,
          artistType: '',
        }}
        validateOnChange={false}
        validate={(values) => {
          const errors: FormikErrors<OnboardingFormValues> = {};

          // TODO: more rigorous validation, probably using Yup (integrates well with Formik)
          if (!values.name) {
            errors.name = 'Please enter your full name.';
          }

          if (!values.discipline) {
            errors.discipline = 'Please enter your art discipline.';
          }
          if (!values.birthday) {
            errors.birthday = 'Please enter your birthday.';
          }
          const birthdayDate = new Date(values.birthday);
          if (
            birthdayDate.getFullYear() < 1900 ||
            birthdayDate.getFullYear() > new Date().getFullYear()
          ) {
            errors.birthday = 'Please enter a valid birthday.';
          }

          if (!values.location) {
            errors.location = 'Please enter your location.';
          }
          if (!values.acceptingCommissions) {
            errors.acceptingCommissions =
              "Please let us know whether or not you're currently accepting commissions.";
          }
          if (!values.artistType) {
            errors.artistType =
              'Please let us know what type of artist you are.';
          }

          return errors;
        }}
        onSubmit={async (values) => {
          if (!user) {
            throw new Error('User is not defined');
          }
          console.log(values, 123);
          const app = getApp();
          const db = getFirestore(app);
          const artistRef = await addDoc(collection(db, 'Artists'), {
            AssociatedUser: user.uid,
            ArtistName: values.artistName,
            ArtistType: values.artistType,
            AcceptingCommissions: values.acceptingCommissions,
            Bio: "This user hasn't completed their bio yet.",
            Cover: '',
            DOB: new Date(values.birthday),
            Discipline: values.discipline,
            Education: [],
            Exhibitions: [],
            Experience: [],
            Followers: 0,
            Following: 0,
            Gender: '',
            IsApproved: true,
            Location: values.location,
            Name: values.name,
            ProfilePicture: '',
            PostNumber: 0,
            WorkNumber: 0,
            username: values.name
              .split(' ')
              .map((n) => n.toLowerCase())
              .join('-'),
          });
          setArtistId(artistRef.id);
          onComplete();
          return;
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
            placeholder={'City, Country'}
          ></Field>
          <OnboardingInput
            type={'radio'}
            inline
            name="acceptingCommissions"
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
            optionValues={[
              'professional',
              'hobbyist-desiring-professional',
              'hobbyist',
              'other',
            ]}
          ></OnboardingInput>

          <div />
          <div />
          <div />
          <div>
            <input
              type="submit"
              value="Save and continue"
              tw="float-right h-9 relative -top-0.5 text-white bg-theme-red rounded-full px-4 py-1 cursor-pointer hover:bg-[#be4040]"
            />
          </div>
        </Form>
      </Formik>
    </Container>
  );
}

function OnboardingInput({
  label,
  name,
  type,
  helpText,
  optional,
  children,
  ...props
}: {
  label: string;
  name: keyof OnboardingFormValues;
  helpText: string;
  optional?: boolean;
  children?: ReactNode;
} & (
  | {
      type: 'select' | 'radio';
      /**
       * The options for the select or radio.
       */
      options: string[];
      /**
       * The values for each select component. optionValues[2] will be the value for options[2], etc. This defaults to the lowercased option text.
       */
      optionValues?: string[];
      inline?: boolean;
    }
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
        tabIndex={-1}
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
            <select
              name={name}
              {...props}
              css={styles.input}
              tw="block appearance-none"
              defaultValue={''}
            >
              <option disabled value={''}></option>
              {(props as { options: string[] }).options.map((option) => (
                <option key={option} value={option.toLowerCase()}>
                  {option}
                </option>
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
          <Field name={name}>
            {({ field, form, meta }: FieldProps<OnboardingFormValues>) => (
              <>
                {(props as { options: string[] }).options.map((option, i) => {
                  const value = (props as { optionValues: string[] })
                    .optionValues
                    ? (props as { optionValues: string[] }).optionValues[i]
                    : option.toLowerCase();
                  return (
                    <label
                      key={option}
                      tw={'text-[#8B8B8B] text-[16px] pl-1 pr-3'}
                      style={{
                        display: (props as any).inline
                          ? 'inline-block'
                          : 'block',
                      }}
                    >
                      <input
                        onChange={() => form.setFieldValue(name, value)}
                        checked={form.values[name] === value}
                        name={name}
                        type={'radio'}
                        value={value}
                        tw="h-4 w-4 mx-1 align-middle"
                        css={{ 'accent-color': '#D11826' }}
                        {...props}
                      />
                      <span> {option}</span>
                    </label>
                  );
                })}
              </>
            )}
          </Field>
        ) : (
          <>
            <input
              css={styles.input}
              name={name}
              type={type || 'text'}
              {...props}
            />
            {/* TODO: the input border should be red when there is an error, in addition to the error message. */}
          </>
        )}
        <ErrorMessage name={name}>
          {(msg) => <p tw={'text-soft-red pt-1'}>{msg}</p>}
        </ErrorMessage>
      </div>
    </>
  );
}
