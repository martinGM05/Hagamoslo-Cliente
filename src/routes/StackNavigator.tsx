import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InitialLogin from '../screens/Login/InitialLogin';
import Register from '../screens/Login/Register';
import Trabajador from '../screens/Trabajador/Trabajador';
import ValorarTrabajo from '../screens/EnCurso/ValorarTrabajo';
import DrawerNavigator from './DrawerNavigator';
import 'react-native-gesture-handler';
import ChatScreen from '../screens/Chat/ChatScreen';
import Services from '../screens/Servicios/Services';
export type RootStackParams = {
    Principal: undefined;
    Login: undefined;
    Register: undefined;
    PrincipalCliente: undefined;
    Trabajador: {id: string};
    Valorar: { photo: string, nameEmploye:string, office:string, idEmploye:string}
    Chat: {idSala: string};
    Services: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Principal"
            screenOptions={{
                headerShown: false,
                headerStyle:{
                    shadowColor: '#000',
                    elevation: 10,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    backgroundColor: '#6ad29e',
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
        </Stack.Navigator>
    )
}