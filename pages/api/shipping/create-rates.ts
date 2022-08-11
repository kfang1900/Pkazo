import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import Shippo from 'shippo';

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
export type ShippingRate = {
  amount: string;
  attributes: string[];
  durationTerms: string;
  id: string;
  name: string;
  estimatedDays: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const workId = req.body.workId;
    const address = req.body.address as {
      name: string;
      streetOne: string;
      streetTwo?: string;
      city: string;
      state: string;
      zip: string;
      country: string;
    };

    console.log(req.body);
    const workData = (
      await admin.firestore().collection('works').doc(workId).get()
    ).data();
    if (!workData) {
      res.status(400).json({
        code: 'WORK_NOT_FOUND',
        message: 'The work to be purchased could not be found.',
      });
      return;
    }

    const data = await shippo.shipment.create({
      address_from: {
        name: 'Some Shipper',
        street1: '21840 McClellan Rd',
        city: 'Cupertino',
        state: 'CA',
        zip: '95014',
        country: 'USA',
      },

      //   {
      //   name: address.name,
      //   street1: address.streetOne,
      //   ...(address.streetTwo ? { street2: address.streetTwo } : {}),
      //   city: address.city,
      //   state: address.state,
      //   zip: address.zip,
      //   country: address.country,
      // },
      address_to: {
        name: address.name,
        street1: address.streetOne,
        street2: address.streetTwo || '',
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country,
      },
      parcels: [
        {
          length: 5,
          width: 5,
          height: 5,
          distance_unit: 'in',
          weight: 2,
          mass_unit: 'lb',
        },
      ],
      async: true,
    });
    console.log(data);

    res.status(200).json({
      success: true,
      rates: data.rates.map((rate) => ({
        amount: rate.amount,
        attributes: rate.attributes,
        durationTerms: (rate as { duration_terms?: string }).duration_terms,
        id: (rate as { object_id?: string }).object_id,
        name:
          rate.provider +
          ' ' +
          ((rate.servicelevel as { name?: string }).name || ''),
        estimatedDays: (rate as { estimated_days?: string }).estimated_days,
      })),
    });
  } catch (e) {
    res.status(500).json({
      error: e + '',
      success: false,
    });
  }
}
