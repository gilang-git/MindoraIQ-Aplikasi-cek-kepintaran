import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QuizProvider } from '../context/QuizContext';
import { colors } from '../styles';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <QuizProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.primaryDark,
            },
            headerTintColor: colors.textWhite,
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 18,
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: 'IQSmart',
              headerShown: false, // Custom header on homepage
            }}
          />
          <Stack.Screen
            name="category"
            options={{
              title: 'Pilih Kategori',
              headerBackTitle: 'Kembali',
            }}
          />
          <Stack.Screen
            name="quiz"
            options={{
              title: 'Pengerjaan Kuis',
              headerBackTitle: 'Keluar',
              gestureEnabled: false, // Cegah swipe-back tidak sengaja saat kuis
            }}
          />
          <Stack.Screen
            name="result"
            options={{
              title: 'Hasil Tes Kognitif',
              headerBackVisible: false, // Tidak bisa back langsung tanpa aksi tombol
            }}
          />
          <Stack.Screen
            name="history"
            options={{
              title: 'Riwayat Tes',
              headerBackTitle: 'Beranda',
            }}
          />
          <Stack.Screen
            name="history/[id]"
            options={{
              title: 'Detail Hasil',
              headerBackTitle: 'Riwayat',
            }}
          />
        </Stack>
      </QuizProvider>
    </SafeAreaProvider>
  );
}
