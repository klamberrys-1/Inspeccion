import React from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClienteData from './components/ClienteData';
import SectorDescription from './components/Sectores/SectorDescription';
import DescripcionSiniestro from './components/Siniestro/SiniestroDescription';
import ReporteVisita from './components/ReporteVisita/ReporteVisita';

// Crear el objeto Tab
const Tab = createBottomTabNavigator();

const SampleComponent = () => {
  const data = [{ key: '1', value: 'Item 1' }, { key: '2', value: 'Item 2' }];

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text style={styles.item}>{item.value}</Text>}
      keyExtractor={(item) => item.key}
    />
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: route.name,
          tabBarActiveTintColor: '#e91e63',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: 'powderblue' },
        })}
      >
        <Tab.Screen
          name="Datos del Cliente"
          children={() => <ClienteData nombre="Juan Pérez" direccion="Calle Falsa 123" contacto="555-1234" />}
        />
        <Tab.Screen
          name="Descripción de Sectores"
          children={() => <SectorDescription sector="Tecnología" descripcion="Departamento encargado del desarrollo de software." />}
        />
        <Tab.Screen
          name="Descripción del Siniestro"
          children={() => <DescripcionSiniestro tipo="Incendio" descripcion="Incendio en el área de almacenamiento." />}
        />
        <Tab.Screen
          name="Reporte de Visita"
          component={ReporteVisita}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});
