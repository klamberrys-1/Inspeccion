import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import RegisterForm from './components/RegisterForm';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <RegisterForm />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
