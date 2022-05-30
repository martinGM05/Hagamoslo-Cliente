import React, { useEffect } from 'react';
import { createStackNavigator, StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import InitialLogin from '../screens/Login/InitialLogin';
import Register from '../screens/Login/Register';
import DrawerNavigator from './DrawerNavigator';
import 'react-native-gesture-handler';
import WorkerDrawer from './WorkerDrawer';
import ChatScreen from '../screens/Chat/ChatScreen';
import Blog from '../screens/Blog/Blog';
import BlogsScreen from '../screens/Blog/BlogsScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import notifee, { EventType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';
import BlogTrabajador from '../VistasTrabajador/screens/BlogTrabajador/BlogTrabajador';
import { _primaryColor } from '../global/Variables';

export type RootStackParams = {
    Principal: undefined;
    Login: undefined;
    Register: undefined;
    PrincipalCliente: undefined;
    Trabajador: {id: string};
    Valorar: { photo: string, nameEmploye:string, office:string, idEmploye:string}
    Chat: {idSala: string, tokenReceptorFCM: string};
    Services: undefined;
    WorkerNavigation: undefined;
    Blog:{id?:number, encabezado:string, cuerpo:string},
    BlogsScreen:undefined,
    BlogsScreenTrabajador:undefined,
    Notification: {id: string, name: string, presupuesto: string, tokenWorkerFCM: string};
    BlogTrabajador:{id?:number, encabezado:string, cuerpo:string}
}

const Stack = createStackNavigator<RootStackParams>();


export const StackNavigator = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    useEffect(() => {
        return notifee.onForegroundEvent(({ type, detail }) => {
            switch (type) {
                case EventType.DISMISSED:
                    console.log('User dismissed notification', detail);
                    break;
                case EventType.PRESS:
                    //   console.log('User pressed notification: ', detail.notification?.data?.type);
                    if(detail.notification?.data?.type === 'presupuesto'){
                        goTo(detail.notification?.data)
                        // console.log('Entra: Perro');
                    }
                    break;
            }
        });
    }, []);

    

    const goTo = (data: any) => {
        if (data.type === 'presupuesto') {
            console.log(data)
            navigation.navigate('Notification', { 
                id: data.id, 
                name: data.name, 
                presupuesto: data.presupuesto,
                tokenWorkerFCM: data.tokenWorkerNotification
            })
        }
    }


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
            
            <Stack.Screen 
                name="BlogTrabajador" 
                options={{title: "Blog",headerStyle: {backgroundColor: `${_primaryColor}`,},headerShown: true}} component={BlogTrabajador} />
            
            <Stack.Screen 
                name="Blog" 
                options={{title: "Blog",headerStyle: {backgroundColor: `${_primaryColor}`,},headerShown: true}} 
                component={Blog} />
                
            <Stack.Screen name="BlogsScreen" options={{title: "Blogs"}} component={BlogsScreen} />            
            
            <Stack.Screen
                 name="Chat" 
                 options={{
                    title: "Chat",
                    headerStyle: {
                        backgroundColor: `${_primaryColor}`,
                    },
                    headerShown: true
                }} 
                 component={ChatScreen} 
            />

            <Stack.Screen 
                name="Notification"
                options={{
                    title: "Presupuesto",
                    headerStyle: {
                        backgroundColor: `${_primaryColor}`,
                    },
                    headerShown: true
                }}
                component={NotificationScreen}
            />

        </Stack.Navigator>
    )
}