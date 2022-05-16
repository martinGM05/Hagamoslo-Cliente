import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator,DrawerContentScrollView } from '@react-navigation/drawer';
import PrincipalClient from '../screens/Principal/PrincipalClient';
import Perfil from '../screens/Profile/Perfil';
import TrabajosEnCuso from '../screens/EnCurso/TrabajosEnCuso';
import 'react-native-gesture-handler';

function Menu({props}:any){
    return(
        <DrawerContentScrollView>
            <Text style={{color:'#000'}}>Mi Menú</Text>
        </DrawerContentScrollView>
    )
}
const Drawer = createDrawerNavigator();


const DrawerNavigator=()=> (
  
    
      <Drawer.Navigator initialRouteName="Home"
    //  drawerContent={(e)=><Menu {...e}></Menu>}
      >
          
        <Drawer.Screen name="Inicio" component={PrincipalClient} />
        <Drawer.Screen name="Mi Perfil" component={Perfil} />
        <Drawer.Screen name="En curso" component={TrabajosEnCuso} />
        <Drawer.Screen name="Blogs" component={TrabajosEnCuso} />
        <Drawer.Screen name="Chats" component={TrabajosEnCuso} />
      </Drawer.Navigator>

)

export default DrawerNavigator

const styles = StyleSheet.create({})