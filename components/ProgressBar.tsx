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
        <View style={styles.tag}>
          <Text style={styles.tagText}>{categoryName || 'Kuis Penalaran'}</Text>
        </View>
        <Text style={styles.stepText}>
          {current} <Text style={styles.stepMuted}>/ {safeTotal}</Text>
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
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  stepText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  stepMuted: {
    fontWeight: '400',
    color: colors.textMuted,
  },
  track: {
    height: 6,
    backgroundColor: colors.border,
    borderRadius: 3,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 3,
  },
});
