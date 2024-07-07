import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, Button, Modal, TouchableOpacity } from 'react-native';
import sectorStyles from './sectores';
import * as FileSystem from 'expo-file-system';

const SectorDescription = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showTechoDetails, setShowTechoDetails] = useState(false);
  const [showParedDetails, setShowParedDetails] = useState(false);
  const [showPisoDetails, setShowPisoDetails] = useState(false);

  const saveDataLocally = async (data) => {
    const fileUri = FileSystem.documentDirectory + 'inspectionData.json';
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
    alert('Data saved locally');
  };

  return (
    <ScrollView style={sectorStyles.container}>
      <View style={sectorStyles.tabs}>
        {['Piezas', 'Baños', 'Comedor', 'Garaje', 'Living'].map((category) => (
          <TouchableOpacity key={category} style={sectorStyles.tabButton} onPress={() => {
            setSelectedCategory(category);
            setModalVisible(true);
          }}>
            <Text style={sectorStyles.tabButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={sectorStyles.centeredView}>
          <View style={sectorStyles.modalView}>
            {['1', '2', '3', '4', '5', 'otro'].map((option) => (
              <TouchableOpacity
                key={option}
                style={sectorStyles.modalButton}
                onPress={() => {
                  console.log(`${selectedCategory} opción seleccionada: ${option}`);
                  setModalVisible(false);
                }}
              >
                <Text style={sectorStyles.modalText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setShowTechoDetails(!showTechoDetails)}>
        <Text style={sectorStyles.label}>Techo</Text>
      </TouchableOpacity>
      {showTechoDetails && (
        <View>
          <Text style={sectorStyles.label}>Material</Text>
          <View style={sectorStyles.checkboxContainer}>
            <Text>Yeso-cartón</Text>
            <TextInput style={sectorStyles.checkbox} />
            <Text>Cemento</Text>
            <TextInput style={sectorStyles.checkbox} />
            <Text>Madera</Text>
            <TextInput style={sectorStyles.checkbox} />
          </View>
          <Text style={sectorStyles.label}>Medidas</Text>
          <TextInput style={sectorStyles.input} placeholder="Largo" />
          <TextInput style={sectorStyles.input} placeholder="Ancho" />
          <TextInput style={sectorStyles.input} placeholder="Exceso Largo" />
          <TextInput style={sectorStyles.input} placeholder="Exceso Ancho" />
          <Button title="Guardar Datos" onPress={() => saveDataLocally({ techo: { material: 'Yeso-cartón', largo: 10, ancho: 20 } })} />
        </View>
      )}

      <TouchableOpacity onPress={() => setShowParedDetails(!showParedDetails)}>
        <Text style={sectorStyles.label}>Pared</Text>
      </TouchableOpacity>
      {showParedDetails && (
        <TextInput style={sectorStyles.input} placeholder="Descripción de la Pared" />
      )}

      <TouchableOpacity onPress={() => setShowPisoDetails(!showPisoDetails)}>
        <Text style={sectorStyles.label}>Piso</Text>
      </TouchableOpacity>
      {showPisoDetails && (
        <View>
          <Text style={sectorStyles.label}>Material del Piso</Text>
          <TextInput style={sectorStyles.input} placeholder="Tipo de Material" />
          <Text style={sectorStyles.label}>Dimensiones del Piso</Text>
          <TextInput style={sectorStyles.input} placeholder="Largo" />
          <TextInput style={sectorStyles.input} placeholder="Ancho" />
        </View>
      )}
    </ScrollView>
  );
};

export default SectorDescription;
