import React, { useState, useContext, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Alert
} from 'react-native'
import ApiClient from '../api/ApiClient'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { DarkModeContext } from '../DarkModeContext'

const blueColor = '#0000ff'

const styles = (isDarkMode) =>
  StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 10,
      backgroundColor: isDarkMode ? '#1c1c1c' : 'white'
    },
    title: {
      paddingTop: 10,
      fontSize: 24,
      fontWeight: 'bold',
      fontFamily: 'AGRevueCyr-Roman',
      color: blueColor,
      textAlign: 'center',
      marginBottom: 20
    },
    itemContainer: {
      marginBottom: 20,
      borderWidth: 1,
      borderColor: blueColor,
      padding: 10,
      marginHorizontal: 10,
      backgroundColor: isDarkMode ? 'grey' : 'white'
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      color: blueColor
    },
    value: {
      fontSize: 14,
      color: isDarkMode ? 'black' : 'black'
    },
    input: {
      height: 40,
      backgroundColor: isDarkMode ? '#333333' : 'white',
      color: isDarkMode ? 'white' : 'black',
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 5,
      marginHorizontal: 10,
      marginBottom: 10,
      paddingHorizontal: 10
    },
    button: {
      width: Dimensions.get('window').width - 20,
      backgroundColor: blueColor,
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 5,
      marginVertical: 5,
      alignSelf: 'center'
    },
    buttonText: {
      fontFamily: 'AGRevueCyr-Roman',
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
  4: 'Toei Animation',
  5: 'Manglobe',
  6: 'Production I.G',
  7: 'Shaft',
  8: 'Sunrise',
  9: 'ufotable',
  10: 'Wit Studio',
  11: 'Trigger',
  12: 'PC.A. Works',
  14: 'J.C. Staff'
}

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

const AnimeListScreen = () => {
  const { t, i18n } = useTranslation()
  const [animeList, setAnimeList] = useState([])
  const [characterList, setCharacterList] = useState([])
  const [staffList, setStaffList] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const { isDarkMode } = useContext(DarkModeContext)
  const [searchMode, setSearchMode] = useState('anime')

  const handleChangeLanguage = () => {
    const newLanguage = i18n.language === 'en' ? 'ja' : 'en'
    i18n.changeLanguage(newLanguage)
  }

  const handleDeleteAnime = async (animeId) => {
    try {
      await ApiClient.delete(`http://51.210.101.138:5000/anime/${animeId}`)
      setAnimeList(animeList.filter((anime) => anime.anime_id !== animeId))
    } catch (error) {
      console.error('Error deleting anime:', error)
    }
  }

  const showDeleteConfirmation = (animeId, animeTitle) => {
    Alert.alert(
      'Delete Anime',
      `Are you sure you want to delete ${animeTitle}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            handleDeleteAnime(animeId)
            Alert.alert(
              'Success',
              `Anime "${animeTitle}" has been successfully deleted!`
            )
            console.log(`Deleted anime: "${animeTitle}", ID: ${animeId}`)
          },
          style: 'destructive'
        }
      ],
      { cancelable: false }
    )
  }

  useFocusEffect(
    useCallback(() => {
      const refetchData = async () => {
        if (title.length === 0) {
          await fetchAllAnime()
        }
      }

      refetchData()
    }, [title])
  )

  const fetchAnimeList = async (searchText) => {
    setLoading(true)
    try {
      const searchUrl = `http://51.210.101.138:5000/anime/name/${encodeURIComponent(
        searchText.trim().toLowerCase()
      )}`
      const response = await ApiClient.get(searchUrl)
      setAnimeList([response.data])
    } catch (error) {
      console.error('Error fetching anime list:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStaffList = async () => {
    setLoading(true)
    try {
      const response = await ApiClient.get('http://51.210.101.138:5000/staff')
      setStaffList(response.data)
    } catch (error) {
      console.error('Error fetching staff list:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllAnime = async () => {
    setLoading(true)
    try {
      const response = await ApiClient.get('http://51.210.101.138:5000/anime')
      setAnimeList(response.data)
    } catch (error) {
      console.error('Error fetching all anime:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAllCharacters = async () => {
    setLoading(true)
    try {
      const response = await ApiClient.get(
        'http://51.210.101.138:5000/character/'
      )
      setCharacterList(response.data)
    } catch (error) {
      console.error('Error fetching all characters:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (mode) => {
    setSearchMode(mode)
    if (title.length > 0) {
      if (mode === 'anime') {
        fetchAnimeList(title)
      }
    } else {
      if (mode === 'anime') {
        fetchAllAnime()
      } else if (mode === 'character') {
        fetchAllCharacters()
      } else if (mode === 'staff') {
        fetchStaffList()
      }
    }
  }

  const handleAnimePress = (item) => {
    navigation.navigate('AnimeDetails', { item })
  }

  const handleCharacterPress = (item) => {
    navigation.navigate('CharacterDetails', { item })
  }

  const navigateToAddAnime = () => {
    navigation.navigate('AddAnime')
  }

  const handleTitleChange = (text) => {
    setTitle(text)
    if (!text) {
      setAnimeList([])
    }
  }

  const renderCharacterItem = ({ item }) => {
    const animeName = animeMapping[item.anime_id]
    return (
      <TouchableOpacity
        style={styles(isDarkMode).itemContainer}
        onPress={() => handleCharacterPress(item)}
      >
        <Image
          source={{ uri: item.image_url }}
          style={{ width: 100, height: 100 }}
        />
        <Text style={styles(isDarkMode).label}>{t('animeListScreen.id')}:</Text>
        <Text style={styles(isDarkMode).value}>{item.character_id}</Text>
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.name')}:
        </Text>
        <Text style={styles(isDarkMode).value}>{item.name}</Text>
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.animeID')}:
        </Text>
        <Text style={styles(isDarkMode).value}>{item.anime_id}</Text>
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.title')}:
        </Text>
        <Text style={styles(isDarkMode).value}>{animeName}</Text>
      </TouchableOpacity>
    )
  }

  const renderItem = ({ item }) => {
    const genreName = genreMapping[item.genre_id]
    const studioName = studioMapping[item.studio_id]

    return (
      <TouchableOpacity
        style={styles(isDarkMode).itemContainer}
        onPress={() => handleAnimePress(item)}
        onLongPress={() => showDeleteConfirmation(item.anime_id, item.title)}
      >
        <Text style={styles(isDarkMode).label}>{t('animeListScreen.id')}:</Text>
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
          {t('animeListScreen.studio')}:
        </Text>
        <Text style={styles(isDarkMode).value}>{studioName}</Text>
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.genres')}:
        </Text>
        <Text style={styles(isDarkMode).value}>{genreName}</Text>
      </TouchableOpacity>
    )
  }

  const renderStaffItem = ({ item }) => {
    const studioName = studioMapping[item.studio_id]

    return (
      <View style={styles(isDarkMode).itemContainer}>
        <Text style={styles(isDarkMode).label}>{t('animeListScreen.id')}:</Text>
        <Text style={styles(isDarkMode).value}>{item.staff_id}</Text>
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.name')}:
        </Text>
        <Text style={styles(isDarkMode).value}>{item.name}</Text>
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.position')}:
        </Text>
        <Text style={styles(isDarkMode).value}>{item.position}</Text>
        <Text style={styles(isDarkMode).label}>
          {t('animeListScreen.studio')}:
        </Text>
        <Text style={styles(isDarkMode).value}>{studioName}</Text>
      </View>
    )
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
    <SafeAreaView style={styles(isDarkMode).container}>
      <Text style={styles(isDarkMode).title}>
        {t('animeListScreen.maintitle')}
      </Text>
      <CustomButton
        title={i18n.language === 'en' ? '日本語' : 'English'}
        onPress={handleChangeLanguage}
      />
      <TextInput
        style={styles(isDarkMode).input}
        onChangeText={handleTitleChange}
        value={title}
        placeholder={t('animeListScreen.search_by_title')}
        placeholderTextColor={isDarkMode ? 'gray' : 'gray'}
        clearButtonMode="always"
      />

      <CustomButton
        title={t('animeListScreen.search_anime')}
        onPress={() => handleSearch('anime')}
        disabled={loading}
      />
      <CustomButton
        title={t('animeListScreen.add_anime')}
        onPress={() => navigateToAddAnime()}
        disabled={loading}
      />
      <CustomButton
        title={t('animeListScreen.search_characters')}
        onPress={() => handleSearch('character')}
        disabled={loading}
      />
      <CustomButton
        title={t('animeListScreen.search_staff')}
        onPress={() => handleSearch('staff')}
        disabled={loading}
      />
      {loading
        ? (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
          )
        : searchMode === 'anime'
          ? (
        <FlatList
          data={animeList}
          renderItem={renderItem}
          keyExtractor={(item) => item.anime_id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
            )
          : searchMode === 'character'
            ? (
        <FlatList
          data={characterList}
          renderItem={renderCharacterItem}
          keyExtractor={(item) => item.character_id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
              )
            : (
        <FlatList
          data={staffList}
          renderItem={renderStaffItem}
          keyExtractor={(item) => item.staff_id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
              )}
    </SafeAreaView>
  )
}

export default AnimeListScreen
