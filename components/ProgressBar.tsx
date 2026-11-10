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
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primaryLight,
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
    height: 7,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  fill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
});
