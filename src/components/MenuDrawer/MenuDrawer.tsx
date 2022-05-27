import { Alert, Image, ImageBackground, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { DrawerContentScrollView, DrawerItemList, } from '@react-navigation/drawer'
import { SesionContext } from '../../context/Sesion/SesionContext'
import { Avatar } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { _url } from '../../global/Variables'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MenuDrawer = (props: any) => {
    const { Sesion, logout } = useContext(SesionContext)
    const foto = Sesion.urlFoto ? { uri: `${_url}/upload/Users/${Sesion.id}`} : require('../../img/no-image.png')
    
    const handleLogout = async () => {
        await Alert.alert(
            '¿Desea cerrar sesión?',
            'Presione aceptar para cerrar sesión',
            [
                {
                    text: 'Cancelar',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'Aceptar',
                    onPress: () => {
                        logout()
                        props.navigation.navigate('Principal')
                    },
                },
            ],
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#8200d6' }}>
                
                <View style={styles.containerHeader}>
                    <Avatar rounded size="large" source={foto} />
                    <View style={styles.data}>
                        <Text style={styles.textName}>{Sesion.nombre}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textEmail}>{Sesion.correo}</Text>
                            {/* <FontAwesome5 name="coins" size={14} color="#fff" /> */}
                        </View>
                    </View>
                </View>
                
                
                <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
            
            <View style={styles.bottomMenu}>
                <TouchableOpacity onPress={() => handleLogout()} style={{ paddingVertical: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="exit-outline" size={22} color="#000" />
                        <Text style={{
                            color: '#000',
                            fontSize: 15,
                            fontFamily: 'Roboto-Medium',
                            marginLeft: 10
                        }}>
                            Salir
                        </Text>

                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default MenuDrawer

const styles = StyleSheet.create({
    bottomMenu: {
        padding: 20, 
        borderTopWidth: 1, 
        borderTopColor: '#ccc'
    },
    textName: {
        color: '#fff',
        fontSize: 17,
        fontFamily: 'Roboto-Medium'
    },
    containerHeader: {
        padding: 20,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    textEmail: { 
        color: '#fff', 
        fontSize: 13, 
        fontFamily: 'Roboto-Regular', 
        marginRight: 5 
    },
    data: {
        flexDirection: 'column',
        marginLeft: 10,
        marginTop: 10,
        width: 150
    }
})