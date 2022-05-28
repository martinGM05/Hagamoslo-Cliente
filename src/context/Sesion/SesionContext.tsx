import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useReducer, useState } from 'react'
import { EditUserData, UserModel } from '../../interfaces/UserModel'
import sesionReducer from './sesionReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const authInitialState: UserModel = {
    contrasena:'',
    correo:'',
    descripcion:'',
    id:0,
    idRol:0,
    localizacion:'',
    nombre:'',
    numero:'',
    urlFoto:'',
    valoracion:0,
    token:''
}
export const editData = {
    Name: '',
    Phone: '',
}


export interface SesionContextProps {
    Sesion: UserModel,
    getUserData: (user: UserModel) => void;
    logout: () => void;
    setDataPhoto: (photo: string) => void;
    dataPhoto:string,
    setSelectedItems:(id:number[])=>void ;
    selectedItems:number[]

}

export const SesionContext = createContext({} as SesionContextProps);
export const SesionProvider = ({ children }: {children: JSX.Element[]}) => {

    const [sesionState, dispatch] = useReducer(sesionReducer, authInitialState);
    const [dataPhoto, setDataPhoto] = useState('');
    const [selectedItems, setSelectedItems] = useState<number[]>([])

    const getUserData = async (User: UserModel) => {

        try {
            await AsyncStorage.setItem('user', JSON.stringify(User.token));
            dispatch({ type: 'GET_USER', payload: User });
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        dispatch({
            type: 'LOGOUT',
            payload: authInitialState
        })
    }

  return (
    <SesionContext.Provider value={{
        Sesion: sesionState,
        getUserData,
        logout,
        setDataPhoto,
        dataPhoto,
        selectedItems, setSelectedItems

    }}>
        {children}
    </SesionContext.Provider>
  )
}



