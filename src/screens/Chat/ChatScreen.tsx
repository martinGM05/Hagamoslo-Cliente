import { Alert, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Modal, Keyboard, Image } from 'react-native';
import React, { useLayoutEffect, useCallback, useState, useContext, useEffect } from 'react'
import { Actions, Composer, GiftedChat, InputToolbar, Send } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { SesionContext } from '../../context/Sesion/SesionContext';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';
import { DrawerToggleButton } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { _url } from '../../global/Variables';
import ValorarModal from '../../components/Helper/ValorarModal';
import { ValorarProps } from '../EnCurso/ValorarTrabajo';
import PresupuestoModal from '../../components/Helper/PresupuestoModal';

type Props = StackScreenProps<RootStackParams, 'Chat'>;

const ChatScreen = ({ route, navigation }: Props) => {


  const [messages, setMessages] = useState<any>([]);
  const [modalVisible, setModalVisible] = useState(false);

  const { Sesion } = useContext(SesionContext);
  const { params } = route
  const { idSala, tokenReceptorFCM } = params

  useEffect(() => {
    if (Sesion.idRol !== 1) {
      navigation.setOptions({
        headerRight: () => (
          // <TouchableOpacity></TouchableOpacity>
          <Ionicons
            name="cash-outline"
            size={30}
            color="black"
            style={{ marginRight: 10 }}
            onPress={() => setModalVisible(true)} />
        )
      })
    }

  }, [])

  useEffect(() => {
    const collectionRef = firestore().collection('Salas').doc(idSala).collection('Mensajes');
    const query = collectionRef.orderBy('createdAt', 'desc')
    const unsuscribe = query.onSnapshot(snapshot => {
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
    Keyboard.dismiss();
    setMessages((previousMessages: any) => GiftedChat.append(previousMessages, messages));

    const { _id, createdAt, text, user } = messages[0];
    firestore().collection('Salas').doc(idSala).collection('Mensajes').add({
      _id,
      createdAt,
      text,
      user,
    })
    // Alert.alert(''+idSala)
  }, [])

  const renderInputToolbar = (props: any) => {
    return <InputToolbar {...props} 
      containerStyle={{ 
        backgroundColor: '#fff',
      }}
    />
  }

  const renderComposer = (props: any) => {
    return <Composer {...props}
      textInputStyle={{
        color: '#000',
        padding: 5,
      }}
    />
  }

  const renderSend = (props: any) => {
    return <Send {...props}
     disabled={!props.text}
     containerStyle={{
       width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4,
     }}
     >
       <Ionicons name="send" size={25} color="#71177d" />
     </Send>
  }

  const renderActions = (props: any) => (
    <Actions
      {...props}
      containerStyle={{
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 4,
        marginRight: 4,
        marginBottom: 0,
      }}
      icon={() => (
        <Image
          style={{ width: 32, height: 32, borderRadius: 16 }}
          source={{
            uri: `${_url}/upload/Users/${Sesion.id}`,
          }}
        />
      )}
      options={{
        'Choose From Library': () => {
          console.log('Choose From Library');
        },
        Cancel: () => {
          console.log('Cancel');
        },
      }}
      optionTintColor="#222B45"
    />
  );


  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: Sesion.id,
          name: Sesion.nombre,
          avatar: `${_url}/upload/Users/${Sesion.id}`,
        }}
        messagesContainerStyle={{
          backgroundColor: '#fff',
        }}
        locale="es"
        placeholder="Escribe un mensaje..."
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
        renderActions={renderActions}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <PresupuestoModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          tokenFCM={tokenReceptorFCM}
        />
      </Modal>
    </>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})