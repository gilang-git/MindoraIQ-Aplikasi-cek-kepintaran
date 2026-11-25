import { Alert, Platform } from 'react-native';

// Alert.alert dari React Native tidak menampilkan dialog (dan tidak memanggil
// callback tombol) di platform web, sehingga dibutuhkan fallback window.alert/confirm.

export function showMessage(title: string, message?: string): void {
  if (Platform.OS === 'web') {
    window.alert(message ? `${title}\n\n${message}` : title);
    return;
  }
  Alert.alert(title, message);
}

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText: string;
  cancelText?: string;
  destructive?: boolean;
  onConfirm: () => void;
}

export function confirmAction({
  title,
  message,
  confirmText,
  cancelText = 'Batal',
  destructive = false,
  onConfirm,
}: ConfirmOptions): void {
  if (Platform.OS === 'web') {
    if (window.confirm(`${title}\n\n${message}`)) onConfirm();
    return;
  }
  Alert.alert(title, message, [
    { text: cancelText, style: 'cancel' },
    { text: confirmText, style: destructive ? 'destructive' : 'default', onPress: onConfirm },
  ]);
}
