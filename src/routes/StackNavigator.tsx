import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import InitialLogin from '../screens/Login/InitialLogin';
import Register from '../screens/Login/Register';
import DrawerNavigator from './DrawerNavigator';
import 'react-native-gesture-handler';
import WorkerDrawer from './WorkerDrawer';
import ChatScreen from '../screens/Chat/ChatScreen';
import Blog from '../screens/Blog/Blog';
import BlogsScreen from '../screens/Blog/BlogsScreen';

export type RootStackParams = {
    Principal: undefined;
    Login: undefined;
    Register: undefined;
    PrincipalCliente: undefined;
    Trabajador: {id: string};
    Valorar: { photo: string, nameEmploye:string, office:string, idEmploye:string}
    Chat: {idSala: string};
    Services: undefined;
    WorkerNavigation: undefined;
    Blog:{id?:number, encabezado:string, cuerpo:string},
    BlogsScreen:undefined
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
            <Stack.Screen name="Trabajador" options={{title: "Trabajador"}} component={WorkerDrawer} />
            <Stack.Screen name="Blog" options={{title: "Blog"}} component={Blog} />
            
            <Stack.Screen name="BlogsScreen" options={{title: "Blogs"}} component={BlogsScreen} />
            <Stack.Screen
                 name="Chat" 
                 options={{
                    title: "Chat",
                    headerStyle: {
                        backgroundColor: '#dd60cd',
                    },
                    headerShown: true
                }} 
                 component={ChatScreen} 
            />

        </Stack.Navigator>
    )
}