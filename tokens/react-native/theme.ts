// My Design System — React Native (TypeScript). Generated from tokens.json — do not edit by hand.

export const brand = {
  primary: '#7C3AED',
  accentDark: '#58A6FF',
  accentLight: '#2563EB',
} as const;

export const colors = {
  light: {
    background: '#FFFFFF',
    surface: '#FAF9FC',
    border: '#ECE9F5',
    text: '#1C1B22',
    textMuted: '#6B6A76',
    primary: '#7C3AED',
    accent: '#2563EB',
    success: '#16A34A',
    error: '#DC2626',
  },
  dark: {
    background: '#0D1117',
    surface: '#161B22',
    border: '#30363D',
    text: '#E6EDF3',
    textMuted: '#8B949E',
    primary: '#7C3AED',
    accent: '#58A6FF',
    success: '#3FB950',
    error: '#FF7B72',
  },
} as const;

export const fontFamily = 'Space Grotesk';
export const fontFamilyKR = 'Pretendard';
export const fontSize = { h1: 40, h2: 28, h3: 20, body: 16, caption: 13 } as const;
export const fontWeight = { regular: '400', semibold: '600', bold: '700' } as const;
export const lineHeight = { h1: 46, h2: 35, h3: 26, body: 26, caption: 20 } as const; // size * ratio, rounded
export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40 } as const;
export const radius = { sm: 6, md: 8, lg: 10, full: 999 } as const;
export const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;

export type Scheme = keyof typeof colors;
export const theme = { brand, colors, fontFamily, fontFamilyKR, fontSize, fontWeight, lineHeight, spacing, radius, breakpoints };
export default theme;
