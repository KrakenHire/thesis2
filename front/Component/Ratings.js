import React, { useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  Animated,
   TouchableOpacity 
} from 'react-native';
import { MaterialIcons ,AntDesign} from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
AsyncStorage
const RatingForm = ({provider}) => {
  const [userId, setUserId] = useState(null);
  const [rating, setRating] = useState(0);


  const starRatingOptions = [1, 2, 3, 4, 5];

  const [starRating, setStarRating] = useState(null);

  const animatedButtonScale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1.5,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedButtonScale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 50,
      bounciness: 4,
    }).start();
  };

  const animatedScaleStyle = {
    transform: [{ scale: animatedButtonScale }],
  };

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
   console.log({
    users_iduser:JSON.parse(userId),
  },"mehdiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    axios.post(`${config}/rating`,{
      users_iduser:JSON.parse(userId),
      providers_idproviders:provider.idproviders,
      rate:rating
    })
    .then((res) => {
     
      setRating(null);
      alert('well pressed')
      // setComments('');

    })
    .catch((error) => {
      console.error(error);
    });
  };
  
 
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.heading}>{starRating ? `${starRating}*` : 'Tap to rate'}</Text>
        <View style={styles.stars}>
          {starRatingOptions.map((option) => (
            <TouchableWithoutFeedback
              onPressIn={() => handlePressIn(option)}
              onPressOut={() => handlePressOut(option)}
              onPress={() => {
                setStarRating(option);
                setRating(option); // Update the rating state
              }}
              key={option}
            >
              <Animated.View style={animatedScaleStyle}>
                <MaterialIcons
                  name={starRating >= option ? 'star' : 'star-border'}
                  size={32}
                  style={starRating >= option ? styles.starSelected : styles.starUnselected}
                />
              </Animated.View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
  <AntDesign name="checkcircle" size={24} color="black" />
</TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};
export default RatingForm
const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 14,
    fontWeight:'normal',
    marginBottom: 10,
  },
  stars: {
    display: 'flex',
    flexDirection: 'row',
  },
  starUnselected: {
    color: '#aaa',
  },
  starSelected: {
    color: '#ffb300',
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 1,
    paddingHorizontal: 3,
    borderRadius: 5,
    marginTop:10,
   
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'normal',
    textShadowColor: 'rgba(0, 0, 0, 0.4)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  }
});
