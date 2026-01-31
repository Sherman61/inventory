import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { BoxesScreen } from './src/screens/BoxesScreen';
import { BoxDetailScreen } from './src/screens/BoxDetailScreen';
import { ScanScreen } from './src/screens/ScanScreen';

export type RootStackParamList = {
  Dashboard: undefined;
  Boxes: undefined;
  BoxDetail: { id: string };
  Scan: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Stack.Navigator>
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Boxes" component={BoxesScreen} />
        <Stack.Screen name="BoxDetail" component={BoxDetailScreen} />
        <Stack.Screen name="Scan" component={ScanScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
