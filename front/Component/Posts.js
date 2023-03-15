import React, { useState } from 'react';
import { Button, Image, Platform, StyleSheet, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function Posts() {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleSelectImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 1,
      });

      if (!result.cancelled) {
        setSelectedImages(result.selected);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUploadImages = async () => {
    try {
      const providerId = '123'; // Replace with the provider ID
      const formData = new FormData();

      selectedImages.forEach(image => {
        formData.append('images', {
          uri: image.uri,
          name: 'image.jpg',
          type: 'image/jpeg',
        });
      });

      const response = await axios.post(`${config}/images/${providerId}`, formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Select Images" onPress={handleSelectImages} />
      {selectedImages.map(image => (
        <Image key={image.uri} source={{ uri: image.uri }} style={styles.image} />
      ))}
      {selectedImages.length > 0 && (
        <Button title="Upload Images" onPress={handleUploadImages} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    padding: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});
