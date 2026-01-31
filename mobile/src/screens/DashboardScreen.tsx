import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE ?? 'http://localhost:3000/api';

export function DashboardScreen() {
  const [totalBoxes, setTotalBoxes] = useState(0);

  useEffect(() => {
    fetch(`${API_BASE}/boxes`)
      .then((res) => res.json())
      .then((data) => setTotalBoxes(data.length))
      .catch(() => setTotalBoxes(0));
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Total Boxes</Text>
        <Text style={styles.cardValue}>{totalBoxes}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardLabel}>Recent Activity</Text>
        <Text style={styles.cardText}>Box created · Item added · Box relocated</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
  },
  cardLabel: {
    color: '#64748b',
  },
  cardValue: {
    fontSize: 28,
    fontWeight: '700',
  },
  cardText: {
    marginTop: 8,
  },
});
