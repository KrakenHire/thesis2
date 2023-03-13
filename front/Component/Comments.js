import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import icons from '../assets/icons';
import { CheckBox } from '@rneui/themed';

const Comments = ({ profileImage, username, status, likes, onLike, onDelete, onEdit }) => {
    
  const [newComment, setNewComment] = useState('');
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [checked, setChecked] = useState(true);
    const toggleCheckbox = () => setChecked(!checked);
    
    const toggleDropdown = () => {
  setDropdownVisible(!dropdownVisible);
};
  const handleComment = () => {
    // Handle adding a new comment here
    setNewComment('');
  }

  return (
    <View style={styles.container}>
      <Image source={icons.profile} style={styles.profileImage} />
      <View style={styles.commentContainer}>
        <View style={styles.header}>
          <Text style={styles.username}>{username}</Text>
          <TouchableOpacity onPress={toggleDropdown}>
     <Image style={styles.icon} source={icons.edit}/>
        </TouchableOpacity>
      
      {dropdownVisible && (
        <View style={styles.dropdownContainer}>
          <View style={styles.dropdown}>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText} onPress={onEdit}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText} onPress={onDelete} >Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
        
        </View>
        <Text style={styles.status}>{status}</Text>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.actionButton} onPress={onLike}>
          <CheckBox
        style={{height:10,width:10, }}
        checked={checked}
        checkedIcon="heart"
        uncheckedIcon="heart-o"
        checkedColor="red"
        onPress={toggleCheckbox} 
      />
            <Text style={styles.actionText}>{likes} Likes</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.commentInputContainer}>
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
            onSubmitEditing={handleComment}
          />
          <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
            <Ionicons name="send-outline" size={20} color="#aaa" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom:8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  commentContainer: {
    flex: 1,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 16,
    color: '#444',
  },
  status: {
    
    fontSize: 16,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
 
  },
  actionText: {
    marginLeft: 5,
    color: '#777',
    fontSize: 14,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  commentInput: {
    flex: 1,
    height: 40,
    marginRight: 5,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
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
          icon:{
                height:25,
                width:25,
                // marginLeft:230}
            },
});

export default Comments;
