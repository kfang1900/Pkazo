import { createContext } from 'react';

export type Auth = { signIn?: () => void; email?: string };

const AuthContext = createContext<Auth>({});

export default AuthContext;
