import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useContext } from 'react'

import { Alert } from "react-native";
import ImagePicker from 'react-native-image-crop-picker';


const usePhoto = () => {

    const [photoNew, setPhotoNew] = useState('')
    // const { setDataPhoto, Sesion } = useContext(SesionContext)

    const handleChangePhoto = () => {
        Alert.alert(
            'Cambiar foto',
            '¿Desea cambiar la foto de perfil?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Aceptar',
                    onPress: () => cameraOrGallery(),
                },
            ],
            { cancelable: false },
        );
    }
    
    const cameraOrGallery = () => {
        Alert.alert(
            'Seleccionar foto',
            '¿Desea seleccionar una foto de la galería o tomar una foto?',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Galería',
                    onPress: () => gallery(),
                },
                {
                    text: 'Foto',
                    onPress: () => camera(),
                },
            ],
            { cancelable: false },
        );
    }

    const camera = async () => {
        try {
            const result = await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
                includeBase64: true,
                includeExif: true,
                compressImageQuality: 0.5,
            });
            setPhotoNew(result.path)
            // setDataPhoto(result.path)
        } catch (error) {
            console.log(error);
        }
    }

    const gallery = async () => {
        try {
            const result = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
                includeBase64: true,
                includeExif: true,
            });
            setPhotoNew(result.path)
            // setDataPhoto(result.path)
        } catch (error) {
            console.log(error);
        }
    }

    return {
        handleChangePhoto,
        photoNew,
        cameraOrGallery
    }
}

export default usePhoto

const styles = StyleSheet.create({})