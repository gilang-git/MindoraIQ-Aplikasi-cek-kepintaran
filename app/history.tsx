import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useQuiz } from '../context/QuizContext';
import { QuizResult } from '../types/quiz';
import { calculateScore } from '../utils/scoring';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../styles';

export default function HistoryScreen() {
  const router = useRouter();
  const { history, clearHistory } = useQuiz();

  const handleOpenDetail = (id: string) => {
    router.push({
      pathname: '/history/[id]',
      params: { id },
    });
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Hapus Riwayat',
      'Hapus semua catatan pengerjaan kuis pada sesi ini?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => clearHistory(),
        },
      ]
    );
  };

  const renderHistoryItem = ({ item }: { item: QuizResult }) => {
    const scoreDetails = calculateScore(item.correctAnswers, item.totalQuestions);

    return (
      <Pressable
        style={styles.cardItem}
        onPress={() => handleOpenDetail(item.id)}
      >
        <View style={styles.cardHeaderRow}>
          <Text style={styles.idText}>{item.id}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>

        <Text style={styles.categoryTitle}>{item.category}</Text>

        <View style={styles.metricsRow}>
          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Akurasi</Text>
            <Text style={[styles.percentageValue, { color: scoreDetails.badgeColor }]}>
              {item.percentage}%
            </Text>
          </View>

          <View style={styles.metricDivider} />

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Benar / Total</Text>
            <Text style={styles.metricValue}>
              {item.correctAnswers} / {item.totalQuestions}
            </Text>
          </View>

          <View style={styles.metricDivider} />

          <View style={styles.metricItem}>
            <Text style={styles.metricLabel}>Predikat</Text>
            <Text style={[styles.gradeLabel, { color: scoreDetails.badgeColor }]}>
              {scoreDetails.gradeLabel}
            </Text>
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.footerHint}>Lihat detail jawaban</Text>
          <Ionicons name="chevron-forward" size={15} color={colors.primary} />
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {history.length > 0 ? (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id}
          renderItem={renderHistoryItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.headerRow}>
              <View>
                <Text style={styles.title}>Riwayat Pengerjaan</Text>
                <Text style={styles.subtitle}>
                  Tersimpan {history.length} sesi tes
                </Text>
              </View>
              <Pressable style={styles.clearBtn} onPress={handleClearHistory}>
                <Ionicons name="trash-outline" size={18} color={colors.danger} />
              </Pressable>
            </View>
          }
        />
      ) : (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="newspaper-outline" size={36} color={colors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>Belum Ada Riwayat</Text>
          <Text style={styles.emptyDesc}>
            Hasil pengerjaan kuis Anda akan otomatis dicatat di sini.
          </Text>
          <PrimaryButton
            title="Mulai Kuis Pertama"
            icon="play"
            onPress={() => router.push('/category')}
            style={styles.emptyStartBtn}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    padding: 18,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  clearBtn: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.dangerSoft,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardItem: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  idText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
  },
  dateText: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  categoryTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 10,
  },
  metricsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 10,
    color: colors.textMuted,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  percentageValue: {
    fontSize: 16,
    fontWeight: '700',
  },
  metricValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  metricDivider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
  },
  gradeLabel: {
    fontSize: 12,
    fontWeight: '700',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerHint: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 12,
    backgroundColor: colors.surfaceAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  emptyDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 18,
  },
  emptyStartBtn: {
    width: '100%',
  },
});
