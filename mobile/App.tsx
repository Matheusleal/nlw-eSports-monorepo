import { useRef, useEffect } from 'react'
import { StatusBar } from 'react-native';
import { Subscription } from 'expo-modules-core';
import * as Notifications from 'expo-notifications'


import './src/services/notificationConfigs'
import { getPushNotificationToken } from './src/services/getPushNotificationToken'

import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black
} from '@expo-google-fonts/inter'

//images
import { Background } from './src/components/Background';

//screens
import { Routes } from './src/routes';
import { Loading } from './src/components/Loading';

//app
export default function App() {

  const getNotificationListener = useRef<Subscription>()
  const responsetNotificationListener = useRef<Subscription>()

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black
  })

  useEffect(() => {
    getPushNotificationToken()
  })

  useEffect(() => {
    getNotificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log(notification)
    })

    responsetNotificationListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response)
    })

    return () => {
      if (getNotificationListener.current && responsetNotificationListener.current) {
        Notifications.removeNotificationSubscription(getNotificationListener.current)
        Notifications.removeNotificationSubscription(responsetNotificationListener.current)
      }
    }
  }, [])

  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      {fontsLoaded ? <Routes /> : <Loading />}

    </Background>
  );
}