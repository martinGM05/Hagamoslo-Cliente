import React, { useEffect, useState, useContext } from 'react'
import clienteAxios from '../config/clientAxios'
import { SesionContext } from '../context/Sesion/SesionContext';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import useNotification, { Notification } from './useNotification';
import { RootStackParams } from '../routes/StackNavigator';
import { StackNavigationProp } from '@react-navigation/stack';

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
    tokenFCM: string
    latitud: number,
    longitud: number,
    descripcion: string,
    valoracion: number,
    tags: Tags[],
}

const useWorkers = () => {

    const { Sesion } = useContext(SesionContext)
    const [workersState, setWorkers] = useState<Workers[]>([])
    const [filtro, setFiltro] = useState<Workers[]>([])
    const { sendNotification } = useNotification()

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
            // console.log(aux);
        } catch (error) {
            console.log(error)
        }
    }
    const createSala = async (idWorker: number, tokenFCM: string, navegacion :StackNavigationProp<RootStackParams, 'Blog'>) => {

        let notification: Notification = {
            title: 'Nueva solicitud de servicio',
            body: 'Se ha creado un chat con un cliente',
            tokenFCM: tokenFCM,
            type: 'chat',
            name: Sesion.nombre,
            id: 1
        }

        sendNotification(notification)

        // Create doc in Salas collection
        const docRef = await firestore().collection('Salas').add({})

        // const idWorker = 6
       
        const data = {
          idSala: docRef.id,
          idUsuario: Sesion.id,
          idTrabajador: idWorker
        }
        console.log(data)

        const response = await clienteAxios.post('/salas', data)
        if(response.status === 200){
            console.log(response.data)
            Alert.alert('Sala creada', 'Puedes ver el chat en la sección de salas')
            navegacion.navigate('PrincipalCliente')
        }else{
            Alert.alert('Error', 'No se pudo crear la sala')
        }
    }

    const alertChat = (idWorker: number, tokenFCM: string, navegacion?:StackNavigationProp<RootStackParams, 'Blog'>) => {
        Alert.alert(
            'Mensaje',
            '¿Desea enviar un mensaje a este trabajador?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () =>  createSala(idWorker, tokenFCM, navegacion!) },
            ],
            { cancelable: false },
        );
    }


    return {
        workersState,
        searchTag,
        filtro,
        alertChat,
        createSala
    }
}

export default useWorkers