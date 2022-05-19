import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { DrawerContentScrollView } from '@react-navigation/drawer'
import { SesionContext } from '../../context/Sesion/SesionContext'
import { Avatar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

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
                  
                  <Icon  name={'home'} size={30} color="#000"/>
                   <Text style={styles.textButton}>Inicio</Text>
                  
               </Pressable>
               <Pressable style={styles.buttonContainer} onPress={()=>{
                   navigation.navigate('Mi Perfil')
               }}>
                   <Icon  name={'user'} size={30} color="#000"/>
                   <Text style={styles.textButton}>Mi Perfil</Text>
               </Pressable>
               <Pressable style={styles.buttonContainer} onPress={()=>{
                   navigation.navigate('En curso')
               }}>
                   <Icon  name={'feed'} size={30} color="#000"/>
                   <Text style={styles.textButton}>En curso</Text>
               </Pressable>

               <Pressable style={styles.buttonContainer} onPress={()=>{
                   navigation.navigate('Blogs')
               }}>
                   <Icon  name={'archive'} size={30} color="#000"/>
                   <Text style={styles.textButton}>Blogs</Text>
               </Pressable>
               <Pressable style={styles.buttonContainer} onPress={()=>{
                   navigation.navigate('ContainerChats')
               }}>
                   <Icon  name={'envelope'} size={30} color="#000"/>
                   <Text style={styles.textButton}>Chats</Text>
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
        padding:15,
        flexDirection:'row',
        alignItems:'center',
        
    },
    textButton:{
       fontWeight:'bold',
       fontSize:18,
       marginLeft:10
       
       

    }
})