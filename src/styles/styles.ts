import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Light } from '@/theme/palette';
import type { Palette } from '@/theme/palette';
import { useTheme } from '@/theme/ThemeContext';

export const Colors = Light;

function makeHome(C: Palette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: C.bg },
    content: { paddingHorizontal: 16, paddingBottom: 48 },
    header: { marginTop: 20, marginBottom: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    headerLeft: { flex: 1 },
    greeting: { fontSize: 13, color: C.textSub, letterSpacing: 0.5 },
    username: { fontSize: 22, fontWeight: '700', color: C.text, marginTop: 3, letterSpacing: -0.3 },
    headerRight: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    themeBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: C.surface, borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
    avatarBox: { width: 42, height: 42, borderRadius: 21, backgroundColor: C.primary, alignItems: 'center', justifyContent: 'center' },
    avatarText: { fontSize: 17, fontWeight: '800', color: '#fff' },
    hero: { borderRadius: 24, marginBottom: 20, overflow: 'hidden', backgroundColor: C.surface, borderWidth: 1, borderColor: C.border },
    heroInner: { padding: 22 },
    heroOrb1: { position: 'absolute', width: 180, height: 180, borderRadius: 90, backgroundColor: C.primary, opacity: 0.16, top: -50, right: -40 },
    heroOrb2: { position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: C.accent, opacity: 0.12, bottom: -20, right: 60 },
    heroPill: { alignSelf: 'flex-start', backgroundColor: C.tag, borderRadius: 20, paddingHorizontal: 12, paddingVertical: 5, marginBottom: 14, flexDirection: 'row', alignItems: 'center', gap: 6 },
    heroPillText: { color: C.primaryLight, fontSize: 11, fontWeight: '700', letterSpacing: 0.8 },
    heroTitle: { fontSize: 28, fontWeight: '800', color: C.text, lineHeight: 34, letterSpacing: -0.5 },
    heroSub: { fontSize: 13, color: C.textSub, marginTop: 8, lineHeight: 20 },
    heroBtn: { marginTop: 20, backgroundColor: C.primary, borderRadius: 14, paddingVertical: 13, paddingHorizontal: 22, alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: 8 },
    heroBtnText: { color: '#fff', fontSize: 14, fontWeight: '700' },
    statsRow: { flexDirection: 'row', gap: 10, marginBottom: 16 },
    statBox: { flex: 1, backgroundColor: C.surface, borderRadius: 16, padding: 14, alignItems: 'center', borderWidth: 1, borderColor: C.border },
    statNum: { fontSize: 24, fontWeight: '800', color: C.text, letterSpacing: -0.5 },
    statLabel: { fontSize: 11, color: C.textSub, marginTop: 3 },
    sectionRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: C.text, letterSpacing: -0.2 },
    sectionSub: { fontSize: 12, color: C.primary, fontWeight: '600' },
    whyCard: { backgroundColor: C.surface, borderRadius: 16, padding: 14, marginBottom: 10, flexDirection: 'row', alignItems: 'center', gap: 14, borderWidth: 1, borderColor: C.border },
    whyIcon: { width: 42, height: 42, borderRadius: 12, backgroundColor: C.tag, alignItems: 'center', justifyContent: 'center' },
    whyTitle: { fontSize: 14, fontWeight: '700', color: C.text },
    whyDesc: { fontSize: 12, color: C.textSub, marginTop: 2, lineHeight: 17 },
    // â”€â”€ MindoraIQ Home â”€â”€
    safe: { flex: 1, backgroundColor: C.bg },
    nim: { fontSize: 12, color: C.textSub, marginTop: 2 },
    headerSide: { alignItems: 'center', gap: 8 },
    avatarBig: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#6D5EF0', alignItems: 'center', justifyContent: 'center' },
    statNumP: { fontSize: 22, fontWeight: '800', color: '#6C5CFF', letterSpacing: -0.5 },
    secTitle: { fontSize: 18, fontWeight: '700', color: C.text, letterSpacing: -0.2 },
    banner: { backgroundColor: '#E8F1FF', borderRadius: 12, padding: 12, flexDirection: 'row', gap: 10, marginBottom: 14, alignItems: 'flex-start' },
    bannerText: { fontSize: 13, color: '#3A4A6B', lineHeight: 19, flex: 1 },
    bigCard: { backgroundColor: C.surface, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: C.border },
    bigTop: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    bigIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: C.tag, alignItems: 'center', justifyContent: 'center' },
    bigTitle: { fontSize: 16, fontWeight: '700', color: C.text },
    bigMeta: { fontSize: 12, color: C.textSub, marginTop: 2 },
    badgeAvail: { backgroundColor: '#E6F7E9', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginLeft: 'auto' },
    badgeAvailText: { color: '#2E9E5B', fontSize: 11, fontWeight: '700' },
    badgeSoon: { backgroundColor: '#FFF3D6', borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginLeft: 'auto' },
    badgeSoonText: { color: '#C98A00', fontSize: 11, fontWeight: '700' },
    bigDesc: { fontSize: 13, color: C.textSub, marginTop: 12, lineHeight: 19 },
    startBtn: { backgroundColor: '#6D5EF0', borderRadius: 12, height: 48, alignItems: 'center', justifyContent: 'center', marginTop: 14, flexDirection: 'row', gap: 8 },
    startBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
    searchBar: { backgroundColor: C.surface, borderWidth: 1, borderColor: C.border, borderRadius: 12, height: 48, paddingHorizontal: 12, flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    searchInput: { flex: 1, fontSize: 14, color: C.text },
    catCard: { backgroundColor: C.surface, borderRadius: 16, padding: 14, marginBottom: 12, flexDirection: 'row', gap: 12, borderWidth: 1, borderColor: C.border, alignItems: 'flex-start' },
    catTitle: { fontSize: 15, fontWeight: '700', color: C.text },
    catMeta: { fontSize: 12, color: C.textSub, marginTop: 2 },
    catDesc: { fontSize: 12, color: C.textSub, marginTop: 4, lineHeight: 17 },
    gearBtn: { position: 'absolute', right: 8, bottom: 22, width: 56, height: 56, borderRadius: 28, backgroundColor: '#2F80FF', alignItems: 'center', justifyContent: 'center', elevation: 6, shadowColor: '#2F80FF', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.4, shadowRadius: 8 },
  });
}

function makeIq(C: Palette) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: C.bg },
    content: { paddingHorizontal: 20, paddingBottom: 36 },
    topBar: { flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 20, gap: 12 },
    backBtn: { width: 38, height: 38, borderRadius: 12, backgroundColor: C.surface, borderWidth: 1, borderColor: C.border, alignItems: 'center', justifyContent: 'center' },
    topTitleRow: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
    topTitle: { fontSize: 16, fontWeight: '700', color: C.text },
    topBadge: { backgroundColor: C.tag, borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
    topBadgeText: { fontSize: 11, color: C.primaryLight, fontWeight: '700' },
    progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 20 },
    progressTrack: { flex: 1, height: 4, borderRadius: 2, backgroundColor: C.surface2, overflow: 'hidden' },
    progressFill: { height: 4, borderRadius: 2, backgroundColor: C.primary },
    progressLabel: { fontSize: 11, color: C.textSub, fontWeight: '600', minWidth: 28 },
    questionCard: { backgroundColor: C.surface, borderRadius: 20, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: C.border },
    typePill: { alignSelf: 'flex-start', backgroundColor: C.tag, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4, marginBottom: 12 },
    typePillText: { fontSize: 10, fontWeight: '700', color: C.primaryLight, textTransform: 'uppercase', letterSpacing: 1.2 },
    questionText: { fontSize: 17, fontWeight: '600', color: C.text, lineHeight: 26 },
    option: { backgroundColor: C.surface, borderRadius: 14, borderWidth: 1.5, borderColor: C.border, paddingVertical: 15, paddingHorizontal: 14, marginBottom: 9, flexDirection: 'row', alignItems: 'center', gap: 12 },
    optionLabel: { width: 32, height: 32, borderRadius: 10, backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center' },
    optionLabelText: { fontSize: 13, fontWeight: '700', color: C.primary },
    optionText: { fontSize: 14, color: C.text, flex: 1, lineHeight: 20 },
    nextBtn: { borderRadius: 16, paddingVertical: 16, alignItems: 'center', marginTop: 6, backgroundColor: C.primary, flexDirection: 'row', justifyContent: 'center', gap: 8 },
    nextBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
    resultWrap: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 },
    resultIconCircle: { width: 96, height: 96, borderRadius: 48, backgroundColor: C.tag, alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
    resultLabel: { fontSize: 12, color: C.textSub, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 },
    resultScore: { fontSize: 80, fontWeight: '800', letterSpacing: -3 },
    resultCategory: { fontSize: 20, fontWeight: '700', color: C.text, marginTop: 4, textAlign: 'center' },
    resultSub: { fontSize: 13, color: C.textSub, marginTop: 8, textAlign: 'center', lineHeight: 20 },
    resultBtn: { backgroundColor: C.primary, borderRadius: 16, paddingVertical: 15, paddingHorizontal: 40, marginTop: 28, flexDirection: 'row', alignItems: 'center', gap: 8 },
    resultBtnText: { color: '#fff', fontSize: 15, fontWeight: '700' },
    resultBtnOutline: { marginTop: 12, paddingVertical: 8 },
    resultBtnOutlineText: { color: C.textSub, fontSize: 14 },
    title: { fontSize: 22, fontWeight: '800', color: C.text, letterSpacing: -0.5 },
    progressText: { fontSize: 12, color: C.textSub, marginTop: 4, marginBottom: 10 },
    resultText: { fontSize: 16, fontWeight: '700', textAlign: 'center', marginTop: 8 },
    backButton: { marginTop: 12, marginBottom: 4, alignSelf: 'flex-start', paddingVertical: 6 },
    backText: { fontSize: 14, fontWeight: '600', color: C.primary },
  });
}

export function useAppStyles() {
  const { C, dark, toggle } = useTheme();
  const s = useMemo(
    () => ({ home: makeHome(C), iq: makeIq(C) }),
    [C],
  );
  return { ...s, C, dark, toggle };
}
