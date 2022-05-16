import { AsyncStorage, StyleSheet, Text, View } from 'react-native'
import React, { createContext, useReducer, useState } from 'react'
import { EditUserData, UserModel } from '../../interfaces/UserModel'
import sesionReducer from './sesionReducer';


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

}

export const SesionContext = createContext({} as SesionContextProps);
export const SesionProvider = ({ children }: {children: JSX.Element[]}) => {

    const [sesionState, dispatch] = useReducer(sesionReducer, authInitialState);
    const [dataPhoto, setDataPhoto] = useState('');

    const getUserData = async (User: UserModel) => {
        // console.log(User);
        try{
            //await AsyncStorage.setItem('@idUser', User.id.toString());
        }catch(e){
            console.log(e);
        }
        dispatch({
            type: 'GET_USER',
            payload: User
        })
    }
    // const editUserData = ({Name, Phone}: EditUserData) => {
    //     // let data: UserModel = {
    //     //     id: sesionState.id,
    //     //     nombre: Name,
    //     //     correo: sesionState.correo,
    //     //     numero: Phone,
    //     //     urlFoto: dataPhoto != '' ? dataPhoto : sesionState.urlFoto,
    //     //     contrasena:sesionState.contrasena,
    //     //     descripcion:sesionState.descripcion,
    //     //     idRol:sesionState.idRol,
    //     //     localizacion:sesionState.localizacion,
    //     //     valoracion:sesionState.valoracion
    //     // }
    //     dispatch({
    //         type: 'EDIT_USER',
    //         payload: data
    //     })
    //     // console.log(data);
    // }


  return (
    <SesionContext.Provider value={{
        Sesion: sesionState,
        getUserData,

    }}>
        {children}
    </SesionContext.Provider>
  )
}



