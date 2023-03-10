import React from "react";
import { StyleSheet, View, Text } from "react-native";
import LottieView from "lottie-react-native";
import { useState } from "react";

export default function SimpleLottie() {
  return (
    <View>
      <LottieView
        source={require("../assets/67834-ssssttt-shut-up-the-cat-is-sleeping.json")}
        style={styles.animation}
        autoPlay
      />
    </View>
  );
}
const styles = StyleSheet.create({
  animation: {
    position:"relative",
    top:150,
    left : 70,
    width: 100,
    height: 100,
  },
});