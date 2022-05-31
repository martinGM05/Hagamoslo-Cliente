import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import clienteAxios from '../config/clientAxios'

const RegistrarUsuario = () => {

    const Registro = async (data: any) => {
        try {
            const result = await clienteAxios.post(`/usuarios`, {
                nombre: data.Name,
                correo: data.Email,
                contrasena: data.Password,
                urlFoto: '',
                latitud: data.Latitud,
                longitud: data.Longitud,
                numero: data.Phone,
                descripcion: data.Descripcion,
                tokenFCM: '',
                idRol: data.Rol
            })
            if (result.data) {
                const artTemp = new FormData();
                artTemp.append('archivo', {
                    uri: data.Photo,
                    type: 'image/jpeg',
                    name: 'Imagen.jpg'
                });
                console.log(result.data.id)
                const resulfoto = await clienteAxios.put('/upload/Users/' + result.data.id, artTemp, {
                    headers: {
                        "content-type": "multipart/form-data",
                    }
                })
                if (resulfoto.data) {
                    Alert.alert('Mensaje', 'Usuario Creado')
                } else {
                    Alert.alert('Error', 'Se creo el usuario, sin embargo no fue posible subir tu foto')
                }
            } else {
                Alert.alert('Error', 'Error al crear usuario')
            }

        } catch (error) {
            console.log(error)

        }

    }
    return {
        Registro
    }
}

export default RegistrarUsuario

const styles = StyleSheet.create({})