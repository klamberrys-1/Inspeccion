// components/ClienteData.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ClienteData = ({ nombre, direccion, contacto }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Datos del Cliente</Text>
      <Text>Nombre: {nombre}</Text>
      <Text>Dirección: {direccion}</Text>
      <Text>Contacto: {contacto}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ClienteData;
