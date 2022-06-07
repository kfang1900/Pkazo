import { useContext } from 'react';

import AuthContext from './AuthContext';

export default function useAuth() {
  const auth = useContext(AuthContext);
  return auth;
}
