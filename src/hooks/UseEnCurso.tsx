import { Alert, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import clienteAxios from '../config/clientAxios'
import { SesionContext } from '../context/Sesion/SesionContext'
import { IEnCurso } from '../interfaces/Peticiones'

const UseEnCurso = () => {
    const { Sesion } = useContext(SesionContext)
    const [enCurso, setEnCurso] = useState<IEnCurso[]>([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        serviciosEnCurso()
    }, [])

    const serviciosEnCurso = async () => {
        try {
            setLoading(false)
            const result = await clienteAxios.get(`/hired/${Sesion.id}/true`)
            //console.log(result.data)
            if (result.data) {
                const curso = result.data as IEnCurso[]   
                setEnCurso(curso)
                setLoading(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const cambiarEstadoServicio = async (id: number) => {
        Alert.alert('Advertencia', '¿Esta completamente seguro de concluir este contrato?', [
            {
                text: 'No',
                style: 'cancel'
            }, {
                text: 'Si',
                onPress: async () => {
                    const result = await clienteAxios.put('/hired/' + id)
                    if (result.data) {
                        serviciosEnCurso()
                        Alert.alert('Mensaje', 'Contrato cerrado')
                    }
                }
            }])

    }

    return {
        serviciosEnCurso,
        enCurso,
        loading,
        cambiarEstadoServicio
    }
}

export default UseEnCurso

const styles = StyleSheet.create({})