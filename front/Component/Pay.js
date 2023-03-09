import * as React from 'react';
import { Text} from 'react-native';
import Constants from 'expo-constants';
import {
  StripeProvider,
} from '@stripe/stripe-react-native';
import { Button } from 'react-native-paper';

// find your publishable key at https://dashboard.stripe.com/test/apikeys
const STRIPE_PUBLBISHABLE_KEY = "pk_test_51MjgQxKdIj3KzhLkitS6PqVSbORFpzKeybtcFPFZmljvV5qfwCD1HC0cCtXf4yHNLv26Jubz0HR65ReoojrWMo1900K9fpCVhE";




const fetchPaymentIntentClientSecret = async () => {
  const response = await fetch(`${API_URL}/create-payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      currency: 'usd',
      items: [{ id: 'id' }],
    }),
  });
  const { clientSecret } = await response.json();
  return clientSecret;
};

const handlePayPress = async () => {
	const clientSecret = await fetchPaymentIntentClientSecret();
	const billingDetails = {
    email: 'email@stripe.com',
    phone: '+48888000888',
    addressCity: 'Houston',
    addressCountry: 'US',
    addressLine1: '1459  Circle Drive',
    addressLine2: 'Texas',
    addressPostalCode: '77063',
  };
  const { error, paymentIntent } = await confirmPayment(clientSecret, {
    type: 'Card',
    billingDetails,
  });
  if (error) {
    console.log(error)
  } else if (paymentIntent) {
    console.log(paymentIntent)
  }
};

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
        <Button>Pay</Button>
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
});