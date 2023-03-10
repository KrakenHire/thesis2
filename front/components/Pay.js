import * as React from 'react';
import {  Pressable, StyleSheet, Text,View,} from 'react-native';
import Constants from 'expo-constants';
import {
  StripeProvider,CardField
} from '@stripe/stripe-react-native';


// find your publishable key at https://dashboard.stripe.com/test/apikeys
const STRIPE_PUBLBISHABLE_KEY = "pk_test_51MjgQxKdIj3KzhLkitS6PqVSbORFpzKeybtcFPFZmljvV5qfwCD1HC0cCtXf4yHNLv26Jubz0HR65ReoojrWMo1900K9fpCVhE"

export default function Pay() {
   
  return (
    <StripeProvider publishableKey={STRIPE_PUBLBISHABLE_KEY}>
          <View style={styles.container}>
          <CardField
          postalCodeEnabled={false}
          autofocus
          style={styles.cardField}
          cardStyle={{
            textColor: '#1c1c1c',
          }}
        />
      <Pressable style={styles.button} onPress={() => Alert.alert('Payment was made succefully')} />
      <Text style={styles.text}>Pay</Text>
      </View>
    </StripeProvider>
  );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 8,
      },
      cardField: {
        height: 50,
      },
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 100,
      elevation: 7,
      backgroundColor: '#7210FF',
      width:200,
      Position:'absolute',
      left:100,
      top : 35,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
  text: {
    fontSize:16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
    textAlign: 'center',
  }
  });