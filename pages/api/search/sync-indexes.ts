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

// todo: figure out if we need to regularly run sync. Otherwise, this function is just for if the indexes get out of order
// during development or for some other reason
// to run sync:
// useEffect(() => {
//     if (!confirm('start sync?')) {
//       return;
//     }
//     console.log('STARTING');
//     axios
//       .post('/api/search/sync-indexes', {
//         index: 'works',
//       })
//       .then((d) => {
//         alert("DONE")
//         console.log('DONE', d);
//       })
//       .catch(e => {
//         alert("ERROR")
//         console.log("ERROR", e)
//       });
//   }, []);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // temporary until auth is implemented for this. Usually this does not need to be called by the client
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

    // const archiveOps: Promise<any>[] = [];

    const data = await admin
      .firestore()
      .collection(req.body.index)
      .get()
      .then((querySnapshot) => {
        return querySnapshot.docs
          .map((doc) => {
            const docData = doc.data() as WorkData;
            // if (
            //   docData.images?.length === 0 ||
            //   !docData.title ||
            //   !docData.artist ||
            //   !docData.timestamp
            // ) {
            //   archiveOps.push(
            //     admin
            //       .firestore()
            //       .collection('archive-' + req.body.index)
            //       .doc(doc.id)
            //       .set(docData)
            //       .then(() =>
            //         admin
            //           .firestore()
            //           .collection(req.body.index)
            //           .doc(doc.id)
            //           .delete()
            //       )
            //   );
            //   return null;
            // }
            return {
              ...docData,
              id: doc.id,
              objectID: doc.id,
            } as WorkRecord;
          })
          .filter((o) => o !== null) as WorkRecord[];
      });

    console.log('REINDEXING num: ', data.length);
    await index.replaceAllObjects(data);

    // console.log('ARCHIVING num: ', archiveOps.length);
    // await Promise.all(archiveOps);

    console.log('DONE');
    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(JSON.stringify(e));
    res.status(500).json({
      success: false,
      code: 'INTERNAL_ERROR',
    });
  }
}
