import { FormState } from '../context/formularioContext';

export type FormAction =
  | { type: 'ACTUALIZAR'; payload: { text: string; name: string } }
  | { type: 'BLOQUEADO'; payload: { flag: boolean } }
  | { type: 'ACTUALIZAR_STATE'; payload: FormState };

const formularioReducer = (state: FormState, action: FormAction) => {
  const { type, payload } = action;
  switch (type) {
    case 'ACTUALIZAR':
      return {
        ...state,
        empleado: { ...state.empleado, [payload.name]: payload.text }
      };
    case 'BLOQUEADO':
      return {
        ...state,
        bloqueado: action.payload.flag 
      };
    case 'ACTUALIZAR_STATE':
      return payload;
    default:
      return state;
  }
};

export default formularioReducer;
