import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { Rating } from 'react-native-ratings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
const RatingForm = ({provider }) => {
  const [userId, setUserId] = useState(null);
  const [rating, setRating] = useState(0);
  // const [comments, setComments] = useState('');

  useEffect(() => {
    const getUserId = async () => {
      try {
        const value = await AsyncStorage.getItem('userr');
        if (value !== null) {
          setUserId(value);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getUserId();
  }, [userId]);

  const handleSubmit = () => {
   
    axios.post('http://192.168.43.169:3000/rating',{
      users_iduser:userId,
      providers_idproviders:provider.idproviders,
      rate:rating
    })
    .then((res) => {
      setRating(0);
      // setComments('');

    })
    .catch((error) => {
      console.error(error);
    });
  };
  
 
  return (
    <View>
      <Text>Rating:{userId}</Text>
      <Rating
        startingValue={rating}
        onFinishRating={setRating}
        imageSize={40}
        ratingCount={5}
        style={{ paddingVertical: 10 }}
      />

      {/* <Text>Comments:</Text>
      <TextInput
        value={comments}
        onChangeText={setComments}
      /> */}

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default RatingForm;
