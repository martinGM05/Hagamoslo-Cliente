import { StyleSheet, Text, View, Modal } from 'react-native';
import React, { useState } from 'react'

import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';

import ContainerLogout from '../Helper/ContainerLogout';


interface Props {
    navigation: StackNavigationProp<RootStackParams, 'PrincipalCliente'>;
    
}

const LogOut = ({ navigation }: Props) => {

    const [modalVisible, setModalVisible] = useState(false);

    const logOut = async () => {
        try {
            setModalVisible(true)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <TouchableOpacity style={styles.containerGlobal}
                onPress={() => logOut()}
            >
                <Icon name="sign-out" size={30} color="#000" />
            </TouchableOpacity>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <ContainerLogout
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    textDescription="¿Estás seguro de que quieres salir?"
                    navigation={navigation}
                />
            </Modal>
        </>
    )
}

export default LogOut

const styles = StyleSheet.create({
    containerGlobal: {
        width: 40,
        height: 40,
        // backgroundColor: 'red',
    }
})