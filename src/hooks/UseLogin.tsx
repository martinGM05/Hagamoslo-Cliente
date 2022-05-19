import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import axios from 'axios'
import { _url } from '../global/Variables'
import { UserModel } from '../interfaces/UserModel'
import { SesionContext } from '../context/Sesion/SesionContext'
import clienteAxios from '../config/clientAxios'


const UseLogin = () => {
  const { getUserData } = useContext(SesionContext);
  const loginWithEmail = async (email: string, password: string, navigation: any) => {


    axios.post(_url + 'auth', {
      correo: email,
      contrasena: password
    })
      .then(function (response) {
        //console.log(response.data['user']['user'])
        const userData: UserModel = response.data.user as UserModel
        userData.token = response.data.token
        getUserData(userData)
        navigation.navigate('PrincipalCliente')
      })
      .catch((error) => {
        console.log(error)
      })

    // const resultado = await clienteAxios.post('auth', {
    //   correo: email,
    //   contrasena: password
    // })

    // if(resultado){
    //   const userData: UserModel = resultado.data.user as UserModel
    //   userData.token = resultado.data.token
    //   getUserData(userData)
    //   navigation.navigate('PrincipalCliente')
    // }else{
    //   console.log('Hubo un error');
    // }

  }

  return {
    loginWithEmail
  }
}

export default UseLogin

