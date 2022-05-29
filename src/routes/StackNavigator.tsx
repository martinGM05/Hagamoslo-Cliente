import React, { useEffect } from 'react';
import { createStackNavigator, StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import InitialLogin from '../screens/Login/InitialLogin';
import Register from '../screens/Login/Register';
import DrawerNavigator from './DrawerNavigator';
import 'react-native-gesture-handler';
import WorkerDrawer from './WorkerDrawer';
import ChatScreen from '../screens/Chat/ChatScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';
import notifee, { EventType } from '@notifee/react-native';
import { useNavigation } from '@react-navigation/native';

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
    Notification: {id: string};
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
            navigation.navigate('Notification', { id: data.id })
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

            <Stack.Screen 
                name="Notification"
                options={{
                    title: "Notification",
                    headerStyle: {
                        backgroundColor: '#dd60cd',
                    },
                    headerShown: true
                }}
                component={NotificationScreen}
            />

        </Stack.Navigator>
    )
}