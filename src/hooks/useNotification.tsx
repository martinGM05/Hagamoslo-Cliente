import messaging from '@react-native-firebase/messaging';
import { useContext, useState } from 'react';
import clienteAxios from '../config/clientAxios';
import { SesionContext } from '../context/Sesion/SesionContext';
import { _url } from '../global/Variables';


export interface Notification {
    body: string;
    title: string;
    tokenFCM: string;
    type: string;
    name: string;
    id: number;
    presupuesto?: number;
    tokenWorkerNotification?: string;
}

const useNotification = () => {

    const { Sesion } = useContext(SesionContext)

    const sendNotification = async (data: Notification) => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "key=AAAArJdXaaQ:APA91bFJfe9Q8UtDx4ZGn67R3Zh-QUnVe-zZ-Jq4TooqxK2Kujls1iNtygSSS96XJofCEeplXLVDZjFqODcX1UZYl5g1IymcZlEJqhH1j-6YvdqLBua-tpCb-2DtKwdlfWy1PEWpAXoz");
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "data": {
                id: data.id,
                type: data.type,
                name: data.name,
                presupuesto: data.presupuesto,
                tokenWorkerNotification: data.tokenWorkerNotification
            },
            "notification": {
                "body": data.body,
                "title": data.title
            },
            "to": data.tokenFCM
        });
    
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };


        fetch("https://fcm.googleapis.com/fcm/send", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    const requestPermission = async () => {
        const authStatus = await messaging().requestPermission();
      }

   

    return {
        sendNotification,
        requestPermission
    }

}

export default useNotification