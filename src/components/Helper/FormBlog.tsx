import { Dimensions, Modal, Pressable, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext } from 'react'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import useBlog from '../../screens/Blog/useBlog';
import { SesionContext } from '../../context/Sesion/SesionContext';
import { BlogContext } from '../../context/Blog/Blogs';
import { _secondaryColor } from '../../global/Variables';

interface Props {
    modalVisible: boolean
    setModalVisible: (visible: boolean) => void
}

const FormBlog = ({ modalVisible, setModalVisible }: Props) => {

    const { Sesion } = useContext(SesionContext)
    // const { createBlog, getBlogByUser } = useBlog()
    const { createBlog, getBlogByUser } = useContext(BlogContext)

    const submit = async (values: any) => {
        createBlog(values);
        // resetForm();

        setModalVisible(false);
    }

    const formikOpt = {
        initialValues: {
            titulo: '',
            descripcion: '',
            idUsuario: Sesion.id
        },
        validationSchema: Yup.object({
            titulo: Yup.string().required('El titulo es requerido'),
            descripcion: Yup.string().required('La descripcion es requerida')
        }),
        onSubmit: submit

    }

    return (
        <Modal
            animationType="slide"
            visible={modalVisible}
        >
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.textTitle}>Crea un post</Text>
                    <Pressable
                        onPress={() => setModalVisible(false)}
                    >
                        <FontAwesome5 name="times" size={20} color="#893d9c" />
                    </Pressable>
                </View>
                <Formik {...formikOpt}>
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View style={styles.form}>
                            <View style={styles.containerInput}>
                                <View style={styles.containerInput}>
                                    <Text style={styles.titleInput}>Titulo</Text>
                                    <View style={styles.inputSyle}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Ingresa el titulo del blog"
                                            placeholderTextColor="#999"
                                            keyboardType="default"
                                            autoCapitalize="sentences"
                                            autoCorrect={true}
                                            onChangeText={handleChange('titulo')}
                                            value={values.titulo}
                                            onBlur={handleBlur('titulo')}
                                        />
                                        <Ionicons name="md-text" style={styles.icon} />
                                    </View>
                                    {
                                        touched.titulo && errors.titulo ?
                                            <View style={styles.contenedorError}>
                                                <Text style={styles.textError}>{errors.titulo}</Text>
                                                <FontAwesome5 name="exclamation-circle" size={20} color="#ff0000" />
                                            </View>
                                            : null
                                    }
                                </View>
                            </View>
                            <View style={styles.containerInput}>
                                <Text style={styles.titleInput}>Descripci??n</Text>
                                <View style={styles.inputSyle}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Ingresa la descripci??n del blog"
                                        placeholderTextColor="#999"
                                        keyboardType="default"
                                        autoCapitalize="sentences"
                                        autoCorrect={true}
                                        onChangeText={handleChange('descripcion')}
                                        value={values.descripcion}
                                        onBlur={handleBlur('descripcion')}
                                        multiline={true}
                                    />
                                    <Ionicons name="md-text-outline" style={styles.icon} />
                                </View>
                                {
                                    touched.descripcion && errors.descripcion ?
                                        <View style={styles.contenedorError}>
                                            <Text style={styles.textError}>{errors.descripcion}</Text>
                                            <FontAwesome5 name="exclamation-circle" size={20} color="#ff0000" />
                                        </View>
                                        : null
                                }
                            </View>
                            <Pressable
                                onPress={handleSubmit}
                                style={styles.button}
                            >
                                <Text style={styles.textButton}>Crear</Text>
                            </Pressable>
                        </View>
                    )}
                </Formik>
            </SafeAreaView>
        </Modal>
    )
}

export default FormBlog

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        borderBottomWidth: 1,
    },
    form: {
        marginTop: 100,
        // borderWidth: 1,
        padding: 5,
        flex: 1,

    },
    containerInput: {
        marginBottom: 20,
    },
    titleInput: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    inputSyle: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    input: {
        padding: 10,
        fontSize: 16,
        color: '#000',
    },
    button: {
        backgroundColor: `${_secondaryColor}`,
        padding: 10,
        borderRadius: 5,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    textButton: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    icon: {
        position: 'absolute',
        right: 10,
        color: '#893d9c',
        fontSize: 20,
    },
    contenedorError: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#ff0000',
        padding: 5,
    },
    textError: {
        color: '#ff0000',
        fontSize: 16,
        fontWeight: 'bold',
    },
})