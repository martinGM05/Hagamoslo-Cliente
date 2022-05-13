import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import axios from 'axios'
import { _url } from '../global/Variables'

const UseLogin = () => {

  const loginWithEmail = (email: string, password: string, navigation: any) => {
    const url = 'https://chambapp-martin.herokuapp.com/api/auth'
   axios.get(url, {
      headers: {
          'Content-Type': 'application/json'
      },
      data: {
          correo: 'ivan@gmail.com',
          contrasena: '123456'
      }
  }).then(function (response) {
      console.log(response.data)
  })


    // axios.get(_url+ 'auth', {
    //   data: {
    //     correo: email,
    //     contrasena: password
    //   },
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // })
    //   .then(res => {
    //     console.log(res)
    //   }).catch((error) => {
    //     console.log("Error_ " + error);
    //   })
  }

  return {
    loginWithEmail
  }
}

export default UseLogin

