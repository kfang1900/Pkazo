import { NextApiRequest, NextApiResponse } from 'next';

import algoliasearch from 'algoliasearch';
import admin from 'firebase-admin';
import { WorkData, WorkRecord } from '../../../types/dbTypes';

const client = algoliasearch(
  'C7MS0BD8WG',
  process.env.ALGOLIA_INDEXONLY_KEY + ''
);
const index = client.initIndex('pkazo-works');

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
  if (
    !req.body.workIds ||
    !Array.isArray(req.body.workIds) ||
    req.body.workIds.length === 0
  ) {
    res.status(400).json({
      success: false,
      code: 'INVALID_IDS',
      message: 'An array of one or more workIds must be provided.',
    });
  }
  const workIds: string[] = req.body.workIds;
  const workData = (
    await Promise.all(
      workIds.map((id) =>
        admin
          .firestore()
          .collection('works')
          .doc(id)
          .get()
          .then((snapshot) => {
            if (!snapshot.exists || !snapshot.data()) {
              return null;
            }
            const data = snapshot.data() as WorkData;
            return {
              ...snapshot.data(),
              id: snapshot.id,
              objectID: snapshot.id,
            } as WorkRecord;
          })
      )
    )
  ).filter((w) => w !== null) as WorkRecord[];
  await index.saveObjects(workData);
  res.status(200).json({
    success: true,
  });
}
