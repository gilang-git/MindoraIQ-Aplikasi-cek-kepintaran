import { StyleSheet } from 'react-native';

export const colors = {
  primary: '#1D4ED8',
  primaryHover: '#1E40AF',
  primaryLight: '#3B82F6',
  primarySoft: '#EFF6FF',
  
  dark: '#0F172A',
  darkSurface: '#1E293B',
  darkBorder: '#334155',
  
  accent: '#4F46E5',
  accentSoft: '#EEF2FF',
  
  success: '#059669',
  successSoft: '#ECFDF5',
  warning: '#D97706',
  warningSoft: '#FFFBEB',
  danger: '#DC2626',
  dangerSoft: '#FEF2F2',
  
  background: '#F8FAFC',
  surface: '#FFFFFF',
  surfaceAlt: '#F1F5F9',
  border: '#E2E8F0',
  borderStrong: '#CBD5E1',
  
  textPrimary: '#0F172A',
  textSecondary: '#475569',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
  },
});
