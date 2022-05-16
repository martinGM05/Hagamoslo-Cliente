import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { IOficeIcon, ITrabajador } from '../interfaces/Peticiones'
import axios from 'axios'
import { _url } from '../global/Variables'
import { SesionContext } from '../context/Sesion/SesionContext'

const UseApi = () => {
        const [Oficio, setOficio] = useState<IOficeIcon[]>([])
        const [Trabajador, setTrabajador]= useState<ITrabajador[]>([])
        const { Sesion } = useContext(SesionContext)

    const GetOficios = () => {
        axios.get(_url+'service',{
            headers:{
                'Api-Key': Sesion.token
            }
        }).then(function(response){
            const oficios = response.data
            setOficio(oficios)
            
        }).catch((error)=>{
            console.log(error)
        })
       
    }

    const GetTrabajadores=()=>{
        axios.get(_url+'workers',{
            headers:{
                'Api-Key': Sesion.token
            }
        }).then(function(response){
            const trabajadores=response.data
            //console.log(response.data)
            setTrabajador(trabajadores)
        }).catch((error)=>{
            console.log(error)
        })
    }

  return {
      Oficio,
      GetOficios,
      GetTrabajadores,
      Trabajador
  }
}

export default UseApi

const styles = StyleSheet.create({})