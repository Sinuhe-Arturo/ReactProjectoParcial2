import { useState, useContext } from 'react';
import FormContext, { FormProps } from '../context/formularioContext';

const useImagen = () => {
  const {
    formState: { bloqueado },
    dispatch
  } = useContext<FormProps>(FormContext);
  const [imagen, setImagen] = useState<string>('');

  const handleImage = (newImage: string) => {
    if (!bloqueado) {
      dispatch({
        type: 'ACTUALIZAR',
        payload: { text: newImage, name: 'imagen' }
      });
    }

    setImagen(newImage);
  };

  return { imagen, handleImage };
};

export default useImagen;
