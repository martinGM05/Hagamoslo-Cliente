import { Alert, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import React, { useLayoutEffect, useCallback, useState, useContext, useEffect } from 'react'
import { GiftedChat } from 'react-native-gifted-chat';
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
            onPress={() => {
              Alert.alert('Presupuesto', 'Ingrese su presupuesto', [
                {
                  text: 'Cancelar',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                { text: 'Aceptar', onPress: () => handleValorar() },
              ], { cancelable: false })
            }} />
        )
      })
    }
  }, [])

  const handleValorar = async () => {
    // ValorarTrabajo(numberRating,idEmploye, Sesion.Id, comentario, photoImage, setCarganad)
    setModalVisible(true)


}


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
        textInputProps={{
          placeholder: 'Escribe un mensaje...',
          // placeholderTextColor: '#000',
          styles: {
            color: '#000',
            fontSize: 16,
          },
        }}
        placeholder="Escribe un mensaje..."
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <PresupuestoModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          textDescription={'¡Gracias por valorar a este trabajador!'}
        />
      </Modal>
    </>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})