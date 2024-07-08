import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, ScrollView, Button, TouchableOpacity, View, Switch } from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';

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
    const [mainCategory, subCategory] = category.split('.');
    setDetails((prevDetails) => {
      const updatedDetails = { ...prevDetails };

      if (subCategory) {
        if (!updatedDetails[mainCategory]) {
          updatedDetails[mainCategory] = {};
        }
        if (!updatedDetails[mainCategory][subCategory]) {
          updatedDetails[mainCategory][subCategory] = {};
        }
        updatedDetails[mainCategory][subCategory][detail] = {
          ...elementsData[mainCategory]?.[subCategory]?.[detail],
          unidad: value
        };
      } else {
        if (!updatedDetails[category]) {
          updatedDetails[category] = {};
        }
        updatedDetails[category][detail] = {
          ...elementsData[category]?.[detail],
          unidad: value
        };
      }

      return updatedDetails;
    });
  };

  const handleAddSector = () => {
    const newSector = {
      category: selectedCategory,
      measurements,
      switches,
      pisoType,
      muroType,
      cieloType,
      details: JSON.parse(JSON.stringify(details)), // Crear una copia profunda de los detalles
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

  const renderDetail = (details) => {
    if (typeof details === 'object') {
      return Object.entries(details).map(([key, value]) => (
        value && (
          <View key={key} style={sectorStyles.quantityContainer}>
            <Text>{key}: {value.unidad}</Text>
            <Text>$: {value.precio} unit</Text>
          </View>
        )
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
                  {category === 'Fisuras' && (
                    <View>
                      {Object.keys(elementsData.Fisuras).map((detail) => (
                        <View key={detail} style={sectorStyles.quantityContainer}>
                          <Text>{detail}:</Text>
                          <TextInput
                            style={sectorStyles.quantityInput}
                            placeholder="Cantidad"
                            keyboardType="numeric"
                            value={details?.Fisuras?.[detail]?.unidad || ''}
                            onChangeText={(text) => handleDetailChange('Fisuras', detail, text)}
                          />
                          <Text>Precio: {elementsData.Fisuras[detail].precio}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  {category === 'Artefactos' && (
                    <View>
                      {Object.keys(elementsData.Artefactos).map((detail) => (
                        <View key={detail} style={sectorStyles.quantityContainer}>
                          <Text>{detail}:</Text>
                          <TextInput
                            style={sectorStyles.quantityInput}
                            placeholder="Cantidad"
                            keyboardType="numeric"
                            value={details?.Artefactos?.[detail]?.unidad || ''}
                            onChangeText={(text) => handleDetailChange('Artefactos', detail, text)}
                          />
                          <Text>Precio: {elementsData.Artefactos[detail].precio}</Text>
                        </View>
                      ))}
                    </View>
                  )}
                  {category === 'PicadoSuperficie' && (
                    <View>
                      {Object.keys(elementsData['Picado Superficie']).map((detail) => (
                        <View key={detail} style={sectorStyles.quantityContainer}>
                          <Text>{detail}:</Text>
                          <TextInput
                            style={sectorStyles.quantityInput}
                            placeholder="Cantidad"
                            keyboardType="numeric"
                            value={details?.['Picado Superficie']?.[detail]?.unidad || ''}
                            onChangeText={(text) => handleDetailChange('Picado Superficie', detail, text)}
                          />
                          <Text>Precio: {elementsData['Picado Superficie'][detail].precio}</Text>
                        </View>
                      ))}
                    </View>
                  )}
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
                            value={details?.Pisos?.[pisoType]?.[detail]?.unidad || ''}
                            onChangeText={(text) => handleDetailChange(`Pisos.${pisoType}`, detail, text)}
                          />
                          <Text>Precio: {elementsData.Pisos[pisoType][detail].precio}</Text>
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
                            value={details?.Muros?.[muroType]?.[detail]?.unidad || ''}
                            onChangeText={(text) => handleDetailChange(`Muros.${muroType}`, detail, text)}
                          />
                          <Text>Precio: {elementsData.Muros[muroType][detail].precio}</Text>
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
                            value={details?.Cielos?.[cieloType]?.[detail]?.unidad || ''}
                            onChangeText={(text) => handleDetailChange(`Cielos.${cieloType}`, detail, text)}
                          />
                          <Text>Precio: {elementsData.Cielos[cieloType][detail].precio}</Text>
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
          {sector.switches.Fisuras && (
            <View>
              <Text>Fisuras:</Text>
              {renderDetail(sector.details.Fisuras)}
            </View>
          )}
          {sector.switches.Artefactos && (
            <View>
              <Text>Artefactos:</Text>
              {renderDetail(sector.details.Artefactos)}
            </View>
          )}
          {sector.switches.PicadoSuperficie && (
            <View>
              <Text>PicadoSuperficie:</Text>
              {renderDetail(sector.details['Picado Superficie'])}
            </View>
          )}
          {sector.switches.Pisos && (
            <View>
              <Text>Pisos:</Text>
              <Text>Tipo de Piso: {sector.pisoType}</Text>
              {renderDetail(sector.details.Pisos[sector.pisoType])}
            </View>
          )}
          {sector.switches.Muros && (
            <View>
              <Text>Muros:</Text>
              <Text>Tipo de Muro: {sector.muroType}</Text>
              {renderDetail(sector.details.Muros[sector.muroType])}
            </View>
          )}
          {sector.switches.Cielos && (
            <View>
              <Text>Cielos:</Text>
              <Text>Tipo de Cielo: {sector.cieloType}</Text>
              {renderDetail(sector.details.Cielos[sector.cieloType])}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

export default App;
