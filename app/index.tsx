import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../components/PrimaryButton';
import { useQuiz } from '../context/QuizContext';
import { CATEGORIES } from '../data/questions';
import { colors } from '../styles';
import { MINDORAIQ_DISCLAIMER } from '../utils/scoring';

export default function HomeScreen() {
  const router = useRouter();
  const { userName, setUserName, history } = useQuiz();

  const [tempName, setTempName] = useState<string>(userName || 'Gilang');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const totalQuestions = CATEGORIES.reduce((acc, cat) => acc + cat.questionCount, 0);

  const handleSaveName = () => {
    if (tempName.trim().length > 0) {
      setUserName(tempName.trim());
    } else {
      setTempName(userName || 'Gilang');
    }
    setIsEditing(false);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollArea}
        showsVerticalScrollIndicator={false}
      >
        < style={styles.headerCard}>
          <View style={styles.brandRow}>
            <View style={styles.logoMark}>
              <Text style={styles.logoMarkText}>M</Text>
            </View>
            <View style={styles.brandTextCol}>
              <Text style={styles.brandTitle}>MindoraIQ</Text>
              <Text style={styles.brandSubtitle}>Praktikum Pemrograman Mobile</Text>
            </View>
          </View>

          < style={styles.studentCard}>
            <Text style={styles.studentLabel}>Nama Peserta / Mahasiswa</Text>
            {isEditing ? (
              <View style={styles.editRow}>
                <TextInput
                  style={styles.textInput}
                  value={tempName}
                  onChangeText={setTempName}
                  placeholder="Ketik nama Anda..."
                  placeholderTextColor={colors.textMuted}
                  maxLength={30}
                  autoFocus
                />
                <Pressable style={styles.saveBtn} onPress={handleSaveName}>
                  <Text style={styles.saveBtnText}>Simpan</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable
                style={styles.nameRow}
                onPress={() => setIsEditing(true)}
              >
                <Text style={styles.studentName}>{userName || 'Gilang'}</Text>
                <View style={styles.editPencil}>
                  <Ionicons name="pencil-sharp" size={14} color={colors.primaryLight} />
                  <Text style={styles.editHint}>Ubah</Text>
                </View>
              </Pressable>
            )}

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{CATEGORIES.length}</Text>
            <Text style={styles.statDesc}>Kategori</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{totalQuestions}</Text>
            <Text style={styles.statDesc}>Total Soal</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{history.length}</Text>
            <Text style={styles.statDesc}>Sesi Riwayat</Text>
          </View>
        </View>

        <View style={styles.actionBlock}>
          <PrimaryButton
            title="Mulai Pengerjaan Tes"
            icon="play"
            onPress={() => router.push('/category')}
            size="lg"
          />
          <PrimaryButton
            title={`Lihat Riwayat Hasil (${history.length})`}
            icon="time-outline"
            variant="outline"
            onPress={() => router.push('/history')}
            style={styles.secondaryAction}
          />
        </View>

        <View style={styles.sectionWrap}>
          <View style={styles.sectionTop}>
            <Text style={styles.sectionHeader}>Daftar Kategori Soal</Text>
            <Text style={styles.sectionNote}>Pilih untuk mulai cepat</Text>
          </View>

          <View style={styles.categoryStack}>
            {CATEGORIES.map((cat) => (
              <Pressable
                key={cat.id}
                style={styles.catItem}
                onPress={() => router.push({ pathname: '/category', params: { open: cat.id } })}
              >
                <View style={styles.catLeft}>
                  <View style={styles.catIconWrap}>
                    <Ionicons name={cat.icon as any} size={20} color={colors.primaryLight} />
                  </View>
                  <View>
                    <Text style={styles.catTitle}>{cat.name}</Text>
                    <Text style={styles.catDetail}>{cat.questionCount} butir latihan</Text>
                  </View>
                </View>

                <Ionicons name="chevron-forward" size={18} color={colors.primaryLight} />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.footerNote}>
          <Ionicons name="information-circle-outline" size={16} color={colors.primaryLight} />
          <Text style={styles.footerNoteText}>{MINDORAIQ_DISCLAIMER}</Text>
        </View>

        <View style={styles.authorFooter}>
          <Text style={styles.authorText}>MindoraIQ • Tugas Praktikum Pemrograman Mobile</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollArea: {
    padding: 18,
    backgroundColor: colors.background,
    minHeight: '100%',
  },
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 20,
    marginTop: -8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoMark: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  logoMarkText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textOnPrimary,
  },
  brandTextCol: {
    flex: 1,
  },
  brandTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.3,
  },
  brandSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  studentCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  studentLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 2,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  editPencil: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  editHint: {
    fontSize: 12,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  editRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 2,
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: colors.surfaceElevated,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  saveBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 8,
  },
  saveBtnText: {
    color: colors.textOnPrimary,
    fontSize: 13,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    paddingVertical: 14,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  statDesc: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 3,
  },
  actionBlock: {
    gap: 10,
    marginBottom: 20,
  },
  secondaryAction: {
    backgroundColor: colors.surfaceAlt,
  },
  sectionWrap: {
    marginBottom: 20,
  },
  sectionTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionNote: {
    fontSize: 12,
    color: colors.textMuted,
  },
  categoryStack: {
    gap: 10,
  },
  catItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  catLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  catIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  catTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  catDetail: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  footerNote: {
    flexDirection: 'row',
    gap: 10,
    backgroundColor: colors.surfaceAlt,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  footerNoteText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },
  authorFooter: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  authorText: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
