import { StyleSheet, Text, View, Dimensions, ActivityIndicator, Image, Modal } from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import FormLogin from '../../components/Login/FormLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LottieView from 'lottie-react-native';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { UserToken } from '../../hooks/UseLogin';
import { UserModel } from '../../interfaces/UserModel';
import { SesionContext } from '../../context/Sesion/SesionContext';

type Props = StackScreenProps<RootStackParams, 'Login'>;

const InitialLogin = ({ navigation }: Props) => {

  const [isLogged, setIsLogged] = useState(false);
  const { getUserData } = useContext(SesionContext);

  // useEffect(() => {
  //   const checkout = () => {
  //     AsyncStorage.getItem('user').then(token => {
  //       if (token) {
  //         const decoded = jwtDecode<JwtPayload>(token) as UserToken;
  //         const userData: UserModel = {
  //           id: decoded.id,
  //           nombre: decoded.nombre,
  //           correo: decoded.correo,
  //           urlFoto: decoded.urlFoto,
  //           numero: decoded.numero,
  //           idRol: decoded.idRol,
  //           token: token,
  //           contrasena: '',
  //           descripcion: '',
  //           localizacion: '',
  //           valoracion: 0,
  //           idSala: '',
  //         }
  //         getUserData(userData);
  //         setIsLogged(true);
  //         navigation.navigate('PrincipalCliente');
  //       } else {
  //         setIsLogged(false);
  //       }
  //     });
  //   }
  //   checkout();
  // }, [])

  return (
    <LinearGradient
      colors={['#00C9FF', '#fff']}
      start={{ x: 2, y: 0 }}
      end={{ x: 1, y: 1 }}
      locations={[0.1, 0.9]}
      style={styles.container}
    >
      {
        (!isLogged) ? (
          <ScrollView style={styles.scroll}>
            <View style={styles.containerTitle}>
              <Image source={require('../../img/Logo.png')} style={styles.logo} />
              <Text style={styles.title1}>Bienvenido</Text>
              <Text style={styles.title2}>Ingresa con tu cuenta</Text>
            </View>
            <View style={styles.containerForm}>
              <FormLogin navigation={navigation} />
            </View>
            <View style={styles.containerSocial}>

            </View>
            <View style={styles.containerRegister}>
              <Text style={styles.text}>¿No tienes una cuenta?</Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.text2}>Registrate</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        ) : (
          <View style={styles.loading}>
            <View style={styles.containerLogo}>
              <Image
                source={require('../../img/Logo.png')}
                style={styles.image}
              />
            </View>
            <View style={styles.anima}>
              <LottieView
                source={require('../../animated/loading.json')}
                autoPlay
                loop
              />
            </View>
          </View>
        )
      }

    </LinearGradient>
  )
}

export default InitialLogin

const styles = StyleSheet.create({
  loading: {
    // backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  anima: {
    width: 300,
    height: 300,
    // backgroundColor: 'yellow'
  },
  containerLogo: {
    width: 200,
    height: 200,
    // backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  container: {
    flex: 1,
    // height: 'auto'
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginTop: 20,
  },
  scroll: {
    width: '100%',

    // backgroundColor: 'blue',
    // borderWidth: 1,
    // height: 20,
  },
  containerRegister: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    // backgroundColor: 'red',
    marginTop: 0,
  },
  text2: {
    fontSize: 16,
    color: '#095397',
    fontWeight: 'bold',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  containerTitle: {
    width: '100%',
    height: '5%',
    marginTop: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title1: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#095397',
  },
  title2: {
    fontSize: 20,
    color: '#7e7b6d',
  },
  containerForm: {
    width: '100%',
    height: 'auto',
    marginTop: '30%',
    // borderTopWidth: 1,
    // backgroundColor: 'red',
    // marginTop: '5%',
  },
  form: {
    // width: 100,
    marginLeft: '5%',
    marginRight: '5%',
    paddingBottom: '5%',
    height: 'auto',
    // borderWidth: 1,
    // backgroundColor: 'blue',
  },
  inputSyle: {
    height: 50,
    marginLeft: '1%',
    marginRight: '1%',
    paddingRight: '5%',
    marginTop: '2%',
    borderWidth: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    color: '#000',
    fontSize: 16,
    marginLeft: '1%',
  },
  icon: {
    color: '#095397',
    fontSize: 25,
  },
  contenedorError: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  error: {
    color: '#ff0000',
    fontSize: 12,
    marginLeft: 5,
  },
  containerInput: {
    height: 'auto',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    // borderWidth: 2,
  },
  titleInput: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: '2%',
  },
  buttonLogin: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  containerSocial: {
    marginTop: '5%',
  },
  activityIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  }
})