import * as admin from 'firebase-admin';
import setFirebaseEmulatorEnv from './setFirebaseEmulatorEnv';

if (admin.apps.length === 0) {
  setFirebaseEmulatorEnv();
  admin.initializeApp({
    projectId: 'pkazo',
    credential: admin.credential.cert(
      JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY!)
    ),
    databaseURL: process.env.FIREBASE_RTDB_URL,
  });
}

export const auth = admin.auth();
export const database = admin.database();
