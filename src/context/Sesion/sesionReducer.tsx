import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { UserModel } from '../../interfaces/UserModel';

type SesionAction =
    | { type: 'GET_USER'; payload: UserModel }
    | { type: 'LOGOUT'; payload: UserModel}

const sesionReducer = (state: UserModel, action:SesionAction): UserModel => {
    switch (action.type) {
        case 'GET_USER': {
            return action.payload;
        }
        case 'LOGOUT': {
            return action.payload;
        }
        default:
            return state
}
}

export default sesionReducer

