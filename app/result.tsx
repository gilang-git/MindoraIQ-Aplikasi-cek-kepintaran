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
import { calculateScore, MINDORAIQ_DISCLAIMER } from '../utils/scoring';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../styles';

export default function ResultScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const { getResultById, history } = useQuiz();

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
        <Ionicons name="document-text-outline" size={44} color={colors.textMuted} />
        <Text style={styles.notFoundTitle}>Hasil Tidak Ditemukan</Text>
        <Text style={styles.notFoundDesc}>Belum ada data pengerjaan tes yang terekam pada sesi ini.</Text>
        <PrimaryButton
          title="Kembali ke Beranda"
          onPress={() => router.replace('/')}
          style={{ marginTop: 16 }}
        />
      </View>
    );
  }

  const scoreDetails = calculateScore(result.correctAnswers, result.totalQuestions);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.scoreCard}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{result.category}</Text>
        </View>

        <View style={styles.scoreRow}>
          <View style={[styles.percentageCircle, { borderColor: scoreDetails.badgeColor }]}>
            <Text style={[styles.percentageNumber, { color: colors.textPrimary }]}>
              {result.percentage}%
            </Text>
            <Text style={styles.percentageSub}>Skor Akurasi</Text>
          </View>
        </View>

        <View style={[styles.gradeTag, { backgroundColor: scoreDetails.badgeColor + '15' }]}>
          <Text style={[styles.gradeTagText, { color: scoreDetails.badgeColor }]}>
            Predikat: {scoreDetails.gradeLabel}
          </Text>
        </View>

        <Text style={styles.evaluationParagraph}>{scoreDetails.evaluationMessage}</Text>
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.detailTitle}>Rincian Jawaban</Text>

        <View style={styles.summaryGrid}>
          <View style={styles.summaryCol}>
            <Text style={[styles.summaryNum, { color: colors.success }]}>
              {result.correctAnswers}
            </Text>
            <Text style={styles.summaryLabel}>Benar</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryCol}>
            <Text style={[styles.summaryNum, { color: colors.danger }]}>
              {scoreDetails.incorrectAnswers}
            </Text>
            <Text style={styles.summaryLabel}>Salah</Text>
          </View>

          <View style={styles.summaryDivider} />

          <View style={styles.summaryCol}>
            <Text style={styles.summaryNum}>{result.totalQuestions}</Text>
            <Text style={styles.summaryLabel}>Total Soal</Text>
          </View>
        </View>

        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>ID Sesi: {result.id}</Text>
          <Text style={styles.metaDate}>{result.date}</Text>
        </View>
      </View>

      <View style={styles.actionGroup}>
        <PrimaryButton
          title="Ulangi Tes Kategori Ini"
          icon="refresh"
          onPress={() => router.replace('/category')}
        />
        <PrimaryButton
          title="Lihat Daftar Riwayat"
          icon="time-outline"
          variant="outline"
          onPress={() => router.push('/history')}
        />
        <PrimaryButton
          title="Kembali ke Beranda"
          variant="outline"
          onPress={() => router.replace('/')}
        />
      </View>

      <View style={styles.disclaimerBox}>
        <Ionicons name="information-circle-outline" size={16} color={colors.textSecondary} />
        <Text style={styles.disclaimerText}>{MINDORAIQ_DISCLAIMER}</Text>
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
    padding: 18,
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
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    marginTop: 10,
  },
  notFoundDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  scoreCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    marginBottom: 14,
  },
  categoryBadge: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  scoreRow: {
    marginBottom: 14,
  },
  percentageCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageNumber: {
    fontSize: 32,
    fontWeight: '800',
  },
  percentageSub: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    marginTop: 2,
  },
  gradeTag: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 6,
    marginBottom: 12,
  },
  gradeTagText: {
    fontSize: 13,
    fontWeight: '700',
  },
  evaluationParagraph: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  detailCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  detailTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 14,
  },
  summaryGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 10,
    paddingVertical: 12,
    marginBottom: 12,
  },
  summaryCol: {
    flex: 1,
    alignItems: 'center',
  },
  summaryNum: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  summaryDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  metaLabel: {
    fontSize: 11,
    color: colors.textMuted,
  },
  metaDate: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  actionGroup: {
    gap: 10,
    marginBottom: 16,
  },
  disclaimerBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.surfaceAlt,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disclaimerText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: colors.textSecondary,
  },
});
