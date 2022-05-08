import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
    navigation: any;
}

const BackButton = ({ navigation }:Props) => {
  return (
    <View style={styles.goBack}>
        <TouchableOpacity onPress={() => {
            navigation.goBack()
          }
        }>
          <Icon name="ios-arrow-back" size={30} color="#000" />
        </TouchableOpacity>
      </View>
  )
}

export default BackButton

const styles = StyleSheet.create({
    goBack: {
        width: 50,
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        position: 'absolute',
        top: 20,
        left: 15,
        zIndex: 1,
      },
})