import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createDrawerNavigator,DrawerContentScrollView } from '@react-navigation/drawer';
import PrincipalClient from '../screens/Principal/PrincipalClient';
import Perfil from '../screens/Profile/Perfil';
import TrabajosEnCuso from '../screens/EnCurso/TrabajosEnCuso';
import 'react-native-gesture-handler';
import { SesionContext } from '../context/Sesion/SesionContext';
import MenuDrawer from '../components/MenuDrawer/MenuDrawer';
import ContainerChatsScreen from '../screens/Chat/ContainerChatsScreen';
import ChatScreen from '../screens/Chat/ChatScreen';

const Drawer = createDrawerNavigator();


const DrawerNavigator= () => (
  

    
      <Drawer.Navigator initialRouteName="Home"
      drawerContent={(e)=><MenuDrawer {...e}></MenuDrawer>}
      >
          
        <Drawer.Screen name="Inicio" component={PrincipalClient} />
        <Drawer.Screen name="Mi Perfil" component={Perfil} />
        <Drawer.Screen name="En curso" component={TrabajosEnCuso} />
        <Drawer.Screen name="Blogs" component={TrabajosEnCuso} />
        <Drawer.Screen name="ContainerChats" component={ContainerChatsScreen} />
      </Drawer.Navigator>

)

export default DrawerNavigator

const styles = StyleSheet.create({})