import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text } from 'react-native';

const Search = ({ onPress }) => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        value={searchText}
        onChangeText={setSearchText}
      />
      <TouchableOpacity style={styles.button} onPress={() => onPress(searchText)}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#ccc',
        padding: 10,
        margin: 20,
        backgroundColor:'#E5E5E5',
      },
      input: {
        flex: 1,
        height: 40,
        width:200,
      },
      button: {
        backgroundColor: '#7210FF',
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
  },
});

export default Search;
