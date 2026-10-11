import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QuizResult } from '../types/quiz';

interface QuizContextType {
  history: QuizResult[];
  addResult: (result: QuizResult) => Promise<void>;
  getResultById: (id: string) => QuizResult | undefined;
  clearHistory: () => Promise<void>;
  userName: string;
  setUserName: (name: string) => void;
  isLoading: boolean;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const STORAGE_KEY = '@mindoraiq_quiz_history_v1';
const USER_KEY = '@mindoraiq_user_name_v1';

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<QuizResult[]>([]);
  const [userName, setUserNameState] = useState<string>('Gilang');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedHistory = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedHistory) {
          const parsed = JSON.parse(savedHistory);
          if (Array.isArray(parsed)) {
            setHistory(parsed);
          }
        }

        const savedUser = await AsyncStorage.getItem(USER_KEY);
        if (savedUser) {
          setUserNameState(savedUser);
        }
      } catch (error) {
        console.warn('Gagal memuat riwayat tersimpan, menggunakan in-memory state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedData();
  }, []);

  const setUserName = (name: string) => {
    setUserNameState(name);
    AsyncStorage.setItem(USER_KEY, name).catch(() => {});
  };

  const addResult = async (result: QuizResult) => {
    const updatedHistory = [result, ...history];
    setHistory(updatedHistory);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.warn('Gagal menyimpan ke persistent storage, tetap di state memori:', error);
    }
  };

  const getResultById = (id: string): QuizResult | undefined => {
    return history.find((item) => item.id === id);
  };

  const clearHistory = async () => {
    setHistory([]);
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Gagal menghapus riwayat storage:', error);
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
