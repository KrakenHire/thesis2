import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert,Pressable } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";

const API_URL = "http://localhost:3000";


//`http://192.168.100.7:3000/create-payment-intent`


const Pay = props => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(`http://192.168.100.7:3000/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log("bb",e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={value => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: "4242 4242 4242 4242",
        }}
        cardStyle={styles.card}
        style={styles.cardContainer}
        onCardChange={cardDetails => {
          setCardDetails(cardDetails);
        }}
      />
      <Pressable
      style={styles.payButton}
      onPress={handlePayPress} title="Pay" disabled={loading}
    >
      <Text style={styles.payButtonText}>Pay</Text>
    </Pressable>
      
    </View>
  );
};
export default Pay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "white",

    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    borderRadius:16,
    backgroundColor: "white",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  payButton: {
    backgroundColor: '#7210FF',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#666',
    alignItems: 'center',
    marginTop:20
  },
  payButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  }
});
