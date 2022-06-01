import { StyleSheet, Text, View, Dimensions, Image, Alert, Pressable, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
//import CardTrades from '../../components/Principal/CardTrades';
import { StackScreenProps } from '@react-navigation/stack';

import LottieView from 'lottie-react-native';
//import ButtonOpen from '../../components/MenuDrawer/ButtonOpen';
import { RootStackParams } from '../../../routes/StackNavigator';
import clienteAxios from '../../../config/clientAxios';
import { SesionContext } from '../../../context/Sesion/SesionContext';
import { WorkerModel } from '../../../interfaces/WorkerModel';
import { _secondaryColor, _url } from '../../../global/Variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UseEnCursoTrabajador from '../../../hooks/UseEnCursoTrabajador';
type Props = StackScreenProps<RootStackParams, 'PrincipalCliente'>;

const TrabajosEnCursoTrabajador = ({ navigation }: Props) => {

  //const [loading, setLoading] = useState(false);
  const { Sesion } = useContext(SesionContext)
  const [trabajos, setTrabajos] = useState<WorkerModel[]>([]);

  const { loading, enCursoTrabajador, serviciosEnCursoTrabajador } = UseEnCursoTrabajador()

  const reload = () => {
    serviciosEnCursoTrabajador()
  }

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => reload()}
      >
        <Ionicons name="refresh" size={30} color={'black'} />
      </TouchableOpacity>
    )
  })

  const goMap = (lat: number, lon: number) => {
    navigation.navigate('MapaTrabajador', {
      latCliente: lat,
      lonCliente: lon
    })
  }


  return (
    <View style={styles.containerGlobal}>
      {
        loading ? (
          <View style={styles.containerCards}>
            {enCursoTrabajador.length > 0 ? (
              <ScrollView>
                {
                  enCursoTrabajador.map(cliente => (
                    <View key={cliente.id} style={styles.card}>
                      <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.textName}>{cliente.usuario.nombre}</Text>
                        <View style={styles.imageWorker}>
                          <Image
                            source={{ uri: `${_url}/upload/Users/${cliente.usuario.idUsuario}` }}
                            style={styles.image}
                          />
                        </View>
                      </View>
                      <View style={styles.infoWorker}>
                        <View style={styles.nameWorkerDescription}>
                          <Text style={{ color: '#000', fontWeight: 'bold' }}>{cliente.descripcion}</Text>
                        </View>
                      </View>
                      <TouchableOpacity
                        style={styles.btnIcon}
                        onPress={() => goMap(cliente.usuario.latitud, cliente.usuario.longitud)}
                      >
                        <Ionicons name="ios-arrow-forward" size={30} color={'#000'} />
                      </TouchableOpacity>
                    </View>
                  ))
                }
              </ScrollView>
            ) : (
              <LottieView
                source={require('../../../animated/empty-box.json')}
                autoPlay
                loop
              />
            )
            }
          </View>
        ) : (
          <LottieView
            source={require('../../../animated/empty-box.json')}
            autoPlay
            loop
          />
        )
      }
    </View>
  )
}

export default TrabajosEnCursoTrabajador

const styles = StyleSheet.create({
  containerGlobal: {
    flex: 1,
  },
  containerCards: {
    flex: 1,
    margin: 10,
  },
  card: {
    width: Dimensions.get('window').width - 20,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  imageWorker: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#fff',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
  },
  infoWorker: {
    width: 220,
    backgroundColor: '#fff',
    marginLeft: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  nameWorkerDescription: {
    backgroundColor: `${_secondaryColor}`,
    height: 60,
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
  },
  value: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    // marginTop: 20,
  },
  textName: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
    marginLeft: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  },
  btnIcon: {
    marginLeft: -30,
    marginTop: -10,
  }
})