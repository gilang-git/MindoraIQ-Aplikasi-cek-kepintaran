import { StyleSheet } from 'react-native';

export const colors = {
  // Brand colors
  primary: '#1E3A8A', // Deep Navy
  primaryDark: '#0F172A', // Slate 900
  primaryLight: '#3B82F6', // Bright Blue
  accent: '#6366F1', // Indigo / Ungu modern
  accentLight: '#EEF2FF', // Indigo 50
  
  // Status colors
  success: '#10B981', // Emerald 500
  successLight: '#ECFDF5',
  warning: '#F59E0B', // Amber 500
  warningLight: '#FFFBEB',
  danger: '#EF4444', // Red 500
  dangerLight: '#FEF2F2',
  
  // Neutral colors
  background: '#F8FAFC', // Slate 50
  card: '#FFFFFF',
  cardAlt: '#F1F5F9', // Slate 100
  border: '#E2E8F0', // Slate 200
  borderActive: '#3B82F6',
  
  // Typography
  textPrimary: '#0F172A', // Slate 900
  textSecondary: '#64748B', // Slate 500
  textMuted: '#94A3B8', // Slate 400
  textWhite: '#FFFFFF',
  
  // Gradients / highlight tints
  tintBlue: '#DBEAFE',
  tintPurple: '#EDE9FE',
  tintGreen: '#D1FAE5',
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
});
