import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import { useQuiz } from '../context/QuizContext';
import { CATEGORIES } from '../data/questions';
import { colors, globalStyles } from '../styles';
import { IQSMART_DISCLAIMER } from '../utils/scoring';

export default function HomeScreen() {
  const router = useRouter();
  const { userName, setUserName, history } = useQuiz();

  // useState untuk input nama pengguna lokal sesuai modul
  const [tempName, setTempName] = useState<string>(userName || 'Mahasiswa');
  const [isEditingName, setIsEditingName] = useState<boolean>(false);

  const totalQuestions = CATEGORIES.reduce((acc, cat) => acc + cat.questionCount, 0);

  const handleSaveName = () => {
    if (tempName.trim().length > 0) {
      setUserName(tempName.trim());
    } else {
      setTempName(userName || 'Mahasiswa');
    }
    setIsEditingName(false);
  };

  const handleStartTest = () => {
    router.push('/category');
  };

  const handleViewHistory = () => {
    router.push('/history');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO SECTION */}
        <View style={styles.heroCard}>
          <View style={styles.logoRow}>
            <View style={styles.logoBadge}>
              <Ionicons name="sparkles" size={26} color="#FBBF24" />
            </View>
            <View>
              <Text style={styles.appTitle}>IQSmart</Text>
              <Text style={styles.appSubtitle}>Kuis Kemampuan Kognitif</Text>
            </View>
          </View>

          <Text style={styles.heroDesc}>
            Uji penalaran logika, pola angka, analogi verbal, dan spasial gambar dalam tes interaktif mandiri.
          </Text>

          {/* User Profile Card with TextInput (Sesuai Modul) */}
          <View style={styles.userCard}>
            <View style={styles.userHeader}>
              <Ionicons name="person-circle-outline" size={22} color={colors.primaryLight} />
              <Text style={styles.userLabel}>Peserta Tes:</Text>
            </View>

            {isEditingName ? (
              <View style={styles.inputRow}>
                <TextInput
                  style={styles.textInput}
                  value={tempName}
                  onChangeText={setTempName}
                  placeholder="Ketik nama Anda..."
                  placeholderTextColor={colors.textMuted}
                  maxLength={25}
                  autoFocus
                />
                <Pressable style={styles.saveNameBtn} onPress={handleSaveName}>
                  <Text style={styles.saveNameText}>Simpan</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                style={styles.nameDisplayRow}
                onPress={() => setIsEditingName(true)}
              >
                <Text style={styles.userNameText}>{userName || 'Mahasiswa'}</Text>
                <Ionicons name="pencil-outline" size={16} color={colors.primaryLight} />
              </Pressable>
            )}
          </View>
        </View>

        {/* QUICK STATS ROW */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Ionicons name="grid-outline" size={20} color={colors.primaryLight} />
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Kategori</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="document-text-outline" size={20} color={colors.accent} />
            <Text style={styles.statNumber}>{totalQuestions}</Text>
            <Text style={styles.statLabel}>Total Soal</Text>
          </View>
          <View style={styles.statBox}>
            <Ionicons name="time-outline" size={20} color={colors.success} />
            <Text style={styles.statNumber}>{history.length}</Text>
            <Text style={styles.statLabel}>Tes Selesai</Text>
          </View>
        </View>

        {/* ACTION BUTTONS (PRD 7.1) */}
        <View style={styles.actionGroup}>
          <PrimaryButton
            title="Mulai Tes Sekarang"
            icon="play-circle-outline"
            onPress={handleStartTest}
            style={styles.mainBtn}
          />

          <PrimaryButton
            title={`Riwayat Hasil (${history.length})`}
            icon="receipt-outline"
            variant="outline"
            onPress={handleViewHistory}
            style={styles.historyBtn}
          />
        </View>

        {/* KATEGORI SOAL OVERVIEW */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cakupan Bidang Tes</Text>
            <Text style={styles.sectionBadge}>4 Bidang</Text>
          </View>

          <View style={styles.categoriesGrid}>
            {CATEGORIES.map((item) => (
              <Pressable
                key={item.id}
                style={styles.catCard}
                onPress={() => router.push({ pathname: '/quiz', params: { category: item.id } })}
              >
                <View style={[styles.catIconCircle, { backgroundColor: item.accentColor + '15' }]}>
                  <Ionicons name={item.icon as any} size={22} color={item.accentColor} />
                </View>
                <Text style={styles.catName}>{item.name}</Text>
                <Text style={styles.catCount}>{item.questionCount} Soal</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* DISCLAIMER BOX (PRD 1 & 7.4 & 11.8) */}
        <View style={styles.disclaimerBox}>
          <View style={styles.disclaimerHeader}>
            <Ionicons name="information-circle-outline" size={18} color={colors.textSecondary} />
            <Text style={styles.disclaimerTitle}>Catatan Ilmiah</Text>
          </View>
          <Text style={styles.disclaimerText}>{IQSMART_DISCLAIMER}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.primaryDark,
  },
  scrollContent: {
    padding: 20,
    backgroundColor: colors.background,
    minHeight: '100%',
  },
  heroCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: 24,
    padding: 22,
    marginTop: -8,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoBadge: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  appTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.textWhite,
    letterSpacing: 0.5,
  },
  appSubtitle: {
    fontSize: 13,
    color: '#93C5FD',
    fontWeight: '500',
  },
  heroDesc: {
    fontSize: 14,
    color: '#CBD5E1',
    lineHeight: 20,
    marginBottom: 16,
  },
  userCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 6,
  },
  userLabel: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '500',
  },
  nameDisplayRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  userNameText: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textWhite,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  textInput: {
    flex: 1,
    height: 38,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 8,
    paddingHorizontal: 12,
    color: colors.textWhite,
    fontSize: 14,
    fontWeight: '600',
  },
  saveNameBtn: {
    backgroundColor: colors.primaryLight,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveNameText: {
    color: colors.textWhite,
    fontSize: 13,
    fontWeight: '700',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 10,
  },
  statBox: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  actionGroup: {
    gap: 12,
    marginBottom: 24,
  },
  mainBtn: {
    backgroundColor: colors.primary,
  },
  historyBtn: {
    borderColor: colors.primary,
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaryLight,
    backgroundColor: colors.tintBlue,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  catCard: {
    width: '48%',
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  catIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  catName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  catCount: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  disclaimerBox: {
    backgroundColor: colors.cardAlt,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  disclaimerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  disclaimerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textSecondary,
    textTransform: 'uppercase',
  },
  disclaimerText: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});
