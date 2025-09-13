/**
 * 앱 전체에서 사용되는 색상 시스템의 단일 소스
 */
export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  light: string;
  DEFAULT: string;
  dark: string;
}

export interface ThemeColors {
  primary: ColorScale;
  secondary: ColorScale;
  success: Partial<ColorScale>;
  warning: Partial<ColorScale>;
  error: Partial<ColorScale>;
  gray: Partial<ColorScale>;
  sidebar: {
    bg: string;
    text: string;
  };
  background: {
    light: string;
    dark: string;
    gradient: {
      start: string;
      middle: string;
      end: string;
    };
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
}

// 기본 색상
const colors: ThemeColors = {
  primary: {
    DEFAULT: '#fa4750', // 500
    light: '#ff6b73',   // 300
    dark: '#d13940',    // 700
    50: '#fff1f1',
    100: '#ffddde',
    200: '#ffbbbf',
    300: '#ff8f95',
    400: '#fa4750',
    500: '#fa4750',
    600: '#e02b34',
    700: '#d13940',
    800: '#a3171e',
    900: '#86151b',
  },
  secondary: {
    DEFAULT: '#ff8f45',
    light: '#ffb06e',
    dark: '#d97038',
    50: '#fff8eb',
    100: '#ffebd1',
    200: '#ffd3a3',
    300: '#ffb675',
    400: '#ff8f45',
    500: '#ff8f45',
    600: '#ed5f15',
    700: '#d97038',
    800: '#9e3a16',
    900: '#813215',
  },
  success: {
    DEFAULT: '#10b981',
    light: '#34d399',
    dark: '#059669',
  },
  warning: {
    DEFAULT: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
  },
  error: {
    DEFAULT: '#fa4750',
    light: '#ff6b73',
    dark: '#d13940',
  },
  gray: {
    DEFAULT: '#6b7280',
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  sidebar: {
    bg: '#171717',
    text: '#ffffff',
  },
  background: {
    light: '#ffffff',
    dark: '#121212',
    gradient: {
      start: '#412829',
      middle: '#221C1D',
      end: '#191616',
    }
  },
  text: {
    primary: '#ffffff',
    secondary: '#e0e0e0',
    disabled: '#a0a0a0',
  },
};

export default colors;

// CSS 변수 생성을 위한 유틸리티
export function generateCssVariables(colors: ThemeColors): Record<string, string> {
  const variables: Record<string, string> = {};

  // 기본 변수
  variables['--background'] = colors.background.light;
  variables['--foreground'] = '#000000';

  // 브랜드 색상
  variables['--color-primary'] = colors.primary.DEFAULT;
  variables['--color-primary-light'] = colors.primary.light;
  variables['--color-primary-dark'] = colors.primary.dark;

  variables['--color-secondary'] = colors.secondary.DEFAULT;
  variables['--color-secondary-light'] = colors.secondary.light;
  variables['--color-secondary-dark'] = colors.secondary.dark;

  // 상태 색상
  variables['--color-success'] = colors.success.DEFAULT || '';
  variables['--color-warning'] = colors.warning.DEFAULT || '';
  variables['--color-error'] = colors.error.DEFAULT || '';

  // 배경 그라데이션
  variables['--bg-gradient-start'] = colors.background.gradient.start;
  variables['--bg-gradient-middle'] = colors.background.gradient.middle;
  variables['--bg-gradient-end'] = colors.background.gradient.end;

  return variables;
}

// 다크 모드 CSS 변수 생성
export function generateDarkModeCssVariables(colors: ThemeColors): Record<string, string> {
  return {
    '--background': colors.background.dark,
    '--foreground': '#ffffff',
  };
}

// Tailwind 설정용 색상 객체 생성
export function generateTailwindColors(colors: ThemeColors): Record<string, any> {
  return {
    primary: {
      DEFAULT: colors.primary.DEFAULT,
      light: colors.primary.light,
      dark: colors.primary.dark,
      ...Object.fromEntries(
          Object.entries(colors.primary)
              .filter(([key]) => !isNaN(Number(key)))
      ),
    },
    secondary: {
      DEFAULT: colors.secondary.DEFAULT,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      ...Object.fromEntries(
          Object.entries(colors.secondary)
              .filter(([key]) => !isNaN(Number(key)))
      ),
    },
    success: {
      DEFAULT: colors.success.DEFAULT,
      light: colors.success.light,
      dark: colors.success.dark,
    },
    warning: {
      DEFAULT: colors.warning.DEFAULT,
      light: colors.warning.light,
      dark: colors.warning.dark,
    },
    error: {
      DEFAULT: colors.error.DEFAULT,
      light: colors.error.light,
      dark: colors.error.dark,
    },
    gray: Object.fromEntries(
        Object.entries(colors.gray)
            .filter(([_, value]) => value !== undefined)
    ),
    sidebar: colors.sidebar,
    // background와 foreground는 CSS 변수 사용
    background: {
      ...colors.background,
      DEFAULT: "var(--background)",
    },
    foreground: "var(--foreground)",
  };
}

// JS/TS용 색상 객체 생성 (React 컴포넌트 내에서 사용)
export function generateThemeColors(colors: ThemeColors) {
  return {
    primary: {
      main: colors.primary.DEFAULT,
      light: colors.primary.light,
      dark: colors.primary.dark,
      contrast: '#ffffff',
    },
    secondary: {
      main: colors.secondary.DEFAULT,
      light: colors.secondary.light,
      dark: colors.secondary.dark,
      contrast: '#ffffff',
    },
    background: {
      dark: colors.background.dark,
      light: colors.background.light,
      sidebar: colors.sidebar.bg,
      gradient: colors.background.gradient,
    },
    text: colors.text,
    action: {
      hover: `rgba(${hexToRgb(colors.primary.DEFAULT)}, 0.08)`,
      selected: `rgba(${hexToRgb(colors.primary.DEFAULT)}, 0.16)`,
      disabled: 'rgba(255, 255, 255, 0.3)',
    },
  };
}

// 헥스 색상 코드를 RGB로 변환하는 유틸리티
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return '0, 0, 0';

  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);

  return `${r}, ${g}, ${b}`;
}
