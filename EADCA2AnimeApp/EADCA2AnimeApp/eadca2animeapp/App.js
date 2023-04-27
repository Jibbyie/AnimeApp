import React, { useState, useEffect } from 'react'
import StackNavigator from './stacknavigator'
import { DarkModeProvider } from './DarkModeContext'
import * as SplashScreen from 'expo-splash-screen'
import * as Font from 'expo-font'
import i18n from './i18n'
import { I18nextProvider } from 'react-i18next'

const fetchFonts = () => {
  return Font.loadAsync({
    'AGRevueCyr-Roman': require('./assets/fonts/agrevc.ttf')
  })
}

export default function App () {
  const [fontLoaded, setFontLoaded] = useState(false)

  useEffect(() => {
    const initApp = async () => {
      try {
        await SplashScreen.preventAutoHideAsync()
        await fetchFonts()
        setFontLoaded(true)
      } catch (error) {
        console.error(error)
      } finally {
        SplashScreen.hideAsync()
      }
    }

    initApp()
  }, [])

  if (!fontLoaded) {
    return null
  }

  return (
    <I18nextProvider i18n={i18n}>
    <DarkModeProvider>
      <StackNavigator />
    </DarkModeProvider>
    </I18nextProvider>
  )
}
