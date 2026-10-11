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
import { calculateScore, IQSMART_DISCLAIMER } from '../../utils/scoring';
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
        <Ionicons name="document-text-outline" size={54} color={colors.textMuted} />
        <Text style={styles.notFoundTitle}>Detail Riwayat Tidak Ditemukan</Text>
        <Text style={styles.notFoundDesc}>
          Data pengerjaan dengan ID "{id}" tidak ditemukan dalam catatan sesi ini.
        </Text>
        <PrimaryButton
          title="Kembali ke Daftar Riwayat"
          onPress={() => router.back()}
          style={{ marginTop: 20 }}
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
      {/* Header Info Card */}
      <View style={styles.mainCard}>
        <View style={styles.cardTopBar}>
          <View style={styles.idChip}>
            <Ionicons name="finger-print" size={14} color={colors.primary} />
            <Text style={styles.idChipText}>{result.id}</Text>
          </View>
          <Text style={styles.dateText}>{result.date}</Text>
        </View>

        <Text style={styles.categoryName}>{result.category}</Text>
        <Text style={styles.userParticipant}>
          Peserta: <Text style={styles.userNameHighlight}>{result.userName || 'Mahasiswa'}</Text>
        </Text>

        <View style={styles.scoreRow}>
          <View style={[styles.scorePill, { borderColor: scoreDetails.badgeColor }]}>
            <Text style={[styles.scoreValue, { color: scoreDetails.badgeColor }]}>
              {result.percentage}%
            </Text>
            <Text style={styles.scoreUnit}>Akurasi</Text>
          </View>

          <View style={styles.scoreSummaryCol}>
            <View
              style={[
                styles.gradeTag,
                { backgroundColor: scoreDetails.badgeColor + '18' },
              ]}
            >
              <Text
                style={[
                  styles.gradeTagText,
                  { color: scoreDetails.badgeColor },
                ]}
              >
                {scoreDetails.gradeLabel}
              </Text>
            </View>
            <Text style={styles.correctRatio}>
              {result.correctAnswers} dari {result.totalQuestions} Soal Benar
            </Text>
          </View>
        </View>

        <View style={styles.evalBox}>
          <Text style={styles.evalBoxTitle}>Evaluasi Kognitif:</Text>
          <Text style={styles.evalBoxContent}>{scoreDetails.evaluationMessage}</Text>
        </View>
      </View>

      {/* Rincian Jawaban */}
      <View style={styles.statDetailCard}>
        <Text style={styles.sectionHeader}>Rangkuman Performa</Text>

        <View style={styles.statList}>
          <View style={styles.statRowItem}>
            <View style={styles.statLabelGroup}>
              <View style={[styles.dot, { backgroundColor: colors.success }]} />
              <Text style={styles.statItemLabel}>Jawaban Benar</Text>
            </View>
            <Text style={[styles.statItemValue, { color: colors.success }]}>
              {result.correctAnswers} soal
            </Text>
          </View>

          <View style={styles.statRowItem}>
            <View style={styles.statLabelGroup}>
              <View style={[styles.dot, { backgroundColor: colors.danger }]} />
              <Text style={styles.statItemLabel}>Jawaban Salah</Text>
            </View>
            <Text style={[styles.statItemValue, { color: colors.danger }]}>
              {scoreDetails.incorrectAnswers} soal
            </Text>
          </View>

          <View style={styles.statRowItem}>
            <View style={styles.statLabelGroup}>
              <View style={[styles.dot, { backgroundColor: colors.primaryLight }]} />
              <Text style={styles.statItemLabel}>Total Jumlah Soal</Text>
            </View>
            <Text style={styles.statItemValue}>
              {result.totalQuestions} butir
            </Text>
          </View>

          <View style={[styles.statRowItem, { borderBottomWidth: 0 }]}>
            <View style={styles.statLabelGroup}>
              <View style={[styles.dot, { backgroundColor: colors.accent }]} />
              <Text style={styles.statItemLabel}>Metode Penilaian</Text>
            </View>
            <Text style={styles.statItemValue}>
              Internal Scoring MVP
            </Text>
          </View>
        </View>
      </View>

      {/* Tombol Aksi */}
      <View style={styles.btnGroup}>
        <PrimaryButton
          title="Tes Kategori Ini Lagi"
          icon="refresh-outline"
          onPress={() => router.replace('/category')}
          style={{ marginBottom: 10 }}
        />
        <PrimaryButton
          title="Kembali ke Riwayat"
          icon="arrow-back"
          variant="outline"
          onPress={() => router.back()}
        />
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimerBox}>
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
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  mainCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  idChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.tintBlue,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    gap: 4,
  },
  idChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  userParticipant: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 16,
  },
  userNameHighlight: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  scorePill: {
    width: 90,
    height: 90,
    borderRadius: 16,
    borderWidth: 3,
    backgroundColor: colors.cardAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreValue: {
    fontSize: 26,
    fontWeight: '800',
  },
  scoreUnit: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  scoreSummaryCol: {
    flex: 1,
    justifyContent: 'center',
    gap: 6,
  },
  gradeTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  gradeTagText: {
    fontSize: 13,
    fontWeight: '700',
  },
  correctRatio: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  evalBox: {
    backgroundColor: colors.cardAlt,
    borderRadius: 12,
    padding: 14,
  },
  evalBoxTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  evalBoxContent: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  statDetailCard: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 14,
  },
  statList: {
    gap: 4,
  },
  statRowItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statItemLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  statItemValue: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  btnGroup: {
    marginBottom: 20,
  },
  disclaimerBox: {
    backgroundColor: colors.cardAlt,
    borderRadius: 12,
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
