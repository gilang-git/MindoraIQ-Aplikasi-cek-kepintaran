import { StyleSheet } from 'react-native';

export const colors = {
  // Brand foundation - refined slate & cobalt
  primary: '#1D4ED8',       // Cobalt Blue 700
  primaryHover: '#1E40AF',
  primaryLight: '#3B82F6',   // Blue 500
  primarySoft: '#EFF6FF',    // Blue 50
  
  dark: '#0F172A',          // Slate 900
  darkSurface: '#1E293B',   // Slate 800
  darkBorder: '#334155',    // Slate 700
  
  accent: '#4F46E5',         // Indigo 600
  accentSoft: '#EEF2FF',
  
  // Status feedback
  success: '#059669',       // Emerald 600
  successSoft: '#ECFDF5',
  warning: '#D97706',       // Amber 600
  warningSoft: '#FFFBEB',
  danger: '#DC2626',        // Rose/Red 600
  dangerSoft: '#FEF2F2',
  
  // Surface neutrals
  background: '#F8FAFC',    // Slate 50
  surface: '#FFFFFF',
  surfaceAlt: '#F1F5F9',    // Slate 100
  border: '#E2E8F0',        // Slate 200
  borderStrong: '#CBD5E1',  // Slate 300
  
  // Text hierarchy
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
