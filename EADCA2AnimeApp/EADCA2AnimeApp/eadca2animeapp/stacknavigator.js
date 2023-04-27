import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AnimeDetails from './screens/AnimeDetails'
import AnimeListScreen from './screens/AnimeListScreen'
import AddAnime from './screens/AddAnime'
import CharacterDetails from './screens/CharacterDetails'
import { DarkModeContext } from './DarkModeContext'
import { MaterialIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'

const StackNavigator = () => {
  const { t } = useTranslation()
  const Stack = createNativeStackNavigator()
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? '#0000ff' : '#0000ff'
          },
          headerTintColor: isDarkMode ? 'white' : 'white',
          headerTitleStyle: {
            color: isDarkMode ? 'white' : 'white',
            fontWeight: 'bold'
          }
        }}
      >
        <Stack.Screen
          name="AnimeList"
          component={AnimeListScreen}
          options={{
            title: t('header.list_anime'),
            headerRight: () => (
              <MaterialIcons
                name={isDarkMode ? 'lightbulb' : 'lightbulb-outline'}
                size={24}
                color="black"
                style={{ marginRight: 20 }}
                onPress={toggleDarkMode}
              />
            )
          }}
        />
        <Stack.Screen
          name="AnimeDetails"
          component={AnimeDetails}
          options={{ title: t('header.anime_details') }}
        />
        <Stack.Screen
          name="CharacterDetails"
          component={CharacterDetails}
          options={{ title: t('header.character_details') }}
        />
        <Stack.Screen
          name="AddAnime"
          component={AddAnime}
          options={{ title: t('header.add_new_anime') }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigator
