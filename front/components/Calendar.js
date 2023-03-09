import React, { useState,useMemo} from 'react';
import { 
  SafeAreaView,
   View, 
   Text,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Pressable 
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';


const data = [
  { label: '08:00', value: '08:00'},
  { label: '09:00', value: '09:00' },
  { label: '10:00', value: '10:00' },
  { label: '14:00', value: '14:00' },
  { label: '15:00', value: '15:00' },
  { label: '16:00', value: '16:00' },
  { label: '17:00', value: '17:00' },
  { label: '18:00', value: '18:00' },
  { label: '19:00', value: '19:00' }
];


  function CustomCalendar(props) {
    const initDate = '2022-12-01';
    const [selected, setSelected] = useState(initDate);
    const marked = useMemo(() => ({
      [selected]: {
        selected: true,
        selectedColor: '#8F42FF',
        selectedTextColor: 'white',
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
        style={{
          borderRadius:10,
         
        }}
      />
    );
  }

function BookingDate(props) {


    const [selectedDate, setSelectedDate] = useState(new Date('2023-03-31'));
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [showTime, setShowTime] = useState(false) 
    const [count, setCount] = useState(0);
    const [value, setValue] = useState(null);
    const { onPress, title = 'Continue-25DNT' } = props;
   
   
 const renderItem = item => {
      return (

        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        </View>
      );
    };

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
        <CustomCalendar   onDaySelect={(day) => console.log(`Date selected: ${day.dateString}`)} 
       
        />

        <View style={{borderRadius:25 , backgroundColor:'white',marginTop: 10,marginLeft:3,height:100
       }}>

       <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 5,
       textAlign: 'center' }}>
          Working Hours                       
        </Text>
        <View style={styles.gridContainer}>

           <TouchableOpacity  style={styles.gridItem} onPress={() => {setCount(count + 1)}} title="+">
           <AntDesign name="pluscircle" size={24} color="#7210FF" />
           </TouchableOpacity>
         <View style={styles.counterContainer}>
        <Text style={styles.counter}>{count}</Text>
      </View>
        <TouchableOpacity  style={styles.gridItem} onPress={() => {!!count?setCount(count - 1):0}} title="-">
             <AntDesign name="minuscircle" size={24} color="#7210FF" />
           </TouchableOpacity>
           </View>
        <Text style={{ fontSize: 16, marginTop:-40 ,marginLeft:5,
       textAlign: 'center' }}>
          Cost increase after 2hrs of work.
        </Text> 
        
        </View>



        <View style={{borderRadius:25 , backgroundColor:'white',marginTop: 10,marginLeft:3,
       }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 5,marginLeft:20 }}>
          Choose Start Time
        </Text>
       
 <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        // inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        // search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select Time"
        // searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          setValue(item.value);
        }}
        renderLeftIcon={() => (
          <AntDesign style={styles.icon} color="#7210FF" name="Safety" size={34} />
        )}
        renderItem={renderItem}
      />
        </View>
        <Pressable style={styles.button} onPress={() => Alert.alert('Your Booking was made')}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
      </SafeAreaView> 
   
    );
   
  };
  export default BookingDate;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F2F2F2',
      padding: 20
    },
    item: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderColor: '#E0E0E0',
    },
    textItem: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    icon: {
      marginLeft:95,
    },
    dropdown: {
      width: '90%',
      alignSelf: 'center',
      marginVertical: 20,
      borderWidth: 2,
      borderColor: '#E0E0E0',
      borderRadius: 200,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 100,
      elevation: 7,
      backgroundColor: '#7210FF',
      width:390,
      Position:'absolute',
      left:-10,
      top : 35,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    }, gridContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    width: 50,
    bottom: 25,
    
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  counterContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    top: -25,
  },
  counter: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    text: {
      fontSize:16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });
  

 

