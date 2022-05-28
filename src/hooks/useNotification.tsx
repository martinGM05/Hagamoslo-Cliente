import messaging from '@react-native-firebase/messaging';
import { useState } from 'react';
import clienteAxios from '../config/clientAxios';


export interface Notification {
    body: string;
    title: string;
    tokenFCM: string;
}

const useNotification = () => {

    const sendNotification = async (data: Notification) => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", "key=AAAArJdXaaQ:APA91bFJfe9Q8UtDx4ZGn67R3Zh-QUnVe-zZ-Jq4TooqxK2Kujls1iNtygSSS96XJofCEeplXLVDZjFqODcX1UZYl5g1IymcZlEJqhH1j-6YvdqLBua-tpCb-2DtKwdlfWy1PEWpAXoz");
        myHeaders.append("Content-Type", "application/json");
    
        var raw = JSON.stringify({
            "data": {},
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

    const getFCMToken = async () => {
        messaging()
          .getToken()
          .then(token => {
            // return saveTokenToDatabase(token);
            console.log('Token =>  ', token);
          });
      }

    return {
        sendNotification,
        getFCMToken
    }

}

export default useNotification