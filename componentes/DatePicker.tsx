import React, { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text, TextInput } from 'react-native-paper';
import DateTimePicker, {
  DateTimePickerEvent
} from '@react-native-community/datetimepicker';

interface Props {
  date: Date | null;
  showPicker: boolean;
  setShowPicker: React.Dispatch<React.SetStateAction<boolean>>;
  onDateChange: (
    event: DateTimePickerEvent,
    selectedDate?: Date | undefined
  ) => void;
  handleDateChange: (date: string) => void;
}

const DatePicker = ({
  date,
  showPicker,
  setShowPicker,
  onDateChange,
  handleDateChange
}: Props): JSX.Element => {
  const onPressButton = () => {
    setShowPicker(true);
  };

  const formattedDate = date
    ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    : '';

  useEffect(() => {
    if (date) {
      handleDateChange(formattedDate);
    }
  }, [date]);

  return (
    <>
      {showPicker && (
        <DateTimePicker
          value={date ?? new Date()}
          mode="date"
          onChange={onDateChange}
        />
      )}
      <Pressable onPress={onPressButton}>
        <TextInput
          value={formattedDate}
          label="Fecha de Nacimiento"
          style={styles.input}
          left={<TextInput.Icon icon="cake" />}
          editable={false}
          error={date === null}
        />
      </Pressable>
      {date === null && (
        <Text
          style={{ color: 'red', fontWeight: 'bold', marginBottom: 10 }}
          variant="labelSmall"
        >
          Error: Favor de ingresar una fecha válida
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  date: {
    marginTop: 16,
    fontSize: 24
  },
  input: {
    backgroundColor: 'white',
    marginVertical: 10
  }
});

export default DatePicker;
