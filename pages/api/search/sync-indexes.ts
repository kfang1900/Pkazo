import { NextApiRequest, NextApiResponse } from 'next';

import algoliasearch from 'algoliasearch';
import admin from 'firebase-admin';
import { ArtistRecord, WorkData, WorkRecord } from '../../../types/dbTypes';

const client = algoliasearch(
  'C7MS0BD8WG',
  process.env.ALGOLIA_INDEXONLY_KEY + ''
);

if (admin.apps.length === 0) {
  const parsedKey = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || '');
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
    if (true) {
      res.status(500).json({
        success: false,
        code: 'UNAUTHORIZED',
        message: 'You are not authorized to perform this action.',
      });
    }
    if (
      !req.body.index ||
      ['artists', 'works'].indexOf(req.body.index) === -1
    ) {
      res.status(400).json({
        success: false,
        code: 'INVALID_INDEX',
        message:
          'The provided index to update was invalid. It must be one of: artists, works.',
      });
    }

    const index = client.initIndex(`pkazo-${req.body.index}`);

    const data = await admin
      .firestore()
      .collection(req.body.index)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
            objectID: doc.id,
          } as WorkRecord;
        });
      });

    await index.replaceAllObjects(data);
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(JSON.stringify(e));
  }
}
