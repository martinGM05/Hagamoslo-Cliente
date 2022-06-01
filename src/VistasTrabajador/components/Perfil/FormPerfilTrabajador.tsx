import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert, Pressable, Switch } from 'react-native';
import React, { useContext, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput, ScrollView } from 'react-native-gesture-handler';

import AvatarPerfil from './AvatarPerfil';
import Toast from 'react-native-toast-message'


import ContainerModal from '../../../components/Helper/ContainerModal';
import { SesionContext } from '../../../context/Sesion/SesionContext';
import MultiSelect from './MultiSelect';
import ActualizarPerfilTrabajador from '../../../hooks/ActualizarPerfilTrabajador';
import useTags from '../../../hooks/useTags';
import { _primaryColor, _secondaryColor } from '../../../global/Variables';

const FormPerfil = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const { Sesion } = useContext(SesionContext)
    // const [modalVisible, setModalVisible] = useState(false);
    const { ActualizarTrabajador, modalVisible, setModalVisible } = ActualizarPerfilTrabajador();
    const { coordinates } = useTags()
    const submit = async (values: any) => {
        if (isEnabled) {
            ActualizarTrabajador(values, true, coordinates.latitude, coordinates.longitude)

        } else {
            Alert.alert('Mensaje', '¿Esta seguro de no guardar su ubicación?, Si activa la ubicación es mas proble que lo contacten por cercania', [
                {
                    text: 'Si',
                    onPress: () => {
                        ActualizarTrabajador(values, true)
                    }
                }, {
                    text: 'No',
                    style: 'cancel'
                }
            ])
        }
    }

    const formikOpt = {
        initialValues: {
            Name: Sesion.nombre,
            Email: Sesion.correo,
            Phone: Sesion.numero,
            Photo: Sesion.urlFoto,
        },
        validationSchema: Yup.object({
            Name: Yup.string()
                .required('El nombre es requerido'),
            Phone: Yup.string()
                .min(10, 'El número de teléfono debe tener 10 dígitos')
                .required('El teléfono es requerido'),
            Photo: Yup.string()
                .required('La foto es requerida'),
        }),
        onSubmit: submit
    }


    return (
        <View style={styles.containerForm}>
            <Formik {...formikOpt}>
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View>
                        <View style={{ marginLeft: 90 }}>
                            <AvatarPerfil />
                        </View>

                        <View style={styles.userContainer}>
                            <TextInput
                                style={styles.inputStyle}
                                autoCorrect={false}
                                placeholder="Nombre"
                                placeholderTextColor="#999"
                                onChangeText={handleChange('Name')}
                                value={values.Name}
                                onBlur={handleBlur('Name')}
                            />
                            <Icon
                                name="ios-person"
                                style={styles.icon} />
                        </View>
                        {
                            touched.Name && errors.Name ?
                                <View style={styles.contenedorError}>
                                    <Icon name="ios-alert-circle" size={20} color="#ff0000" />
                                    <Text style={styles.error}>{errors.Name}</Text>
                                </View>
                                : null
                        }
                        <View style={styles.userContainer}>
                            <TextInput
                                style={styles.inputStyle}
                                autoCorrect={false}
                                placeholder="Correo"
                                placeholderTextColor="#999"
                                onChangeText={handleChange('Email')}
                                value={values.Email}
                                onBlur={handleBlur('Email')}
                                editable={false}
                            />
                            <Icon
                                name="ios-mail"
                                style={styles.icon} />
                        </View>
                        <View style={styles.userContainer}>
                            <TextInput
                                style={styles.inputStyle}
                                autoCorrect={false}
                                placeholder="Número"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                                onChangeText={handleChange('Phone')}
                                value={(values.Phone).toString()}
                                onBlur={handleBlur('Phone')}
                            />
                            <Icon
                                name="ios-call"
                                style={styles.icon} />
                        </View>
                        {
                            touched.Phone && errors.Phone ?
                                <View style={styles.contenedorError}>
                                    <Icon name="ios-alert-circle" size={20} color="#ff0000" />
                                    <Text style={styles.error}>{errors.Phone}</Text>
                                </View>
                                : null
                        }

                        <MultiSelect />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textUbicacion}>¿Guardar ubicación actual?</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled ? "#008000" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                                style={{ marginLeft: 20, marginTop: 20 }}
                            />
                        </View>
                        {/* <TouchableOpacity style={styles.button} onPress={() => {
                            submit(values)
                        }}> */}
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.textButton}>Guardar</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <ContainerModal
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    textDescription="Usuario actualizado"
                />
            </Modal>
        </View>
    )
}

export default FormPerfil

const styles = StyleSheet.create({
    containerForm: {
        // backgroundColor: 'blue',
        width: '100%',
        // height: '65%',
        padding: 20,
        // marginTop: 80,
    },
    inputStyle: {
        height: '100%',
        width: '100%',
        paddingLeft: 10,
        fontSize: 20,
        flex: 1,
        color: '#000',
    },
    button: {
        backgroundColor: _secondaryColor,
        width: '100%',
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
    textButton: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
    },
    userContainer: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: '#000',
        marginTop: 48,
        wdith: 500,
        height: 70,
        borderRadius: 20,
    },
    icon: {
        marginTop: 15,
        fontSize: 30,
        color: '#000',
        marginRight: 10,
    },
    contenedorError: {
        marginTop: 7,
        padding: 10,
        backgroundColor: '#f9c8c8',
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        justifyContent: 'space-around',
    },
    error: {
        color: 'red',
    },
    userData: {
        width: '60%',
        height: '80%',
        // backgroundColor: 'black',
        position: 'absolute',
        top: -80,
        left: '20%',
        // zIndex: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textUbicacion: {
        marginRight: 20,
        marginTop: 20,
        color: '#000',
        fontSize: 15,
        fontWeight: 'bold',
    }

})