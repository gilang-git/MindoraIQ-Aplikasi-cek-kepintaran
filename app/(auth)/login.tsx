import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Pressable,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';
import { colors } from '../../styles';
import { showMessage } from '../../utils/dialog';
import PrimaryButton from '../../components/PrimaryButton';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();
    const cleanFullName = fullName.trim();

    if (!cleanEmail || !cleanPassword) {
      showMessage('Data Belum Lengkap', 'Mohon isi email dan kata sandi terlebih dahulu.');
      return;
    }

    if (isRegistering && !cleanFullName) {
      showMessage('Nama Belum Diisi', 'Setiap peserta wajib memiliki nama untuk didaftarkan.');
      return;
    }

    setLoading(true);
    try {
      if (isRegistering) {
        const { error } = await supabase.auth.signUp({
          email: cleanEmail,
          password: cleanPassword,
          options: {
            data: {
              full_name: cleanFullName,
            },
          },
        });

        if (error) {
          showMessage('Pendaftaran Gagal', error.message);
        } else {
          showMessage('Pendaftaran Berhasil!', 'Akun Anda telah terdaftar. Silakan masuk untuk melanjutkan.');
          setIsRegistering(false);
          setPassword('');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPassword,
        });

        if (error) {
          showMessage('Masuk Gagal', error.message);
        } else {
          router.replace('/');
        }
      }
    } catch (err: any) {
      showMessage('Terjadi Kesalahan', 'Tidak dapat terhubung ke server. Silakan coba lagi.');
      console.error('Auth Exception:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollArea}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerArea}>
          <View style={styles.logoMark}>
            <Text style={styles.logoMarkText}>M</Text>
          </View>
          <Text style={styles.brandTitle}>MindoraIQ</Text>
          <Text style={styles.headingTitle}>
            {isRegistering ? 'Daftar Akun Baru' : 'Masuk ke Akun Anda'}
          </Text>
          <Text style={styles.subtitle}>
            {isRegistering
              ? 'Buat akun untuk menyimpan riwayat hasil tes Anda secara aman di cloud.'
              : 'Masuk untuk melanjutkan dan mengakses riwayat hasil tes Anda.'}
          </Text>
        </View>

        <View style={styles.formCard}>
          {isRegistering && (
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>NAMA LENGKAP</Text>
              <TextInput
                style={styles.textInput}
                placeholder="cth. Gilang Ramadhan"
                placeholderTextColor={colors.textMuted}
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>EMAIL</Text>
            <TextInput
              style={styles.textInput}
              placeholder="nama@email.com"
              placeholderTextColor={colors.textMuted}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>KATA SANDI</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Minimal 6 karakter"
              placeholderTextColor={colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>

          <PrimaryButton
            title={isRegistering ? 'Daftar Sekarang' : 'Masuk'}
            onPress={handleAuth}
            disabled={loading}
            size="lg"
            style={styles.submitBtn}
          />
          {loading && (
            <ActivityIndicator
              size="small"
              color={colors.primary}
              style={styles.loadingIndicator}
            />
          )}

          <Pressable
            style={styles.switchModeBtn}
            onPress={() => setIsRegistering(!isRegistering)}
            disabled={loading}
          >
            <Text style={styles.switchModeText}>
              {isRegistering ? 'Sudah punya akun? Masuk di sini' : 'Belum punya akun? Daftar di sini'}
            </Text>
          </Pressable>
        </View>

        <View style={styles.footerNote}>
          <Ionicons name="shield-checkmark-outline" size={16} color={colors.textSecondary} />
          <Text style={styles.footerNoteText}>
            Kredensial Anda dienkripsi secara aman menggunakan Supabase Auth & expo-secure-store.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollArea: {
    padding: 18,
    paddingTop: 40,
    flexGrow: 1,
    justifyContent: 'center',
  },
  headerArea: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoMark: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: colors.primaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoMarkText: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textOnPrimary,
  },
  brandTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  headingTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 12,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    gap: 14,
  },
  inputGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
    letterSpacing: 0.5,
  },
  textInput: {
    backgroundColor: colors.surfaceAlt,
    color: colors.textPrimary,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    fontSize: 14,
  },
  submitBtn: {
    marginTop: 4,
  },
  loadingIndicator: {
    marginTop: -4,
  },
  switchModeBtn: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  switchModeText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaryLight,
  },
  footerNote: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-start',
    backgroundColor: colors.surfaceAlt,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 20,
  },
  footerNoteText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
  },
});
