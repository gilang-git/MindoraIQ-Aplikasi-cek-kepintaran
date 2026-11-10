import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#2563EB',
  primaryHover: '#1D4ED8',
  primaryLight: '#2563EB',
  primarySoft: 'rgba(37, 99, 235, 0.16)',
  primaryBorder: '#1E40AF',

  dark: '#1F2937',
  darkSurface: '#FFFFFF',
  darkBorder: '#E2E8F0',

  accent: '#6366F1',
  accentSoft: 'rgba(99, 102, 241, 0.16)',
  accentLight: '#818CF8',

  success: '#10B981',
  successSoft: 'rgba(16, 185, 129, 0.16)',
  warning: '#F59E0B',
  warningSoft: 'rgba(245, 158, 11, 0.16)',
  danger: '#EF4444',
  dangerSoft: 'rgba(239, 68, 68, 0.16)',

  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F5F9',
  surfaceElevated: '#E2E8F0',
  border: '#E2E8F0',
  borderStrong: '#CBD5E1',

  textPrimary: '#0F172A',
  textSecondary: '#475569',
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
