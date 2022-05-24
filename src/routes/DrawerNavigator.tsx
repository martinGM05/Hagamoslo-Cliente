import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useContext } from 'react'
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView } from '@react-navigation/drawer';
import PrincipalClient from '../screens/Principal/PrincipalClient';
import Perfil from '../screens/Profile/Perfil';
import TrabajosEnCuso from '../screens/EnCurso/TrabajosEnCuso';
import 'react-native-gesture-handler';
import { SesionContext } from '../context/Sesion/SesionContext';
import MenuDrawer from '../components/MenuDrawer/MenuDrawer';
import ContainerChatsScreen from '../screens/Chat/ContainerChatsScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import { Button } from 'react-native-elements';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Services from '../screens/Servicios/Services';
import ExploreService from '../screens/Servicios/ExploreService';
import BlogsScreen from '../screens/Blog/BlogsScreen';


const Drawer = createDrawerNavigator();


const DrawerNavigator = () => (



  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={(props) => <MenuDrawer {...props} />}
    screenOptions={{
      headerShown: true,
      headerStyle:{
        backgroundColor: '#aa18ea',
      },
      headerTitleStyle:{
        color: '#000',
        fontSize: 20,
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center',
      drawerActiveBackgroundColor: '#aa18ea',
      drawerActiveTintColor: '#fff',
      drawerInactiveTintColor: '#333',
      drawerLabelStyle: {
        marginLeft: -20,
        fontFamily: 'Roboto-Medium',
        fontSize: 15,
        fontWeight: 'bold',
      }
    }}
  >
    <Drawer.Screen name="Inicio" component={PrincipalClient} options={{
      drawerIcon: ({ color }) => (
        <Ionicons name="home-outline" size={22} color={color} />
      )
    }} />

    <Drawer.Screen name="Perfil" component={Perfil} options={{
      drawerIcon: ({ color }) => (
        <Ionicons name="person-outline" size={22} color={color} />
      )
    }} />

    <Drawer.Screen name="Curso" component={TrabajosEnCuso} options={{
      drawerIcon: ({ color }) => (
        <Ionicons name="hammer-outline" size={22} color={color} />
      )
    }} />
    
    <Drawer.Screen name="Historial" component={TrabajosEnCuso} options={{
      drawerIcon: ({ color }) => (
        <Ionicons name="timer-outline" size={22} color={color} />
      )
    }} />

    <Drawer.Screen name="Blogs" component={BlogsScreen} options={{
      drawerIcon: ({ color }) => (
        <Ionicons name="document-outline" size={22} color={color} />
      )
    }} />

    <Drawer.Screen name="Chats" component={ContainerChatsScreen} options={{
      drawerIcon: ({ color }) => (
        <Ionicons name="chatbox-ellipses-outline" size={22} color={color} />
      )
    }} />

    <Drawer.Screen name="Services" component={ExploreService} options={{
      drawerIcon: ({ color }) => (
        <Ionicons name="map-outline" size={22} color={color} />
      )
    }} />


  </Drawer.Navigator>

)

export default DrawerNavigator

const styles = StyleSheet.create({})