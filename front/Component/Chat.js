import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { TouchableOpacity, Text,View} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore';
import { auth, database } from '../firebase.js';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import colors from '../colors.js';


export default function Chat() {

  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => (
  //       <TouchableOpacity
  //         style={{
  //           marginRight: 10
  //         }}
  //       >
  //         <AntDesign name="logout" size={24} color={colors.gray} style={{marginRight: 10}}/>
  //       </TouchableOpacity>
  //     )
  //   });
  // }, [navigation]);

  // useEffect(() => {

  //     const collectionRef = collection(database, 'chats');
  //     const q = query(collectionRef, orderBy('createdAt', 'desc'));

  // const unsubscribe = onSnapshot(q, querySnapshot => {
  //     console.log('querySnapshot unsusbscribe');
  //     console.log(querySnapshot.docs);
  //       setMessages(
  //         querySnapshot.docs.map(doc => ({
  //           _id: doc.data()._id,
  //           createdAt: doc.data().createdAt.toDate(),
  //           text: doc.data().text,
  //           user: doc.data().user
  //         }))
  //       );
  //     });
  // return unsubscribe;
  //   }, []);



  // const onSend = useCallback((messages = []) => {
  //     // setMessages(previousMessages =>
  //     //   GiftedChat.append(previousMessages, messages)
  //     // );
  //     // setMessages([...messages, ...messages]);
  //     const { _id, createdAt, text, user } = messages[0];    
  //     addDoc(collection(database, 'chats'), {
  //       _id,
  //       createdAt,
  //       text,
  //       user
  //     });
  //     return "lol"
  //   }, []);


  useEffect(() => {

    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date().toString(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    // console.log(GiftedChat.append(messages))
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])


    return (
      // <View></View>
      // <>
      //   {messages.map(message => (
      //     <Text key={message._id}>{message.text}</Text>
      //   ))}
      // </>
      <GiftedChat
        messages={messages}
        showAvatarForEveryMessage={false}
        showUserAvatar={false}
        onSend={messages => onSend(messages)}
        messagesContainerStyle={{
          backgroundColor: '#fff'
        }}
        textInputStyle={{
          backgroundColor: '#fff',
          borderRadius: 20,
        }}
        user={{
          _id: auth?.currentUser?.email,
          avatar: 'https://i.pravatar.cc/300'
        }}
      />
    );
}