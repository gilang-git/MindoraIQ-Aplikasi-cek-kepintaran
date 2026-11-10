import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../styles';
import { fetchServerTime, ServerTimeData } from '../utils/timeApi';

export default function TimeWidget() {
  const [timeData, setTimeData] = useState<ServerTimeData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let active = true;
    fetchServerTime()
      .then((data) => {
        if (active) {
          setTimeData(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.iconWrap}>
        <Ionicons name="time-outline" size={16} color={colors.primaryLight} />
      </View>
      <View style={styles.infoCol}>
        <Text style={styles.label}>Waktu Server (WIB)</Text>
        {loading || !timeData ? (
          <ActivityIndicator
            size="small"
            color={colors.primaryLight}
            style={styles.spinner}
          />
        ) : (
          <Text style={styles.value}>
            {timeData.time} • {timeData.dayOfWeek}, {timeData.date}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
  },
  iconWrap: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoCol: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textInverse,
    marginTop: 1,
  },
  spinner: {
    alignSelf: 'flex-start',
    marginTop: 2,
  },
});
