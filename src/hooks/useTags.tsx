import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import clienteAxios from '../config/clientAxios'
import { SesionContext } from '../context/Sesion/SesionContext';
import Geolocation from '@react-native-community/geolocation';

interface IconsTags {
    id: number,
    nombre: string,
    icono: string
}

export interface Coordinates {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

const useTags = () => {

    const { Sesion } = useContext(SesionContext)
    const [tags, setTags] = useState<IconsTags[]>([])
    const [coordinates, setCoordinates] = useState<Coordinates>({
        latitude: 0, longitude: 0, latitudeDelta: 0, longitudeDelta: 0
    })
    

    useEffect(() => {
        getTags()
        getLocation()
    }, [])

    const getLocation = async () => {
        await Geolocation.getCurrentPosition(info => {
            setCoordinates({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
        })
    }


    const getTags = async () => {
        
        const result = await clienteAxios.get('/service',{
            headers: {
                'Api-Key': Sesion.token 
            }
        })

        if(result.status === 200){
            setTags(result.data)
        }else{
            console.log(result)
        }

    }


   

    return {
        tags,
        getTags,
        coordinates
    }
}

export default useTags