import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreenPro from './screens/LoginScreenPro';
import HomeScreenPro from './screens/HomeScreenPro';
import forgetPass from './screens/forgetPass';
import SignUpPro from "./screens/SignUpPro"
import LoginScreenUser from "./screens/LoginScreenUser"
// import { GoogleSignin } from 'react-native-google-signin';


const Stack = createNativeStackNavigator();

export default function App() {
  // Initialize the Google Sign-In API
// GoogleSignin.configure({
//   webClientId: "1:275786100657:web:44e2e9322749a61a301790",
//   offlineAccess: true,
//   forceCodeForRefreshToken: true,
// });
  return (
    <NavigationContainer>
      <Stack.Navigator>
    
        <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreenPro} />
        <Stack.Screen name="Home" component={HomeScreenPro} />
        <Stack.Screen name="forgetPass" component={forgetPass} />
        <Stack.Screen name="SignUpPro" component={SignUpPro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
