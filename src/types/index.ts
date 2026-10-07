// ============================================================
// MINDORA — Types (Modul 1: Type / Interface)
// ============================================================

// TYPE: struktur satu kategori tes (Test Category Section)
export type Test = {
  id: number;
  title: string;
  description: string;
  icon: string; // nama ikon MaterialCommunityIcons (vektor)
  route: string; // nama route Expo Router yang dituju
};

// TYPE: struktur satu soal (Sistem Data Soal IQ Prototype)
export type Question = {
  id: number;
  type: string; // jenis soal: logic | pattern | analogy | ...
  question: string;
  options: string[];
  answer: number; // index jawaban benar (0-based)
};

// TYPE: alasan "Why Mindora?" di Home Screen
export type Reason = {
  id: number;
  icon: string; // nama ikon MaterialCommunityIcons (vektor)
  title: string;
  description: string;
};

// TYPE: props untuk reusable component TestCard
export type TestCardProps = {
  title: string;
  description: string;
  icon: string; // nama ikon MaterialCommunityIcons (vektor)
  onPress: () => void; // CUSTOM FUNCTION yang diteruskan sebagai props
};
