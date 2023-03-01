import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,FlatList,Animated } from 'react-native';
import React,{useState,useRef} from 'react'
import damyData from '../damyData';
import OnboardingItem from '../Component/OnboardingItem';
import Paginator from '../Component/Paginator';


export default  Onboardscreen = () => {
    const[currentItem,setCurrentItem]= useState(0)
    const scrollX = useRef(new Animated.Value(0)).current;
    const damyDataRef =useRef(null);
     const viewableItemsChanged = useRef(({viewableItems}) =>{
       setCurrentItem(viewableItems[0]);
     }).current;
     const viewConfig = useRef ({ viewAreaCoveragePercentThreshold:50}).current;
  return (
    <View style={style.container}>
      <View style={{ flex: 3}}>
      <Text>Screen</Text>
      <FlatList data={damyData} renderItem={({item})=> <OnboardingItem item={item}/>}
       horizontal
        showsHorizontalScrollIndicator
        pagingEnabled
        bounces={false}
        keyExtractor={(item)=> item.id}
        onScroll={Animated.event([{nativeEvent:{ contentOffset: {x: scrollX}}}],{
          useNativeDriver: false,
        })}
        scrollEventThrottle={32}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={damyDataRef}
        />
      <StatusBar style="auto" />
      </View>
      <Paginator data={damyData} scrollX={scrollX}/>
    </View>
  );

}
const style = StyleSheet.create({
   container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
   },
});


