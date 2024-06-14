import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button, Image, Alert } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

function Siniestro() {
  const [sector, setSector] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoSiniestro, setTipoSiniestro] = useState('');
  const [foto, setFoto] = useState(null);
  const [contactoEmergencia, setContactoEmergencia] = useState('');

  const tomarFoto = () => {
    launchCamera({}, response => {
      if (response.assets) {
        setFoto(response.assets[0].uri);
      }
    });
  };

  const enviarAlertaEmergencia = () => {
    Alert.alert(
      "Enviar Alerta de Emergencia",
      "¿Estás seguro de que deseas enviar una alerta de emergencia?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Enviar", onPress: () => console.log("Alerta enviada") }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.header}>Reporte de Siniestro</Text>
        
        <Picker
          selectedValue={tipoSiniestro}
          onValueChange={(itemValue) => setTipoSiniestro(itemValue)}
        >
          <Picker.Item label="Incendio" value="incendio" />
          <Picker.Item label="Inundación" value="inundacion" />
          <Picker.Item label="Robo" value="robo" />
          <Picker.Item label="Daño estructural" value="dano_estructural" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Sector afectado (ej. Cocina, Baño...)"
          value={sector}
          onChangeText={setSector}
        />
        
        <TextInput
          style={styles.inputLarge}
          placeholder="Descripción del siniestro"
          multiline
          numberOfLines={4}
          value={descripcion}
          onChangeText={setDescripcion}
        />

        <TextInput
          style={styles.input}
          placeholder="Contacto de emergencia"
          value={contactoEmergencia}
          onChangeText={setContactoEmergencia}
        />

        <Button title="Tomar Foto del Daño" onPress={tomarFoto} />
        {foto && <Image source={{ uri: foto }} style={styles.image} />}

        <View style={styles.buttonSpacer} />
        
        <Button title="Enviar Reporte" onPress={() => console.log("Reporte enviado")} />

        <View style={styles.buttonSpacer} />
        
        <Button title="Alerta de Emergencia" onPress={enviarAlertaEmergencia} color="red" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  form: {
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
  inputLarge: {
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
    alignSelf: 'center',
  },
  buttonSpacer: {
    height: 20,
  }
});

export default Siniestro;
