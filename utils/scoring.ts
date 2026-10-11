export interface ScoreDetails {
  percentage: number;
  correctAnswers: number;
  incorrectAnswers: number;
  totalQuestions: number;
  evaluationMessage: string;
  gradeLabel: string;
  badgeColor: string;
}

/**
 * Menghitung skor kuis berdasarkan jumlah jawaban benar dan total soal
 * sesuai rumus PRD: (Jawaban Benar / Total Soal) * 100
 */
export function calculateScore(correctAnswers: number, totalQuestions: number): ScoreDetails {
  const safeTotal = totalQuestions > 0 ? totalQuestions : 1;
  const percentage = Math.round((correctAnswers / safeTotal) * 100);
  const incorrectAnswers = Math.max(0, safeTotal - correctAnswers);

  let evaluationMessage = '';
  let gradeLabel = '';
  let badgeColor = '#10B981';

  if (percentage >= 85) {
    gradeLabel = 'Sangat Istimewa';
    evaluationMessage = 'Kemampuan analisis dan penalaran Anda luar biasa tajam! Sebagian besar soal terselesaikan dengan sangat akurat.';
    badgeColor = '#10B981'; // Emerald
  } else if (percentage >= 70) {
    gradeLabel = 'Daya Pikir Baik';
    evaluationMessage = 'Kemampuan penalaran Anda di atas rata-rata. Pemahaman pola logika Anda solid dan konsisten.';
    badgeColor = '#3B82F6'; // Blue
  } else if (percentage >= 50) {
    gradeLabel = 'Cukup / Rata-rata';
    evaluationMessage = 'Pemahaman logika dasar sudah baik. Dengan lebih banyak latihan ketelitian, hasil Anda akan semakin meningkat.';
    badgeColor = '#F59E0B'; // Amber
  } else {
    gradeLabel = 'Perlu Latihan';
    evaluationMessage = 'Tetap semangat! Kemampuan kognitif dan penalaran logika dapat terus diasah melalui latihan rutin.';
    badgeColor = '#EF4444'; // Red
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

/**
 * Format timestamp menjadi tanggal lokal Indonesia yang mudah dibaca
 */
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

/**
 * Generate unique ID untuk setiap sesi tes
 */
export function generateResultId(): string {
  return `IQS-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;
}

export const IQSMART_DISCLAIMER =
  'IQSmart adalah kuis latihan kemampuan kognitif & penalaran mandiri, bukan tes psikologi klinis resmi. Skor yang ditampilkan merupakan skor internal aplikasi dan tidak merepresentasikan nilai IQ psikometrik tersertifikasi.';
