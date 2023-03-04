import React, { useState,useMemo} from 'react';
import { 
  SafeAreaView,
   View, 
   Text,
    Button ,
    ScrollView,
    StyleSheet,
    Alert,
    PermissionsAndroid
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Calendar } from 'react-native-calendars';
import { setStatusBarBackgroundColor } from 'expo-status-bar';



//   const [selectedDate, setSelectedDate] = useState(new Date('2023-03-31'));
//   const [datePickerVisible, setDatePickerVisible] = useState(false);

//   const showDatePicker = () => {
//     setDatePickerVisible(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisible(false);
//   };

//   const handleConfirm = (date) => {
//     setSelectedDate(date);
//     hideDatePicker();
//   };

//   return (
//     <SafeAreaView style={{ flex: 1 }}>
//       <View
//         style={{
//           padding: 20,
//           flex: 1,
//           display: 'flex',a
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
//         {selectedDate ? 'Your booking is on' : 'Please Book a date'}
          
//         </Text>
//         <Text style={{ fontSize: 24, fontWeight: 'bold',  marginBottom: 20}}>
//         {selectedDate &&selectedDate.toLocaleDateString()}
//         </Text>
//         <Button title="Book a date" onPress={showDatePicker}  />
//         <DateTimePickerModal
//   date={selectedDate}
//   isVisible={datePickerVisible}
//   mode="datetime"
//   onConfirm={handleConfirm}
//   onCancel={hideDatePicker}
// />

//       </View>
//     </SafeAreaView>
//   );




  function CustomCalendar(props) {
    const initDate = '2022-12-01';
    const [selected, setSelected] = useState(initDate);
    const marked = useMemo(() => ({
      [selected]: {
        selected: true,
        selectedColor: '#8F42FF',
        selectedTextColor: 'yellow',
        backgroundColor: '#7B20FF' 
      }
    }), [selected]);
    return (
      <Calendar 
        initialDate={initDate}
        markedDates={marked}
        onDayPress={(day) => {
          setSelected(day.dateString);
          props.onDaySelect && props.onDaySelect(day);
        }}
        {...props}
      />
    );
  }
  
  function App() {
    const [selectedDate, setSelectedDate] = useState(new Date('2023-03-31'));
    const [datePickerVisible, setDatePickerVisible] = useState(false);

   const showDatePicker = () => {
     setDatePickerVisible(true);
  };

   const hideDatePicker = () => {
     setDatePickerVisible(false);
   };

      const handleConfirm = (date) => {
     setSelectedDate(date);
     hideDatePicker();
  };

    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 1,marginLeft:20 }}>
          Select Date 
        </Text>
        <CustomCalendar onDaySelect={(day) => console.log(`Date selected: ${day.dateString}`)} 
       
        />
        <View style={{borderRadius:20 , backgroundColor:'white',marginTop: 1,marginLeft:3 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>
          Working Hours 
        </Text>
       
        <Text style={{ fontSize: 14, marginTop:1 ,marginLeft:9 }}>
          Cost increase after 2hrs of work.
        </Text>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5 }}>
          Choose Start Time
        </Text>
      
        <DateTimePickerModal
   date={selectedDate}
   isVisible={datePickerVisible}
   mode="datetime"
   onConfirm={handleConfirm}
   onCancel={hideDatePicker}
 />

  
        </View>


      <View style={styles.buttonContainer}>
      <Button title="Book a date" onPress={showDatePicker}  style={{borderRadius:20}}/>
        <Button style={styles.button} 
        title="Continue -$1255"
        
       
       
        onPress={() => Alert.alert('Your Booking was made')}></Button>
         
        </View>
        
      
      </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
      backgroundColor: '#FAFAFA',
      flexDirection: 'column',
      paddingTop: 20,
      
    },
    button:{
      borderRadius: 20 ,
      
    },
    buttonContainer: {
     display: 'flex',
     gap : 5,
     justifyContent: 'center',
     alignItems : 'center', 
    }
   
    });




export default App;
