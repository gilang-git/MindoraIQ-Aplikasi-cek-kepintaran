import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Question } from '../types/quiz';
import { colors } from '../styles';
import { Ionicons } from '@expo/vector-icons';

interface QuestionCardProps {
  question: Question;
  selectedOption: number | null;
  onSelectOption: (index: number) => void;
  questionNumber: number;
}

const OPTION_KEYS = ['A', 'B', 'C', 'D', 'E'];

export default function QuestionCard({
  question,
  selectedOption,
  onSelectOption,
  questionNumber,
}: QuestionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.topMeta}>
        <View style={styles.numBadge}>
          <Text style={styles.numText}>Soal {questionNumber}</Text>
        </View>
        <Text style={styles.instruction}>Pilih satu jawaban yang tepat</Text>
      </View>

      <Text style={styles.questionText}>{question.question}</Text>

      <View style={styles.optionsContainer}>
        {question.options.map((opt, idx) => {
          const isSelected = selectedOption === idx;

          return (
            <Pressable
              key={`opt-${idx}`}
              onPress={() => onSelectOption(idx)}
              style={({ pressed }) => [
                styles.optionRow,
                isSelected ? styles.optionRowActive : styles.optionRowDefault,
                pressed && !isSelected && styles.optionRowPressed,
              ]}
            >
              <View
                style={[
                  styles.keyBox,
                  isSelected ? styles.keyBoxActive : styles.keyBoxDefault,
                ]}
              >
                <Text
                  style={[
                    styles.keyText,
                    isSelected ? styles.keyTextActive : styles.keyTextDefault,
                  ]}
                >
                  {OPTION_KEYS[idx] || idx + 1}
                </Text>
              </View>

              <Text
                style={[
                  styles.optionLabel,
                  isSelected && styles.optionLabelActive,
                ]}
              >
                {opt}
              </Text>

              {isSelected && (
                <Ionicons
                  name="checkmark-circle"
                  size={20}
                  color={colors.primaryLight}
                  style={styles.checkIcon}
                />
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    padding: 18,
  },
  topMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  numBadge: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  numText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  instruction: {
    fontSize: 12,
    color: colors.textMuted,
  },
  questionText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 18,
  },
  optionsContainer: {
    gap: 8,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
  },
  optionRowDefault: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  optionRowActive: {
    backgroundColor: colors.primarySoft,
    borderWidth: 1.5,
    borderColor: colors.primaryLight,
  },
  optionRowPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  keyBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  keyBoxDefault: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  keyBoxActive: {
    backgroundColor: colors.primary,
  },
  keyText: {
    fontSize: 13,
  },
  keyTextDefault: {
    fontWeight: '700',
    color: colors.textSecondary,
  },
  keyTextActive: {
    fontWeight: '700',
    color: colors.textOnPrimary,
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
  },
  optionLabelActive: {
    color: colors.textPrimary,
    fontWeight: '600',
  },
  checkIcon: {
    marginLeft: 8,
  },
});
