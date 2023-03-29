import { useState } from 'react';

interface Result {
  value: string;
  errors: (string | null)[];
  onChangeText: (value: string) => void;
}

const validation = (text: string) => {
  const errors: (string | null)[] = [];
  // Validación campo normal
  if (text.length === 0) {
    errors.splice(0, 1, 'Error: Campo Vacío');
  } else {
    errors.splice(0, 1, null);
  }

  // Validación email
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validEmail.test(text)) {
    errors.splice(1, 1, 'Error: Email no válido');
  } else {
    errors.splice(1, 1, null);
  }

  // Validación Telefono
  const validTelefono = /^\d{10}$/g;
  if (!validTelefono.test(text)) {
    errors.splice(2, 1, 'Error: Número Telefónico no válido');
  } else {
    errors.splice(2, 1, null);
  }

  return errors;
};

const useTextInput = ({ initialValue }: { initialValue: string }): Result => {
  const [value, setValue] = useState(initialValue);
  const [errors, setErrors] = useState<(string | null)[]>([
    'Error: Campo Vacío',
    'Error: Email no válido',
    'Error: Número Telefónico no válido'
  ]);

  const onChangeText = (value: string) => {
    setValue(value);
    const nuevosErrores = validation(value);
    setErrors(nuevosErrores);
  };

  return {
    value,
    errors,
    onChangeText
  };
};

export default useTextInput;
