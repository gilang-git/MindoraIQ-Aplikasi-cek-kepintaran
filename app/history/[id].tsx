import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuiz } from '../../context/QuizContext';
import { calculateScore, MINDORAIQ_DISCLAIMER } from '../../utils/scoring';
import PrimaryButton from '../../components/PrimaryButton';
import { colors } from '../../styles';

export default function HistoryDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getResultById } = useQuiz();

  const result = id ? getResultById(id) : undefined;

  if (!result) {
    return (
      <View style={styles.centerContainer}>
        <Ionicons name="document-text-outline" size={44} color={colors.textMuted} />
        <Text style={styles.notFoundTitle}>Detail Tidak Ditemukan</Text>
        <Text style={styles.notFoundDesc}>
          Data pengerjaan dengan ID "{id}" tidak ditemukan dalam sesi saat ini.
        </Text>
        <PrimaryButton
          title="Kembali ke Riwayat"
          onPress={() => router.back()}
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
      <View style={styles.mainCard}>
        <View style={styles.cardTopBar}>
          <Text style={styles.idChipText}>{result.id}</Text>
          <Text style={styles.dateText}>{result.date}</Text>
        </View>

        <Text style={styles.categoryName}>{result.category}</Text>
        <Text style={styles.userParticipant}>
          Peserta: <Text style={styles.userNameHighlight}>{result.userName || 'Gilang'}</Text>
        </Text>

        <View style={styles.scoreRow}>
          <View style={[styles.scorePill, { borderColor: scoreDetails.badgeColor }]}>
            <Text style={[styles.scoreValue, { color: colors.textPrimary }]}>
              {result.percentage}%
            </Text>
            <Text style={styles.scoreUnit}>Akurasi</Text>
          </View>

          <View style={styles.scoreSummaryCol}>
            <Text style={[styles.gradeText, { color: scoreDetails.badgeColor }]}>
              {scoreDetails.gradeLabel}
            </Text>
            <Text style={styles.correctRatio}>
              {result.correctAnswers} benar dari {result.totalQuestions} butir soal
            </Text>
          </View>
        </View>

        <View style={styles.evalBox}>
          <Text style={styles.evalBoxTitle}>Catatan Evaluasi:</Text>
          <Text style={styles.evalBoxContent}>{scoreDetails.evaluationMessage}</Text>
        </View>
      </View>

      <View style={styles.statDetailCard}>
        <Text style={styles.sectionHeader}>Rangkuman Performa</Text>

        <View style={styles.statList}>
          <View style={styles.statRowItem}>
            <Text style={styles.statItemLabel}>Jawaban Benar</Text>
            <Text style={[styles.statItemValue, { color: colors.success }]}>
              {result.correctAnswers} soal
            </Text>
          </View>

          <View style={styles.statRowItem}>
            <Text style={styles.statItemLabel}>Jawaban Salah</Text>
            <Text style={[styles.statItemValue, { color: colors.danger }]}>
              {scoreDetails.incorrectAnswers} soal
            </Text>
          </View>

          <View style={styles.statRowItem}>
            <Text style={styles.statItemLabel}>Total Butir Soal</Text>
            <Text style={styles.statItemValue}>
              {result.totalQuestions} soal
            </Text>
          </View>

          <View style={[styles.statRowItem, { borderBottomWidth: 0 }]}>
            <Text style={styles.statItemLabel}>Metode Hitung</Text>
            <Text style={styles.statItemValue}>
              (Benar / Total) × 100
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.btnGroup}>
        <PrimaryButton
          title="Kerjakan Kuis Lagi"
          icon="refresh"
          onPress={() => router.replace('/category')}
          style={{ marginBottom: 10 }}
        />
        <PrimaryButton
          title="Kembali ke Daftar Riwayat"
          icon="arrow-back"
          variant="outline"
          onPress={() => router.back()}
        />
      </View>

      <View style={styles.disclaimerBox}>
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
    textAlign: 'center',
    marginTop: 4,
    lineHeight: 18,
  },
  mainCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  cardTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  idChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
  },
  dateText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 2,
  },
  userParticipant: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 14,
  },
  userNameHighlight: {
    fontWeight: '600',
    color: colors.textPrimary,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  scorePill: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 3,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 22,
    fontWeight: '700',
  },
  scoreUnit: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  scoreSummaryCol: {
    flex: 1,
    justifyContent: 'center',
    gap: 4,
  },
  gradeText: {
    fontSize: 16,
    fontWeight: '700',
  },
  correctRatio: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  evalBox: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    padding: 12,
  },
  evalBoxTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 3,
  },
  evalBoxContent: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  statDetailCard: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  statList: {
    gap: 2,
  },
  statRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItemLabel: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  statItemValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  btnGroup: {
    marginBottom: 16,
  },
  disclaimerBox: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  disclaimerText: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
    textAlign: 'center',
  },
});
