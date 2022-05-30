import { StyleSheet, Text, View, Button, Pressable, Dimensions, TouchableOpacity, Alert } from 'react-native';
import React, { useEffect, useReducer, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { TextInput } from 'react-native-gesture-handler';
import * as Yup from 'yup'
import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UseLogin from '../../hooks/UseLogin';
import { _primaryColor } from '../../global/Variables';




interface Props {
    navigation: StackNavigationProp<RootStackParams, 'Login'>;
}

interface ValuesF {
    Email: string;
    Password: string;
}

const FormLogin = ({ navigation }: Props) => {

    const { loginWithEmail } = UseLogin()
    const [rol, setRol] = useState<number>(0)
    
    const submit = (values: ValuesF, { resetForm }: any) => {
        resetForm();
        if(rol === 1){
            loginWithEmail(values.Email, values.Password, navigation, rol)
        }else{
            loginWithEmail(values.Email, values.Password, navigation, rol)
        }
    }

    const formikOpt = {
        initialValues : {
            Email: '',
            Password: '',
        } as ValuesF,
        validationSchema: Yup.object().shape({
            Email: Yup.string()
                .email('Email inválido')
                .required('Email requerido'),
            Password: Yup.string()
                .min(6, 'Mínimo 6 caracteres')
                .required('Contraseña requerida'),
        }),
        onSubmit: submit,
    }


    return (
        <Formik {...formikOpt}>
            {
                formik => (
                    <>
                        <View style={styles.form}>
                            <View style={styles.containerInput}>
                                <Text style={styles.titleInput}>Correo Electronico</Text>
                                <View style={styles.inputSyle}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Correo electrónico"
                                        placeholderTextColor="#999"
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        onChangeText={formik.handleChange('Email')}
                                        value={formik.values.Email}
                                        onBlur={formik.handleBlur('Email')}
                                    />
                                    <Icon name="alternate-email" style={styles.icon} />
                                </View>
                                {
                                    formik.touched.Email && formik.errors.Email ?
                                        <View style={styles.contenedorError}>
                                            <Icon name="error" size={20} color="#ff0000" />
                                            <Text style={styles.error}>{formik.errors.Email}</Text>
                                        </View>
                                        : null
                                }
                            </View>
                            <View style={styles.containerInput}>
                                <Text style={styles.titleInput}>Contraseña</Text>
                                <View style={styles.inputSyle}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Contraseña"
                                        placeholderTextColor="#999"
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        secureTextEntry
                                        onChangeText={formik.handleChange('Password')}
                                        value={formik.values.Password}
                                        onBlur={formik.handleBlur('Password')}
                                    />
                                    <Icon name="lock" style={styles.icon} />
                                </View>
                                {
                                    formik.touched.Password && formik.errors.Password ?
                                        <View style={styles.contenedorError}>
                                            <Icon name="error" size={20} color="#ff0000" />
                                            <Text style={styles.error}>{formik.errors.Password}</Text>
                                        </View>
                                        : null
                                }
                            </View>

                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={{color: '#000', fontSize: 20, fontWeight: 'bold'}}>Inicia Sesión</Text>
                            <View  style={styles.containerButtons}>
                                <TouchableOpacity style={styles.containerLogin}
                                    onPress={() => {
                                        setRol(1)
                                        formik.handleSubmit()
                                    }}
                                >
                                    <Text style={styles.buttonLogin}>Cliente</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.containerLogin}
                                    onPress={() => {
                                        setRol(2)
                                        formik.handleSubmit()
                                    }}
                                >
                                    <Text style={styles.buttonLogin}>Trabajador</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )
            }
        </Formik>
    )
}

export default FormLogin

const styles = StyleSheet.create({
    containerForm: {
        width: '100%',
        height: 'auto',
        marginTop: '10%',
        // borderTopWidth: 1,
        // backgroundColor: 'red',
        // marginTop: '5%',
    },
    form: {
        // width: 100,
        marginLeft: '5%',
        marginRight: '5%',
        paddingBottom: '5%',
        height: 'auto',
        // borderWidth: 1,
        // backgroundColor: 'blue',
    },
    inputSyle: {
        height: 50,
        marginLeft: '1%',
        marginRight: '1%',
        paddingRight: '5%',
        marginTop: '2%',
        borderWidth: 1,
        backgroundColor: '#fff',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        color: '#000',
        fontSize: 16,
        marginLeft: '1%',
        width: '90%',
    },
    icon: {
        color: `${_primaryColor}`,
        fontSize: 25,
    },
    contenedorError: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    error: {
        color: '#ff0000',
        fontSize: 12,
        marginLeft: 5,
    },
    containerInput: {
        height: 'auto',
        marginLeft: '5%',
        marginRight: '5%',
        marginTop: '5%',
        // borderWidth: 2,
    },
    titleInput: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
        marginLeft: '2%',
    },
    containerLogin: {
        padding: 10,
        marginTop: '4%',
        backgroundColor: '#b63d3d',
        borderRadius: 10,
        borderWidth: 1,
    },
    buttonLogin: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    containerButtons: {
        flexDirection: 'row',
        width: '100%',    
        padding: 10,
        justifyContent: 'space-evenly',
    }
})