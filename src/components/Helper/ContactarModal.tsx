import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import LottieView from 'lottie-react-native';

interface Props {
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    modalVisible: boolean;
    textDescription: string;
    idTrabajador: string;
    idUsuario: string;
    GuardarTrabajosEnCurso: (idUsuario: string, idTrabajadorsave: string) => void;
    navigation: any;
}


const ContactarModal = ({ setModalVisible, modalVisible, textDescription, 
                        idTrabajador, idUsuario, GuardarTrabajosEnCurso, navigation }: Props) => {


    const [animation, setAnimation] = useState(1);
    const [text, setText] = useState(textDescription);

    const handleContactar = () => {
        setAnimation(2)
        setText('Contactado, se encuentra en el apartado de trabajos en curso')
        GuardarTrabajosEnCurso(idUsuario, idTrabajador)
        setTimeout(() => {
            setModalVisible(!modalVisible)
            navigation.goBack()
        }, 5000)
    }


    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View style={styles.containerAnimation}>
                    <Text style={styles.textStyle}>{text}</Text>
                    {
                        animation === 1 ?(
                            <LottieView
                                source={require('../../animated/we-are-hiring.json')}
                                autoPlay
                                loop
                            /> ):(
                                <LottieView
                                    source={require('../../animated/confirmation-bubble-bottom-sheet.json')}
                                    autoPlay
                                    loop
                                />
                            )
                            
                    }
                    
                </View>
                <View style={styles.containerButton}>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleContactar()}
                    >
                        <Text style={styles.textButton}>Contratar</Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, styles.buttonOpen]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textButton}>Regresar</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

export default ContactarModal

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
    buttonClose: {
        backgroundColor: "#2196F3",
        width: 100,
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
        fontSize: 20,
        marginTop: -20,
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    button: {
        backgroundColor: '#00a680',
        width: 100,
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
        marginHorizontal: 10,
    },
    containerAnimation: {
        width: 250,
        height: 230,
        marginTop: 50,
        flexDirection: 'column',
    },
    containerButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        // backgroundColor: '#000',
        alignItems: 'center',
    }
})