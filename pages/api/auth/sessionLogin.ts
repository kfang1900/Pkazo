import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

import { auth } from 'utils/FirebaseServer';

const SESSION_EXPIRATION = 1000 * 60 * 60 * 24 * 7; // 1 week
const SESSION_COOKIE_OPTIONS = {
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
  maxAge: SESSION_EXPIRATION,
  path: '/',
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const idToken = req.body.idToken;
  if (typeof idToken !== 'string') {import { doc, getDoc, getDocs, getFirestore,collection,query } from "firebase/firestore";

    res.status(400).end();
    return;
  }

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: SESSION_EXPIRATION,
  });
  setCookie({ res }, 'session', sessionCookie, SESSION_COOKIE_OPTIONS);

  const { uid } = await auth.verifyIdToken(idToken);

  res.status(200).end();
}
