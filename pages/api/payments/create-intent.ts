import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import admin from 'firebase-admin';
import { Cart } from '../../../utils/hooks/CartContext';
import axios from 'axios';
import Shippo from 'shippo';
const shippo = Shippo(process.env.SHIPPO_API_KEY || '');

const stripe = new Stripe(process.env.STRIPE_SECRET + '', {
  apiVersion: '2020-08-27',
});
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
  try {
    // const idToken = req.body.idToken;
    const cart = req.body.cart as Cart;
    const rate = req.body.shippingRate as string;
    // if (typeof idToken !== 'string') {
    //   res.status(400).end();
    //   return;
    // }
    if (!rate || !cart) {
      res.status(400).json({
        code: 'INVALID_REQUEST',
        message: 'One or more required parameters were not provided.',
      });
      return;
    }
    console.log(req.body);
    const workData = await Promise.all(
      cart.map((item) =>
        admin
          .firestore()
          .collection('works')
          .doc(item.id)
          .get()
          .then((s) => ({
            ...item,
            data: s.data(),
          }))
      )
    );
    if (!workData || workData.length === 0 || workData.some((i) => !i.data)) {
      res.status(400).json({
        code: 'WORK_NOT_FOUND',
        message: 'The work to be purchased could not be found.',
      });
      return;
    }
    const prices = workData.map((i) =>
      i.type === 'original'
        ? i.data?.sale.price
        : i.data?.print.price * i.quantity
    );
    if (!prices || prices.some((p) => !p)) {
      res.status(400).json({
        code: 'PRICE_NOT_FOUND',
        message: 'This work is not eligible to be purchased.',
      });
      return;
    }
    console.log(workData);
    console.log(rate);
    const shippingRate = parseFloat(
      (
        await axios.get('https://api.goshippo.com/rates/' + rate, {
          headers: {
            Authorization: `ShippoToken ${process.env.SHIPPO_API_KEY}`,
          },
        })
      ).data.amount
    );
    const orderTotal = Math.floor(
      (shippingRate + prices.reduce((s, p) => s + p, 0)) * 100
    );
    const paymentIntent = await stripe.paymentIntents.create({
      amount: orderTotal,
      currency: 'usd',

      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({
      amount: orderTotal,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      error: e + '',
    });
  }
}
