import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


const ButtonOpen = ({navigation}: any) => {
    return (
        <Pressable style={styles.btnMenu}>
            <Icon name="menu" size={30} color="#000" onPress={() => {
                navigation.openDrawer()
            }} />
        </Pressable>
    )
}

export default ButtonOpen

const styles = StyleSheet.create({
    btnMenu:{
        width: 50,
        height: 40,
        backgroundColor: '#fffdfd',
        borderWidth: 1,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    }
})