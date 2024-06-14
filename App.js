import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ClienteData from './components/ClienteData';
import SectorDescription from './components/SectorDescription';
import SiniestroDescription from './components/SiniestroDescription';

// Crear el objeto Tab
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: 'powderblue' },
        }}
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
          children={() => <SiniestroDescription tipo="Incendio" descripcion="Incendio en el área de almacenamiento." />}
        />
      </Tab.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
