import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useCallback, useState, useContext, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { SesionContext } from '../../context/Sesion/SesionContext';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';
import { DrawerToggleButton } from '@react-navigation/drawer';

type Props = StackScreenProps<RootStackParams, 'Chat'>;

const ChatScreen = ({ route, navigation }: Props) => {


  const [messages, setMessages] = useState<any>([]);
  
  const { params } = route
  const { idSala } = params

  const { Sesion } = useContext(SesionContext);

  useEffect(() => {
    const collectionRef = firestore().collection('Salas').doc(idSala).collection('Mensajes');
    const query = collectionRef.orderBy('createdAt', 'desc')
    const unsuscribe = query.onSnapshot(snapshot => {
      console.log('snapshot')
      const messages = snapshot.docs.map(doc => ({
        _id: doc.id,
        createdAt: doc.data().createdAt.toDate(),
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
    firestore().collection('Salas').doc(idSala).collection('Mensajes').add({
      _id,
      createdAt,
      text,
      user,
    })
    // Alert.alert(''+idSala)
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