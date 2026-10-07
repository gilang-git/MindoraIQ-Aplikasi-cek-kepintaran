// ============================================================
// MINDORA — Palet warna (Modul 1: Type + Object)
// Dua tema: Light (Warm Paper) & Dark. Kunci object-nya sama,
// jadi ganti tema cukup tukar object palet ini.
// ============================================================

export type Palette = {
  bg: string;
  surface: string;
  surface2: string;
  border: string;
  primary: string;
  primaryLight: string;
  accent: string;
  accentGold: string;
  text: string;
  textSub: string;
  success: string;
  error: string;
  tag: string;
};

// LIGHT: MindoraIQ — abu muda, primer ungu
export const Light: Palette = {
  bg: '#F2F3F7',
  surface: '#FFFFFF',
  surface2: '#ECEEF4',
  border: '#E4E6EE',
  primary: '#6D5EF0',
  primaryLight: '#6D5EF0',
  accent: '#2F80FF',
  accentGold: '#C98A00',
  text: '#1A1D3A',
  textSub: '#8A8FA3',
  success: '#2E9E5B',
  error: '#DC2626',
  tag: 'rgba(109,94,240,0.12)',
};

// DARK: slate gelap — nyaman di malam hari
export const Dark: Palette = {
  bg: '#14131B',
  surface: '#1E1D29',
  surface2: '#2A2938',
  border: '#35344A',
  primary: '#8B85FF',
  primaryLight: '#B3AEFF',
  accent: '#FF7A90',
  accentGold: '#FFC94D',
  text: '#F2F0FA',
  textSub: '#A09BB8',
  success: '#34D399',
  error: '#F87171',
  tag: 'rgba(139,133,255,0.16)',
};
