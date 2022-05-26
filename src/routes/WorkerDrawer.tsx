import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import 'react-native-gesture-handler';

import MenuDrawer from '../components/MenuDrawer/MenuDrawer';
import PrincipalTrabajador from '../VistasTrabajador/screens/PrincipalTrabajador/PrincipalTrabajador';
import PerfilTrabajador from '../VistasTrabajador/screens/ProfileTrabajador/PerfilTrabajador';
import TrabajosEnCursoTrabajador from '../VistasTrabajador/screens/EnCursoTrabajador/TrabajosEnCursoTrabajador';
import HistorialTrabajador from '../VistasTrabajador/screens/HistorialTrabajador/HistorialTrabajador';
import BlogsScreensTrabajador from '../VistasTrabajador/screens/BlogTrabajador/BlogsScreensTrabajador';

const Drawer = createDrawerNavigator();


const WorkerDrawer = () => (

  <Drawer.Navigator
    initialRouteName="WorkerHome"
    drawerContent={(props) => <MenuDrawer {...props} />}
    screenOptions={{
      headerShown: true,
      headerStyle: {
        backgroundColor: '#aa18ea',
      },
      headerTitleStyle: {
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
    <Drawer.Screen name="Inicio" component={PrincipalTrabajador} options={{
      drawerIcon: ({ color }) => (
        <Ionicons name="home-outline" size={22} color={color} />
      )
    }} />

    <Drawer.Screen name="Perfil" component={PerfilTrabajador} options={{
      drawerIcon: ({ color }) => (
        <Ionicons name="person-outline" size={22} color={color} />
      )
    }} />

    <Drawer.Screen name="Curso" component={TrabajosEnCursoTrabajador} options={{
      drawerIcon: ({ color }) => (
        <Ionicons name="hammer-outline" size={22} color={color} />
      )
    }} />

    <Drawer.Screen name="Historial" component={HistorialTrabajador} options={{
      drawerIcon: ({ color }) => (
        <Ionicons name="timer-outline" size={22} color={color} />
      )
    }} />

    <Drawer.Screen name="Blogs" component={BlogsScreensTrabajador} options={{
      drawerIcon: ({ color }) => (
        <Ionicons name="document-outline" size={22} color={color} />
      )
    }} />
  </Drawer.Navigator>

)

export default WorkerDrawer