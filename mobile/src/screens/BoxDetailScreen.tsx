import { RouteProp, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { RootStackParamList } from '../../App';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE ?? 'http://localhost:3000/api';

type BoxDetail = {
  id: number;
  label?: string | null;
  barcode: string;
  location: string;
  importDate: string;
  items: { id: number; name: string; quantity: number; unit?: string | null }[];
};

export function BoxDetailScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'BoxDetail'>>();
  const [box, setBox] = useState<BoxDetail | null>(null);

  useEffect(() => {
    fetch(`${API_BASE}/boxes/${route.params.id}`)
      .then((res) => res.json())
      .then((data) => setBox(data))
      .catch(() => setBox(null));
  }, [route.params.id]);

  if (!box) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{box.label ?? `Box #${box.id}`}</Text>
      <Text style={styles.subtitle}>{box.barcode}</Text>
      <Text style={styles.subtitle}>Location: {box.location}</Text>
      <Text style={styles.subtitle}>
        Imported: {new Date(box.importDate).toLocaleDateString()}
      </Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Items</Text>
        {box.items.length === 0 && <Text>No items in this box.</Text>}
        {box.items.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text>{item.name}</Text>
            <Text>
              {item.quantity} {item.unit ?? 'units'}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    gap: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
  },
  subtitle: {
    color: '#64748b',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  cardTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
});
