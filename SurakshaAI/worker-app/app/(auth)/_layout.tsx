import { Redirect, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '@/context/AuthContext';

export default function AuthLayout() {
  const { isLoggedIn } = useAuth();

  // If user is already logged in, send them to the main app
  if (isLoggedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="otp" />
        <Stack.Screen name="onboarding/permissions" />
        <Stack.Screen name="onboarding/profile" />
      </Stack>
    </>
  );
}
