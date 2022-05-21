import { Alert, Dimensions, StyleSheet, View } from 'react-native'
import React from 'react'
import FormPerfil from '../../components/Perfil/FormPerfil';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import ButtonOpen from '../../components/MenuDrawer/ButtonOpen';
const dimensions = Dimensions.get('window')

const Perfil = ({navigation}: any) => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.containerForm}>
                <FormPerfil />
            </View>
        </ScrollView>
    )
}

export default Perfil

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerProfile: {
        width: dimensions.width,
        height: dimensions.height * 0.3,
        backgroundColor: '#fff',
        justifyContent: 'flex-end',
        alignItems: 'center',
        zIndex: -1,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 8,
    },
    containerForm: {
        width: dimensions.width,
        // height: dimensions.height * 0.74,
        zIndex: -1,
    },
})