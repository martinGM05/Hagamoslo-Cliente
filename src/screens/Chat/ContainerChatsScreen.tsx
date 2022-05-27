import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { SesionContext } from '../../context/Sesion/SesionContext';
import axios from 'axios';
import { FlatList } from 'react-native-gesture-handler';
import { SalasModel } from '../../interfaces/SalasModel';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';
import LottieView from 'lottie-react-native';
import clienteAxios from '../../config/clientAxios';


type Props = StackScreenProps<RootStackParams, 'Chat'>;


const ContainerChatsScreen = ({ navigation }: Props) => {

  const { Sesion } = useContext(SesionContext);
  const [salas, setSalas] = useState<SalasModel[]>([]);
  const [loading, setLoading] = useState(false);

  const getSalas = async () => {
    const response = await clienteAxios.get(`/salas/${Sesion.id}`)
    setSalas(response.data);
    setLoading(true);
    // console.log(response.data);
  }

  useEffect(() => {
    getSalas();
  }, [])

  const createSala = async () => {

    // Create doc in Salas collection
    const docRef = await firestore().collection('Salas').add({})

    const idWorker = 6
    const idUsuario = Sesion.id

    const url = 'https://hagamoslo.azurewebsites.net/api/salas'
    const data = {
      idSala: docRef.id,
      idUsuario: idUsuario,
      idTrabajador: idWorker
    }
    const response = await axios.post(url, data)
    console.log(response.data)
  }

  const goChat = async (idSala: string) => {
    // Alert.alert('idSala: ' + idSala)
    navigation.navigate('Chat', { idSala: idSala });
  }

  return (
    <View style={styles.container}>

      {
        loading ? (
          <FlatList data={salas} renderItem={({ item }) => (
            <Pressable style={styles.containerSalas}>
              <Text style={styles.text}>{item.idSala}</Text>
              <Icon.Button
                name="ios-arrow-forward"
                size={20}
                color="#000"
                onPress={() => goChat(item.idSala)}
              />
            </Pressable>
          )} />
        ) : (
          <LottieView
            source={require('../../animated/empty-box.json')}
            autoPlay
            loop
          />
        )
      }
      {/* <Pressable style={styles.btnChats}
        onPress={() => createSala() }
      >
        <Text style={styles.text}>Crear chat con Ivan</Text>
      </Pressable> */}



    </View>
  )
}

export default ContainerChatsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#616161',
  },
  btnChats: {
    width: 130,
    height: 30,
    backgroundColor: '#78da8e',
    marginLeft: 10,
    marginTop: 10,
    borderWidth: 1,
    padding: 5,
  },
  text: {
    color: '#000',
    fontWeight: 'bold',
  },
  containerSalas: {
    borderWidth: 2,
    borderColor: '#000',
    margin: 10,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})