import { useReducer } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import EmpleadoContext, { FormState } from './context/formularioContext';
import Tarjeta from './componentes/Tarjeta';
import Constants from 'expo-constants';
import Formulario from './componentes/Formulario';
import formularioReducer from './reducer/formularioReducer';

const initialState: FormState = {
  empleado: {
    nombre: '',
    fecha: '',
    email: '',
    telefono: '',
    puesto: '',
    imagen: ''
  },
  bloqueado: false
};

export default function App() {
  const [formState, dispatch] = useReducer(formularioReducer, initialState);

  return (
    <SafeAreaProvider>
      <EmpleadoContext.Provider value={{ formState, dispatch }}>
        <ScrollView>
          <View style={styles.container}>
            <Tarjeta />
            <Formulario />
          </View>
        </ScrollView>
      </EmpleadoContext.Provider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: Constants.statusBarHeight + 20
  }
});
