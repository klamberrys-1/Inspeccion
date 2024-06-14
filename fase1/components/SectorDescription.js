import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, Modal, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showTechoDetails, setShowTechoDetails] = useState(false);
  const [showParedDetails, setShowParedDetails] = useState(false);
  const [showPisoDetails, setShowPisoDetails] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.header}>Datos del cliente</Text>
        <Text style={styles.header}>Descripción de sectores</Text>
        <Text style={styles.header}>Descripción del siniestro</Text>
      </View>

      <View style={styles.tabs}>
        {['Piezas', 'Baños', 'Comedor', 'Garaje', 'Living'].map((category) => (
          <Button key={category} title={category} onPress={() => {
            setSelectedCategory(category);
            setModalVisible(true);
          }} />
        ))}
      </View>
       
      {/* Modal Implementation */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {['1', '2', '3', '4', '5', 'otro'].map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.modalButton}
                onPress={() => {
                  console.log(`${selectedCategory} opción seleccionada: ${option}`);
                  setModalVisible(false);
                }}
              >
                <Text style={styles.modalText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

      <TouchableOpacity onPress={() => setShowTechoDetails(!showTechoDetails)}>
        <Text style={styles.label}>Techo</Text>
      </TouchableOpacity>
      {showTechoDetails && (
        <View>
          <Text style={styles.label}>Material</Text>
          <View style={styles.checkboxContainer}>
            <Text>Yeso-cartón</Text>
            <TextInput style={styles.checkbox} />
            <Text>Cemento</Text>
            <TextInput style={styles.checkbox} />
            <Text>Madera</Text>
            <TextInput style={styles.checkbox} />
          </View>
          <Text style={styles.label}>Medidas</Text>
          <TextInput style={styles.input} placeholder="Largo" />
          <TextInput style={styles.input} placeholder="Ancho" />
          <TextInput style={styles.input} placeholder="Exceso Largo" />
          <TextInput style={styles.input} placeholder="Exceso Ancho" />
        </View>
      )}

      <TouchableOpacity onPress={() => setShowParedDetails(!showParedDetails)}>
        <Text style={styles.label}>Pared</Text>
      </TouchableOpacity>
      {showParedDetails && (
        <TextInput style={styles.input} placeholder="Descripción de la Pared" />
      )}

      <TouchableOpacity onPress={() => setShowPisoDetails(!showPisoDetails)}>
        <Text style={styles.label}>Piso</Text>
      </TouchableOpacity>
      {showPisoDetails && (
        <View>
          <Text style={styles.label}>Material del Piso</Text>
          <TextInput style={styles.input} placeholder="Tipo de Material" />
          <Text style={styles.label}>Dimensiones del Piso</Text>
          <TextInput style={styles.input} placeholder="Largo" />
          <TextInput style={styles.input} placeholder="Ancho" />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  header: {
    backgroundColor: '#add8e6',
    padding: 10,
    fontWeight: 'bold',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: 'gray',
    borderWidth: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalButton: {
    backgroundColor: "#F194FF",
    padding: 10,
    elevation: 2,
    marginVertical: 5
  },
  modalText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  }
});

export default App;
