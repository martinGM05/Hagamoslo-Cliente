import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import ContactarModal from '../Helper/ContactarModal';


const ButtonContact = ({ navigation }: any) => {
   // const { idTrabajadorContactar, GuardarTrabajosEnCurso, TrabajadorEnCurso, GetTrabajadoresEnCurso } = useContext(Contexto)

    const [modalVisible, setModalVisible] = useState(false);

    const handleContactar = () => {
        setModalVisible(true)
    }
let TrabajadorEnCurso=['']

function GuardarTrabajosEnCurso(){
    
}

    return (
        <>
            {
                TrabajadorEnCurso.find(trade => "trade.Id" === null) ? (
                    <View style={styles.containerDisabled}>
                        <TouchableOpacity
                            style={styles.buttonContact}
                            onPress={() => handleContactar()}
                            disabled={true}
                        >
                            <Icon name="phone-in-talk" size={25} color="#000" />
                            <Text style={styles.textContact}>Contactado</Text>

                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.containerContact}>
                        <TouchableOpacity
                            style={styles.buttonContact}
                            onPress={() => handleContactar()}

                        >
                            <Icon name="phone-in-talk" size={25} color="#000" />
                            <Text style={styles.textContact}>Contactar</Text>

                        </TouchableOpacity>
                    </View>
                )
            }

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <ContactarModal
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    textDescription="Contratar"
                    idTrabajador={"idTrabajadorContactar"}
                    idUsuario={"Sesion.Id"}
                    GuardarTrabajosEnCurso={GuardarTrabajosEnCurso}
                    navigation={navigation}
                />
            </Modal>
        </>
    )
}


export default ButtonContact

const styles = StyleSheet.create({
    containerContact: {

        // position: 'absolute',
        // bottom: 0,
        width: '100%',
        height: '15%',
        marginTop: 18,
        backgroundColor: '#00a680',
        borderWidth: 1,
        borderRadius: 10,

        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation: 10,
    },
    containerDisabled: {
        // position: 'absolute',
        // bottom: 0,
        width: '100%',
        height: '15%',
        marginTop: 18,
        backgroundColor: '#604f5e',
        borderWidth: 1,
        borderRadius: 10,

        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        elevation: 10,
    },
    buttonContact: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textContact: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginLeft: 15,
    },
})