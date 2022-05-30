import { Alert, Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
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
import { _secondaryColor, _url } from '../../global/Variables';


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

  const goChat = async (idSala: string, tokenReceptorFCM: string) => {
    // Alert.alert('idSala: ' + idSala)
    navigation.navigate('Chat', { idSala: idSala, tokenReceptorFCM });
  }

  return (
    <View style={styles.container}>
      {
        loading ? (
          <>
            {
              salas.map((sala: SalasModel) => (
                <View style={styles.containerSala} key={sala.id}>
                  <View style={styles.containerSala2}>
                    <View style={styles.containerImage}>
                      <Image
                        style={styles.image}
                        source={{ uri: `${_url}/upload/Users/${sala.Receptor.id}` }}
                      />
                    </View>
                    <View style={styles.containerData}>
                      <Text style={styles.textTitle}>{sala.Receptor.nombre}</Text>
                      <Text style={styles.textsubTitle}>{sala.Receptor.descripcion}</Text>
                    </View>
                    <View style={styles.containerBtn}>
                      <TouchableOpacity
                        onPress={() => goChat(sala.idSala, sala.Receptor.tokenFCM)}
                      >
                        <Icon name="ios-chatbubbles-outline" size={30} color="#000" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))
            }
          </>
        ) : (
          <LottieView
            source={require('../../animated/empty-box.json')}
            autoPlay
            loop
          />
        )
      }
    </View>
  )
}

export default ContainerChatsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    // backgroundColor: '#616161',
  },
  btnChats: {
    width: 130,
    height: 30,
    backgroundColor: `${_secondaryColor}`,
    marginLeft: 10,
    marginTop: 10,
    borderWidth: 1,
    padding: 5,
  },
  containerSala: {
    shadowColor: "#000",
    shadowOffset: {
      width: 10,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 1.14,
    elevation: 3,
    marginBottom: 15,
    // justifyContent: 'space-evenly',

  },
  containerSala2: {
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 80,
    padding: 20,

  },
  containerImage: {
    widht: 150,
    height: 50,
    marginRight: 10,
    // backgroundColor: '#000',
  },
  containerBtn: {
    width: 50,
    height: 50,
    backgroundColor: `${_secondaryColor}`,
    borderWidth: 2,
    borderRadius: 5,
    padding: 5,

  },
  image: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    resizeMode: 'cover',
    borderEndWidth: 3,
    borderColor: '#000',
  },
  containerData: {
    width: '60%',
    height: '100%',
    // padding: 5,
    // margin: 10,
    // backgroundColor: '#87cd4e',
  },
  textTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textsubTitle: {
    color: '#000',
    fontSize: 14,
  },
})