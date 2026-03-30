/**
 * Neon Terminal theme colour tokens.
 * These mirror the CSS custom properties in global.css but are available
 * for use in React Native StyleSheet and components that need raw values.
 */

export const darkColours = {
  bg: '#0a0a0b',
  bgSubtle: '#111113',
  surface: '#18181b',
  surfaceHover: '#1f1f23',
  border: '#27272a',
  borderBright: '#3f3f46',
  text: '#fafafa',
  textMuted: '#a1a1aa',
  textDim: '#71717a',
  accentCyan: '#06b6d4',
  accentViolet: '#8b5cf6',
  accentCyanDim: '#0e7490',
  accentVioletDim: '#6d28d9',
  codeBg: '#0a0a0b',
  codeText: '#e2e8f0',
  glow: 'rgba(6, 182, 212, 0.15)',
} as const;

export const lightColours = {
  bg: '#f8fafc',
  bgSubtle: '#f1f5f9',
  surface: '#ffffff',
  surfaceHover: '#f1f5f9',
  border: '#e2e8f0',
  borderBright: '#cbd5e1',
  text: '#0f172a',
  textMuted: '#475569',
  textDim: '#94a3b8',
  accentCyan: '#0891b2',
  accentViolet: '#7c3aed',
  accentCyanDim: '#06b6d4',
  accentVioletDim: '#8b5cf6',
  codeBg: '#f1f5f9',
  codeText: '#334155',
  glow: 'rgba(8, 145, 178, 0.12)',
} as const;

export type ThemeColours = {
  [K in keyof typeof darkColours]: string;
};
