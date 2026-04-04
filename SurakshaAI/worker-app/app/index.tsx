import { Redirect } from 'expo-router';
import { useAuth } from '@/context/AuthContext';

/**
 * This is the app entry point. It immediately redirects to either
 * the auth flow or the main tabs based on current login state.
 * Using <Redirect> (not router.replace) is safe here because this
 * screen is mounted INSIDE the Stack, guaranteeing the navigator is ready.
 */
export default function Index() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return <Redirect href="/(auth)/splash" />;
}
