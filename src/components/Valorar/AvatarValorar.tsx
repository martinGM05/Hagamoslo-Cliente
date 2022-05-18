import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Avatar } from 'react-native-elements'

interface Props {
    photo: string,
}

const AvatarValorar = ({ photo }: Props) => {
    return (
        <>
            {
                photo ?
                    <Avatar
                        rounded
                        size="large"
                        source={{ uri: photo }}
                        containerStyle={styles.photoUser}
                    /> :
                    <Avatar
                        rounded
                        size="large"
                        source={require('../../img/jar-loading.gif')}
                        containerStyle={styles.photoUser}
                    />
            }
        </>
    )
}

export default AvatarValorar

const styles = StyleSheet.create({
    photoUser: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
        borderWidth: 1,
        width: '100%',
        height: '100%',
    },
})