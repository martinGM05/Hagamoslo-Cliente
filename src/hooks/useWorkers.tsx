import React, { useEffect, useState, useContext } from 'react'
import clienteAxios from '../config/clientAxios'
import { SesionContext } from '../context/Sesion/SesionContext';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';

export interface Coordinates {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

export interface Tags {
    title: string,
}

export interface Workers {
    id: number,
    nombre: string,
    correo: string,
    numero: number,
    latitud: number,
    longitud: number,
    descripcion: string,
    valoracion: number,
    tags: Tags[],
    coordinate: Coordinates
}

const useWorkers = () => {

    const { Sesion } = useContext(SesionContext)
    const [workersState, setWorkers] = useState<Workers[]>([])
    const [filtro, setFiltro] = useState<Workers[]>([])
    let aux: Workers[] = []

    useEffect(() => {
        clienteAxios.get('/workers', {
            headers: {
                'Api-Key': Sesion.token
            },
        }).then(response => {
            setWorkers(response.data)
        })
    }, [])   

    const searchTag = (text : string) => {
        try {

            aux = []
            setFiltro([])

            let tagSearch = text
        
            workersState.forEach((worker: any) => {
                worker.tags.forEach((tag: any) => {
                    if(tag === tagSearch){
                        aux.push(worker)
                        setFiltro([...aux])
                    }
                })
            })
            console.log(aux);
        } catch (error) {
            console.log(error)
        }
    }

    const createSala = async (idWorker: number) => {

        // Create doc in Salas collection
        const docRef = await firestore().collection('Salas').add({})
    
        // const idWorker = 6

        const data = {
          idSala: docRef.id,
          idUsuario: Sesion.id,
          idTrabajador: idWorker
        }
        
        const response = await clienteAxios.post('/salas', data)
        if(response.status === 200){
            console.log(response.data)
            Alert.alert('Sala creada', 'Puedes ver el chat en la sección de salas')
        }else{
            Alert.alert('Error', 'No se pudo crear la sala')
        }
    }

    const alertChat = (idWorker: number) => {
        Alert.alert(
            'Mensaje',
            '¿Desea enviar un mensaje a este trabajador?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () =>  createSala(idWorker) },
            ],
            { cancelable: false },
        );
    }


    return {
        workersState,
        searchTag,
        filtro,
        alertChat
    }
}

export default useWorkers