import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import siniestroStyles from './siniestroStyle';

const DescripcionSiniestro = () => {
  const [tipoSiniestro, setTipoSiniestro] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const enviarReporte = () => {
    Alert.alert("Reporte Enviado", "El reporte de siniestro ha sido enviado con éxito.");
  };

  return (
    <ScrollView style={siniestroStyles.container}>
      <Text style={siniestroStyles.header}>Descripción del Siniestro</Text>
      
      <TextInput
        style={siniestroStyles.input}
        placeholder="Tipo de Siniestro"
        value={tipoSiniestro}
        onChangeText={setTipoSiniestro}
      />
      
      <TextInput
        style={siniestroStyles.inputLarge}
        placeholder="Descripción del Siniestro"
        multiline
        numberOfLines={4}
        value={descripcion}
        onChangeText={setDescripcion}
      />
      
      <TouchableOpacity style={siniestroStyles.button} onPress={() => setModalVisible(true)}>
        <Text style={siniestroStyles.buttonText}>Adjuntar Fotos</Text>
      </TouchableOpacity>
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={siniestroStyles.centeredView}>
          <View style={siniestroStyles.modalView}>
            <Text style={siniestroStyles.modalText}>Aquí puedes adjuntar fotos del siniestro.</Text>
            <TouchableOpacity style={siniestroStyles.modalButton} onPress={() => setModalVisible(false)}>
              <Text style={siniestroStyles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <View style={siniestroStyles.buttonSpacer} />
      
      <TouchableOpacity style={siniestroStyles.button} onPress={enviarReporte}>
        <Text style={siniestroStyles.buttonText}>Enviar Reporte</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DescripcionSiniestro;
