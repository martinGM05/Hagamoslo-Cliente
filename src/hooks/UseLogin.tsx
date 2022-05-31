import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { _url } from '../global/Variables'
import { UserModel } from '../interfaces/UserModel';
import { SesionContext } from '../context/Sesion/SesionContext'
import clienteAxios from '../config/clientAxios'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { DrawerSidebar } from 'react-navigation-drawer';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserToken {
  id: number;
  correo: string;
  nombre: string;
  urlFoto: string;
  numero: string;
  idRol: number;
  tokenFCM: string;
}

const UseLogin = () => {

  const { getUserData } = useContext(SesionContext);
  const [tokenFCM, setTokenFCM] = useState<string>("");

  useEffect(() => {
    getFCMToken();
  }, [])

  const getUserStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('user');
      if (token) {
        const user: UserModel = jwtDecode(token);
        let useData: UserModel = { ...user, token: user.token}
        console.log(useData);

        // let token: string = result.data.token;
        // let decoded: UserToken = jwtDecode(token);
        // let userData: UserModel = { ...decoded, token }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getFCMToken = async () => {
    messaging()
      .getToken()
      .then(token => {
        setTokenFCM(token);
        console.log('Token =>  ', token);
      });
  }

  const loginWithEmail = async (email: string, password: string, navigation: any, rol: number) => {


    try {

      const result = await clienteAxios.post(`/auth`, {
        correo: email,
        contrasena: password,
        tokenFCM: tokenFCM
      })

      if (result.data) {
        let token: string = result.data.token;
        let decoded: UserToken = jwtDecode(token);
        let userData: UserModel = { ...decoded, token }

        if (userData.idRol === 1) {
          if (rol === 1) {
            getUserData(userData!)
            navigation.navigate('PrincipalCliente');
          } else {
            Alert.alert('Error', 'Debe ser cliente para ingresar a esta sección')
            return;
          }
        } else if (userData.idRol === 2) {
          if (rol === 2) {
            getUserData(userData)
            navigation.navigate('Trabajador');
            // Alert.alert('Rol', 'Trabajador')
          } else {
            Alert.alert('Error', 'Debe ser trabajador para ingresar a esta sección')
            return;
          }
        } else if (userData!.idRol === 3) {
          if (rol === 1) {
            getUserData(userData!)
            navigation.navigate('PrincipalCliente');
          } else if (rol === 2) {
            getUserData(userData!)
            navigation.navigate('Trabajador');
          }
        }

      } else {
        console.log('Here 1 : ' + result)
      }
    } catch (error) {
      Alert.alert('Error', 'Usuario o contraseña incorrectos')
    }
  }

  return {
    loginWithEmail
  }
}

export default UseLogin