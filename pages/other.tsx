import { NextPage } from 'next';
import Link from 'next/link';
import useAuth from 'utils/auth/useAuth';

const Other: NextPage = () => {
  const auth = useAuth();

  return (
    <div>
      {auth.email || <button onClick={auth.signInWithGoogle}>login</button>}
      <br />
      <Link href="/">
        <a>to home page</a>
      </Link>
    </div>
  );
};

export default Other;
