import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { IEnCursoHistorialTrabajador } from '../interfaces/Peticiones'
import clienteAxios from '../config/clientAxios'
import { SesionContext } from '../context/Sesion/SesionContext'

const UseHistorialTrabajador = () => {
    const[historialTrabajador,setHistorialTrabajador]=useState<IEnCursoHistorialTrabajador[]>([])
    const [loading, setLoading] = useState(false);
    const { Sesion } = useContext(SesionContext)

    useEffect(()=>{
        GetHistorialTrabajador()
    },[])

    const GetHistorialTrabajador=async()=>{
        const result= await clienteAxios.get('/hired/worker'+Sesion.id+'/false')
        if(result.data){        
            setHistorialTrabajador(result.data)
            setLoading(true)
        }
       }
    

  return {
      historialTrabajador,
      loading
  }
}

export default UseHistorialTrabajador

const styles = StyleSheet.create({})