import { getApps, initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import setFirebaseEmulatorEnv from './setFirebaseEmulatorEnv';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
if (getApps().length === 0) {
  setFirebaseEmulatorEnv();
  initializeApp(firebaseConfig);
  console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY);
  if (process.env.FIREBASE_AUTH_EMULATOR_HOST)
    connectAuthEmulator(
      getAuth(),
      `http://${process.env.FIREBASE_AUTH_EMULATOR_HOST}`
    );
}
