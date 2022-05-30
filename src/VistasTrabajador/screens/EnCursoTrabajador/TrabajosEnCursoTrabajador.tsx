import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
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
import { _url } from '../../../global/Variables';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UseEnCursoTrabajador from '../../../hooks/UseEnCursoTrabajador';
type Props = StackScreenProps<RootStackParams, 'PrincipalCliente'>;

const TrabajosEnCursoTrabajador = ({ navigation }: Props) => {
  
  //const [loading, setLoading] = useState(false);
  const { Sesion } = useContext(SesionContext)
  const [trabajos, setTrabajos] = useState<WorkerModel[]>([]);

  const {loading,enCursoTrabajador}=UseEnCursoTrabajador()
 


  return (
    <View style={styles.containerGlobal}>
      {
        loading ? (
          <View style={styles.containerCards}>
            {
              enCursoTrabajador.map(cliente => (
                <View key={cliente.id} style={styles.card}>
                  <View style={styles.imageWorker}>
                    <Image source={{ uri: `${_url}/upload/Users/${cliente.usuario.idUsuario}` }} style={styles.image} />
                  </View>
                  <View style={styles.infoWorker}>
                    <View style={styles.nameWorker}>
                      <Text style={styles.textName}>{cliente.descripcion}</Text>
                    </View>
                    <View style={styles.value}>
                        
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
    height: 100,
    backgroundColor: '#6f0e8b',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWorker: {
    width: 80,
    height: 80,
    borderRadius: 50,
    backgroundColor: '#fff',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoWorker: {
    width: 220,
    height: 80,
    backgroundColor: '#fff',
    marginLeft: 10,
    borderRadius: 10,
  },
  nameWorker: {
    width: 220,
    height: 40,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 5,
  },
  value: {
    width: 220,
    height: 40,
    backgroundColor: '#1b5865',
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
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
  textOptions:{
    color:'#fff',
    fontSize:15,
    marginRight:10
  }
})