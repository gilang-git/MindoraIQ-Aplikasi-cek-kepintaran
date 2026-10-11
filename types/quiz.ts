export interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
  imageVisual?: string;
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
