import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { TextInputMask } from 'react-native-masked-text';
import styles from '../../assets/styles/estilo';
import regiones from '../../assets/data/regiones.json'; // Ajusta la ruta según sea necesario
import ciudadesData from '../../assets/data/ciudades.json'; // Ajusta la ruta según sea necesario

interface Ciudad {
  label: string;
  value: string;
}

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('+569');
  const [email, setEmail] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [occupation, setOccupation] = useState('');
  const [rut, setRut] = useState('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidRUT = (rut: string) => {
    const rutRegex = /^\d{1,2}\.\d{3}\.\d{3}-[kK\d]{1}$/;
    return rutRegex.test(rut);
  };

  const handleSubmit = () => {
    if (!name || !lastName || !phone || !email || !region || !city || !street || !number || !occupation || !rut) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    if (!isValidEmail(email)) {
      Alert.alert('Error', 'Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (!isValidRUT(rut)) {
      Alert.alert('Error', 'Por favor, ingresa un RUT válido en el formato xx.xxx.xxx-x.');
      return;
    }

    if (!phone.startsWith('+569')) {
      Alert.alert('Error', 'El número de teléfono debe comenzar con +569.');
      return;
    }

    const address = `${region}, ${city}, ${street}, ${number}`;
    Alert.alert('Formulario Enviado', `Nombre: ${name} ${lastName}\nRUT: ${rut}\nTeléfono: ${phone}\nCorreo: ${email}\nDirección: ${address}\nOcupación: ${occupation}`);
  };

  const ciudades: Ciudad[] = ciudadesData[region as keyof typeof ciudadesData] || [];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Personas</Text>
      <Text style={styles.subtitle}>Completa el formulario para registrarte.</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Ingresa tu nombre"
      />
      <TextInput
        style={styles.input}
        value={lastName}
        onChangeText={setLastName}
        placeholder="Ingresa tu apellido"
      />
      <TextInputMask
        style={styles.input}
        type={'custom'}
        options={{
          mask: '99.999.999-9'
        }}
        value={rut}
        onChangeText={setRut}
        placeholder="Ingresa tu RUT"
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        value={phone}
        onChangeText={setPhone}
        placeholder="Ingresa tu teléfono"
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Ingresa tu correo"
        keyboardType="email-address"
      />

      <Picker
        selectedValue={region}
        onValueChange={(itemValue: string) => {
          setRegion(itemValue);
          setCity(''); // Reset city when region changes
        }}
        style={styles.input}
      >
        <Picker.Item label="Selecciona tu región" value="" />
        {regiones.map((reg, index) => (
          <Picker.Item key={index} label={reg.label} value={reg.value} />
        ))}
      </Picker>

      <Picker
        selectedValue={city}
        onValueChange={(itemValue: string) => setCity(itemValue)}
        style={styles.input}
        enabled={region !== ''}
      >
        <Picker.Item label="Selecciona tu ciudad" value="" />
        {ciudades.map((ciudad, index) => (
          <Picker.Item key={index} label={ciudad.label} value={ciudad.value} />
        ))}
      </Picker>

      <View style={styles.addressContainer}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          value={street}
          onChangeText={setStreet}
          placeholder="Ingresa tu calle"
        />
        <TextInput
          style={[styles.input, styles.halfInput]}
          value={number}
          onChangeText={setNumber}
          placeholder="Ingresa el número"
          keyboardType="numeric"
        />
      </View>

      <TextInput
        style={styles.input}
        value={occupation}
        onChangeText={setOccupation}
        placeholder="Ingresa tu ocupación"
      />
      <Button title="Registrarse" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default RegisterForm;
