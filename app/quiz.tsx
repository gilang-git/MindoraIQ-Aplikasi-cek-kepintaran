import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
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

  // State kuis sesuai materi Modul 2
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [validationWarning, setValidationWarning] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Inisialisasi daftar soal berdasarkan kategori dengan useEffect
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
    // Inisialisasi array jawaban kosong (null) untuk setiap soal
    setUserAnswers(new Array(filtered.length).fill(null));
    setValidationWarning(null);
  }, [params.category]);

  if (questions.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Menyiapkan paket soal...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentIndex];
  const selectedOption = userAnswers[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  // Nama kategori saat ini untuk tampilan badge
  const categoryInfo = CATEGORIES.find((c) => c.id === currentQuestion.category);
  const currentCategoryLabel =
    params.category === 'all'
      ? `Campuran (${categoryInfo?.name || 'Kognitif'})`
      : categoryInfo?.name || 'Logika & Kognitif';

  // Handler memilih jawaban untuk soal saat ini (Aturan bisnis 2 & 3)
  const handleSelectOption = (index: number) => {
    const updated = [...userAnswers];
    updated[currentIndex] = index;
    setUserAnswers(updated);
    // Bersihkan peringatan validasi jika ada
    if (validationWarning) {
      setValidationWarning(null);
    }
  };

  // Handler lanjut ke soal berikutnya (Aturan bisnis 7: validasi jawaban)
  const handleNext = () => {
    if (selectedOption === null || selectedOption === undefined) {
      setValidationWarning('Harap pilih salah satu jawaban sebelum melanjutkan!');
      return;
    }

    setValidationWarning(null);
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // Handler kembali ke soal sebelumnya (jawaban tersimpan)
  const handlePrevious = () => {
    setValidationWarning(null);
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Handler menyelesaikan tes (PRD 7.3 & 7.4 & 11)
  const handleFinishQuiz = async () => {
    if (selectedOption === null || selectedOption === undefined) {
      setValidationWarning('Harap pilih salah satu jawaban sebelum menyelesaikan tes!');
      return;
    }

    setIsSubmitting(true);
    setValidationWarning(null);

    // Hitung skor berdasarkan jawaban benar
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
        ? 'Simulasi Lengkap (Semua Kategori)'
        : categoryInfo?.name || 'Tes Kognitif';

    const resultData: QuizResult = {
      id: newResultId,
      category: categoryTitle,
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      percentage: scoreDetails.percentage,
      date: formatQuizDate(),
      userName: userName || 'Mahasiswa',
      evaluation: scoreDetails.evaluationMessage,
    };

    // Simpan ke riwayat aplikasi
    await addResult(resultData);

    // Beralih ke halaman hasil dengan replace() agar tidak bisa back ke tengah kuis
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
      {/* Progress Bar & Indikator Soal */}
      <ProgressBar
        current={currentIndex + 1}
        total={questions.length}
        categoryName={currentCategoryLabel}
      />

      {/* Warning Box jika pengguna mencoba lewat tanpa memilih jawaban */}
      {validationWarning ? (
        <View style={styles.warningBox}>
          <Ionicons name="alert-circle" size={20} color={colors.danger} />
          <Text style={styles.warningText}>{validationWarning}</Text>
        </View>
      ) : null}

      {/* Kartu Soal & Pilihan Jawaban */}
      <QuestionCard
        question={currentQuestion}
        selectedOption={selectedOption}
        onSelectOption={handleSelectOption}
        questionNumber={currentIndex + 1}
      />

      {/* Tombol Navigasi Bawah */}
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
            title="Berikutnya"
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
    padding: 20,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.dangerLight,
    borderColor: '#FCA5A5',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
  },
  warningText: {
    flex: 1,
    color: colors.danger,
    fontSize: 13,
    fontWeight: '600',
  },
  bottomNav: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 20,
  },
  prevBtn: {
    flex: 1,
    height: 48,
    borderColor: colors.border,
  },
  nextBtn: {
    flex: 2,
    height: 48,
  },
});
