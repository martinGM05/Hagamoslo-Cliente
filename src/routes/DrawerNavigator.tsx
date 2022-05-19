import { StyleSheet, Text, View, Alert } from 'react-native';
import React, { useContext } from 'react'
import { createDrawerNavigator,DrawerContent,DrawerContentScrollView } from '@react-navigation/drawer';
import PrincipalClient from '../screens/Principal/PrincipalClient';
import Perfil from '../screens/Profile/Perfil';
import TrabajosEnCuso from '../screens/EnCurso/TrabajosEnCuso';
import 'react-native-gesture-handler';
import { SesionContext } from '../context/Sesion/SesionContext';
import MenuDrawer from '../components/MenuDrawer/MenuDrawer';
import ContainerChatsScreen from '../screens/Chat/ContainerChatsScreen';
import ChatScreen from '../screens/Chat/ChatScreen';
import { Button } from 'react-native-elements';

const Drawer = createDrawerNavigator();


const DrawerNavigator= () => (
  

    
      <Drawer.Navigator initialRouteName="Home"
        drawerContent={ (e) => <MenuDrawer {...e} /> }
      >
          
        <Drawer.Screen name="Inicio" component={PrincipalClient} />
        <Drawer.Screen name="Mi Perfil" component={Perfil} />
        <Drawer.Screen name="En curso" component={TrabajosEnCuso} />
        <Drawer.Screen name="Blogs" component={TrabajosEnCuso} />
        <Drawer.Screen name="ContainerChats" component={ContainerChatsScreen} />
        <Drawer.Screen 
          name="Chats" 
          component={ChatScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Button onPress={() => {
                Alert.alert('djawiodhwa') 
              }}>
                <View>dawdw</View>
              </Button>
            )
          })} 
        />

      </Drawer.Navigator>

)

export default DrawerNavigator

const styles = StyleSheet.create({})