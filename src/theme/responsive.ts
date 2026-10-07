// ============================================================
// MINDORA — Breakpoint responsif (HP / tablet / desktop)
// Satu hook untuk semua screen: baca lebar layar, tentukan
// breakpoint. Otomatis update saat browser di-resize atau
// HP di-rotasi. (Modul 1: Custom Function + Custom Hook.)
// ============================================================
import { useWindowDimensions } from 'react-native';

export type Breakpoint = 'phone' | 'tablet' | 'desktop';

// CUSTOM FUNCTION: tentukan breakpoint dari lebar piksel
// phone < 640 <= tablet < 1024 <= desktop
export function breakpointOf(width: number): Breakpoint {
  if (width >= 1024) return 'desktop';
  if (width >= 640) return 'tablet';
  return 'phone';
}

// CUSTOM HOOK: breakpoint aktif saat ini
export function useBreakpoint(): Breakpoint {
  const { width } = useWindowDimensions();
  return breakpointOf(width);
}

// CUSTOM FUNCTION: lebar maksimum cangkang web per breakpoint
export function shellMaxWidth(bp: Breakpoint): number {
  if (bp === 'desktop') return 1080;
  if (bp === 'tablet') return 720;
  return 430;
}
