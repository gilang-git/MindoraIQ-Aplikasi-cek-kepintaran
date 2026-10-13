import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  disabled?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: 'md' | 'lg';
}

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  icon,
  style,
  textStyle,
  size = 'md',
}: PrimaryButtonProps) {
  const isOutline = variant === 'outline';
  const isDanger = variant === 'danger';
  const isSecondary = variant === 'secondary';

  const getBackgroundColor = (pressed: boolean) => {
    if (disabled) return colors.border;
    if (isOutline) return pressed ? colors.surfaceAlt : 'transparent';
    if (isDanger) return pressed ? '#B91C1C' : colors.danger;
    if (isSecondary) return pressed ? '#3730A3' : colors.accent;
    return pressed ? colors.primaryHover : colors.primary;
  };

  const getTextColor = () => {
    if (disabled) return colors.textMuted;
    if (isOutline) return colors.textPrimary;
    return colors.textInverse;
  };

  const height = size === 'lg' ? 52 : 46;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          height,
          backgroundColor: getBackgroundColor(pressed),
          borderColor: isOutline ? colors.borderStrong : 'transparent',
          borderWidth: isOutline ? 1 : 0,
          opacity: disabled ? 0.6 : 1,
          transform: [{ scale: pressed && !disabled ? 0.985 : 1 }],
        },
        style,
      ]}
    >
      <View style={styles.contentRow}>
        {icon && (
          <Ionicons
            name={icon}
            size={18}
            color={getTextColor()}
            style={styles.icon}
          />
        )}
        <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
});
