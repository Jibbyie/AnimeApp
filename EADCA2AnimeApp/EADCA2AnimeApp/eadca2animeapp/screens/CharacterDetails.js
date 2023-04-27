import React, { useContext, useLayoutEffect } from 'react'
import { ScrollView, Text, StyleSheet, Image } from 'react-native'
import { DarkModeContext } from '../DarkModeContext'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

const blueColor = '#0000ff'

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 10,
      backgroundColor: isDarkMode ? '#1c1c1c' : 'white'
    },
    label: {
      fontSize: 30,
      fontWeight: 'bold',
      color: blueColor
    },
    value: {
      fontSize: 24,
      color: isDarkMode ? 'white' : 'black'
    }
  })

const animeMapping = {
  1: 'Fullmetal Alchemist: Brotherhood',
  2: 'K-On!',
  3: 'Death Note',
  4: 'Bleach',
  5: 'Koe no Katachi',
  6: 'Haikyuu!!',
  7: 'K-On!',
  8: 'Death Note',
  9: 'Your Lie in April',
  10: 'A Silent Voice',
  11: 'Attack on Titan',
  12: 'Haikyuu!!',
  13: 'Parasyte -the maxim-'
}

const CharacterDetailsScreen = ({ route }) => {
  const { t } = useTranslation()
  const { item } = route.params
  const animeName = animeMapping[item.anime_id]
  const { isDarkMode } = useContext(DarkModeContext)
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      title: item.name
    })
  }, [navigation, item.name])

  return (
    <ScrollView style={styles(isDarkMode).container}>
      <Image
        source={{ uri: item.image_url }}
        style={{ width: 300, height: 475 }}
      />
      <Text style={styles(isDarkMode).label}>{t('animeListScreen.id')}:</Text>
      <Text style={styles(isDarkMode).value}>{item.character_id}</Text>
      <Text style={styles(isDarkMode).label}>{t('animeListScreen.name')}:</Text>
      <Text style={styles(isDarkMode).value}>{item.name}</Text>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.animeID')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{item.anime_id}</Text>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.title')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{animeName}</Text>
    </ScrollView>
  )
}

export default CharacterDetailsScreen
