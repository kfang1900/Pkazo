import React, { useEffect, useState } from 'react';
import 'twin.macro';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { ArtistData, Work } from '../../types/firebaseTypes';
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51Kwi4sCF65DDbA2VOQZF5fCe4jOtg2nliprQOUdWFI1rivsaL074KDQdBSKkqVuHuse1xAk83OKKeFQ2HWRTmlEb00VSMxjKFb'
);
function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  return (
    <>
      <Formik
        initialValues={{
          buyerName: '',
          email: '',
          phone: '',
          shippingName: '',
          streetOne: '',
          streetTwo: '',
          cityStateZip: '',
        }}
        onSubmit={async (values) => {
          console.log(values);
          if (!stripe || !elements) return;
          await stripe.confirmPayment({
            elements,
            confirmParams: {
              // Make sure to change this to your payment completion page
              return_url: '/order-complete',
            },
          });
        }}
      >
        {({ values, setValues, submitForm }) => (
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
            </div>
            <h3 tw={'font-bold text-xl mt-6 mb-2'}>Shipping Address</h3>
            <div tw={'pt-3'}>
              <p tw={'pb-1'}>
                {' '}
                <label tw={'font-semibold'}>Name</label>
              </p>
              <Field
                type="input"
                name="shippingName"
                tw={
                  'border border-[#D8D8D8] rounded-[6px] px-[16px] text-[16px] w-full h-[40px]'
                }
              />
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
            </div>
            <div tw={'my-4'}>
              <h3 tw={'font-bold text-xl mt-6 mb-2'}>Payment Information</h3>
              <PaymentElement />
            </div>
            <button
              type="button"
              onClick={() => submitForm()}
              tw="mt-3 h-9 w-40 relative -top-0.5 text-white bg-theme-red rounded-[6px] px-4 py-1 cursor-pointer hover:bg-[#be4040]"
            >
              Submit Payment
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
  useEffect(() => {
    (async () => {
      const req = await axios.post('/api/payments/create-intent', {
        workId: workId,
      });
      if (req.status === 200) {
        const data = req.data;
        console.log(data);
        setStripeSecret(data.clientSecret);
        return;
      }
    })();
  }, [workId]);
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
            <div>
              {stripeSecret && (
                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret: stripeSecret,
                  }}
                >
                  <PaymentForm />
                </Elements>
              )}
            </div>
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
