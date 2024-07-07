import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import visitaStyles from './visitaStyle';
import * as FileSystem from 'expo-file-system';

const ReporteVisita = () => {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [comentarios, setComentarios] = useState('');
  const [visitas, setVisitas] = useState([]);

  useEffect(() => {
    const loadVisitas = async () => {
      const fileUri = FileSystem.documentDirectory + 'visitas.json';
      try {
        const data = await FileSystem.readAsStringAsync(fileUri);
        setVisitas(JSON.parse(data));
      } catch (error) {
        console.log('No previous visits found');
      }
    };
    loadVisitas();
  }, []);

  const guardarVisita = async () => {
    const newVisita = { fecha, hora, comentarios };
    const updatedVisitas = [...visitas, newVisita];
    setVisitas(updatedVisitas);
    const fileUri = FileSystem.documentDirectory + 'visitas.json';
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(updatedVisitas));
    alert('Visita guardada');
    setFecha('');
    setHora('');
    setComentarios('');
  };

  return (
    <ScrollView style={visitaStyles.container}>
      <Text style={visitaStyles.header}>Reporte de Visita</Text>
      
      <TextInput
        style={visitaStyles.input}
        placeholder="Fecha (DD/MM/AAAA)"
        value={fecha}
        onChangeText={setFecha}
      />
      
      <TextInput
        style={visitaStyles.input}
        placeholder="Hora (HH:MM)"
        value={hora}
        onChangeText={setHora}
      />
      
      <TextInput
        style={visitaStyles.inputLarge}
        placeholder="Comentarios"
        multiline
        numberOfLines={4}
        value={comentarios}
        onChangeText={setComentarios}
      />
      
      <TouchableOpacity style={visitaStyles.button} onPress={guardarVisita}>
        <Text style={visitaStyles.buttonText}>Guardar Visita</Text>
      </TouchableOpacity>

      <Text style={visitaStyles.header}>Visitas Anteriores</Text>
      
      <FlatList
        data={visitas}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={visitaStyles.visitaItem}>
            <Text style={visitaStyles.visitaText}>Fecha: {item.fecha}</Text>
            <Text style={visitaStyles.visitaText}>Hora: {item.hora}</Text>
            <Text style={visitaStyles.visitaText}>Comentarios: {item.comentarios}</Text>
          </View>
        )}
      />
    </ScrollView>
  );
};

export default ReporteVisita;
