// My Design System — React / Web (TypeScript). Generated from tokens.json — do not edit by hand.

export const brand = {
  primary: '#7C3AED',
  accentDark: '#58A6FF',
  accentLight: '#2563EB',
} as const;

export const light = {
  background: '#FFFFFF',
  surface: '#FAF9FC',
  border: '#ECE9F5',
  text: '#1C1B22',
  textMuted: '#6B6A76',
  primary: '#7C3AED',
  accent: '#2563EB',
  success: '#16A34A',
  error: '#DC2626',
  primarySubtle: '#E8DEFA',
  accentSubtle: '#DCE4FA',
  successSubtle: '#DAEDE3',
  errorSubtle: '#F6DBDE',
} as const;

export const dark = {
  background: '#0D1117',
  surface: '#161B22',
  border: '#30363D',
  text: '#E6EDF3',
  textMuted: '#8B949E',
  primary: '#7C3AED',
  accent: '#58A6FF',
  success: '#3FB950',
  error: '#FF7B72',
  primarySubtle: '#262042',
  accentSubtle: '#213145',
  successSubtle: '#1D3429',
  errorSubtle: '#3B2A2F',
} as const;

export const typography = {
  fontFamily: "'Space Grotesk', Pretendard, 'Noto Sans KR', sans-serif",
  size: { h1: 40, h2: 28, h3: 20, body: 16, caption: 13 },
  weight: { regular: 400, semibold: 600, bold: 700 },
  lineHeight: { h1: 1.15, h2: 1.25, h3: 1.3, body: 1.6, caption: 1.5 },
} as const;

export const spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 40 } as const;
export const radius = { sm: 6, md: 8, lg: 10, xl: 20, full: 999 } as const;
export const breakpoints = { sm: 640, md: 768, lg: 1024, xl: 1280 } as const;

export const elevation = {
  shadowSm: '0 1px 2px rgba(0,0,0,0.06)',
  shadowMd: '0 4px 14px rgba(124,58,237,0.20)',
  glowPrimary: '0 0 20px rgba(124,58,237,0.35)',
} as const;

export const theme = { brand, light, dark, typography, spacing, radius, breakpoints, elevation };
export type ColorScheme = typeof light;
export default theme;
