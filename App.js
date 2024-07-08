import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ClienteData from './components/ClienteData';
import SectorDescription from './components/Sectores/SectorDescription';
import DescripcionSiniestro from './components/Siniestro/SiniestroDescription';
import ReporteVisita from './components/ReporteVisita/ReporteVisita';

// Crear el objeto Tab
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Datos del Cliente') {
              iconName = focused ? 'ios-person' : 'ios-person-outline';
            } else if (route.name === 'Descripción de Sectores') {
              iconName = focused ? 'ios-business' : 'ios-business-outline';
            } else if (route.name === 'Descripción del Siniestro') {
              iconName = focused ? 'ios-alert' : 'ios-alert-outline';
            } else if (route.name === 'Reporte de Visita') {
              iconName = focused ? 'ios-calendar' : 'ios-calendar-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
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
