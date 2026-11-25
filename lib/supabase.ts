import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

// Adapter penyimpanan kustom: menghubungkan sesi Supabase langsung ke brankas
// perangkat keras (iOS Keychain / Android Keystore) melalui expo-secure-store,
// karena `window.localStorage` tidak tersedia di React Native.
// expo-secure-store tidak didukung di platform web, sehingga Web Mode memakai
// localStorage sebagai gantinya (sama seperti pola pada Codelab 1).
const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    if (Platform.OS === 'web') {
      return Promise.resolve(typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null);
    }
    return SecureStore.getItemAsync(key);
  },
  setItem: (key: string, value: string) => {
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') localStorage.setItem(key, value);
      return Promise.resolve();
    }
    return SecureStore.setItemAsync(key, value);
  },
  removeItem: (key: string) => {
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') localStorage.removeItem(key);
      return Promise.resolve();
    }
    return SecureStore.deleteItemAsync(key);
  },
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Kredensial Supabase tidak ditemukan. Salin .env.example menjadi .env lalu isi ' +
      'EXPO_PUBLIC_SUPABASE_URL dan EXPO_PUBLIC_SUPABASE_ANON_KEY dengan milik Anda sendiri.'
  );
}

// Singleton klien Supabase pusat untuk seluruh aplikasi.
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStoreAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Pemeriksaan kesehatan koneksi cloud: memastikan klien dapat menjangkau
// basis data PostgreSQL Supabase.
export async function testCloudBridge(): Promise<boolean> {
  try {
    const { error } = await supabase.from('quiz_results').select('id').limit(1);
    if (!error) {
      console.log('Cloud Bridge: koneksi ke Supabase berhasil dibentuk!');
    }
    return !error;
  } catch (err) {
    console.error('Cloud Bridge Communication Error:', err);
    return false;
  }
}
