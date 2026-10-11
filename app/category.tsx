import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CATEGORIES } from '../data/questions';
import { colors } from '../styles';

export default function CategoryScreen() {
  const router = useRouter();

  const handleSelectCategory = (categoryId: string) => {
    router.push({
      pathname: '/quiz',
      params: { category: categoryId },
    });
  };

  const handleSelectAll = () => {
    router.push({
      pathname: '/quiz',
      params: { category: 'all' },
    });
  };

  return (
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

      <Pressable style={styles.allBox} onPress={handleSelectAll}>
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
            onPress={() => handleSelectCategory(cat.id)}
          >
            <View style={styles.cardHeader}>
              <View style={styles.iconBox}>
                <Ionicons name={cat.icon as any} size={20} color={colors.primary} />
              </View>
              <View style={styles.countTag}>
                <Text style={styles.countTagText}>{cat.questionCount} Soal</Text>
              </View>
            </View>

            <Text style={styles.title}>{cat.name}</Text>
            <Text style={styles.desc}>{cat.description}</Text>

            <View style={styles.cardAction}>
              <Text style={styles.actionText}>Buka Soal</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </View>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: colors.dark,
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
  },
  allHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  allTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  allTagText: {
    fontSize: 11,
    color: colors.textInverse,
    fontWeight: '600',
  },
  allBadge: {
    fontSize: 12,
    color: '#93C5FD',
    fontWeight: '600',
  },
  allTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textInverse,
    marginBottom: 6,
  },
  allDesc: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 18,
    marginBottom: 14,
  },
  allFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
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
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: colors.primarySoft,
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
    color: colors.primary,
  },
});
