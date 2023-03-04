import React from 'react';
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

const Ratings = () => {
  const ratingCompleted = (rating) => {
    console.log('Rating is: ' + rating);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.viewContainer}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
    
         <AirbnbRating
            count={5}
            reviews={[
              'Bad',
              'Meh',
              'OK',
              'Good',
              'Great.',
            ]}
            defaultRating={3}
            size={25} />
        
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headingContainer: {
    paddingTop: 10,
  },
  titleText: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 5,
    fontFamily: Platform.OS === 'ios' ? 'Menlo-Bold' : '',
    color: '#27ae60',
  },
  subtitleText: {
    fontSize: 14,
    fontWeight: '250',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Trebuchet MS' : '',
    color: '#34495e',
  },
  viewContainer: {
    flex: 1,
  },
  rating: {
    paddingVertical: 10,
  },
});

export default Ratings;