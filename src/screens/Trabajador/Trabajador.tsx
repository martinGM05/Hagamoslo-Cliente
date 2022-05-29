import { StyleSheet, View, Dimensions } from 'react-native';
import React, { useContext, useEffect } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';
import CarouselTrabajador from '../../components/Trabajador/CarouselTrabajador';
import BackButton from '../../components/Buttons/BackButton';
import HeaderTrabajador from '../../components/Trabajador/HeaderTrabajador';
import Feedback from '../../components/Trabajador/Feedback';
import UseApi from '../../hooks/UseApi';


interface CarouselItems {
  image: string;
}

type Props = StackScreenProps<RootStackParams, 'Trabajador'>;
const dimensions = Dimensions.get('window');
const Trabajador = ({ navigation, route }: Props) => {

  
  const { id } = route.params
  const {GetTrabajador, TrabajadorU} = UseApi()

  //const { limpiarState, Trabajador, GetTrabajadoresComentarios, averageRating, setIdTrabajadorContactar, listaImagenes, comentario } = useContext(Contexto);
  let trabajador=['']
  let listaImagenes=['']

  let listaImagendes=[{
    name: "string",
    photo: "string;",
    comment: "string;",
    idEmploye: "string"
  }]
  //let trabajador = Trabajador.filter(e => e.Id == id)
  useEffect(()=>{
    
    GetTrabajador(parseInt(id))
  },[])

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <View style={styles.containerTrabajador}>
        <CarouselTrabajador carousel={listaImagenes} />
      </View>
      <View style={styles.containerDescription}>
        {
          
            <HeaderTrabajador
              key={TrabajadorU?.id}
              trades={listaImagenes}
              name={TrabajadorU?.nombre}
              rating={TrabajadorU?.valoracion}
              photo={'s'}
            />
          }
        {/* <Feedback customerList={aux} navigation={navigation} /> */}
      </View>
    </View>
  )
}

export default Trabajador

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTrabajador: {
    height: '93%'
  },
  containerDescription: {
    width: '100%',
    height: dimensions.height,
    backgroundColor: '#f6f6f6',
    position: 'absolute',
    top: '33%',
    left: 0,
    zIndex: 1,
    borderRadius: 20,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.56,
    shadowRadius: 13.98,
    elevation: 32,
  },

})