'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { colors } from '@/styles/theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  colors: typeof colors;
}
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('dark');

  // 시스템/저장된 테마 적용
  useEffect(() => {
    const savedMode = localStorage.getItem('theme') as ThemeMode | null;
    if (savedMode) {
      setMode(savedMode);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
  }, []);

  // 테마 변경 시 저장 및 HTML 클래스 업데이트
  useEffect(() => {
    localStorage.setItem('theme', mode);
    document.documentElement.classList.toggle('dark', mode === 'dark');
  }, [mode]);

  // CSS 변수로 테마 색상 설정
  useEffect(() => {
    // CSS 변수로 테마 색상 설정
    const root = document.documentElement;

    // 기본 색상 설정
    root.style.setProperty('--color-primary', colors.primary.main);
    root.style.setProperty('--color-primary-light', colors.primary.light);
    root.style.setProperty('--color-primary-dark', colors.primary.dark);

    // 모드별 색상 설정
    if (mode === 'dark') {
      root.style.setProperty('--color-bg', colors.background.dark);
      root.style.setProperty('--color-text', colors.text.primary);
    } else {
      root.style.setProperty('--color-bg', colors.background.light);
      root.style.setProperty('--color-text', '#000000');
    }
  }, [mode, colors]);

  const value = {
    mode,
    setMode,
    colors
  };

  return (
      <ThemeContext.Provider value={value}>
        {children}
      </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}