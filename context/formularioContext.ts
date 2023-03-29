import React from 'react';
import { createContext } from 'react';
import { FormAction } from '../reducer/formularioReducer';

export interface FormState {
  empleado: Empleado;
  bloqueado: boolean
};

export type FormProps = {
  formState: FormState;
  dispatch: React.Dispatch<FormAction>;
};

const FormContext = createContext({} as FormProps);

export default FormContext;
