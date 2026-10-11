export interface ScoreDetails {
  percentage: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  evaluationMessage: string;
  gradeLabel: string;
  badgeColor: string;
}

export function calculateScore(correctAnswers: number, totalQuestions: number): ScoreDetails {
  const safeTotal = totalQuestions > 0 ? totalQuestions : 1;
  const percentage = Math.round((correctAnswers / safeTotal) * 100);
  const incorrectAnswers = Math.max(0, safeTotal - correctAnswers);

  let evaluationMessage = '';
  let gradeLabel = '';
  let badgeColor = '#059669';

  if (percentage >= 85) {
    gradeLabel = 'Sangat Baik';
    evaluationMessage = 'Akurasi pengerjaan Anda sangat tinggi. Hampir seluruh analisis pola dan logika berhasil dijawab dengan tepat.';
    badgeColor = '#059669';
  } else if (percentage >= 70) {
    gradeLabel = 'Baik';
    evaluationMessage = 'Daya nalar Anda konsisten dan memiliki pemahaman struktur logika serta pola yang rapi.';
    badgeColor = '#2563EB';
  } else if (percentage >= 50) {
    gradeLabel = 'Cukup';
    evaluationMessage = 'Dasar penalaran sudah terbentuk dengan baik, hanya perlu sedikit ketelitian tambahan pada soal jebakan.';
    badgeColor = '#D97706';
  } else {
    gradeLabel = 'Perlu Latihan';
    evaluationMessage = 'Hasil ini dapat ditingkatkan dengan membiasakan diri membaca premis dan deret pola secara berkala.';
    badgeColor = '#DC2626';
  }

  return {
    percentage,
    correctAnswers,
    incorrectAnswers,
    totalQuestions: safeTotal,
    evaluationMessage,
    gradeLabel,
    badgeColor,
  };
}

export function formatQuizDate(date: Date = new Date()): string {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  };
  return date.toLocaleDateString('id-ID', options);
}

export function generateResultId(): string {
  const dateStr = Date.now().toString(36).toUpperCase();
  const randNum = Math.floor(Math.random() * 900 + 100);
  return `MIQ-${dateStr}-${randNum}`;
}

export const MINDORAIQ_DISCLAIMER =
  'Aplikasi MindoraIQ dibuat sebagai modul latihan logika dan implementasi praktikum pemrograman mobile. Skor ini merupakan penilaian internal kuis dan bukan hasil asesmen psikologi formal.';
