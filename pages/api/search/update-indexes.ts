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
  console.log(req.body);
  if (!req.body.index || ['artists', 'works'].indexOf(req.body.index) === -1) {
    res.status(400).json({
      success: false,
      code: 'INVALID_INDEX',
      message:
        'The provided index to update was invalid. It must be one of: artists, works.',
    });
  }

  const index = client.initIndex(`pkazo-${req.body.index}`);

  if (
    !req.body.ids ||
    !Array.isArray(req.body.ids) ||
    req.body.ids.length === 0
  ) {
    res.status(400).json({
      success: false,
      code: 'INVALID_IDS',
      message: 'An array of one or more ids must be provided.',
    });
  }
  const ids: string[] = req.body.ids;
  const data = (
    await Promise.all(
      ids.map((id) =>
        admin
          .firestore()
          .collection(req.body.index)
          .doc(id)
          .get()
          .then((snapshot) => {
            if (!snapshot.exists || !snapshot.data()) {
              return null;
            }
            return {
              ...snapshot.data(),
              id: snapshot.id,
              objectID: snapshot.id,
            } as WorkRecord;
          })
      )
    )
  ).filter((w) => w !== null) as (WorkRecord | ArtistRecord)[];
  await index.saveObjects(data);
  res.status(200).json({
    success: true,
  });
}
