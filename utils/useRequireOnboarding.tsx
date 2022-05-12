import useAuth from './useAuth';
import { useRouter } from 'next/router';

/**
 * Requires the user to be onboarded to view this page. If the user is not onboarded, they will be redirected.
 * @param condition - Optionally, pass a boolean that must be true in order for the user to be redirected.
 */
export default function useRequireOnboarding(condition = true) {
  const router = useRouter();
  const { loading, artistData } = useAuth();
  if (!loading && !artistData && condition) {
    router.push('/onboarding');
    return;
  }
}
