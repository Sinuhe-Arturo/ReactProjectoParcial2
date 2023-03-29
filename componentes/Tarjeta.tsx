import React, { useContext } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Text } from 'react-native-paper';
import FormContext, { FormProps } from '../context/formularioContext';

const Tarjeta = (): JSX.Element => {
  const {
    formState: { empleado, bloqueado }
  } = useContext<FormProps>(FormContext);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.left}>
          <Image
            source={
              empleado.imagen.length === 0
                ? require('../assets/no_user.png')
                : { uri: empleado.imagen }
            }
            resizeMode="contain"
            style={styles.imagen}
          />
          <Text style={styles.texto} variant="titleSmall">
            {empleado.nombre ? empleado.nombre : 'Nombre Empleado'}
          </Text>
        </View>
        <View style={styles.right}>
          <Text>{`Fecha de Nacimiento: ${empleado.fecha}`}</Text>
          <Text>{`Puesto: ${empleado.puesto}`}</Text>
          <Text>{`Correo: ${empleado.email}`}</Text>
          <Text>{`Teléfono: ${empleado.telefono}`}</Text>
        </View>
      </View>
      <Text variant="bodyLarge" style={{ color: 'red' }}>
        {bloqueado ? 'Bloqueado' : 'Desbloqueado'}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 200,
    width: '100%',
    elevation: 5,
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 10,
    columnGap: 10
  },
  left: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  right: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: 10
  },
  imagen: {
    width: 80,
    height: 80,
    backgroundColor: 'white',
    borderRadius: 40,
    marginBottom: 10
  },
  texto: {
    textAlign: 'center',
    letterSpacing: 1.1
  }
});

export default Tarjeta;
