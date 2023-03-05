import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image,TextInput, Button} from 'react-native';
import icons from '../assets/icons/index';



function Comments() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [comment, setComment] = useState('');

const toggleDropdown = () => {
  setDropdownVisible(!dropdownVisible);
};
function submitComment(comment) {
    // Handle submission of comment here
  }

  return (
    <View>
    <View style={styles.iconContainer}>
    <View style={styles.comment}>
    <Image style={styles.user} source={icons.profile}/>
    <View style={{width:320}}>
    <Text style={{marginRight:40}}> comment great servive </Text>
    </View>
  
      
        <TouchableOpacity onPress={toggleDropdown}>
        <Image style={styles.icon} source={icons.edit}/>
        </TouchableOpacity>
      </View>
      {dropdownVisible && (
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
  </View>
  <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add a comment..."
        value={comment}
        onChangeText={text => setComment(text)}
      />
        <TouchableOpacity style={styles.button} onPress={() => submitComment(comment)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  </View>
  )
}

export default Comments

const styles = StyleSheet.create({
    comment:{
        marginTop:20,
        flexDirection: 'row',
        flex:1,
        justifyContent: 'space-between' ,
    },
    user: {
      height:40 ,
      width: 40,
      borderRadius: 40,
    },
icon:{
    height:25,
    width:25,
    // marginLeft:230}
},
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
      },
      iconContainer: {
        marginTop:20,
        flexDirection: 'row',
        flex:1,
        justifyContent: 'space-between',
      },
      dropdownContainer: {
        position: 'absolute',
        top: 30,
        right: 0,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
      },
      dropdown: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        marginRight: 10,
      },
      item: {
        padding: 5,
      },
      itemText: {
        fontSize: 16,
      },
      container: {
        marginTop:30,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#F5F5F7',
        borderRadius: 20,
      },
      input: {
        flex: 1,
        fontSize: 16,
        marginLeft: 5,
      },
      button:{
        borderRadius:10,
        backgroundColor:'#7210FF',
       width:70,
        height:40,
      },
      buttonText:{
      color:'white', 
      fontWeight: 'bold',
      paddingTop:8,
      paddingLeft:8}
    
})