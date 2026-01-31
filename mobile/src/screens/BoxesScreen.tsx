import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const API_BASE = process.env.EXPO_PUBLIC_API_BASE ?? 'http://localhost:3000/api';

type Box = {
  id: number;
  barcode: string;
  label?: string | null;
  location: string;
};

export function BoxesScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [query, setQuery] = useState('');
  const [boxes, setBoxes] = useState<Box[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const search = query ? `?search=${encodeURIComponent(query)}` : '';
      fetch(`${API_BASE}/boxes${search}`)
        .then((res) => res.json())
        .then((data) => setBoxes(data))
        .catch(() => setBoxes([]));
    }, 300);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search boxes"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={boxes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('BoxDetail', { id: String(item.id) })}
          >
            <View>
              <Text style={styles.itemTitle}>{item.label ?? `Box #${item.id}`}</Text>
              <Text style={styles.itemSub}>{item.barcode}</Text>
            </View>
            <Text style={styles.chip}>{item.location}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8fafc',
  },
  input: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  item: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontWeight: '600',
  },
  itemSub: {
    color: '#64748b',
    fontSize: 12,
  },
  chip: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
