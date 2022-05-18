import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { IOficeIcon, ITrabajador } from '../interfaces/Peticiones'
import axios from 'axios'
import { _url } from '../global/Variables'
import { SesionContext } from '../context/Sesion/SesionContext'
import { number } from 'yup/lib/locale'

const UseApi = () => {
        const [Oficio, setOficio] = useState<IOficeIcon[]>([])
        const [Trabajador, setTrabajador]= useState<ITrabajador[]>([])
        const [TrabajadorU, setTrabajadorU]= useState<ITrabajador>()
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


    const GetTrabajador=(id:number)=>{
        axios.get(_url+'usuarios/'+id,{
            headers:{
                'Api-Key': Sesion.token 
            }
        }).then(function(response){
            console.log(response.data)
            const trabajadoru=response.data
            setTrabajadorU(trabajadoru)
        }).catch((error)=>{
            console.log(error)
        })
    }

  return {
      Oficio,
      GetOficios,
      GetTrabajadores,
      Trabajador,
      GetTrabajador,
      TrabajadorU
  }
}

export default UseApi

const styles = StyleSheet.create({})