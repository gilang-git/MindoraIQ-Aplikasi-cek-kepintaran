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

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E'];

export default function QuestionCard({
  question,
  selectedOption,
  onSelectOption,
  questionNumber,
}: QuestionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.questionNumBadge}>
          <Text style={styles.questionNumText}>#{questionNumber}</Text>
        </View>
        <Text style={styles.cardHeaderHint}>Pilih 1 jawaban yang paling tepat</Text>
      </View>

      <Text style={styles.questionText}>{question.question}</Text>

      {/* Daftar Pilihan Jawaban */}
      <View style={styles.optionsList}>
        {question.options.map((option, index) => {
          const isSelected = selectedOption === index;

          return (
            <Pressable
              key={`option-${index}`}
              onPress={() => onSelectOption(index)}
              style={({ pressed }) => [
                styles.optionItem,
                isSelected && styles.optionItemSelected,
                pressed && styles.optionItemPressed,
              ]}
            >
              <View
                style={[
                  styles.optionLabelBadge,
                  isSelected && styles.optionLabelBadgeSelected,
                ]}
              >
                <Text
                  style={[
                    styles.optionLabelText,
                    isSelected && styles.optionLabelTextSelected,
                  ]}
                >
                  {OPTION_LABELS[index] || index + 1}
                </Text>
              </View>

              <Text
                style={[
                  styles.optionText,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {option}
              </Text>

              {isSelected && (
                <View style={styles.checkIcon}>
                  <Ionicons name="checkmark-circle" size={22} color={colors.primaryLight} />
                </View>
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
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  questionNumBadge: {
    backgroundColor: colors.primaryDark,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 10,
  },
  questionNumText: {
    color: colors.textWhite,
    fontSize: 12,
    fontWeight: '700',
  },
  cardHeaderHint: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  questionText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.textPrimary,
    lineHeight: 25,
    marginBottom: 20,
  },
  optionsList: {
    gap: 12,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    backgroundColor: colors.cardAlt,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  optionItemSelected: {
    backgroundColor: colors.accentLight,
    borderColor: colors.primaryLight,
  },
  optionItemPressed: {
    opacity: 0.85,
  },
  optionLabelBadge: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionLabelBadgeSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionLabelText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  optionLabelTextSelected: {
    color: colors.textWhite,
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 20,
  },
  optionTextSelected: {
    fontWeight: '600',
    color: colors.primary,
  },
  checkIcon: {
    marginLeft: 8,
  },
});
