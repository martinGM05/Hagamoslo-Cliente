import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { SesionContext } from '../../context/Sesion/SesionContext'
import { Avatar } from 'react-native-elements'

const MenuDrawer = ({ navigation}: any) => {
    const { Sesion } = useContext(SesionContext)
    let Photo=''
    return (
        <DrawerContentScrollView>
            <View style={styles.container}>
           <View style={{flexDirection:'row'}}>                                   
                <Avatar
                    size="large"
                    rounded
                    source={{
                        uri: 'https://hagamoslo.azurewebsites.net/api/upload/Users/'+Sesion.id
                    }}
                    containerStyle={styles.avatar}
                />
             <View style={styles.containerGreetings}>
                    <Text style={styles.textName}>{Sesion.nombre}</Text>
                </View>
           </View>
           <View>
           <Pressable style={styles.buttonContainer} onPress={()=>{
                   navigation.navigate('Inicio')
               }}>
                   <Text>Inicio</Text>
               </Pressable>
               <Pressable style={styles.buttonContainer} onPress={()=>{
                   navigation.navigate('Mi Perfil')
               }}>
                   <Text>Perfil</Text>
               </Pressable>
               <Pressable style={styles.buttonContainer} onPress={()=>{
                   navigation.navigate('En curso')
               }}>
                   <Text>En curso</Text>
               </Pressable>

               <Pressable style={styles.buttonContainer} onPress={()=>{
                   navigation.navigate('Blogs')
               }}>
                   <Text>Blogs</Text>
               </Pressable>
               <Pressable style={styles.buttonContainer} onPress={()=>{
                   navigation.navigate('ContainerChats')
               }}>
                   <Text>Chats</Text>
               </Pressable>
           </View>
           
           </View>
        </DrawerContentScrollView>
    )
}

export default MenuDrawer

const styles = StyleSheet.create({

    avatar: {
        width: 80,
        height: 80,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        borderWidth: 1,
    },
    containerGreetings: {
        marginTop: 20,
        marginBottom: 20,
        padding: 10,
        width: '100%',
        marginLeft:10
    },
    textName: {
        fontSize: 22,
        color: '#000',
        fontWeight: 'bold',
    },
    textWelcome: {
        fontSize: 18,
        color: '#000',
        marginLeft: 7,
    },
    container:{
        padding:15
    },
    buttonContainer:{
        backgroundColor: '#d9d9d9',
        borderRadius:10,
        marginBottom:15,
        padding:15
    }
})