import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import ClienteData from './components/ClienteData';
import SectorDescription from './components/SectorDescription';
import SiniestroDescription from './components/SiniestroDescription';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <ClienteData nombre="Juan Pérez" direccion="Calle Falsa 123" contacto="555-1234" />
      <SectorDescription sector="Tecnología" descripcion="Departamento encargado del desarrollo de software." />
      <SiniestroDescription tipo="Incendio" descripcion="Incendio en el área de almacenamiento." />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
