import { useState } from 'react';
import { DateTimePickerEvent } from '@react-native-community/datetimepicker';

const useDate = () => {
  const [date, setDate] = useState<Date | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  return { date, showPicker, setShowPicker, onDateChange };
};

export default useDate;
