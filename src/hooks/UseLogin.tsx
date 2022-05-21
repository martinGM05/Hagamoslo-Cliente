import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import axios from 'axios'
import { _url } from '../global/Variables'
import { UserModel } from '../interfaces/UserModel';
import { SesionContext } from '../context/Sesion/SesionContext'
import clienteAxios from '../config/clientAxios'
import jwtDecode, { JwtPayload } from 'jwt-decode'

export interface UserToken{
  id: number;
  correo: string;
  nombre: string;
  urlFoto: string;
  numero: string;
  idRol: number;
}

const UseLogin = () => {
  
  const { getUserData } = useContext(SesionContext);

 
  const loginWithEmail = async (email: string, password: string, navigation: any) => {


    const result = await clienteAxios.post(`/auth`, {
      correo: email,
      contrasena: password
    })

    try{
      if(result.data.token){
        const token: string = result.data.token;
        const decoded = jwtDecode<JwtPayload>(token) as UserToken;

        const userData: UserModel = {
          id: decoded.id,
          nombre: decoded.nombre,
          correo: decoded.correo,
          urlFoto: decoded.urlFoto,
          numero: decoded.numero,
          idRol: decoded.idRol,
          token: token,
          contrasena: '',
          descripcion: '',
          localizacion: '',
          valoracion: 0,
          idSala: '',
        }
        getUserData(userData);
        navigation.navigate('PrincipalCliente');

      }else{
        console.log('Usuario o contraseña incorrectos');
      }
    }catch(error){
      console.log('Error al iniciar sesión');
    }
  }

  return {
    loginWithEmail
  }
}

export default UseLogin

