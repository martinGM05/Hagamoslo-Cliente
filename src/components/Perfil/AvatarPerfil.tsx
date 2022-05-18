import React from 'react'
import { StyleSheet, View } from 'react-native';

import { Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native-gesture-handler'

import usePhoto from '../../hooks/usePhoto';

interface Props {
    photo: string, 
}

const AvatarPerfil = ({ photo }: Props) => {

    const { handleChangePhoto, photoNew } = usePhoto();

    return (
        <>
            {
                photoNew ?
                    <Avatar
                        rounded
                        size="xlarge"
                        source={{ uri: photoNew }}
                        containerStyle={styles.photoUser}
                    />
                    :
                    <Avatar
                        rounded
                        size="xlarge"
                        source={{ uri: photo}}
                        containerStyle={styles.photoUser}
                    />
            }
            <View style={styles.containerIcon}>
                <TouchableOpacity onPress={() => handleChangePhoto()}>
                    <Icon
                        name="pencil"
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </>
    )
}

export default AvatarPerfil

const styles = StyleSheet.create({
    photoUser:{
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
        borderWidth: 1,
    },
    containerIcon: {
        width: '18%',
        height: '14%',
        backgroundColor: '#bebbc8',
        borderRadius: 100,
        position: 'absolute',
        bottom: 40,
        right: 40,

        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
        borderWidth: 1,

        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: 18,
        color: '#000',
    }
})