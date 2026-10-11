import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { QUESTIONS_DATA, CATEGORIES } from '../data/questions';
import { Question, QuizResult } from '../types/quiz';
import { useQuiz } from '../context/QuizContext';
import {
  calculateScore,
  formatQuizDate,
  generateResultId,
} from '../utils/scoring';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import PrimaryButton from '../components/PrimaryButton';
import { colors } from '../styles';

export default function QuizScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category?: string }>();
  const { addResult, userName } = useQuiz();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [validationWarning, setValidationWarning] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    let filtered: Question[] = [];
    const targetCategory = params.category;

    if (!targetCategory || targetCategory === 'all') {
      filtered = QUESTIONS_DATA;
    } else {
      filtered = QUESTIONS_DATA.filter((q) => q.category === targetCategory);
    }

    if (filtered.length === 0) {
      filtered = QUESTIONS_DATA;
    }

    setQuestions(filtered);
    setCurrentIndex(0);
    setUserAnswers(new Array(filtered.length).fill(null));
    setValidationWarning(null);
  }, [params.category]);

  if (questions.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Memuat butir soal...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedOption = userAnswers[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  const categoryInfo = CATEGORIES.find((c) => c.id === currentQuestion.category);
  const currentCategoryLabel =
    params.category === 'all'
      ? `Campuran: ${categoryInfo?.name || 'Kognitif'}`
      : categoryInfo?.name || 'Tes Kognitif';

  const handleSelectOption = (index: number) => {
    const updated = [...userAnswers];
    updated[currentIndex] = index;
    setUserAnswers(updated);
    if (validationWarning) {
      setValidationWarning(null);
    }
  };

  const handleNext = () => {
    if (selectedOption === null || selectedOption === undefined) {
      setValidationWarning('Pilih salah satu jawaban terlebih dahulu sebelum lanjut.');
      return;
    }

    setValidationWarning(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    setValidationWarning(null);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleFinishQuiz = async () => {
    if (selectedOption === null || selectedOption === undefined) {
      setValidationWarning('Pilih salah satu jawaban terlebih dahulu sebelum menyelesaikan tes.');
      return;
    }

    setIsSubmitting(true);
    setValidationWarning(null);

    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        correctCount += 1;
      }
    });

    const scoreDetails = calculateScore(correctCount, questions.length);
    const newResultId = generateResultId();

    const categoryTitle =
      params.category === 'all'
        ? 'Simulasi Lengkap (Semua Materi)'
        : categoryInfo?.name || 'Tes Kognitif';

    const resultData: QuizResult = {
      id: newResultId,
      category: categoryTitle,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      percentage: scoreDetails.percentage,
      date: formatQuizDate(),
      userName: userName || 'Gilang',
      evaluation: scoreDetails.evaluationMessage,
    };

    await addResult(resultData);

    router.replace({
      pathname: '/result',
      params: { id: newResultId },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <ProgressBar
        current={currentIndex + 1}
        total={questions.length}
        categoryName={currentCategoryLabel}
      />

      {validationWarning ? (
        <View style={styles.warningBox}>
          <Ionicons name="alert-circle-outline" size={18} color={colors.danger} />
          <Text style={styles.warningText}>{validationWarning}</Text>
        </View>
      ) : null}

      <QuestionCard
        question={currentQuestion}
        selectedOption={selectedOption}
        onSelectOption={handleSelectOption}
        questionNumber={currentIndex + 1}
      />

      <View style={styles.bottomNav}>
        {currentIndex > 0 ? (
          <PrimaryButton
            title="Sebelumnya"
            variant="outline"
            icon="arrow-back"
            onPress={handlePrevious}
            style={styles.prevBtn}
          />
        ) : <View style={{ flex: 1 }} />}

        {isLastQuestion ? (
          <PrimaryButton
            title="Selesaikan Tes"
            icon="checkmark-done"
            variant="secondary"
            onPress={handleFinishQuiz}
            disabled={isSubmitting}
            style={styles.nextBtn}
          />
        ) : (
          <PrimaryButton
            title="Soal Berikutnya"
            icon="arrow-forward"
            onPress={handleNext}
            style={styles.nextBtn}
          />
        )}
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
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.dangerSoft,
    borderColor: '#FECACA',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  warningText: {
    flex: 1,
    color: colors.danger,
    fontSize: 13,
    fontWeight: '500',
  },
  bottomNav: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 18,
  },
  prevBtn: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  nextBtn: {
    flex: 2,
  },
});
