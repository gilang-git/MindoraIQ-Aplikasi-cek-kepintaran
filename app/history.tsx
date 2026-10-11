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
      'Apakah Anda yakin ingin menghapus seluruh riwayat pengerjaan tes?',
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus Semua',
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
          <View style={styles.idBadge}>
            <Text style={styles.idText}>{item.id}</Text>
          </View>
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
          </View>
        </View>

        <View style={styles.cardFooter}>
          <Text style={styles.footerHint}>Ketuk untuk melihat detail hasil</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.primaryLight} />
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
                  Total {history.length} tes telah diselesaikan pada sesi ini
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
            <Ionicons name="document-text-outline" size={48} color={colors.textMuted} />
          </View>
          <Text style={styles.emptyTitle}>Belum Ada Riwayat Tes</Text>
          <Text style={styles.emptyDesc}>
            Hasil kuis yang telah Anda kerjakan akan otomatis tercatat dan dapat dilihat kembali di sini.
          </Text>
          <PrimaryButton
            title="Mulai Tes Pertama Anda"
            icon="play-circle-outline"
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
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  clearBtn: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.dangerLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardItem: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  idBadge: {
    backgroundColor: colors.cardAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  idText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textSecondary,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 12,
  },
  metricsRow: {
    flexDirection: 'row',
    backgroundColor: colors.cardAlt,
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginBottom: 4,
    fontWeight: '500',
  },
  percentageValue: {
    fontSize: 18,
    fontWeight: '800',
  },
  metricValue: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  metricDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  gradeTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  gradeTagText: {
    fontSize: 11,
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
    color: colors.primaryLight,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.cardAlt,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  emptyDesc: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  emptyStartBtn: {
    width: '100%',
  },
});
