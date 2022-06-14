import type { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import Shippo from 'shippo';
import axios from 'axios';

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
  const workId = req.query.workId;

  let zip = req.query.zip;
  let countryCode = 'US';
  const ip = req.headers['x-real-ip'];

  if (!workId || typeof workId !== 'string') {
    res.status(400).json({
      code: 'INVALID_REQUEST',
      message: 'The request did not contain a valid work ID.',
    });
  }
  console.log('Zip, IP, headers');
  console.log(zip, ip);
  console.log(req.headers);
  if (!zip && !ip) {
    res.status(400).json({
      code: 'UNABLE_TO_INFER_IP',
      message:
        'The request did not contain a zip code, and we were unable to obtain the client ip address to infer a zip code.',
    });
    return;
  }
  if (!zip) {
    try {
      const ipData = (
        await axios.get(`https://ipxapi.com/api/ip?ip=${ip}`, {
          headers: {
            Authorization: `Bearer ${process.env.IPX_API_KEY || ''}`,
          },
        })
      ).data;
      zip = ipData.zip;
      countryCode = ipData.countryCode || 'US';
      if (!zip) {
        throw new Error('No zip code');
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({
        code: 'UNABLE_TO_INFER_ZIP',
        message:
          'The request did not contain a zip code, and we were unable to infer the zip code using the IP address api.',
      });
      return;
    }
  }

  const workData = (
    await admin
      .firestore()
      .collection('works')
      .doc(workId as string)
      .get()
  ).data();
  if (!workData) {
    res.status(400).json({
      code: 'WORK_NOT_FOUND',
      message: 'The work could not be found.',
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
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    address_to: {
      zip: zip as string,
      country: countryCode as string,
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
      name:
        rate.provider +
        ' ' +
        ((rate.servicelevel as { name?: string }).name || ''),
      estimatedDays: (rate as { estimated_days?: string }).estimated_days,
    })),
    zip: zip,
  });
}
