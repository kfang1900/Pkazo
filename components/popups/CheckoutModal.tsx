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
      <PaymentElement />

      <input
        onClick={async () => {
          if (!stripe || !elements) return;
          return stripe.confirmPayment({
            elements,
            confirmParams: {
              // Make sure to change this to your payment completion page
              return_url: 'http://localhost:3000/order-complete',
            },
          });
        }}
        type="button"
        value="Submit Payment"
        tw="mt-3 h-9 w-40 relative -top-0.5 text-white bg-theme-red rounded-[6px] px-4 py-1 cursor-pointer hover:bg-[#be4040]"
      />
    </>
  );
}

export default function CheckoutModal({
  onClose,
  workId,
}: {
  onClose: () => void;
  workId: string;
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
        <div tw="bg-white rounded-[20px] z-20 p-[52px] w-[1171px] h-[746px]">
          <p tw={'text-3xl font-bold'}>Checkout</p>
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
