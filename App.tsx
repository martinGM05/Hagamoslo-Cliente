import React, { useEffect } from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/routes/StackNavigator';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import { SesionProvider } from './src/context/Sesion/SesionContext';
import 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import useNotification, { Notification } from './src/hooks/useNotification';


const App = () => {

  const { sendNotification } = useNotification();

  useEffect(() => {
    // getFCMToken();
    requestPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // console.log('Message received:  ', remoteMessage);
      DisplayNotification(remoteMessage)
    });
    return unsubscribe;
  }, []);

 

  const requestPermission = async () => {
    const authStatus = await messaging().requestPermission();
  }

  async function DisplayNotification(remoteMessage: any) {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: remoteMessage.notification.title,
      body: remoteMessage.notification.body,
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }

  async function localDisplayNotification() {
    // Create a channel
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    // Display a notification
    await notifee.displayNotification({
      title: 'Notification Title',
      body: 'Main body content of the notification',
      android: {
        channelId,
        smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      },
    });
  }

  const sendNotify = async () => {

    let data: Notification = {
      body: 'Que eres la verga',
      title: 'Martin dejame decirte',
      tokenFCM: 'cPM_Y4lXSRWNeXOPgr98IA:APA91bH5o8xWjVINVm6f9iuIEvj5LRTSMX_1lotb8gTPK8hdqWjmgs33mTQ_KTP7OXgB0JtQekLz3AUiSdkzCobCVUdThEXLf2TqQRDVnJrQJbyPfwJ1_5YNa4guT_CNmuA_nl477wyN'
    }

    await sendNotification(data)
  }

  


  LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
  ])

  return (

    <NavigationContainer>
      <SesionProvider>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
          animated={true}
          showHideTransition="fade"
        />
        {/* <View style={{
          backgroundColor: '#fff',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Pressable
            style={{
              backgroundColor: '#326941',
              padding: 10,

            }}
            onPress={() => sendNotify() }
          >
            <Text> Press me </Text>
          </Pressable>

        </View> */}
        <StackNavigator />
        {/* <Toast config={toastConfig} /> */}
      </SesionProvider>
    </NavigationContainer>

  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
