import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction } from 'react'
import LottieView from 'lottie-react-native';

interface Props {
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    modalVisible: boolean;
    textDescription: string;
}

const ValorarModal = ({ setModalVisible, modalVisible, textDescription }: Props) => {
    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.textStyle}>{textDescription}</Text>
                <View style={styles.containerAnimation}>
                    <LottieView
                        source={require('../../animated/top-nhat-review.json')}
                        autoPlay
                        loop
                    />
                </View>
            </View>
        </View>
    )
}

export default ValorarModal

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
        elevation: 5,
        borderWidth: 1,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
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
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        backgroundColor: '#00a680',
        width: 200,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
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
        height: 200,
        marginTop: 20,
        flexDirection: 'column',
    }
})