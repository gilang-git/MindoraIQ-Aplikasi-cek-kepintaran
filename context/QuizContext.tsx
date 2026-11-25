import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuizResult } from '../types/quiz';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface QuizContextType {
  history: QuizResult[];
  addResult: (result: QuizResult) => Promise<void>;
  getResultById: (id: string) => QuizResult | undefined;
  clearHistory: () => Promise<void>;
  userName: string;
  setUserName: (name: string) => void;
  isLoading: boolean;
  isSyncing: boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const STORAGE_KEY_PREFIX = '@mindoraiq_quiz_history_v1';
const USER_KEY = '@mindoraiq_user_name_v1';

// Baris tabel "quiz_results" di Supabase (snake_case, sesuai konvensi Postgres).
interface QuizResultRow {
  id: string;
  category: string;
  total_questions: number;
  correct_answers: number;
  percentage: number;
  result_date: string;
  user_name: string | null;
  evaluation: string | null;
}

function rowToQuizResult(row: QuizResultRow): QuizResult {
  return {
    id: row.id,
    category: row.category,
    totalQuestions: row.total_questions,
    correctAnswers: row.correct_answers,
    percentage: row.percentage,
    date: row.result_date,
    userName: row.user_name ?? undefined,
    evaluation: row.evaluation ?? undefined,
  };
}

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [history, setHistory] = useState<QuizResult[]>([]);
  const [userName, setUserNameState] = useState<string>('Gilang');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const cacheKey = user ? `${STORAGE_KEY_PREFIX}_${user.id}` : STORAGE_KEY_PREFIX;

  // 1. Muat nama pengguna dari penyimpanan lokal (preferensi, bukan data sensitif).
  useEffect(() => {
    AsyncStorage.getItem(USER_KEY)
      .then((savedUser) => {
        if (savedUser) setUserNameState(savedUser);
      })
      .catch(() => {});
  }, []);

  // 2. Sinkronkan riwayat kuis dari basis data cloud Supabase (dilindungi RLS per-user),
  //    dengan cache lokal sebagai fallback saat offline.
  const fetchHistory = useCallback(async () => {
    if (!user) {
      setHistory([]);
      setIsLoading(false);
      return;
    }

    try {
      const cached = await AsyncStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed)) setHistory(parsed);
      }
    } catch (error) {
      console.warn('Gagal memuat cache riwayat lokal:', error);
    }

    try {
      setIsSyncing(true);
      const { data, error } = await supabase
        .from('quiz_results')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        if (error.code === 'PGRST205' || error.message.includes('does not exist')) {
          console.warn('Tabel "quiz_results" belum dibuat. Jalankan skema SQL di Supabase SQL Editor.');
        } else {
          throw error;
        }
      } else if (data) {
        const mapped = (data as QuizResultRow[]).map(rowToQuizResult);
        setHistory(mapped);
        await AsyncStorage.setItem(cacheKey, JSON.stringify(mapped));
      }
    } catch (error: any) {
      console.warn('Gagal sinkron riwayat dari cloud, menggunakan cache lokal:', error.message);
    } finally {
      setIsSyncing(false);
      setIsLoading(false);
    }
  }, [user, cacheKey]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const setUserName = (name: string) => {
    setUserNameState(name);
    AsyncStorage.setItem(USER_KEY, name).catch(() => {});
  };

  // 3. CREATE: simpan hasil tes secara optimistic (lokal langsung), lalu kirim ke cloud.
  const addResult = async (result: QuizResult) => {
    const updatedHistory = [result, ...history];
    setHistory(updatedHistory);

    try {
      await AsyncStorage.setItem(cacheKey, JSON.stringify(updatedHistory));
    } catch (error) {
      console.warn('Gagal menyimpan cache lokal:', error);
    }

    if (!user) return;

    try {
      const { error } = await supabase.from('quiz_results').insert([
        {
          id: result.id,
          user_id: user.id,
          category: result.category,
          total_questions: result.totalQuestions,
          correct_answers: result.correctAnswers,
          percentage: result.percentage,
          result_date: result.date,
          user_name: result.userName ?? null,
          evaluation: result.evaluation ?? null,
        },
      ]);

      if (error) throw error;
    } catch (error: any) {
      console.warn('Gagal menyinkronkan hasil ke cloud (tersimpan lokal):', error.message);
    }
  };

  const getResultById = (id: string): QuizResult | undefined => {
    return history.find((item) => item.id === id);
  };

  // 4. DELETE: hapus seluruh riwayat milik user yang sedang login, baik lokal maupun cloud.
  const clearHistory = async () => {
    setHistory([]);
    try {
      await AsyncStorage.removeItem(cacheKey);
    } catch (error) {
      console.warn('Gagal menghapus cache lokal:', error);
    }

    if (!user) return;

    try {
      const { error } = await supabase.from('quiz_results').delete().eq('user_id', user.id);
      if (error) throw error;
    } catch (error: any) {
      console.warn('Gagal menghapus riwayat di cloud:', error.message);
    }
  };

  return (
    <QuizContext.Provider
      value={{
        history,
        addResult,
        getResultById,
        clearHistory,
        userName,
        setUserName,
        isLoading,
        isSyncing,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = (): QuizContextType => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz harus digunakan di dalam QuizProvider');
  }
  return context;
};
