import { StyleSheet, Text, View, Dimensions, Image, Pressable } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CardTrades from '../../components/Principal/CardTrades';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';
import LottieView from 'lottie-react-native';
import ButtonOpen from '../../components/MenuDrawer/ButtonOpen';
import clienteAxios from '../../config/clientAxios';
import { SesionContext } from '../../context/Sesion/SesionContext';
import { WorkerModel } from '../../interfaces/WorkerModel';
import { _primaryColor, _secondaryColor, _url } from '../../global/Variables';
import UseEnCurso from '../../hooks/UseEnCurso';

type Props = StackScreenProps<RootStackParams, 'PrincipalCliente'>;

const TrabajosEnCuso = ({ navigation }: Props) => {


  const { Sesion } = useContext(SesionContext)
  const [trabajos, setTrabajos] = useState<WorkerModel[]>([]);
  const { enCurso, loading, cambiarEstadoServicio } = UseEnCurso()


  return (
    <View style={styles.containerGlobal}>

      <ScrollView>
        {
          loading ? (
            <View style={styles.containerCards}>
              {
                enCurso.map(trabajos => (
                  <View key={trabajos.id} style={styles.card}>
                    <View style={styles.imageWorker}>
                      <Image
                        source={{ uri: `${_url}/upload/Users/${trabajos.trabajador.idTrabajador}` }}
                        style={styles.image}
                      />
                    </View>
                    <View style={styles.infoWorker}>
                      <View style={styles.nameWorkerDescription}>
                        <Text style={styles.textName}>{trabajos.trabajador.nombre}</Text>
                        <Text style={{ color: '#000' }}>{trabajos.descripcion}</Text>
                      </View>
                      <Pressable
                        style={styles.value}
                        onPress={() => cambiarEstadoServicio(trabajos.id)}
                      >
                        <Text style={{ fontWeight: 'bold', color: '#FFF' }}>Valorar</Text>
                        <FontAwesome5 name="star" size={15} color="yellow" />
                      </Pressable>
                    </View>
                  </View>
                ))
              }
            </View>
          ) : (
            <LottieView
              source={require('../../animated/empty-box.json')}
              autoPlay
              loop
            />
          )
        }
      </ScrollView>
    </View>
  )
}

export default TrabajosEnCuso

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
    borderWidth: 1.5,
  },
  infoWorker: {
    width: 220,
    backgroundColor: '#fff',
    marginLeft: 10,
    borderRadius: 10,
  },
  nameWorkerDescription: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 5,
  },
  value: {
    backgroundColor: `${_secondaryColor}`,
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
  },
  textName: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
  }
})