// components/SectorDescription.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SectorDescription = ({ sector, descripcion }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sector: {sector}</Text>
      <Text>Descripción: {descripcion}</Text>
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

export default SectorDescription;
