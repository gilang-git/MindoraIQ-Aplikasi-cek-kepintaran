// MINDORA — Home Screen (MindoraIQ, responsif penuh, UI-only)
// phone: layout mobile 1 kolom sesuai spek (max 430, tengah)
// tablet: grid 2 kolom, konten max 900 tengah
// desktop: layout web semestinya — navbar + hero 2 kolom + konten
//   utama (kiri) + sidebar (kanan), konten max 1160 tengah.
// Hanya Tes Cepat yang bisa dibuka (-> IQ Test). Search memfilter list.
// Materi: SafeAreaView, ScrollView, TextInput, map(), Array of Objects,
// Type, Custom Function, Custom Hook (useBreakpoint).
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppStyles } from '@/styles/styles';
import { useBreakpoint } from '@/theme/responsive';

// TYPE: satu kategori yang diukur (Array of Objects)
type Category = {
  id: number;
  icon: string; // nama ikon MaterialCommunityIcons
  title: string;
  meta: string;
  desc: string;
};

// ARRAY OF OBJECTS: kategori — difilter search bar, dirender dengan map()
const CATEGORIES: Category[] = [
  {
    id: 1,
    icon: 'eye',
    title: 'Penalaran Visual',
    meta: '4 soal | Nonverbal',
    desc: 'Melanjutkan pola gambar dan bentuk.',
  },
  {
    id: 2,
    icon: 'calculator',
    title: 'Penalaran Numerik',
    meta: '4 soal | Angka',
    desc: 'Deret angka dan operasi hitung cepat.',
  },
  {
    id: 3,
    icon: 'chat-processing',
    title: 'Penalaran Verbal',
    meta: '4 soal | Kata',
    desc: 'Sinonim, antonim, dan analogi kata.',
  },
];

// CUSTOM FUNCTION: sapaan sesuai jam
function greeting(): string {
  const h = new Date().getHours();
  if (h < 11) return 'Selamat pagi';
  if (h < 15) return 'Selamat siang';
  if (h < 19) return 'Selamat sore';
  return 'Selamat malam';
}

export default function HomeScreen() {
  const { home: s, C, dark } = useAppStyles();
  const [query, setQuery] = useState('');
  const bp = useBreakpoint();

  // CUSTOM FUNCTION: hanya Tes Cepat yang bisa dibuka (ke IQ Test)
  function handleQuickStart() {
    router.push('/iq-test');
  }

  // CUSTOM FUNCTION: filter kategori sesuai teks search
  function filtered(): Category[] {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES;
    return CATEGORIES.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.meta.toLowerCase().includes(q) ||
        c.desc.toLowerCase().includes(q),
    );
  }

  const list = filtered();

  // ── PHONE: layout mobile persis spek MindoraIQ ──
  if (bp === 'phone') {
    return (
      <SafeAreaView style={s.safe}>
        <View style={{ flex: 1, minWidth: 0 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[s.content, { width: '100%' }]}>
              {/* Header sapaan */}
              <View style={[s.header, { marginTop: 8 }]}>
                <View style={s.headerLeft}>
                  <Text style={s.greeting}>{greeting()}</Text>
                  <Text style={s.username}>Halo, Gilang</Text>
                  <Text style={s.nim}>NIM 202410370110117</Text>
                </View>
                <View style={s.headerSide}>
                  <Pressable
                    onPress={() => router.push('/dashboard')}
                    style={({ pressed }) => [s.avatarBig, { opacity: pressed ? 0.75 : 1 }]}
                  >
                    <MaterialCommunityIcons name="account" size={28} color="#fff" />
                  </Pressable>
                  <Ionicons name={dark ? 'sunny' : 'moon'} size={24} color={C.textSub} />
                </View>
              </View>
              {/* Banner */}
              <View style={s.banner}>
                <MaterialCommunityIcons name="information" size={24} color="#2F80FF" />
                <Text style={s.bannerText}>
                  Selamat datang di MindoraIQ! Ukur penalaran visual, numerik, dan verbal lewat tes singkat.
                </Text>
              </View>
              {/* 3 stat */}
              <View style={[s.statsRow, { marginBottom: 20 }]}>
                {[
                  { num: '2', label: 'Tes tersedia' },
                  { num: '0', label: 'Tes selesai' },
                  { num: '-', label: 'Skor terbaik' },
                ].map((it, i) => (
                  <View key={i} style={s.statBox}>
                    <Text style={s.statNumP}>{it.num}</Text>
                    <Text style={[s.statLabel, { textAlign: 'center' }]}>{it.label}</Text>
                  </View>
                ))}
              </View>
              <Text style={[s.secTitle, { marginBottom: 10 }]}>Pilih Tes</Text>
              {/* Tes Cepat */}
              <View style={s.bigCard}>
                <View style={s.bigTop}>
                  <View style={s.bigIcon}>
                    <MaterialCommunityIcons name="clock-outline" size={28} color="#6D5EF0" />
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={s.bigTitle}>Tes Cepat</Text>
                    <Text style={s.bigMeta}>15-20 soal | 10-15 menit</Text>
                  </View>
                  <View style={s.badgeAvail}>
                    <Text style={s.badgeAvailText}>Available</Text>
                  </View>
                </View>
                <Text style={s.bigDesc}>
                  Estimasi umum kemampuan kognitif kamu lewat soal campuran visual, angka, dan kata.
                </Text>
                <Pressable
                  onPress={handleQuickStart}
                  style={({ pressed }) => [s.startBtn, { opacity: pressed ? 0.85 : 1 }]}
                >
                  <Text style={s.startBtnText}>Mulai Tes Cepat</Text>
                </Pressable>
              </View>
              {/* Tes Lengkap */}
              <View style={[s.bigCard, { opacity: 0.9 }]}>
                <View style={s.bigTop}>
                  <View style={s.bigIcon}>
                    <MaterialCommunityIcons name="medal" size={28} color="#6D5EF0" />
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={s.bigTitle}>Tes Lengkap</Text>
                    <Text style={s.bigMeta}>40 soal | 30 menit</Text>
                  </View>
                  <View style={s.badgeSoon}>
                    <Text style={s.badgeSoonText}>Soon</Text>
                  </View>
                </View>
                <Text style={s.bigDesc}>
                  Profil IQ lengkap dengan analisis per kategori — hadir di modul berikutnya.
                </Text>
              </View>
              <Text style={[s.secTitle, { marginTop: 20, marginBottom: 10 }]}>
                Kategori yang Diukur
              </Text>
              <View style={s.searchBar}>
                <MaterialCommunityIcons name="magnify" size={20} color={C.textSub} />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Cari kategori..."
                  placeholderTextColor={C.textSub}
                  style={s.searchInput}
                />
              </View>
              {list.map((c) => (
                <View key={c.id} style={s.catCard}>
                  <View style={[s.bigIcon, { width: 44, height: 44, borderRadius: 22 }]}>
                    <MaterialCommunityIcons name={c.icon as never} size={24} color="#6D5EF0" />
                  </View>
                  <View style={{ flex: 1, minWidth: 0 }}>
                    <Text style={s.catTitle}>{c.title}</Text>
                    <Text style={s.catMeta}>{c.meta}</Text>
                    <Text style={s.catDesc}>{c.desc}</Text>
                  </View>
                </View>
              ))}
              {list.length === 0 && (
                <Text style={[s.bigDesc, { textAlign: 'center', marginBottom: 12 }]}>
                  Tidak ada kategori yang cocok dengan "{query}".
                </Text>
              )}
            </View>
          </ScrollView>
          <View style={[s.gearBtn, { pointerEvents: 'none' }]}>
            <MaterialCommunityIcons name="cog" size={26} color="#fff" />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // ── TABLET + DESKTOP: satu layout web fluid yang sama untuk keduanya.
  // Kolom tumbuh/menyusut + wrap otomatis — tidak ada cabang beda,
  // jadi tablet & desktop selalu konsisten, dan tidak ada yang terjepit.
  const w = StyleSheet.create({
    page: { width: '100%', paddingHorizontal: 16, paddingBottom: 48 },
    // Navbar web
    nav: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, gap: 12, flexWrap: 'wrap' },
    brand: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    brandIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#6D5EF0', alignItems: 'center', justifyContent: 'center' },
    brandName: { fontSize: 18, fontWeight: '800', color: C.text },
    brandSub: { fontSize: 11, color: C.textSub },
    navRight: { flexDirection: 'row', alignItems: 'center', gap: 12, marginLeft: 'auto' },
    navNim: { fontSize: 12, color: C.textSub },
    navAvatar: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#6D5EF0', alignItems: 'center', justifyContent: 'center' },
    // Hero web: 2 kolom
    hero: { backgroundColor: C.surface, borderRadius: 20, borderWidth: 1, borderColor: C.border, padding: 28, marginTop: 8, marginBottom: 20, flexDirection: 'row', gap: 20, alignItems: 'center', flexWrap: 'wrap' },
    heroLeft: { flex: 2, minWidth: 280 },
    heroKicker: { fontSize: 12, fontWeight: '700', color: C.primary, letterSpacing: 1.5, textTransform: 'uppercase' },
    heroTitle: { fontSize: 28, fontWeight: '800', color: C.text, marginTop: 8, lineHeight: 36 },
    heroSub: { fontSize: 14, color: C.textSub, marginTop: 10, lineHeight: 21 },
    heroCtas: { flexDirection: 'row', gap: 10, marginTop: 18, flexWrap: 'wrap' },
    ctaPrimary: { backgroundColor: '#6D5EF0', borderRadius: 12, height: 48, paddingHorizontal: 22, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8 },
    ctaPrimaryText: { color: '#fff', fontSize: 15, fontWeight: '700' },
    ctaGhost: { borderRadius: 12, height: 48, paddingHorizontal: 22, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: C.border, backgroundColor: C.surface2 },
    ctaGhostText: { fontSize: 14, fontWeight: '700', color: C.text },
    heroRight: { flex: 1, minWidth: 260, backgroundColor: '#E8F1FF', borderRadius: 16, padding: 20, gap: 12 },
    heroStatRow: { flexDirection: 'row', gap: 10 },
    heroStat: { flex: 1, backgroundColor: '#fff', borderRadius: 12, padding: 12, alignItems: 'center' },
    heroStatNum: { fontSize: 22, fontWeight: '800', color: '#6C5CFF' },
    heroStatLabel: { fontSize: 11, color: '#8A8FA3', marginTop: 2, textAlign: 'center' },
    heroNote: { fontSize: 12, color: '#3A4A6B', lineHeight: 18 },
    // Grid utama web: kiri konten + kanan sidebar
    mainRow: { flexDirection: 'row', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' },
    mainCol: { flex: 2, minWidth: 300 },
    sideCol: { flex: 1, minWidth: 280, gap: 12 },
    card: { backgroundColor: C.surface, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 18 },
    testGrid: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },
    testCard: { width: '48%', backgroundColor: C.surface, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 18 },
    sideTitle: { fontSize: 14, fontWeight: '700', color: C.text, marginBottom: 8 },
    profileRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    profileAvatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: '#6D5EF0', alignItems: 'center', justifyContent: 'center' },
    profileName: { fontSize: 16, fontWeight: '700', color: C.text },
    profileNim: { fontSize: 12, color: C.textSub, marginTop: 2 },
    progressTrack: { height: 8, borderRadius: 4, backgroundColor: C.surface2, overflow: 'hidden', marginTop: 10 },
    progressFill: { height: 8, borderRadius: 4, backgroundColor: '#6D5EF0', width: '0%' },
    tipText: { fontSize: 13, color: C.textSub, lineHeight: 19 },
    catGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
    catBox: { width: '48%', backgroundColor: C.surface, borderRadius: 16, borderWidth: 1, borderColor: C.border, padding: 16, flexDirection: 'row', gap: 12 },
    footer: { marginTop: 24, alignItems: 'center' },
    footerText: { fontSize: 12, color: C.textSub },
  });

  return (
    <SafeAreaView style={s.safe}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={w.page}>
          {/* Navbar web */}
          <View style={w.nav}>
            <View style={w.brand}>
              <View style={w.brandIcon}>
                <MaterialCommunityIcons name="brain" size={22} color="#fff" />
              </View>
              <View>
                <Text style={w.brandName}>MindoraIQ</Text>
                <Text style={w.brandSub}>Tes penalaran singkat</Text>
              </View>
            </View>
            <View style={w.navRight}>
              <Text style={w.navNim}>Gilang{'\n'}202410370110117</Text>
              <Pressable
                onPress={() => router.push('/dashboard')}
                style={({ pressed }) => [w.navAvatar, { opacity: pressed ? 0.75 : 1 }]}
              >
                <MaterialCommunityIcons name="account" size={20} color="#fff" />
              </Pressable>
              <Ionicons name={dark ? 'sunny' : 'moon'} size={22} color={C.textSub} />
            </View>
          </View>

          {/* Hero web 2 kolom */}
          <View style={w.hero}>
            <View style={w.heroLeft}>
              <Text style={w.heroKicker}>{greeting()} — Modul 1</Text>
              <Text style={w.heroTitle}>Ukur nalar visual, numerik, dan verbal dalam 15 menit.</Text>
              <Text style={w.heroSub}>
                MindoraIQ versi web: mulai Tes Cepat untuk melihat soal, atau jelajahi kategori yang diukur di bawah.
              </Text>
              <View style={w.heroCtas}>
                <Pressable
                  onPress={handleQuickStart}
                  style={({ pressed }) => [w.ctaPrimary, { opacity: pressed ? 0.85 : 1 }]}
                >
                  <Text style={w.ctaPrimaryText}>Mulai Tes Cepat</Text>
                  <Ionicons name="chevron-forward" size={16} color="#fff" />
                </Pressable>
                <View style={w.ctaGhost}>
                  <Text style={w.ctaGhostText}>15-20 soal | 10-15 menit</Text>
                </View>
              </View>
            </View>
            <View style={w.heroRight}>
              <View style={w.heroStatRow}>
                {[
                  { num: '2', label: 'Tes tersedia' },
                  { num: '0', label: 'Tes selesai' },
                  { num: '-', label: 'Skor terbaik' },
                ].map((it, i) => (
                  <View key={i} style={w.heroStat}>
                    <Text style={w.heroStatNum}>{it.num}</Text>
                    <Text style={w.heroStatLabel}>{it.label}</Text>
                  </View>
                ))}
              </View>
              <Text style={w.heroNote}>
                Banner info: selamat datang di MindoraIQ! Progres dan skormu akan muncul di sini setelah modul penilaian.
              </Text>
            </View>
          </View>

          {/* Konten utama + sidebar */}
          <View style={w.mainRow}>
            <View style={w.mainCol}>
              <Text style={[s.secTitle, { marginBottom: 10 }]}>Pilih Tes</Text>
              <View style={w.testGrid}>
                {/* Tes Cepat */}
                <View style={w.testCard}>
                  <View style={s.bigTop}>
                    <View style={s.bigIcon}>
                      <MaterialCommunityIcons name="clock-outline" size={28} color="#6D5EF0" />
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text style={s.bigTitle}>Tes Cepat</Text>
                      <Text style={s.bigMeta}>15-20 soal | 10-15 menit</Text>
                    </View>
                    <View style={s.badgeAvail}>
                      <Text style={s.badgeAvailText}>Available</Text>
                    </View>
                  </View>
                  <Text style={s.bigDesc}>
                    Estimasi umum kemampuan kognitif kamu lewat soal campuran visual, angka, dan kata.
                  </Text>
                  <Pressable
                    onPress={handleQuickStart}
                    style={({ pressed }) => [s.startBtn, { opacity: pressed ? 0.85 : 1 }]}
                  >
                    <Text style={s.startBtnText}>Mulai Tes Cepat</Text>
                  </Pressable>
                </View>
                {/* Tes Lengkap */}
                <View style={[w.testCard, { opacity: 0.9 }]}>
                  <View style={s.bigTop}>
                    <View style={s.bigIcon}>
                      <MaterialCommunityIcons name="medal" size={28} color="#6D5EF0" />
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text style={s.bigTitle}>Tes Lengkap</Text>
                      <Text style={s.bigMeta}>40 soal | 30 menit</Text>
                    </View>
                    <View style={s.badgeSoon}>
                      <Text style={s.badgeSoonText}>Soon</Text>
                    </View>
                  </View>
                  <Text style={s.bigDesc}>
                    Profil IQ lengkap dengan analisis per kategori — hadir di modul berikutnya.
                  </Text>
                </View>
              </View>

              <Text style={[s.secTitle, { marginTop: 20, marginBottom: 10 }]}>
                Kategori yang Diukur
              </Text>
              <View style={[s.searchBar, { maxWidth: 480 }]}>
                <MaterialCommunityIcons name="magnify" size={20} color={C.textSub} />
                <TextInput
                  value={query}
                  onChangeText={setQuery}
                  placeholder="Cari kategori..."
                  placeholderTextColor={C.textSub}
                  style={s.searchInput}
                />
              </View>
              <View style={w.catGrid}>
                {list.map((c) => (
                  <View key={c.id} style={w.catBox}>
                    <View style={[s.bigIcon, { width: 44, height: 44, borderRadius: 22 }]}>
                      <MaterialCommunityIcons name={c.icon as never} size={24} color="#6D5EF0" />
                    </View>
                    <View style={{ flex: 1, minWidth: 0 }}>
                      <Text style={s.catTitle}>{c.title}</Text>
                      <Text style={s.catMeta}>{c.meta}</Text>
                      <Text style={s.catDesc}>{c.desc}</Text>
                    </View>
                  </View>
                ))}
              </View>
              {list.length === 0 && (
                <Text style={[s.bigDesc, { textAlign: 'center', marginTop: 8 }]}>
                  Tidak ada kategori yang cocok dengan "{query}".
                </Text>
              )}
            </View>

            {/* Sidebar web */}
            <View style={w.sideCol}>
              <Pressable
                onPress={() => router.push('/dashboard')}
                style={({ pressed }) => [w.card, { opacity: pressed ? 0.85 : 1 }]}
              >
                <Text style={w.sideTitle}>Profil</Text>
                <View style={w.profileRow}>
                  <View style={w.profileAvatar}>
                    <MaterialCommunityIcons name="account" size={28} color="#fff" />
                  </View>
                  <View>
                    <Text style={w.profileName}>Halo, Gilang</Text>
                    <Text style={w.profileNim}>NIM 202410370110117</Text>
                  </View>
                </View>
                <View style={w.progressTrack}>
                  <View style={w.progressFill} />
                </View>
                <Text style={[w.tipText, { marginTop: 8 }]}>0 dari 2 tes selesai</Text>
                <Text style={[w.tipText, { marginTop: 8, color: '#6D5EF0', fontWeight: '700' }]}>Buka Dashboard</Text>
              </Pressable>
              <View style={w.card}>
                <Text style={w.sideTitle}>Tips</Text>
                <Text style={w.tipText}>
                  Kerjakan Tes Cepat dulu (±15 menit) di tempat tenang. Kategori Visual, Numerik, dan Verbal
                  masing-masing 4 soal di modul ini.
                </Text>
              </View>
            </View>
          </View>

          <View style={w.footer}>
            <Text style={w.footerText}>MINDORA · MindoraIQ · Modul 1 — Sintaks Dasar & UI</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
