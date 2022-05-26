import React, { useContext } from 'react'
import { Pressable, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Avatar } from 'react-native-elements'
import FonrAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons';





import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import usePhoto from '../../../hooks/usePhoto';
import { SesionContext } from '../../../context/Sesion/SesionContext';
import { _url } from '../../../global/Variables';


const AvatarPerfil = () => {

    const { Sesion, logout } = useContext(SesionContext)

    const photo = Sesion.urlFoto ? { uri: `${_url}upload/Users/${Sesion.id}`} : require('../../../img/no-image.png')


    const { handleChangePhoto, photoNew } = usePhoto();

    return (
        <View style={styles.containerIcon}>

            {
                !photoNew ? (
                    <Avatar 
                        rounded size="xlarge" 
                        source={photo} 
                    />
                ) : (
                    <Avatar 
                        rounded size="xlarge" 
                        source={{ uri: photoNew }} 
                    />
                )
            }

            <Pressable style={styles.icon}
                onPress={() => handleChangePhoto()}
            >
                <FontAwesome5 name="pencil-alt" size={20} color="#000" />
            </Pressable>
        </View>
    )
}

export default AvatarPerfil

const styles = StyleSheet.create({
    containerIcon: {
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 40,
        height: 40,
        backgroundColor: '#bebbc8',
        borderRadius: 100,
        position: 'absolute',
        bottom: 10,
        right: 5,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    }
})