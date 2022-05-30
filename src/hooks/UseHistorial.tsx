import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import clienteAxios from '../config/clientAxios'
import { IEnCurso } from '../interfaces/Peticiones';
import { SesionContext } from '../context/Sesion/SesionContext';

const UseHistorial = () => {
    const { Sesion } = useContext(SesionContext)
    const [loading, setLoading] = useState(false);
    const [historial, setHistorial]=useState<IEnCurso[]>([])
    useEffect(()=>{
        GetHistorial()
    },[])

   const GetHistorial=async()=>{
    const result= await clienteAxios.get('/hired/'+Sesion.id+'/false')
    if(result.data){        
        setHistorial(result.data)
        setLoading(true)
    }
   }



  return {
        historial,
      loading
  }
}

export default UseHistorial

const styles = StyleSheet.create({})