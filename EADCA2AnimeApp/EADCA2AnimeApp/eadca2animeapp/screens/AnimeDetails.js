import React, { useContext, useState, useLayoutEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import { DarkModeContext } from '../DarkModeContext'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import ApiClient from '../api/ApiClient'

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
      fontSize: 16,
      fontWeight: 'bold',
      color: blueColor
    },
    value: {
      fontSize: 14,
      color: isDarkMode ? 'white' : 'black'
    },
    input: {
      height: 40,
      backgroundColor: isDarkMode ? '#333333' : 'white',
      color: isDarkMode ? 'white' : 'black',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 10,
      marginHorizontal: 10,
      marginBottom: 10,
      paddingHorizontal: 10
    },
    button: {
      width: Dimensions.get('window').width - 40,
      backgroundColor: blueColor,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      marginVertical: 5,
      marginHorizontal: 10,
      alignSelf: 'center'
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
    }
  })

const genreMapping = {
  1: 'Action',
  2: 'Comedy',
  3: 'Drama',
  4: 'Ecchi',
  5: 'Fantasy',
  6: 'Sports',
  7: 'Music',
  8: 'Mystery',
  9: 'Romance',
  10: 'Slice of Life',
  11: 'Thriller',
  12: 'Psychological',
  13: 'Sports',
  14: 'Horror'
}

const studioMapping = {
  1: 'Kyoto Animation',
  2: 'Bones',
  3: 'Madhouse',
  4: 'Kyoto Animation',
  5: 'Madhouse',
  6: 'Production I.G',
  7: 'Shaft',
  8: 'Sunrise',
  9: 'ufotable',
  10: 'Wit Studio',
  11: 'Trigger',
  12: 'PC.A. Works',
  14: 'J.C. Staff'
}

const AnimeDetails = ({ route }) => {
  const { t } = useTranslation()
  const { item } = route.params
  const { isDarkMode } = useContext(DarkModeContext)
  const [rating, setRating] = useState(item.rating)
  const genreName = genreMapping[item.genre_id]
  const navigation = useNavigation()
  const studioName = studioMapping[item.studio_id]
  const [newRating, setNewRating] = useState('')

  useLayoutEffect(() => {
    navigation.setOptions({
      title: item.title
    })
  }, [navigation, item.title])

  const CustomButton = ({ title, onPress, disabled }) => (
    <TouchableOpacity
      style={[
        styles(isDarkMode).button,
        disabled && { backgroundColor: 'gray' }
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles(isDarkMode).buttonText}>{title}</Text>
    </TouchableOpacity>
  )

  const showAlert = (title, oldRating, newRating) => {
    Alert.alert(
      'Rating Updated',
      `You have successfully updated "${title}"'s rating from ${oldRating} to ${newRating}!`,
      [
        {
          text: 'OK'
        }
      ],
      { cancelable: false }
    )
  }

  const invalidRatingAlert = () => {
    Alert.alert(
      'Invalid Rating',
      'Please enter a rating between 0 and 10',
      [
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed')
        }
      ],
      { cancelable: false }
    )
  }

  const updateRating = async (newRating) => {
    if (newRating < 0 || newRating > 10) {
      invalidRatingAlert()
      return
    }
    try {
      // Create a copy of the item object and update the rating field
      const updatedItem = { ...item, rating: newRating }

      const response = await ApiClient.put(
        `http://51.210.101.138:5000/anime/${item.anime_id}`,
        updatedItem,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.status === 200 || response.status === 204) {
        showAlert(item.title, rating, newRating) // Call showAlert after successful update
        setRating(newRating)
        Keyboard.dismiss()
      } else {
        console.error('Error updating rating:', response)
      }
    } catch (error) {
      console.error('Error updating rating:', error)
    }
  }

  return (
    <ScrollView style={styles(isDarkMode).container}>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.animeID')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{item.anime_id}</Text>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.title')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{item.title}</Text>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.synopsis')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{item.synopsis}</Text>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.startDate')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{item.start_date}</Text>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.endDate')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{item.end_date}</Text>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.season')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{item.season}</Text>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.duration')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{item.duration} minutes</Text>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.rating')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{rating}</Text>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.studioID')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{item.studio_id}</Text>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.studio')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{studioName}</Text>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.genreID')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{item.genre_id}</Text>
      <Text style={styles(isDarkMode).label}>
        {t('animeListScreen.genres')}:
      </Text>
      <Text style={styles(isDarkMode).value}>{genreName}</Text>
      <View style={{ flex: 1 }}></View>
      <TextInput
        style={styles(isDarkMode).input}
        onChangeText={(text) => setNewRating(text)}
        value={newRating}
        keyboardType="numeric"
        placeholder={t('animeListScreen.input_rating')}
        placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
      />
      <CustomButton
        title={t('animeListScreen.update_rating')}
        onPress={() => {
          if (!isNaN(parseFloat(newRating))) {
            updateRating(parseFloat(newRating))
            setNewRating('')
          }
        }}
        disabled={isNaN(parseFloat(newRating))}
      />
    </ScrollView>
  )
}

export default AnimeDetails
