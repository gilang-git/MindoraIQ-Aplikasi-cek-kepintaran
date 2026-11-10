import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  primaryLight: '#60A5FA',
  primarySoft: 'rgba(37, 99, 235, 0.16)',
  primaryBorder: '#1E40AF',

  dark: '#080C14',
  darkSurface: '#0F172A',
  darkBorder: '#1E293B',

  accent: '#6366F1',
  accentSoft: 'rgba(99, 102, 241, 0.16)',
  accentLight: '#818CF8',

  success: '#10B981',
  successSoft: 'rgba(16, 185, 129, 0.16)',
  warning: '#F59E0B',
  warningSoft: 'rgba(245, 158, 11, 0.16)',
  danger: '#EF4444',
  dangerSoft: 'rgba(239, 68, 68, 0.16)',

  background: '#0B0F19',
  surface: '#111827',
  surfaceAlt: '#1A2333',
  surfaceElevated: '#1E293B',
  border: '#1F293D',
  borderStrong: '#334155',

  textPrimary: '#F8FAFC',
  textSecondary: '#94A3B8',
  textMuted: '#64748B',
  textInverse: '#0B0F19',
  textOnPrimary: '#FFFFFF',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
});
