export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number; // Indeks jawaban benar (0-based)
  explanation?: string;
  imageVisual?: string; // Tampilan diagram/visual teks untuk pola gambar
}

export interface QuizResult {
  id: string;
  category: string;
  totalQuestions: number;
  correctAnswers: number;
  percentage: number;
  date: string;
  userName?: string;
  evaluation?: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  questionCount: number;
  accentColor: string;
}
