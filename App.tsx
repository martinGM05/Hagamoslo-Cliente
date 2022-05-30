import React, { useEffect, useState } from 'react';
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
import { NotificationProvider } from './src/context/Notifications/NotificationContext';
import { BlogProvider } from './src/context/Blog/Blogs';

const App = () => {

  LogBox.ignoreLogs([
    "ViewPropTypes will be removed",
    "ColorPropType will be removed",
  ])

  return (

    <NavigationContainer>
      <SesionProvider>
        <NotificationProvider>
          <BlogProvider>
            <StatusBar
              barStyle="dark-content"
              backgroundColor="transparent"
              translucent={true}
              animated={true}
              showHideTransition="fade"
              />
            <StackNavigator  />
          </BlogProvider>
        </NotificationProvider>
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
