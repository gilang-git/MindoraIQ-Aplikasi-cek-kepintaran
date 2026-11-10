import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles";
import { fetchServerTime, ServerTimeData } from "../utils/timeApi";

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
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceAlt,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    gap: 8,
  },
  iconWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoCol: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textPrimary,
    marginTop: 1,
  },
  spinner: {
    alignSelf: "flex-start",
    marginTop: 2,
  },
});
