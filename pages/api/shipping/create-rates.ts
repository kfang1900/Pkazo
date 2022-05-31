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
  const workId = req.body.workId;
  const address = req.body.address as {
    name: string;
    streetOne: string;
    streetTwo?: string;
    cityStateZip: string;
  };

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

  const data = await shippo.shipment.create({
    address_from: {
      name: 'Shawn Ippotle',
      street1: '215 Clayton St.',
      city: 'San Francisco',
      state: 'CA',
      zip: '94117',
      country: 'US',
    },
    address_to: {
      name: address.name,
      street1:address.streetOne,
      street2:address.streetTwo,
      city: address.cityStateZip.split(", ")[0],
      state: address.cityStateZip.split(", ")[1],
      zip: address.cityStateZip.split(", ")[2],
      country: 'US',
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
}
