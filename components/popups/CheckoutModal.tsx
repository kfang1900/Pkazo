import React, { useEffect, useState } from 'react';
import 'twin.macro';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import * as Yup from 'yup';

import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { ArtistData, Work } from '../../types/firebaseTypes';
import { ShippingRate } from '../../pages/api/shipping/create-rates';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51Kwi4sCF65DDbA2VOQZF5fCe4jOtg2nliprQOUdWFI1rivsaL074KDQdBSKkqVuHuse1xAk83OKKeFQ2HWRTmlEb00VSMxjKFb'
);
type PurchaseInfo = {
  buyerName: string;
  email: string;
  phone: string;
  shippingName: string;
  streetOne: string;
  streetTwo: string;
  cityStateZip: string;
};
function PaymentForm({
  info,
  selectedShippingRate,
  setStage,
}: {
  info: PurchaseInfo;
  selectedShippingRate: string;
  setStage: (stage: 'INFO' | 'PAYMENT' | 'SHIPPING') => void;
}) {
  const stripe = useStripe();
  const elements = useElements();

  const [selectedShippingOption, setSelectedShippingOption] = useState('');
  return (
    <>
      <div tw={'my-4'}>
        <h3 tw={'font-bold text-xl mt-6 mb-2'}>Payment Information</h3>
        <PaymentElement />
      </div>

      <button
        type="button"
        onClick={async () => {
          if (!stripe || !elements) {
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
        tw="mt-3 h-9 w-40 relative -top-0.5 text-white bg-theme-red rounded-[6px] px-4 py-1 cursor-pointer hover:bg-[#be4040]"
      >
        Submit Payment
      </button>
      <a
        tw={'h-9 px-4 py-1 cursor-pointer underline'}
        onClick={() => {
          setStage('INFO');
        }}
      >
        Back
      </a>
    </>
  );
}
const debounce = (fn: (...args: any[]) => void, ms = 300) => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function (this: any, ...args: any[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
};

function ShippingOptionsForm({
  workId,
  info,
  selectedShippingRate,
  setSelectedShippingRate,
  setStage,
}: {
  workId: string;
  info: PurchaseInfo;
  selectedShippingRate: string;
  setSelectedShippingRate: (newRate: string) => void;
  setStage: (stage: 'INFO' | 'SHIPPING' | 'PAYMENT') => void;
}) {
  const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
  React.useEffect(() => {
    (async () => {
      const resp = await axios.post('/api/shipping/create-rates', {
        workId: workId,
        address: {
          name: info.shippingName,
          streetOne: info.streetOne,
          streetTwo: info.streetTwo,
          cityStateZip: info.cityStateZip,
        },
      });
      const data = resp.data;
      console.log(data);
      setShippingRates(data.rates as ShippingRate[]);
    })();
  }, []);
  return (
    <div>
      <h3 tw={'font-bold text-xl mt-6 mb-2'}>Shipping Options</h3>
      <p tw={'mb-3'}>
        <i>
          Please note delivery estimates do not include order processing time,
          which may take up to 3 days.
        </i>
      </p>
      <p>
        <b>Shipping To:</b>
      </p>
      <p tw={'mb-4'}>
        {info.shippingName}
        <br />
        {info.streetOne}
        {info.streetTwo ? (
          <>
            <br />
            {info.streetTwo}
          </>
        ) : (
          <></>
        )}
        <br />
        {info.cityStateZip}
      </p>
      {shippingRates.map((r) => (
        <label
          key={r.id}
          tw={' text-[16px] pl-1 pr-3'}
          style={{
            display: 'block',
          }}
        >
          <input
            onChange={() => setSelectedShippingRate(r.id)}
            checked={r.id === selectedShippingRate}
            type={'radio'}
            value={r.id}
            tw="h-4 w-4 mx-1 align-middle"
            css={{ 'accent-color': '#D11826' }}
          />
          <span>
            {' '}
            <b>{r.name}</b>
            {r.attributes.length > 0 &&
              ' (' +
                r.attributes
                  .map((a: string) =>
                    a === 'FASTEST'
                      ? 'Fastest'
                      : a === 'BESTVALUE'
                      ? 'Best Value'
                      : a === 'CHEAPEST'
                      ? 'Cheapest'
                      : a
                  )
                  .join(', ') +
                ') '}
            - ${r.amount}
          </span>
          <span tw={'block pl-3 italic mb-2'}>{r.durationTerms}</span>
        </label>
      ))}
      <button
        type="button"
        onClick={() => {
          setStage('PAYMENT');
        }}
        tw="mt-3 h-9 w-56 relative -top-0.5 text-white bg-theme-red rounded-[6px] px-4 py-1 cursor-pointer hover:bg-[#be4040]"
      >
        Continue to Payment
      </button>{' '}
      <a
        tw={'h-9 px-4 py-1 cursor-pointer underline'}
        onClick={() => {
          setStage('INFO');
        }}
      >
        Back
      </a>
    </div>
  );
}

function InformationForm({
  info,
  workId,
  setInfo,
  setStage,
}: {
  info: PurchaseInfo;
  workId: string;
  setInfo: (newInfo: PurchaseInfo) => void;
  setStage: (newStage: 'INFO' | 'SHIPPING' | 'PAYMENT') => void;
}) {
  return (
    <>
      <Formik
        initialValues={info}
        validationSchema={Yup.object().shape({
          buyerName: Yup.string().required('Please enter a buyer name'),
          email: Yup.string()
            .email('Please enter a valid email.')
            .required('Please enter an email.'),
          phone: Yup.string().required('Please enter a phone number.'),
          shippingName: Yup.string().required('Please enter a buyer name'),
          streetOne: Yup.string().required('Please enter a street'),
          streetTwo: Yup.string().optional(),
          cityStateZip: Yup.string()
            .matches(
              /.+, .+, .+(, .+)?/,
              'Please use the following format: City, State, Zip (e.g. Flagstaff, AZ, 12345)'
            )
            .required('Please enter a city, state, and zip code'),
        })}
        onSubmit={async (values) => {
          console.log(values);
          setInfo(values);
          setStage('SHIPPING');
        }}
      >
        {({ values, touched, errors, setFieldValue, submitForm }) => (
          <>
            <h3 tw={'font-bold text-xl mt-6 mb-2'}>Buyer Information</h3>
            <div tw={'pt-3'}>
              <p tw={'pb-1'}>
                <label tw={'font-semibold'}>Full Name</label>
              </p>
              <Field
                type="input"
                name="buyerName"
                tw={
                  'border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]'
                }
              />
              {errors.buyerName && touched.buyerName && (
                <p tw={'text-red-700'}>{errors.buyerName}</p>
              )}
            </div>
            <div tw={'pt-3'}>
              <p tw={'pb-1'}>
                <label tw={'font-semibold'}>Email</label>
              </p>
              <Field
                type="input"
                name="email"
                tw={
                  'border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]'
                }
              />
              {errors.email && touched.email && (
                <p tw={'text-red-700'}>{errors.email}</p>
              )}
            </div>
            <div tw={'pt-3'}>
              <p tw={'pb-1'}>
                <label tw={'font-semibold'}>Phone Number</label>
              </p>
              <Field
                type="input"
                name="phone"
                tw={
                  'border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]'
                }
              />
              {errors.phone && touched.phone && (
                <p tw={'text-red-700'}>{errors.phone}</p>
              )}
            </div>
            <h3 tw={'font-bold text-xl mt-6 mb-2'}>Shipping Address</h3>
            <div tw={'pt-3'}>
              <p tw={'pb-1'}>
                <label tw={'font-semibold'}>Name</label>
              </p>
              <Field
                type="input"
                name="shippingName"
                tw={
                  'border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]'
                }
              />
              {errors.shippingName && touched.shippingName && (
                <p tw={'text-red-700'}>{errors.shippingName}</p>
              )}
            </div>
            <div tw={'pt-3'}>
              <p tw={'pb-1'}>
                <label tw={'font-semibold'}>Street Line One</label>
              </p>
              <Field
                type="input"
                name="streetOne"
                tw={
                  'border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]'
                }
              />
              {errors.streetOne && touched.streetOne && (
                <p tw={'text-red-700'}>{errors.streetOne}</p>
              )}
            </div>
            <div tw={'pt-3'}>
              <p tw={'pb-1'}>
                <label tw={'font-semibold'}>Street Line Two (Optional)</label>
              </p>
              <Field
                type="input"
                name="streetTwo"
                tw={
                  'border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]'
                }
              />
              {errors.streetTwo && touched.streetTwo && (
                <p tw={'text-red-700'}>{errors.streetTwo}</p>
              )}
            </div>
            <div tw={'pt-3'}>
              <p tw={'pb-1'}>
                <label tw={'font-semibold'}>
                  City, State/Province, Zip, Country
                </label>
              </p>
              <Field
                type="input"
                name="cityStateZip"
                tw={
                  'border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]'
                }
              />
              {errors.cityStateZip && touched.cityStateZip && (
                <p tw={'text-red-700'}>{errors.cityStateZip}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => submitForm()}
              tw="mt-3 h-9 w-80 relative -top-0.5 text-white bg-theme-red rounded-[6px] px-4 py-1 cursor-pointer hover:bg-[#be4040]"
            >
              Continue to Shipping Options
            </button>
          </>
        )}
      </Formik>
    </>
  );
}
export default function CheckoutModal({
  onClose,
  workId,
  workData,
  image,
  artistData,
}: {
  onClose: () => void;
  workId: string;
  workData: Work;
  image: string;
  artistData: ArtistData;
}) {
  const [stripeSecret, setStripeSecret] = useState('');
  const [stage, setStage] = useState<'INFO' | 'PAYMENT' | 'SHIPPING'>('INFO');
  const [selectedShippingRate, setSelectedShippingRate] = useState('');

  useEffect(() => {
    if (stage !== 'PAYMENT') return;
    (async () => {
      const req = await axios.post('/api/payments/create-intent', {
        workId: workId,
        shippingRate: selectedShippingRate,
      });
      if (req.status === 200) {
        const data = req.data;
        console.log(data);
        setStripeSecret(data.clientSecret);
        return;
      }
    })();
  }, [stage, workId, selectedShippingRate]);

  const [info, setInfo] = useState<PurchaseInfo>({
    buyerName: '',
    email: '',
    phone: '',
    shippingName: '',
    streetOne: '',
    streetTwo: '',
    cityStateZip: '',
  });
  return (
    <div tw="fixed top-0 left-0 w-full h-full z-50 bg-black/40 flex items-center justify-center overflow-auto p-[50px]">
      <div tw="flex m-auto">
        <div tw="bg-white rounded-[20px] z-20 p-[52px] w-[1171px] h-[746px] grid grid-cols-5 gap-8">
          <div tw={'w-full py-4 col-span-2'}>
            <p tw={'text-3xl font-bold'}>Checkout</p>

            <h2 tw={'font-semibold text-2xl mt-4 mb-2 flex justify-between'}>
              <span tw={'font-semibold text-2xl mt-6 mb-2'}>
                {workData.title}
              </span>
              <span tw={'font-semibold text-2xl mt-6 mb-2'}>
                ${workData.forSale && workData.sale.price}
              </span>
            </h2>
            <p>
              <i>{artistData.Name}</i> | {workData.medium}
            </p>
            <img src={image} tw={'align-middle h-1/2 mt-5'} alt="work_image" />
          </div>
          <div
            tw={'w-full p-4 overflow-auto shadow-inner rounded-sm col-span-3'}
          >
            {stage === 'PAYMENT' && (
              <div>
                {stripeSecret && (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret: stripeSecret,
                    }}
                  >
                    <PaymentForm
                      info={info}
                      selectedShippingRate={selectedShippingRate}
                      setStage={setStage}
                    />
                  </Elements>
                )}
              </div>
            )}
            {stage === 'INFO' && (
              <InformationForm
                workId={workId}
                setInfo={setInfo}
                setStage={setStage}
                info={info}
              />
            )}
            {stage === 'SHIPPING' && (
              <ShippingOptionsForm
                workId={workId}
                info={info}
                selectedShippingRate={selectedShippingRate}
                setSelectedShippingRate={setSelectedShippingRate}
                setStage={setStage}
              />
            )}
          </div>
        </div>
        <button
          onClick={() => onClose()}
          tw="ml-5 w-12 h-12 border-0 outline-none bg-none hover:bg-[rgba(255,255,255,0.08)] rounded-full"
        >
          <img
            src="/assets/svgs/close.svg"
            tw="w-5 h-5 m-auto"
            alt="close button"
          />
        </button>
      </div>
    </div>
  );
}
