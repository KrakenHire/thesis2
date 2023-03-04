import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,FlatList,Animated } from 'react-native';

import React,{useState,useRef} from 'react'
import damyData from '../damyData.js';
import OnboardingItem from '../Component/OnboardingItem.js';
import Paginator from '../Component/Paginator.js';
import NextButton from '../Component/NextButton.js';
import { useNavigation } from '@react-navigation/native';




export default  Onboardscreen = () => {
    const navigation=useNavigation()
    const[currentIndex,setCurrentIndex]= useState(0)
    const scrollX = useRef(new Animated.Value(0)).current;
    const damyDataRef =useRef(null);
     const viewableItemsChanged = useRef(({viewableItems}) =>{
      //  setCurrentIndex(viewableItems[0]);
     }).current;

     const viewConfig = useRef ({ viewAreaCoveragePercentThreshold:50}).current;
     
     const scrollTo = () => {
       if (currentIndex < damyData.length - 1){
          
          damyDataRef.current.scrollToIndex({ index: currentIndex + 1})
          setCurrentIndex(currentIndex + 1 )
          console.log(currentIndex, "le current index", currentIndex);
          console.log( "le dummy data", damyData);
        } else {
          navigation.navigate("choises")

        }
      
       
     }

     const percentage=(currentIndex + 1) * (100 / damyData.length)
     console.log(percentage);
     return (
    <View style={style.container}>
      <View style={{ flex: 3}}>
   
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
      <NextButton scrollTo={scrollTo} percentage={percentage}/>

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


