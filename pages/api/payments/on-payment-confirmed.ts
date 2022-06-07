import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import sendgrid from '@sendgrid/mail';
import admin from 'firebase-admin';
import Shippo from 'shippo';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

const stripe = new Stripe(process.env.STRIPE_SECRET + '', {
  apiVersion: '2020-08-27',
});
const shippo = Shippo(process.env.SHIPPO_API_KEY || '');

const parsedKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '');
if (admin.apps.length === 0) {
  admin.initializeApp({
    credential: admin.credential.cert({
      ...parsedKey,
      private_key: parsedKey.private_key.replace(/\\n/gm, '\n'),
    }),
  });
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const idToken = req.body.idToken;
  const workId = req.body.workId;
  // if (typeof idToken !== 'string') {
  //   res.status(400).end();
  //   return;
  // }
  console.log(req.body);
  const workData = (
    await admin.firestore().collection('Works').doc(workId).get()
  ).data();
  if (!workData) {
    res.status(400).json({
      code: 'WORK_NOT_FOUND',
      message: 'The work to be purchased could not be found.',
    });
    return;
  }
  if (!workData?.sale?.price) {
    res.status(400).json({
      code: 'PRICE_NOT_FOUND',
      message: 'This work is not eligible to be purchased.',
    });
    return;
  }
  console.log(workData);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.floor(workData?.sale?.price * 100),
    currency: 'usd',

    automatic_payment_methods: {
      enabled: true,
    },
  });
  // TODO: make sure item is available
  await sendgrid.send({
    to: 'jeffkmeng@gmail.com', // Change to your recipient
    from: 'orders@pkazo.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  });

  res.status(200).json({
    amount: workData?.price,
    clientSecret: paymentIntent.client_secret,
    workId,
  });
}
