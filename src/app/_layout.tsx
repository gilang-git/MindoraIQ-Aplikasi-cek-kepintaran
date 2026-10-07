// MINDORA — Root Layout
// ThemeProvider membagikan tema terang/gelap ke semua screen.
import { StatusBar } from 'expo-status-bar';
import { Stack } from 'expo-router';
import { ThemeProvider, useTheme } from '@/theme/ThemeContext';

// StatusBar mengikuti tema: teks terang di dark mode, gelap di light mode
function ThemedStack() {
  const { dark } = useTheme();
  return (
    <>
      <StatusBar style={dark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="iq-test" />
        <Stack.Screen name="dashboard" />
      </Stack>
    </>
  );
}

// NATIVE & WEB: fullscreen penuh — tanpa bingkai HP.
// Responsivitas diatur di tiap screen (grid 1/2 kolom via useBreakpoint).
export default function RootLayout() {
  return (
    <ThemeProvider>
      <ThemedStack />
    </ThemeProvider>
  );
}
