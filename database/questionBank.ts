import { supabase } from '../lib/supabase';
import { CategoryItem, Question } from '../types/quiz';

// Bank soal MindoraIQ dibaca langsung dari database cloud Supabase
// (tabel "categories" dan "questions", baca-saja lewat RLS untuk user login).

interface CategoryRow {
  id: string;
  name: string;
  description: string;
  icon: string;
  accent_color: string;
}

interface QuestionRow {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string | null;
}

function rowToQuestion(row: QuestionRow): Question {
  return {
    id: row.id,
    category: row.category,
    question: row.question,
    options: row.options,
    correctAnswer: row.correct_answer,
    explanation: row.explanation ?? undefined,
  };
}

export async function getCategories(): Promise<CategoryItem[]> {
  const [categoriesRes, countsRes] = await Promise.all([
    supabase.from('categories').select('*').order('sort_order', { ascending: true }),
    supabase.from('questions').select('category'),
  ]);

  if (categoriesRes.error) throw categoriesRes.error;
  if (countsRes.error) throw countsRes.error;

  const counts: Record<string, number> = {};
  (countsRes.data as { category: string }[]).forEach((row) => {
    counts[row.category] = (counts[row.category] ?? 0) + 1;
  });

  return (categoriesRes.data as CategoryRow[]).map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    icon: row.icon,
    questionCount: counts[row.id] ?? 0,
    accentColor: row.accent_color,
  }));
}

export async function getQuestions(categoryId?: string): Promise<Question[]> {
  let query = supabase.from('questions').select('*').order('id', { ascending: true });
  if (categoryId && categoryId !== 'all') {
    query = query.eq('category', categoryId);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data as QuestionRow[]).map(rowToQuestion);
}

export async function getTotalQuestionCount(): Promise<number> {
  const { count, error } = await supabase
    .from('questions')
    .select('id', { count: 'exact', head: true });
  if (error) throw error;
  return count ?? 0;
}
