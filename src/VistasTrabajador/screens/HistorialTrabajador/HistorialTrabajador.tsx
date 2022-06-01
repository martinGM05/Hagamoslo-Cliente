import { StyleSheet, Text, View, Dimensions, Image, TouchableOpacity, Alert } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome5';
//import CardTrades from '../../components/Principal/CardTrades';
import { StackScreenProps } from '@react-navigation/stack';


import LottieView from 'lottie-react-native';
import { RootStackParams } from '../../../routes/StackNavigator';
import { SesionContext } from '../../../context/Sesion/SesionContext';
import { WorkerModel } from '../../../interfaces/WorkerModel';
import clienteAxios from '../../../config/clientAxios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { _secondaryColor, _url } from '../../../global/Variables';
import UseHistorialTrabajador from '../../../hooks/UseHistorialTrabajador';

type Props = StackScreenProps<RootStackParams, 'PrincipalCliente'>;


const HistorialTrabajador = ({ navigation }: Props) => {


  const { Sesion } = useContext(SesionContext)
  const { historialTrabajador, loading, GetHistorialTrabajador } = UseHistorialTrabajador()

  const reload = () => {
    GetHistorialTrabajador()
  }

  navigation.setOptions({
    headerRight: () => (
      <TouchableOpacity
        style={{ marginRight: 20 }}
        onPress={() => reload()}
      >
        <Ionicons name="refresh" size={30} color={'black'}/>
      </TouchableOpacity>
    )
  })

  const fecha=(letra:string)=>{
    let aux =''
    for (var i = 0; i<10;i++){      
       aux+=letra.charAt(i)
   }   
   return aux.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
  }

  return (
    <ScrollView style={styles.containerGlobal}>
      {
        loading ? (
          <View style={styles.containerCards}>
            {
              historialTrabajador.map(cliente => (
                <View key={cliente.id} style={styles.card}>
                    <View style={styles.imageWorker}>
                      <Image source={{ uri: `${_url}/upload/Users/${cliente.usuario.idUsuario}` }} style={styles.image} />
                    </View>
                    <View style={styles.infoWorker}>
                      <View style={styles.nameWorkerDescription}>
                        <Text style={styles.textName}>{cliente.descripcion}</Text>
                      </View>
                      <View style={styles.value}>
                        <View style={{ marginRight: 20, alignItems: 'center' }}>
                          <Text style={{ fontWeight: 'bold', color: '#fff' }}>Concluido en {fecha(cliente.fechaFin)}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
              ))
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
    </ScrollView>
  )
}

export default HistorialTrabajador

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
    height: 100,
    backgroundColor: '#fff',
    borderWidth: 1.5,
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
    alignItems: 'center',
  },
  imageWorker: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  infoWorker: {
    width: 220,
    height: 80,
    backgroundColor: '#fff',
    marginLeft: 10,
    borderRadius: 10,
  },
  nameWorkerDescription: {
    width: 220,
    height: 40,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  value: {
    width: 220,
    height: 40,
    backgroundColor: `${_secondaryColor}`,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: 'row',
    borderWidth: 1,
    alignItems: 'center',

    justifyContent: 'center'

  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  textName: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  textCosto: {
    fontSize: 18,
    color: '#000',
  }
})