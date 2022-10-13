import React, { useState, useMemo, useRef, useEffect } from 'react';
import Image from 'next/image';
import tw from 'twin.macro';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikErrors,
  FormikHelpers,
  FormikProps,
} from 'formik';

import Dropdown from 'styles/Dropdown';
import buttons from 'styles/Button';
import countryList from 'react-select-country-list';
import { formatPrice } from 'components/popups/PostDetails';
import createShippingRates from '../../utils/shipping/createShippingRates';
import { ShippingRate } from '../../pages/api/shipping/create-rates';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import useCart from '../../utils/hooks/useCart';

interface CheckoutValues {
  email: string;
  firstName: string;
  lastName: string;
  // country: string;
  addressOne: string;
  addressTwo?: string;
  cityStateZip: string;
  shipping: string;
}

const ShippingRadio = ({
  price,
  text,
  id,
  estimatedDays,
  setShippingCost,
  setFieldValue,
  values,
}: {
  text: string;
  price: string;
  id: string;
  estimatedDays: number;
  setShippingCost: (rate: number) => void;
  setFieldValue: FormikHelpers<CheckoutValues>['setFieldValue'];
  values: CheckoutValues;
}) => {
  return (
    <label tw="w-full px-5 h-[60px] flex text-[14px] text-[#737373] font-semibold items-center">
      <Field
        type="radio"
        name="shipping"
        value={id}
        tw="w-5 h-5"
        css={{ 'accent-color': '#E24E4D' }}
      />
      <div tw="ml-6">
        {text} (estimated {estimatedDays} {estimatedDays !== 1 ? 'days' : 'day'}{' '}
        once shipped)
      </div>
      <div tw="ml-auto">{price}</div>
    </label>
  );
};

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51Kwi4sCF65DDbA2VOQZF5fCe4jOtg2nliprQOUdWFI1rivsaL074KDQdBSKkqVuHuse1xAk83OKKeFQ2HWRTmlEb00VSMxjKFb'
);

function PaymentSection({ setPage }: { setPage: (page: number) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  return (
    <>
      <PaymentElement />
      <div tw="mt-16 w-full flex justify-between">
        <button
          type="button"
          css={[buttons.white, tw`px-[30px] h-[52px]`]}
          onClick={() => setPage(1)}
        >
          Back
        </button>
        <button
          type="button"
          css={[buttons.red, tw`px-[30px] h-[52px]`]}
          onClick={async () => {
            if (!stripe || !elements) {
              alert('Please wait a few seconds and try again.');
              console.log('Stripe not loaded. Exiting');
              return;
            }
            await stripe.confirmPayment({
              elements,
              confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: '/order-complete',
              },
            });
          }}
        >
          Place Order
        </button>
      </div>
    </>
  );
}

function ShippingSelection({
  address: { name, streetOne, streetTwo, city, state, zip },
  setFieldValue,
  setShippingCost,
  values,
  shippingRates,
  setShippingRates,
}: {
  address: {
    name: string;
    streetOne: string;
    streetTwo?: string;
    city: string;
    state: string;
    zip: string;
  };
  setShippingCost: (rate: number) => void;
  setFieldValue: FormikHelpers<CheckoutValues>['setFieldValue'];
  values: CheckoutValues;
  shippingRates: ShippingRate[];
  setShippingRates: (rates: ShippingRate[]) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (!(name && streetOne && city && state && zip)) {
      setLoaded(false);
      setShippingRates([]);
      return;
    }
    setLoaded(false);
    setShippingRates([]);

    createShippingRates().then((rates) => {
      setShippingRates(rates);
      setLoaded(true);
    });
  }, [name, streetOne, streetTwo, city, state, zip]);

  useEffect(() => {
    const amount = shippingRates.find((r) => r.id === values.shipping)?.amount;
    if (amount) {
      setShippingCost(parseFloat(amount));
    }
  }, [values.shipping, shippingRates, setShippingCost]);
  return (
    <div tw="mt-6 border border-[#D9D9D9] rounded-[6px] ">
      {!loaded || shippingRates.length === 0 ? (
        <p tw={'p-6'}>Loading shipping options...</p>
      ) : (
        shippingRates.map((rate, i, arr) => (
          <>
            {i > 0 && <div tw="h-[1px] bg-[#D9D9D9]" />}
            <ShippingRadio
              text={rate.name}
              price={formatPrice(parseFloat(rate.amount))}
              estimatedDays={rate.estimatedDays}
              id={rate.id}
              setShippingCost={setShippingCost}
              setFieldValue={setFieldValue}
              values={values}
            />
          </>
        ))
      )}
    </div>
  );
}

const CheckoutForm = ({
  country,
  pageIndex,
  setPageIndex,
  isMobile,
  isLargeScreen,
  shippingCost,
  setShippingCost,
}: {
  country: string;
  pageIndex: number;
  setPageIndex: (x: number) => void;
  isMobile?: boolean;
  isLargeScreen?: boolean;
  shippingCost: number | null;
  setShippingCost: (x: number | null) => void;
}) => {
  // const [selectedCountry, setSelectedCountry] = useState(country || '');
  // const countries = useMemo(() => countryList().getLabels(), []);

  const pages = ['Information', 'Shipping', 'Payment'];
  const styles = {
    label: tw`text-[#333333] text-[18px] md:text-[22px] font-semibold md:font-bold`,
    input: tw`text-[14px] md:text-[16px] border border-[#D9D9D9] focus:border-[#888888] outline-none rounded-[6px] w-full h-11 md:h-12 px-4`,
    back: tw`bg-[#F2F2F2] rounded-[6px] w-full flex items-center px-4 h-14 gap-x-6 text-[14px]`,
    error: tw`text-[12px] mt-[2px] text-[#A61A2E]`,
  };

  // shipping options
  const shippingOptions = [
    'Fast(ish) Shipping',
    'Fast Shipping',
    'Faster Shipping',
  ];

  // input refs
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<FormikProps<CheckoutValues>>(null);
  const [formFocus, setFormFocus] = useState(0);
  const [pagesCompleted, setPagesCompleted] = useState<number[]>([]);
  const { cart } = useCart();

  const setPage = (nextPageIndex: number) => {
    // Allow the user to go back to previous pages or go to the next page if it's complete.
    if (
      pagesCompleted.includes(pageIndex) ||
      pagesCompleted.includes(nextPageIndex)
    ) {
      setPageIndex(nextPageIndex);
    }
  };

  const continueToPayment = (shippingMethod: string) => {
    // Check to be sure a shipping method was selected.
    console.log('continue to payment ', shippingMethod);
    if (shippingMethod) {
      setPagesCompleted([...pagesCompleted, 1]);
      setPage(2);
    }
  };

  useEffect(() => {
    const refs = [null, emailRef, addressRef];
    if (formFocus) {
      refs[formFocus]?.current?.focus();
      setFormFocus(0);
    }
  }, [formFocus]);
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  const [stripeSecret, setStripeSecret] = useState('');
  useEffect(() => {
    if (pageIndex !== 2) return;
    if (!formRef?.current?.values) return;
    console.log(formRef.current?.values);

    (async () => {
      const req = await axios.post('/api/payments/create-intent', {
        cart: cart,
        shippingRate: formRef.current?.values.shipping,
      });
      if (req.status === 200) {
        const data = req.data;
        console.log(data);
        setStripeSecret(data.clientSecret);
        return;
      }
    })();
  }, [formRef, pageIndex]);

  return (
    <div tw="max-w-[572px] w-full mt-8 lg:mt-16 pb-[100px] px-4 md:px-0">
      {isLargeScreen && (
        <Image
          src="/assets/images/Pkazo.svg"
          alt="Pkazo logo"
          width="137"
          height="48"
        />
      )}
      <div tw="md:mt-2 flex items-center gap-x-3">
        {pages.map((p, i) => (
          <>
            {i > 0 && (
              <Image
                src="/assets/svgs/arrow_right.svg"
                alt="section break"
                width={isMobile ? '6' : '8'}
                height={isMobile ? '10' : '12'}
              />
            )}
            <div
              tw="text-[14px] md:text-[16px] font-semibold cursor-pointer"
              css={[pageIndex === i ? tw`text-black` : tw`text-[#737373]`]}
              onClick={() => setPage(i)}
            >
              {p}
            </div>
          </>
        ))}
      </div>
      {/* Form section */}
      <div tw="mt-12 md:mt-16">
        <Formik<CheckoutValues>
          innerRef={formRef}
          initialValues={{
            email: '',
            firstName: '',
            lastName: '',
            // country: country,
            addressOne: '',
            addressTwo: '',
            cityStateZip: '',
            shipping: '',
          }}
          validateOnChange={false}
          validate={(values) => {
            console.log('validating');
            const errors: FormikErrors<CheckoutValues> = {};
            if (!values.email) {
              errors.email = 'Enter an email';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email';
            }
            if (!/^.+,.+,.+$/i.test(values.cityStateZip)) {
              errors.cityStateZip =
                'Please make sure to use this format: city, state, zip';
            }
            if (!values.firstName) {
              errors.firstName = 'Enter a first name';
            }
            if (!values.lastName) {
              errors.lastName = 'Enter a last name';
            }
            if (!values.addressOne) {
              errors.addressOne = 'Please enter an address';
            }
            console.log(errors);
            return errors;
          }}
          onSubmit={() => {
            if (!pagesCompleted.includes(pageIndex))
              setPagesCompleted([...pagesCompleted, pageIndex]);
            if (pageIndex < 2) setPage(pageIndex + 1);
          }}
        >
          {({ values, errors, touched, setFieldValue }) => (
            <Form>
              {pageIndex === 0 && (
                <>
                  <div css={[styles.label]}>Contact Information</div>
                  <div>
                    <Field
                      type="input"
                      name="email"
                      css={[
                        styles.input,
                        tw`mt-4 md:mt-6`,
                        touched.email && errors.email && tw`border-[#A61A2E]`,
                      ]}
                      placeholder="Email"
                      innerRef={emailRef}
                    />
                    <div css={[styles.error]}>
                      <ErrorMessage name="email" />
                    </div>
                  </div>
                  <div css={[styles.label, tw`mt-12 md:mt-16`]}>
                    Shipping Address
                  </div>
                  <div tw="mt-4 md:mt-6 flex flex-col gap-y-3 md:gap-y-4">
                    {/*<Field*/}
                    {/*  as={Dropdown}*/}
                    {/*  type="select"*/}
                    {/*  name="country"*/}
                    {/*  appearance={[styles.input, tw`pr-6 overflow-ellipsis`]}*/}
                    {/*  triangle*/}
                    {/*  */}
                    {/*  onChange={(*/}
                    {/*    event: React.ChangeEvent<HTMLInputElement>*/}
                    {/*  ) => {*/}
                    {/*    values.country = event.target.value;*/}
                    {/*    setSelectedCountry(values.country);*/}
                    {/*  }}*/}
                    {/*>*/}
                    {/*  <option value={selectedCountry}>{selectedCountry}</option>*/}
                    {/*  {countries.map(*/}
                    {/*    (i, ind) =>*/}
                    {/*      i !== selectedCountry && (*/}
                    {/*        <option key={ind} value={i}>*/}
                    {/*          {i}*/}
                    {/*        </option>*/}
                    {/*      )*/}
                    {/*  )}*/}
                    {/*</Field>*/}
                    <div tw="md:grid md:grid-cols-2 md:gap-x-4">
                      <div>
                        <Field
                          type="input"
                          name="firstName"
                          css={[
                            styles.input,
                            touched.firstName &&
                              errors.firstName &&
                              tw`border-[#A61A2E]`,
                          ]}
                          placeholder="First name"
                        />
                        <div css={[styles.error]}>
                          <ErrorMessage name="firstName" />
                        </div>
                      </div>
                      <div tw="mt-3 md:mt-0">
                        <Field
                          type="input"
                          name="lastName"
                          css={[
                            styles.input,
                            touched.lastName &&
                              errors.lastName &&
                              tw`border-[#A61A2E]`,
                          ]}
                          placeholder="Last name"
                        />
                        <div css={[styles.error]}>
                          <ErrorMessage name="lastName" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <Field
                        type="input"
                        name="addressOne"
                        css={[
                          styles.input,
                          touched.addressOne &&
                            errors.addressOne &&
                            tw`border-[#A61A2E]`,
                        ]}
                        placeholder="Address"
                        innerRef={addressRef}
                      />
                      <div css={[styles.error]}>
                        <ErrorMessage name="addressOne" />
                      </div>
                    </div>
                    <Field
                      type="input"
                      name="addressTwo"
                      css={[styles.input]}
                      placeholder="Address 2 (optional)"
                    />
                    <Field
                      type="input"
                      name="cityStateZip"
                      css={[
                        styles.input,
                        touched.cityStateZip &&
                          errors.cityStateZip &&
                          tw`border-[#A61A2E]`,
                      ]}
                      placeholder="City, State, Zip"
                    />
                    <div css={[styles.error]}>
                      <ErrorMessage name="cityStateZip" />
                    </div>
                  </div>
                  <div tw="mt-16 w-full flex justify-end">
                    <button
                      type="submit"
                      css={[buttons.red, tw`px-[30px] h-[52px]`]}
                      // onClick={() => !validateForm() && setPage(1)}
                      // disabled={validateInfo(values)}
                    >
                      Continue to Shipping
                    </button>
                  </div>
                </>
              )}
              {pageIndex === 1 && (
                <>
                  <div css={[styles.back]}>
                    <div tw="text-[#5B5B5B] font-semibold w-12 flex-none">
                      Contact
                    </div>
                    <div tw="text-[#222222] font-medium flex-grow overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {values.email}
                    </div>
                    <div
                      tw="text-[#222222] font-bold cursor-pointer flex-none"
                      onClick={() => {
                        setFormFocus(1);
                        setPage(0);
                      }}
                    >
                      Change
                    </div>
                  </div>
                  <div css={[styles.back, tw`mt-4`]}>
                    <div tw="text-[#5B5B5B] font-semibold w-12 flex-none">
                      Ship to
                    </div>
                    <div tw="text-[#222222] font-medium flex-grow overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {values.cityStateZip}
                    </div>
                    <div
                      tw="text-[#222222] font-bold cursor-pointer flex-none"
                      onClick={() => {
                        setFormFocus(2);
                        setPage(0);
                      }}
                    >
                      Change
                    </div>
                  </div>
                  <div css={[styles.label, tw`mt-16`]}>Shipping method</div>
                  {values.cityStateZip &&
                    values.cityStateZip.split(', ').length >= 3 && (
                      <ShippingSelection
                        address={{
                          name: values.firstName + ' ' + values.lastName,
                          streetOne: values.addressOne,
                          city: values.cityStateZip.split(', ')[0].trim(),
                          state: values.cityStateZip.split(', ')[1].trim(),
                          zip: values.cityStateZip.split(', ')[2].trim(),
                        }}
                        setShippingCost={setShippingCost}
                        setFieldValue={setFieldValue}
                        values={values}
                        shippingRates={shippingRates}
                        setShippingRates={setShippingRates}
                      />
                    )}
                  <div tw="mt-16 w-full flex justify-between">
                    <button
                      type="button"
                      css={[buttons.white, tw`px-[30px] h-[52px]`]}
                      onClick={() => setPage(0)}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      css={[buttons.red, tw`px-[30px] h-[52px]`]}
                      onClick={() => continueToPayment(values.shipping)}
                    >
                      Continue to Payment
                    </button>
                  </div>
                </>
              )}
              {pageIndex === 2 && (
                <>
                  <div css={[styles.back]}>
                    <div tw="text-[#5B5B5B] font-semibold w-12 flex-none">
                      Contact
                    </div>
                    <div tw="text-[#222222] font-medium flex-grow overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {values.email}
                    </div>
                    <div
                      tw="text-[#222222] font-bold cursor-pointer flex-none"
                      onClick={() => {
                        setFormFocus(1);
                        setPage(0);
                      }}
                    >
                      Change
                    </div>
                  </div>
                  <div css={[styles.back, tw`mt-4`]}>
                    <div tw="text-[#5B5B5B] font-semibold w-12 flex-none">
                      Ship to
                    </div>
                    <div tw="text-[#222222] font-medium flex-grow overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {values.cityStateZip}
                    </div>
                    <div
                      tw="text-[#222222] font-bold cursor-pointer flex-none"
                      onClick={() => {
                        setFormFocus(2);
                        setPage(0);
                      }}
                    >
                      Change
                    </div>
                  </div>
                  <div css={[styles.back, tw`mt-4`]}>
                    <div tw="text-[#5B5B5B] font-semibold w-12 flex-none">
                      Method
                    </div>
                    <div tw="text-[#222222] font-medium flex-grow overflow-ellipsis overflow-hidden whitespace-nowrap">
                      {
                        shippingRates.find((i) => i.id === values.shipping)
                          ?.name
                      }
                    </div>
                    <div
                      tw="text-[#222222] font-bold cursor-pointer flex-none"
                      onClick={() => {
                        setPage(1);
                      }}
                    >
                      Change
                    </div>
                  </div>
                  <div css={[styles.label, tw`mt-16 mb-8`]}>Payment</div>
                  {stripeSecret && (
                    <Elements
                      stripe={stripePromise}
                      options={{
                        clientSecret: stripeSecret,
                      }}
                    >
                      <PaymentSection setPage={setPage} />
                    </Elements>
                  )}
                  {!stripeSecret && <p>Loading...</p>}
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default CheckoutForm;
