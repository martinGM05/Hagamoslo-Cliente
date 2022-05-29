import { Alert, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { Dispatch, SetStateAction, useState } from 'react'
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


interface Props {
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    modalVisible: boolean;
    textDescription: string;
}

const PresupuestoModal = ({ setModalVisible, modalVisible, textDescription }: Props) => {

    const [presupuesto, setPresupuesto] = useState(0);

    const handlePresupuesto = (presupuesto: number) => {
        // Verify if presupuesto is a number
        if (isNaN(presupuesto)) {
            Alert.alert('Error', 'El presupuesto debe ser un número');
            return;
        }else if(presupuesto <= 0){
            Alert.alert('Error', 'El presupuesto debe ser mayor a 0');
            return;
        }else if(presupuesto === 0){
            Alert.alert('Error', 'El presupuesto debe ser mayor a 0');
            return;
        }

        Alert.alert('Presupuesto', `¿Está seguro que desea enviar un presupuesto de $${presupuesto}?`, [
            {
                text: 'Cancelar',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Aceptar', onPress: () => {}},
        ], { cancelable: false })


    }

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.textStyle}>Ingrese el presupuesto</Text>
                <Ionicons 
                    name="ios-close" 
                    size={30}
                    style={styles.btnClose} 
                    onPress={() => setModalVisible(false)} 
                />
                <View style={styles.containerAnimation}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Ingrese su presupuesto"
                        keyboardType='numeric'
                        onChangeText={(money) => setPresupuesto(Number(money))}
                        value={presupuesto.toString()}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => handlePresupuesto(presupuesto)}
                    >
                        <Text style={styles.textButton}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default PresupuestoModal

const styles = StyleSheet.create({
    btnClose: {
        position: 'absolute',
        top: 10,
        right: 10,
        color: '#d70f14',
        zIndex: 1,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    inputStyle: {
        width: '100%',
        height: 40,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#000',
        padding: 10,
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
        // height: 200,
        marginTop: 20,
        flexDirection: 'column',
        // backgroundColor: '#246575',
    }
})