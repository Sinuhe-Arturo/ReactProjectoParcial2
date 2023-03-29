import React from 'react';
import { Button, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface Props {
  onImageChange: (imagen: string) => void;
}

const CampoImagen = ({ onImageChange }: Props): JSX.Element => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!result.canceled) {
      onImageChange(result.assets[0].uri);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5
      }}
    >
      <Button title="Pick an image from camera roll" onPress={pickImage} />
    </View>
  );
};

export default CampoImagen;
