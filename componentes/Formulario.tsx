import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { TextInput, Text, Snackbar } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import FormContext, {
  FormProps,
  FormState
} from '../context/formularioContext';
import useImagen from '../hooks/useImagen';
import useTextInput from '../hooks/useTextInput';
import CampoImagen from './CampoImagen';
import DatePicker from './DatePicker';
import useDate from '../hooks/useDate';

const Formulario = (): JSX.Element => {
  const {
    formState: {
      empleado: { nombre, email, telefono },
      bloqueado
    },
    dispatch
  } = useContext<FormProps>(FormContext);

  const {
    value: nombreValue,
    errors: nombreErrors,
    onChangeText: cambiarNombre
  } = useTextInput({ initialValue: nombre });
  const {
    value: emailValue,
    errors: emailErrors,
    onChangeText: cambiarEmail
  } = useTextInput({ initialValue: email });
  const {
    value: telefonoValue,
    errors: telefonoErrors,
    onChangeText: cambiarTelefono
  } = useTextInput({ initialValue: telefono });

  const { date, showPicker, setShowPicker, onDateChange } = useDate();
  const [selected, setSelected] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { imagen: imagenValue, handleImage } = useImagen();

  const renderError = (error: string | null) => {
    if (error === null) {
      return <View style={{ marginBottom: 10 }} />;
    }

    return (
      <Text
        style={{ color: 'red', fontWeight: 'bold', marginBottom: 10 }}
        variant="labelSmall"
      >
        {error}
      </Text>
    );
  };

  const errorSelect = selected === '';
  const errorImagen = imagenValue === '';

  const handleFormLock = () => {
    if (
      nombreErrors[0] ||
      emailErrors[1] ||
      telefonoErrors[2] ||
      errorSelect ||
      errorImagen ||
      date === null
    ) {
      setSnackbarMessage(
        'No se puede generar la carta de empleado, hay errores en el formulario.'
      );
      setSnackbarVisible(true);
    } else {
      setSnackbarMessage('La carta de empleado se ha generado con éxito.');
      setSnackbarVisible(true);
      dispatch({ type: 'BLOQUEADO', payload: { flag: true } });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 20 }}>
        <TextInput
          value={nombreValue}
          label="Nombre del Empleado"
          style={styles.input}
          onChangeText={(text) => {
            cambiarNombre(text);
            if (!bloqueado) {
              dispatch({
                type: 'ACTUALIZAR',
                payload: { text, name: 'nombre' }
              });
            }
          }}
          left={<TextInput.Icon icon="account" />}
          error={typeof nombreErrors[0] === 'string'}
        />
        {renderError(nombreErrors[0])}

        <DatePicker
          date={date}
          showPicker={showPicker}
          setShowPicker={setShowPicker}
          onDateChange={onDateChange}
          handleDateChange={(date) => {
            dispatch({
              type: 'ACTUALIZAR',
              payload: { text: date, name: 'fecha' }
            });
          }}
        />

        <TextInput
          value={emailValue}
          label="Correo electrónico"
          style={styles.input}
          onChangeText={(text) => {
            cambiarEmail(text);
            if (!bloqueado) {
              dispatch({
                type: 'ACTUALIZAR',
                payload: { text, name: 'email' }
              });
            }
          }}
          keyboardType="email-address"
          left={<TextInput.Icon icon="email" />}
          error={typeof emailErrors[1] === 'string'}
        />
        {renderError(emailErrors[1])}

        <TextInput
          value={telefonoValue}
          label="Número de Teléfono"
          style={styles.input}
          onChangeText={(text) => {
            cambiarTelefono(text);
            if (!bloqueado) {
              dispatch({
                type: 'ACTUALIZAR',
                payload: { text, name: 'telefono' }
              });
            }
          }}
          keyboardType="numeric"
          left={<TextInput.Icon icon="cellphone" />}
          maxLength={10}
          error={typeof telefonoErrors[2] === 'string'}
        />
        {renderError(telefonoErrors[2])}

        <Picker
          selectedValue={selected}
          onValueChange={(itemValue) => {
            if (!bloqueado) {
              dispatch({
                type: 'ACTUALIZAR',
                payload: { text: itemValue, name: 'puesto' }
              });
            }
            setSelected(itemValue);
          }}
          placeholder="Seleccione un puesto"
          style={{ marginBottom: errorSelect ? 3 : 10 }}
          mode="dropdown"
        >
          <Picker.Item label="Seleccione una opción" value={''} />
          <Picker.Item label="Gerente" value="Gerente" />
          <Picker.Item label="Desarrollador Jr." value="Desarrollador Jr." />
          <Picker.Item label="Desarrollador Sr." value="Desarrollador Sr." />
          <Picker.Item label="Soporte" value="Soporte" />
          <Picker.Item label="Líder de Proyecto" value="Líder de Proyecto" />
        </Picker>
        {errorSelect && renderError('Error: Ingrese un puesto')}

        <CampoImagen onImageChange={handleImage} />
        {errorImagen && renderError('Error: Ingrese una imagen')}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleFormLock}>
        <Text style={styles.buttonText}>Bloquear Tarjeta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          if (bloqueado) {
            const newState: FormState = {
              empleado: {
                nombre: nombreValue,
                fecha: '',
                email: emailValue,
                telefono: telefonoValue,
                imagen: imagenValue,
                puesto: selected
              },
              bloqueado: false
            };
            setSnackbarMessage('Carta de empleado desbloqueada');
            setSnackbarVisible(true);
            dispatch({ type: 'ACTUALIZAR_STATE', payload: newState });
          }
        }}
      >
        <Text style={styles.buttonText}>Desbloquear Tarjeta</Text>
      </TouchableOpacity>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'Undo',
          onPress: () => {
            setSnackbarVisible(false);
          }
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  input: {
    backgroundColor: 'white',
    marginVertical: 10
  },
  button: {
    backgroundColor: 'black',
    padding: 15,
    width: '50%',
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center'
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default Formulario;
