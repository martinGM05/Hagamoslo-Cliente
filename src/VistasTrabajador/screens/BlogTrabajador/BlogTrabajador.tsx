import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackParams } from '../../../routes/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import Comments from '../../../components/Trabajador/Comments';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import UseBlogTrabajador from '../../../hooks/UseBlogTrabajador';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { _primaryColor, _secondaryColor, _url } from '../../../global/Variables';
import { TextInput } from 'react-native-gesture-handler';

type Props = StackScreenProps<RootStackParams, 'BlogTrabajador'>;

const BlogTrabajador = ({ navigation, route }: Props) => {

    const [textComentario, setTextComentario] = useState('')
    const { getComentariosTrabajador, comentariosTrabajador, CrearComentario } = UseBlogTrabajador()
    const { id, descripcion, idUsuario, titulo, user } = route.params.data

    useEffect(() => {
        getComentariosTrabajador(id)
    }, [])

    const handleSubmit = () => {
        setTextComentario('')
        CrearComentario(textComentario, id)
    }

    return (
        <ScrollView style={styles.container}>
            <View key={id} style={styles.containerBlog}>
                <View style={styles.containerInfo}>
                    <View style={styles.containerLeftHeader}>
                        <View style={{ width: 90, height: '100%', marginTop: -15 }}>
                            <Text style={styles.textNombre} numberOfLines={1}>{user.nombre}</Text>
                            <View style={{ width: 50, height: '100%', borderWidth: 1, borderRadius: 50 }}>
                                <Image
                                    source={{ uri: `${_url}/upload/Users/${idUsuario}` }}
                                    style={styles.imgUser}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center', marginLeft: -60 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.textTitle, { fontWeight: 'bold' }]}>Titulo: </Text>
                            <Text style={[styles.textTitle, { borderBottomWidth: 1 }]} numberOfLines={1}>{titulo}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.textTitle, { fontWeight: 'bold' }]}>Descripción: </Text>
                            <Text style={[styles.textTitle, { borderBottomWidth: 1 }]}>{descripcion}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.feedback}>
                <View style={styles.containerTitle}>
                    <View style={styles.containerCommentTitle}>
                        <FontAwesome5 name="address-book" size={30} color="#ff762d" />
                        <Text style={styles.title}>Comentarios</Text>
                        <FontAwesome5 name="people-arrows" size={30} color="#ff762d" />
                    </View>
                </View>

                <View style={styles.comments}>
                    <ScrollView>
                        {
                            comentariosTrabajador.map((c, index) => (
                                <Comments
                                    key={index}
                                    name={c.user.nombre}
                                    comment={c.comentario}
                                    photo={`${_url}/upload/Users/${c.idTrabajador}`}
                                    idEmploye={c.idTrabajador}
                                    tokenFCM={c.user.tokenFCM}
                                />
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
            <View style={styles.contenedorInput}>
                <TextInput
                    style={styles.input}
                    placeholder="Escribe un comentario"
                    onChangeText={(text) => setTextComentario(text)}
                    multiline={true}
                    value={textComentario}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleSubmit()}
                >
                    <Ionicons name="md-send" size={30} color="#000" />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default BlogTrabajador

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        flex: 1,
        flexDirection: 'column',
    },

    containerBlog: {
        width: Dimensions.get('window').width - 20,
        marginLeft: 10,
        padding: 10,
        backgroundColor: '#edebe9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 2,
        borderColor: '#8200D6'
    },
    containerInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    textTitle: {
        fontSize: 18,
        // fontWeight: 'bold',
        color: '#000',
    },
    textDescription: {
        fontSize: 18,
        color: '#000',
    },
    containerComentario: {
        width: Dimensions.get('window').width - 20,
        marginLeft: 10,
        marginTop: 10,
        height: 100,
        padding: 10,
        backgroundColor: '#edebe9',
        flexDirection: 'row',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        }
    },
    feedback: {
        marginLeft: 16,
        marginRight: 10,
        width: '90%',
    },
    containerTitle: {
        alignItems: 'center',
        marginTop: 5,
    },
    title: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    },
    containerCommentTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'space-between',
        width: '80%',
    },
    comments: {
        borderTopWidth: 2,
        borderBottomWidth: 2,
        width: '100%',
        height: 450,
        marginTop: 10,

    },
    containerProgress: {
        width: '100%',
        height: 160,
        marginTop: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textProgress: {
        fontSize: 20,
        color: '#000',
        fontWeight: 'bold',
        marginTop: 20,
    },
    image: {
        width: '70%',
        height: '100%',
    },
    contenedorInput: {
        marginTop: 10,
        marginHorizontal: 10,
        width: '93%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 6,
        flex: 1,
    },
    input: {
        width: '78%',
        backgroundColor: `${_primaryColor}`,
        borderWidth: 2,
        borderRadius: 6,
        color: '#000',
    },
    button: {
        width: '16%',
        backgroundColor: `${_secondaryColor}`,
        borderWidth: 2,
        height: '80%',
        marginRight: 2,
        borderRadius: 6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerLeftHeader: {
        width: '50%',
        height: 70,
        // backgroundColor: '#ff762d',
        padding: 10,
        // flexDirection: 'row'
    },
    containerRightHeader: {
        width: '50%',
        height: 70,
        backgroundColor: '#666482',
    },
    imgUser: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 50,
    },
    textNombre: {
        fontSize: 18,
        color: '#000',
        fontWeight: 'bold',
    }
})