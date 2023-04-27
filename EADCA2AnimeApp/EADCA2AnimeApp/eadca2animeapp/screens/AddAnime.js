import React, { useContext, useState, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native'
import { DarkModeContext } from '../DarkModeContext'
import { useTranslation } from 'react-i18next'
import ApiClient from '../api/ApiClient'
import {
  isValidDate,
  isInFuture,
  isEndDateBeforeStartDate
} from './dateValidation'

const blueColor = '#0000ff'

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 10,
      paddingBottom: 120,
      backgroundColor: isDarkMode ? '#1c1c1c' : 'white'
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: blueColor
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
      backgroundColor: blueColor,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      marginVertical: 5,
      alignSelf: 'center',
      width: '50%'
    },
    buttonText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
    }
  })

const AddAnime = () => {
  const { isDarkMode } = useContext(DarkModeContext)

  const { t } = useTranslation()
  const [anime_id, setAnimeId] = useState('')
  const [title, setTitle] = useState('')
  const [synopsis, setSynopsis] = useState('')
  const [start_date, setStartDate] = useState('')
  const [end_date, setEndDate] = useState('')
  const [season, setSeason] = useState('')
  const [duration, setDuration] = useState('')
  const [rating, setRating] = useState('')
  const [studio_id, setStudioId] = useState('')
  const [genre_id, setGenreId] = useState('')

  const isValidSeason = (season) => {
    return (
      season.toLowerCase() === 'spring' ||
      season.toLowerCase() === 'summer' ||
      season.toLowerCase() === 'autumn' ||
      season.toLowerCase() === 'fall' ||
      season.toLowerCase() === 'winter'
    )
  }

  // Validate rating input
  const isValidRating = (rating) => {
    return rating >= 0 && rating <= 10
  }

  // Validate studio ID input
  const isValidStudioId = (studioId) => {
    return studioId >= 1 && studioId <= 14
  }

  // Validate genre ID input
  const isValidGenreId = (genreId) => {
    return genreId >= 1 && genreId <= 14
  }

  useEffect(() => {
    // Fetch the highest anime_id and set the state
    const fetchHighestAnimeId = async () => {
      try {
        const response = await ApiClient.get(
          'http://51.210.101.138:5000/anime'
        )
        const highestAnimeId = Math.max(
          ...response.data.map((anime) => anime.anime_id)
        )
        setAnimeId(highestAnimeId + 1)
      } catch (error) {
        console.error('Error fetching highest anime_id:', error)
      }
    }

    fetchHighestAnimeId()
  }, [])

  const onAnimeIdBlur = async () => {
    try {
      const response = await ApiClient.get('http://51.210.101.138:5000/anime')
      const highestAnimeId = Math.max(
        ...response.data.map((anime) => anime.anime_id)
      )

      if (parseInt(anime_id) <= highestAnimeId) {
        setAnimeId(highestAnimeId + 1)
        Alert.alert(
          'Invalid Anime ID',
          `Anime ID has been updated to the next available value: ${
            highestAnimeId + 1
          }.`,
          [{ text: 'OK', onPress: () => {} }]
        )
      } else {
        setAnimeId(parseInt(anime_id)) // Ensure anime_id is always an integer
      }
    } catch (error) {
      console.error('Error fetching highest anime_id:', error)
    }
  }

  const validateInput = () => {
    return (
      title.trim() &&
      synopsis.trim() &&
      start_date.trim() &&
      end_date.trim() &&
      isValidSeason(season) &&
      duration.trim() &&
      isValidRating(rating) &&
      isValidStudioId(studio_id) &&
      isValidGenreId(genre_id)
    )
  }

  const clearAllFields = () => {
    setAnimeId('')
    setTitle('')
    setSynopsis('')
    setStartDate('')
    setEndDate('')
    setSeason('')
    setDuration('')
    setRating('')
    setStudioId('')
    setGenreId('')
  }

  const validateDate = (dateString) => {
    const date = new Date(dateString)
    return !isNaN(date)
  }

  const addAnime = async () => {
    if (!isValidDate(start_date) || !isValidDate(end_date)) {
      Alert.alert('Invalid Date', 'Please enter valid dates.', [
        { text: 'OK', onPress: () => {} }
      ])
      return
    }

    if (isInFuture(start_date) || isInFuture(end_date)) {
      Alert.alert('Invalid Date', 'Dates cannot be in the future.', [
        { text: 'OK', onPress: () => {} }
      ])
      return
    }

    if (isEndDateBeforeStartDate(start_date, end_date)) {
      Alert.alert('Invalid Date', 'End date cannot be before the start date.', [
        { text: 'OK', onPress: () => {} }
      ])
      return
    }
    try {
      const response = await ApiClient.get('http://51.210.101.138:5000/anime')
      const highestAnimeId = Math.max(
        ...response.data.map((anime) => anime.anime_id)
      )

      if (parseInt(anime_id) <= highestAnimeId) {
        setAnimeId(highestAnimeId + 1)
        Alert.alert(
          'Invalid Anime ID',
          "Anime ID has been updated to the next available value.\n You can now proceed with 'Add Anime",
          [{ text: 'OK', onPress: () => {} }]
        )
        return
      }
    } catch (error) {
      console.error('Error fetching highest anime_id:', error)
    }
    if (!validateDate(start_date) || !validateDate(end_date)) {
      Alert.alert('Invalid Date', 'Please enter valid dates.', [
        { text: 'OK', onPress: () => {} }
      ])
      return
    }
    try {
      const newAnime = {
        anime_id: parseInt(anime_id),
        title,
        synopsis,
        start_date: new Date(start_date).toISOString(),
        end_date: new Date(end_date).toISOString(),
        season,
        duration: parseInt(duration),
        rating: parseFloat(rating),
        studio_id: parseInt(studio_id),
        genre_id: parseInt(genre_id)
      }

      const response = await ApiClient.post(
        'http://51.210.101.138:5000/anime',
        newAnime,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 201) {
        Alert.alert('Success', 'Anime has been added successfully!', [
          { text: 'OK', onPress: () => {} }
        ])
        clearAllFields()
      } else {
        console.error('Error adding anime:', response)
      }
    } catch (error) {
      console.error('Error adding anime:', error)
    }
  }

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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles(isDarkMode).container}>
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.animeID')}:
        </Text>
        <TextInput
          style={styles(isDarkMode).input}
          onChangeText={(text) => setAnimeId(parseInt(text) || '')} // Convert to integer here as well
          onBlur={onAnimeIdBlur}
          value={anime_id}
          placeholder={t('animeListScreen.input_id')}
          keyboardType="numeric"
          placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
          clearButtonMode="always"
        />
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.title')}:
        </Text>
        <TextInput
          style={styles(isDarkMode).input}
          onChangeText={(text) => setTitle(text)}
          value={title}
          placeholder={t('animeListScreen.input_title')}
          placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
          clearButtonMode="always"
        />
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.synopsis')}:
        </Text>
        <TextInput
          style={styles(isDarkMode).input}
          onChangeText={(text) => setSynopsis(text)}
          value={synopsis}
          placeholder={t('animeListScreen.synopsis')}
          placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
          clearButtonMode="always"
        />
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.startDate')}:
        </Text>
        <TextInput
          style={styles(isDarkMode).input}
          onChangeText={(text) => setStartDate(text)}
          value={start_date}
          placeholder={t('animeListScreen.input_start_date')}
          placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
          clearButtonMode="always"
        />
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.endDate')}:
        </Text>
        <TextInput
          style={styles(isDarkMode).input}
          onChangeText={(text) => setEndDate(text)}
          value={end_date}
          placeholder={t('animeListScreen.input_end_date')}
          placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
          clearButtonMode="always"
        />
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.season')}:
        </Text>
        <TextInput
          style={styles(isDarkMode).input}
          onChangeText={(text) => setSeason(text)}
          onBlur={() => {
            if (!isValidSeason(season)) {
              Alert.alert(
                'Invalid Season',
                'Please enter Spring, Summer, Autumn/Fall, or Winter.',
                [{ text: 'OK', onPress: () => setSeason('') }]
              )
            }
          }}
          value={season}
          placeholder={t('animeListScreen.input_season')}
          placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
          clearButtonMode="always"
        />
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.duration')}:
        </Text>
        <TextInput
          style={styles(isDarkMode).input}
          onChangeText={(text) => setDuration(text)}
          value={duration}
          placeholder={t('animeListScreen.input_duration')}
          keyboardType="numeric"
          placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
          clearButtonMode="always"
        />
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.rating')}:
        </Text>
        <TextInput
          style={styles(isDarkMode).input}
          onChangeText={(text) => setRating(text)}
          onBlur={() => {
            if (!isValidRating(rating)) {
              Alert.alert(
                'Invalid Rating',
                'Please enter a rating from 0-10.',
                [{ text: 'OK', onPress: () => setRating('') }]
              )
            }
          }}
          value={rating}
          placeholder={t('animeListScreen.input_rating')}
          keyboardType="numeric"
          placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
          clearButtonMode="always"
        />
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.studioID')}:
        </Text>
        <TextInput
          style={styles(isDarkMode).input}
          onChangeText={(text) => setStudioId(text)}
          onBlur={() => {
            if (!isValidStudioId(studio_id)) {
              Alert.alert(
                'Invalid Studio ID',
                'Please enter a Studio ID from 1-14.',
                [{ text: 'OK', onPress: () => setStudioId('') }]
              )
            }
          }}
          value={studio_id}
          placeholder={t('animeListScreen.input_studio_id')}
          keyboardType="numeric"
          placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
          clearButtonMode="always"
        />
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.genreID')}:
        </Text>
        <TextInput
          style={styles(isDarkMode).input}
          onChangeText={(text) => setGenreId(text)}
          onBlur={() => {
            if (!isValidGenreId(genre_id)) {
              Alert.alert(
                'Invalid Genre ID',
                'Please enter a Genre ID from 1-14.',
                [{ text: 'OK', onPress: () => setGenreId('') }]
              )
            }
          }}
          value={genre_id}
          placeholder={t('animeListScreen.input_genre_id')}
          keyboardType="numeric"
          placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
          clearButtonMode="always"
        />
        <View style={{ paddingBottom: 40 }}>
          <CustomButton
            title={t('animeListScreen.add_anime')}
            onPress={() => {
              if (validateInput()) {
                addAnime()
              }
            }}
            disabled={!validateInput()}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default AddAnime
