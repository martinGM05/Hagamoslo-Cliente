import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useCallback, useState, useContext } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { SesionContext } from '../../context/Sesion/SesionContext';

const ChatScreen = () => {

  const [messages, setMessages] = useState<any>([]);
  const navigation = useNavigation();

  const { Sesion } = useContext(SesionContext);

  useLayoutEffect(() => {
    const collectionRef = firestore().collection('Chats');
    const query = collectionRef.orderBy('createdAt', 'desc')
    
    const unsuscribe = query.onSnapshot(snapshot => {
      console.log('snapshot')
      const messages = snapshot.docs.map(doc => ({
        _id: doc.id,
        createdAt: doc.data().createdAt,
        text: doc.data().text,
        user: doc.data().user,
      }))
      setMessages(messages)
    });
    return () => unsuscribe();
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages));

    const { _id, createdAt, text, user } = messages[0];
    firestore().collection('Chats').add({
      _id,
      createdAt,
      text,
      user,
    })
  } , [])

  return (
    <GiftedChat 
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: Sesion.id,
        avatar: 'https://i.pravatar.cc/300',
      }}
      messagesContainerStyle={{
        backgroundColor: '#fff',
      }}
    />
  )
}

export default ChatScreen

const styles = StyleSheet.create({})