// ============================================================
// MINDORA — ThemeContext (Modul 1: Custom Function + props
// tak terlihat: state tema dibagikan ke semua screen lewat
// Context, jadi tiap screen cukup panggil useTheme()).
// ============================================================
import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { Dark, Light } from './palette';
import type { Palette } from './palette';

type Theme = {
  dark: boolean; // true = mode gelap aktif
  C: Palette; // palet aktif (dipakai untuk styling)
  toggle: () => void; // CUSTOM FUNCTION: tukar terang/gelap
};

const ThemeContext = createContext<Theme>({
  dark: false,
  C: Light,
  toggle: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);

  // CUSTOM FUNCTION: balik nilai dark (false -> true -> false ...)
  function toggle() {
    setDark((d) => !d);
  }

  return (
    <ThemeContext.Provider value={{ dark, C: dark ? Dark : Light, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
}

// CUSTOM HOOK: cara tiap screen membaca tema aktif
export function useTheme(): Theme {
  return useContext(ThemeContext);
}
