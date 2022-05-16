import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserModel } from '../../interfaces/UserModel';

type SesionAction =
    | { type: 'GET_USER'; payload: UserModel }
    | { type: 'EDIT_USER'; payload: UserModel }

const sesionReducer = (state: UserModel, action:SesionAction):UserModel => {
    switch (action.type) {
        case 'GET_USER': {
            return {
                id: action.payload.id,
                correo:action.payload.correo,
                contrasena:action.payload.contrasena,
                descripcion:action.payload.descripcion,
                idRol:action.payload.idRol,
                localizacion:action.payload.localizacion,
                nombre:action.payload.nombre,
                numero:action.payload.numero,
                urlFoto:action.payload.urlFoto,
                valoracion:action.payload.valoracion,
                token:action.payload.token
            }
           
        }
        default:
            return state
}
}

export default sesionReducer

