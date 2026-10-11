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
import PrimaryButton from '../components/PrimaryButton';

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
      <View style={styles.headerBox}>
        <Text style={styles.pageTitle}>Pilih Bidang Tes</Text>
        <Text style={styles.pageSubtitle}>
          Pilih salah satu spesialisasi kognitif atau ikuti simulasi komprehensif seluruh kategori.
        </Text>
      </View>

      {/* Comprehensive Test Card (Campuran Semua Kategori) */}
      <Pressable
        style={styles.allCard}
        onPress={handleSelectAll}
      >
        <View style={styles.allCardHeader}>
          <View style={styles.allIconBadge}>
            <Ionicons name="trophy-outline" size={24} color="#FBBF24" />
          </View>
          <View style={styles.allBadge}>
            <Text style={styles.allBadgeText}>Simulasi Penuh</Text>
          </View>
        </View>

        <Text style={styles.allCardTitle}>Semua Bidang Kognitif (Campuran)</Text>
        <Text style={styles.allCardDesc}>
          Uji seluruh dimensi kemampuan logika, pola deret angka, verbal, dan penalaran spasial sekaligus (20 Soal).
        </Text>

        <View style={styles.allCardFooter}>
          <Text style={styles.allCardMeta}>20 Soal • Estimasi 15 Menit</Text>
          <Ionicons name="arrow-forward-circle" size={24} color={colors.textWhite} />
        </View>
      </Pressable>

      <View style={styles.sectionDivider}>
        <View style={styles.dividerLine} />
        <Text style={styles.dividerText}>ATAU PILIH KATEGORI SPESIFIK</Text>
        <View style={styles.dividerLine} />
      </View>

      {/* List of 4 Categories */}
      <View style={styles.categoryList}>
        {CATEGORIES.map((cat) => {
          return (
            <Pressable
              key={cat.id}
              style={styles.card}
              onPress={() => handleSelectCategory(cat.id)}
            >
              <View style={styles.cardTopRow}>
                <View
                  style={[
                    styles.iconCircle,
                    { backgroundColor: cat.accentColor + '15' },
                  ]}
                >
                  <Ionicons
                    name={cat.icon as any}
                    size={26}
                    color={cat.accentColor}
                  />
                </View>
                <View style={styles.badgeCount}>
                  <Text style={[styles.badgeCountText, { color: cat.accentColor }]}>
                    {cat.questionCount} Soal
                  </Text>
                </View>
              </View>

              <Text style={styles.catTitle}>{cat.name}</Text>
              <Text style={styles.catDescription}>{cat.description}</Text>

              <View style={styles.cardActionRow}>
                <Text style={[styles.actionLinkText, { color: cat.accentColor }]}>
                  Mulai Kuis
                </Text>
                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={cat.accentColor}
                />
              </View>
            </Pressable>
          );
        })}
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
    padding: 20,
    paddingBottom: 40,
  },
  headerBox: {
    marginBottom: 20,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  pageSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginTop: 4,
  },
  allCard: {
    backgroundColor: colors.primaryDark,
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 10,
    elevation: 3,
  },
  allCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  allIconBadge: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  allBadge: {
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  allBadgeText: {
    color: '#FBBF24',
    fontSize: 12,
    fontWeight: '700',
  },
  allCardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textWhite,
    marginBottom: 6,
  },
  allCardDesc: {
    fontSize: 13,
    color: '#CBD5E1',
    lineHeight: 18,
    marginBottom: 16,
  },
  allCardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingTop: 12,
  },
  allCardMeta: {
    fontSize: 13,
    color: '#93C5FD',
    fontWeight: '600',
  },
  sectionDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 14,
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  categoryList: {
    gap: 14,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#0F172A',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeCount: {
    backgroundColor: colors.cardAlt,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeCountText: {
    fontSize: 12,
    fontWeight: '700',
  },
  catTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  catDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 14,
  },
  cardActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
  },
  actionLinkText: {
    fontSize: 14,
    fontWeight: '700',
  },
});
