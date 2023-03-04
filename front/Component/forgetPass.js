import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import { auth, sendPasswordResetEmail} from "../firebase"

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    sendPasswordResetEmail(auth,email)
      .then(() => {
        Alert.alert('Password reset email sent');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10, width: '80%' }}
      />
      <Button
        title="Reset Password"
        onPress={handleResetPassword}
      />
    </View>
  );
}


