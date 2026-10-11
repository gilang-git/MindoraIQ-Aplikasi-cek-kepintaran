import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuiz } from '../context/QuizContext';
import { calculateScore, IQSMART_DISCLAIMER } from '../utils/scoring';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../styles';

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const { getResultById, history } = useQuiz();

  // Ambil data hasil tes berdasarkan ID dari param atau hasil paling akhir
  const result = useMemo(() => {
    if (params.id) {
      const found = getResultById(params.id);
      if (found) return found;
    }
    return history.length > 0 ? history[0] : null;
  }, [params.id, history, getResultById]);

  if (!result) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="alert-circle-outline" size={48} color={colors.textMuted} />
        <Text style={styles.notFoundTitle}>Hasil Tidak Ditemukan</Text>
        <Text style={styles.notFoundDesc}>Belum ada data pengerjaan tes yang tercatat.</Text>
        <PrimaryButton
          title="Kembali ke Beranda"
          onPress={() => router.replace('/')}
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }

  const scoreDetails = calculateScore(result.correctAnswers, result.totalQuestions);

  const handleRetake = () => {
    // Arahkan ke pemilihan kategori
    router.replace('/category');
  };

  const handleGoHome = () => {
    router.replace('/');
  };

  const handleGoHistory = () => {
    router.push('/history');
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* KARTU SKOR UTAMA */}
      <View style={styles.scoreHeroCard}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{result.category}</Text>
        </View>

        <View style={styles.circleScoreWrapper}>
          <View style={[styles.circleScore, { borderColor: scoreDetails.badgeColor }]}>
            <Text style={styles.percentageText}>{result.percentage}%</Text>
            <Text style={styles.percentageSub}>Akurasi</Text>
          </View>
        </View>

        <View style={[styles.gradeBadge, { backgroundColor: scoreDetails.badgeColor + '20' }]}>
          <Text style={[styles.gradeText, { color: scoreDetails.badgeColor }]}>
            {scoreDetails.gradeLabel}
          </Text>
        </View>

        <Text style={styles.evalMessage}>{scoreDetails.evaluationMessage}</Text>
      </View>

      {/* RINCIAN STATISTIK JAWABAN */}
      <View style={styles.breakdownCard}>
        <Text style={styles.breakdownTitle}>Rincian Pengerjaan</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCol}>
            <View style={[styles.statIcon, { backgroundColor: colors.successLight }]}>
              <Ionicons name="checkmark-circle" size={24} color={colors.success} />
            </View>
            <Text style={styles.statValue}>{result.correctAnswers}</Text>
            <Text style={styles.statLabel}>Benar</Text>
          </View>

          <View style={styles.statCol}>
            <View style={[styles.statIcon, { backgroundColor: colors.dangerLight }]}>
              <Ionicons name="close-circle" size={24} color={colors.danger} />
            </View>
            <Text style={styles.statValue}>{scoreDetails.incorrectAnswers}</Text>
            <Text style={styles.statLabel}>Salah</Text>
          </View>

          <View style={styles.statCol}>
            <View style={[styles.statIcon, { backgroundColor: colors.tintBlue }]}>
              <Ionicons name="help-circle" size={24} color={colors.primaryLight} />
            </View>
            <Text style={styles.statValue}>{result.totalQuestions}</Text>
            <Text style={styles.statLabel}>Total Soal</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <View style={styles.metaItem}>
            <Ionicons name="calendar-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.metaText}>{result.date}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons name="finger-print-outline" size={16} color={colors.textSecondary} />
            <Text style={styles.metaText}>{result.id}</Text>
          </View>
        </View>
      </View>

      {/* ACTION BUTTONS (PRD 7.5) */}
      <View style={styles.actionsContainer}>
        <PrimaryButton
          title="Ulangi Tes"
          icon="refresh"
          variant="primary"
          onPress={handleRetake}
          style={styles.actionBtn}
        />

        <PrimaryButton
          title="Lihat Riwayat Tes"
          icon="receipt-outline"
          variant="secondary"
          onPress={handleGoHistory}
          style={styles.actionBtn}
        />

        <PrimaryButton
          title="Kembali ke Beranda"
          icon="home-outline"
          variant="outline"
          onPress={handleGoHome}
          style={styles.actionBtn}
        />
      </View>

      {/* DISCLAIMER BOX */}
      <View style={styles.disclaimerBox}>
        <Ionicons name="information-circle-outline" size={18} color={colors.textMuted} />
        <Text style={styles.disclaimerText}>{IQSMART_DISCLAIMER}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: colors.background,
  },
  notFoundTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 12,
  },
  notFoundDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 6,
    textAlign: 'center',
  },
  scoreHeroCard: {
    backgroundColor: colors.card,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    marginBottom: 16,
  },
  categoryBadge: {
    backgroundColor: colors.tintBlue,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 16,
  },
  categoryBadgeText: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  circleScoreWrapper: {
    marginBottom: 14,
  },
  circleScore: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.cardAlt,
  },
  percentageText: {
    fontSize: 34,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  percentageSub: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  gradeBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 12,
    marginBottom: 12,
  },
  gradeText: {
    fontSize: 15,
    fontWeight: '700',
  },
  evalMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  breakdownCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  breakdownTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statCol: {
    alignItems: 'center',
  },
  statIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  actionsContainer: {
    gap: 12,
    marginBottom: 20,
  },
  actionBtn: {
    height: 50,
  },
  disclaimerBox: {
    flexDirection: 'row',
    backgroundColor: colors.cardAlt,
    borderRadius: 12,
    padding: 12,
    gap: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
});
