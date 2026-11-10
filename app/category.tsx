import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../data/questions';
import { colors } from '../styles';
import { useQuiz } from '../context/QuizContext';
import PrimaryButton from '../components/PrimaryButton';

interface ConfirmationData {
  id: string;
  name: string;
  count: number;
  description: string;
}

export default function CategoryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ open?: string }>();
  const { userName } = useQuiz();
  const [selectedCategory, setSelectedCategory] = useState<ConfirmationData | null>(null);

  React.useEffect(() => {
    if (params.open) {
      if (params.open === 'all') {
        handleOpenConfirmAll();
      } else {
        handleOpenConfirm(params.open);
      }
    }
  }, [params.open]);

  const handleOpenConfirm = (categoryId: string) => {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    if (cat) {
      setSelectedCategory({
        id: cat.id,
        name: cat.name,
        count: cat.questionCount,
        description: cat.description,
      });
    }
  };

  const handleOpenConfirmAll = () => {
    setSelectedCategory({
      id: 'all',
      name: 'Semua Materi (Campuran)',
      count: 20,
      description: 'Mencakup gabungan soal Logika, Pola Angka, Penalaran Verbal, dan Pola Gambar sekaligus.',
    });
  };

  const handleStartQuiz = () => {
    if (!selectedCategory) return;
    const catId = selectedCategory.id;
    setSelectedCategory(null);
    router.push({
      pathname: '/quiz',
      params: { category: catId },
    });
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.topInfo}>
          <Text style={styles.pageTitle}>Pilih Bidang Uji</Text>
          <Text style={styles.pageSubtitle}>
            Tentukan topik tes yang ingin Anda kerjakan atau pilih tes komprehensif seluruh materi.
          </Text>
        </View>

        <Pressable style={styles.allBox} onPress={handleOpenConfirmAll}>
          <View style={styles.allHeader}>
            <View style={styles.allTag}>
              <Text style={styles.allTagText}>Latihan Lengkap</Text>
            </View>
            <Text style={styles.allBadge}>20 Butir Soal</Text>
          </View>

          <Text style={styles.allTitle}>Semua Materi (Campuran)</Text>
          <Text style={styles.allDesc}>
            Mencakup gabungan soal Logika, Pola Angka, Penalaran Verbal, dan Pola Gambar sekaligus.
          </Text>

          <View style={styles.allFooter}>
            <Text style={styles.startLink}>Mulai Seluruh Soal</Text>
            <Ionicons name="arrow-forward" size={16} color={colors.primaryLight} />
          </View>
        </Pressable>

        <View style={styles.dividerBlock}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>ATAU PILIH SALAH SATU</Text>
          <View style={styles.line} />
        </View>

        <View style={styles.categoryStack}>
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              style={styles.card}
              onPress={() => handleOpenConfirm(cat.id)}
            >
              <View style={styles.cardHeader}>
                <View style={styles.iconBox}>
                  <Ionicons name={cat.icon as any} size={20} color={colors.primaryLight} />
                </View>
                <View style={styles.countTag}>
                  <Text style={styles.countTagText}>{cat.questionCount} Soal</Text>
                </View>
              </View>

              <Text style={styles.title}>{cat.name}</Text>
              <Text style={styles.desc}>{cat.description}</Text>

              <View style={styles.cardAction}>
                <Text style={styles.actionText}>Buka Soal</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.primaryLight} />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {selectedCategory && (
        <Modal
          visible={true}
          transparent
          animationType="fade"
          onRequestClose={handleCloseModal}
        >
          <View style={styles.modalBackdrop}>
            <View style={styles.modalCard}>
              <View style={styles.modalIconWrap}>
                <Ionicons name="clipboard-outline" size={26} color={colors.primaryLight} />
              </View>

              <Text style={styles.modalTitle}>Konfirmasi Mulai Tes</Text>
              <Text style={styles.modalSubtitle}>
                Periksa rincian sesi tes berikut sebelum Anda mulai mengerjakan.
              </Text>

              <View style={styles.modalDetailsBox}>
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Kategori</Text>
                  <Text style={styles.detailValueHighlight}>{selectedCategory.name}</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Jumlah Soal</Text>
                  <Text style={styles.detailValue}>{selectedCategory.count} Butir Soal</Text>
                </View>

                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Nama Peserta</Text>
                  <Text style={styles.detailValue}>{userName || 'Gilang'}</Text>
                </View>

                <View style={[styles.detailRow, { borderBottomWidth: 0 }]}>
                  <Text style={styles.detailLabel}>Format Ujian</Text>
                  <Text style={styles.detailValue}>Pilihan Ganda (Tunggal)</Text>
                </View>
              </View>

              <View style={styles.modalNotice}>
                <Ionicons name="information-circle-outline" size={16} color={colors.primaryLight} />
                <Text style={styles.modalNoticeText}>
                  Setiap butir soal wajib dijawab sebelum lanjut. Skor akhir dihitung otomatis setelah pengerjaan selesai.
                </Text>
              </View>

              <View style={styles.modalActionCol}>
                <PrimaryButton
                  title="Mulai Pengerjaan Sekarang"
                  icon="play"
                  onPress={handleStartQuiz}
                  size="lg"
                />
                <PrimaryButton
                  title="Batal"
                  variant="outline"
                  onPress={handleCloseModal}
                  style={styles.cancelBtn}
                />
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 18,
    paddingBottom: 40,
  },
  topInfo: {
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  pageSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginTop: 4,
  },
  allBox: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: colors.primaryBorder,
  },
  allHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  allTag: {
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
  },
  allTagText: {
    fontSize: 11,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  allBadge: {
    fontSize: 12,
    color: colors.primaryLight,
    fontWeight: '600',
  },
  allTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  allDesc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 14,
  },
  allFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
  },
  startLink: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaryLight,
  },
  dividerBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
    gap: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  categoryStack: {
    gap: 12,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.borderStrong,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countTag: {
    backgroundColor: colors.surfaceAlt,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.border,
  },
  countTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  cardAction: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.primaryLight,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: colors.borderStrong,
    padding: 20,
    alignItems: 'center',
  },
  modalIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.primaryBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 18,
  },
  modalDetailsBox: {
    width: '100%',
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  detailValue: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  detailValueHighlight: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primaryLight,
  },
  modalNotice: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: colors.primarySoft,
    padding: 10,
    borderRadius: 10,
    marginBottom: 18,
    width: '100%',
  },
  modalNoticeText: {
    flex: 1,
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 16,
  },
  modalActionCol: {
    width: '100%',
    gap: 8,
  },
  cancelBtn: {
    backgroundColor: colors.surfaceAlt,
  },
});
