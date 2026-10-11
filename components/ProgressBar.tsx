import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles';

interface ProgressBarProps {
  current: number;
  total: number;
  categoryName?: string;
}

export default function ProgressBar({
  current,
  total,
  categoryName,
}: ProgressBarProps) {
  const safeTotal = total > 0 ? total : 1;
  const progressPercent = Math.min(100, Math.max(0, (current / safeTotal) * 100));

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>
            {categoryName || 'Kuis Kognitif'}
          </Text>
        </View>
        <Text style={styles.counterText}>
          Soal <Text style={styles.counterHighlight}>{current}</Text> dari {safeTotal}
        </Text>
      </View>

      <View style={styles.track}>
        <View
          style={[
            styles.fill,
            {
              width: `${progressPercent}%`,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: colors.tintBlue,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
  },
  counterText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  counterHighlight: {
    fontWeight: '700',
    color: colors.primary,
  },
  track: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 999,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primaryLight,
    borderRadius: 999,
  },
});
