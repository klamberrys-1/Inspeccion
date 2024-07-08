import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, Button, TouchableOpacity, View, Switch, Alert } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import * as FileSystem from 'expo-file-system';
import * as XLSX from 'xlsx';
import * as MediaLibrary from 'expo-media-library';
import * as IntentLauncher from 'expo-intent-launcher';  // Asegúrate de instalar expo-intent-launcher

// Import JSON data
import elementsData from './elements.json';

const sectorStyles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  tabs: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  tabButton: { backgroundColor: '#ddd', padding: 10, borderRadius: 5 },
  tabButtonText: { fontSize: 16 },
  sectionContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
  input: { borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 8, marginBottom: 10 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  dropdownContainer: { marginVertical: 10 },
  dropdown: { borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 8, marginBottom: 10 },
  quantityContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  quantityInput: { borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 8, flex: 1, marginLeft: 10 }
});

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sectors, setSectors] = useState([]);
  const [measurements, setMeasurements] = useState({ largo: '', ancho: '', alto: '' });
  const [switches, setSwitches] = useState({});
  const [details, setDetails] = useState({});
  const [pisoType, setPisoType] = useState('');
  const [muroType, setMuroType] = useState('');
  const [cieloType, setCieloType] = useState('');

  useEffect(() => {
    const initialSwitches = {
      Fisuras: false,
      Artefactos: false,
      PicadoSuperficie: false,
      Pisos: false,
      Muros: false,
      Cielos: false
    };
    const initialDetails = {
      Fisuras: {},
      Artefactos: {},
      PicadoSuperficie: {},
      Pisos: {},
      Muros: {},
      Cielos: {}
    };
    setSwitches(initialSwitches);
    setDetails(initialDetails);
  }, []);

  const handleSwitchChange = (category, value) => {
    setSwitches({ ...switches, [category]: value });
  };

  const handleDetailChange = (category, detail, value) => {
    const categoryPath = category.split('.');
    if (categoryPath.length === 2) {
      setDetails((prevDetails) => ({
        ...prevDetails,
        [categoryPath[0]]: {
          ...prevDetails[categoryPath[0]],
          [categoryPath[1]]: {
            ...prevDetails[categoryPath[0]][categoryPath[1]],
            [detail]: value
          }
        }
      }));
    } else {
      setDetails((prevDetails) => ({
        ...prevDetails,
        [category]: {
          ...prevDetails[category],
          [detail]: value
        }
      }));
    }
  };

  const handleAddSector = () => {
    const newSector = {
      category: selectedCategory,
      measurements,
      switches,
      pisoType,
      muroType,
      cieloType,
      details,
    };
    setSectors([...sectors, newSector]);
    setMeasurements({ largo: '', ancho: '', alto: '' });
    setPisoType('');
    setMuroType('');
    setCieloType('');
    setDetails({
      Fisuras: {},
      Artefactos: {},
      PicadoSuperficie: {},
      Pisos: {},
      Muros: {},
      Cielos: {}
    });
    setSwitches({
      Fisuras: false,
      Artefactos: false,
      PicadoSuperficie: false,
      Pisos: false,
      Muros: false,
      Cielos: false
    });
  };

  const saveQRAsImage = async (qrImagesDirectory, fileName, imageSource) => {
    //Get folder
    const folder = await FileSystem.getInfoAsync(qrImagesDirectory);

    // Check if folder does not exist, create one furthermore
    if (!folder.exists) {
      await FileSystem.makeDirectoryAsync(qrImagesDirectory);
    }

    // Write file into the source of program
    await FileSystem.writeAsStringAsync(
      qrImagesDirectory + fileName,
      imageSource,
      {
        encoding: FileSystem.EncodingType.Base64,
      }
    );
    const ans = await FileSystem.getInfoAsync(qrImagesDirectory + fileName);

    // Make the file accessible through mobile phone
    FileSystem.getContentUriAsync(ans.uri).then((cUri) => {
      //Open save image options
      IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
        data: cUri,
        flags: 1,
      });
    });
  };

  const saveDataToExcel = async (sectors) => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
  
    if (status !== 'granted') {
      alert('Se requieren permisos de almacenamiento para guardar el archivo.');
      return;
    }
  
    const wb = XLSX.utils.book_new();
    const wsData = [];
  
    // Encabezado inicial del Excel
    wsData.push(["SECTOR", "Medidas", "", "", "", ""]);
    wsData.push(["Característica", "Cantidad", "Precio Unitario", "Precio Total", "% Dcto.", "Total Determinado"]);
  
    // Función para agregar filas de detalles a la tabla
    const addDetailRows = (details, category) => {
      Object.entries(details).forEach(([key, value]) => {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            const price = elementsData[category]?.[key]?.[subKey]?.precio || 0;
            const quantity = parseFloat(subValue) || 1;
            const totalPrice = price * quantity;
            wsData.push([subKey, quantity, price, totalPrice, "0%", totalPrice]);
          });
        } else {
          const price = elementsData[category]?.[key]?.precio || 0;
          const quantity = parseFloat(value) || 1;
          const totalPrice = price * quantity;
          wsData.push([key, quantity, price, totalPrice, "0%", totalPrice]);
        }
      });
    };
  
    // Agregar datos de cada sector
    sectors.forEach((sector) => {
      // Agregar el encabezado del sector y las medidas
      wsData.push([sector.category, `${sector.measurements.largo} x ${sector.measurements.ancho} x ${sector.measurements.alto}`, "", "", "", ""]);
  
      // Agregar los detalles de los elementos seleccionados
      Object.keys(sector.details).forEach((category) => {
        wsData.push([category]);  // Agregar el nombre del elemento como sub-encabezado
        addDetailRows(sector.details[category], category);  // Agregar filas de detalles con precios
      });
  
      wsData.push([]);  // Fila vacía para separar sectores
    });
  
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Sectores");
  
    const wbout = XLSX.write(wb, { type: 'base64', bookType: 'xlsx' });
    const fileUri = FileSystem.documentDirectory + 'datos.xlsx';
  
    try {
      await FileSystem.writeAsStringAsync(fileUri, wbout, { encoding: FileSystem.EncodingType.Base64 });
      saveQRAsImage(FileSystem.documentDirectory + 'Download/', 'datos.xlsx', wbout);
      alert('Datos guardados en la carpeta de Descargas');
    } catch (error) {
      alert('Error al guardar el archivo: ' + error.message);
    }
  };
  
  
  

  const renderDetail = (details) => {
    if (typeof details === 'object') {
      return Object.entries(details).map(([key, value]) => (
        typeof value === 'object' ? 
          Object.entries(value).map(([subKey, subValue]) => (
            <Text key={subKey}>{subKey}: {subValue}</Text>
          )) :
          <Text key={key}>{key}: {value}</Text>
      ));
    }
    return <Text>{details}</Text>;
  };

  return (
    <ScrollView style={sectorStyles.container}>
      <View style={sectorStyles.tabs}>
        {['Piezas', 'Baños', 'Comedor', 'Garaje', 'Living'].map((category) => (
          <TouchableOpacity
            key={category}
            style={sectorStyles.tabButton}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={sectorStyles.tabButtonText}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedCategory && (
        <View style={sectorStyles.sectionContainer}>
          <Text style={sectorStyles.label}>{selectedCategory}</Text>
          <Text style={sectorStyles.label}>Largo:</Text>
          <TextInput
            style={sectorStyles.input}
            placeholder="Largo"
            value={measurements.largo}
            onChangeText={(text) => setMeasurements({ ...measurements, largo: text })}
          />
          <Text style={sectorStyles.label}>Ancho:</Text>
          <TextInput
            style={sectorStyles.input}
            placeholder="Ancho"
            value={measurements.ancho}
            onChangeText={(text) => setMeasurements({ ...measurements, ancho: text })}
          />
          <Text style={sectorStyles.label}>Alto:</Text>
          <TextInput
            style={sectorStyles.input}
            placeholder="Alto"
            value={measurements.alto}
            onChangeText={(text) => setMeasurements({ ...measurements, alto: text })}
          />

          {['Fisuras', 'Artefactos', 'PicadoSuperficie', 'Pisos', 'Muros', 'Cielos'].map((category) => (
            <View key={category}>
              <View style={sectorStyles.switchContainer}>
                <Switch
                  value={switches[category]}
                  onValueChange={(value) => handleSwitchChange(category, value)}
                />
                <Text>{category}</Text>
              </View>
              {switches[category] && (
                <View>
                  {category === 'Pisos' && (
                    <View>
                      <Text style={sectorStyles.label}>Tipo de Piso: {pisoType}</Text>
                      <ModalDropdown
                        style={sectorStyles.dropdown}
                        options={Object.keys(elementsData.Pisos)}
                        defaultValue="Seleccione Tipo de Piso"
                        onSelect={(index, value) => setPisoType(value)}
                        textStyle={{ fontSize: 16 }}
                        dropdownTextStyle={{ fontSize: 16 }}
                      />
                      {pisoType && elementsData.Pisos[pisoType] && Object.keys(elementsData.Pisos[pisoType]).map((detail) => (
                        <View key={detail} style={sectorStyles.quantityContainer}>
                          <Text>{detail}:</Text>
                          <TextInput
                            style={sectorStyles.quantityInput}
                            placeholder="Cantidad"
                            keyboardType="numeric"
                            value={details?.Pisos?.[pisoType]?.[detail] || ''}
                            onChangeText={(text) => handleDetailChange(`Pisos.${pisoType}`, detail, text)}
                          />
                        </View>
                      ))}
                    </View>
                  )}
                  {category === 'Muros' && (
                    <View>
                      <Text style={sectorStyles.label}>Tipo de Muro: {muroType}</Text>
                      <ModalDropdown
                        style={sectorStyles.dropdown}
                        options={Object.keys(elementsData.Muros)}
                        defaultValue="Seleccione Tipo de Muro"
                        onSelect={(index, value) => setMuroType(value)}
                        textStyle={{ fontSize: 16 }}
                        dropdownTextStyle={{ fontSize: 16 }}
                      />
                      {muroType && elementsData.Muros[muroType] && Object.keys(elementsData.Muros[muroType]).map((detail) => (
                        <View key={detail} style={sectorStyles.quantityContainer}>
                          <Text>{detail}:</Text>
                          <TextInput
                            style={sectorStyles.quantityInput}
                            placeholder="Cantidad"
                            keyboardType="numeric"
                            value={details?.Muros?.[muroType]?.[detail] || ''}
                            onChangeText={(text) => handleDetailChange(`Muros.${muroType}`, detail, text)}
                          />
                        </View>
                      ))}
                    </View>
                  )}
                  {category === 'Cielos' && (
                    <View>
                      <Text style={sectorStyles.label}>Tipo de Cielo: {cieloType}</Text>
                      <ModalDropdown
                        style={sectorStyles.dropdown}
                        options={Object.keys(elementsData.Cielos)}
                        defaultValue="Seleccione Tipo de Cielo"
                        onSelect={(index, value) => setCieloType(value)}
                        textStyle={{ fontSize: 16 }}
                        dropdownTextStyle={{ fontSize: 16 }}
                      />
                      {cieloType && elementsData.Cielos[cieloType] && Object.keys(elementsData.Cielos[cieloType]).map((detail) => (
                        <View key={detail} style={sectorStyles.quantityContainer}>
                          <Text>{detail}:</Text>
                          <TextInput
                            style={sectorStyles.quantityInput}
                            placeholder="Cantidad"
                            keyboardType="numeric"
                            value={details?.Cielos?.[cieloType]?.[detail] || ''}
                            onChangeText={(text) => handleDetailChange(`Cielos.${cieloType}`, detail, text)}
                          />
                        </View>
                      ))}
                    </View>
                  )}
                  {(category === 'Fisuras' || category === 'Artefactos' || category === 'PicadoSuperficie') && (
                    <View>
                      {Object.keys(elementsData[category]).map((detail) => (
                        <View key={detail} style={sectorStyles.quantityContainer}>
                          <Text>{detail}:</Text>
                          <TextInput
                            style={sectorStyles.quantityInput}
                            placeholder="Cantidad"
                            keyboardType="numeric"
                            value={details?.[category]?.[detail] || ''}
                            onChangeText={(text) => handleDetailChange(category, detail, text)}
                          />
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              )}
            </View>
          ))}

          <Button title="Agregar" onPress={handleAddSector} />
        </View>
      )}

      {sectors.map((sector, sectorIndex) => (
        <View key={sectorIndex} style={sectorStyles.sectionContainer}>
          <Text style={sectorStyles.label}>{sector.category}</Text>
          <Text>Largo: {sector.measurements.largo}</Text>
          <Text>Ancho: {sector.measurements.ancho}</Text>
          <Text>Alto: {sector.measurements.alto}</Text>
          {Object.keys(sector.switches).map((category) => (
            sector.switches[category] && (
              <View key={category}>
                <Text>{category}:</Text>
                {category === 'Pisos' && <Text>Tipo de Piso: {sector.pisoType}</Text>}
                {renderDetail(sector.details[category])}
              </View>
            )
          ))}
        </View>
      ))}

      <Button title="Guardar en Excel" onPress={() => saveDataToExcel(sectors)} />
    </ScrollView>
  );
};

export default App;
