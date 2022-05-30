import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import clienteAxios from '../config/clientAxios'
import { SesionContext } from '../context/Sesion/SesionContext'
import { IEnCurso, IEnCursoHistorialTrabajador } from '../interfaces/Peticiones'

const UseEnCursoTrabajador = () => {
    const { Sesion } = useContext(SesionContext)
    const [enCursoTrabajador, setEnCursoTrabajador] = useState<IEnCursoHistorialTrabajador[]>([])
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        serviciosEnCursoTrabajador()
    }, [])

    const serviciosEnCursoTrabajador = async () => {
        try {
            const result = await clienteAxios.get('/hired/worker/'+Sesion.id + '/true')
            //console.log(result.data)
            if (result.data) {
                const curso = result.data as IEnCursoHistorialTrabajador
                setEnCursoTrabajador(result.data)
                setLoading(true)
            }


        } catch (error) {
            console.log(error)
        }
    }



    

    return {
        serviciosEnCursoTrabajador,
        enCursoTrabajador,
        loading
      
     
    }
}

export default UseEnCursoTrabajador

const styles = StyleSheet.create({})