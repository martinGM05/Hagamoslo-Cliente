import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';
import { SesionContext } from '../../context/Sesion/SesionContext';
import clienteAxios from '../../config/clientAxios';
import useNotification from '../../hooks/useNotification';
import { Notification } from '../../hooks/useNotification';

type Props = StackScreenProps<RootStackParams, 'Notification'>;

interface ServicioContratar {
  "idUsuario": number,
  "idTrabajador": number,
  "descripcion": string,
  "estado": boolean,
  "costo": number
}

const NotificationScreen = ({ navigation, route }: Props) => {

  const { id, name, presupuesto, tokenWorkerFCM } = route.params
  const [dataServicio, setDataServicio] = useState<ServicioContratar>()
  const { Sesion } = useContext(SesionContext)
  const { sendNotification } = useNotification()

  const handlePress = () => {

    let contratar: ServicioContratar = {
      idUsuario: Sesion.id,
      idTrabajador: Number(id),
      descripcion: "Tuberias",
      estado: true,
      costo: Number(presupuesto)
    }


    Alert.alert(
      'Contratar el servicio',
      '¿Está seguro que desea contratar el servicio?',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => handleHired(contratar) },
      ],
      { cancelable: false },
    );
  }

  const handleHired = async (dataService: ServicioContratar) => {
    const result = await clienteAxios.post('/hired', dataService)

    /* 
      ~ Send notification to the user who is hiring
      * The TokenFCM is the token Worker
    */

    let dataSend: Notification = {
      title: 'Contratado',
      body: `${Sesion.nombre}, te ha contratado`,
      id: Sesion.id,
      name: Sesion.nombre,
      tokenFCM: tokenWorkerFCM, // ! The token is undefined
      type: 'contratado',
    }
    // console.log(dataSend);
    sendNotification(dataSend)
  try {
    console.log(result)
  } catch (error) {
    console.log(error)
  }

}

return (
  <View style={styles.container}>
    <Text style={styles.textTitle}>¿Desea aceptar el presupuesto?</Text>
    <View style={styles.containerData}>
      <Text style={styles.text1}>Nombre del trabajador:</Text>
      <Text style={styles.text2}>{name}</Text>
      <Text style={styles.text1}>Total: </Text>
      <Text style={styles.text2}>$ {presupuesto}</Text>
    </View>
    <TouchableOpacity
      style={styles.button}
      onPress={() => handlePress()}
    >
      <Text style={styles.textButton}>Aceptar</Text>
    </TouchableOpacity>
  </View>
)
}

export default NotificationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 50
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    alignSelf: 'center',
    marginTop: 10,
  },
  containerData: {
    // flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    marginTop: 40,
  },
  containerTotal: {
    // flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
  },
  text1: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
  },
  text2: {
    fontSize: 15,
    color: '#000',
    alignSelf: 'center',
  },
  button: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 5,
    marginTop: 50,
  },
  textButton: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
})