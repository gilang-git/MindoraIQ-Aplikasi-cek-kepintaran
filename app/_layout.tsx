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
              backgroundColor: colors.dark,
            },
            headerTintColor: colors.textInverse,
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 17,
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
              title: 'MindoraIQ',
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="category"
            options={{
              title: 'Pilihan Kategori',
              headerBackTitle: 'Beranda',
            }}
          />
          <Stack.Screen
            name="quiz"
            options={{
              title: 'Pengerjaan Kuis',
              headerBackTitle: 'Keluar',
              gestureEnabled: false,
            }}
          />
          <Stack.Screen
            name="result"
            options={{
              title: 'Hasil Evaluasi',
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="history"
            options={{
              title: 'Riwayat Kuis',
              headerBackTitle: 'Beranda',
            }}
          />
          <Stack.Screen
            name="history/[id]"
            options={{
              title: 'Rincian Hasil',
              headerBackTitle: 'Riwayat',
            }}
          />
        </Stack>
      </QuizProvider>
    </SafeAreaProvider>
  );
}
