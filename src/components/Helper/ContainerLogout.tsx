import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import LottieView from 'lottie-react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';

interface Props {
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    modalVisible: boolean;
    textDescription: string;
    navigation: StackNavigationProp<RootStackParams, 'PrincipalCliente'>;
}

const ContainerLogout = ({ setModalVisible, modalVisible, textDescription, navigation }: Props) => {

    const handleLogout = async () => {
        setModalVisible(!modalVisible)
        // Alert.alert('Id', auth().currentUser?.uid)
        // try {
        //     await AsyncStorage.removeItem('@idUser');
        //     let provider = auth().currentUser?.providerData[0].providerId;
        //     if (provider === 'google.com') {
        //         await GoogleSignin.revokeAccess();
        //         await GoogleSignin.signOut();
        //     }
        //     await auth().signOut();
        //     setTimeout(() => {
        //         navigation.navigate('Principal')
        //     }, 3000);
        // } catch (error) {

        // }
        // setTimeout(() => {

        // })
        // const provider = auth().currentUser?.providerData[0].providerId;
        // if (provider === 'google.com') {
        //     await GoogleSignin.revokeAccess();
        //     await GoogleSignin.signOut();
        // } else {
        //     await auth().signOut();
        // }
        // setTimeout(() => {
        //     navigation.navigate('Principal');
        // } , 1000);
    }


    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View style={styles.containerAnimation}>
                    <Text style={styles.textStyle}>{textDescription}</Text>
                    <LottieView
                        source={require('../../animated/swinging-sad-emoji.json')}
                        autoPlay
                        loop
                    />
                </View>
                <Pressable
                    style={[styles.button, styles.buttonlogout]}
                    onPress={() => handleLogout()}
                >
                    <Text style={styles.textButton}>Salir</Text>
                </Pressable>
                <Pressable
                    style={[styles.button, styles.buttonOpen]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={styles.textButton}>Cancelar</Text>
                </Pressable>
            </View>
        </View>
    )
}

export default ContainerLogout

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    buttonOpen: {
        backgroundColor: "#ff353a",
    },
    buttonlogout: {
        backgroundColor: "#2196F3",
    },
    textButton: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },
    textStyle: {
        color: "#000",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 23,
        marginTop: -35,
        borderBottomWidth: 2,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
        borderRadius: 10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    },
    containerAnimation: {
        width: 200,
        height: 252,
        marginTop: 20,
        flexDirection: 'column',
    }
})