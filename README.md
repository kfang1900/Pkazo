## Setup

1. `npm i`
2. Use VSCode, make sure the recommended eslint and prettier plugins are installed. Automatic linting should occur when you save!
3. `npx husky install`. Automatic linting should occur when you commit!
4. `npx firebase login` for local emulator
5. Fill in the environmental variables listed below

## Commands

- `npm run dev`: Runs the local Next.js dev server.
- `npm run build`: Generates the Next.js production build.
- `npm start`: Starts the Next.js production build.
- `npm run fbemu`: Starts the local firebase emulator.

## Environmental Variables

**Firebase Admin**:

- `FIREBASE_SERVICE_ACCOUNT_KEY`: `JSON.stringify` of the Firebase service account key file
- `FIREBASE_RTDB_URL`: Database URL for Firebase RTDB

**Firebase App**:

- `NEXT_PUBLIC_FIREBASE_API_KEY`: Firebase API key
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`: Firebase Auth Domain
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`: Firebase Project ID (optional for emulator)
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`: Firebase Storage Bucket (optional for emulator)
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`: Firebase Messaging Sender ID (optional for emulator)
- `NEXT_PUBLIC_FIREBASE_APP_ID`: Firebase App ID (optional for emulator)
- `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`: Firebase Measurement ID (optional for emulator)

**Firebase Emulator**

- `NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST`: Leave empty for production or `localhost:9099` for local emulator
- `NEXT_PUBLIC_FIREBASE_DATABASE_EMULATOR_HOST`: Leave empty for production or `localhost:9000` for local emulator
