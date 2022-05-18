import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InitialLogin from '../screens/Login/InitialLogin';
import Register from '../screens/Login/Register';
import TabNavigate from './TabNavigator';
import Trabajador from '../screens/Trabajador/Trabajador';
import ValorarTrabajo from '../screens/EnCurso/ValorarTrabajo';
import DrawerNavigator from './DrawerNavigator';
import 'react-native-gesture-handler';
import ChatScreen from '../screens/Chat/ChatScreen';
export type RootStackParams = {
    Principal: undefined;
    Login: undefined;
    Register: undefined;
    PrincipalCliente: undefined;
    Trabajador: {id: string};
    Valorar: { photo: string, nameEmploye:string, office:string, idEmploye:string}
    Chat: {idSala: string};
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Principal"
            screenOptions={{
                headerShown: false,
                headerStyle:{
                    shadowColor: 'transparent',
                    elevation: 1,
                },
                cardStyle: {
                    backgroundColor: '#f6f6f6',
                },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen name="Principal" options={{title: "Initial App"}} component={InitialLogin} />
            <Stack.Screen name="Register" options={{title: "Register"}} component={Register} />
            <Stack.Screen name="PrincipalCliente" options={{title: "Principal"}} component={DrawerNavigator} />
           
            <Stack.Screen name="Trabajador" options={{title: "Trabajador"}} component={Trabajador} />
            <Stack.Screen name="Valorar" options={{title: "Valorar"}} component={ValorarTrabajo} />
            <Stack.Screen name="Chat" options={{title: "Chats"}} component={ChatScreen} />
        </Stack.Navigator>
    )
}