import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import axios from 'axios'
import { _url } from '../global/Variables'
import { UserModel } from '../interfaces/UserModel';
import { SesionContext } from '../context/Sesion/SesionContext'
import clienteAxios from '../config/clientAxios'
import jwtDecode, { JwtPayload } from 'jwt-decode'
import { DrawerSidebar } from 'react-navigation-drawer';

export interface UserToken{
  id: number;
  correo: string;
  nombre: string;
  urlFoto: string;
  numero: string;
  idRol: number;
}

const UseLogin = () => {
  
  const { getUserData } = useContext(SesionContext);;

  const loginWithEmail = async (email: string, password: string, navigation: any, rol: number) => {

  
    try {

      const result = await clienteAxios.post(`/auth`, {
        correo: email,
        contrasena: password
      })

      if(result.data){
        let token: string = result.data.token;
        let decoded: UserToken = jwtDecode(token);
        let userData: UserModel = { ...decoded, token }

        if(userData.idRol === 1){
          if(rol === 1){
            getUserData(userData!)
            navigation.navigate('PrincipalCliente');
          }else{
            Alert.alert('Error', 'Debe ser cliente para ingresar a esta sección')
            return;
          }
        }else if(userData!.idRol === 2){
          if(rol === 2){
            // getUserData(dataUser!)
            console.log(userData!);
            // navigation.navigate('Trabajador');
            Alert.alert('Rol', 'Trabaajador')
          }else{
            Alert.alert('Error', 'Debe ser trabajador para ingresar a esta sección')
            return;
          }
        }else if(userData!.idRol === 3){
          if(rol === 1){
            getUserData(userData!)
            navigation.navigate('PrincipalTrabajador');
          }else if(rol === 2){
            getUserData(userData!)
            navigation.navigate('Trabajador');
          }
        }
        
      }else{
        console.log(result)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    loginWithEmail
  }
}

export default UseLogin

