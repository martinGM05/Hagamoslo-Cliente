import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useEffect, useReducer, useState } from 'react'
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance, EventType } from '@notifee/react-native';
import clienteAxios from '../../config/clientAxios';
import { _url } from '../../global/Variables';

interface DataNotification {
    id: string,
    type: string,
    name: string,
}

export const authInitialState: any = {
    id: '',
    type: '',
    name: '',
}

export interface NotificationContextProps {
    displayNotification: (data: any) => void;
}

export const NotificationContext = createContext({} as NotificationContextProps);

export const NotificationProvider = ({ children }: { children: JSX.Element }) => {

    const [dataNotification, setDataNotification] = useState(authInitialState);

    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            // console.log(remoteMessage.data)
            // goTo(remoteMessage.data)
            // console.log('Message received:  ', remoteMessage);
            DisplayNotification(remoteMessage)
        });

        const unsubscribe2 = messaging().onNotificationOpenedApp(async remoteMessage => {
            console.log('Notificacion abierta')
        });

        return () => {
            unsubscribe();
            unsubscribe2();
        }
    }, []);

    const goTo = (data: any) => {
        if (data.type === 'chat') {
            console.log('Esto es un chat')
        }
    }

    const DisplayNotification = async (remoteMessage: any) => {
        if (remoteMessage.data.type === 'chat') {
            const channelId = await notifee.createChannel({
                id: 'important',
                name: 'Important Notifications',
                importance: AndroidImportance.HIGH,
            });

            await notifee.displayNotification({
                title: remoteMessage.notification.title,
                body: remoteMessage.notification.body,
                data: remoteMessage.data,
                android: {
                    channelId,
                    importance: AndroidImportance.HIGH,
                },
            });
        } else if(remoteMessage.data.type === 'contratado') {
            const channelId = await notifee.createChannel({
                id: 'important',
                name: 'Important Notifications',
                importance: AndroidImportance.HIGH,
            });

            await notifee.displayNotification({
                title: remoteMessage.notification.title,
                body: remoteMessage.notification.body,
                data: remoteMessage.data,
                android: {
                    channelId,
                    importance: AndroidImportance.HIGH,
                    largeIcon: `${_url}/upload/Users/${remoteMessage.data.id}`
                },
            });
        }else{
            const channelId = await notifee.createChannel({
                id: 'default',
                name: 'Default Channel',
            });

            // Display a notification
            await notifee.displayNotification({
                title: remoteMessage.notification.title,
                body: remoteMessage.notification.body,
                data: remoteMessage.data,
                android: {
                    channelId,
                    smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
                },
            });
        }


    }




    return (
        <NotificationContext.Provider value={{
            displayNotification: (data: any) => DisplayNotification(data)

        }}>
            {children}
        </NotificationContext.Provider>
    )
}



