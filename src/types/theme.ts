export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeState {
  mode: ThemeMode;
  isDark: boolean; // 시스템 설정 고려
  setMode: (mode: ThemeMode) => void;
}