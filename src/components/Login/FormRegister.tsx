import { StyleSheet, Text, View, Button, Pressable, KeyboardTypeOptions, TouchableOpacity, Alert, Modal, LogBox, Switch } from 'react-native';
import React, { useEffect, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import * as Yup from 'yup'
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from 'react-native-elements';

import usePhoto from '../../hooks/usePhoto';
import AwesomeLoading from 'react-native-awesome-loading';
import ContainerModal from '../Helper/ContainerModal';
import { StackScreenProps, StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../../routes/StackNavigator';
import { useNavigation } from '@react-navigation/native';
import DropDownPicker from 'react-native-dropdown-picker';
import useTags from '../../hooks/useTags';
import RegistrarUsuario from '../../hooks/RegistrarUsuario';
import { _primaryColor, _secondaryColor } from '../../global/Variables';
interface Props {
    navigation: any;
}


const FormRegister = ({ navigation }: Props) => {

    // const [imgAvatar, setImgAvatar] = useState('https://dicesabajio.com.mx/wp-content/uploads/2021/06/no-image.jpeg');
    let img = 'https://dicesabajio.com.mx/wp-content/uploads/2021/06/no-image.jpeg'

    const { photoNew, cameraOrGallery } = usePhoto()
    const {coordinates}=useTags()
    const {Registro}=RegistrarUsuario()
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleError, setModalVisibleError] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Cliente', value: 1 },
        { label: 'Trabajador', value: 2 },
        { label: 'Ambos', value: 3 }
    ]);

    const submit = async (values: any) => {
      if(value==null){
          Alert.alert('Mensaje', 'Debe seleccionar su Rol')
      }else{
        if(photoNew==''){
            Alert.alert('Mensaje', 'La foto es obligatoria')
        }else if(isEnabled){
         let data = {
             Name: values.Name,
             Email: values.Email,
             Phone: values.Phone,
             Password: values.Password,
             Descripcion: values.Descripcion,
             Photo: photoNew,
             Rol: value,
             Latitud: coordinates.latitude,
             Longitud: coordinates.longitude
         }
         Registro(data)
 
        }else{
         let data = {
             Name: values.Name,
             Email: values.Email,
             Phone: values.Phone,
             Password: values.Password,
             Descripcion: values.Descripcion,
             Photo: photoNew,
             Rol: value,
             Latitud: 0,
             Longitud: 0
         }
         Registro(data)
 
        }
      }
        
        //Registro(data)
        //console.log(data)


    }
    useEffect(() => {
        //console.log(value)  
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [value])

    const changeImage = () => {
        cameraOrGallery()
    }

    const formikOpt = {
        initialValues: {
            Name: '',
            Photo: photoNew,
            Email: '',
            Phone: '',
            Password: '',
            PasswordConfirm: '',
            Descripcion: ''
        },
        validationSchema: Yup.object().shape({
            Name: Yup.string()
                .min(3, 'Mínimo 3 caracteres')
                .required('Nombre requerido'),
            Email: Yup.string()
                .email('Email inválido')
                .required('Email requerido'),
            Phone: Yup.string()
                .min(10, 'Mínimo 10 caracteres')
                .max(10, 'Máximo 10 caracteres')
                .required('Teléfono requerido'),
            Password: Yup.string()
                .min(6, 'Mínimo 6 caracteres')
                .required('Contraseña requerida'),
            PasswordConfirm: Yup.string()
                .oneOf([Yup.ref('Password'), null], 'Las contraseñas no coinciden')
                .required('Confirmación de contraseña requerida'),
            Descripcion: Yup.string()
                .max(30, 'Maximo 30 carateres')
                .required('Descripcion requerida')
        }),
        onSubmit: submit,
    }

    return (

        <View style={styles.containerForm}>

            <View style={styles.containerAvatar}>
                {
                    photoNew ?
                        <Avatar
                            rounded
                            size="xlarge"
                            source={{ uri: photoNew }}
                            containerStyle={styles.avatar}
                        /> :
                        <Avatar
                            rounded
                            size="xlarge"
                            source={{ uri: img }}
                            containerStyle={styles.avatar}
                        />
                }

                <TouchableOpacity
                    style={styles.containerEdit}
                    onPress={() => changeImage()}
                >
                    <Icon name="md-pencil-sharp" size={23} color="#fff" />
                </TouchableOpacity>
            </View>
            <ScrollView style={{
                borderTopWidth: 2,
                borderBottomWidth: 2,
            }}>


                <Formik {...formikOpt}>
                    {
                        formik => (
                            <>
                                <View style={styles.form}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        autoCorrect={false}
                                        placeholder="Nombre"
                                        placeholderTextColor="#999"
                                        onChangeText={formik.handleChange('Name')}
                                        value={formik.values.Name}
                                        onBlur={formik.handleBlur('Name')}
                                    />
                                    <Icon
                                        name="ios-person"
                                        style={styles.icon} />
                                </View>
                                {
                                    formik.touched.Name && formik.errors.Name ?
                                        <View style={styles.contenedorError}>
                                            <Icon name="information-circle" size={20} color="#ff0000" />
                                            <Text style={styles.error}>{formik.errors.Name}</Text>
                                        </View> : null
                                }
                                <View style={styles.form}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        autoCorrect={false}
                                        placeholder="Email"
                                        placeholderTextColor="#999"
                                        onChangeText={formik.handleChange('Email')}
                                        value={formik.values.Email}
                                        onBlur={formik.handleBlur('Email')}
                                    />
                                    <Icon
                                        name="at"
                                        style={styles.icon} />
                                </View>
                                {
                                    formik.touched.Email && formik.errors.Email ?
                                        <View style={styles.contenedorError}>
                                            <Icon name="information-circle" size={20} color="#ff0000" />
                                            <Text style={styles.error}>{formik.errors.Email}</Text>
                                        </View> : null
                                }
                                <View style={styles.form}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        autoCorrect={false}
                                        placeholder="Teléfono"
                                        keyboardType="numeric"
                                        placeholderTextColor="#999"
                                        onChangeText={formik.handleChange('Phone')}
                                        value={formik.values.Phone}
                                        onBlur={formik.handleBlur('Phone')}
                                    />
                                    <Icon
                                        name="call"
                                        style={styles.icon} />
                                </View>
                                {
                                    formik.touched.Phone && formik.errors.Phone ?
                                        <View style={styles.contenedorError}>
                                            <Icon name="information-circle" size={20} color="#ff0000" />
                                            <Text style={styles.error}>{formik.errors.Phone}</Text>
                                        </View> : null
                                }
                                <View style={styles.form}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        autoCorrect={false}
                                        placeholder="Contraseña"
                                        placeholderTextColor="#999"
                                        onChangeText={formik.handleChange('Password')}
                                        value={formik.values.Password}
                                        onBlur={formik.handleBlur('Password')}
                                        secureTextEntry={true}
                                    />
                                    <Icon
                                        name="eye-off"
                                        style={styles.icon} />
                                </View>
                                {
                                    formik.touched.Password && formik.errors.Password ?
                                        <View style={styles.contenedorError}>
                                            <Icon name="information-circle" size={20} color="#ff0000" />
                                            <Text style={styles.error}>{formik.errors.Password}</Text>
                                        </View> : null
                                }
                                <View style={styles.form}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        autoCorrect={false}
                                        placeholder="Confirmar contraseña"
                                        placeholderTextColor="#999"
                                        onChangeText={formik.handleChange('PasswordConfirm')}
                                        value={formik.values.PasswordConfirm}
                                        onBlur={formik.handleBlur('PasswordConfirm')}
                                        secureTextEntry={true}
                                    />
                                    <Icon
                                        name="eye-off"
                                        style={styles.icon} />
                                </View>
                                {
                                    formik.touched.PasswordConfirm && formik.errors.PasswordConfirm ?
                                        <View style={styles.contenedorError}>
                                            <Icon name="information-circle" size={20} color="#ff0000" />
                                            <Text style={styles.error}>{formik.errors.PasswordConfirm}</Text>
                                        </View> : null
                                }

                                <View style={styles.form}>
                                    <TextInput
                                        style={styles.inputStyle}
                                        autoCorrect={false}
                                        placeholder="Descripción"
                                        placeholderTextColor="#999"
                                        onChangeText={formik.handleChange('Descripcion')}
                                        value={formik.values.Descripcion}
                                        onBlur={formik.handleBlur('Descripcion')}
                                        multiline={true}
                                    />
                                    <Icon
                                        name="ios-create-sharp"
                                        style={styles.icon} />
                                </View>
                                {
                                    formik.touched.Descripcion && formik.errors.Descripcion ?
                                        <View style={styles.contenedorError}>
                                            <Icon name="information-circle" size={20} color="#ff0000" />
                                            <Text style={styles.error}>{formik.errors.Descripcion}</Text>
                                        </View> : null
                                }


                                <View style={{ flex: 1 }}>
                                    <DropDownPicker
                                        open={open}
                                        placeholder='Selecciones su rol'
                                        value={value}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setValue}
                                        setItems={setItems}
                                        style={styles.form}
                                    />
                                </View>
                                {
                                    value != 1 && value!=null? (
                                        <View style={styles.form}>
                                            <Text style={{ marginRight: 20, color: '#000', fontWeight: 'bold'}}>¿Guardar ubicación actual?</Text>
                                            <Switch
                                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                                thumbColor={isEnabled ? "#008000" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                onValueChange={toggleSwitch}
                                                value={isEnabled}
                                            />
                                        </View>
                                    ) : null

                                }
                                <TouchableOpacity
                                    style={styles.btnSubmit}
                                    onPress={formik.handleSubmit}>
                                    <Text style={styles.textSubmit}>Registrarse</Text>
                                </TouchableOpacity>
                            </>
                        )
                    }
                </Formik>
            </ScrollView>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
            >
                <ContainerModal
                    setModalVisible={setModalVisible}
                    modalVisible={modalVisible}
                    textDescription="Usuario creado correctamente"

                />
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisibleError}
            >
                <ContainerModal
                    setModalVisible={setModalVisibleError}
                    modalVisible={modalVisibleError}
                    textDescription="El usuario ya existe"
                    type="error"
                />
            </Modal>
        </View>
    )
}

export default FormRegister

const styles = StyleSheet.create({
    // containerAnimation:{
    //     width: 50,
    //     height: 50,
    //     backgroundColor: 'red',
    //     borderRadius: 25,
    // },
    containerForm: {
        flex: 1,
        // backgroundColor: 'red',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    form: {
        width: '100%',
        height: 60,
        // backgroundColor: 'blue',
        backgroundColor: '#fff',
        borderWidth: 2,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputStyle: {
        width: '80%',
        height: '100%',
        // backgroundColor: '#fff',
        color: '#000',
    },
    icon: {
        fontSize: 30,
        color: `${_primaryColor}`,
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
    btnSubmit: {
        width: '100%',
        height: 50,
        backgroundColor: `${_secondaryColor}`,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    textSubmit: {
        fontSize: 20,
        color: '#fff',
    },
    containerAvatar: {
        // backgroundColor: 'red',
        width: 120,
        height: 120,
        left: '30%',
        marginBottom: 10,
    },
    avatar: {
        marginTop: 5,
        width: 120,
        height: 120,
        borderWidth: 2,
    },
    containerEdit: {
        width: 'auto',
        height: 'auto',
        position: 'absolute',
        bottom: 0,
        right: -5,
        backgroundColor: '#696969',
        borderRadius: 50,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
})