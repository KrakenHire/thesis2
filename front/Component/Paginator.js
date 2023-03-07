import React from "react"
import { View, StyleSheet, Animated, useWindowDimensions } from "react-native"

export default Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions()
  return (
    <View style={{ flexDirection: 'row', height: 50, width: 400, paddingLeft: 160, backgroundColor: '#FFF' }}>
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 10, 10],
          extrapolate: "clamp"
        })
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });
        return <Animated.View key={i.toString()} style={[styles.dot, { width: dotWidth, opacity }]} />
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: "#7210FF",
    marginHorizontal: 8,
    marginTop: 40,
  },
})
