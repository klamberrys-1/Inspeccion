import React from 'react';
import { View, Text } from 'react-native';
import styles from '../styles/styles';

const ClienteData = ({ nombre, direccion, contacto }) => {
  return (
    <View style={styles.clienteContainer}>
      <Text style={styles.clienteTitle}>Datos del Cliente</Text>
      <Text style={styles.clienteText}>Nombre: {nombre}</Text>
      <Text style={styles.clienteText}>Dirección: {direccion}</Text>
      <Text style={styles.clienteText}>Contacto: {contacto}</Text>
    </View>
  );
};

export default ClienteData;
