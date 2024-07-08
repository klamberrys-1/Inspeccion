import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  tabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  tabButton: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 5,
    margin: 5,
    flexGrow: 1,
    flexBasis: '45%',
    alignItems: 'center',
  },
  tabButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  form: {
    marginTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#2c3e50',
  },
  input: {
    height: 50,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
  },
  inputLarge: {
    height: 150,
    borderColor: '#bdc3c7',
    borderWidth: 1,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ecf0f1',
    color: '#2c3e50',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2980b9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  buttonSpacer: {
    height: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  picker: {
    height: 50,
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
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
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 10,
    marginTop: 15,
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#2c3e50',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  clienteContainer: {
    padding: 20,
    backgroundColor: '#ecf0f1',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginVertical: 10,
  },
  clienteTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  clienteText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#34495e',
  },
});

export default styles;
